import PageHeader from "@/components/static/PageHeader";
import ContentSection from "@/components/static/ContentSection";
import FAQSection from "@/components/static/FAQSection";

export const metadata = {
  title: 'Yardım ve SSS | Yorumlar',
  description: 'Sıkça sorulan sorular ve yardım merkezi.',
};

const HelpPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black-primary">
      <PageHeader
        title="Yardım Merkezi"
        description="Sıkça sorulan sorular ve yardımcı bilgiler"
      />
      
      <ContentSection>
        <FAQSection />

        {/* İletişim Yönlendirmesi */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <h3 className="text-lg font-medium text-black-primary dark:text-white mb-2">
            Aradığınız cevabı bulamadınız mı?
          </h3>
          <p className="text-grey dark:text-gray-300 mb-4">
            Bizimle iletişime geçin, size yardımcı olalım.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            İletişime Geç
          </a>
        </div>
      </ContentSection>
    </main>
  );
};

export default HelpPage;
