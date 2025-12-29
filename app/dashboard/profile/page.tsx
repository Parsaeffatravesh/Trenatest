"use client";

import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Wallet, ShieldCheck, Copy, ArrowUpRight, Check } from "lucide-react";

export default function ProfilePage() {
  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = "TYv1G7p9mR4v8qZ...3x8L2mNpR4";

  const handleCopy = async () => {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(walletAddress);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-5 space-y-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.7),_transparent_45%),linear-gradient(135deg,#1d4ed8,#6d28d9)] p-5 sm:p-8 text-white shadow-2xl aspect-[1.6/1] w-full">
              <div className="relative z-10 flex h-full flex-row flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-start sm:gap-12">
                <div className="flex items-center gap-3">
                  <Wallet size={24} className="opacity-90 sm:h-7 sm:w-7" />
                  <span className="text-[9px] font-bold tracking-widest bg-white/20 px-2 py-1 rounded-md sm:text-[10px]">
                    MAIN WALLET
                  </span>
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-[10px] opacity-70 mb-1 sm:text-xs">Available Balance</p>
                  <h2 className="text-2xl sm:text-4xl font-black">$۱۲,۴۵۰.۰۰</h2>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs font-mono tracking-[0.18em] sm:text-sm">**** 4290</p>
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <ArrowUpRight size={18} className="sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 blur-[60px] rounded-full" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <MagicCard className="p-4 flex items-center justify-between border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-bold text-white">احراز هویت</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">سطح تایید شده ۲</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-bold uppercase shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse">
                Verified
              </span>
            </MagicCard>
          </FadeIn>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <FadeIn delay={0.3}>
            <MagicCard className="border-white/10 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6">اطلاعات کاربری</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InfoItem label="نام نمایشی" value="MOHAMMAD.PRO" />
                <InfoItem label="ایمیل" value="mohammad@trade.io" />
                <InfoItem label="زبان" value="فارسی (IR)" />
                <InfoItem label="منطقه زمانی" value="UTC +3:30" />
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-3 tracking-widest text-right">آدرس ولت (TRC-20)</p>
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-black/40 p-3 sm:p-4 rounded-2xl border border-white/5 group">
                  <code className="text-[10px] sm:text-xs text-sky-400 break-all flex-1 text-center sm:text-right">{walletAddress}</code>
                  <button
                    className={`p-2 rounded-xl transition-all w-full sm:w-auto flex justify-center items-center gap-2 text-xs font-bold ${
                      isCopied ? "bg-emerald-500/20 text-emerald-300 scale-105" : "text-slate-300 hover:text-white bg-white/5"
                    }`}
                    onClick={handleCopy}
                  >
                    {isCopied ? <Check size={16} /> : <Copy size={16} />}
                    {isCopied ? "Copied" : "Copy Address"}
                  </button>
                </div>
              </div>
            </MagicCard>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5 text-right">
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
      <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/5 text-sm text-neutral-200">
        {value}
      </div>
    </div>
  );
}
