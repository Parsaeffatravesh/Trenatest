"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { InitialLoader } from "@/components/ui/initial-loader";
import { useI18n } from "@/lib/i18n";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { dir } = useI18n();
  
  return (
    <InitialLoader>
      <div className="relative flex min-h-screen bg-[#020617]" dir={dir}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_40%),_radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),_transparent_38%)]" />
        <Sidebar />
        <main className="relative z-10 flex-1 scroll-smooth p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 space-y-4">
          {children}
        </main>
        <BottomNav />
      </div>
    </InitialLoader>
  );
}
