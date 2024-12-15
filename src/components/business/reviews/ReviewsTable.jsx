"use client";
import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import DeleteModal from '@/components/shared/DeleteModal';
import ReviewReplyModal from '@/components/business/reviews/ReviewReplyModal';
import TableHeader from './TableHeader';
import ReviewRow from './ReviewRow';
import TableFooter from './TableFooter';
import { generateMockReviews, filterMockReviews } from '@/services/mockReviewService';

export default function ReviewsTable({ searchQuery, filterStatus }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, reviewId: null });
  const [replyModal, setReplyModal] = useState({ isOpen: false, review: null });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchReviews = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReviews = generateMockReviews(page);
      const filteredReviews = filterMockReviews(newReviews, { 
        searchQuery, 
        filterStatus 
      });

      if (page === 1) {
        setReviews(filteredReviews);
      } else {
        setReviews(prev => [...prev, ...filteredReviews]);
      }

      setHasMore(filteredReviews.length === 10);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, filterStatus, loading, hasMore]);

  useEffect(() => {
    setReviews([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery, filterStatus]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    if (inView) {
      fetchReviews();
    }
  }, [inView, fetchReviews]);

  const handleDelete = async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setReviews(prev => prev.filter(review => review.id !== id));
      setDeleteModal({ isOpen: false, reviewId: null });
    } catch (error) {
      console.error('Yorum silinirken hata:', error);
    }
  };

  const handleReply = async (reviewId, reply) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, status: 'answered', reply }
          : review
      ));
      setReplyModal({ isOpen: false, review: null });
    } catch (error) {
      console.error('Yanıt gönderilirken hata:', error);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg border 
      border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <TableHeader />
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {reviews.map((review) => (
              <ReviewRow
                key={review.id}
                review={review}
                onReply={(review) => setReplyModal({ isOpen: true, review })}
                onDelete={(id) => setDeleteModal({ isOpen: true, reviewId: id })}
              />
            ))}
          </tbody>
        </table>

        <TableFooter
          loading={loading}
          hasMore={hasMore}
          isEmpty={!loading && reviews.length === 0}
          loadMoreRef={ref}
        />
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, reviewId: null })}
        onConfirm={() => handleDelete(deleteModal.reviewId)}
        title="Yorumu Sil"
        message="Bu yorumu silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      />

      <ReviewReplyModal
        isOpen={replyModal.isOpen}
        review={replyModal.review}
        onClose={() => setReplyModal({ isOpen: false, review: null })}
        onSubmit={handleReply}
      />
    </>
  );
}