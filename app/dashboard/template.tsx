"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PageTransition } from "@/components/dashboard/page-transition";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

function DashboardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-white/5 rounded-lg animate-pulse" />
    </motion.div>
  );
}

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        <Suspense fallback={<DashboardSkeleton />}>
          {children}
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}
