"use client";
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { updateEmailNotifications } from '@/services/integrations/userService';

export default function NotificationSettings({ settings }) {
  console.log(settings);
  const [emailNotifications, setEmailNotifications] = useState(
    settings?.notifications?.email || false
  );

  const handleEmailNotificationsChange = async (isChecked) => {
    console.log(isChecked);
    setEmailNotifications(isChecked);
    
    try {
      const response = await updateEmailNotifications({ email_notifications: isChecked });
      toast.success(response.message || "Bildirim ayarları güncellendi");
    } catch (error) {
      setEmailNotifications(!isChecked);
      toast.error(error.response?.data?.message || "E-posta bildirim ayarları güncellenirken bir hata oluştu");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">
          Bildirim Tercihleri
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
          Bildirim ayarlarınızı buradan yönetebilirsiniz.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                  E-posta Bildirimleri
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Önemli güncellemeler hakkında e-posta alın
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={handleEmailNotificationsChange}
              />
            </div>
          </div>

          {/* Diğer bildirim ayarları için benzer yapı */}
        </div>
      </div>
    </div>
  );
}