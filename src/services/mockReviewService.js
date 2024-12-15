// Mock veriler
const MOCK_REVIEWS = [
  {
    id: 1,
    user: {
      name: "Ahmet Yılmaz",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    product: {
      name: "iPhone 14 Pro",
      image: "https://picsum.photos/seed/iphone/200"
    },
    rating: 4,
    comment: "Ürün beklediğim gibi çıktı, çok memnunum.",
    date: "2024-03-15",
    status: "pending"
  },
  {
    id: 2,
    user: {
      name: "Zeynep Demir",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    product: {
      name: "Samsung Galaxy S23",
      image: "https://picsum.photos/seed/samsung/200"
    },
    rating: 5,
    comment: "Harika bir telefon, kamerası muhteşem.",
    date: "2024-03-14",
    status: "answered"
  },
  {
    id: 3,
    user: {
      name: "Mehmet Kaya",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    product: {
      name: "MacBook Pro M2",
      image: "https://picsum.photos/seed/macbook/200"
    },
    rating: 3,
    comment: "Fiyatı biraz yüksek ama kaliteli.",
    date: "2024-03-13",
    status: "reported"
  },
  // ... daha fazla mock veri eklenebilir
];

export const generateMockReviews = (page, limit = 10) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return MOCK_REVIEWS.slice(start, end);
};

export const filterMockReviews = (reviews, { searchQuery, filterStatus }) => {
  return reviews.filter(review => {
    if (filterStatus && review.status !== filterStatus) return false;
    
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        review.user.name.toLowerCase().includes(searchLower) ||
        review.product.name.toLowerCase().includes(searchLower) ||
        review.comment.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};