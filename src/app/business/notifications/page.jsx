"use client";
import { useState } from 'react';
import { 
  Bell, 
  Star, 
  MessageSquare, 
  ShoppingBag, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'review',
    title: 'Yeni Değerlendirme',
    message: 'Ahmet Y. işletmenize 5 yıldız verdi',
    rating: 5,
    time: '5 dakika önce',
    read: false,
    icon: Star
  },
  {
    id: 2,
    type: 'comment',
    title: 'Yeni Yorum',
    message: 'Mehmet K. işletmeniz hakkında yorum yaptı: "Harika hizmet, teşekkürler!"',
    time: '1 saat önce',
    read: false,
    icon: MessageSquare
  },
  {
    id: 3,
    type: 'order',
    title: 'Yeni Sipariş',
    message: 'Yeni bir sipariş alındı #12345',
    time: '2 saat önce',
    read: true,
    icon: ShoppingBag
  },
  {
    id: 4,
    type: 'alert',
    title: 'Sistem Uyarısı',
    message: 'Aboneliğiniz 5 gün içinde sona erecek',
    time: '1 gün önce',
    read: true,
    icon: AlertTriangle
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Başlık ve Filtreler */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Bildirimler
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tüm bildirimlerinizi buradan yönetebilirsiniz
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 
            dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 
            focus:border-primary transition-colors"
          >
            <option value="all">Tümü</option>
            <option value="unread">Okunmamış</option>
            <option value="review">Değerlendirmeler</option>
            <option value="comment">Yorumlar</option>
            <option value="order">Siparişler</option>
            <option value="alert">Uyarılar</option>
          </select>

          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-600 
            transition-colors"
          >
            Tümünü Okundu İşaretle
          </button>
        </div>
      </div>

      {/* Bildirim Listesi */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 p-4 rounded-xl border 
            ${notification.read 
              ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
              : 'bg-primary/5 dark:bg-primary/10 border-primary/10 dark:border-primary/20'
            }`}
          >
            <div className={`p-2 rounded-lg 
              ${notification.read 
                ? 'bg-gray-100 dark:bg-gray-700' 
                : 'bg-primary/10 dark:bg-primary/20'
              }`}
            >
              <notification.icon className={`w-5 h-5 
                ${notification.read 
                  ? 'text-gray-500 dark:text-gray-400' 
                  : 'text-primary'
                }`} 
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>
                </div>
                {notification.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {notification.rating}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {notification.time}
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs font-medium text-primary hover:text-primary-600 
                    transition-colors"
                  >
                    Okundu İşaretle
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Bildirim Bulunamadı
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Seçili filtreye uygun bildirim bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}