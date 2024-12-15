"use client";
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="w-full py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-black-primary dark:text-white">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-grey dark:text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-grey dark:text-gray-300">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    {
      id: 'general',
      title: 'Genel',
      questions: [
        {
          id: 1,
          question: 'Yorumlar platformu nedir?',
          answer: 'Yorumlar, tüketiciler ile markalar arasında köprü kuran bir geri bildirim platformudur. Kullanıcılar deneyimlerini paylaşabilir ve markaların yanıtlarını görebilir.'
        },
        {
          id: 2,
          question: 'Üyelik ücreti var mı?',
          answer: 'Hayır, platformumuza üye olmak ve temel özellikleri kullanmak tamamen ücretsizdir.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Hesap',
      questions: [
        {
          id: 3,
          question: 'Nasıl üye olabilirim?',
          answer: 'Sağ üst köşedeki "Kayıt Ol" butonuna tıklayarak e-posta adresiniz ile kolayca üye olabilirsiniz.'
        },
        {
          id: 4,
          question: 'Şifremi unuttum, ne yapmalıyım?',
          answer: 'Giriş sayfasındaki "Şifremi Unuttum" bağlantısını kullanarak şifre sıfırlama talimatlarını e-posta adresinize alabilirsiniz.'
        }
      ]
    },
    {
      id: 'feedback',
      title: 'Geri Bildirim',
      questions: [
        {
          id: 5,
          question: 'Nasıl geri bildirim paylaşabilirim?',
          answer: 'Ana sayfadaki "Geri Bildirim Paylaş" butonuna tıklayarak deneyiminizi paylaşabilirsiniz. Marka seçimi yapıp detayları girdikten sonra yayınlanacaktır.'
        },
        {
          id: 6,
          question: 'Geri bildirimim ne zaman yayınlanır?',
          answer: 'Geri bildiriminiz içerik kurallarımıza uygunluk kontrolünden sonra genellikle 24 saat içinde yayınlanır.'
        }
      ]
    }
  ];

  // Soruları filtrele
  const filteredQuestions = faqCategories
    .flatMap(category => 
      category.questions.map(q => ({ ...q, category: category.id }))
    )
    .filter(q => 
      (selectedCategory === 'all' || q.category === selectedCategory) &&
      (q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
       q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div>
      {/* Arama ve Filtreleme */}
      <div className="mb-12 space-y-6">
        {/* Arama */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey dark:text-gray-400" />
          <input
            type="text"
            placeholder="Soru ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:border-primary"
          />
        </div>

        {/* Kategori Filtreleme */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-grey dark:text-gray-300'
            }`}
          >
            Tümü
          </button>
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-grey dark:text-gray-300'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* SSS Listesi */}
      <div className="space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item) => (
            <FAQAccordion
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))
        ) : (
          <p className="text-center text-grey dark:text-gray-300 py-8">
            Aramanızla eşleşen soru bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQSection;