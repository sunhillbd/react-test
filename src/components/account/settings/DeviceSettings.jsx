"use client";
import { useState } from 'react';
import { Smartphone, Laptop, Tablet, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function DeviceSettings() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "iPhone 13 Pro",
      type: "mobile",
      lastActive: "2024-03-15T10:30:00Z",
      location: "İstanbul, TR",
      current: true
    },
    {
      id: 2,
      name: "MacBook Pro",
      type: "desktop",
      lastActive: "2024-03-14T15:45:00Z",
      location: "İstanbul, TR",
      current: false
    },
    {
      id: 3,
      name: "iPad Air",
      type: "tablet",
      lastActive: "2024-03-10T09:20:00Z",
      location: "İstanbul, TR",
      current: false
    }
  ]);

  const handleRemoveDevice = (deviceId) => {
    if (devices.find(d => d.id === deviceId)?.current) {
      toast.error('Aktif cihaz çıkartılamaz');
      return;
    }
    setDevices(devices.filter(d => d.id !== deviceId));
    toast.success('Cihaz kaldırıldı');
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-6 h-6" />;
      case 'desktop':
        return <Laptop className="w-6 h-6" />;
      case 'tablet':
        return <Tablet className="w-6 h-6" />;
      default:
        return <Smartphone className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Bağlı Cihazlar
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Hesabınıza bağlı tüm cihazları yönetin.
        </p>
        <div className="mt-4 space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-4 bg-gray-50 
              dark:bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {getDeviceIcon(device.type)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    {device.name}
                    {device.current && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Aktif Cihaz
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Son aktif: {new Date(device.lastActive).toLocaleDateString('tr-TR')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Konum: {device.location}
                  </p>
                </div>
              </div>
              {!device.current && (
                <button
                  onClick={() => handleRemoveDevice(device.id)}
                  className="p-2 text-gray-500 hover:text-red-500 rounded-lg 
                  hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Güvenlik İpuçları
        </h2>
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>Tanımadığınız cihazları hemen kaldırın</li>
            <li>Düzenli olarak cihaz listesini kontrol edin</li>
            <li>Şüpheli bir aktivite gördüğünüzde şifrenizi değiştirin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}