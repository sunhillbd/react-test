import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";

export const metadata = {
  title: 'Kullanım Koşulları | Yorumlar',
  description: 'Yorumlar platformu kullanım koşulları ve kuralları hakkında detaylı bilgi.',
};

const TermsPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="Kullanım Koşulları"
        description="Platformumuzu kullanırken uymanız gereken kurallar ve koşullar"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>Genel Kurallar</h2>
          <p>
            Yorumlar platformunu kullanırken aşağıdaki kurallara uymanız gerekmektedir:
          </p>
          <ul>
            <li>Doğru ve gerçek bilgiler paylaşmak</li>
            <li>Başkalarının haklarına saygı göstermek</li>
            <li>Nefret söylemi ve hakaret içeren içeriklerden kaçınmak</li>
            <li>Spam ve yanıltıcı içerik paylaşmamak</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Üyelik Koşulları</h2>
          <p>
            Platform üyeliği için gerekli koşullar:
          </p>
          <ul>
            <li>18 yaşından büyük olmak</li>
            <li>Gerçek kimlik bilgileri kullanmak</li>
            <li>Tek bir hesap sahibi olmak</li>
            <li>Güvenli bir parola belirlemek</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>İçerik Kuralları</h2>
          <p>
            Paylaşılan içerikler şu kurallara uygun olmalıdır:
          </p>
          <ul>
            <li>Gerçek deneyimlere dayalı olmalı</li>
            <li>Hakaret ve küfür içermemeli</li>
            <li>Kişisel bilgiler paylaşılmamalı</li>
            <li>Telif haklarına uygun olmalı</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Hesap Güvenliği</h2>
          <p>
            Hesap güvenliği için dikkat edilmesi gerekenler:
          </p>
          <ul>
            <li>Güçlü parola kullanımı</li>
            <li>Hesap bilgilerinin paylaşılmaması</li>
            <li>Şüpheli aktivitelerin bildirilmesi</li>
            <li>Düzenli güvenlik kontrolü</li>
          </ul>
        </section>

        <section>
          <h2>Yaptırımlar</h2>
          <p>
            Kural ihlali durumunda uygulanabilecek yaptırımlar:
          </p>
          <ul>
            <li>Uyarı verilmesi</li>
            <li>İçeriğin kaldırılması</li>
            <li>Hesabın geçici olarak askıya alınması</li>
            <li>Hesabın kalıcı olarak kapatılması</li>
          </ul>
        </section>
      </ContentSection>
    </main>
  );
};

export default TermsPage;
