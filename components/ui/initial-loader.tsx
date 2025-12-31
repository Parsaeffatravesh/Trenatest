"use client";

import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "@/lib/animations/loading.json";

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldHide, setShouldHide] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHydrated(true);
    
    const checkReady = () => {
      requestAnimationFrame(() => {
        setIsLoading(false);
        setTimeout(() => setShouldHide(true), 300);
      });
    };

    const timer = setTimeout(checkReady, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!shouldHide && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] transition-opacity duration-300"
          style={{ opacity: isLoading ? 1 : 0 }}
        >
          {isHydrated ? (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <div className="flex items-end gap-1.5 h-16">
              <div className="w-4 bg-sky-400 rounded-sm animate-bar-1" />
              <div className="w-4 bg-sky-400 rounded-sm animate-bar-2" />
              <div className="w-4 bg-purple-400 rounded-sm animate-bar-3" />
            </div>
          )}
        </div>
      )}
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.25s ease-out" }}>
        {children}
      </div>
    </>
  );
}
