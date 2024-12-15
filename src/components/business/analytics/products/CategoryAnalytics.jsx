"use client";
import { useAnalytics } from '@/contexts/AnalyticsContext';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const mockDataByRange = {
  week: [
    { name: 'Elektronik', value: 45 },
    { name: 'Giyim', value: 25 },
    { name: 'Ev & Yaşam', value: 15 },
    { name: 'Kozmetik', value: 10 },
    { name: 'Diğer', value: 5 },
  ],
  month: [
    { name: 'Elektronik', value: 42 },
    { name: 'Giyim', value: 28 },
    { name: 'Ev & Yaşam', value: 18 },
    { name: 'Kozmetik', value: 8 },
    { name: 'Diğer', value: 4 },
  ],
  year: [
    { name: 'Elektronik', value: 40 },
    { name: 'Giyim', value: 30 },
    { name: 'Ev & Yaşam', value: 20 },
    { name: 'Kozmetik', value: 7 },
    { name: 'Diğer', value: 3 },
  ],
};

const COLORS = ['#6366F1', '#22C55E', '#EAB308', '#EC4899', '#6B7280'];

export default function CategoryAnalytics() {
  const { filters } = useAnalytics();
  const data = mockDataByRange[filters.dateRange];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border 
    border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Kategori Dağılımı
      </h2>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}