import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function ChatHeader({ chat, onDeleteChat, onBlockUser, onReportUser }) {
  const [showMenu, setShowMenu] = useState(false);
  const { toast } = useToast();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteChat = () => {
    toast({
      title: "Dikkat!",
      description: "Bu sohbeti silmek istediğinizden emin misiniz?",
      variant: "destructive",
      duration: 5000,
      action: (
        <ToastAction altText="Sil" onClick={() => {
          onDeleteChat(chat.id);
          toast({
            title: "Başarılı",
            description: "Sohbet silindi.",
            duration: 3000
          });
        }}>
          Sil
        </ToastAction>
      )
    });
  };

  const handleBlockUser = () => {
    toast({
      title: "Dikkat!",
      description: `${chat.businessName} engellemek istediğinizden emin misiniz?`,
      variant: "destructive",
      duration: 5000,
      action: (
        <ToastAction altText="Engelle" onClick={() => {
          onBlockUser(chat.id);
          toast({
            title: "Başarılı",
            description: "Kullanıcı engellendi.",
            duration: 3000
          });
        }}>
          Engelle
        </ToastAction>
      )
    });
  };

  const handleReportUser = () => {
    toast({
      title: "Dikkat!",
      description: `${chat.businessName} şikayet etmek istediğinizden emin misiniz?`,
      variant: "destructive",
      duration: 5000,
      action: (
        <ToastAction altText="Şikayet Et" onClick={() => {
          onReportUser(chat.id);
          toast({
            title: "Başarılı",
            description: "Şikayetiniz alındı.",
            duration: 3000
          });
        }}>
          Şikayet Et
        </ToastAction>
      )
    });
  };

  return (
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 
    bg-white dark:bg-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={chat.businessLogo}
          alt={chat.businessName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {chat.businessName}
          </h4>
          <p className="text-xs text-green-500">Çevrimiçi</p>
        </div>
      </div>
      
      <div className="relative" ref={menuRef}>
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 
          rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
            <button 
              onClick={() => {
                handleDeleteChat();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
              hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sohbeti Sil
            </button>
            <button 
              onClick={() => {
                handleBlockUser();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
              hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Engelle
            </button>
            <button 
              onClick={() => {
                handleReportUser();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-500 
              hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Şikayet Et
            </button>
          </div>
        )}
      </div>
    </div>
  );
}