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

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, []);

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`magic-card group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(15,23,42,0.6)] backdrop-blur ${className}`}
    >
      <div className="magic-card-glow pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
});
