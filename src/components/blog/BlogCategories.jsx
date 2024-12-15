export default function BlogCategories({ categories }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sticky top-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Kategoriler
        </h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className="w-full flex items-center justify-between px-3 py-2 text-sm 
              text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
              rounded-lg transition-colors"
            >
              <span>{category.name}</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 
              dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }