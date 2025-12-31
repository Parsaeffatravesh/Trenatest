"use client";

import dynamic from "next/dynamic";
import { CSSProperties } from "react";

import animationData from "@/lib/animations/loading.json";

const Lottie = dynamic(() => import("lottie-react"), { 
  ssr: false,
  loading: () => <BarChartFallback />
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

function BarChartFallback() {
  return (
    <div className="flex items-end gap-1.5 h-16">
      <div className="w-4 bg-sky-400 rounded-sm animate-bar-1" />
      <div className="w-4 bg-sky-400 rounded-sm animate-bar-2" />
      <div className="w-4 bg-purple-400 rounded-sm animate-bar-3" />
    </div>
  );
}
