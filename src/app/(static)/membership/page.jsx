import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";
import Link from "next/link";

export const metadata = {
  title: 'Bireysel Üyelik | Yorumlar',
  description: 'Yorumlar platformu bireysel üyelik paketleri ve avantajları hakkında bilgi edinin.',
};

const MembershipPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="Bireysel Üyelik"
        description="Yorumlar platformunda bireysel üyelik avantajları"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>Üyelik Avantajları</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Yorum Yapma</h3>
              <ul className="space-y-3">
                <li>✓ Sınırsız yorum paylaşımı</li>
                <li>✓ Fotoğraf ve belge ekleme</li>
                <li>✓ Marka yanıtlarını görüntüleme</li>
                <li>✓ Yorum etkileşimleri</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Profil Yönetimi</h3>
              <ul className="space-y-3">
                <li>✓ Özel profil sayfası</li>
                <li>✓ Yorum geçmişi</li>
                <li>✓ Etkileşim istatistikleri</li>
                <li>✓ Rozet kazanma</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Üyelik Paketleri</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Ücretsiz</h3>
              <p className="text-3xl font-bold text-primary mb-4">0 ₺</p>
              <ul className="space-y-3 mb-6">
                <li>✓ Temel yorum özellikleri</li>
                <li>✓ Standart profil</li>
                <li>✓ Marka yanıtlarını görüntüleme</li>
                <li>× Premium rozetler</li>
              </ul>
              <Link 
                href="/register" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ücretsiz Başla
              </Link>
            </div>
            
            <div className="p-6 border-2 border-primary rounded-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
                Popüler
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <p className="text-3xl font-bold text-primary mb-4">29.99 ₺<span className="text-base font-normal">/ay</span></p>
              <ul className="space-y-3 mb-6">
                <li>✓ Tüm ücretsiz özellikler</li>
                <li>✓ Özel rozetler</li>
                <li>✓ Öncelikli destek</li>
                <li>✓ Reklamsız deneyim</li>
              </ul>
              <Link 
                href="/register?plan=premium" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Premium'a Geç
              </Link>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold text-primary mb-4">49.99 ₺<span className="text-base font-normal">/ay</span></p>
              <ul className="space-y-3 mb-6">
                <li>✓ Tüm Premium özellikler</li>
                <li>✓ API erişimi</li>
                <li>✓ Detaylı istatistikler</li>
                <li>✓ VIP destek</li>
              </ul>
              <Link 
                href="/register?plan=pro" 
                className="block text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Pro'ya Geç
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Sıkça Sorulan Sorular</h2>
          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Üyelik ücretli mi?</h3>
              <p>Temel özellikler ücretsizdir. Premium ve Pro paketler ek özellikler sunar.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Üyeliğimi nasıl iptal edebilirim?</h3>
              <p>Hesap ayarlarınızdan istediğiniz zaman üyeliğinizi iptal edebilirsiniz.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Ödeme yöntemleri nelerdir?</h3>
              <p>Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz.</p>
            </div>
          </div>
        </section>
      </ContentSection>
    </main>
  );
};

export default MembershipPage;