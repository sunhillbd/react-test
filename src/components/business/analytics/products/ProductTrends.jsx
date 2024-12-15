"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const mockData = [
  {
    name: 'Ocak',
    views: 4000,
    sales: 2400,
    conversion: 60
  },
  {
    name: 'Şubat',
    views: 3000,
    sales: 1398,
    conversion: 47
  },
  {
    name: 'Mart',
    views: 2000,
    sales: 9800,
    conversion: 49
  },
  {
    name: 'Nisan',
    views: 2780,
    sales: 3908,
    conversion: 41
  },
  {
    name: 'Mayıs',
    views: 1890,
    sales: 4800,
    conversion: 54
  },
  {
    name: 'Haziran',
    views: 2390,
    sales: 3800,
    conversion: 45
  }
];

export default function ProductTrends() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border 
    border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Ürün Trendleri
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Görüntülenme
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Satış
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Dönüşüm
            </span>
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="views"
              name="Görüntülenme"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6' }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              name="Satış"
              stroke="#22C55E"
              strokeWidth={2}
              dot={{ fill: '#22C55E' }}
              activeDot={{ r: 6, fill: '#22C55E' }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversion"
              name="Dönüşüm (%)"
              stroke="#A855F7"
              strokeWidth={2}
              dot={{ fill: '#A855F7' }}
              activeDot={{ r: 6, fill: '#A855F7' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Toplam Görüntülenme
          </p>
          <p className="mt-1 text-2xl font-semibold text-blue-700 dark:text-blue-300">
            16,060
          </p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400">
            Toplam Satış
          </p>
          <p className="mt-1 text-2xl font-semibold text-green-700 dark:text-green-300">
            26,104
          </p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Ortalama Dönüşüm
          </p>
          <p className="mt-1 text-2xl font-semibold text-purple-700 dark:text-purple-300">
            49.3%
          </p>
        </div>
      </div>
    </div>
  );
}