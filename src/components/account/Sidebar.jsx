"use client";
import {
  User,
  Settings,
  MessageSquare,
  Bell,
  Star,
  Shield,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";
import logout from "@/services/logout";

const menuItems = [
  {
    title: "Profilim",
    icon: User,
    href: "/account",
  },
  {
    title: "Yorumlarım",
    icon: MessageSquare,
    href: "/account/comments",
    badge: "12",
  },
  {
    title: "Bildirimlerim",
    icon: Bell,
    href: "/account/notifications",
    badge: "3",
  },
  {
    title: "Beğendiklerim",
    icon: Star,
    href: "/account/likes",
  },
  {
    title: "Takip Ettiklerim",
    icon: Shield,
    href: "/account/following",
    badge: "5",
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/account/settings",
  },
  {
    title: "Mesajlarım",
    icon: MessageSquare,
    href: "/account/messages",
  },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(router);
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  return (
    <aside
      className="w-full lg:w-80 lg:flex-shrink-0 border-b lg:border-b-0 lg:border-r 
    border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Profil Kartı */}
      <div className="bg-white dark:bg-black-primary p-6 rounded-2xl shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-6 overflow-hidden">
          {user?.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 object-cover rounded-full"
            />
          )}

          <div>
            <h2 className="font-semibold text-black-primary dark:text-white">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <div>
            <div className="text-2xl font-bold text-primary">
              {user?.commentsCount || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Yorum
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {user?.followingCount || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Takip
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="bg-white dark:bg-black-primary p-4 rounded-2xl shadow-sm space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Çıkış Yap</span>
        </button>
      </nav>
    </aside>
  );
}
