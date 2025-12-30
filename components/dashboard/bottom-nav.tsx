"use client";

import { memo, useCallback } from "react";
import { LayoutDashboard, Trophy, SwatchBook, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const NavItem = memo(function NavItem({ 
  item, 
  isActive, 
  onHover 
}: { 
  item: { name: string; icon: React.ElementType; href: string }; 
  isActive: boolean; 
  onHover: (href: string) => void;
}) {
  return (
    <Link 
      href={item.href} 
      prefetch={false} 
      onMouseEnter={() => onHover(item.href)}
      onTouchStart={() => onHover(item.href)}
      className="relative flex flex-col items-center gap-1"
    >
      <div
        className={cn(
          "p-2 rounded-xl transition-colors duration-150",
          isActive ? "text-sky-300 bg-sky-500/10" : "text-slate-400"
        )}
      >
        <item.icon size={20} />
      </div>
      <span className={cn("text-[10px] font-medium", isActive ? "text-sky-300" : "text-slate-400")}>
        {item.name}
      </span>
      {isActive && (
        <div className="absolute -top-3 w-8 h-1 bg-sky-400 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
      )}
    </Link>
  );
});

export const BottomNav = memo(function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();

  const navItems = [
    { name: t.nav.dashboard, icon: LayoutDashboard, href: "/dashboard" },
    { name: t.nav.allCompetitions, icon: SwatchBook, href: "/dashboard/competitions" },
    { name: t.nav.myCompetitions, icon: Trophy, href: "/dashboard/my-competitions" },
    { name: t.nav.profile, icon: User, href: "/dashboard/profile" },
  ];

  const handlePrefetch = useCallback((href: string) => {
    router.prefetch(href);
  }, [router]);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b1224]/90 backdrop-blur-sm border-t border-white/10 px-6 py-3"
    >
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <NavItem
              key={item.href}
              item={item}
              isActive={isActive}
              onHover={handlePrefetch}
            />
          );
        })}
      </div>
    </nav>
  );
});
