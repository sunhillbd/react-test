"use client";
import { useState } from 'react';
import { 
  Bell, 
  Clock, 
  MessageSquare, 
  Shield, 
  Smartphone, 
  Volume2,
  Mail,
  Archive,
  Trash2,
  Save
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function MessageSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      desktop: true,
      mobile: true,
      email: false,
      sound: true
    },
    privacy: {
      readReceipts: true,
      onlineStatus: true,
      autoArchive: false,
      blockList: []
    },
    autoReply: {
      enabled: false,
      message: '',
      schedule: {
        enabled: false,
        start: '09:00',
        end: '18:00',
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      }
    },
    cleanup: {
      autoDelete: false,
      deleteAfterDays: 30,
      autoArchiveAfterDays: 90
    }
  });

  const handleSave = async () => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Başarılı",
        description: "Ayarlarınız kaydedildi",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Mesaj Ayarları
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Mesajlaşma deneyiminizi özelleştirin
        </p>
      </div>

      <div className="space-y-6">
        {/* Bildirim Ayarları */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 
          flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Bildirim Ayarları
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Mobil Bildirimler
                  </p>
                  <p className="text-xs text-gray-500">
                    Yeni mesajlar için mobil bildirimler alın
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.mobile}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      mobile: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Ses Bildirimleri
                  </p>
                  <p className="text-xs text-gray-500">
                    Yeni mesajlar için ses bildirimleri çal
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.sound}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      sound: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    E-posta Bildirimleri
                  </p>
                  <p className="text-xs text-gray-500">
                    Okunmamış mesajlar için e-posta bildirimleri alın
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      email: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Gizlilik Ayarları */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 
          flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Gizlilik Ayarları
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Okundu Bilgisi
                  </p>
                  <p className="text-xs text-gray-500">
                    Mesajların okunduğunu karşı tarafa bildir
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.readReceipts}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      readReceipts: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Çevrimiçi Durumu
                  </p>
                  <p className="text-xs text-gray-500">
                    Çevrimiçi olduğunuzu diğer kullanıcılara göster
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.onlineStatus}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      onlineStatus: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Otomatik Yanıt */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 
          flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Otomatik Yanıt
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Otomatik Yanıt
                </p>
                <p className="text-xs text-gray-500">
                  Mesajlara otomatik yanıt ver
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoReply.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    autoReply: {
                      ...settings.autoReply,
                      enabled: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            {settings.autoReply.enabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Otomatik Yanıt Mesajı
                  </label>
                  <textarea
                    value={settings.autoReply.message}
                    onChange={(e) => setSettings({
                      ...settings,
                      autoReply: {
                        ...settings.autoReply,
                        message: e.target.value
                      }
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary 
                    dark:bg-gray-700"
                    placeholder="Otomatik yanıt mesajınızı yazın..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Zaman Programı
                    </p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoReply.schedule.enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          autoReply: {
                            ...settings.autoReply,
                            schedule: {
                              ...settings.autoReply.schedule,
                              enabled: e.target.checked
                            }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                      peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer 
                      dark:bg-gray-700 peer-checked:after:translate-x-full 
                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                      after:left-[2px] after:bg-white after:border-gray-300 after:border 
                      after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                      peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {settings.autoReply.schedule.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">
                          Başlangıç Saati
                        </label>
                        <input
                          type="time"
                          value={settings.autoReply.schedule.start}
                          onChange={(e) => setSettings({
                            ...settings,
                            autoReply: {
                              ...settings.autoReply,
                              schedule: {
                                ...settings.autoReply.schedule,
                                start: e.target.value
                              }
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary 
                          dark:bg-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">
                          Bitiş Saati
                        </label>
                        <input
                          type="time"
                          value={settings.autoReply.schedule.end}
                          onChange={(e) => setSettings({
                            ...settings,
                            autoReply: {
                              ...settings.autoReply,
                              schedule: {
                                ...settings.autoReply.schedule,
                                end: e.target.value
                              }
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary 
                          dark:bg-gray-700"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Temizleme Ayarları */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 
          flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Temizleme Ayarları
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Archive className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Otomatik Arşivleme
                  </p>
                  <p className="text-xs text-gray-500">
                    {settings.cleanup.autoArchiveAfterDays} gün sonra mesajları otomatik arşivle
                  </p>
                </div>
              </div>
              <input
                type="number"
                min="1"
                max="365"
                value={settings.cleanup.autoArchiveAfterDays}
                onChange={(e) => setSettings({
                  ...settings,
                  cleanup: {
                    ...settings.cleanup,
                    autoArchiveAfterDays: parseInt(e.target.value)
                  }
                })}
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Otomatik Silme
                  </p>
                  <p className="text-xs text-gray-500">
                    {settings.cleanup.deleteAfterDays} gün sonra arşivlenmiş mesajları sil
                  </p>
                </div>
              </div>
              <input
                type="number"
                min="1"
                max="365"
                value={settings.cleanup.deleteAfterDays}
                onChange={(e) => setSettings({
                  ...settings,
                  cleanup: {
                    ...settings.cleanup,
                    deleteAfterDays: parseInt(e.target.value)
                  }
                })}
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg 
            hover:bg-primary-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            Ayarları Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}