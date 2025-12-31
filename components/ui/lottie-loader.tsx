"use client";

import { CSSProperties } from "react";
import Lottie from "lottie-react";
import loadingData from "@/public/loading-icon.json";

interface LottieLoaderProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function LottieLoader({ size = 80, className = "", style }: LottieLoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={style}>
      <div style={{ width: size, height: size }}>
        <Lottie 
          animationData={loadingData} 
          loop={true} 
          autoplay={true}
        />
      </div>
    </div>
  );
}
