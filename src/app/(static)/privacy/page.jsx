import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";

export const metadata = {
  title: 'Gizlilik Politikası | Yorumlar',
  description: 'Yorumlar platformu gizlilik politikası ve veri koruma ilkeleri hakkında bilgi edinin.',
};

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="Gizlilik Politikası"
        description="Kişisel verilerinizin korunması bizim için önemli"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>Veri Toplama ve Kullanım</h2>
          <p>
            Yorumlar platformu olarak, hizmetlerimizi sunabilmek için bazı kişisel verilerinizi toplamaktayız. Bu veriler şunları içerebilir:
          </p>
          <ul>
            <li>Ad ve soyad bilgileri</li>
            <li>E-posta adresi</li>
            <li>Profil fotoğrafı (isteğe bağlı)</li>
            <li>Geri bildirim ve yorum içerikleri</li>
            <li>Kullanım istatistikleri</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Veri Güvenliği</h2>
          <p>
            Kişisel verilerinizin güvenliği için endüstri standardı güvenlik önlemleri alıyoruz:
          </p>
          <ul>
            <li>SSL şifreleme teknolojisi</li>
            <li>Güvenli veri depolama sistemleri</li>
            <li>Düzenli güvenlik güncellemeleri</li>
            <li>Erişim kontrolü ve yetkilendirme</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Çerezler ve İzleme</h2>
          <p>
            Platformumuzda daha iyi bir deneyim sunabilmek için çerezler kullanıyoruz. Bu çerezler:
          </p>
          <ul>
            <li>Oturum yönetimi</li>
            <li>Tercihlerinizin hatırlanması</li>
            <li>Platform kullanım analizi</li>
            <li>Güvenlik doğrulamaları</li>
          </ul>
        </section>
      </ContentSection>
    </main>
  );
};

export default PrivacyPage;
