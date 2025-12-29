"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Trophy,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";

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
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className="relative h-screen bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 flex flex-col z-50 shadow-xl"
      dir="rtl"
    >
      {/* Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-10 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 shadow-sm hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo */}
      <div className="flex h-24 items-center px-6 border-b border-neutral-100 dark:border-neutral-800/50">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-500 flex-shrink-0 shadow-lg shadow-emerald-500/20" />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mr-4 overflow-hidden"
            >
              <h1 className="font-bold text-lg text-neutral-800 dark:text-white whitespace-nowrap">
                ترید پنل
              </h1>
              <p className="text-xs text-neutral-400 whitespace-nowrap">
                مدیریت سرمایه هوشمند
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 px-3 mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center p-3 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group relative overflow-hidden"
          >
            <item.icon size={22} className="flex-shrink-0 z-10" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="mr-4 font-medium text-sm whitespace-nowrap z-10"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>

            {!isCollapsed && (
              <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <button className="flex w-full items-center justify-center p-3 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all">
          <LogOut size={20} />
          {!isCollapsed && <span className="mr-3 text-sm font-medium">خروج از حساب</span>}
        </button>
      </div>
    </motion.div>
  );
}
