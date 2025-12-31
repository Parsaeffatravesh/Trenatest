"use client";

import { CSSProperties } from "react";

interface LottieLoaderProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function LottieLoader({ size = 80, className = "", style }: LottieLoaderProps) {
  const scale = size / 80;
  
  return (
    <div className={`flex items-center justify-center ${className}`} style={style}>
      <div className="loading-container" style={{ transform: `scale(${scale})` }}>
        <div className="loading-bars">
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
        </div>
        <div className="loading-glow" />
      </div>
    </div>
  );
}
