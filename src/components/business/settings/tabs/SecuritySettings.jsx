"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  KeyRound,
  Smartphone,
  Clock,
  Shield,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { changePassword } from "@/services/integrations/userService";

export default function SecuritySettings() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: "30",
    deviceManagement: true,
    loginHistory: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only proceed with password change if any password field is filled
    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      // Validate passwords
      if (
        !formData.currentPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        toast({
          title: "Hata",
          description: "Tüm şifre alanlarını doldurunuz",
          variant: "destructive",
        });
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast({
          title: "Hata",
          description: "Yeni şifreler eşleşmiyor",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      try {
        await changePassword({
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
          new_password_confirmation: formData.confirmPassword,
        });

        toast({
          title: "Başarılı",
          description: "Şifreniz başarıyla güncellendi",
        });

        // Clear password fields after successful update
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } catch (error) {
        toast({
          title: "Hata",
          description:
            error.response?.data?.message ||
            "Şifre güncellenirken bir hata oluştu",
          variant: "destructive",
        });
        return;
      } finally {
        setIsLoading(false);
      }
    }

    // Handle other security settings updates here...
    try {
      // API çağrısı simülasyonu for other settings
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Başarılı",
        description: "Güvenlik ayarlarınız güncellendi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  // Update the submit button to show loading state
  const submitButton = (
    <button
      type="submit"
      disabled={isLoading}
      className="px-4 py-2 text-sm font-medium text-white bg-primary 
      rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Güncelleniyor...
        </div>
      ) : (
        "Değişiklikleri Kaydet"
      )}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Güvenlik Ayarları
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Hesap güvenliğinizi yönetin ve güvenlik tercihlerinizi güncelleyin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Şifre Değiştirme */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <KeyRound className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Şifre Değiştir
            </h4>
          </div>

          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200 mb-2"
              >
                Mevcut Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 
                  dark:border-gray-600 bg-white dark:bg-gray-800 pr-10
                  focus:ring-2 focus:ring-primary/20 focus:border-primary 
                  transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200 mb-2"
              >
                Yeni Şifre
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-gray-800
                focus:ring-2 focus:ring-primary/20 focus:border-primary 
                transition-colors"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200 mb-2"
              >
                Yeni Şifre (Tekrar)
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-gray-800
                focus:ring-2 focus:ring-primary/20 focus:border-primary 
                transition-colors"
              />
            </div>
          </div>
        </div>

        {/* İki Faktörlü Doğrulama */}
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg border 
        border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                İki Faktörlü Doğrulama
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Hesabınıza ekstra güvenlik katmanı ekleyin
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.twoFactorEnabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    twoFactorEnabled: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div
                className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
              peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
              ></div>
            </label>
          </div>
        </div>

        {/* Oturum Ayarları */}
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg border 
        border-gray-200 dark:border-gray-700"
        >
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Oturum Ayarları
          </h4>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 
              dark:text-gray-200"
              >
                Oturum Zaman Aşımı
              </label>
              <select
                value={formData.sessionTimeout}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sessionTimeout: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="15">15 dakika</option>
                <option value="30">30 dakika</option>
                <option value="60">1 saat</option>
                <option value="120">2 saat</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.loginNotifications}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loginNotifications: e.target.checked,
                  })
                }
                className="rounded border-gray-300 text-primary 
                focus:ring-primary"
              />
              <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Yeni cihazdan giriş yapıldığında bildir
              </label>
            </div>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">{submitButton}</div>
      </form>
    </div>
  );
}
