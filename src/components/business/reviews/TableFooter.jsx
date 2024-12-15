export default function TableFooter({ loading, hasMore, isEmpty, loadMoreRef }) {
    if (isEmpty) {
      return (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          Gösterilecek yorum bulunamadı.
        </div>
      );
    }
  
    if (loading || hasMore) {
      return (
        <div
          ref={loadMoreRef}
          className="p-4 text-center text-gray-500 dark:text-gray-400"
        >
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 
              border-b-2 border-primary"></div>
            </div>
          ) : (
            "Daha fazla yorum yükleniyor..."
          )}
        </div>
      );
    }
  
    return null;
  }