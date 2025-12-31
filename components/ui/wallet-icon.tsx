"use client";

import dynamic from "next/dynamic";
import { Wallet } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import walletAnimation from "@/lib/animations/wallet.json";

interface WalletIconProps {
  size?: number;
  className?: string;
}

export function WalletIcon({ size = 18, className }: WalletIconProps) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <Lottie
        animationData={walletAnimation}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export function WalletIconStatic({ size = 18, className }: WalletIconProps) {
  return <Wallet size={size} className={className} />;
}