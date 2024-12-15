"use client";
import { useState } from 'react';
import BrandSearch from '@/components/create-complaint/BrandSearch';
import ComplaintDetails from '@/components/create-complaint/ComplaintDetails';
import DocumentUpload from '@/components/create-complaint/DocumentUpload';
import PreviewModal from '@/components/create-complaint/PreviewModal';
import ProgressBar from '@/components/create-complaint/ProgressBar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ComplaintType from '@/components/create-complaint/ComplaintType';
import LoginRegisterModal from '@/components/LoginRegisterModal';
import { ROUTES } from '@/constants';

const CreateComplaintPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: null,
    brand: null,
    title: '',
    description: '',
    images: [],
    documents: []
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);

  // Simüle edilmiş auth durumu
  const isAuthenticated = false; // Gerçek auth durumunuzla değiştirin

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleContinue = () => {
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.brand) {
        alert('Lütfen bir marka seçin');
        return;
      }
      if (!formData.title.trim()) {
        alert('Lütfen bir başlık girin');
        return;
      }
      if (!formData.description.trim()) {
        alert('Lütfen bir açıklama girin');
        return;
      }

      if (!isAuthenticated) {
        setShowLoginRegisterModal(true);
        return;
      }

      console.log('Geri bildirim gönderiliyor:', formData);
      alert('Geri bildiriminiz başarıyla gönderildi!');
      
      setFormData({
        type: null,
        brand: null,
        title: '',
        description: '',
        images: [],
        documents: []
      });
      setStep(1);
      
    } catch (error) {
      console.error('Geri bildirim gönderilirken hata oluştu:', error);
      alert('Geri bildirim gönderilemedi. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black-primary">
      {/* Bilgi Banner'ı */}
      <div className="bg-gray-50 dark:bg-gray-800 py-3">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p className="text-grey dark:text-gray-300">
            {formData.type === 'complaint' ? 'Şikayetlerinizi' : formData.type === 'review' ? 'Değerlendirmelerinizi' : 'Geri bildirimlerinizi'} takip etmek ister misiniz?{' '}
            <Link 
              href={ROUTES.LOGIN}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Giriş Yap
            </Link>
            {' '}veya{' '}
            <Link 
              href={ROUTES.REGISTER}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12">
        {/* Logo */}
        <Link href="/" className="block mb-12">
          <Image
            src="/assets/main-logo.svg"
            alt="Logo"
            width={152}
            height={40}
            priority
            className="cursor-pointer dark:hidden"
          />
          <Image
            src="/assets/main-logo-dark.svg"
            alt="Logo"
            width={152}
            height={40}
            priority
            className="cursor-pointer hidden dark:block"
          />
        </Link>

        {/* İlerleme Çubuğu */}
        <ProgressBar 
          currentStep={step} 
          steps={[
            { number: 1, title: "Tür Seçimi" },
            { number: 2, title: "Marka Seçimi" },
            { number: 3, title: formData.type === 'complaint' ? "Şikayet Detayları" : "Değerlendirme Detayları" },
            { number: 4, title: "Belgeler" }
          ]}
        />

        {/* Form Adımları */}
        <div className="mt-12">
          {step === 1 && (
            <ComplaintType
              selectedType={formData.type}
              onTypeSelect={(type) => {
                updateFormData('type', type);
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <BrandSearch
              selectedBrand={formData.brand}
              onBrandSelect={(brand) => updateFormData('brand', brand)}
              feedbackType={formData.type}
            />
          )}

          {step === 3 && (
            <ComplaintDetails
              type={formData.type}
              title={formData.title}
              description={formData.description}
              images={formData.images}
              onUpdateTitle={(title) => updateFormData('title', title)}
              onUpdateDescription={(desc) => updateFormData('description', desc)}
              onUpdateImages={(images) => updateFormData('images', images)}
            />
          )}

          {step === 4 && (
            <DocumentUpload
              documents={formData.documents}
              onUpdateDocuments={(docs) => updateFormData('documents', docs)}
            />
          )}
        </div>

        {/* Navigasyon */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="flex-1 py-3.5 px-5 border border-gray-200 dark:border-gray-700 text-black-primary dark:text-white rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Geri
            </button>
          )}
          
          {step < 4 ? (
            <button
              type="button"
              onClick={handleContinue}
              disabled={
                (step === 1 && !formData.type) || 
                (step === 2 && !formData.brand) || 
                (step === 3 && (!formData.title.trim() || !formData.description.trim()))
              }
              className={`flex-1 py-3.5 px-5 rounded-full flex items-center justify-center gap-2 transition-colors ${
                (step === 1 && !formData.type) || 
                (step === 2 && !formData.brand) || 
                (step === 3 && (!formData.title.trim() || !formData.description.trim()))
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              Devam Et
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex-1 border border-gray-200 dark:border-gray-700 text-black-primary dark:text-white rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Önizle
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-primary text-white py-3.5 px-5 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Gönder
              </button>
            </>
          )}
        </div>
      </div>

      {/* Önizleme Modalı */}
      {showPreview && (
        <PreviewModal
          formData={formData}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Giriş/Kayıt Modalı */}
      {showLoginRegisterModal && (
        <LoginRegisterModal onClose={() => setShowLoginRegisterModal(false)} />
      )}
    </div>
  );
};

export default CreateComplaintPage;
