export default function LoadMoreButton({ loading, onClick }) {
    return (
      <div className="text-center mt-12">
        <button
          onClick={onClick}
          disabled={loading}
          className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 
          dark:text-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all 
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" 
                stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Yükleniyor...
            </span>
          ) : (
            'Daha Fazla Yazı Yükle'
          )}
        </button>
      </div>
    );
  }