"use client";
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Bell, Mail, MessageSquare, ShoppingCart, Shield } from 'lucide-react';

const NOTIFICATION_SETTINGS = [
  {
    id: 'orders',
    title: 'Sipariş Bildirimleri',
    description: 'Yeni siparişler ve sipariş durumu değişiklikleri',
    icon: ShoppingCart,
    channels: {
      email: true,
      push: true,
      sms: false
    }
  },
  {
    id: 'reviews',
    title: 'Yorum Bildirimleri',
    description: 'Yeni müşteri yorumları ve değerlendirmeleri',
    icon: MessageSquare,
    channels: {
      email: true,
      push: true,
      sms: false
    }
  },
  {
    id: 'marketing',
    title: 'Pazarlama Bildirimleri',
    description: 'Kampanyalar ve promosyon fırsatları',
    icon: Mail,
    channels: {
      email: true,
      push: false,
      sms: true
    }
  },
  {
    id: 'security',
    title: 'Güvenlik Bildirimleri',
    description: 'Hesap güvenliği ve şüpheli aktiviteler',
    icon: Shield,
    channels: {
      email: true,
      push: true,
      sms: true
    }
  }
];

export default function NotificationSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(NOTIFICATION_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async (settingId, channel) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSettings(prev => prev.map(setting => {
        if (setting.id === settingId) {
          return {
            ...setting,
            channels: {
              ...setting.channels,
              [channel]: !setting.channels[channel]
            }
          };
        }
        return setting;
      }));

      toast({
        title: "Başarılı",
        description: "Bildirim tercihiniz güncellendi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bildirim tercihi güncellenirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Başarılı",
        description: "Tüm bildirim ayarlarınız kaydedildi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Bildirim Ayarları
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Hangi bildirimler için nasıl bilgilendirilmek istediğinizi seçin
        </p>
      </div>

      <div className="space-y-6">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
            dark:border-gray-700 p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <setting.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {setting.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {setting.description}
                </p>
                
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 
                  dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 
                      dark:text-gray-200">
                        E-posta
                      </span>
                    </div>
                    <Switch
                      checked={setting.channels.email}
                      onCheckedChange={() => handleToggle(setting.id, 'email')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 
                  dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 
                      dark:text-gray-200">
                        Push
                      </span>
                    </div>
                    <Switch
                      checked={setting.channels.push}
                      onCheckedChange={() => handleToggle(setting.id, 'push')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 
                  dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 
                      dark:text-gray-200">
                        SMS
                      </span>
                    </div>
                    <Switch
                      checked={setting.channels.sms}
                      onCheckedChange={() => handleToggle(setting.id, 'sms')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSaveAll}
          className="px-6 py-2 text-sm font-medium text-white bg-primary 
          rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 
          disabled:cursor-not-allowed"
        >
          {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>
    </div>
  );
}