"use client";
import { useState } from 'react';
import { ChatWindow } from '@/components/business/messages/ChatWindow';
import { MessageSidebar } from '@/components/business/messages/MessageSidebar';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  
  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sol Sidebar - Mesaj Listesi ve Filtreler */}
      <MessageSidebar 
        selectedChat={selectedChat}
        onChatSelect={setSelectedChat}
      />

      {/* Sağ Taraf - Mesajlaşma Penceresi */}
      {selectedChat ? (
        <ChatWindow chat={selectedChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Mesajlaşmaya Başlayın
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Sol taraftan bir sohbet seçin veya yeni bir mesaj başlatın
            </p>
          </div>
        </div>
      )}
    </div>
  );
}