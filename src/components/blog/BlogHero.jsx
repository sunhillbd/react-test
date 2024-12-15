import { Search } from "lucide-react";

export default function BlogHero({ searchTerm, setSearchTerm }) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-xl text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          E-ticaret, müşteri deneyimi ve dijital pazarlama hakkında en güncel içerikler
        </p>
        
        {/* Arama */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Blog yazılarında ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 
              bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}