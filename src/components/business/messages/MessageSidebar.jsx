"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Archive, MessageSquare, Settings, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MOCK_CHATS = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    lastMessage: 'Ürün hakkında bilgi alabilir miyim?',
    timestamp: '14:30',
    unread: 2,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    isOnline: true,
    isArchived: false
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    lastMessage: 'Teşekkür ederim, iyi günler!',
    timestamp: '12:45',
    unread: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    isOnline: false,
    isArchived: false
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    lastMessage: 'Sipariş durumum nedir?',
    timestamp: '10:15',
    unread: 1,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    isOnline: true,
    isArchived: true
  }
];

export function MessageSidebar({ selectedChat, onChatSelect }) {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [chats, setChats] = useState(MOCK_CHATS);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  // Filtreleme fonksiyonu
  const getFilteredChats = () => {
    let filtered = chats;

    // Arama filtrelemesi
    if (searchQuery) {
      filtered = filtered.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sekme filtrelemesi
    switch (filter) {
      case 'unread':
        filtered = filtered.filter(chat => chat.unread > 0 && !chat.isArchived);
        break;
      case 'archived':
        filtered = filtered.filter(chat => chat.isArchived);
        break;
      case 'all':
      default:
        filtered = filtered.filter(chat => !chat.isArchived);
        break;
    }

    return filtered;
  };

  // Yeni mesaj başlatma
  const handleNewMessage = () => {
    setShowNewMessageModal(true);
    // Modal komponentini ekleyebilirsiniz
  };

  // Mesaj arşivleme
  const handleArchive = async (chatId) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));

      setChats(prevChats => prevChats.map(chat => 
        chat.id === chatId ? { ...chat, isArchived: true } : chat
      ));

      toast({
        title: "Başarılı",
        description: "Sohbet arşivlendi",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Arşivleme işlemi başarısız oldu",
        variant: "destructive"
      });
    }
  };

  // Mesajı okundu olarak işaretleme
  const handleMarkAsRead = async (chatId) => {
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 500));

      setChats(prevChats => prevChats.map(chat => 
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      ));

      toast({
        title: "Başarılı",
        description: "Mesaj okundu olarak işaretlendi",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem başarısız oldu",
        variant: "destructive"
      });
    }
  };

  // Mesaj ayarlarına gitme
  const handleSettings = () => {
    router.push('/business/messages/settings');
  };

  const filteredChats = getFilteredChats();

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Üst Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mesajlar
          </h2>
          <button
            onClick={handleNewMessage}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
            dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Yeni Mesaj"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Arama */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Mesajlarda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg 
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Filtreler */}
      <div className="flex p-2 gap-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'all', icon: MessageSquare, label: 'Tümü' },
          { id: 'unread', icon: Star, label: 'Okunmamış' },
          { id: 'archived', icon: Archive, label: 'Arşiv' }
        ].map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg 
            text-sm font-medium transition-colors
            ${filter === filterOption.id
              ? 'bg-primary text-white'
              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            <filterOption.icon className="w-4 h-4" />
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Sohbet Listesi */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`relative group cursor-pointer
            ${selectedChat?.id === chat.id ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`}
          >
            <button
              onClick={() => onChatSelect(chat)}
              className="w-full p-4 flex items-start gap-3 hover:bg-gray-50 
              dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                  border-2 border-white dark:border-gray-800 rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {chat.unread > 0 && (
                <span className="flex items-center justify-center w-5 h-5 bg-primary 
                text-white text-xs font-medium rounded-full">
                  {chat.unread}
                </span>
              )}
            </button>

            {/* Hover Actions */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex 
            items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
              {chat.unread > 0 && (
                <button
                  onClick={() => handleMarkAsRead(chat.id)}
                  className="p-1 text-gray-500 hover:text-primary dark:text-gray-400 
                  dark:hover:text-primary rounded-lg"
                  title="Okundu Olarak İşaretle"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              )}
              {!chat.isArchived && (
                <button
                  onClick={() => handleArchive(chat.id)}
                  className="p-1 text-gray-500 hover:text-primary dark:text-gray-400 
                  dark:hover:text-primary rounded-lg"
                  title="Arşivle"
                >
                  <Archive className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredChats.length === 0 && (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Mesaj Bulunamadı
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filter === 'unread' 
                ? 'Okunmamış mesajınız bulunmuyor.'
                : filter === 'archived'
                ? 'Arşivlenmiş mesajınız bulunmuyor.'
                : 'Arama kriterlerinize uygun mesaj bulunamadı.'}
            </p>
          </div>
        )}
      </div>

      {/* Alt Bar - Ayarlar */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSettings}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 
          text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg 
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Mesaj Ayarları
        </button>
      </div>
    </div>
  );
}