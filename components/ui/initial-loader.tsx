"use client";

import { useState, useEffect, useRef } from "react";
import { LottieLoader } from "./lottie-loader";

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
          <LottieLoader size={100} />
        </div>
      )}
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.25s ease-out" }}>
        {children}
      </div>
    </>
  );
}
