"use client";
import { useAnalytics } from '@/contexts/AnalyticsContext';

export default function ReviewAnalyticsHeader() {
  const { filters, updateFilters } = useAnalytics();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start 
    sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Yorum Analizleri
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Müşteri yorumlarının detaylı analizi
        </p>
      </div>

      <div className="flex gap-4">
        <select
          value={filters.reviewType}
          onChange={(e) => updateFilters({ reviewType: e.target.value })}
          className="px-4 py-2 bg-white dark:bg-gray-800 border 
          border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <option value="all">Tüm Yorumlar</option>
          <option value="positive">Olumlu Yorumlar</option>
          <option value="negative">Olumsuz Yorumlar</option>
          <option value="neutral">Nötr Yorumlar</option>
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