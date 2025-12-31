"use client";

import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/dashboard/page-transition";

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}
