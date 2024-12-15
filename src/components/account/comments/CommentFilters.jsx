"use client";
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function CommentFilters({ onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    rating: '',
    date: 'newest'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="space-y-4 sticky top-0 bg-gray-50 dark:bg-black-secondary z-10 py-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Yorumlarınızda arayın..."
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 
            dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2.5 flex items-center gap-2 text-gray-700 dark:text-gray-200 
          bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl 
          hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filtrele</span>
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Marka
            </label>
            <select 
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <option value="">Tümü</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="xiaomi">Xiaomi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Puan
            </label>
            <select 
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <option value="">Tümü</option>
              <option value="5">5 Yıldız</option>
              <option value="4">4 Yıldız</option>
              <option value="3">3 Yıldız</option>
              <option value="2">2 Yıldız</option>
              <option value="1">1 Yıldız</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tarih
            </label>
            <select 
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="last-week">Son 1 Hafta</option>
              <option value="last-month">Son 1 Ay</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}