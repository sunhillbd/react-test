"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ReviewsNav() {
  const pathname = usePathname();

  const links = [
    { href: '/business/reviews/list', label: 'Tüm Yorumlar' },
    { href: '/business/reviews/pending', label: 'Yanıt Bekleyenler' },
    { href: '/business/reviews/reports', label: 'Raporlananlar' }
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-8">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`py-4 px-1 border-b-2 text-sm font-medium
                ${isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}