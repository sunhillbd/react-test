"use client";
import { useState, useEffect } from 'react';
import CommentsList from "@/components/account/comments/CommentsList";
import CommentFilters from "@/components/account/comments/CommentFilters";
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

// Fake API call
const fetchComments = async (page, filters) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test verileri - benzersiz ID'ler ile
  const allComments = Array.from({ length: 50 }, (_, index) => ({
    id: `comment-${Date.now()}-${index}`, // Benzersiz ID oluşturma
    productName: [
      "iPhone 15 Pro Max",
      "Samsung Galaxy S24 Ultra",
      "MacBook Air M3",
      "iPad Pro 2024",
      "Galaxy Watch 6",
      "AirPods Pro 2",
    ][Math.floor(Math.random() * 6)],
    productImage: [
      "/assets/products/iphone15.jpg",
      "/assets/products/s24ultra.jpg",
      "/assets/products/macbookair.jpg",
      "/assets/products/ipadpro.jpg",
      "/assets/products/galaxywatch.jpg",
      "/assets/products/airpods.jpg",
    ][Math.floor(Math.random() * 6)],
    brand: ["Apple", "Samsung", "Xiaomi"][Math.floor(Math.random() * 3)],
    comment: [
      "Harika bir ürün, kesinlikle tavsiye ederim.",
      "Fiyat/performans açısından çok başarılı.",
      "Beklentilerimi karşılamadı.",
      "Uzun süredir kullanıyorum, çok memnunum.",
      "Tasarımı çok şık ama batarya ömrü yetersiz.",
      "Kamera performansı etkileyici.",
    ][Math.floor(Math.random() * 6)],
    rating: Math.floor(Math.random() * 5) + 1,
    likes: Math.floor(Math.random() * 100),
    replies: Math.floor(Math.random() * 20),
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    status: ["published", "pending", "rejected"][Math.floor(Math.random() * 3)]
  }));

  // Filtreleme
  let filteredComments = allComments;
  
  if (filters.brand) {
    filteredComments = filteredComments.filter(comment => 
      comment.brand.toLowerCase() === filters.brand.toLowerCase()
    );
  }

  if (filters.rating) {
    filteredComments = filteredComments.filter(comment => 
      comment.rating === parseInt(filters.rating)
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredComments = filteredComments.filter(comment => 
      comment.comment.toLowerCase().includes(searchTerm) ||
      comment.productName.toLowerCase().includes(searchTerm) ||
      comment.brand.toLowerCase().includes(searchTerm)
    );
  }

  // Sıralama
  if (filters.date === 'oldest') {
    filteredComments.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (filters.date === 'last-week') {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    filteredComments = filteredComments.filter(comment => 
      new Date(comment.date) >= oneWeekAgo
    );
  } else if (filters.date === 'last-month') {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    filteredComments = filteredComments.filter(comment => 
      new Date(comment.date) >= oneMonthAgo
    );
  } else {
    filteredComments.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const ITEMS_PER_PAGE = 10;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  
  return {
    comments: filteredComments.slice(start, end),
    hasMore: end < filteredComments.length,
    total: filteredComments.length
  };
};

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const { ref, inView } = useInView();

  const loadComments = async (currentPage, currentFilters, append = false) => {
    setLoading(true);
    try {
      const data = await fetchComments(currentPage, currentFilters);
      setComments(prev => append ? [...prev, ...data.comments] : data.comments);
      setHasMore(data.hasMore);
      setTotal(data.total);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments(1, filters, false);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prev => prev + 1);
      loadComments(page + 1, filters, true);
    }
  }, [inView, hasMore, loading]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Yorumlarım
        </h1>
        <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
          {total} Yorum
        </span>
      </div>

      <CommentFilters onFilterChange={handleFilterChange} />
      
      <div className="space-y-4">
        <CommentsList comments={comments} />
        
        {hasMore && (
          <div ref={ref} className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}