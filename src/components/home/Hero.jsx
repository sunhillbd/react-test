"use client";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Star, TrendingUp, CheckCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-black-primary dark:to-gray-900 min-h-[90vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 -left-4 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 text-primary px-6 py-3 rounded-full mb-8"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-base font-medium">Türkiye'nin En Büyük Yorum Platformu</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black-primary dark:text-white leading-tight mb-6">
                Deneyimini Paylaş,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-300% animate-gradient">
                  Farkını Yarat
                </span>
              </h1>

              <p className="text-lg text-grey dark:text-gray-300 mb-8 max-w-xl">
                Binlerce kullanıcı ve marka arasında köprü kuruyoruz. Deneyimlerinizi paylaşın, 
                yorumlarınızla fark yaratın.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/create-complaint"
                  className="group bg-gradient-to-r from-primary to-purple-600 text-white py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <span>Deneyimini Paylaş</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/brands"
                  className="bg-white dark:bg-gray-800 text-black-primary dark:text-white py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  Markaları Keşfet
                </Link>
              </div>

              {/* Stats with Animated Cards */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Users, count: "50K+", label: "Aktif Kullanıcı", color: "from-blue-500/10 to-primary/10" },
                  { icon: Star, count: "1000+", label: "Marka", color: "from-purple-500/10 to-pink-500/10" },
                  { icon: CheckCircle, count: "25K+", label: "Çözüm", color: "from-green-500/10 to-emerald-500/10" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className={`bg-gradient-to-br ${stat.color} dark:bg-gray-800 p-4 rounded-2xl backdrop-blur-sm border border-white/20`}
                  >
                    <stat.icon className="w-6 h-6 text-primary mb-2" />
                    <div className="text-2xl font-bold text-black-primary dark:text-white mb-1">{stat.count}</div>
                    <div className="text-sm text-grey dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative lg:h-[600px] select-none"
            >
              {/* Background gradient for illustration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent rounded-full filter blur-3xl" />
              
              <div className="relative">
                <Image
                  src="/assets/hand.png"
                  alt="Hero Illustration"
                  width={650}
                  height={650}
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                  priority
                />

                {/* Floating notification cards */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-20 -right-6 bg-white dark:bg-gray-800/90 p-4 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-black-primary dark:text-white">Yeni Yorum</div>
                      <div className="text-xs text-grey">2 dakika önce</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-20 -left-6 bg-white dark:bg-gray-800/90 p-4 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-black-primary dark:text-white">Yeni Çözüm</div>
                      <div className="text-xs text-grey">30 dakika önce</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
