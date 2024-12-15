import { Star, MessageSquare, Clock, AlertTriangle } from 'lucide-react';

export default function ReviewStats() {
  const stats = [
    {
      title: "Ortalama Puan",
      value: "4.5",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "text-yellow-500"
    },
    {
      title: "Toplam Yorum",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    {
      title: "Yanıt Bekleyen",
      value: "23",
      change: "-5",
      trend: "down",
      icon: Clock,
      color: "text-orange-500"
    },
    {
      title: "Raporlanan",
      value: "5",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </h3>
            </div>
            <div className={`p-3 rounded-lg bg-opacity-10 ${stat.color}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium
              ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'}
            `}>
              {stat.change}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              geçen haftaya göre
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}