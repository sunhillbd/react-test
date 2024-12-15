import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow({ 
  chat, 
  message, 
  setMessage, 
  onSendMessage,
  onDeleteChat,
  onBlockUser,
  onReportUser,
  onFileSelect 
}) {
  if (!chat) return null;

  return (
    <div className="flex flex-col h-full">
      <ChatHeader 
        chat={chat} 
        onDeleteChat={onDeleteChat}
        onBlockUser={onBlockUser}
        onReportUser={onReportUser}
      />
      <MessageList messages={chat.messages} />
      <MessageInput 
        message={message}
        setMessage={setMessage}
        onSendMessage={onSendMessage}
        onFileSelect={onFileSelect}
      />
    </div>
  );
}