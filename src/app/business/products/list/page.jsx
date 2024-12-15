"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import ProductsTable from '@/components/business/products/ProductsTable';
import ProductFilters from '@/components/business/products/ProductFilters';
import { getProducts } from '@/services/integrations/productService';
import { useUser } from '@/services/User';

export default function ProductListPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const { user } = useUser();

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          ...filters,
          search: searchTerm,
          brand_id: user?.brand?.id // Add brand_id filter
        };
        const response = await getProducts(params);
        setProducts(response.data); // Access data property from response
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.brand?.id) { // Only fetch if brand_id exists
      fetchProducts();
    }
  }, [filters, searchTerm, user?.brand?.id]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ürünler
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tüm ürünlerinizi buradan yönetin
          </p>
        </div>

        <Link 
          href="/business/products/new"
          className="px-4 py-2 text-sm font-medium text-white bg-primary 
          rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Ürün
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Ürün ara..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 rounded-lg
            text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 
          w-5 h-5 text-gray-400" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border 
          border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 
          dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 
          transition-colors flex items-center gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filtrele
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && <ProductFilters onFilterChange={handleFilterChange} />}

      {/* Error Message */}
      {error && (
        <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-lg">
          {error}
        </div>
      )}

      {/* Products Table */}
      <ProductsTable 
        products={products} 
        loading={loading}
      />
    </div>
  );
}