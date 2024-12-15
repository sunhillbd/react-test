"use client";
import { useAnalytics } from '@/contexts/AnalyticsContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const mockDataByRange = {
  week: [
    { day: 'Pzt', positive: 25, negative: 5, neutral: 8 },
    { day: 'Sal', positive: 30, negative: 3, neutral: 7 },
    { day: 'Çar', positive: 28, negative: 4, neutral: 6 },
    { day: 'Per', positive: 32, negative: 2, neutral: 5 },
    { day: 'Cum', positive: 35, negative: 3, neutral: 4 },
    { day: 'Cmt', positive: 40, negative: 2, neutral: 3 },
    { day: 'Paz', positive: 38, negative: 1, neutral: 2 },
  ],
  month: [
    { week: 'Hafta 1', positive: 150, negative: 20, neutral: 30 },
    { week: 'Hafta 2', positive: 165, negative: 18, neutral: 27 },
    { week: 'Hafta 3', positive: 180, negative: 15, neutral: 25 },
    { week: 'Hafta 4', positive: 195, negative: 12, neutral: 23 },
  ],
  year: [
    { month: 'Oca', positive: 650, negative: 120, neutral: 230 },
    { month: 'Şub', positive: 750, negative: 80, neutral: 170 },
    { month: 'Mar', positive: 820, negative: 50, neutral: 130 },
    { month: 'Nis', positive: 700, negative: 150, neutral: 150 },
    { month: 'May', positive: 850, negative: 70, neutral: 80 },
    { month: 'Haz', positive: 900, negative: 40, neutral: 60 },
  ],
};

export default function ReviewTrends() {
  const { filters } = useAnalytics();
  
  const data = mockDataByRange[filters.dateRange];
  const xAxisKey = filters.dateRange === 'week' ? 'day' 
    : filters.dateRange === 'month' ? 'week' 
    : 'month';

  const filteredData = data.map(item => {
    if (filters.reviewType === 'all') return item;
    
    return {
      [xAxisKey]: item[xAxisKey],
      [filters.reviewType]: item[filters.reviewType]
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border 
    border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Yorum Trendleri
      </h2>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
            />
            <Legend />
            {(filters.reviewType === 'all' || filters.reviewType === 'positive') && (
              <Bar dataKey="positive" name="Olumlu" fill="#22C55E" />
            )}
            {(filters.reviewType === 'all' || filters.reviewType === 'negative') && (
              <Bar dataKey="negative" name="Olumsuz" fill="#EF4444" />
            )}
            {(filters.reviewType === 'all' || filters.reviewType === 'neutral') && (
              <Bar dataKey="neutral" name="Nötr" fill="#6B7280" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400">
            Olumlu Yorum Oranı
          </p>
          <p className="mt-1 text-2xl font-semibold text-green-700 dark:text-green-300">
            78.2%
          </p>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            Olumsuz Yorum Oranı
          </p>
          <p className="mt-1 text-2xl font-semibold text-red-700 dark:text-red-300">
            8.5%
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Nötr Yorum Oranı
          </p>
          <p className="mt-1 text-2xl font-semibold text-gray-700 dark:text-gray-300">
            13.3%
          </p>
        </div>
      </div>
    </div>
  );
}