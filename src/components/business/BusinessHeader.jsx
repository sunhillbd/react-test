"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  User,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import logout from "@/services/logout";
import { useUser } from "@/services/User";

export default function BusinessHeader() {
  const router = useRouter();
  const { theme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, getUser } = useUser();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (!user) {
    return (
      <header className="h-16 border-b border-gray-200 dark:border-gray-700 
      bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="h-full px-4 flex items-center justify-between">
          <Link href="/business" className="flex items-center gap-2">
            <Image
              src={theme === "dark" ? "/assets/logo-dark.svg" : "/assets/logo.svg"}
              alt="Logo"
              width={120}
              height={120}
            />
          </Link>
        </div>
      </header>
    );
  }

  const notifications = [
    {
      id: 1,
      title: "Yeni Sipariş",
      message: "Yeni bir sipariş alındı #1234",
      time: "5 dk önce",
      unread: true,
    },
    {
      id: 2,
      title: "Yeni Mesaj",
      message: "Müşteri mesajı: Ürün hakkında bilgi",
      time: "1 saat önce",
      unread: true,
    },
    {
      id: 3,
      title: "Stok Uyarısı",
      message: "Ürün X stok seviyesi düşük",
      time: "2 saat önce",
      unread: false,
    },
  ];

  return (
    <header
      className="h-16 border-b border-gray-200 dark:border-gray-700 
    bg-white dark:bg-gray-800 transition-colors duration-200"
    >
      <div className="h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/business" className="flex items-center gap-2">
          <Image
            src={
              theme === "dark" ? "/assets/logo-dark.svg" : "/assets/logo.svg"
            }
            alt="Logo"
            width={120}
            height={120}
          />
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            Marka Paneli
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
              dark:hover:bg-gray-700 rounded-lg relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 
              rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
              >
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Bildirimler
                    </h3>
                    <Link
                      href="/business/notifications"
                      className="text-xs text-primary hover:text-primary-600"
                    >
                      Tümünü Gör
                    </Link>
                  </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={`/business/notifications/${notification.id}`}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <span className="w-2 h-2 mt-2 bg-primary rounded-full" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {user.avatar ? (
                <Image 
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-medium">{user.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showProfileMenu && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 
              rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
              >
                <Link
                  href="/business/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 
                  dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <UserCircle className="w-4 h-4" />
                  Profil
                </Link>
                <Link
                  href="/business/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 
                  dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4" />
                  Ayarlar
                </Link>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 
                  hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
