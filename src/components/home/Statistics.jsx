import { Users, Building2, CheckCircle, Eye } from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      id: 1,
      title: "Bireysel Üye Sayısı",
      value: "150K+",
      icon: Users,
      description: "Aktif kullanıcı",
      color: "text-blue-500"
    },
    {
      id: 2,
      title: "Kayıtlı Marka",
      value: "2.5K+",
      icon: Building2,
      description: "Marka profili",
      color: "text-purple-500"
    },
    {
      id: 3,
      title: "Çözülen Şikayet",
      value: "85K+",
      icon: CheckCircle,
      description: "Başarılı çözüm",
      color: "text-green-500"
    },
    {
      id: 4,
      title: "Son 30 Günde Ziyaretçi",
      value: "1.2M+",
      icon: Eye,
      description: "Tekil ziyaretçi",
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-black-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black-primary dark:text-white mb-4">
            Sayılarla Yorumlar
          </h2>
          <p className="text-grey dark:text-gray-300 max-w-2xl mx-auto">
            Türkiye'nin en büyük şikayet ve yorum platformunda kullanıcılar ve markalar bir araya geliyor.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id}
                className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center ${stat.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-4xl font-bold text-primary mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-grey dark:text-gray-300">{stat.description}</p>
                  <p className="text-4xl font-bold text-primary mt-2">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
