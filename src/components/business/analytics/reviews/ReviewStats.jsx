import { MessageSquare, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import StatCard from '@/components/business/analytics/StatCard';

export default function ReviewStats() {
  const stats = [
    {
      title: "Toplam Yorum",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    {
      title: "Olumlu Yorumlar",
      value: "892",
      change: "+8.3%",
      trend: "up",
      icon: ThumbsUp,
      color: "text-green-500"
    },
    {
      title: "Olumsuz Yorumlar",
      value: "156",
      change: "-2.4%",
      trend: "down",
      icon: ThumbsDown,
      color: "text-red-500"
    },
    {
      title: "Ortalama Yanıt Süresi",
      value: "2.4 saat",
      change: "-15%",
      trend: "up",
      icon: Clock,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}