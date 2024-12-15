"use client";
import { useState } from 'react';
import { Shield, Edit2, Trash2, Users, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/ui/AlertModal';
import { RoleCreateModal } from './RoleCreateModal';

const MOCK_ROLES = [
  {
    id: 1,
    name: 'Admin',
    description: 'Tam yetkili yönetici',
    memberCount: 3,
    permissions: ['Tüm izinler'],
    isDefault: true
  },
  {
    id: 2,
    name: 'Editör',
    description: 'İçerik düzenleme yetkisi',
    memberCount: 5,
    permissions: ['Yorumları yönet', 'İçerik düzenle', 'Raporları görüntüle'],
    isDefault: false
  },
  {
    id: 3,
    name: 'Moderatör',
    description: 'Yorum ve içerik denetleyici',
    memberCount: 4,
    permissions: ['Yorumları yönet', 'İçerikleri denetle'],
    isDefault: false
  }
];

export function RolesList() {
  const { toast } = useToast();
  const [roles, setRoles] = useState(MOCK_ROLES);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedRole.isDefault) {
        toast({
          title: "Hata",
          description: "Varsayılan rol silinemez",
          variant: "destructive"
        });
        return;
      }

      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRoles(prev => prev.filter(role => role.id !== selectedRole.id));
      toast({
        title: "Başarılı",
        description: "Rol başarıyla silindi",
        variant: "success"
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Rol silinirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
            dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${role.isDefault 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                >
                  <Shield className="w-5 h-5" />
                </div>
                
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {role.name}
                    </h3>
                    {role.isDefault && (
                      <span className="px-2.5 py-0.5 text-xs font-medium text-primary 
                      bg-primary/10 rounded-full">
                        Varsayılan
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {role.description}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 
                    dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      {role.memberCount} Üye
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 
                    dark:text-gray-400">
                      <Lock className="w-4 h-4" />
                      {role.permissions.length} İzin
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      İzinler
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-0.5 text-xs font-medium text-gray-600 
                          bg-gray-100 dark:text-gray-300 dark:bg-gray-700 rounded-full"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(role)}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(role)}
                  className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  disabled={role.isDefault}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Rolü Sil"
        description="Bu rolü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      />

      <RoleCreateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        role={selectedRole}
        isEditing={true}
      />
    </>
  );
}