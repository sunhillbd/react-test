"use client";
import { RolesList } from '@/components/business/teams/RolesList';
import { RoleCreateModal } from '@/components/business/teams/RoleCreateModal';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function RolesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Roller
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Ekip üyeleri için rolleri yönetin
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
          bg-primary rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Rol
        </button>
      </div>

      <RolesList />
      <RoleCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}