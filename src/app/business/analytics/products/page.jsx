import ProductAnalyticsHeader from '@/components/business/analytics/products/ProductAnalyticsHeader';
import ProductPerformance from '@/components/business/analytics/products/ProductPerformance';
import CategoryAnalytics from '@/components/business/analytics/products/CategoryAnalytics';
import ProductTrends from '@/components/business/analytics/products/ProductTrends';

export default function ProductAnalyticsPage() {
  return (
    <div className="space-y-6">
      <ProductAnalyticsHeader />
      <ProductPerformance />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryAnalytics />
        <ProductTrends />
      </div>
    </div>
  );
}