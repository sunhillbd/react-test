"use client";
import { useState } from 'react';
import { Search, Archive, MessageSquare, MoreVertical, Trash2, RefreshCw, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const MOCK_ARCHIVED = [
  {
    id: 1,
    name: 'Mehmet Yılmaz',
    lastMessage: 'Siparişiniz tamamlandı, teşekkür ederiz.',
    timestamp: '2024-02-15T14:30:00',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    archivedDate: '2024-02-15T14:35:00',
    category: 'customer_service',
    messageCount: 15,
    status: 'completed'
  },
  {
    id: 2,
    name: 'Zeynep Kaya',
    lastMessage: 'İade işleminiz onaylandı.',
    timestamp: '2024-02-10T09:45:00',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    archivedDate: '2024-02-10T10:00:00',
    category: 'returns',
    messageCount: 8,
    status: 'completed'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'customer_service', label: 'Müşteri Hizmetleri' },
  { id: 'sales', label: 'Satış' },
  { id: 'returns', label: 'İadeler' },
  { id: 'complaints', label: 'Şikayetler' }
];

export function ArchivedMessageList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [archivedChats, setArchivedChats] = useState(MOCK_ARCHIVED);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Filtreleme ve sıralama
  const getFilteredAndSortedChats = () => {
    let filtered = [...archivedChats];

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(chat => chat.category === selectedCategory);
    }

    // Arama filtresi
    if (searchQuery) {
      filtered = filtered.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sıralama
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.archivedDate) - new Date(a.archivedDate);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'messages') {
        return b.messageCount - a.messageCount;
      }
      return 0;
    });

    return filtered;
  };

  const handleRestore = async (chatId) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setArchivedChats(prev => prev.filter(chat => chat.id !== chatId));
      
      toast({
        title: "Başarılı",
        description: "Sohbet arşivden çıkarıldı",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (chatId) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setArchivedChats(prev => prev.filter(chat => chat.id !== chatId));
      
      toast({
        title: "Başarılı",
        description: "Sohbet kalıcı olarak silindi",
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

  const handleExport = async (chatId) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Başarılı",
        description: "Sohbet dışa aktarıldı",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Dışa aktarma işlemi başarısız oldu",
        variant: "destructive"
      });
    }
  };

  const filteredChats = getFilteredAndSortedChats();

  return (
    <div className="space-y-4">
      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Arşivlenmiş mesajlarda ara..."
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
              {/* Kategori Filtresi */}
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
                  {CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sıralama */}
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
                  <option value="date">Tarih</option>
                  <option value="name">İsim</option>
                  <option value="messages">Mesaj Sayısı</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Liste */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
      divide-y divide-gray-200 dark:divide-gray-700">
        {filteredChats.map((chat) => (
          <div key={chat.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {chat.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {chat.lastMessage}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <span>
                      Arşivlenme: {format(new Date(chat.archivedDate), 'dd MMMM yyyy HH:mm', { locale: tr })}
                    </span>
                    <span>•</span>
                    <span>{chat.messageCount} mesaj</span>
                    <span>•</span>
                    <span className="capitalize">{CATEGORIES.find(c => c.id === chat.category)?.label}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRestore(chat.id)}
                  className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 
                  dark:hover:text-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Arşivden Çıkar"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleExport(chat.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                  dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Dışa Aktar"
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(chat.id)}
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 
                  dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Kalıcı Olarak Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredChats.length === 0 && (
          <div className="p-8 text-center">
            <Archive className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Arşivlenmiş Mesaj Bulunamadı
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedCategory !== 'all'
                ? 'Seçili kategoride arşivlenmiş mesaj bulunmuyor.'
                : searchQuery
                ? 'Arama kriterlerinize uygun arşivlenmiş mesaj bulunamadı.'
                : 'Henüz arşivlenmiş bir mesajınız bulunmuyor.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}