"use client";
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function LikesFilters({ onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    brand: 'all',
    category: 'all',
    date: 'all',
    sort: 'newest',
    search: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="space-y-4 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 py-4 transition-colors duration-200">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Beğendiğiniz ürünlerde ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 rounded-xl 
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary
            transition-colors duration-200"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
          text-gray-400 dark:text-gray-500" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2.5 flex items-center gap-2 
          bg-white dark:bg-gray-800 
          text-gray-700 dark:text-gray-200
          border border-gray-200 dark:border-gray-700 rounded-xl 
          hover:bg-gray-50 dark:hover:bg-gray-700
          transition-colors duration-200"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filtrele</span>
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 
        p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 transition-colors duration-200">
          {/* Filter options */}
        </div>
      )}
    </div>
  );
}