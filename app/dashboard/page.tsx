"use client";

import dynamic from "next/dynamic";
import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Activity, DollarSign, TrendingUp, Users, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LottieLoader } from "@/components/ui/lottie-loader";

const OverviewChart = dynamic(
  () => import("@/components/dashboard/overview-chart").then((mod) => mod.OverviewChart),
  { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center"><LottieLoader size={60} /></div> }
);

export default function DashboardPage() {
  const { t, locale } = useI18n();
  
  const stats = [
    { title: t.dashboard.totalEquity, value: "$12,450", icon: DollarSign, change: "+12%", color: "text-sky-300", sparkline: true },
    { title: t.dashboard.monthlyProfit, value: "$3,210", icon: TrendingUp, change: "+5.4%", color: "text-emerald-300" },
    { title: t.dashboard.globalRank, value: "#1,284", icon: Activity, change: "+24", color: "text-purple-300" },
    { title: t.dashboard.activeCompetitions, value: locale === "fa" ? "3 مورد" : "3 items", icon: Users, change: t.dashboard.active, color: "text-amber-300" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-white uppercase italic">{t.dashboard.title}</h1>
          <button className="bg-sky-500 text-black px-5 py-2 rounded-lg font-bold text-sm shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-colors">
            {t.dashboard.startTrade}
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat, i) => (
          <FadeIn key={stat.title} delay={i * 0.05}>
            <MagicCard className="p-4 lg:p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] lg:text-[10px] uppercase font-bold text-slate-500 tracking-widest">{stat.title}</span>
                <stat.icon size={14} className={stat.color} />
              </div>
              <div className="flex justify-between items-end gap-2">
                <div>
                  <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight">{stat.value}</h2>
                  <span className={`text-[9px] lg:text-[10px] font-bold ${stat.color} bg-white/5 px-1.5 py-0.5 rounded inline-flex mt-1.5`}>
                    {stat.change}
                  </span>
                </div>
                {stat.sparkline ? (
                  <svg className="w-16 h-8 lg:w-20 lg:h-10 text-sky-400" viewBox="0 0 120 50" fill="none">
                    <path
                      d="M2 40C18 30 26 35 38 22C50 10 64 14 74 24C84 35 96 34 118 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 40C18 30 26 35 38 22C50 10 64 14 74 24C84 35 96 34 118 12"
                      stroke="url(#sparkGlow)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="sparkGlow" x1="2" y1="40" x2="118" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#38BDF8" />
                        <stop offset="1" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : null}
              </div>
            </MagicCard>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        <div className="lg:col-span-8">
          <MagicCard className="p-4 lg:p-6 border-white/5 h-full">
            <h3 className="text-base lg:text-lg font-bold text-white mb-4">{t.dashboard.weeklyReport}</h3>
            <div className="h-[200px] lg:h-[300px]">
              <OverviewChart />
            </div>
          </MagicCard>
        </div>

        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-base lg:text-lg font-bold text-white px-1 italic uppercase">{t.dashboard.upcoming}</h3>
          {[1, 2, 3].map((_, i) => (
            <FadeIn key={i} delay={0.3 + i * 0.05}>
              <MagicCard className="p-3 lg:p-4 border-white/5 hover:border-sky-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">🏆</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{locale === "fa" ? "چالش توربو" : "Turbo Challenge"}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{t.dashboard.startsIn} 2h</p>
                  </div>
                  <button className="p-2 text-sky-400 hover:bg-sky-400/10 rounded-lg transition-colors flex-shrink-0">
                    <Zap size={16} fill="currentColor" />
                  </button>
                </div>
              </MagicCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
