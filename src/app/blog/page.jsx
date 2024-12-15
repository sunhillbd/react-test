"use client";
import { useState } from 'react';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogCard from '@/components/blog/BlogCard';
import LoadMoreButton from '@/components/blog/LoadMoreButton';
import { FEATURED_POST, ALL_BLOG_POSTS } from '@/data/blog-posts';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [loading, setLoading] = useState(false);

  const filteredPosts = ALL_BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisiblePosts(prev => prev + 6);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeaturedPost post={FEATURED_POST} />
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Son Yazılar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(0, visiblePosts).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {visiblePosts < filteredPosts.length && (
            <LoadMoreButton loading={loading} onClick={handleLoadMore} />
          )}
        </div>
      </div>
    </div>
  );
}