import { Star, MoreVertical, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function ReviewRow({ review, onReply, onDelete }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'answered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'reported':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
      {/* Kullanıcı */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative rounded-full overflow-hidden">
            <Image
              src={review.user.avatar}
              alt={review.user.name}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {review.user.name}
          </span>
        </div>
      </td>
      
      {/* Ürün */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative rounded-lg overflow-hidden">
            <Image
              src={review.product.image}
              alt={review.product.name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-900 dark:text-white">
              {review.product.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {review.product.category}
            </span>
          </div>
        </div>
      </td>

      {/* Puan */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1">
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
      </td>

      {/* Yorum */}
      <td className="px-6 py-4">
        <div className="max-w-md">
          <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
            {review.comment}
          </p>
          {review.reply && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic line-clamp-1">
              Yanıt: {review.reply}
            </p>
          )}
        </div>
      </td>

      {/* Tarih */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(review.date).toLocaleDateString('tr-TR')}
        </span>
      </td>

      {/* Durum */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${getStatusBadgeClass(review.status)}`}>
          {review.status === 'pending' ? 'Yanıt Bekliyor'
            : review.status === 'answered' ? 'Yanıtlandı'
            : 'Raporlandı'}
        </span>
      </td>

      {/* İşlemler */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onReply(review)}
            className="p-2 text-blue-600 hover:text-blue-700 
            dark:text-blue-400 dark:hover:text-blue-300 
            hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="p-2 text-red-600 hover:text-red-700 
            dark:text-red-400 dark:hover:text-red-300 
            hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}