"use client";

import { memo, useCallback } from "react";
import { LayoutDashboard, Trophy, SwatchBook, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "داشبورد", icon: LayoutDashboard, href: "/dashboard" },
  { name: "تمام مسابقات", icon: SwatchBook, href: "/dashboard/competitions" },
  { name: "مسابقات من", icon: Trophy, href: "/dashboard/my-competitions" },
  { name: "پروفایل", icon: User, href: "/dashboard/profile" },
];

const NavItem = memo(function NavItem({ 
  item, 
  isActive, 
  onHover 
}: { 
  item: typeof navItems[0]; 
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

  const handlePrefetch = useCallback((href: string) => {
    router.prefetch(href);
  }, [router]);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b1224]/90 backdrop-blur-sm border-t border-white/10 px-6 py-3"
      style={{ fontFamily: "var(--font-dana)" }}
    >
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <NavItem
              key={item.name}
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
