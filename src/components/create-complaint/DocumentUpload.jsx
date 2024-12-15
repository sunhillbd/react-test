"use client";
import { useRef } from 'react';
import { Upload, X } from 'lucide-react';

const DocumentUpload = ({ documents, onUpdateDocuments }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    onUpdateDocuments([...documents, ...files]);
    e.target.value = ''; // Input'u sıfırla
  };

  const removeDocument = (index) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    onUpdateDocuments(newDocuments);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[30px] text-black-primary dark:text-white font-bold text-center">
        Destekleyici Belgeler
      </h2>
      <p className="text-grey dark:text-gray-300 font-medium text-base text-center">
        Fatura, makbuz veya ilgili diğer belgeleri ekleyin (isteğe bağlı)
      </p>

      {/* Yükleme Alanı */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt"
          multiple
        />
        <div className="flex flex-col items-center gap-3">
          <Upload className="text-primary size-8" />
          <div className="space-y-2">
            <p className="text-primary hover:text-primary/80">
              Belge yükle
            </p>
            <p className="text-sm text-grey dark:text-gray-400">
              PDF, DOC, DOCX veya TXT dosyaları
            </p>
          </div>
        </div>
      </div>

      {/* Belge Listesi */}
      {documents.length > 0 && (
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Upload size={20} className="text-primary" />
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
              <button
                onClick={() => removeDocument(index)}
                className="text-grey hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* İpuçları */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="font-medium text-black-primary dark:text-white mb-2">
          Yardımcı Belgeler
        </h3>
        <ul className="text-sm text-grey dark:text-gray-300 space-y-1">
          <li>• Alışveriş faturası veya makbuz</li>
          <li>• Marka ile önceki iletişim</li>
          <li>• Garanti belgeleri</li>
          <li>• Servis raporları</li>
          <li>• Herhangi bir ilgili belge</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUpload;
