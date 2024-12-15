"use client";
import { useState } from 'react';

export default function AnalyticsOverview() {
  const [dateRange, setDateRange] = useState('week');

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          İşletmenizin performans metriklerini görüntüleyin
        </p>
      </div>

      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-gray-800 border 
        border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <option value="week">Son 7 Gün</option>
        <option value="month">Son 30 Gün</option>
        <option value="year">Son 1 Yıl</option>
      </select>
    </div>
  );
}