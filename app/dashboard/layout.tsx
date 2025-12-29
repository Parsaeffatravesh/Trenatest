import { Sidebar } from "@/components/dashboard/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen bg-[#edf2f7] dark:bg-[#020617]" dir="rtl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.12),_transparent_35%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.12),_transparent_35%)]" />
      <Sidebar />
      <main className="relative z-10 flex-1 scroll-smooth p-4 md:p-6 lg:p-8 space-y-4">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
