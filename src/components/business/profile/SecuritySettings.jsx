"use client";
import { useState } from 'react';
import { Loader2, KeyRound, Shield, Smartphone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { changePassword } from '@/services/integrations/userService';

export function SecuritySettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Hata",
        description: "Yeni şifreler eşleşmiyor",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await changePassword({
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmPassword
      });
      
      toast({
        title: "Başarılı",
        description: "Şifreniz başarıyla güncellendi",
        variant: "success"
      });
      
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast({
        title: "Hata",
        description: error.response?.data?.message || "Şifre güncellenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Şifre Değiştirme */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Şifre Değiştir
          </h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Mevcut Şifre
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Yeni Şifre
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Yeni Şifre (Tekrar)
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-600 
            rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Güncelleniyor...
              </div>
            ) : (
              'Şifreyi Güncelle'
            )}
          </button>
        </form>
      </div>

      {/* İki Faktörlü Doğrulama */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            İki Faktörlü Doğrulama
          </h3>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
            <Smartphone className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Authenticator Uygulaması
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Google Authenticator veya benzeri bir uygulama kullanarak hesabınızı koruyun
                </p>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
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
          </div>
        </div>
      </div>
    </div>
  );
}