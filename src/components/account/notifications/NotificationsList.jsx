"use client";
import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { MoreVertical, Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function NotificationsList({ notifications }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMarkAsRead = (notificationId) => {
    toast.success('Bildirim okundu olarak işaretlendi');
    setActiveMenu(null);
  };

  const handleDelete = (notificationId) => {
    toast.success('Bildirim silindi');
    setActiveMenu(null);
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={`p-4 bg-white dark:bg-gray-800 rounded-xl border 
          ${notification.read 
            ? 'border-gray-200 dark:border-gray-700' 
            : 'border-primary/20 dark:border-primary/20 bg-primary/5 dark:bg-primary/5'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
              <span className="text-xl">{notification.icon}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {notification.content}
                  </p>
                  {notification.link && (
                    <Link 
                      href={notification.link}
                      className="inline-block mt-2 text-sm text-primary hover:text-primary-600"
                    >
                      Detayları görüntüle →
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDistanceToNow(new Date(notification.date), { 
                      addSuffix: true,
                      locale: tr 
                    })}
                  </span>

                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === notification.id ? null : notification.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {activeMenu === notification.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                      border border-gray-200 dark:border-gray-700 py-1 z-10">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
                            hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Okundu olarak işaretle
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 
                          dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Sil
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}