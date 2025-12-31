"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import animationData from "@/lib/animations/loading.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldHide, setShouldHide] = useState(false);
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
        setTimeout(() => setShouldHide(true), 300);
      });
    };

    const timer = setTimeout(checkReady, 100);
    return () => clearTimeout(timer);
  }, [isMounted]);

  return (
    <>
      {!shouldHide && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] transition-opacity duration-300"
          style={{ opacity: isLoading ? 1 : 0 }}
        >
          <div className="flex flex-col items-center gap-4">
            {isMounted ? (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-sky-400 via-sky-500 to-purple-500 shadow-lg shadow-sky-500/30 animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.25s ease-out" }}>
        {children}
      </div>
    </>
  );
}
