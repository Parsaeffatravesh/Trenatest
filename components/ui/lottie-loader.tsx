"use client";

import dynamic from "next/dynamic";
import { CSSProperties } from "react";

import animationData from "@/lib/animations/loading.json";

const Lottie = dynamic(() => import("lottie-react"), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse rounded-lg bg-sky-500/20" style={{ width: 80, height: 80 }} />
  )
});

interface LottieLoaderProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function LottieLoader({ size = 80, className = "", style }: LottieLoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={style}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: size, height: size }}
      />
    </div>
  );
}

export function StaticLoader({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div 
        className="rounded-2xl bg-gradient-to-tr from-sky-400 via-sky-500 to-purple-500 shadow-lg shadow-sky-500/30 animate-pulse"
        style={{ width: size * 0.7, height: size * 0.7 }}
      />
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
