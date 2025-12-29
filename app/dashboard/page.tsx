"use client";

import { useMemo, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Activity,
  ArrowUpRight,
  Eye,
  EyeOff,
  Flame,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { useRouter } from "next/navigation";

const formatGradient = (x: number, y: number) =>
  `radial-gradient(900px circle at ${x}% ${y}%, rgba(56, 189, 248, 0.18), transparent 35%), radial-gradient(700px circle at ${
    100 - x
  }% ${Math.max(10, y - 10)}%, rgba(139, 92, 246, 0.14), transparent 40%)`;

export default function DashboardPage() {
  const [spot, setSpot] = useState({ x: 50, y: 30 });
  const [showAmounts, setShowAmounts] = useState(true);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const router = useRouter();

  const gradient = useMemo(() => formatGradient(spot.x, spot.y), [spot]);

  const maskValue = (value: string) => (showAmounts ? value : "••••");

  const tiles = [
    {
      title: "مسابقات فعال",
      value: "چالش الماس",
      accent: "text-amber-300",
      badge: "Top 50",
      icon: Flame,
      href: "/dashboard/my-competitions",
    },
    { title: "درصد موفقیت", value: "68%", accent: "text-sky-400", badge: "Stable", icon: ShieldCheck },
    { title: "رتبه کل", value: "573", accent: "text-purple-300", badge: "Live", icon: Activity },
    { title: "سود امروز", value: "+$1,240", accent: "text-emerald-400", badge: "+3.4%", icon: ArrowUpRight },
  ];

  const quickActions = [
    { label: "شروع ترید", icon: Rocket },
    { label: "شارژ حساب", icon: Zap },
    { label: "گزارش سریع", icon: Sparkles },
  ];

  const walletSummary = {
    balance: "$12,480",
    available: "$10,200",
    locked: "$2,280",
  };

  const transactions = [
    { reason: "واریز بانکی", date: "۱۴۰۲/۰۷/۱۲", amount: "+$1,200" },
    { reason: "برد مسابقه", date: "۱۴۰۲/۰۷/۱۰", amount: "+$480" },
    { reason: "برداشت کارت", date: "۱۴۰۲/۰۷/۰۷", amount: "-$320" },
    { reason: "کارمزد پلتفرم", date: "۱۴۰۲/۰۷/۰۶", amount: "-$18" },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <nav className="rounded-3xl border border-white/40 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-neutral-800 dark:text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-purple-500 text-white shadow-md">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">Dashboard</p>
                <p className="text-lg font-black">مرکز فرمان</p>
              </div>
            </div>

            <button
              onClick={() => setIsWalletOpen(true)}
              className="group order-3 flex flex-1 items-center justify-center gap-3 rounded-2xl border border-neutral-200/70 bg-neutral-50 px-4 py-3 text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white sm:order-none"
            >
              <Wallet className="text-emerald-400" size={18} />
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">Wallet Balance</p>
                <p className="text-xl font-black">{maskValue(walletSummary.balance)}</p>
              </div>
            </button>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowAmounts((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/90 px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-neutral-100"
              >
                {showAmounts ? <EyeOff size={14} /> : <Eye size={14} />}
                {showAmounts ? "پنهان کردن مقادیر" : "نمایش مقادیر"}
              </button>
            </div>
          </div>
        </nav>
      </FadeIn>

      {isWalletOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-[32px] border border-white/20 bg-gradient-to-br from-[#0b1224] via-[#0c1328] to-[#080d18] p-6 shadow-2xl">
            <button
              onClick={() => setIsWalletOpen(false)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/5"
            >
              <X size={16} />
            </button>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4 text-white">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">Total Balance</p>
                    <p className="text-3xl font-black text-emerald-300">{maskValue(walletSummary.balance)}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
                    <span className="text-neutral-300">دسترسی سریع</span>
                    <span className="ml-3 font-semibold text-amber-200">آنلاین</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[{ label: "موجودی آزاد", value: walletSummary.available }, { label: "قفل شده", value: walletSummary.locked }, { label: "آخرین تغییر", value: "+$320" }].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">{item.label}</p>
                      <p className="mt-2 text-xl font-black text-white">{maskValue(item.value)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 rounded-2xl bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-200 shadow-inner transition hover:-translate-y-0.5 hover:bg-emerald-500/30">
                    <ArrowUpRight size={14} />
                    واریز
                  </button>
                  <button className="flex items-center gap-2 rounded-2xl bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-100 shadow-inner transition hover:-translate-y-0.5 hover:bg-amber-500/30">
                    <ArrowUpRight size={14} />
                    برداشت
                  </button>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">تاریخچه تراکنش</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-neutral-200">۴ مورد اخیر</span>
                </div>
                <div className="space-y-3 text-sm">
                  {transactions.map((txn) => {
                    const isPositive = txn.amount.startsWith("+");
                    return (
                      <div
                        key={`${txn.reason}-${txn.date}`}
                        className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-3 py-2"
                      >
                        <div>
                          <p className="font-semibold">{txn.reason}</p>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">{txn.date}</p>
                        </div>
                        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${isPositive ? "bg-emerald-500/10 text-emerald-200" : "bg-rose-500/10 text-rose-200"}`}>
                          <span>{isPositive ? "+" : "-"}</span>
                          <span>{maskValue(txn.amount.replace(/[+-]/, ""))}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <div
                className="group relative overflow-hidden rounded-[28px] border border-neutral-200/60 bg-white/90 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
                role={tile.href ? "button" : undefined}
                tabIndex={tile.href ? 0 : undefined}
                onClick={() => tile.href && router.push(tile.href)}
                onKeyDown={(e) => {
                  if (!tile.href) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(tile.href);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className={`text-xs font-bold uppercase tracking-wider text-neutral-500 ${tile.accent}`}>{tile.title}</div>
                  <div className="rounded-2xl bg-neutral-100 px-2 py-1 text-[11px] font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                    {tile.badge}
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <tile.icon className={`${tile.accent} opacity-80`} size={18} />
                  <p className="text-3xl font-black text-neutral-900 dark:text-white">{maskValue(tile.value)}</p>
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

            <div className="grid grid-cols-1 gap-4 text-white sm:grid-cols-2 md:grid-cols-4">
              {[
                { label: "Equity", value: "$10,450", tone: "text-sky-200" },
                { label: "Win Rate", value: "68%", tone: "text-emerald-300" },
                { label: "Drawdown", value: "-2.1%", tone: "text-rose-300" },
                { label: "Time Left", value: "۱۲ روز", tone: "text-amber-200" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner">
                  <p className="text-[11px] uppercase tracking-widest text-neutral-400">{item.label}</p>
                  <p className={`mt-2 text-xl font-black ${item.tone}`}>{maskValue(item.value)}</p>
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
