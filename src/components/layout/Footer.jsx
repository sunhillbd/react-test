"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from 'next-themes';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Link href="/">
                <Image
                  priority
                  src={
                    theme === "dark"
                      ? "/assets/main-logo-dark.svg"
                      : "/assets/main-logo.svg"
                  }
                  alt="Logo"
                  width={152}
                  height={40}
                  className="cursor-pointer"
                />
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Müşteri deneyimlerini iyileştirmek için markaları ve kullanıcıları bir araya getiriyoruz.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-3">
              {[
                { text: 'Hakkımızda', href: '/about' },
                { text: 'Kariyer', href: '/careers' },
                { text: 'Blog', href: '/blog' },
                { text: 'Yardım Merkezi', href: '/help' }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Hizmetlerimiz
            </h3>
            <ul className="space-y-3">
              {[
                { text: 'Bireysel Üyelik', href: '/membership' },
                { text: 'Kurumsal Üyelik', href: '/corporate' },
                { text: 'Reklam Çözümleri', href: '/advertising' },
                { text: 'İş Birlikleri', href: '/partnerships' }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  Şişli/İstanbul
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a 
                  href="mailto:info@yorumlar.co"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  info@yorumlar.co
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a 
                  href="tel:+902121234567"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  +90 544 590 4141
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} ŞikayetVar. Tüm hakları saklıdır.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap space-x-8">
                {[
                  { text: 'Gizlilik Politikası', href: '/privacy' },
                  { text: 'Kullanım Koşulları', href: '/terms' },
                  { text: 'KVKK', href: '/kvkk' },
                  { text: 'Çerez Politikası', href: '/cookies' }
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
