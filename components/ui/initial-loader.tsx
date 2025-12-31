"use client";

import { useState, useEffect, useRef } from "react";

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldHide, setShouldHide] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkReady = () => {
      requestAnimationFrame(() => {
        setIsLoading(false);
        setTimeout(() => setShouldHide(true), 400);
      });
    };

    const timer = setTimeout(checkReady, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!shouldHide && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] transition-opacity duration-400"
          style={{ opacity: isLoading ? 1 : 0 }}
        >
          <div className="loading-container">
            <div className="loading-bars">
              <div className="loading-bar" />
              <div className="loading-bar" />
              <div className="loading-bar" />
              <div className="loading-bar" />
            </div>
            <div className="loading-glow" />
          </div>
        </div>
      )}
      <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s ease-out" }}>
        {children}
      </div>
    </>
  );
}
