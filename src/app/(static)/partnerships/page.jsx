import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";
import Link from "next/link";
import { Handshake, Award, Globe, Shield } from 'lucide-react';

export const metadata = {
  title: 'İş Birlikleri | Yorumlar',
  description: 'Yorumlar platformu ile iş birliği fırsatları, stratejik ortaklıklar ve teknoloji entegrasyonları.',
};

const PartnershipsPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="İş Birlikleri"
        description="Birlikte büyüyelim, birlikte gelişelim"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>İş Birliği Modelleri</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Handshake className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Stratejik Ortaklık</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Uzun vadeli iş birlikleri ile karşılıklı değer yaratın
              </p>
              <ul className="space-y-2">
                <li>• Ortak projeler geliştirme</li>
                <li>• Kaynak paylaşımı</li>
                <li>• Teknoloji transferi</li>
                <li>• Pazar genişletme</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">İçerik Ortaklığı</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                İçerik paylaşımı ile değer katın
              </p>
              <ul className="space-y-2">
                <li>• Veri paylaşımı</li>
                <li>• İçerik syndication</li>
                <li>• Ortak yayınlar</li>
                <li>• Araştırma projeleri</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Teknoloji Ortaklığı</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Teknolojik çözümler ile güçlerinizi birleştirin
              </p>
              <ul className="space-y-2">
                <li>• API entegrasyonları</li>
                <li>• Yazılım geliştirme</li>
                <li>• Veri analizi</li>
                <li>• Platform entegrasyonu</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sektörel İş Birlikleri</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sektörünüzde öncü olun
              </p>
              <ul className="space-y-2">
                <li>• Sektör raporları</li>
                <li>• Ortak etkinlikler</li>
                <li>• Eğitim programları</li>
                <li>• Networking fırsatları</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>İş Birliği Süreci</h2>
          <div className="relative mt-6">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-8 relative">
              <div className="flex gap-8">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">İlk Görüşme</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    İş birliği fırsatlarını değerlendirmek için ilk görüşmeyi gerçekleştiriyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Değerlendirme</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    İş birliği modelini ve potansiyel faydaları değerlendiriyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Planlama</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    İş birliği planını ve yol haritasını oluşturuyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Uygulama</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    İş birliğini hayata geçiriyor ve sürekli geliştiriyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-primary/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              İş Birliği Fırsatlarını Değerlendirelim
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Sizinle tanışmak ve potansiyel iş birliklerini görüşmek için sabırsızlanıyoruz
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-primary text-white py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
            >
              İletişime Geçin
            </Link>
          </div>
        </section>
      </ContentSection>
    </main>
  );
};

export default PartnershipsPage;