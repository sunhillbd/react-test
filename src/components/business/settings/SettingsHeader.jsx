"use client";
export default function SettingsHeader({ brandData }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Ayarlar
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        İşletme ayarlarınızı buradan yönetebilirsiniz
      </p>
    </div>
  );
}
