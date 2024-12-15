"use client";
import { useState } from 'react';
import { TeamsList } from '@/components/business/teams/TeamsList';
import { TeamInviteModal } from '@/components/business/teams/TeamInviteModal';
import { UserPlus } from 'lucide-react';

export default function TeamsPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Ekip Üyeleri
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Ekip üyelerinizi yönetin ve yeni üyeler davet edin
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
          bg-primary rounded-lg hover:bg-primary-600 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Üye Davet Et
        </button>
      </div>

      <TeamsList />
      <TeamInviteModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
      />
    </div>
  );
}