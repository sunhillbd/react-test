"use client";
import { useState } from 'react';
import { Play, X, CheckCircle, MessageSquare, UserCheck, AlertCircle } from 'lucide-react';

const HowItWorks = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Şikayetinizi Paylaşın",
      description: "Yaşadığınız sorunu detaylı bir şekilde anlatın ve ilgili markayı etiketleyin.",
      icon: AlertCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: 2,
      title: "Marka Yanıtlasın",
      description: "Markanın müşteri hizmetleri ekibi şikayetinizi değerlendirip size ulaşsın.",
      icon: MessageSquare,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      id: 3,
      title: "Çözüme Ulaşın",
      description: "Marka ile iletişime geçip sorununuzu hızlıca çözüme kavuşturun.",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-black-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-black-primary dark:text-white mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-grey dark:text-gray-400">
            3 basit adımda şikayetinizi çözüme kavuşturun
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute -top-4 -left-4 bg-blue-500 text-white rounded-full p-3">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className={`text-xl font-bold ${step.color}`}>{step.title}</h3>
                <p className="text-grey dark:text-gray-400">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
