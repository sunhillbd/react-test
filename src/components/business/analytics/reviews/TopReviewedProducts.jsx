import { Star } from 'lucide-react';

export default function TopReviewedProducts() {
  const products = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      category: 'Elektronik',
      rating: 4.8,
      totalReviews: 245,
      positivePercent: 92
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      category: 'Elektronik',
      rating: 4.6,
      totalReviews: 189,
      positivePercent: 88
    },
    // ... diğer ürünler
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border 
    border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        En Çok Yorumlanan Ürünler
      </h2>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg border border-gray-200 
            dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 
            transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.category}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.rating}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-gray-500 dark:text-gray-400">
                {product.totalReviews} yorum
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 rounded-full h-2"
                    style={{ width: `${product.positivePercent}%` }}
                  />
                </div>
                <span className="text-gray-900 dark:text-white">
                  {product.positivePercent}% olumlu
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}