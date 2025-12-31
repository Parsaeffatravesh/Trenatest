"use client";

import { useState, useCallback, memo, useEffect } from "react";
import { LayoutDashboard, Trophy, ChevronLeft, ChevronRight, LogOut, User, SwatchBook } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const MenuItem = memo(function MenuItem({ 
  item, 
  isActive, 
  isCollapsed,
  isRtl,
  onClick,
  isOptimistic,
}: { 
  item: { name: string; icon: React.ElementType; href: string }; 
  isActive: boolean; 
  isCollapsed: boolean;
  isRtl: boolean;
  onClick: () => void;
  isOptimistic: boolean;
}) {
  return (
    <Link
      href={item.href}
      prefetch={true}
      onClick={onClick}
      style={{ fontFamily: 'var(--font-dana), sans-serif' }}
      className={cn(
        "w-full flex items-center p-3 rounded-xl transition-all duration-300 group relative overflow-hidden font-dana",
        isActive
          ? cn(
              "bg-gradient-to-l from-sky-500/20 to-sky-500/5 text-sky-300 border border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]",
              isOptimistic && "opacity-40 grayscale-[0.5] border-sky-500/10 shadow-none scale-[0.98]"
            )
          : "text-slate-400 hover:bg-white/5 hover:text-sky-300 active:scale-[0.98]"
      )}
    >
      <item.icon size={22} className="flex-shrink-0 z-10" />
      <span 
        style={{ fontFamily: 'var(--font-dana), sans-serif' }}
        className={cn(
          "font-medium text-sm whitespace-nowrap z-10 transition-opacity duration-150 font-dana",
          isRtl ? "mr-4" : "ml-4",
          isCollapsed ? "opacity-0 w-0" : "opacity-100"
        )}
      >
        {item.name}
      </span>
    </Link>
  );
});

export const Sidebar = memo(function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const [optimisticPath, setOptimisticPath] = useState<string | null>(null);
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  useEffect(() => {
    setOptimisticPath(null);
  }, [pathname]);

  const currentPath = optimisticPath || pathname;

  const menuItems = [
    { name: t.nav.dashboard, icon: LayoutDashboard, href: "/dashboard" },
    { name: t.nav.allCompetitions, icon: SwatchBook, href: "/dashboard/competitions" },
    { name: t.nav.myCompetitions, icon: Trophy, href: "/dashboard/my-competitions" },
    { name: t.nav.profile, icon: User, href: "/dashboard/profile" },
  ];

  return (
    <div
      className={cn(
        "hidden lg:flex sticky top-0 h-screen bg-[#0b1224]/95 flex-col z-50 shadow-[0_0_30px_rgba(2,6,23,0.5)] transition-[width] duration-300 ease-out font-dana",
        isRtl ? "border-l border-white/10" : "border-r border-white/10",
        isCollapsed ? "w-20" : "w-[260px]"
      )}
      dir={dir}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute top-10 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#0b1224] text-slate-200 shadow-sm hover:scale-110 transition-transform",
          isRtl ? "-left-3" : "-right-3"
        )}
      >
        {isCollapsed 
          ? (isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />)
          : (isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />)
        }
      </button>

      <div className={cn(
        "flex h-24 items-center px-6 border-b border-white/10",
        isRtl ? "bg-gradient-to-r from-white/5 to-transparent" : "bg-gradient-to-l from-white/5 to-transparent"
      )}>
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-400 via-sky-500 to-purple-500 flex-shrink-0 shadow-lg shadow-sky-500/30" />
        <div 
          className={cn(
            "overflow-hidden transition-all duration-200",
            isRtl ? "mr-4" : "ml-4",
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          <h1 className="font-bold text-lg text-white whitespace-nowrap">{t.brand.name}</h1>
          <p className="text-xs text-slate-400 whitespace-nowrap">{t.brand.subtitle}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-3 mt-6">
        {menuItems.map((item) => {
          const isActuallyActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const isOptimisticallyActive = optimisticPath === item.href;
          const isActive = isActuallyActive || isOptimisticallyActive;
          
          return (
            <MenuItem
              key={item.href}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
              isRtl={isRtl}
              onClick={() => setOptimisticPath(item.href)}
              isOptimistic={isOptimisticallyActive && !isActuallyActive}
            />
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex w-full items-center justify-center p-3 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all active:scale-[0.98]">
          <LogOut size={20} />
          <span className={cn(
            "text-sm font-medium transition-opacity duration-150",
            isRtl ? "mr-3" : "ml-3",
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            {t.nav.logout}
          </span>
        </button>
      </div>
    </div>
  );
});
