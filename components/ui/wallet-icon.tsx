"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Wallet } from "lucide-react";
import type { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import walletAnimation from "@/lib/animations/wallet.json";

interface WalletIconProps {
  size?: number;
  className?: string;
}

export function WalletIcon({ size = 18, className }: WalletIconProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
      setIsPlaying(true);
    }
  };

  const handleComplete = () => {
    setIsPlaying(false);
  };

  return (
    <div 
      className={className} 
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={walletAnimation}
        loop={false}
        autoplay={false}
        onComplete={handleComplete}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export function WalletIconStatic({ size = 18, className }: WalletIconProps) {
  return <Wallet size={size} className={className} />;
}