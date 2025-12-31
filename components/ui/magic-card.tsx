"use client";

import * as React from "react";

export const MagicCard = React.memo(function MagicCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string 
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
      rafRef.current = 0;
    });
  }, [isMobile]);

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      {...(!isMobile && { onMouseMove: handleMouseMove })}
      className={`magic-card group relative overflow-hidden rounded-xl border border-white/10 bg-[#0f172a]/90 p-6 shadow-[0_0_30px_rgba(15,23,42,0.5)] ${className}`}
    >
      {!isMobile && (
        <div className="magic-card-glow pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      {children}
    </div>
  );
});
