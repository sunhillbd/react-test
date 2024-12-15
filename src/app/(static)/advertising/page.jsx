import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";
import Link from "next/link";
import { BarChart, Users, Target, Zap } from 'lucide-react';

export const metadata = {
  title: 'Reklam Çözümleri | Yorumlar',
  description: 'Yorumlar platformunda reklam verme fırsatları, reklam modelleri ve başarı hikayeleri.',
};

const AdvertisingPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="Reklam Çözümleri"
        description="Markanızı doğru kitleye ulaştırın"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>Neden Yorumlar'da Reklam Verin?</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Geniş Kitle</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Aylık 10 milyondan fazla aktif kullanıcıya erişim imkanı
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hedefleme</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Demografik, davranışsal ve ilgi alanına göre hedefleme
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <BarChart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ölçümleme</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gerçek zamanlı raporlama ve performans takibi
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Etkileşim</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yüksek etkileşim oranları ve marka bilinirliği
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Reklam Modelleri</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Display Reklamlar</h3>
              <ul className="space-y-3 mb-6">
                <li>• Banner reklamları</li>
                <li>• Rich media reklamlar</li>
                <li>• Video reklamlar</li>
                <li>• Native reklamlar</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                CPM bazlı fiyatlandırma
              </p>
              <Link 
                href="/contact?type=display" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Teklif Al
              </Link>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Sponsorlu İçerikler</h3>
              <ul className="space-y-3 mb-6">
                <li>• Öne çıkan markalar</li>
                <li>• Sponsorlu listeler</li>
                <li>• Marka hikayeleri</li>
                <li>• Özel içerik alanları</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Sabit veya CPC bazlı fiyatlandırma
              </p>
              <Link 
                href="/contact?type=sponsored" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Teklif Al
              </Link>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Performans Reklamları</h3>
              <ul className="space-y-3 mb-6">
                <li>• CPC reklamlar</li>
                <li>• Lead generation</li>
                <li>• Retargeting</li>
                <li>• E-posta pazarlama</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                CPC/CPA bazlı fiyatlandırma
              </p>
              <Link 
                href="/contact?type=performance" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Teklif Al
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Başarı Hikayeleri</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">E-ticaret Markası</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "Yorumlar'daki reklam kampanyamız ile satışlarımızda %40 artış sağladık."
              </p>
              <div className="text-sm text-gray-500">
                Marketing Direktörü - XYZ E-ticaret
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Teknoloji Şirketi</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "Hedefli reklamlar sayesinde doğru kullanıcılara ulaşarak lead maliyetlerimizi %30 düşürdük."
              </p>
              <div className="text-sm text-gray-500">
                Dijital Pazarlama Müdürü - ABC Tech
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-primary/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Reklam Çözümlerimiz Hakkında Bilgi Alın
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Size özel reklam çözümlerimiz için satış ekibimiz ile görüşün
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-primary text-white py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Hemen İletişime Geçin
            </Link>
          </div>
        </section>
      </ContentSection>
    </main>
  );
};

export default AdvertisingPage;