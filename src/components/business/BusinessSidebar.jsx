"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronDown,
  Menu,
  X,
  Bell,
  Users,
  MessagesSquare,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/business",
  },
  {
    title: "Ürünler",
    icon: ShoppingBag,
    href: "/business/products",
    items: [
      { title: "Tüm Ürünler", href: "/business/products" },
      { title: "Kategoriler", href: "/business/products/categories" },
      { title: "Stok Yönetimi", href: "/business/products/inventory" },
    ],
  },
  {
    title: "Ekipler",
    icon: Users,
    href: "/business/teams",
    items: [
      { title: "Tüm Üyeler", href: "/business/teams" },
      { title: "Roller", href: "/business/teams/roles" },
      { title: "İzinler", href: "/business/teams/permissions" },
    ],
  },
  {
    title: "Yorumlar",
    icon: MessageSquare,
    href: "/business/reviews",
    items: [
      { title: "Tüm Yorumlar", href: "/business/reviews/list" },
      { title: "Yanıt Bekleyenler", href: "/business/reviews/pending" },
      { title: "Raporlananlar", href: "/business/reviews/reports" },
    ],
  },
  {
    title: "Mesajlar",
    icon: MessagesSquare,
    href: "/business/messages",
    items: [
      { title: "Gelen Kutusu", href: "/business/messages" },
      { title: "Arşiv", href: "/business/messages/archived" },
      { title: "Şablonlar", href: "/business/messages/templates" },
    ],
  },
  {
    title: "Bildirimler",
    icon: Bell,
    href: "/business/notifications",
    items: [
      { title: "Tüm Bildirimler", href: "/business/notifications" },
      { title: "Okunmamış", href: "/business/notifications?filter=unread" },
      {
        title: "Değerlendirmeler",
        href: "/business/notifications?filter=review",
      },
      { title: "Yorumlar", href: "/business/notifications?filter=comment" },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/business/analytics",
    items: [
      { title: "Genel Bakış", href: "/business/analytics" },
      { title: "Ürün Analizleri", href: "/business/analytics/products" },
      { title: "Yorum Analizleri", href: "/business/analytics/reviews" },
    ],
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/business/settings",
  },
];

export default function BusinessSidebar() {
  // const { data: session } = useSession();
  const businessName = "İşletme Paneli";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const pathname = usePathname();

  const toggleExpand = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (href) => pathname === href;
  const isParentActive = (item) => {
    if (item.items) {
      return item.items.some((subItem) => pathname === subItem.href);
    }
    return false;
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 
        rounded-lg shadow-lg"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white dark:bg-gray-800 border-r border-gray-200 
        dark:border-gray-700 transition-transform duration-200 ease-in-out
      `}
      >
        {/* Logo */}
        <div
          className="h-16 flex items-center justify-center border-b 
        border-gray-200 dark:border-gray-700"
        >
          <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate px-4">
            {businessName}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.items ? (
                // Dropdown Menu
                <div className="space-y-1">
                  <button
                    onClick={() => toggleExpand(item.title)}
                    className={`
                      w-full flex items-center justify-between px-4 py-2 text-sm 
                      font-medium rounded-lg transition-colors
                      ${
                        isParentActive(item) || isActive(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform
                      ${expandedItems[item.title] ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Items */}
                  {expandedItems[item.title] && (
                    <div className="pl-11 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`
                            block px-4 py-2 text-sm font-medium rounded-lg 
                            transition-colors
                            ${
                              isActive(subItem.href)
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }
                          `}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Single Menu Item
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-2 text-sm font-medium 
                    rounded-lg transition-colors
                    ${
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
