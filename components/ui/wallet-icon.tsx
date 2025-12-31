"use client";

import { Wallet } from "lucide-react";

interface WalletIconProps {
  size?: number;
  className?: string;
}

export function WalletIcon({ size = 18, className }: WalletIconProps) {
  return (
    <Wallet 
      size={size} 
      className={`${className} transition-transform duration-200 group-hover:scale-110`}
    />
  );
}