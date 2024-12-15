"use client";
import { useState, useCallback } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ReviewsTable from '@/components/business/reviews/ReviewsTable';
import ReviewFilters from '@/components/business/reviews/ReviewFilters';
import ReviewStats from '@/components/business/reviews/ReviewStats';
import ReviewsNav from '@/components/business/reviews/ReviewsNav';

export default function ReviewsListPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  // Debounce search
  const handleSearch = useCallback((value) => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(value);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleFilter = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tüm Yorumlar
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tüm ürün yorumlarını buradan yönetin
        </p>
      </div>

      {/* Navigation */}
      <ReviewsNav />

      {/* İstatistikler */}
      <ReviewStats />

      {/* Arama ve Filtreler */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Yorum veya ürün ara..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 rounded-lg"
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

      {/* Filtreler Paneli */}
      {showFilters && <ReviewFilters onFilter={handleFilter} />}

      {/* Yorumlar Tablosu */}
      <ReviewsTable 
        searchQuery={searchQuery}
        filters={activeFilters}
      />
    </div>
  );
}