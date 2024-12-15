import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export default function MessageInput({ message, setMessage, onSendMessage, onFileSelect }) {
  const fileInputRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const { toast } = useToast();
  const emojis = ['😊', '😂', '👍', '❤️', '🎉', '👋', '🤔', '👏', '🙌', '✨'];

  return (
    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {uploadProgress !== null && (
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelect(file);
            }}
            className="hidden"
            accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx"
          />

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Dosya ekle"
          >
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
            placeholder="Mesajınızı yazın..."
            className="w-full px-4 py-2.5 pr-10 bg-gray-100 dark:bg-gray-700 rounded-full 
            border-none focus:ring-2 focus:ring-primary/20 text-sm placeholder-gray-500 
            dark:placeholder-gray-400 dark:text-white"
          />

          <button 
            onClick={() => setShowEmojis(!showEmojis)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5
            hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
            title="Emoji ekle"
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </button>

          {showEmojis && (
            <div className="absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-gray-800 
            rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 grid grid-cols-5 gap-1 z-50">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMessage(prev => prev + emoji);
                    setShowEmojis(false);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={onSendMessage}
          disabled={!message.trim()}
          className="p-2.5 bg-primary text-white rounded-full hover:bg-primary/90 
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          title="Gönder"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}