"use client";
import { useState, useEffect } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { getCategories } from '@/services/integrations/categoryService';
import { useUser } from '@/services/User';

// Rich text editor'ü dinamik olarak import ediyoruz
const Editor = dynamic(() => import('@/components/shared/Editor'), { ssr: false });

export default function ProductForm({ onSubmit, initialData, id = 'product-form' }) {
  const { user } = useUser();
  console.log(user)
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    brand_id: user?.brand?.id || '',
    type: '',
    status: 'draft',
    price: '',
    stock: '',
    description: '',
    meta_title: '',
    meta_description: '',
    images: [],
    variants: [{ id: 1, color: '', size: '', stock: '', price: '' }]
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        // Sadece ürün kategorilerini filtrele
        const productCategories = response.data.data.filter(
          category => category.type.value === 'product'
        );
        setCategories(productCategories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(file => ({
        id: Math.random(),
        file,
        preview: URL.createObjectURL(file)
      }))]
    }));
  };

  const removeImage = (id) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };

  const handleVariantChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map(v => 
        v.id === id ? { ...v, [field]: value } : v
      )
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, {
        id: Math.random(),
        color: '',
        size: '',
        stock: '',
        price: ''
      }]
    }));
  };

  const removeVariant = (id) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      // Check if the submit was triggered by the draft button
      const isDraft = e.submitter?.textContent.includes('Taslak');
      onSubmit(formData, isDraft);
    }
  };

  // Add product type options
  const productTypes = [
    { value: 'physical', label: 'Fiziksel Ürün' },
    { value: 'digital', label: 'Dijital Ürün' },
    { value: 'service', label: 'Hizmet' }
  ];

  // Add product status options
  const productStatuses = [
    { value: 'active', label: 'Aktif', color: 'green' },
    { value: 'inactive', label: 'Pasif', color: 'red' },
    { value: 'draft', label: 'Taslak', color: 'yellow' },
    { value: 'archived', label: 'Arşivlenmiş', color: 'gray' },
    { value: 'out_of_stock', label: 'Stokta Yok', color: 'orange' },
    { value: 'coming_soon', label: 'Yakında', color: 'blue' }
  ];

  return (
    <form 
      id={id}
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="space-y-8">
        {/* Temel Bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ürün Adı
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
              placeholder="Ürün adını girin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kategori
            </label>
            <select 
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <option value="">Kategori Seçin</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ürün Tipi
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <option value="">Ürün Tipi Seçin</option>
              {productTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Durum
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              {productStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fiyat
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stok
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              step="1"
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
              placeholder="0"
            />
          </div>
        </div>

        {/* Ürün Görselleri */}
        <div>
          <label className="block text-sm font-medium text-gray-700 
          dark:text-gray-300 mb-2">
            Ürün Görselleri
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {formData.images.map((image) => (
              <div key={image.id} className="relative aspect-square rounded-lg 
              overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={image.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white 
                  rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <label className="aspect-square rounded-lg border-2 border-dashed 
            border-gray-300 dark:border-gray-700 hover:border-primary 
            dark:hover:border-primary cursor-pointer flex items-center 
            justify-center">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Upload className="w-6 h-6 text-gray-400" />
            </label>
          </div>
        </div>

        {/* Ürün Açıklaması */}
        <div>
          <label className="block text-sm font-medium text-gray-700 
          dark:text-gray-300 mb-2">
            Ürün Açıklaması
          </label>
          <Editor />
        </div>

        {/* Varyantlar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 
            dark:text-gray-300">
              Varyantlar
            </label>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary 
              hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Varyant Ekle
            </button>
          </div>

          <div className="space-y-4">
            {formData.variants.map((variant) => (
              <div
                key={variant.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-50 
                dark:bg-gray-700/50 rounded-lg relative"
              >
                <input
                  type="text"
                  placeholder="Renk"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-gray-800 border 
                  border-gray-300 dark:border-gray-700 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Beden"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-gray-800 border 
                  border-gray-300 dark:border-gray-700 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Stok"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-gray-800 border 
                  border-gray-300 dark:border-gray-700 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Fiyat"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-gray-800 border 
                  border-gray-300 dark:border-gray-700 rounded-lg"
                />
                {formData.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(variant.id)}
                    className="absolute -right-2 -top-2 p-1 bg-red-500 
                    text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO Bilgileri */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            SEO Bilgileri
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 
              dark:text-gray-300 mb-2">
                Meta Başlık
              </label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border 
                border-gray-300 dark:border-gray-700 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 
              dark:text-gray-300 mb-2">
                Meta Açıklama
              </label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border 
                border-gray-300 dark:border-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}