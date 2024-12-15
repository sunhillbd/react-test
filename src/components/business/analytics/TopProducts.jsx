export default function TopProducts() {
    const products = [
      {
        id: 1,
        name: 'iPhone 14 Pro',
        category: 'Elektronik',
        sales: 245,
        revenue: 735000,
        trend: 'up'
      },
      {
        id: 2,
        name: 'Samsung Galaxy S23',
        category: 'Elektronik',
        sales: 189,
        revenue: 567000,
        trend: 'up'
      },
      {
        id: 3,
        name: 'MacBook Pro M2',
        category: 'Elektronik',
        sales: 156,
        revenue: 468000,
        trend: 'down'
      },
      {
        id: 4,
        name: 'AirPods Pro',
        category: 'Elektronik',
        sales: 134,
        revenue: 402000,
        trend: 'up'
      },
      {
        id: 5,
        name: 'iPad Air',
        category: 'Elektronik',
        sales: 98,
        revenue: 294000,
        trend: 'down'
      }
    ];
  
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border 
      border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          En Çok Satan Ürünler
        </h2>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium 
              text-gray-500 dark:text-gray-400">
                <th className="pb-3">Ürün</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3 text-right">Satış</th>
                <th className="pb-3 text-right">Gelir</th>
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
                  <td className="py-3 text-right text-gray-900 dark:text-white">
                    {product.sales}
                  </td>
                  <td className="py-3 text-right text-gray-900 dark:text-white">
                    ₺{product.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }