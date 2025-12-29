"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkReady = () => {
      requestAnimationFrame(() => {
        setIsLoading(false);
      });
    };

    const timer = setTimeout(checkReady, 100);
    return () => clearTimeout(timer);
  }, [isMounted]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-sky-400 via-sky-500 to-purple-500 shadow-lg shadow-sky-500/30 animate-pulse" />
                <div className="absolute -inset-4 rounded-3xl bg-sky-500/20 blur-xl animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.25s ease-out" }}>
        {children}
      </div>
    </>
  );
}
