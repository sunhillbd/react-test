"use client";
import { Filter, TrendingUp, MessageSquare, Star, ChevronDown } from 'lucide-react';
import Wrapper from "@/components/shared/Wrapper";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([...Array(10)].map((_, i) => ({ id: i })));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  // Lazy loading için
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreComplaints();
    }
  }, [inView]);

  const loadMoreComplaints = async () => {
    setLoading(true);
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setComplaints(prev => [
      ...prev,
      ...[...Array(5)].map((_, i) => ({ id: prev.length + i }))
    ]);
    
    // Örnek olarak 30 yorumdan sonra durduralım
    if (complaints.length >= 30) {
      setHasMore(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-black-secondary pt-6">
        <Wrapper>
          {/* Üst Başlık ve Filtreler */}
          <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-black-primary dark:text-white mb-2">
                  Tüm Yorumlar
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  En güncel müşteri deneyimleri ve marka yanıtları
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Filter className="size-4" />
                  <span>Filtrele</span>
                </button>
                <select className="px-5 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors outline-none appearance-none pr-10 relative">
                  <option value="newest">En Yeniler</option>
                  <option value="trending">Öne Çıkanlar</option>
                  <option value="most-commented">En Çok Yanıtlananlar</option>
                </select>
              </div>
            </div>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MessageSquare className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black-primary dark:text-white">
                    124,405
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Toplam Yorum
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <TrendingUp className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black-primary dark:text-white">
                    %84
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Yanıtlanma Oranı
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/20 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Star className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black-primary dark:text-white">
                    4,280
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Aktif Marka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Yorum Listesi */}
          <div className="space-y-4 mb-10">
            {complaints.map((complaint) => (
              <div 
                key={complaint.id} 
                className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/20 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    <div>
                      <h3 className="font-medium text-black-primary dark:text-white">
                        Ahmet Y.
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        23 Mart 2024
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      #123456
                    </span>
                    <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-100 text-sm rounded-full">
                      Beklemede
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-black-primary dark:text-white mb-2">
                    Ürün Teslimatında Gecikme Yaşandı
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="size-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        12
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="size-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        24
                      </span>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary/90 text-sm font-medium">
                    Detayları Gör →
                  </button>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {hasMore && (
              <div 
                ref={ref}
                className="flex justify-center items-center py-8"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                ) : (
                  <ChevronDown className="size-8 text-gray-400 animate-bounce" />
                )}
              </div>
            )}
          </div>
        </Wrapper>
        <Footer />
      </main>
    </>
  );
};

export default ComplaintsPage;