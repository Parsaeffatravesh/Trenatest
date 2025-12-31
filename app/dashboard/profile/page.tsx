"use client";

import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Wallet, ShieldCheck, Copy, ArrowUpRight, Check, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function ProfilePage() {
  const [isCopied, setIsCopied] = useState(false);
  const { t, locale, setLocale, dir } = useI18n();
  const walletAddress = "TYv1G7p9mR4v8qZ...3x8L2mNpR4";

  const handleCopy = async () => {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(walletAddress);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4" dir={dir}>
      <FadeIn>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">{t.profile.title}</h1>
      </FadeIn>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        <div className="lg:col-span-5 space-y-4">
          <FadeIn>
            <div className="relative overflow-hidden rounded-xl bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.7),_transparent_45%),linear-gradient(135deg,#1d4ed8,#6d28d9)] p-5 text-white shadow-2xl aspect-[1.7/1] w-full">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center gap-3">
                  <Wallet size={22} className="opacity-90" />
                  <span className="text-[9px] font-bold tracking-widest bg-white/20 px-2 py-1 rounded">
                    MAIN WALLET
                  </span>
                </div>
                <div className={locale === "fa" ? "text-right" : "text-left"}>
                  <p className="text-[10px] opacity-70 mb-1">Available Balance</p>
                  <h2 className="text-2xl sm:text-3xl font-black">{locale === "fa" ? "$12,450.00" : "$12,450.00"}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs font-mono tracking-[0.18em]">**** 4290</p>
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <MagicCard className="p-4 flex items-center justify-between border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <ShieldCheck size={18} />
                </div>
                <div className={locale === "fa" ? "text-right" : "text-left"}>
                  <p className="text-xs sm:text-sm font-bold text-white">{locale === "fa" ? "احراز هویت" : "Verification"}</p>
                  <p className="text-[10px] text-slate-500">{locale === "fa" ? "سطح تایید شده 2" : "Level 2 Verified"}</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-bold uppercase shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                Verified
              </span>
            </MagicCard>
          </FadeIn>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <FadeIn delay={0.15}>
            <MagicCard className="border-white/10 p-5">
              <h3 className="text-base font-bold text-white mb-4">{t.profile.personalInfo}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoItem label={t.profile.firstName} value="MOHAMMAD" dir={dir} />
                <InfoItem label={t.profile.email} value="mohammad@trade.io" dir={dir} />
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                <p className={`text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest ${locale === "fa" ? "text-right" : "text-left"}`}>
                  {locale === "fa" ? "آدرس ولت (TRC-20)" : "Wallet Address (TRC-20)"}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/5 group">
                  <code className={`text-[10px] sm:text-xs text-sky-400 break-all flex-1 text-center ${locale === "fa" ? "sm:text-right" : "sm:text-left"}`}>{walletAddress}</code>
                  <button
                    className={`p-2 rounded-lg transition-all w-full sm:w-auto flex justify-center items-center gap-2 text-xs font-bold ${
                      isCopied ? "bg-emerald-500/20 text-emerald-300 scale-105" : "text-slate-300 hover:text-white bg-white/5"
                    }`}
                    onClick={handleCopy}
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </MagicCard>
          </FadeIn>

          <FadeIn delay={0.2}>
            <MagicCard className="border-white/10 p-5">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={18} className="text-sky-400" />
                <h3 className="text-base font-bold text-white">{t.profile.settings}</h3>
              </div>

              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 ${locale === "fa" ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm font-medium text-white">{t.profile.language}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLocale("fa")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        locale === "fa"
                          ? "bg-sky-500 text-black shadow-lg shadow-sky-500/30"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {t.profile.persian}
                    </button>
                    <button
                      onClick={() => setLocale("en")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        locale === "en"
                          ? "bg-sky-500 text-black shadow-lg shadow-sky-500/30"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {t.profile.english}
                    </button>
                  </div>
                </div>
              </div>
            </MagicCard>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, dir }: { label: string; value: string; dir: "rtl" | "ltr" }) {
  return (
    <div className={`space-y-1 ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
      <div className="bg-white/5 px-3 py-2.5 rounded-lg border border-white/5 text-sm text-neutral-200">
        {value}
      </div>
    </div>
  );
}
