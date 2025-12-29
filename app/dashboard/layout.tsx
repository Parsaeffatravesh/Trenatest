import { Sidebar } from "@/components/dashboard/sidebar";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { InitialLoader } from "@/components/ui/initial-loader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <InitialLoader>
      <div className="relative flex min-h-screen bg-[#020617]" dir="rtl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_40%),_radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),_transparent_38%)]" />
        <Sidebar />
        <main className="relative z-10 flex-1 scroll-smooth p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 space-y-4">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          {children}
        </main>
        <BottomNav />
      </div>
    </InitialLoader>
  );
}
