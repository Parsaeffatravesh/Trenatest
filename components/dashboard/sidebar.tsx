"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "داشبورد", icon: LayoutDashboard, href: "/dashboard" },
  { name: "مسابقات", icon: Trophy, href: "/dashboard/competitions" },
  { name: "تاریخچه ترید", icon: History, href: "/dashboard/history" },
  { name: "پروفایل", icon: User, href: "/dashboard/profile" },
  { name: "تنظیمات", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="relative h-screen bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 flex flex-col transition-colors"
      dir="rtl"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-10 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 shadow-sm hover:bg-neutral-50"
      >
        {isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <div className="flex h-20 items-center px-6">
        <div className="h-8 w-8 rounded-lg bg-emerald-500 flex-shrink-0" />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mr-3 font-bold text-lg whitespace-nowrap"
            >
              ترید پنل
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 space-y-2 px-3 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 transition-all group",
              isCollapsed && "justify-center"
            )}
          >
            <item.icon size={22} className="flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="mr-3 font-medium text-sm whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
        <button className="flex w-full items-center p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-neutral-500 hover:text-red-500 transition-colors">
          <LogOut size={22} />
          {!isCollapsed && <span className="mr-3 text-sm font-medium">خروج</span>}
        </button>
      </div>
    </motion.div>
  );
}
