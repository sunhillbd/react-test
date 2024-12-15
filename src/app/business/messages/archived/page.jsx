"use client";
import { ArchivedMessageList } from '@/components/business/messages/ArchivedMessageList';

export default function ArchivedMessagesPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Arşivlenmiş Mesajlar
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Arşivlediğiniz tüm mesajlaşmaları burada bulabilirsiniz
        </p>
      </div>

      <ArchivedMessageList />
    </div>
  );
}