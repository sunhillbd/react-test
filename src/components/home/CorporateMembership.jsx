"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Users, BarChart, MessageCircle, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Marka İtibarı Yönetimi',
    description: 'Markanızın online itibarını profesyonel araçlarla yönetin ve müşteri memnuniyetini artırın.'
  },
  {
    icon: Users,
    title: 'Müşteri İlişkileri',
    description: 'Müşterilerinizle doğrudan iletişim kurarak sorunları hızlıca çözüme kavuşturun.'
  }
];

const CorporateMembership = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black-primary dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Sol Taraf - İçerik */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Kurumsal Çözümler</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black-primary dark:text-white mb-6">
              Markanızı En İyi Şekilde{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Temsil Edin
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              Müşterilerinizle olan ilişkilerinizi güçlendirin, marka değerinizi artırın. 
              Profesyonel araçlarımızla müşteri deneyimini en üst seviyeye çıkarın.
            </p>

            {/* Özellikler Grid */}
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <feature.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="text-base md:text-lg font-semibold text-black-primary dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link 
              href="/corporate"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-primary/90 transition-colors group"
            >
              Kurumsal Üye Ol
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Sağ Taraf - İllüstrasyon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative lg:h-[600px] mt-12 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full filter blur-3xl" />
            
            <div className="relative">
              <Image
                src="/assets/corporate-illustration.svg"
                alt="Kurumsal Üyelik"
                width={600}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />

              {/* Floating Stats Card */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute top-20 -right-4 md:-right-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg max-w-[200px]"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-primary">98%</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Müşteri Memnuniyeti</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Users Card */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-20 -left-4 md:-left-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg max-w-[200px]"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-purple-500">1000+</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Aktif Marka</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CorporateMembership;
