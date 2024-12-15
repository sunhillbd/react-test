"use client";
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function PrivacySettings() {
  return (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">
          Gizlilik Ayarları
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
          Gizlilik tercihlerinizi yönetin.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                  Profil Gizliliği
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Profilinizin kimler tarafından görüntülenebileceğini seçin
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}