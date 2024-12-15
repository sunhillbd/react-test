"use client";
import BusinessSidebar from "@/components/business/BusinessSidebar";
import BusinessHeader from "@/components/business/BusinessHeader";

export default function PanelLayout({ children }) {
  return (
    <div className="min-h-screen">
      <BusinessHeader />
      <div className="flex min-h-[calc(100vh-64px)]">
        <BusinessSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}