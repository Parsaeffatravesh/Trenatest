"use client";

import { useState, useCallback, memo } from "react";
import { LayoutDashboard, Trophy, ChevronLeft, ChevronRight, LogOut, User, SwatchBook } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "داشبورد", icon: LayoutDashboard, href: "/dashboard" },
  { name: "تمام مسابقات", icon: SwatchBook, href: "/dashboard/competitions" },
  { name: "مسابقات من", icon: Trophy, href: "/dashboard/my-competitions" },
  { name: "پروفایل", icon: User, href: "/dashboard/profile" },
];

const MenuItem = memo(function MenuItem({ 
  item, 
  isActive, 
  isCollapsed,
  onHover 
}: { 
  item: typeof menuItems[0]; 
  isActive: boolean; 
  isCollapsed: boolean;
  onHover: (href: string) => void;
}) {
  return (
    <Link
      href={item.href}
      prefetch={false}
      onMouseEnter={() => onHover(item.href)}
      className={cn(
        "flex items-center p-3 rounded-2xl transition-colors group relative overflow-hidden",
        isActive
          ? "bg-sky-500/10 text-sky-300"
          : "text-slate-400 hover:bg-white/5 hover:text-sky-300"
      )}
    >
      <item.icon size={22} className="flex-shrink-0 z-10" />
      <span 
        className={cn(
          "mr-4 font-medium text-sm whitespace-nowrap z-10 transition-opacity duration-150",
          isCollapsed ? "opacity-0 w-0" : "opacity-100"
        )}
      >
        {item.name}
      </span>
      {!isCollapsed && isActive && (
        <div className="absolute inset-0 bg-sky-500/10 rounded-2xl" />
      )}
    </Link>
  );
});

export const Sidebar = memo(function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handlePrefetch = useCallback((href: string) => {
    router.prefetch(href);
  }, [router]);

  return (
    <div
      className={cn(
        "hidden lg:flex relative h-screen bg-[#0b1224]/70 border-l border-white/10 flex-col z-50 shadow-[0_0_40px_rgba(2,6,23,0.6)] backdrop-blur transition-[width] duration-300 ease-out",
        isCollapsed ? "w-20" : "w-[260px]"
      )}
      dir="rtl"
      style={{ fontFamily: "var(--font-dana)" }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-10 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#0b1224] text-slate-200 shadow-sm hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="flex h-24 items-center px-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-400 via-sky-500 to-purple-500 flex-shrink-0 shadow-lg shadow-sky-500/30" />
        <div 
          className={cn(
            "mr-4 overflow-hidden transition-all duration-200",
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          <h1 className="font-bold text-lg text-white whitespace-nowrap">ترید پنل</h1>
          <p className="text-xs text-slate-400 whitespace-nowrap">Smart Capital Lab</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-3 mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <MenuItem
              key={item.name}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
              onHover={handlePrefetch}
            />
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex w-full items-center justify-center p-3 rounded-2xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all">
          <LogOut size={20} />
          <span className={cn(
            "mr-3 text-sm font-medium transition-opacity duration-150",
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            خروج از حساب
          </span>
        </button>
      </div>
    </div>
  );
});
