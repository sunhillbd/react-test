"use client";
import PermissionsList from '@/components/business/teams/PermissionsList';

export default function PermissionsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          İzinler
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Rol bazlı izinleri yönetin
        </p>
      </div>

      <PermissionsList />
    </div>
  );
}