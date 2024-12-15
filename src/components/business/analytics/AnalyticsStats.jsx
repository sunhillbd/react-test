import { TrendingUp, Star, ShoppingBag, Users } from 'lucide-react';
import StatCard from '@/components/business/analytics/StatCard';

export default function AnalyticsStats() {
  const stats = [
    {
      title: "Toplam Satış",
      value: "₺124,592",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Ortalama Puan",
      value: "4.8",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-yellow-500"
    },
    {
      title: "Toplam Ürün",
      value: "847",
      change: "+24",
      trend: "up",
      icon: ShoppingBag,
      color: "text-blue-500"
    },
    {
      title: "Aktif Müşteri",
      value: "2,945",
      change: "+18.2%",
      trend: "up",
      icon: Users,
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