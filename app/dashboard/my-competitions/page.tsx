import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Zap } from "lucide-react";

export default function MyCompetitionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-10">
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">ACTIVE ARENA</h1>
            <p className="text-slate-500 text-sm">وضعیت چالش‌های فعال شما</p>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Global Rank</p>
            <p className="text-xl font-black text-sky-300">#1,284</p>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-6">
        {[1, 2].map((item, idx) => (
          <FadeIn key={item} delay={idx * 0.1}>
            <MagicCard className="group p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-neutral-800" />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={314}
                      strokeDashoffset={314 - (314 * 75) / 100}
                      className="text-emerald-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl sm:text-2xl font-black text-white">۷۵٪</span>
                    <span className="text-[9px] text-slate-500 uppercase">Profit Target</span>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className="text-center lg:text-right">
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center lg:justify-start gap-2">
                      چالش ترید طلا <Zap size={18} className="text-amber-400 fill-amber-400" />
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm">شروع: ۱۲ آذر ۱۴۰۲</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <StatBox label="Equity" value="$10,450" color="text-white" />
                    <StatBox label="Daily Loss" value="1.2%" color="text-rose-400" />
                    <StatBox label="Profit" value="+$450" color="text-emerald-400" />
                    <StatBox label="Time Left" value="۱۴ روز" color="text-sky-300" />
                  </div>
                </div>

                <button className="w-full lg:w-auto px-10 py-4 bg-white text-black font-black rounded-lg hover:scale-105 transition-transform text-sm sm:text-base">
                  ENTER TERMINAL
                </button>
              </div>
            </MagicCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col items-center lg:items-start">
      <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold mb-1">{label}</p>
      <p className={`text-sm sm:text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
