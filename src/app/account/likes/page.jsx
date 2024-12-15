"use client";
import { useState, useEffect } from 'react';
import LikesList from "@/components/account/likes/LikesList";
import LikesFilters from "@/components/account/likes/LikesFilters";
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

// Fake API call
const fetchLikes = async (page, filters) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      category: "Telefon",
      image: "/assets/products/iphone15.jpg",
      rating: 4.8,
      reviewCount: 1250,
      price: "84.999 TL",
      specs: ["A17 Pro", "6.7\" OLED", "48MP Kamera"]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      category: "Telefon",
      image: "/assets/products/s24ultra.jpg",
      rating: 4.7,
      reviewCount: 856,
      price: "79.999 TL",
      specs: ["Snapdragon 8 Gen 3", "6.8\" AMOLED", "200MP Kamera"]
    },
    {
      id: 3,
      name: "MacBook Air M3",
      brand: "Apple",
      category: "Laptop",
      image: "/assets/products/macbookair.jpg",
      rating: 4.9,
      reviewCount: 543,
      price: "52.999 TL",
      specs: ["M3 Çip", "15.3\" Retina", "18 Saat Pil"]
    },
    {
      id: 4,
      name: "iPad Pro 2024",
      brand: "Apple",
      category: "Tablet",
      image: "/assets/products/ipadpro.jpg",
      rating: 4.8,
      reviewCount: 324,
      price: "44.999 TL",
      specs: ["M2 Çip", "12.9\" Liquid Retina XDR", "Thunderbolt"]
    }
  ];

  // Test verileri oluştur
  const allLikes = Array.from({ length: 50 }, (_, index) => {
    const product = products[Math.floor(Math.random() * products.length)];
    const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000));

    return {
      id: `like-${Date.now()}-${index}`,
      productId: product.id,
      product: product,
      date: date.toISOString(),
      note: Math.random() > 0.7 ? "Fiyatı düşünce almak için beğendim" : null
    };
  });

  // Filtreleme
  let filteredLikes = allLikes;

  if (filters.brand && filters.brand !== 'all') {
    filteredLikes = filteredLikes.filter(like => 
      like.product.brand.toLowerCase() === filters.brand.toLowerCase()
    );
  }

  if (filters.category && filters.category !== 'all') {
    filteredLikes = filteredLikes.filter(like => 
      like.product.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredLikes = filteredLikes.filter(like => 
      like.product.name.toLowerCase().includes(searchTerm) ||
      like.product.brand.toLowerCase().includes(searchTerm) ||
      like.product.category.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.date === 'last-week') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    filteredLikes = filteredLikes.filter(like => 
      new Date(like.date) >= weekAgo
    );
  } else if (filters.date === 'last-month') {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    filteredLikes = filteredLikes.filter(like => 
      new Date(like.date) >= monthAgo
    );
  }

  // Sıralama
  if (filters.sort === 'price-asc') {
    filteredLikes.sort((a, b) => 
      parseInt(a.product.price.replace(/\D/g, '')) - parseInt(b.product.price.replace(/\D/g, ''))
    );
  } else if (filters.sort === 'price-desc') {
    filteredLikes.sort((a, b) => 
      parseInt(b.product.price.replace(/\D/g, '')) - parseInt(a.product.price.replace(/\D/g, ''))
    );
  } else if (filters.sort === 'rating') {
    filteredLikes.sort((a, b) => b.product.rating - a.product.rating);
  } else {
    filteredLikes.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const ITEMS_PER_PAGE = 12;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  return {
    likes: filteredLikes.slice(start, end),
    hasMore: end < filteredLikes.length,
    total: filteredLikes.length
  };
};

export default function LikesPage() {
  const [likes, setLikes] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    brand: 'all',
    category: 'all',
    date: 'all',
    sort: 'newest',
    search: ''
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const { ref, inView } = useInView();

  const loadLikes = async (currentPage, currentFilters, append = false) => {
    setLoading(true);
    try {
      const data = await fetchLikes(currentPage, currentFilters);
      setLikes(prev => append ? [...prev, ...data.likes] : data.likes);
      setHasMore(data.hasMore);
      setTotal(data.total);
    } catch (error) {
      console.error('Error loading likes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLikes(1, filters, false);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prev => prev + 1);
      loadLikes(page + 1, filters, true);
    }
  }, [inView, hasMore, loading]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Beğendiklerim
        </h1>
        <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
          {total} Ürün
        </span>
      </div>

      <LikesFilters onFilterChange={handleFilterChange} />
      
      <div className="space-y-6">
        <LikesList likes={likes} />
        
        {hasMore && (
          <div ref={ref} className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}