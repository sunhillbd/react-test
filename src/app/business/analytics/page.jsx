"use client";
import { useAnalytics } from '@/contexts/AnalyticsContext';
import AnalyticsOverview from '@/components/business/analytics/AnalyticsOverview';
import AnalyticsStats from '@/components/business/analytics/AnalyticsStats';
import RevenueChart from '@/components/business/analytics/RevenueChart';
import TopProducts from '@/components/business/analytics/TopProducts';

export default function AnalyticsPage() {
  const { filters } = useAnalytics();

  return (
    <div className="space-y-6">
      <AnalyticsOverview />
      <AnalyticsStats dateRange={filters.dateRange} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart dateRange={filters.dateRange} />
        <TopProducts dateRange={filters.dateRange} />
      </div>
    </div>
  );
}