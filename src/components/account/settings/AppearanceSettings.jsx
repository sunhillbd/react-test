"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AppearanceSettings() {
  const { theme, changeTheme } = useTheme();
  const [fontSize, setFontSize] = useState('medium');
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    toast.success('Tema ayarları güncellendi');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Tema Ayarları
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Uygulama temasını özelleştirin.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border 
            ${theme === 'light' 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-200 dark:border-gray-700'}`}
          >
            <Sun className="w-6 h-6" />
            <span className="text-sm font-medium">Açık</span>
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border 
            ${theme === 'dark' 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-200 dark:border-gray-700'}`}
          >
            <Moon className="w-6 h-6" />
            <span className="text-sm font-medium">Koyu</span>
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border 
            ${theme === 'system' 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-200 dark:border-gray-700'}`}
          >
            <Monitor className="w-6 h-6" />
            <span className="text-sm font-medium">Sistem</span>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Yazı Boyutu
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Uygulama yazı boyutunu ayarlayın.
        </p>
        <div className="mt-4">
          <select
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              toast.success('Yazı boyutu güncellendi');
            }}
            className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 
            dark:border-gray-700 rounded-lg"
          >
            <option value="small">Küçük</option>
            <option value="medium">Orta</option>
            <option value="large">Büyük</option>
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Erişilebilirlik
        </h2>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => {
                setReducedMotion(e.target.checked);
                toast.success('Erişilebilirlik ayarları güncellendi');
              }}
              className="rounded border-gray-300 dark:border-gray-700 text-primary"
            />
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              Azaltılmış hareket
            </span>
          </label>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Animasyonları ve geçişleri azaltır.
          </p>
        </div>
      </div>
    </div>
  );
}