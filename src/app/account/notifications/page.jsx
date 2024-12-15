"use client";
import { useState, useEffect } from 'react';
import NotificationsList from "@/components/account/notifications/NotificationsList";
import NotificationFilters from "@/components/account/notifications/NotificationFilters";
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

// Fake API call
const fetchNotifications = async (page, filters) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const notificationTypes = [
    {
      type: 'comment_reply',
      title: 'Yorumunuza yanıt geldi',
      getContent: (data) => `${data.user} yorumunuza yanıt yazdı: "${data.comment}"`,
      icon: '💬'
    },
    {
      type: 'like',
      title: 'Yorumunuz beğenildi',
      getContent: (data) => `${data.user} yorumunuzu beğendi`,
      icon: '❤️'
    },
    {
      type: 'mention',
      title: 'Bir yorumda bahsedildiniz',
      getContent: (data) => `${data.user} sizi bir yorumda bahsetti`,
      icon: '@'
    },
    {
      type: 'system',
      title: 'Sistem bildirimi',
      getContent: (data) => data.message,
      icon: '🔔'
    }
  ];

  const users = [
    'Ahmet Yılmaz',
    'Mehmet Demir',
    'Ayşe Kaya',
    'Fatma Şahin',
    'Ali Öztürk'
  ];

  const products = [
    'iPhone 15 Pro',
    'Samsung Galaxy S24',
    'MacBook Air M3',
    'iPad Pro 2024',
    'AirPods Pro 2'
  ];

  // Test verileri oluştur
  const allNotifications = Array.from({ length: 50 }, (_, index) => {
    const notificationType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000));

    const data = {
      id: `notification-${Date.now()}-${index}`,
      type: notificationType.type,
      title: notificationType.title,
      icon: notificationType.icon,
      user,
      product,
      comment: "Harika bir ürün! Kesinlikle tavsiye ederim.",
      date: date.toISOString(),
      read: Math.random() > 0.5,
      link: `/products/${product.toLowerCase().replace(/ /g, '-')}`,
      message: 'Profiliniz başarıyla güncellendi.'
    };

    return {
      ...data,
      content: notificationType.getContent(data)
    };
  });

  // Filtreleme
  let filteredNotifications = allNotifications;

  if (filters.type && filters.type !== 'all') {
    filteredNotifications = filteredNotifications.filter(notification => 
      notification.type === filters.type
    );
  }

  if (filters.read === 'read') {
    filteredNotifications = filteredNotifications.filter(notification => notification.read);
  } else if (filters.read === 'unread') {
    filteredNotifications = filteredNotifications.filter(notification => !notification.read);
  }

  if (filters.date === 'today') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    filteredNotifications = filteredNotifications.filter(notification => 
      new Date(notification.date) >= today
    );
  } else if (filters.date === 'week') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    filteredNotifications = filteredNotifications.filter(notification => 
      new Date(notification.date) >= weekAgo
    );
  }

  // Sıralama
  filteredNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));

  const ITEMS_PER_PAGE = 10;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  return {
    notifications: filteredNotifications.slice(start, end),
    hasMore: end < filteredNotifications.length,
    total: filteredNotifications.length,
    unreadCount: filteredNotifications.filter(n => !n.read).length
  };
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ type: 'all', read: 'all', date: 'all' });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const { ref, inView } = useInView();

  const loadNotifications = async (currentPage, currentFilters, append = false) => {
    setLoading(true);
    try {
      const data = await fetchNotifications(currentPage, currentFilters);
      setNotifications(prev => append ? [...prev, ...data.notifications] : data.notifications);
      setHasMore(data.hasMore);
      setTotal(data.total);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications(1, filters, false);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prev => prev + 1);
      loadNotifications(page + 1, filters, true);
    }
  }, [inView, hasMore, loading]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bildirimlerim
        </h1>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
              {unreadCount} Okunmamış
            </span>
          )}
          <span className="px-3 py-1 text-sm font-medium text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 rounded-full">
            Toplam {total}
          </span>
        </div>
      </div>

      <NotificationFilters onFilterChange={handleFilterChange} />
      
      <div className="space-y-4">
        <NotificationsList notifications={notifications} />
        
        {hasMore && (
          <div ref={ref} className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}