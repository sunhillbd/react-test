"use client";
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import ProductForm from '@/components/business/products/ProductForm';

export default function EditProductPage({ params }) {
  const id = use(params).id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = {
          id: id,
          name: "Örnek Ürün",
          category: "Elektronik",
          description: "Ürün açıklaması...",
          price: 1299.99,
          stock: 45,
          images: [],
          variants: []
        };
        setProduct(data);
      } catch (error) {
        console.error('Ürün yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 
        border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/business/products/list"
            className="p-2 text-gray-500 hover:text-gray-700 
            dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ürün Düzenle
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              #{id} numaralı ürünü düzenliyorsunuz
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 
          dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 
          dark:border-gray-700 rounded-lg hover:bg-gray-50 
          dark:hover:bg-gray-700">
            Taslak Olarak Kaydet
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white 
          bg-primary rounded-lg hover:bg-primary-600">
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>

      {/* Form */}
      <ProductForm initialData={product} />
    </div>
  );
}