"use client";
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockData = [
  { date: '1 Mart', revenue: 4000 },
  { date: '2 Mart', revenue: 3000 },
  { date: '3 Mart', revenue: 2000 },
  { date: '4 Mart', revenue: 2780 },
  { date: '5 Mart', revenue: 1890 },
  { date: '6 Mart', revenue: 2390 },
  { date: '7 Mart', revenue: 3490 }
];

export default function RevenueChart() {
  const [chartData] = useState(mockData);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border 
    border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Gelir Grafiği
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Toplam: ₺19,550
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => `₺${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
              formatter={(value) => [`₺${value}`, 'Gelir']}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ fill: '#6366F1' }}
              activeDot={{ r: 6, fill: '#6366F1' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}