"use client";

import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/dashboard/page-transition";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { LottieLoader } from "@/components/ui/lottie-loader";

function DashboardSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LottieLoader size={80} />
    </div>
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
