"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 4
  },
  enter: { 
    opacity: 1, 
    y: 0
  },
  exit: { 
    opacity: 0, 
    y: -4
  },
};

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={{ ease: "easeOut", duration: 0.08, type: "tween" }}
      style={{ 
        willChange: "opacity, transform",
        backfaceVisibility: "hidden",
        perspective: 1000
      }}
    >
      {children}
    </motion.div>
  );
}
