export default function StatCard({ title, value, change, trend, icon: Icon }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </h3>
          </div>
          <div className={`p-3 rounded-lg 
            ${trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}
          `}>
            <Icon className={`w-6 h-6 
              ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
            `} />
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium
            ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
          `}>
            {change}
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            geçen haftaya göre
          </span>
        </div>
      </div>
    );
  }