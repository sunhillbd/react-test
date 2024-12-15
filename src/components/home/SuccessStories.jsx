"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ThumbsUp, Clock, TrendingUp } from 'lucide-react';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      id: 1,
      user: {
        name: "Ayşe Y.",
        avatar: "/avatars/user1.jpg",
        location: "İstanbul"
      },
      brand: {
        name: "TechMarket",
        logo: "/brands/techmarket.svg"
      },
      before: "Satın aldığım laptop 2 gün içinde arıza verdi ve iade sürecinde zorluk yaşıyordum.",
      after: "Şikayetim 24 saat içinde çözüldü ve ürün bedeli eksiksiz iade edildi.",
      stats: {
        responseTime: "4 saat",
        satisfaction: "100%",
        compensation: "Tam İade"
      },
      category: "Elektronik",
      date: "2 hafta önce"
    },
    {
      id: 2,
      user: {
        name: "Mehmet K.",
        avatar: "/avatars/user2.jpg",
        location: "Ankara"
      },
      brand: {
        name: "HızlıKargo",
        logo: "/brands/hizlikargo.svg"
      },
      before: "Kargom 5 gündür yanlış adrese teslim edilmeye çalışılıyordu.",
      after: "Aynı gün içinde doğru adres güncellendi ve teslimat yapıldı.",
      stats: {
        responseTime: "2 saat",
        satisfaction: "95%",
        compensation: "Kargo Ücreti İade"
      },
      category: "Kargo",
      date: "1 hafta önce"
    },
    // Diğer başarı hikayeleri...
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-black-primary dark:text-white mb-4">
            Başarı Hikayeleri
          </h2>
          <p className="text-grey dark:text-gray-400">
            Binlerce kullanıcımızın çözüme kavuşan deneyimleri
          </p>
        </motion.div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: CheckCircle, label: "Çözülen Şikayet", value: "50K+" },
            { icon: Clock, label: "Ort. Çözüm Süresi", value: "4 Saat" },
            { icon: ThumbsUp, label: "Memnuniyet Oranı", value: "97%" },
            { icon: TrendingUp, label: "Başarı Oranı", value: "95%" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm"
            >
              <stat.icon className="w-8 h-8 text-primary mb-4" />
              <div className="text-2xl font-bold text-black-primary dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-grey dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories Slider */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Story Navigation */}
          <div className="space-y-4">
            {stories.map((story, index) => (
              <motion.button
                key={story.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveStory(index)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                  activeStory === index
                    ? 'border-primary bg-white dark:bg-gray-800 shadow-lg'
                    : 'border-gray-100 dark:border-gray-800 bg-transparent hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black-primary dark:text-white">
                      {story.user.name}
                    </h3>
                    <p className="text-sm text-grey dark:text-gray-400">
                      {story.brand.name}
                    </p>
                  </div>
                </div>
                <p className="text-grey dark:text-gray-400 line-clamp-2">
                  {story.after}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Story Details */}
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <img
                  src={stories[activeStory].brand.logo}
                  alt={stories[activeStory].brand.name}
                  className="w-12 h-12 rounded-lg"
                />
                <div>
                  <h4 className="font-semibold text-black-primary dark:text-white">
                    {stories[activeStory].brand.name}
                  </h4>
                  <p className="text-sm text-grey dark:text-gray-400">
                    {stories[activeStory].category}
                  </p>
                </div>
              </div>
              <span className="text-sm text-grey dark:text-gray-400">
                {stories[activeStory].date}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-red-500 mb-2">Şikayet</h5>
                <p className="text-grey dark:text-gray-400 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
                  {stories[activeStory].before}
                </p>
              </div>
              <div>
                <h5 className="font-medium text-green-500 mb-2">Çözüm</h5>
                <p className="text-grey dark:text-gray-400 bg-green-50 dark:bg-green-900/10 p-4 rounded-lg">
                  {stories[activeStory].after}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
              <div>
                <div className="text-sm text-grey dark:text-gray-400 mb-1">
                  Yanıt Süresi
                </div>
                <div className="font-semibold text-black-primary dark:text-white">
                  {stories[activeStory].stats.responseTime}
                </div>
              </div>
              <div>
                <div className="text-sm text-grey dark:text-gray-400 mb-1">
                  Memnuniyet
                </div>
                <div className="font-semibold text-black-primary dark:text-white">
                  {stories[activeStory].stats.satisfaction}
                </div>
              </div>
              <div>
                <div className="text-sm text-grey dark:text-gray-400 mb-1">
                  Sonuç
                </div>
                <div className="font-semibold text-black-primary dark:text-white">
                  {stories[activeStory].stats.compensation}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
