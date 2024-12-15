"use client";
import { useState } from 'react';
import { Search, Edit2, Trash2, Copy, MessageSquare, Filter, Tag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/ui/AlertModal';
import { TemplateCreateModal } from './TemplateCreateModal';

const MOCK_TEMPLATES = [
  {
    id: 1,
    title: 'Karşılama Mesajı',
    content: 'Merhaba {{müşteri_adı}}, size nasıl yardımcı olabilirim?',
    category: 'Genel',
    tags: ['karşılama', 'giriş'],
    usageCount: 156,
    lastUsed: '2024-02-20T10:30:00',
    variables: ['müşteri_adı']
  },
  {
    id: 2,
    title: 'Sipariş Onayı',
    content: 'Siparişiniz başarıyla alındı. Sipariş numaranız: {{sipariş_no}}. Toplam tutar: {{tutar}} TL',
    category: 'Sipariş',
    tags: ['sipariş', 'onay'],
    usageCount: 89,
    lastUsed: '2024-02-19T15:45:00',
    variables: ['sipariş_no', 'tutar']
  },
  {
    id: 3,
    title: 'Teşekkür Mesajı',
    content: 'Bizi tercih ettiğiniz için teşekkür ederiz {{müşteri_adı}}. İyi günler dileriz.',
    category: 'Genel',
    tags: ['teşekkür', 'kapanış'],
    usageCount: 234,
    lastUsed: '2024-02-18T09:15:00',
    variables: ['müşteri_adı']
  }
];

const CATEGORIES = ['Genel', 'Sipariş', 'Destek', 'Kampanya', 'Şikayet', 'Diğer'];

export function TemplateList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('usage');
  const [templates, setTemplates] = useState(MOCK_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const handleCopy = async (template) => {
    try {
      await navigator.clipboard.writeText(template.content);
      
      // Kullanım sayısını artır
      setTemplates(prev => prev.map(t => 
        t.id === template.id 
          ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date().toISOString() }
          : t
      ));
      
      toast({
        title: "Başarılı",
        description: "Şablon panoya kopyalandı",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kopyalama işlemi başarısız oldu",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedTemplate) return;

    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTemplates(prev => prev.filter(template => template.id !== selectedTemplate.id));
      setIsDeleteModalOpen(false);
      setSelectedTemplate(null);
      
      toast({
        title: "Başarılı",
        description: "Şablon silindi",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Silme işlemi başarısız oldu",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  };

  const handleUpdateTemplate = async (updatedTemplate) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTemplates(prev => prev.map(template =>
        template.id === updatedTemplate.id ? updatedTemplate : template
      ));
      
      setIsEditModalOpen(false);
      setSelectedTemplate(null);
      
      toast({
        title: "Başarılı",
        description: "Şablon güncellendi",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Güncelleme işlemi başarısız oldu",
        variant: "destructive"
      });
    }
  };

  // Filtreleme ve sıralama
  const getFilteredAndSortedTemplates = () => {
    let filtered = [...templates];

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(query) ||
        template.content.toLowerCase().includes(query) ||
        template.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'usage':
          return b.usageCount - a.usageCount;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'recent':
          return new Date(b.lastUsed) - new Date(a.lastUsed);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredTemplates = getFilteredAndSortedTemplates();

  return (
    <>
      <div className="space-y-4">
        {/* Üst Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Şablonlarda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg 
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 
              rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 
              hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-4 h-4" />
              Filtrele
            </button>

            {isFilterMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
              border border-gray-200 dark:border-gray-700 p-4 space-y-4 z-10">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Kategori
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg 
                    bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">Tümü</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Sırala
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg 
                    bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="usage">Kullanım Sayısı</option>
                    <option value="name">İsim</option>
                    <option value="recent">Son Kullanım</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Liste */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
              dark:border-gray-700 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 
                dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                  {template.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(template)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                    dark:hover:text-gray-200"
                    title="Kopyala"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(template)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                    dark:hover:text-gray-200"
                    title="Düzenle"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 
                    dark:hover:text-red-400"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {template.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {template.content}
                </p>
              </div>

              {template.variables.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {template.variables.map((variable) => (
                    <span
                      key={variable}
                      className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary 
                      rounded-full"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              )}

              {template.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 text-xs font-medium 
                      bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {template.usageCount} kez kullanıldı
                </div>
                <span>
                  Son: {new Date(template.lastUsed).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Şablon Bulunamadı
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedCategory !== 'all'
                ? 'Seçili kategoride şablon bulunmuyor.'
                : searchQuery
                ? 'Arama kriterlerinize uygun şablon bulunamadı.'
                : 'Henüz bir şablon oluşturmadınız.'}
            </p>
          </div>
        )}
      </div>

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTemplate(null);
        }}
        onConfirm={handleDelete}
        title="Şablonu Sil"
        description={`"${selectedTemplate?.title}" şablonunu silmek istediğinizden emin misiniz?`}
      />

      <TemplateCreateModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTemplate(null);
        }}
        onSubmit={handleUpdateTemplate}
        template={selectedTemplate}
      />
    </>
  );
}