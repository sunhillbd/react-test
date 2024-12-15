import { MessageSquare } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Henüz bir sohbet seçilmedi
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Mesajlaşmaya başlamak için sol taraftan bir sohbet seçin
        </p>
      </div>
    </div>
  );
}