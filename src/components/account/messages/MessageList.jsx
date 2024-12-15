import React from 'react';
import Message from './Message';

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-300px)]">
      {messages?.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}