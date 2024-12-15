import { Search } from 'lucide-react';
import Image from 'next/image';

export default function ChatList({ 
  chats, 
  selectedChat, 
  setSelectedChat, 
  searchTerm = '', 
  setSearchTerm 
}) {
  // Güvenli arama kontrolü
  const filteredChats = chats.filter(chat => {
    if (!searchTerm) return true; // Arama terimi yoksa tüm sohbetleri göster
    
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = chat?.name?.toLowerCase().includes(searchLower);
    const messageMatch = chat?.lastMessage?.toLowerCase().includes(searchLower);
    
    return nameMatch || messageMatch || false;
  });

  const defaultAvatar = "/assets/avatars/default-avatar.png"; // Varsayılan avatar

  return (
    <div className="flex flex-col h-full">
      {/* Arama kutusu */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Sohbet ara..."
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 dark:bg-gray-900 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 dark:text-white"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Sohbet listesi */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-gray-50 dark:bg-gray-900' : ''
              }`}
            >
              <div className="relative">
                {chat.avatar ? (
                  <Image
                    src={chat.avatar}
                    alt={chat.name || 'Kullanıcı'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      {(chat.name || 'K')[0].toUpperCase()}
                    </span>
                  </div>
                )}
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {chat.name || 'İsimsiz Kullanıcı'}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                    {chat.timestamp || ''}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {chat.lastMessage || 'Henüz mesaj yok'}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Sonuç bulunamadı
          </div>
        )}
      </div>
    </div>
  );
}