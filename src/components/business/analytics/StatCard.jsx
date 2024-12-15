export default function StatCard({ title, value, change, trend, icon: Icon, color }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border 
      border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {value}
            </h3>
          </div>
          <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
        <div className="mt-4">
          <span className={`text-sm font-medium ${
            trend === 'up' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {change}
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            geçen döneme göre
          </span>
        </div>
      </div>
    );
  }