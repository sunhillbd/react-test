import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";

export const metadata = {
  title: 'Hakkımızda | Yorumlar',
  description: 'Yorumlar platformu hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz.',
};

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="Hakkımızda"
        description="Tüketiciler ve markalar arasında köprü kuruyoruz"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>Misyonumuz</h2>
          <p>
            Yorumlar olarak misyonumuz, tüketiciler ile markalar arasında şeffaf ve güvenilir bir iletişim platformu oluşturmaktır. Müşteri deneyimlerini iyileştirmek ve markaların hizmet kalitesini artırmak için çalışıyoruz.
          </p>
        </section>

        <section className="mb-12">
          <h2>Vizyonumuz</h2>
          <p>
            Türkiye'nin en güvenilir müşteri geri bildirim platformu olmak ve tüketici haklarının korunmasına katkıda bulunmak için çalışıyoruz.
          </p>
        </section>

        <section className="mb-12">
          <h2>Değerlerimiz</h2>
          <ul>
            <li>
              <strong>Şeffaflık:</strong> Tüm süreçlerimizde açık ve dürüst bir yaklaşım benimseriz.
            </li>
            <li>
              <strong>Güvenilirlik:</strong> Platformumuzda paylaşılan her içeriğin doğruluğunu önemseriz.
            </li>
            <li>
              <strong>Tarafsızlık:</strong> Hem tüketici hem de marka tarafında adil bir yaklaşım sergileriz.
            </li>
            <li>
              <strong>Yenilikçilik:</strong> Sürekli gelişim için teknolojik yenilikleri takip eder ve uygularız.
            </li>
          </ul>
        </section>

        <section>
          <h2>Ekibimiz</h2>
          <p>
            Deneyimli ve tutkulu ekibimizle, kullanıcılarımıza en iyi deneyimi sunmak için çalışıyoruz. Teknoloji, müşteri hizmetleri ve içerik yönetimi alanlarında uzman kadromuzla hizmet veriyoruz.
          </p>
        </section>
      </ContentSection>
    </main>
  );
};

export default AboutPage;
