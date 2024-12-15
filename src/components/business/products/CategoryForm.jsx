"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function CategoryForm({ onClose, initialData, onSubmit, meta }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    type: initialData?.type?.value || "brand",
    status: initialData?.status?.value || "active",
    parent_id: initialData?.parent_id || null,
    meta_title: initialData?.meta_title || "",
    meta_description: initialData?.meta_description || "",
    sort_order: initialData?.sort_order || 1,
    is_featured: initialData?.is_featured || false,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTypeDescription = (type) => {
    switch(type) {
      case 'brand':
        return 'Markaların sınıflandırılması için kullanılır';
      case 'product':
        return 'Ürünlerin sınıflandırılması için kullanılır';
      case 'blog_post':
        return 'Blog yazılarının sınıflandırılması için kullanılır';
      case 'faq':
        return 'SSS başlıklarının sınıflandırılması için kullanılır';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      type: formData.type,
      status: formData.status,
      parent_id: formData.parent_id === "" ? null : formData.parent_id,
      sort_order: Number(formData.sort_order),
    };
    onSubmit(submissionData);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {initialData ? "Kategori Düzenle" : "Yeni Kategori"}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kategori Adı
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                    placeholder="Kategori açıklaması girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tür
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                  >
                    <option value="brand">Marka Kategorisi</option>
                    <option value="product">Ürün Kategorisi</option>
                    <option value="blog_post">Blog Yazıları Kategorisi</option>
                    <option value="faq">SSS Kategorisi</option>
                  </select>
                  {formData.type && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {getTypeDescription(formData.type)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Durum
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                  >
                    {meta?.statuses?.map?.((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Üst Kategori (Opsiyonel)
                  </label>
                  <select
                    value={formData.parent_id || ""}
                    onChange={(e) => handleChange("parent_id", e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                  >
                    <option value="">Üst Kategori Seçin</option>
                    <option value="1">Elektronik</option>
                    <option value="2">Giyim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Başlığı
                  </label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => handleChange("meta_title", e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Açıklaması
                  </label>
                  <textarea
                    rows={3}
                    value={formData.meta_description}
                    onChange={(e) =>
                      handleChange("meta_description", e.target.value)
                    }
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                    placeholder="Meta açıklaması girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sıralama
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => handleChange("sort_order", e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) =>
                      handleChange("is_featured", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Öne Çıkan
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {initialData ? "Güncelle" : "Oluştur"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
