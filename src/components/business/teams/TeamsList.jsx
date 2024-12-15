"use client";
import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Shield, 
  Trash2, 
  Edit2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/ui/AlertModal';
import { TeamEditModal } from './TeamEditModal';

const MOCK_MEMBERS = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    role: 'Admin',
    status: 'active',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
  },
  {
    id: 2,
    name: 'Mehmet Demir',
    email: 'mehmet@example.com',
    phone: '+90 555 987 6543',
    role: 'Editor',
    status: 'pending',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
  }
];

export function TeamsList() {
  const { toast } = useToast();
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="w-3 h-3" />
          Aktif
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
        <Clock className="w-3 h-3" />
        Beklemede
      </span>
    );
  };

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMembers(prev => prev.filter(member => member.id !== selectedMember.id));
      toast({
        title: "Başarılı",
        description: "Üye başarıyla silindi",
        variant: "success"
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Üye silinirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMembers(prev => prev.map(member => 
        member.id === selectedMember.id ? { ...member, ...updatedData } : member
      ));
      
      toast({
        title: "Başarılı",
        description: "Üye bilgileri güncellendi",
        variant: "success"
      });
      setIsEditModalOpen(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Üye güncellenirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Üye
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(member)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(member)}
                        className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Üyeyi Sil"
        description={`${selectedMember?.name} adlı üyeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
      />

      {isEditModalOpen && (
        <TeamEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          member={selectedMember}
          onSave={handleEdit}
        />
      )}
    </>
  );
}