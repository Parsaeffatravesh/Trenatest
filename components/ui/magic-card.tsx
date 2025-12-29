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
    radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.1), transparent 40%)
  `;

  return (
    <div
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900/50 p-6 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}
