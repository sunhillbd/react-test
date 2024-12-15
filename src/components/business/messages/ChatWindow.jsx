"use client";
import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  File,
  Link
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock mesaj verileri
const MOCK_MESSAGES = [
  {
    id: 1,
    content: 'Merhaba, nasıl yardımcı olabilirim?',
    timestamp: '14:30',
    sender: 'business',
    status: 'read'
  },
  {
    id: 2,
    content: 'Ürününüz hakkında bilgi almak istiyorum',
    timestamp: '14:31',
    sender: 'user',
    status: 'read'
  },
  {
    id: 3,
    content: 'Tabii, hangi ürün hakkında bilgi almak istersiniz?',
    timestamp: '14:32',
    sender: 'business',
    status: 'read'
  }
];

// Basit emoji listesi
const BASIC_EMOJIS = [
  '😊', '👍', '🙏', '❤️', '👋', '🎉',
  '😂', '🤔', '👌', '✨', '🔥', '💪'
];

export function ChatWindow({ chat }) {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadMessages();
  }, [chat?.id]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages(MOCK_MESSAGES);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Mesajlar yüklenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'business',
      status: 'sent'
    };

    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    } catch (error) {
      toast({
        title: "Hata",
        description: "Mesaj gönderilemedi",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMessage = {
        id: messages.length + 1,
        content: `Dosya: ${file.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'business',
        status: 'sent',
        file: {
          name: file.name,
          type: file.type,
          size: file.size
        }
      };

      setMessages(prev => [...prev, newMessage]);
      
      toast({
        title: "Başarılı",
        description: "Dosya yüklendi",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Dosya yüklenemedi",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Üst Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white 
      dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {chat.name}
              </h2>
              {chat.isOnline && (
                <span className="text-sm text-green-500">Çevrimiçi</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
            dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
            dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
            dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mesaj Listesi */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Henüz mesaj yok
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'business' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.sender === 'business'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {msg.file ? (
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4" />
                    <span>{msg.content}</span>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp}
                  {msg.sender === 'business' && (
                    <span className="ml-2">
                      {msg.status === 'sent' ? '✓' : msg.status === 'delivered' ? '✓✓' : '✓✓'}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Mesaj Gönderme */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-end gap-2">
          {/* Dosya Ekleme */}
          <div className="relative">
            <button
              onClick={() => setIsAttachMenuOpen(!isAttachMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
              dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {isAttachMenuOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-700 
              rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="p-2 space-y-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                  />
                  {[
                    { icon: ImageIcon, label: 'Fotoğraf', type: 'image/*' },
                    { icon: File, label: 'Dosya', type: '*/*' },
                    { icon: Link, label: 'Bağlantı' }
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => {
                        if (option.type) {
                          fileInputRef.current.accept = option.type;
                          fileInputRef.current.click();
                        }
                        setIsAttachMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 
                      dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                    >
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mesaj Yazma Alanı */}
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Mesajınızı yazın..."
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 
              rounded-lg resize-none focus:ring-2 focus:ring-primary/20"
              rows="1"
            />
          </div>

          {/* Emoji Seçici */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
              dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Smile className="w-5 h-5" />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-gray-700 
              rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-6 gap-1">
                  {BASIC_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setMessage(prev => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gönder Butonu */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 text-white bg-primary rounded-lg hover:bg-primary-600 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}