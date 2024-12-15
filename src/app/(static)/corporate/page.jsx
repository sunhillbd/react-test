import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";
import Link from "next/link";
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Kurumsal Üyelik | Yorumlar',
  description: 'Markanızı yönetin, müşterilerinizle etkileşime geçin. Kurumsal üyelik avantajları ve paketleri.',
};

const CorporatePage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="Kurumsal Üyelik"
        description="Markanızı yönetin, müşterilerinizle etkileşime geçin"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>Neden Kurumsal Üyelik?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Marka Yönetimi</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Marka profilini özelleştirme</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Yorumlara hızlı yanıt</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Çoklu kullanıcı yönetimi</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Analitik</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Detaylı raporlama</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Müşteri içgörüleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Rakip analizi</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Entegrasyon</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>API erişimi</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>CRM entegrasyonu</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Webhook desteği</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Kurumsal Paketler</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-3xl font-bold text-primary mb-4">499 ₺<span className="text-base font-normal">/ay</span></p>
              <ul className="space-y-3 mb-6">
                <li>✓ 1 Marka yönetimi</li>
                <li>✓ 3 Kullanıcı</li>
                <li>✓ Temel raporlama</li>
                <li>✓ E-posta desteği</li>
              </ul>
              <Link 
                href="/contact?plan=starter" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>

            <div className="p-6 border-2 border-primary rounded-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
                Önerilen
              </div>
              <h3 className="text-xl font-semibold mb-2">Business</h3>
              <p className="text-3xl font-bold text-primary mb-4">999 ₺<span className="text-base font-normal">/ay</span></p>
              <ul className="space-y-3 mb-6">
                <li>✓ 3 Marka yönetimi</li>
                <li>✓ 10 Kullanıcı</li>
                <li>✓ Gelişmiş analitik</li>
                <li>✓ Öncelikli destek</li>
              </ul>
              <Link 
                href="/contact?plan=business" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-xl font-medium text-primary mb-4">Özel Fiyatlandırma</p>
              <ul className="space-y-3 mb-6">
                <li>✓ Sınırsız marka</li>
                <li>✓ Sınırsız kullanıcı</li>
                <li>✓ Özel geliştirmeler</li>
                <li>✓ 7/24 VIP destek</li>
              </ul>
              <Link 
                href="/contact?plan=enterprise" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2>Referanslarımız</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {/* Referans logoları buraya eklenecek */}
            <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
            <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
            <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
            <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
          </div>
        </section>
      </ContentSection>
    </main>
  );
};

export default CorporatePage;