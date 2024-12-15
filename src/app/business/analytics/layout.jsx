import { AnalyticsProvider } from '@/contexts/AnalyticsContext';

export default function AnalyticsLayout({ children }) {
  return (
    <AnalyticsProvider>
      {children}
    </AnalyticsProvider>
  );
}