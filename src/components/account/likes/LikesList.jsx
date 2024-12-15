"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Star, Heart, MoreVertical, Trash2, PencilLine } from 'lucide-react';
import { toast } from 'sonner';

export default function LikesList({ likes }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleRemoveLike = (likeId) => {
    toast.success('Ürün beğenilenlerden kaldırıldı');
    setActiveMenu(null);
  };

  const handleAddNote = (likeId) => {
    toast.error('Bu özellik henüz aktif değil');
    setActiveMenu(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {likes.map((like) => (
        <div 
          key={like.id}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
          overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <Link href={`/products/${like.product.id}`}>
            <div className="relative h-48 w-full">
              <Image
                src={like.product.image}
                alt={like.product.name}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link href={`/products/${like.product.id}`}>
                  <h3 className="font-medium text-gray-900 dark:text-white hover:text-primary">
                    {like.product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {like.product.brand}
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === like.id ? null : like.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>

                {activeMenu === like.id && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                  border border-gray-200 dark:border-gray-700 py-1 z-10">
                    <button
                      onClick={() => handleAddNote(like.id)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
                      hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <PencilLine className="w-4 h-4" />
                      Not Ekle
                    </button>
                    <button
                      onClick={() => handleRemoveLike(like.id)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 
                      dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Kaldır
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(like.product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({like.product.reviewCount})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  {like.product.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(like.date), { 
                    addSuffix: true,
                    locale: tr 
                  })}
                </span>
              </div>

              {like.note && (
                <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 
                p-2 rounded-lg">
                  {like.note}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}