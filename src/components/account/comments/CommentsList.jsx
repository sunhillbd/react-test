"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, MessageCircle, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CommentsList({ comments }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleDelete = (commentId) => {
    toast.error('Bu özellik henüz aktif değil');
    setActiveMenu(null);
  };

  const handleEdit = (commentId) => {
    toast.error('Bu özellik henüz aktif değil');
    setActiveMenu(null);
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div 
          key={comment.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex gap-4">
            {/* Ürün Resmi */}
            <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={comment.productImage}
                alt={comment.productName}
                fill
                className="object-cover"
              />
            </div>

            {/* İçerik */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {comment.productName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comment.brand}
                  </p>
                </div>

                {/* Menü */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === comment.id ? null : comment.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>

                  {activeMenu === comment.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                    border border-gray-200 dark:border-gray-700 py-1 z-10">
                      <button
                        onClick={() => handleEdit(comment.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
                        hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
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

              {/* Yorum */}
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {comment.comment}
              </p>

              {/* Alt Bilgiler */}
              <div className="mt-3 flex items-center gap-4">
                {/* Yıldızlar */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < comment.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* İstatistikler */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{comment.replies}</span>
                  </div>
                  <span>
                    {new Date(comment.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}