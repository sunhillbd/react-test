"use client";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  Users,
  Building2,
  Receipt,
  ChevronRight,
  MessageSquare,
  TrendingUp,
  SquareArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";
import Wrapper from "@/components/shared/Wrapper";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { getBrand } from "@/services/integrations/businessService";
import { Skeleton } from "@/components/ui/Skeleton";
import { use } from "react";

export default function BrandDetail({ params }) {
  const brandParam = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        console.log("Fetching brand with UUID:", brandParam.brand);
        const response = await getBrand(brandParam.brand);
        console.log("Brand data:", response);
        setBrand(response);
      } catch (error) {
        console.error("Error in component:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (brandParam.brand) {
      fetchBrandData();
    }
  }, [brandParam.brand]);

  // Loading skeleton for the hero section
  const HeroSkeleton = () => (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <Skeleton className="w-24 h-24 rounded-xl" />
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-20 w-full mb-4" />
        <div className="flex items-center gap-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <Skeleton className="h-10 w-28" />
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-black-secondary py-6">
        <Wrapper>
          {/* Hero Section */}
          <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
            {loading ? (
              <HeroSkeleton />
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : (
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 relative rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-medium text-gray-500">
                      {brand.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-black-primary dark:text-white">
                      {brand.name}
                    </h1>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                      {brand.category.name}
                    </span>
                    {brand.verification_status === "verified" && (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-100 rounded-full text-sm">
                        Doğrulanmış
                      </span>
                    )}
                    {brand.is_premium && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {brand.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <MessageSquare className="size-4" />
                      <span>0 Yorum</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <Star className="size-4" />
                      <span>0% Memnuniyet</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <TrendingUp className="size-4" />
                      <span>0 Görüntülenme</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                    Değerlendir
                  </button>
                  {brand.website && (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="px-4 py-2 flex items-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Web Sitesi
                    <SquareArrowOutUpRight className="size-4 ml-2" />
                  </a>)}
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6 overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide">
              {["overview", "reviews", "locations", "working_hours", "photos"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab === "working_hours" ? "Çalışma Saatleri" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Business Info Section */}
          {activeTab === "overview" && (
            <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              {loading ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Skeleton className="w-5 h-5" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? null : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Building2,
                      label: "Şirket Türü",
                      value: brand.company_type,
                    },
                    {
                      icon: Calendar,
                      label: "Kuruluş",
                      value: brand.foundation_year,
                    },
                    {
                      icon: Users,
                      label: "Çalışan Sayısı",
                      value: brand.employee_count,
                    },
                    {
                      icon: Receipt,
                      label: "Vergi Dairesi",
                      value: brand.tax_office,
                    },
                    {
                      icon: Mail,
                      label: "E-posta",
                      value: brand.contact_email,
                    },
                    {
                      icon: Phone,
                      label: "Telefon",
                      value: brand.contact_phone,
                    },
                  ].map(
                    (item, index) =>
                      item.value && (
                        <div key={index} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {item.label}
                            </div>
                            <div className="text-black-primary dark:text-white">
                              {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          )}

          {/* Reviews Section */}
          {activeTab === "reviews" && (
            <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                Henüz değerlendirme yapılmamış
              </div>
            </div>
          )}

          {/* Locations Section */}
          {activeTab === "locations" && (
            <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                Henüz konum eklenmemiş
              </div>
            </div>
          )}

          {/* Working Hours Section */}
          {activeTab === "working_hours" && (
            <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 py-4">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(7)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-500 text-center p-4">{error}</div>
              ) : brand.working_hours && brand.working_hours.length > 0 ? (
                <div className="grid gap-4">
                  {brand.working_hours.slice(0, 7).map((hours, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {hours.day_name}
                        </span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {hours.is_closed ? (
                          <span className="text-red-500 dark:text-red-400">Kapalı</span>
                        ) : hours.opening_time && hours.closing_time ? (
                          `${hours.opening_time} - ${hours.closing_time}`
                        ) : (
                          <span className="text-gray-400">Belirtilmemiş</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                  Çalışma saatleri belirtilmemiş
                </div>
              )}
            </div>
          )}

          {/* Photos Section */}
          {activeTab === "photos" && (
            <div className="bg-white dark:bg-black-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                Henüz fotoğraf eklenmemiş
              </div>
            </div>
          )}
        </Wrapper>
        <div className="mt-12">
          <Footer />
        </div>
      </main>
    </>
  );
}
