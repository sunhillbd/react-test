"use client";
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Share2, Bookmark, MessageSquare } from "lucide-react";

// Test verisi - Gerçek uygulamada API'den gelecek
const POST = {
  title: "E-ticaret Sektöründe Müşteri Yorumlarının Önemi ve Geleceği",
  excerpt: "Günümüzde online alışverişte müşteri yorumları, tüketici kararlarını etkileyen en önemli faktörlerden biri haline geldi. Peki gelecekte bizi neler bekliyor?",
  content: `
    <p class="lead">E-ticaret sektöründe müşteri yorumları, potansiyel alıcıların satın alma kararlarını etkileyen en önemli faktörlerden biri haline geldi. Araştırmalar, tüketicilerin %93'ünün bir ürünü satın almadan önce online yorumları okuduğunu gösteriyor.</p>

    <h2>Müşteri Yorumlarının E-ticaretteki Rolü</h2>
    <p>Müşteri yorumları, potansiyel alıcılara gerçek kullanıcı deneyimleri sunarak güven oluşturur. Bu güven, satın alma kararını doğrudan etkiler ve dönüşüm oranlarını artırır.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3" alt="Müşteri Yorumları İstatistikleri" />
      <figcaption>E-ticarette müşteri yorumlarının etkisi (Kaynak: E-ticaret İstatistikleri 2024)</figcaption>
    </figure>

    <h2>Yorumların İşletmelere Faydaları</h2>
    <ul>
      <li>Ürün ve hizmet kalitesini artırma fırsatı</li>
      <li>Müşteri memnuniyetini ölçme</li>
      <li>SEO performansını iyileştirme</li>
      <li>Satış oranlarını artırma</li>
    </ul>

    <blockquote>
      "Müşteri yorumları, modern e-ticaretin en değerli varlıklarından biridir. İşletmeler için hem geri bildirim hem de pazarlama aracı olarak işlev görür."
    </blockquote>

    <h2>Gelecekte Müşteri Yorumları</h2>
    <p>Yapay zeka ve makine öğrenimi teknolojilerinin gelişmesiyle, müşteri yorumlarının analizi ve yönetimi daha da önemli hale gelecek. İşletmeler, yorumlardan elde edilen içgörüleri ürün geliştirme ve müşteri deneyimini iyileştirme süreçlerinde daha etkin kullanabilecek.</p>
  `,
  image: "https://images.unsplash.com/photo-1556155092-490a1ba16284",
  category: "E-ticaret",
  author: {
    name: "Ahmet Yılmaz",
    avatar: "https://i.pravatar.cc/150?img=32",
    role: "E-ticaret Uzmanı",
    bio: "10+ yıllık e-ticaret ve dijital pazarlama deneyimi"
  },
  publishDate: "12 Mart 2024",
  readTime: "5 dk",
  tags: ["E-ticaret", "Müşteri Deneyimi", "Online Satış", "Dijital Pazarlama"],
  relatedPosts: [
    {
      id: 1,
      title: "E-ticarette Müşteri Hizmetleri",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "Müşteri Deneyimi",
      readTime: "4 dk",
      slug: "eticarette-musteri-hizmetleri"
    },
    {
      id: 2,
      title: "Online Mağazalar için SEO Stratejileri",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      category: "Dijital Pazarlama",
      readTime: "6 dk",
      slug: "online-magazalar-icin-seo-stratejileri"
    }
  ]
};

export default function BlogDetailPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Paylaşım işlevi
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: POST.title,
          text: POST.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Paylaşım hatası:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Üst Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 
              dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Blog'a Dön
            </Link>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                dark:hover:text-gray-200"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 ${
                  isBookmarked 
                    ? 'text-primary' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Başlık ve Meta Bilgiler */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {POST.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {POST.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {POST.excerpt}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{POST.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{POST.readTime} okuma</span>
            </div>
            <span>{POST.publishDate}</span>
          </div>
        </div>

        {/* Kapak Görseli */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12">
          <Image
            src={POST.image}
            alt={POST.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* İçerik */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: POST.content }}
        />

        {/* Etiketler */}
        <div className="flex flex-wrap gap-2 mb-12">
          {POST.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 
              dark:text-gray-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Yazar Bilgisi */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={POST.author.avatar}
              alt={POST.author.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {POST.author.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {POST.author.role}
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {POST.author.bio}
          </p>
        </div>

        {/* İlgili Yazılar */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            İlgili Yazılar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POST.relatedPosts.map(post => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm 
                hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime} okuma</span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary 
                  transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}