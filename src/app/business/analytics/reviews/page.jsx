import ReviewAnalyticsHeader from '@/components/business/analytics/reviews/ReviewAnalyticsHeader';
import ReviewStats from '@/components/business/analytics/reviews/ReviewStats';
import ReviewTrends from '@/components/business/analytics/reviews/ReviewTrends';
import TopReviewedProducts from '@/components/business/analytics/reviews/TopReviewedProducts';

export default function ReviewAnalyticsPage() {
  return (
    <div className="space-y-6">
      <ReviewAnalyticsHeader />
      <ReviewStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReviewTrends />
        <TopReviewedProducts />
      </div>
    </div>
  );
}