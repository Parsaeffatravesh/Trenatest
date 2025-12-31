"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { InitialLoader } from "@/components/ui/initial-loader";
import { useI18n } from "@/lib/i18n";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { dir } = useI18n();
  
  return (
    <InitialLoader>
      <div className="relative flex min-h-screen bg-[#020617]" dir={dir}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_40%),_radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_38%)]" />
        <Sidebar />
        <div className="relative z-10 flex-1 flex flex-col">
          <TopNavbar />
          <main className="flex-1 scroll-smooth p-3 md:p-4 lg:p-6 pb-24 lg:pb-6">
            {children}
          </main>
        </div>
        <BottomNav />
      </div>
    </InitialLoader>
  );
}
