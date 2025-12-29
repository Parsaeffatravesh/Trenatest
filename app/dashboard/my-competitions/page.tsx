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
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                <div className="relative h-24 w-24 flex-shrink-0 lg:h-32 lg:w-32">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-neutral-800" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={314}
                      strokeDashoffset={314 - (314 * 75) / 100}
                      className="text-sky-500 transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-white lg:text-2xl">۷۵٪</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 lg:text-xs">Target</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center lg:text-right">
                  <div>
                    <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-white lg:justify-start">
                      چالش ترید طلای جهانی <Zap size={18} className="fill-amber-400 text-amber-400" />
                    </h2>
                    <p className="text-sm text-neutral-400">شروع شده در: ۱۲ آذر ۱۴۰۲</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">{label}</p>
      <p className={`text-xl font-black ${color}`}>{value}</p>
    </div>
  );
}
