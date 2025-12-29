"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, User } from "lucide-react";

const navItems = [
  { label: "داشبورد", href: "/dashboard", icon: LayoutDashboard },
  { label: "مسابقات", href: "/dashboard/competitions", icon: Trophy },
  { label: "مسابقات من", href: "/dashboard/my-competitions", icon: Trophy },
  { label: "پروفایل", href: "/dashboard/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 lg:hidden" dir="rtl">
      <nav className="flex items-center justify-between rounded-3xl border border-white/60 bg-white/80 p-2 text-xs font-semibold text-neutral-600 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b1224]/80 dark:text-neutral-200">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-underline"
                  className="absolute inset-x-2 -bottom-1 h-1 rounded-full bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 drop-shadow"
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
              )}
              <item.icon
                size={22}
                className={`transition-colors ${
                  isActive ? "text-sky-600 dark:text-sky-400" : "text-neutral-500 dark:text-neutral-400"
                }`}
              />
              <span className={isActive ? "text-neutral-800 dark:text-white" : undefined}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
