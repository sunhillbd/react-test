import React from 'react';
import Image from 'next/image';
import { FileText, Download } from 'lucide-react';

export default function Message({ message }) {
  const messageClasses = `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`;
  const bubbleClasses = `max-w-[70%] px-4 py-2.5 ${
    message.sender === 'user' 
      ? 'bg-primary text-white rounded-[20px] rounded-tr-sm' 
      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-[20px] rounded-tl-sm shadow-sm'
  }`;

  if (message.type === 'image') {
    return (
      <div className={messageClasses}>
        <div className={bubbleClasses}>
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-1">
            <Image
              src={message.content}
              alt="Gönderilen görsel"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs opacity-70 block">{message.time}</span>
        </div>
      </div>
    );
  }

  if (message.type === 'file') {
    return (
      <div className={messageClasses}>
        <div className={bubbleClasses}>
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className="text-xs opacity-70">
                {(message.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button 
              className="p-2 hover:bg-black/10 rounded-full transition-colors"
              title="İndir"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
          <span className="text-xs opacity-70 mt-2 block">{message.time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={messageClasses}>
      <div className={bubbleClasses}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
      </div>
    </div>
  );
}