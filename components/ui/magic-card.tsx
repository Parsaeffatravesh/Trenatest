"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as React from "react";

export function MagicCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.18), transparent 40%),
    radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.12), transparent 45%)
  `;

  return (
    <div
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(15,23,42,0.6)] backdrop-blur ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}
