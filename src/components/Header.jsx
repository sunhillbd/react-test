"use client";
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

export default function Header() {
  const { theme } = useTheme();
  
  return (
    <header>
      <Image 
        src={theme === 'dark' ? "/assets/main-logo-dark.svg" : "/assets/main-logo.svg"}
        alt="Logo"
        width={120}
        height={40}
      />
      {/* ... diğer header içeriği ... */}
    </header>
  );
}