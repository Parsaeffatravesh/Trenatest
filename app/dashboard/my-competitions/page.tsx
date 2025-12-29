import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Zap } from "lucide-react";

export default function MyCompetitionsPage() {
  return (
    <div className="relative mx-auto max-w-6xl space-y-10 overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-b from-[#0b1224] to-[#05080f] p-6 text-white shadow-2xl">
      <FadeIn>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">MY ARENA</h1>
            <p className="mt-1 text-sm text-neutral-400">مسابقات فعال و وضعیت زنده عملکرد شما.</p>
          </div>
          <div className="hidden text-right md:block">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Global Rank</p>
            <p className="text-2xl font-black text-sky-400">#1,284</p>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-6">
        {[1, 2].map((item, idx) => (
          <FadeIn key={item} delay={idx * 0.1}>
            <MagicCard className="group">
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                <div className="relative h-32 w-32 flex-shrink-0">
                  <svg className="h-full w-full -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-neutral-800" />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364}
                      strokeDashoffset={364 - (364 * 75) / 100}
                      className="text-sky-500 transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white">۷۵٪</span>
                    <span className="text-[10px] uppercase text-neutral-500">Target</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center lg:text-right">
                  <div>
                    <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-white lg:justify-start">
                      چالش ترید طلای جهانی <Zap size={18} className="fill-amber-400 text-amber-400" />
                    </h2>
                    <p className="text-sm text-neutral-400">شروع شده در: ۱۲ آذر ۱۴۰۲</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatBox label="Equity" value="$10,450" color="text-white" />
                    <StatBox label="Daily Loss" value="1.2%" color="text-rose-500" />
                    <StatBox label="Total Profit" value="+$450" color="text-emerald-400" />
                    <StatBox label="Days Left" value="۱۴ روز" color="text-sky-400" />
                  </div>
                </div>

                <button className="w-full rounded-2xl bg-white px-8 py-4 font-black text-black transition-transform hover:scale-105 lg:w-auto">
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
    <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
