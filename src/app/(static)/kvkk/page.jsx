import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";

export const metadata = {
  title: 'KVKK Aydınlatma Metni | Yorumlar',
  description: 'Kişisel verilerin korunması kanunu kapsamında bilgilendirme ve veri işleme politikalarımız.',
};

const KVKKPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="KVKK Aydınlatma Metni"
        description="Kişisel verilerin korunması hakkında bilgilendirme"
      />
      
      <ContentSection>
        <section className="mb-12">
          <h2>Veri Sorumlusu</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu olarak Yorumlar Platform A.Ş. tarafından aşağıda açıklanan kapsamda işlenebilecektir.
          </p>
        </section>

        <section className="mb-12">
          <h2>Kişisel Verilerin İşlenme Amacı</h2>
          <p>
            Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
          </p>
          <ul>
            <li>Üyelik işlemlerinin gerçekleştirilmesi</li>
            <li>Platform hizmetlerinin sunulması</li>
            <li>Kullanıcı deneyiminin iyileştirilmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Güvenliğin sağlanması</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>İşlenen Kişisel Veriler</h2>
          <ul>
            <li>Kimlik bilgileri (ad, soyad)</li>
            <li>İletişim bilgileri (e-posta, telefon)</li>
            <li>Kullanıcı işlem bilgileri</li>
            <li>İnternet erişim logları</li>
            <li>Çerez bilgileri</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, yasal düzenlemelere uygun olarak ve belirtilen amaçlar doğrultusunda:
          </p>
          <ul>
            <li>Yetkili kamu kurum ve kuruluşları</li>
            <li>İş ortaklarımız</li>
            <li>Hizmet sağlayıcılarımız</li>
            <li>Hukuki yükümlülüklerimiz kapsamında diğer üçüncü kişiler</li>
          </ul>
          <p>ile paylaşılabilecektir.</p>
        </section>

        <section>
          <h2>Haklarınız</h2>
          <p>
            KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
          </p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
            <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
            <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
            <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
          </ul>
        </section>
      </ContentSection>
    </main>
  );
};

export default KVKKPage;