"use client";
import { useState } from 'react';
import { X, Star } from 'lucide-react';
import Image from 'next/image';

export default function ReviewReplyModal({ isOpen, review, onClose, onSubmit }) {
  const [reply, setReply] = useState('');

  if (!isOpen || !review) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(review.id, reply);
    setReply('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b 
        border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Yoruma Yanıt Ver
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 
            dark:text-gray-400 dark:hover:text-gray-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Review Details */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={review.user.avatar}
                alt={review.user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {review.user.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString('tr-TR')}
                </span>
              </div>
              
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-2">
                <p className="text-gray-900 dark:text-white">
                  {review.comment}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={review.product.image}
                    alt={review.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {review.product.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label
              htmlFor="reply"
              className="block text-sm font-medium text-gray-700 
              dark:text-gray-300 mb-2"
            >
              Yanıtınız
            </label>
            <textarea
              id="reply"
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 
              border border-gray-300 dark:border-gray-700 rounded-lg 
              focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Yoruma yanıtınızı yazın..."
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 
              dark:text-gray-200 bg-white dark:bg-gray-800 border 
              border-gray-300 dark:border-gray-700 rounded-lg 
              hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white 
              bg-primary rounded-lg hover:bg-primary-600"
            >
              Yanıtı Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}