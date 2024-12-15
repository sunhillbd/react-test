"use client";
import { X } from 'lucide-react';
import Image from 'next/image';

const PreviewModal = ({ formData, onClose }) => {
  const { brand, title, description, images, documents } = formData;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Başlığı */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-lg font-medium text-black-primary dark:text-white">
            Önizleme
          </h3>
          <button
            onClick={onClose}
            className="text-grey hover:text-black-primary dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal İçeriği */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Marka Bilgisi */}
            {brand && (
              <div className="flex items-center gap-3 pb-6 border-b border-gray-200 dark:border-gray-700">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-black-primary dark:text-white">
                    {brand.name}
                  </h4>
                  <p className="text-sm text-grey dark:text-gray-400">
                    {formatDate(new Date())}
                  </p>
                </div>
              </div>
            )}

            {/* Başlık */}
            <h2 className="text-xl font-medium text-black-primary dark:text-white">
              {title || 'Başlık girilmedi'}
            </h2>

            {/* Açıklama */}
            <div className="prose dark:prose-invert max-w-none">
              {description ? (
                <p className="text-grey dark:text-gray-300 whitespace-pre-wrap">
                  {description}
                </p>
              ) : (
                <p className="text-grey dark:text-gray-400 italic">
                  Açıklama girilmedi
                </p>
              )}
            </div>

            {/* Görseller */}
            {images.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-black-primary dark:text-white">
                  Görseller ({images.length})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Complaint image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Belgeler */}
            {documents.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-black-primary dark:text-white">
                  Belgeler ({documents.length})
                </h3>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-medium">
                          {doc.name.split('.').pop().toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-black-primary dark:text-white font-medium">
                          {doc.name}
                        </p>
                        <p className="text-sm text-grey dark:text-gray-400">
                          {(doc.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Alt Kısmı */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-100 dark:bg-gray-700 text-black-primary dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Önizlemeyi Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
