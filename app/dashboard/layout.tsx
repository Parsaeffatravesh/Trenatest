import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F4F6] dark:bg-[#0a0a0a]" dir="rtl">
      <Sidebar />
      <main className="flex-1 overflow-y-auto scroll-smooth p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
