"use client";
import { useAnalytics } from '@/contexts/AnalyticsContext';

const mockProducts = {
  electronics: [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      category: 'Elektronik',
      rating: 4.8,
      reviews: 245,
      sales: '₺735,000',
      performance: 95
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      category: 'Elektronik',
      rating: 4.6,
      reviews: 189,
      sales: '₺567,000',
      performance: 88
    }
  ],
  clothing: [
    {
      id: 3,
      name: 'Nike Air Max',
      category: 'Giyim',
      rating: 4.5,
      reviews: 156,
      sales: '₺89,000',
      performance: 82
    }
  ],
  home: [
    {
      id: 4,
      name: 'Philips Airfryer',
      category: 'Ev & Yaşam',
      rating: 4.7,
      reviews: 134,
      sales: '₺45,000',
      performance: 91
    }
  ],
  beauty: [
    {
      id: 5,
      name: 'MAC Ruj',
      category: 'Kozmetik',
      rating: 4.4,
      reviews: 98,
      sales: '₺12,000',
      performance: 79
    }
  ]
};

export default function ProductPerformance() {
  const { filters } = useAnalytics();

  const getFilteredProducts = () => {
    if (filters.category === 'all') {
      return Object.values(mockProducts).flat();
    }
    return mockProducts[filters.category] || [];
  };

  const products = getFilteredProducts();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border 
    border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Ürün Performansı
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium 
            text-gray-500 dark:text-gray-400">
              <th className="pb-3">Ürün</th>
              <th className="pb-3">Kategori</th>
              <th className="pb-3 text-center">Puan</th>
              <th className="pb-3 text-center">Yorum</th>
              <th className="pb-3 text-right">Satış</th>
              <th className="pb-3 text-right">Performans</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="text-sm">
                <td className="py-3 text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td className="py-3 text-gray-500 dark:text-gray-400">
                  {product.category}
                </td>
                <td className="py-3 text-center text-gray-900 dark:text-white">
                  {product.rating}
                </td>
                <td className="py-3 text-center text-gray-900 dark:text-white">
                  {product.reviews}
                </td>
                <td className="py-3 text-right text-gray-900 dark:text-white">
                  {product.sales}
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${product.performance}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {product.performance}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}