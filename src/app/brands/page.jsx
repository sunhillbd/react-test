"use client";
import {
  Search,
  Star,
  MessageSquare,
  TrendingUp,
  ChevronDown,
  X,
} from "lucide-react";
import Wrapper from "@/components/shared/Wrapper";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import {
  getBrands,
  getCategories,
  getBrandsByCategory,
} from "@/services/integrations/businessService";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";

const BrandsPage = () => {
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const searchRef = useRef(null);
  const { ref, inView } = useInView();
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        // Handle the nested data structure
        const categoriesData = response.data?.data || [];

        setCategories([
          { id: "all", name: "Tüm Kategoriler" },
          ...categoriesData.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            // Add any other fields you need
          })),
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Kategoriler yüklenirken bir hata oluştu");
      }
    };

    fetchCategories();
  }, []);

  // Replace SAMPLE_BRANDS fetching with real API call
  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (selectedCategory !== "all") {
        response = await getBrandsByCategory(selectedCategory);
        // Extract data array from category response
        response = response.data;
      } else {
        const params = {
          page,
          search: searchTerm || undefined,
        };
        response = await getBrands(params);
      }

      // Ensure response is an array before mapping
      const brandsArray = Array.isArray(response) ? response : [];

      const transformedBrands = brandsArray.map((brand) => ({
        id: brand.id,
        uuid: brand.uuid,
        name: brand.name,
        slug: brand.slug,
        categoryId: brand.category_id,
        description: brand.description,
        logo: brand.logo,
        contactEmail: brand.contact_email,
        contactPhone: brand.contact_phone,
        website: brand.website,
        taxNumber: brand.tax_number,
        taxOffice: brand.tax_office,
        companyType: brand.company_type,
        isActive: brand.is_active,
        isFeatured: brand.is_featured,
        isPremium: brand.is_premium,
        verificationStatus: brand.verification_status,
        workingHours: brand.working_hours,
        locations: brand.locations,
      }));

      setFilteredBrands((prev) =>
        page === 1 ? transformedBrands : [...prev, ...transformedBrands]
      );

      // Since the API response doesn't include pagination info directly,
      // we'll assume there's more data if we received a full page of results
      // You may want to adjust this based on your actual API pagination logic
      setHasMore(transformedBrands.length > 0);
    } catch (error) {
      setError(error.message || "Markalar yüklenirken bir hata oluştu");
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, searchTerm]);

  // Replace existing useEffect with API call
  useEffect(() => {
    setPage(1); // Reset page when filters change
    fetchBrands();
  }, [selectedCategory, searchTerm]);

  // Add infinite scroll handling
  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, hasMore]);

  // Filtreleme fonksiyonu
  const filterBrands = useCallback(() => {
    let results = [...filteredBrands];

    // Arama filtresi
    if (searchTerm) {
      results = results.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBrands(results);
    setHasMore(results.length > 12);
  }, [searchTerm, filteredBrands]);

  // Kategori değiştiğinde
  const handleCategoryChange = async (categoryId) => {
    try {
      setSelectedCategory(categoryId);
      setSearchTerm(""); // Kategori değiştiğinde aramayı sıfırla
      setSearchResults([]); // Arama sonuçlarını temizle
      setPage(1); // Sayfa numarasını sıfırla
    } catch (error) {
      console.error("Error changing category:", error);
      setError("Kategori değiştirilirken bir hata oluştu");
    }
  };

  // Arama sonuçları için
  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = filteredBrands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, filteredBrands]);

  // Marka seçildiğinde
  const handleSelectBrand = (brand) => {
    setSearchTerm(brand.name);
    setIsSearchFocused(false);
  };

  const BrandCardSkeleton = () => {
    return (
      <div className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-start justify-between mb-6">
          <Skeleton className="w-16 h-16 rounded-xl" />
          <Skeleton className="w-16 h-7 rounded-full" />
        </div>

        <div className="space-y-2 mb-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
        </div>

        <div className="mt-4">
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-black-secondary pt-6">
        <Wrapper>
          {/* Üst Başlık ve Arama */}
          <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold text-black-primary dark:text-white mb-2">
                  Markalar
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Tüm markalar ve müşteri memnuniyet oranları
                </p>
              </div>

              {/* Arama Alanı */}
              <div ref={searchRef} className="relative w-full md:w-96">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 size-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Marka ara..."
                    className="w-full px-5 py-3 pl-12 pr-10 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 ring-primary/20"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <X className="size-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Autocomplete Sonuçları */}
                {isSearchFocused && searchResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-black-primary rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                    {searchResults.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => handleSelectBrand(brand)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                          {brand.logo ? (
                            <img
                              src={brand.logo}
                              alt={`${brand.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg font-medium text-gray-500 dark:text-gray-400">
                              {brand.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-black-primary dark:text-white">
                            {brand.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {brand.categoryName}
                          </div>
                        </div>
                        {brand.rating && (
                          <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-100 text-sm rounded-full">
                            {brand.rating}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* "Sonuç bulunamadı" mesajı */}
                {isSearchFocused &&
                  searchTerm &&
                  searchResults.length === 0 && (
                    <div className="absolute z-50 w-full mt-2 py-4 px-4 bg-white dark:bg-black-primary rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
                      Aranan marka bulunamadı
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Kategoriler */}
          {categories.length === 0 ? (
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-10 w-32 rounded-full flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-white dark:bg-black-primary text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          {/* Marka Listesi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {filteredBrands.map((brand) => (
              <Link key={brand.uuid} href={`/brands/${brand.id}`}>
                <div className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/20 transition-all duration-300 hover:shadow-md group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl">
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-medium text-gray-500 dark:text-gray-400">
                          {brand.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-100 text-sm rounded-full">
                      Yeni
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg text-black-primary dark:text-white mb-1">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {categories.find((c) => c.id === brand.categoryId)
                        ?.name || "Diğer"}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="size-4" />
                      <span>0</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="size-4" />
                      <span>0%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="size-4" />
                      <span>0</span>
                    </div>
                  </div>

                  {/* Verification Status Badge */}
                  <div
                    className={`mt-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs
                    ${
                      brand.verificationStatus === "verified"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-100"
                        : brand.verificationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-100"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-100"
                    }`}
                  >
                    {brand.verificationStatus === "verified"
                      ? "Doğrulanmış"
                      : brand.verificationStatus === "pending"
                      ? "Beklemede"
                      : "Reddedildi"}
                  </div>

                  {/* Premium Badge */}
                  {brand.isPremium && (
                    <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      Premium
                    </div>
                  )}
                </div>
              </Link>
            ))}

            {/* Loading indicator */}
            {loading && (
              <>
                {[...Array(8)].map((_, index) => (
                  <BrandCardSkeleton key={index} />
                ))}
              </>
            )}

            {/* Infinite scroll trigger */}
            {!loading && hasMore && (
              <div ref={ref} className="col-span-full h-10" />
            )}
          </div>

          {/* Show empty state */}
          {!loading && filteredBrands.length === 0 && (
            <div className="text-center p-8 text-gray-500 dark:text-gray-400">
              Marka bulunamadı
            </div>
          )}
        </Wrapper>
        <Footer />
      </main>

      {/* Add error message */}
      {error && (
        <div className="text-center p-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl mb-6">
          {error}
        </div>
      )}
    </>
  );
};

export default BrandsPage;
