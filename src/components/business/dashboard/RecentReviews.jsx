import { Star } from 'lucide-react';

export default function RecentReviews() {
  const reviews = [
    {
      id: 1,
      user: {
        name: 'Ahmet Y.',
        avatar: '/avatars/1.jpg'
      },
      product: 'Ürün Adı 1',
      rating: 5,
      comment: 'Harika bir ürün, çok memnun kaldım.',
      date: '2 saat önce',
      status: 'pending'
    },
    // ... diğer yorumlar
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600" />
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {review.user.name}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {review.date}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {review.product}
            </p>
            
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
            
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {review.comment}
            </p>
            
            {review.status === 'pending' && (
              <button className="mt-3 text-sm text-primary hover:text-primary-600">
                Yanıtla
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}