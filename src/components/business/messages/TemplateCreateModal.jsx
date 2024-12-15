"use client";
import { useState, useEffect } from 'react';
import { X, Plus, Tag as TagIcon, Variable } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CATEGORIES = ['Genel', 'Sipariş', 'Destek', 'Kampanya', 'Şikayet', 'Diğer'];
const VARIABLE_SUGGESTIONS = [
  'müşteri_adı',
  'sipariş_no',
  'tutar',
  'ürün_adı',
  'tarih',
  'firma_adı',
  'takip_no'
];

export function TemplateCreateModal({ isOpen, onClose, onSubmit, template = null }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Genel',
    tags: [],
    variables: []
  });
  const [newTag, setNewTag] = useState('');
  const [showVariableSuggestions, setShowVariableSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (template) {
      setFormData({
        id: template.id,
        title: template.title,
        content: template.content,
        category: template.category,
        tags: template.tags || [],
        variables: template.variables || []
      });
    } else {
      setFormData({
        title: '',
        content: '',
        category: 'Genel',
        tags: [],
        variables: []
      });
    }
  }, [template]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen tüm gerekli alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Değişkenleri içerikten otomatik tespit et
      const variableRegex = /{{([^}]+)}}/g;
      const detectedVariables = [...formData.content.matchAll(variableRegex)].map(match => match[1]);
      
      const updatedFormData = {
        ...formData,
        variables: [...new Set(detectedVariables)], // Tekrar edenleri kaldır
        lastUsed: new Date().toISOString(),
        usageCount: template ? template.usageCount : 0
      };

      await onSubmit(updatedFormData);
      onClose();
      
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleInsertVariable = (variable) => {
    const newContent = formData.content.slice(0, cursorPosition) + 
      `{{${variable}}}` + 
      formData.content.slice(cursorPosition);
    
    setFormData(prev => ({
      ...prev,
      content: newContent,
      variables: [...new Set([...prev.variables, variable])]
    }));
    setShowVariableSuggestions(false);
  };

  const handleContentChange = (e) => {
    setCursorPosition(e.target.selectionStart);
    setFormData(prev => ({
      ...prev,
      content: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {template ? 'Şablonu Düzenle' : 'Yeni Şablon Oluştur'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 
            dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Başlık
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              İçerik
            </label>
            <div className="relative">
              <textarea
                value={formData.content}
                onChange={handleContentChange}
                onFocus={() => setCursorPosition(0)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowVariableSuggestions(!showVariableSuggestions)}
                className="absolute right-2 top-2 p-1 text-gray-500 hover:text-gray-700 
                dark:text-gray-400 dark:hover:text-gray-200 rounded"
                title="Değişken Ekle"
              >
                <Variable className="w-4 h-4" />
              </button>

              {showVariableSuggestions && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-700 rounded-lg 
                shadow-lg border border-gray-200 dark:border-gray-600 py-1">
                  {VARIABLE_SUGGESTIONS.map((variable) => (
                    <button
                      key={variable}
                      type="button"
                      onClick={() => handleInsertVariable(variable)}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 
                      dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
              hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary 
              hover:bg-primary-600 rounded-lg"
            >
              {template ? 'Güncelle' : 'Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}