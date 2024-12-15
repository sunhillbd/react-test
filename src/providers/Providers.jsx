"use client";
// import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    // <SessionProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
    // </SessionProvider>
  );
}
