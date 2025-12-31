"use client";

import { memo } from "react";
import { LayoutDashboard, Trophy, SwatchBook, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const NavItem = memo(function NavItem({ 
  item, 
  isActive
}: { 
  item: { name: string; icon: React.ElementType; href: string }; 
  isActive: boolean;
}) {
  return (
    <Link
      href={item.href}
      prefetch={true}
      className="relative flex flex-col items-center gap-1 active:scale-90 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group"
    >
      <div
        className={cn(
          "p-2 rounded-xl transition-all duration-300 ease-out will-change-transform",
          isActive ? "text-sky-300 bg-sky-500/15 scale-110 shadow-lg shadow-sky-500/10" : "text-slate-400 group-hover:text-slate-200"
        )}
      >
        <item.icon size={20} className={cn("transition-transform duration-300", isActive && "scale-110")} />
      </div>
      <span className={cn("text-[10px] font-medium transition-colors duration-300", isActive ? "text-sky-300" : "text-slate-400")}>
        {item.name}
      </span>
      {isActive && (
        <div className="absolute -top-3 w-8 h-1 bg-sky-400 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-in fade-in zoom-in duration-500" />
      )}
    </Link>
  );
});

export const BottomNav = memo(function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { name: t.nav.dashboard, icon: LayoutDashboard, href: "/dashboard" },
    { name: t.nav.allCompetitions, icon: SwatchBook, href: "/dashboard/competitions" },
    { name: t.nav.myCompetitions, icon: Trophy, href: "/dashboard/my-competitions" },
    { name: t.nav.profile, icon: User, href: "/dashboard/profile" },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b1224]/95 backdrop-blur-md border-t border-white/10 px-6 py-3 pb-safe-offset"
    >
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <NavItem
              key={item.href}
              item={item}
              isActive={isActive}
            />
          );
        })}
      </div>
    </nav>
  );
});
