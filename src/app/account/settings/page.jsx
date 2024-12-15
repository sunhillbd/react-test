"use client";
import { useState, useEffect } from 'react';
import { 
  User, Bell, Shield, Palette, Smartphone, 
  CreditCard, Mail, Languages 
} from 'lucide-react';
import NotificationSettings from '@/components/account/settings/NotificationSettings';
import PrivacySettings from '@/components/account/settings/PrivacySettings';
import AppearanceSettings from '@/components/account/settings/AppearanceSettings';
import DeviceSettings from '@/components/account/settings/DeviceSettings';
import PaymentSettings from '@/components/account/settings/PaymentSettings';
import EmailSettings from '@/components/account/settings/EmailSettings';
import LanguageSettings from '@/components/account/settings/LanguageSettings';
import { fetchSettings } from '@/services/integrations/userService';
import Spinner from '@/components/ui/spinner';

const tabs = [
  {
    id: 'notifications',
    name: 'Bildirimler',
    icon: Bell,
    component: NotificationSettings
  },
  {
    id: 'privacy',
    name: 'Gizlilik',
    icon: Shield,
    component: PrivacySettings
  },
  {
    id: 'appearance',
    name: 'Görünüm',
    icon: Palette,
    component: AppearanceSettings
  },
  {
    id: 'devices',
    name: 'Cihazlar',
    icon: Smartphone,
    component: DeviceSettings
  },
  {
    id: 'payments',
    name: 'Ödeme',
    icon: CreditCard,
    component: PaymentSettings
  },
  {
    id: 'email',
    name: 'E-posta',
    icon: Mail,
    component: EmailSettings
  },
  {
    id: 'language',
    name: 'Dil',
    icon: Languages,
    component: LanguageSettings
  }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const response = await fetchSettings();
        setSettings(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
          Ayarlar
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
          Hesap ayarlarınızı buradan yönetebilirsiniz.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <nav className="w-full lg:w-64 flex-shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg
                transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-200">
            {error && (
              <div className="p-4 text-red-500">
                {error}
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center p-4">
                <Spinner className="text-primary" />
              </div>
            ) : (
              ActiveComponent && <ActiveComponent settings={settings} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}