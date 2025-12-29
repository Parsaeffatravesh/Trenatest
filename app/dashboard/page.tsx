"use client";

import { useMemo, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Activity, ArrowUpRight, Flame, Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

const formatGradient = (x: number, y: number) =>
  `radial-gradient(900px circle at ${x}% ${y}%, rgba(56, 189, 248, 0.18), transparent 35%), radial-gradient(700px circle at ${
    100 - x
  }% ${Math.max(10, y - 10)}%, rgba(139, 92, 246, 0.14), transparent 40%)`;

export default function DashboardPage() {
  const [spot, setSpot] = useState({ x: 50, y: 30 });

  const gradient = useMemo(() => formatGradient(spot.x, spot.y), [spot]);

  const tiles = [
    { title: "سود امروز", value: "+$1,240", accent: "text-emerald-400", badge: "+3.4%", icon: ArrowUpRight },
    { title: "درصد موفقیت", value: "68%", accent: "text-sky-400", badge: "Stable", icon: ShieldCheck },
    { title: "تریدرهای فعال", value: "573", accent: "text-purple-300", badge: "Live", icon: Activity },
    { title: "مسابقه فعال", value: "چالش الماس", accent: "text-amber-300", badge: "Top 50", icon: Flame },
  ];

  const quickActions = [
    { label: "شروع ترید", icon: Rocket },
    { label: "شارژ حساب", icon: Zap },
    { label: "گزارش سریع", icon: Sparkles },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Control Center</p>
            <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">نگاه کلی</h1>
            <p className="text-sm text-neutral-500">وضعیت سرمایه، مسابقات فعال و اقدامات سریع در یک قاب.</p>
          </div>
          <div className="flex items-center gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-neutral-100"
              >
                <action.icon size={14} />
                {action.label}
              </button>
            ))}
          </div>
        </header>
      </FadeIn>

      <div
        className="relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-white via-white to-[#e2e8f0] p-6 shadow-xl dark:from-[#0b1224] dark:via-[#0b1224] dark:to-[#060a14]"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setSpot({ x: Math.round(x), y: Math.round(y) });
        }}
      >
        <div
          className="absolute inset-0 opacity-80 transition-opacity duration-700"
          style={{ backgroundImage: gradient }}
        />
        <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {tiles.map((tile, idx) => (
            <FadeIn key={tile.title} delay={idx * 0.05}>
              <div className="group relative overflow-hidden rounded-[28px] border border-neutral-200/60 bg-white/90 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <div className={`text-xs font-bold uppercase tracking-wider text-neutral-500 ${tile.accent}`}>{tile.title}</div>
                  <div className="rounded-2xl bg-neutral-100 px-2 py-1 text-[11px] font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                    {tile.badge}
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <tile.icon className={`${tile.accent} opacity-80`} size={18} />
                  <p className="text-3xl font-black text-neutral-900 dark:text-white">{tile.value}</p>
                </div>
                <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-neutral-200/70 dark:bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-purple-500 to-amber-400"
                    style={{ width: `${60 + idx * 8}%` }}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <FadeIn className="xl:col-span-2">
          <MagicCard className="bg-neutral-900/60 p-6 border border-white/10 shadow-2xl">
            <div className="mb-6 flex items-center justify-between text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Active Challenge</p>
                <h3 className="text-2xl font-black">لیگ قهرمانان ۵۰k</h3>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300">Top 12%</div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-white">
              {[
                { label: "Equity", value: "$10,450", tone: "text-sky-200" },
                { label: "Win Rate", value: "68%", tone: "text-emerald-300" },
                { label: "Drawdown", value: "-2.1%", tone: "text-rose-300" },
                { label: "Time Left", value: "۱۲ روز", tone: "text-amber-200" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner">
                  <p className="text-[11px] uppercase tracking-widest text-neutral-400">{item.label}</p>
                  <p className={`mt-2 text-xl font-black ${item.tone}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
              <span className="rounded-full bg-white/10 px-3 py-1">قوانین: حداکثر دراوداون ۵٪</span>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-amber-200">زمان پایان: ۱۲ دی</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200">حالت: فعال</span>
            </div>
          </MagicCard>
        </FadeIn>

        <FadeIn>
          <div className="h-full rounded-[32px] border border-neutral-200/70 bg-white/90 p-6 shadow-md dark:border-white/10 dark:bg-white/5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Pulse</p>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">حسگر سریع</h3>
              </div>
              <Sparkles className="text-sky-400" />
            </div>

            <div className="mt-6 space-y-4 text-sm">
              {["وضعیت سرور: پایدار", "آخرین همگام‌سازی: ۲ دقیقه پیش", "نوتیفیکیشن‌ها: ۳ پیام خوانده نشده"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50 px-4 py-3 text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
                >
                  <span>{item}</span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
