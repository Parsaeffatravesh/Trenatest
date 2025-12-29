import dynamic from "next/dynamic";
import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Activity, DollarSign, TrendingUp, Users, Zap } from "lucide-react";

const OverviewChart = dynamic(
  () => import("@/components/dashboard/overview-chart").then((mod) => mod.OverviewChart),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-white/5 rounded-2xl" /> }
);

export default function DashboardPage() {
  const stats = [
    { title: "Total Equity", value: "$12,450", icon: DollarSign, change: "+12%", color: "text-sky-300", sparkline: true },
    { title: "سود ماهانه", value: "$3,210", icon: TrendingUp, change: "+5.4%", color: "text-emerald-300" },
    { title: "رتبه جهانی", value: "#1,284", icon: Activity, change: "+24", color: "text-purple-300" },
    { title: "مسابقات فعال", value: "۳ مورد", icon: Users, change: "فعال", color: "text-amber-300" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 pb-24">
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase italic">Command Center</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-sky-500 text-black px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20">
              شروع ترید جدید
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <FadeIn key={stat.title} delay={i * 0.1}>
            <MagicCard className="p-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{stat.title}</span>
                <stat.icon size={16} className={stat.color} />
              </div>
              <div className="flex justify-between items-end gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.value}</h2>
                  <span className={`text-[10px] font-bold ${stat.color} bg-white/5 px-2 py-0.5 rounded-md inline-flex mt-2`}>
                    {stat.change}
                  </span>
                </div>
                {stat.sparkline ? (
                  <svg className="w-20 h-10 text-sky-400" viewBox="0 0 120 50" fill="none">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8 h-full">
          <MagicCard className="h-full p-4 sm:p-8 border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">گزارش عملکرد هفتگی</h3>
            <div className="h-[220px] sm:h-[350px]">
              <OverviewChart />
            </div>
          </MagicCard>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-lg font-bold text-white px-2 italic uppercase">Upcoming</h3>
          {[1, 2, 3].map((_, i) => (
            <FadeIn key={i} delay={0.5 + i * 0.1}>
              <MagicCard className="p-4 border-white/5 hover:border-sky-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">🏆</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">چالش توربو</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Starts in 2h</p>
                  </div>
                  <button className="p-2 text-sky-400 hover:bg-sky-400/10 rounded-lg transition-colors">
                    <Zap size={18} fill="currentColor" />
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
