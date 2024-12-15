"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { 
  Star, Bell, BellOff, MoreVertical, UserMinus, ExternalLink,
  MessageSquare, HelpCircle, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

export default function FollowingList({ following }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleUnfollow = (brandId) => {
    toast.success('Marka takipten çıkarıldı');
    setActiveMenu(null);
  };

  const handleToggleNotifications = (brandId, currentState) => {
    toast.success(`Bildirimler ${currentState ? 'kapatıldı' : 'açıldı'}`);
    setActiveMenu(null);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {following.map((follow) => (
        <div 
          key={follow.id}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
          overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={follow.brand.logo}
                  alt={follow.brand.name}
                  fill
                  className="object-cover rounded-xl"
                />
                {follow.brand.verified && (
                  <div className="absolute -right-1 -bottom-1 bg-white dark:bg-gray-800 rounded-full p-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/brands/${follow.brand.id}`}>
                      <h3 className="font-medium text-gray-900 dark:text-white hover:text-primary">
                        {follow.brand.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {follow.brand.category}
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === follow.id ? null : follow.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {activeMenu === follow.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                      border border-gray-200 dark:border-gray-700 py-1 z-10">
                        <button
                          onClick={() => handleToggleNotifications(follow.brand.id, follow.notifications)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
                          hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          {follow.notifications ? (
                            <>
                              <BellOff className="w-4 h-4" />
                              Bildirimleri Kapat
                            </>
                          ) : (
                            <>
                              <Bell className="w-4 h-4" />
                              Bildirimleri Aç
                            </>
                          )}
                        </button>
                        <a
                          href={follow.brand.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
                          hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Web Sitesi
                        </a>
                        <button
                          onClick={() => handleUnfollow(follow.brand.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 
                          dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <UserMinus className="w-4 h-4" />
                          Takibi Bırak
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatNumber(follow.brand.followers)}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">Takipçi</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {follow.brand.productsCount}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">Ürün</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center justify-center">
                      {follow.brand.rating}
                      <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">Puan</div>
                  </div>
                </div>
              </div>
            </div>

            {follow.lastActivity && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-600 dark:text-gray-300">
                    {follow.lastActivity.content}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDistanceToNow(new Date(follow.lastActivity.date), { 
                      addSuffix: true,
                      locale: tr 
                    })}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{formatNumber(follow.brand.stats.reviews)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  <span>{formatNumber(follow.brand.stats.questions)}</span>
                </div>
              </div>
              <span>
                {formatDistanceToNow(new Date(follow.followDate), { 
                  addSuffix: true,
                  locale: tr 
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}