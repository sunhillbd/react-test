"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import { updateSettings } from '@/services/integrations/userService';
const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSettings({ settings }) {
  const [language, setLanguage] = useState(settings?.preferences?.language || 'en');
  const [dateFormat, setDateFormat] = useState('dd/MM/yyyy');
  const [timeFormat, setTimeFormat] = useState('24');

  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    await updateSettings({ language: lang });
    toast.success('Dil ayarları güncellendi');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Dil Seçimi
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tercih ettiğiniz dili seçin.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-3 p-3 rounded-lg border 
              ${language === lang.code 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 dark:border-gray-700'}`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Tarih ve Saat Formatı
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tarih Formatı
            </label>
            <select
              value={dateFormat}
              onChange={(e) => {
                setDateFormat(e.target.value);
                toast.success('Tarih formatı güncellendi');
              }}
              className="mt-1 w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 
              dark:border-gray-700 rounded-lg"
            >
              <option value="dd/MM/yyyy">31/12/2024</option>
              <option value="MM/dd/yyyy">12/31/2024</option>
              <option value="yyyy-MM-dd">2024-12-31</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Saat Formatı
            </label>
            <select
              value={timeFormat}
              onChange={(e) => {
                setTimeFormat(e.target.value);
                toast.success('Saat formatı güncellendi');
              }}
              className="mt-1 w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 
              dark:border-gray-700 rounded-lg"
            >
              <option value="24">24 Saat</option>
              <option value="12">12 Saat</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}