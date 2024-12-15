"use client";
import { createContext, useContext, useState } from 'react';

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [filters, setFilters] = useState({
    dateRange: 'week',
    category: 'all',
    reviewType: 'all',
  });

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <AnalyticsContext.Provider value={{ filters, updateFilters }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);