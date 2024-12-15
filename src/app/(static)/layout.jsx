import React from "react";
import Wrapper from "@/components/shared/Wrapper";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/layout/Footer";

export default function StaticLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-white dark:bg-black-primary">
        {children}
      </main>
      <Footer />
    </div>
  );
}