"use client";

import dynamic from "next/dynamic";
import { CSSProperties } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import animationData from "@/lib/animations/loading.json";

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
