"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    menuItems.forEach((item) => router.prefetch(item.href));
  }, [router]);

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className="relative h-screen bg-[#0b1224]/70 border-l border-white/10 flex flex-col z-50 shadow-[0_0_40px_rgba(2,6,23,0.6)] backdrop-blur"
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
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mr-4 overflow-hidden"
            >
              <h1 className="font-bold text-lg text-white whitespace-nowrap">ترید پنل</h1>
              <p className="text-xs text-slate-400 whitespace-nowrap">Smart Capital Lab</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 space-y-2 px-3 mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              prefetch
              className={cn(
                "flex items-center p-3 rounded-2xl transition-all group relative overflow-hidden",
                isActive
                  ? "bg-sky-500/10 text-sky-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-sky-300"
              )}
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

              {!isCollapsed && isActive && (
                <div className="absolute inset-0 bg-sky-500/10 opacity-100 transition-opacity rounded-2xl" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex w-full items-center justify-center p-3 rounded-2xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all">
          <LogOut size={20} />
          {!isCollapsed && <span className="mr-3 text-sm font-medium">خروج از حساب</span>}
        </button>
      </div>
    </motion.div>
  );
}
