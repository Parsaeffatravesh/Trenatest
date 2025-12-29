import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Target, Users, Zap, Filter } from "lucide-react";

export default function AllCompetitionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-24">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative">
            <div className="absolute -right-4 top-0 w-20 h-20 bg-sky-500/10 blur-3xl rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase italic">
              Global Arena
            </h1>
            <p className="text-neutral-500 text-sm mt-1">تمام مسابقات فعال در سطح جهانی</p>
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-neutral-300 hover:bg-white/10 transition-all w-full md:w-auto justify-center">
            <Filter size={16} /> فیلتر مسابقات
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <MagicCard className="group flex flex-col h-full border-white/5 bg-neutral-900/40 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest leading-none mb-1">Entry Fee</p>
                  <p className="text-xl font-black text-white">$49</p>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">لیگ الماس ماهانه</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 bg-white/5 px-2 py-1 rounded-md">
                    <Users size={12} /> ۲۵۰ نفر
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">
                    <Zap size={12} fill="currentColor" /> نئون
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-end bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1">Prize Pool</p>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">$25,000</p>
                  </div>
                  <button className="bg-sky-500 hover:bg-sky-400 text-black px-5 py-2 rounded-xl text-xs font-black transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                    ورود
                  </button>
                </div>
              </div>
            </MagicCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
