"use client";
import { Star, ThumbsUp, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useRef } from 'react';
import 'swiper/css';

const UserAvatar = ({ user }) => {
  const bgColors = [
    'bg-blue-100 text-blue-600',
    'bg-purple-100 text-purple-600',
    'bg-green-100 text-green-600',
    'bg-yellow-100 text-yellow-600',
    'bg-pink-100 text-pink-600',
    'bg-indigo-100 text-indigo-600'
  ];

  const colorIndex = user.name.charCodeAt(0) % bgColors.length;
  const colorClass = bgColors[colorIndex];

  if (user.avatar) {
    return (
      <Image
        src={user.avatar}
        alt={user.name}
        width={40}
        height={40}
        className="rounded-full ring-2 ring-primary/20"
      />
    );
  }

  return (
    <div className={`w-10 h-10 rounded-full ${colorClass} ring-2 ring-primary/20 flex items-center justify-center font-medium`}>
      <span>
        {user.name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

const LatestReviews = () => {
  const swiperRef = useRef(null);

  const reviews = [
    {
      id: 1,
      user: {
        name: "Ahmet",
        location: "İstanbul"
      },
      brand: "Apple Türkiye",
      rating: 4,
      comment: "iPhone 14 Pro Max ile ilgili yaşadığım sorun hızlı bir şekilde çözüldü. Müşteri hizmetleri gerçekten çok ilgiliydi.",
      date: "2 saat önce",
      likes: 24,
      replies: 3
    },
    {
      id: 2,
      user: {
        name: "Zeynep",
        location: "Ankara"
      },
      brand: "Trendyol",
      rating: 5,
      comment: "Sipariş ettiğim ürünle ilgili yaşadığım sorunu aynı gün içinde çözdüler. Teşekkürler!",
      date: "4 saat önce",
      likes: 18,
      replies: 2
    },
    {
      id: 3,
      user: {
        name: "Mehmet",
        location: "İzmir"
      },
      brand: "Getir",
      rating: 4,
      comment: "Teslimat ile ilgili yaşanan gecikme için hemen telafi sundular. Müşteri memnuniyeti odaklı bir yaklaşım.",
      date: "6 saat önce",
      likes: 32,
      replies: 5
    },
    {
      id: 4,
      user: {
        name: "Ayşe",
        location: "Bursa"
      },
      brand: "Yemeksepeti",
      rating: 5,
      comment: "Restoranla yaşadığım sorunu çok hızlı çözdüler. Kupon da gönderdiler, teşekkürler.",
      date: "8 saat önce",
      likes: 27,
      replies: 4
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ana gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10" />
        
        {/* Floating yorum balonu 1 */}
        <div className="absolute -left-16 top-20 animate-floating">
          <div className="w-32 h-32 text-primary/10">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 2.83 1.21 5.39 3.14 7.17L4 22l3.26-2.24C8.68 20.52 10.29 21 12 21c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
        </div>

        {/* Floating yorum balonu 2 */}
        <div className="absolute -right-16 bottom-20 animate-floating" style={{ animationDelay: '1s' }}>
          <div className="w-40 h-40 text-primary/10 transform rotate-12">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
        </div>

        {/* Dönen daire */}
        <div className="absolute left-1/4 top-1/4">
          <div className="w-64 h-64 border-2 border-primary/5 rounded-full animate-spin-slow" />
        </div>

        {/* Pulsing yıldızlar */}
        <div className="absolute inset-0">
          {[
            { top: '15%', left: '10%' },
            { top: '25%', left: '85%' },
            { top: '45%', left: '30%' },
            { top: '65%', left: '70%' },
            { top: '85%', left: '15%' }
          ].map((position, i) => (
            <div
              key={i}
              className="absolute animate-pulse-custom"
              style={{
                ...position,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <svg 
                className="w-6 h-6 text-yellow-400/20" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          ))}
        </div>

        {/* Dalga efekti */}
        <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-primary">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
            <h2 className="text-3xl font-bold text-black-primary dark:text-white mb-4">
              Kimler Ne Demiş?
            </h2>
            <p className="text-grey dark:text-gray-300">
              Son 24 saat içinde paylaşılan deneyimlerden öne çıkanlar
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-grey dark:text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 relative z-10 bg-white dark:bg-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-grey dark:text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 relative z-10 bg-white dark:bg-gray-800"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Reviews Slider - z-index eklendi */}
        <div className="relative z-10">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="review-slider"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                  {/* Brand and Rating */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-primary">
                      {review.brand}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-black-primary dark:text-gray-300 mb-6 line-clamp-4">
                    {review.comment}
                  </p>

                  {/* User Info and Actions */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={review.user} />
                      <div>
                        <h3 className="font-semibold text-black-primary dark:text-white">
                          {review.user.name}
                        </h3>
                        <p className="text-sm text-grey dark:text-gray-400">
                          {review.user.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-grey dark:text-gray-400">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {review.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {review.replies}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LatestReviews;
