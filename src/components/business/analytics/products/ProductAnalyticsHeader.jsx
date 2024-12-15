"use client";
import { useAnalytics } from '@/contexts/AnalyticsContext';

export default function ProductAnalyticsHeader() {
  const { filters, updateFilters } = useAnalytics();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start 
    sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Ürün Analizleri
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ürünlerinizin performansını analiz edin
        </p>
      </div>

      <div className="flex gap-4">
        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="px-4 py-2 bg-white dark:bg-gray-800 border 
          border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <option value="all">Tüm Kategoriler</option>
          <option value="electronics">Elektronik</option>
          <option value="clothing">Giyim</option>
          <option value="home">Ev & Yaşam</option>
          <option value="beauty">Kozmetik</option>
        </select>

        <select
          value={filters.dateRange}
          onChange={(e) => updateFilters({ dateRange: e.target.value })}
          className="px-4 py-2 bg-white dark:bg-gray-800 border 
          border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <option value="week">Son 7 Gün</option>
          <option value="month">Son 30 Gün</option>
          <option value="year">Son 1 Yıl</option>
        </select>
      </div>
    </div>
  );
}