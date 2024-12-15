import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export const metadata = {
  title: 'İletişim | Yorumlar',
  description: 'Yorumlar platformu ile iletişime geçin. Sorularınız ve önerileriniz için bize ulaşın.',
};

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="İletişim"
        description="Bizimle iletişime geçin"
      />
      
      <ContentSection>
        <div className="grid md:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-black-primary dark:text-white">
              İletişim Bilgileri
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-black-primary dark:text-white mb-1">
                    E-posta
                  </h3>
                  <a href="mailto:info@yorumlar.com" className="text-grey dark:text-gray-300 hover:text-primary transition-colors">
                    info@yorumlar.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-black-primary dark:text-white mb-1">
                    Telefon
                  </h3>
                  <a href="tel:+902121234567" className="text-grey dark:text-gray-300 hover:text-primary transition-colors">
                    +90 (212) 123 45 67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-black-primary dark:text-white mb-1">
                    Adres
                  </h3>
                  <p className="text-grey dark:text-gray-300">
                    Maslak Mahallesi, Büyükdere Caddesi, No: 123<br />
                    Sarıyer / İstanbul
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-black-primary dark:text-white mb-1">
                    Çalışma Saatleri
                  </h3>
                  <p className="text-grey dark:text-gray-300">
                    Pazartesi - Cuma: 09:00 - 18:00<br />
                    Cumartesi: 10:00 - 14:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div>
            <h2 className="text-2xl font-bold text-black-primary dark:text-white mb-8">
              Bize Ulaşın
            </h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-black-primary dark:text-white font-medium">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  className="w-full py-2.5 px-4 rounded-lg text-black-primary dark:text-white bg-white dark:bg-gray-700"
                  placeholder="Ad Soyad"
                />
              </div>
              <div className="space-y-2">
                <label className="text-black-primary dark:text-white font-medium">
                  E-posta
                </label>
                <input
                  type="email"
                  className="w-full py-2.5 px-4 rounded-lg text-black-primary dark:text-white bg-white dark:bg-gray-700"
                  placeholder="E-posta"
                />
              </div>
              <div className="space-y-2">
                <label className="text-black-primary dark:text-white font-medium">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full py-2.5 px-4 rounded-lg text-black-primary dark:text-white bg-white dark:bg-gray-700"
                  placeholder="Telefon"
                />
              </div>
              <div className="space-y-2">
                <label className="text-black-primary dark:text-white font-medium">
                  Mesaj
                </label>
                <textarea
                  className="w-full py-2.5 px-4 rounded-lg text-black-primary dark:text-white bg-white dark:bg-gray-700"
                  placeholder="Mesaj"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-focus transition-colors"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
      </ContentSection>
    </main>
  );
};

export default ContactPage;
