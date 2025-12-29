import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Zap, Target, Users } from "lucide-react";

export default function CompetitionsPage() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-b from-[#0b1224] to-[#05080f] p-6 text-white shadow-2xl">
      <FadeIn>
        <header className="relative py-10 text-center">
          <div className="absolute top-0 left-1/2 h-24 w-2/3 -translate-x-1/2 bg-purple-500/30 blur-[120px]" />
          <h1 className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-5xl font-black italic tracking-tighter text-transparent">
            CHALLENGES
          </h1>
          <p className="mt-2 text-neutral-400">مرزهای ترید خود را جابجا کنید.</p>
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 gap-8 px-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <MagicCard className="border-t-2 border-t-sky-500/50">
              <div className="mb-8 flex justify-between">
                <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-400">
                  <Target size={24} />
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((u) => (
                    <div key={u} className="h-8 w-8 rounded-full border-2 border-neutral-900 bg-neutral-800" />
                  ))}
                </div>
              </div>

              <h3 className="mb-2 text-xl font-bold text-white">لیگ الماس ماهانه</h3>
              <div className="mb-6 flex items-center gap-4 text-sm text-neutral-400">
                <span className="flex items-center gap-1">
                  <Users size={14} /> ۲۰۰+ نفر
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={14} className="text-amber-400" /> فوری
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Prize Pool</p>
                  <p className="text-2xl font-black text-sky-400">$25,000</p>
                </div>
                <button className="rounded-2xl bg-sky-500 px-6 py-3 font-bold text-black shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:bg-sky-400">
                  ورود
                </button>
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[32px] bg-gradient-to-b from-transparent via-black/60 to-black/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <div className="space-y-2 text-center text-sm text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Quick View</p>
                  <p>زمان باقی‌مانده: ۱۴ روز</p>
                  <p>ظرفیت باقی‌مانده: ۵ نفر</p>
                </div>
              </div>
            </MagicCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
