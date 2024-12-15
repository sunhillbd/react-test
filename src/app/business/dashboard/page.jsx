"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Star,
  ShoppingBag,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import StatCard from "@/components/business/dashboard/StatCard";
import RecentReviews from "@/components/business/dashboard/RecentReviews";
import AnalyticsChart from "@/components/business/dashboard/AnalyticsChart";
import AlertsList from "@/components/business/dashboard/AlertsList";
import { useUser } from "@/services/User";

export default function DashboardPage() {
  const { user, getUser } = useUser();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Toplam Takipçi",
      value: "12,345",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Ortalama Puan",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Star,
    },
    {
      title: "Aktif Ürün",
      value: "89",
      change: "-2",
      trend: "down",
      icon: ShoppingBag,
    },
    {
      title: "Yeni Yorum",
      value: "34",
      change: "+5",
      trend: "up",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Merhaba, {user.name} 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            İşte markanızın genel durumu
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="px-4 py-2 text-sm font-medium text-white 
          bg-primary rounded-lg hover:bg-primary-600 transition-colors"
          >
            Yeni Ürün Ekle
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Performans Analizi
            </h2>
            <AnalyticsChart />
          </div>
        </div>

        {/* Alerts */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Önemli Bildirimler
            </h2>
            <AlertsList />
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Son Yorumlar
        </h2>
        <RecentReviews />
      </div>
    </div>
  );
}
