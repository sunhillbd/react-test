"use client";
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const ComplaintType = ({ selectedType, onTypeSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-[30px] text-black-primary dark:text-white font-bold text-center">
        Ne tür bir geri bildirim paylaşmak istiyorsunuz?
      </h2>
      <p className="text-grey dark:text-gray-300 font-medium text-base text-center">
        Marka ile ilgili deneyiminizin türünü seçin
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Olumsuz Deneyim */}
        <button
          onClick={() => onTypeSelect('complaint')}
          className={`p-6 rounded-xl border-2 transition-all ${
            selectedType === 'complaint'
              ? 'border-red-500 bg-red-50 dark:bg-red-500/10'
              : 'border-gray-200 dark:border-gray-700 hover:border-red-500/50'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              selectedType === 'complaint'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-grey'
            }`}>
              <ThumbsDown size={32} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-black-primary dark:text-white mb-2">
                Şikayet
              </h3>
              <p className="text-sm text-grey dark:text-gray-400">
                Marka ile ilgili olumsuz deneyiminizi veya sorununuzu paylaşın
              </p>
            </div>
          </div>
        </button>

        {/* Olumlu Deneyim */}
        <button
          onClick={() => onTypeSelect('review')}
          className={`p-6 rounded-xl border-2 transition-all ${
            selectedType === 'review'
              ? 'border-green-500 bg-green-50 dark:bg-green-500/10'
              : 'border-gray-200 dark:border-gray-700 hover:border-green-500/50'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              selectedType === 'review'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-grey'
            }`}>
              <ThumbsUp size={32} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-black-primary dark:text-white mb-2">
                Değerlendirme
              </h3>
              <p className="text-sm text-grey dark:text-gray-400">
                Marka ile ilgili olumlu deneyiminizi veya geri bildiriminizi paylaşın
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Bilgi Metni */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-6">
        <h3 className="font-medium text-black-primary dark:text-white mb-2">
          Bu neden önemli?
        </h3>
        <ul className="text-sm text-grey dark:text-gray-300 space-y-1">
          <li>• Diğer kullanıcıların bilinçli kararlar vermesine yardımcı olur</li>
          <li>• Markalara dengeli geri bildirim sağlar</li>
          <li>• Hem iyi hem de kötü deneyimleri tanır</li>
          <li>• Markaları iyi hizmet vermeye teşvik eder</li>
        </ul>
      </div>
    </div>
  );
};

export default ComplaintType;
