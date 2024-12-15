"use client";
import { useState } from 'react';
import { Bell, Mail, MessageSquare, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NOTIFICATION_SETTINGS = [
  {
    id: 'email_notifications',
    icon: Mail,
    title: 'E-posta Bildirimleri',
    description: 'Önemli güncellemeler ve bildirimler için e-posta alın',
    options: [
      { id: 'product_updates', label: 'Ürün Güncellemeleri' },
      { id: 'security_alerts', label: 'Güvenlik Uyarıları' },
      { id: 'newsletter', label: 'Haftalık Bülten' }
    ]
  },
  {
    id: 'push_notifications',
    icon: Bell,
    title: 'Anlık Bildirimler',
    description: 'Tarayıcı üzerinden anlık bildirimler alın',
    options: [
      { id: 'new_comments', label: 'Yeni Yorumlar' },
      { id: 'mentions', label: 'Etiketlenmeler' },
      { id: 'replies', label: 'Yanıtlar' }
    ]
  },
  {
    id: 'message_notifications',
    icon: MessageSquare,
    title: 'Mesaj Bildirimleri',
    description: 'Mesajlaşma ile ilgili bildirimleri yönetin',
    options: [
      { id: 'direct_messages', label: 'Direkt Mesajlar' },
      { id: 'group_messages', label: 'Grup Mesajları' },
      { id: 'message_requests', label: 'Mesaj İstekleri' }
    ]
  }
];

export function NotificationSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    product_updates: true,
    security_alerts: true,
    newsletter: false,
    new_comments: true,
    mentions: true,
    replies: true,
    direct_messages: true,
    group_messages: true,
    message_requests: false
  });

  const handleToggle = async (optionId) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSettings(prev => ({
        ...prev,
        [optionId]: !prev[optionId]
      }));

      toast({
        title: "Başarılı",
        description: "Bildirim ayarlarınız güncellendi",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar güncellenirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6 space-y-8">
      {NOTIFICATION_SETTINGS.map((section) => (
        <div
          key={section.id}
          className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-8 last:pb-0"
        >
          <div className="flex items-center gap-2 mb-4">
            <section.icon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {section.title}
            </h3>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {section.description}
          </p>

          <div className="space-y-4">
            {section.options.map((option) => (
              <div key={option.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {option.label}
                </span>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[option.id]}
                    onChange={() => handleToggle(option.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                  peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}