"use client";
import { useState } from 'react';
import { Shield, Users, Info, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MOCK_ROLES = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Editör' },
  { id: 3, name: 'Moderatör' },
  { id: 4, name: 'Görüntüleyici' }
];

const MOCK_PERMISSIONS = [
  {
    id: 1,
    category: 'Ekip Yönetimi',
    items: [
      { id: 'manage_members', name: 'Üye Yönetimi', description: 'Ekip üyelerini ekle, düzenle ve sil' },
      { id: 'manage_roles', name: 'Rol Yönetimi', description: 'Rolleri oluştur ve düzenle' },
      { id: 'view_members', name: 'Üyeleri Görüntüle', description: 'Ekip üyelerini görüntüle' }
    ]
  },
  {
    id: 2,
    category: 'İçerik Yönetimi',
    items: [
      { id: 'create_content', name: 'İçerik Oluştur', description: 'Yeni içerik oluştur' },
      { id: 'edit_content', name: 'İçerik Düzenle', description: 'Mevcut içerikleri düzenle' },
      { id: 'delete_content', name: 'İçerik Sil', description: 'İçerikleri sil' },
      { id: 'publish_content', name: 'İçerik Yayınla', description: 'İçerikleri yayınla veya yayından kaldır' }
    ]
  },
  {
    id: 3,
    category: 'Yorum Yönetimi',
    items: [
      { id: 'moderate_comments', name: 'Yorum Moderasyonu', description: 'Yorumları onayla veya reddet' },
      { id: 'delete_comments', name: 'Yorum Silme', description: 'Yorumları sil' },
      { id: 'view_comments', name: 'Yorumları Görüntüle', description: 'Tüm yorumları görüntüle' }
    ]
  },
  {
    id: 4,
    category: 'Analitik',
    items: [
      { id: 'view_analytics', name: 'Analitik Görüntüle', description: 'İstatistikleri ve raporları görüntüle' },
      { id: 'export_reports', name: 'Rapor Dışa Aktar', description: 'Raporları dışa aktar' }
    ]
  }
];

const INITIAL_PERMISSIONS = {
  1: ['manage_members', 'manage_roles', 'view_members', 'create_content', 'edit_content', 
      'delete_content', 'publish_content', 'moderate_comments', 'delete_comments', 
      'view_comments', 'view_analytics', 'export_reports'],
  2: ['create_content', 'edit_content', 'publish_content', 'moderate_comments', 
      'view_comments', 'view_analytics'],
  3: ['moderate_comments', 'delete_comments', 'view_comments'],
  4: ['view_members', 'view_comments', 'view_analytics']
};

export default function PermissionsList() {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState(MOCK_ROLES[0].id);
  const [rolePermissions, setRolePermissions] = useState(INITIAL_PERMISSIONS);

  const handlePermissionToggle = async (permissionId) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));

      setRolePermissions(prev => ({
        ...prev,
        [selectedRole]: prev[selectedRole].includes(permissionId)
          ? prev[selectedRole].filter(id => id !== permissionId)
          : [...prev[selectedRole], permissionId]
      }));

      toast({
        title: "Başarılı",
        description: "İzinler güncellendi",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İzinler güncellenirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const hasPermission = (permissionId) => {
    return rolePermissions[selectedRole].includes(permissionId);
  };

  return (
    <div className="space-y-6">
      {/* Rol Seçici */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Users className="w-4 h-4" />
          <span>Rol Seçin</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {MOCK_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedRole === role.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      {/* İzin Listesi */}
      <div className="space-y-6">
        {MOCK_PERMISSIONS.map((section) => (
          <div
            key={section.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.category}
              </h3>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {section.items.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${hasPermission(permission.id)
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
                    >
                      <Shield className="w-5 h-5" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {permission.name}
                        </h4>
                        <button
                          onClick={() => {}}
                          className="p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                          title={permission.description}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {permission.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePermissionToggle(permission.id)}
                    className={`p-2 rounded-lg transition-colors
                      ${hasPermission(permission.id)
                        ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                      }`}
                  >
                    {hasPermission(permission.id) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <X className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}