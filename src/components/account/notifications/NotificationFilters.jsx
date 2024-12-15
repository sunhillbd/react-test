"use client";
import { useState } from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';

export default function NotificationFilters({ onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    read: 'all',
    date: 'all'
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
            placeholder="Bildirimlerde ara..."
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bildirim Tipi
            </label>
            <select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <option value="all">Tümü</option>
              <option value="comment_reply">Yorum Yanıtları</option>
              <option value="like">Beğeniler</option>
              <option value="mention">Bahsedilmeler</option>
              <option value="system">Sistem Bildirimleri</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Okunma Durumu
            </label>
            <select 
              value={filters.read}
              onChange={(e) => handleFilterChange('read', e.target.value)}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <option value="all">Tümü</option>
              <option value="unread">Okunmamış</option>
              <option value="read">Okunmuş</option>
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
              <option value="all">Tümü</option>
              <option value="today">Bugün</option>
              <option value="week">Son 1 Hafta</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}