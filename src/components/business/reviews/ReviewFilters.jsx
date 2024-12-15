"use client";
import { useState, useEffect } from 'react';

export default function ReviewFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    rating: '',
    status: '',
    startDate: '',
    endDate: '',
    sortBy: 'newest'
  });

  // Filtre değişikliklerini parent komponente bildir
  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  const handleReset = () => {
    setFilters({
      rating: '',
      status: '',
      startDate: '',
      endDate: '',
      sortBy: 'newest'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border 
    border-gray-200 dark:border-gray-700 p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Puan Filtresi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 
          dark:text-gray-300 mb-1">
            Puan
          </label>
          <select
            value={filters.rating}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              rating: e.target.value 
            }))}
            className="w-full p-2 bg-white dark:bg-gray-800 border 
            border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <option value="">Tüm Puanlar</option>
            <option value="5">5 Yıldız</option>
            <option value="4">4 Yıldız</option>
            <option value="3">3 Yıldız</option>
            <option value="2">2 Yıldız</option>
            <option value="1">1 Yıldız</option>
          </select>
        </div>

        {/* Durum Filtresi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 
          dark:text-gray-300 mb-1">
            Durum
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              status: e.target.value 
            }))}
            className="w-full p-2 bg-white dark:bg-gray-800 border 
            border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <option value="">Tüm Durumlar</option>
            <option value="pending">Yanıt Bekleyen</option>
            <option value="answered">Yanıtlanmış</option>
            <option value="reported">Raporlanmış</option>
          </select>
        </div>

        {/* Tarih Aralığı */}
        <div>
          <label className="block text-sm font-medium text-gray-700 
          dark:text-gray-300 mb-1">
            Başlangıç Tarihi
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              startDate: e.target.value 
            }))}
            className="w-full p-2 bg-white dark:bg-gray-800 border 
            border-gray-200 dark:border-gray-700 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 
          dark:text-gray-300 mb-1">
            Bitiş Tarihi
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              endDate: e.target.value 
            }))}
            className="w-full p-2 bg-white dark:bg-gray-800 border 
            border-gray-200 dark:border-gray-700 rounded-lg"
          />
        </div>

        {/* Sıralama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 
          dark:text-gray-300 mb-1">
            Sıralama
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              sortBy: e.target.value 
            }))}
            className="w-full p-2 bg-white dark:bg-gray-800 border 
            border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="rating_high">En Yüksek Puan</option>
            <option value="rating_low">En Düşük Puan</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 
          hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Sıfırla
        </button>
        <button
          onClick={() => onFilter(filters)}
          className="px-4 py-2 text-sm text-white bg-primary 
          hover:bg-primary-600 rounded-lg transition-colors"
        >
          Uygula
        </button>
      </div>
    </div>
  );
}