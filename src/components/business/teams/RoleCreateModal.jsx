"use client";
import { useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AVAILABLE_PERMISSIONS = [
  { id: 'manage_team', name: 'Ekip Yönetimi', description: 'Ekip üyelerini yönetme' },
  { id: 'manage_content', name: 'İçerik Yönetimi', description: 'İçerikleri düzenleme' },
  { id: 'manage_comments', name: 'Yorum Yönetimi', description: 'Yorumları yönetme' },
  { id: 'view_analytics', name: 'Analitik Görüntüleme', description: 'Raporları görüntüleme' },
  { id: 'manage_settings', name: 'Ayar Yönetimi', description: 'Sistem ayarlarını değiştirme' }
];

export function RoleCreateModal({ isOpen, onClose }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Hata",
        description: "Rol adı gereklidir",
        variant: "destructive"
      });
      return;
    }

    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Başarılı",
        description: "Rol başarıyla oluşturuldu",
        variant: "success"
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Rol oluşturulurken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const togglePermission = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg my-8">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Yeni Rol Oluştur
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Rol Adı
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary 
                dark:bg-gray-700"
                placeholder="Örn: Editör"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary 
                dark:bg-gray-700"
                rows={3}
                placeholder="Rolün yetkilerini kısaca açıklayın..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                İzinler
              </label>
              <div className="space-y-3">
                {AVAILABLE_PERMISSIONS.map((permission) => (
                  <label
                    key={permission.id}
                    className="flex items-start gap-3 p-3 border border-gray-200 
                    dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 
                    dark:hover:bg-gray-700/50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      className="mt-1"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {permission.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {permission.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            form="roleForm"
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-600 rounded-lg transition-colors"
          >
            Rol Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}