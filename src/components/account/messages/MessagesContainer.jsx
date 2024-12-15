"use client";
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import EmptyState from './EmptyState';
import { MOCK_MESSAGES } from './mockData';

export default function MessagesContainer() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState(MOCK_MESSAGES);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'text',
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString()
    };

    if (selectedChat) {
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
        lastMessage: newMessage.text,
        timestamp: 'Şimdi'
      };

      const updatedChats = chats.map(chat => 
        chat.id === selectedChat.id ? updatedChat : chat
      );

      setChats(updatedChats);
      setSelectedChat(updatedChat);
      setMessage('');
    }
  };

  const handleFileSelect = (file) => {
    const isImage = file.type.startsWith('image/');
    const newMessage = {
      id: Date.now(),
      type: isImage ? 'image' : 'file',
      ...(isImage ? { content: URL.createObjectURL(file) } : { 
        fileName: file.name,
        fileSize: file.size 
      }),
      sender: 'user',
      time: new Date().toLocaleTimeString()
    };

    if (selectedChat) {
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
        lastMessage: isImage ? '🖼️ Görsel' : `📎 ${file.name}`,
        timestamp: 'Şimdi'
      };

      const updatedChats = chats.map(chat => 
        chat.id === selectedChat.id ? updatedChat : chat
      );

      setChats(updatedChats);
      setSelectedChat(updatedChat);
    }
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      <div className="w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 h-full">
        <ChatList 
          chats={chats}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      
      <div className="flex-1 h-full">
        {selectedChat ? (
          <ChatWindow 
            chat={selectedChat}
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            onFileSelect={handleFileSelect}
            onDeleteChat={(id) => {
              setChats(chats.filter(chat => chat.id !== id));
              setSelectedChat(null);
            }}
            onBlockUser={(id) => {
              setChats(chats.filter(chat => chat.id !== id));
              setSelectedChat(null);
            }}
            onReportUser={(id) => {
              console.log('Reported chat:', id);
            }}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}