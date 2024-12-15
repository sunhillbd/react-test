"use client";
import { ProfileForm } from '@/components/business/profile/ProfileForm';
import { SecuritySettings } from '@/components/business/profile/SecuritySettings';
import { NotificationSettings } from '@/components/business/profile/NotificationSettings';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profil Bilgileri' },
    { id: 'security', name: 'Güvenlik' },
    { id: 'notifications', name: 'Bildirimler' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Profil Ayarları
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Hesap bilgilerinizi ve tercihlerinizi yönetin
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        {activeTab === 'profile' && <ProfileForm />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
      </div>
    </div>
  );
}