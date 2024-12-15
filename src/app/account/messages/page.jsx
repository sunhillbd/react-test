import MessagesContainer from '@/components/account/messages/MessagesContainer';

export default function MessagesPage() {
  return (
    <div className="p-6 h-[calc(100vh-80px)]">
      <div className="flex flex-col h-full gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Mesajlarım
          </h1>
        </div>

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border 
          border-gray-200 dark:border-gray-700 overflow-hidden">
          <MessagesContainer />
        </div>
      </div>
    </div>
  );
}