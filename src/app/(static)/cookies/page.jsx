import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";

export const metadata = {
  title: 'Çerez Politikası | Yorumlar',
  description: 'Web sitemizde kullanılan çerezler ve gizlilik tercihleriniz hakkında bilgi edinin.',
};

const CookiesPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="Çerez Politikası"
        description="Web sitemizde kullanılan çerezler hakkında bilgilendirme"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>Çerez (Cookie) Nedir?</h2>
          <p>
            Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza depolanan küçük metin dosyalarıdır. Bu dosyalarda IP adresiniz, oturum bilgileriniz, eriştiğiniz sayfalar vb. veriler saklanır.
          </p>
        </section>

        <section className="mb-12">
          <h2>Çerez Türleri</h2>
          <h3 className="text-lg font-medium mb-2">Zorunlu Çerezler</h3>
          <p className="mb-4">
            Web sitemizin doğru şekilde çalışması için gerekli olan çerezlerdir. Bu çerezler güvenlik ve doğrulama gibi amaçlar için kullanılmaktadır.
          </p>

          <h3 className="text-lg font-medium mb-2">Performans Çerezleri</h3>
          <p className="mb-4">
            Ziyaretçilerin web sitemizi nasıl kullandığını anlamamızı sağlayan çerezlerdir. Bu çerezler sayesinde site içerisinde en çok hangi sayfaların görüntülendiğini, web sitemizin gerektiği gibi çalışıp çalışmadığını ve olası hataların tespitini sağlarız.
          </p>

          <h3 className="text-lg font-medium mb-2">İşlevsellik Çerezleri</h3>
          <p className="mb-4">
            Kullanıcıların web sitemizde yaptığı seçimleri hatırlamak için kullanılan çerezlerdir. Bu sayede bir sonraki ziyaretinizde dil tercihinizi veya giriş bilgilerinizi hatırlayabiliriz.
          </p>

          <h3 className="text-lg font-medium mb-2">Hedefleme/Reklam Çerezleri</h3>
          <p>
            Kullanıcılara web sitemizde veya site haricindeki mecralarda ürün ve hizmet tanıtımını yapmak için kullanılan çerezlerdir.
          </p>
        </section>

        <section className="mb-12">
          <h2>Çerez Kullanım Amaçlarımız</h2>
          <ul>
            <li>Oturum yönetimi</li>
            <li>Kullanıcı tercihlerinin saklanması</li>
            <li>Site kullanımının analizi</li>
            <li>Performans iyileştirme</li>
            <li>Güvenlik önlemleri</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Çerez Yönetimi</h2>
          <p>
            Tarayıcınızın ayarlarından çerezleri kabul etme ve reddetme yöntemlerini kontrol edebilir, çerezleri silebilir veya web sitemizde çerez kullanımını tamamen engelleyebilirsiniz. Ayrıca, çerez tercihlerinizi her zaman web sitemizin alt kısmında yer alan Çerez Ayarları bölümünden değiştirebilirsiniz.
          </p>
        </section>

        <section>
          <h2>Çerez Kullanımı Reddetme</h2>
          <p>
            Çerezleri kullanmayı reddetmeniz durumunda web sitemizin bazı özellikleri düzgün çalışmayabilir ve hizmetlerimizden tam olarak yararlanamayabilirsiniz.
          </p>
        </section>
      </ContentSection>
    </main>
  );
};

export default CookiesPage;