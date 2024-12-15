"use client";
import { useState, useEffect } from "react";
import FollowingList from "@/components/account/following/FollowingList";
import FollowingFilters from "@/components/account/following/FollowingFilters";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

// Fake API call
const fetchFollowing = async (page, filters) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const brands = [
    {
      id: 1,
      name: "Apple",
      logo: "/assets/brands/apple.png",
      category: "Teknoloji",
      followers: 1250000,
      productsCount: 156,
      rating: 4.8,
      verified: true,
      description: "Think Different",
      website: "https://www.apple.com",
      social: {
        twitter: "@apple",
        instagram: "@apple",
        facebook: "apple",
      },
      stats: {
        reviews: 45678,
        questions: 12345,
        answers: 8765,
      },
    },
    {
      id: 2,
      name: "Samsung",
      logo: "/assets/brands/samsung.png",
      category: "Teknoloji",
      followers: 980000,
      productsCount: 243,
      rating: 4.6,
      verified: true,
      description: "Do What You Can't",
      website: "https://www.samsung.com",
      social: {
        twitter: "@samsung",
        instagram: "@samsung",
        facebook: "samsung",
      },
      stats: {
        reviews: 34567,
        questions: 9876,
        answers: 6543,
      },
    },
    {
      id: 3,
      name: "Sony",
      logo: "/assets/brands/sony.png",
      category: "Teknoloji",
      followers: 750000,
      productsCount: 178,
      rating: 4.7,
      verified: true,
      description: "Be Moved",
      website: "https://www.sony.com",
      social: {
        twitter: "@sony",
        instagram: "@sony",
        facebook: "sony",
      },
      stats: {
        reviews: 23456,
        questions: 7654,
        answers: 4321,
      },
    },
  ];

  // Test verileri oluştur
  const allFollowing = Array.from({ length: 30 }, (_, index) => {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
    const notifications = Math.random() > 0.5;

    return {
      id: `follow-${Date.now()}-${index}`,
      brandId: brand.id,
      brand: brand,
      followDate: date.toISOString(),
      notifications,
      lastActivity: {
        type: ["new_product", "price_drop", "review"][
          Math.floor(Math.random() * 3)
        ],
        date: new Date(
          Date.now() - Math.floor(Math.random() * 1000000000)
        ).toISOString(),
        content: "iPhone 15 Pro Max fiyatında indirim!",
      },
    };
  });

  // Filtreleme
  let filteredFollowing = allFollowing;

  if (filters.category && filters.category !== "all") {
    filteredFollowing = filteredFollowing.filter(
      (follow) =>
        follow.brand.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.notifications === "enabled") {
    filteredFollowing = filteredFollowing.filter(
      (follow) => follow.notifications
    );
  } else if (filters.notifications === "disabled") {
    filteredFollowing = filteredFollowing.filter(
      (follow) => !follow.notifications
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredFollowing = filteredFollowing.filter(
      (follow) =>
        follow.brand.name.toLowerCase().includes(searchTerm) ||
        follow.brand.description.toLowerCase().includes(searchTerm)
    );
  }

  // Sıralama
  if (filters.sort === "followers") {
    filteredFollowing.sort((a, b) => b.brand.followers - a.brand.followers);
  } else if (filters.sort === "rating") {
    filteredFollowing.sort((a, b) => b.brand.rating - a.brand.rating);
  } else if (filters.sort === "products") {
    filteredFollowing.sort(
      (a, b) => b.brand.productsCount - a.brand.productsCount
    );
  } else {
    filteredFollowing.sort(
      (a, b) => new Date(b.followDate) - new Date(a.followDate)
    );
  }

  const ITEMS_PER_PAGE = 9;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  return {
    following: filteredFollowing.slice(start, end),
    hasMore: end < filteredFollowing.length,
    total: filteredFollowing.length,
  };
};

export default function FollowingPage() {
  const [following, setFollowing] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "all",
    notifications: "all",
    sort: "newest",
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const { ref, inView } = useInView();

  const loadFollowing = async (currentPage, currentFilters, append = false) => {
    setLoading(true);
    try {
      const data = await fetchFollowing(currentPage, currentFilters);
      setFollowing((prev) =>
        append ? [...prev, ...data.following] : data.following
      );
      setHasMore(data.hasMore);
      setTotal(data.total);
    } catch (error) {
      console.error("Error loading following:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFollowing(1, filters, false);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
      loadFollowing(page + 1, filters, true);
    }
  }, [inView, hasMore, loading]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Takip Ettiklerim
        </h1>
        <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
          {total} Marka
        </span>
      </div>

      <FollowingFilters onFilterChange={handleFilterChange} />

      <div className="space-y-6">
        <FollowingList following={following} />

        {hasMore && (
          <div ref={ref} className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
