import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Coins, Filter, Target, Trophy, Users, Zap } from "lucide-react";

const competitions = [
  {
    title: "لیگ الماس ماهانه",
    subtitle: "چالش سرعت و استراتژی",
    prizePool: "$25,000",
    entryFee: "۵۰,۰۰۰ تومان",
    participants: "۲۰۰+",
    energy: "۳ انرژی",
  },
  {
    title: "جایزه هفتگی نقره",
    subtitle: "معاملات کوتاه‌مدت در ۷ روز",
    prizePool: "$10,000",
    entryFee: "۲۰,۰۰۰ تومان",
    participants: "۱۵۰+",
    energy: "۲ انرژی",
  },
  {
    title: "چالش روزانه",
    subtitle: "ورود سریع و نتیجه فوری",
    prizePool: "$5,000",
    entryFee: "۱۰,۰۰۰ تومان",
    participants: "۳۰۰+",
    energy: "۱ انرژی",
  },
];

export default function CompetitionsPage() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-b from-[#0b1224] to-[#05080f] px-4 py-6 text-white shadow-2xl sm:px-6 md:px-8">
      <div className="absolute inset-x-0 top-0 h-32 bg-purple-500/20 blur-[140px]" />

      <FadeIn>
        <header className="relative flex flex-col gap-4 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-200/80">Competitions</p>
            <h1 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl font-black italic tracking-tight text-transparent sm:text-4xl">
              چالش‌های فعال برای تریدرها
            </h1>
            <p className="max-w-2xl text-sm text-neutral-300 sm:text-base">
              با انتخاب لیگ مناسب، مهارت و انرژی خود را مدیریت کنید. برای ورود سریع روی فیلترها ضربه بزنید.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end md:w-auto">
            <button className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition hover:border-white/20 hover:bg-white/10 sm:w-auto sm:px-5">
              <Filter size={16} />
              فیلترها
            </button>
          </div>
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {competitions.map((competition, index) => (
          <FadeIn key={competition.title} delay={(index + 1) * 0.08}>
            <MagicCard className="group relative h-full overflow-hidden border border-white/5 bg-white/[0.02] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition hover:border-white/10 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-100 ring-1 ring-purple-500/40">
                    <Target size={14} />
                    لیگ ویژه
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold leading-tight text-white sm:text-[22px]">{competition.title}</h3>
                    <p className="text-sm text-neutral-300 sm:text-[15px]">{competition.subtitle}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-200 ring-1 ring-amber-400/40">
                  <Zap size={14} />
                  {competition.energy}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-300 sm:text-[15px]">
                <span className="flex items-center gap-2 rounded-full border border-white/5 px-3 py-1.5">
                  <Coins size={16} className="text-emerald-300" />
                  ورودی: {competition.entryFee}
                </span>
                <span className="flex items-center gap-2 rounded-full border border-white/5 px-3 py-1.5">
                  <Users size={16} className="text-sky-300" />
                  {competition.participants} شرکت‌کننده
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    <Trophy size={14} className="text-amber-300" />
                    Prize Pool
                  </p>
                  <p className="text-2xl font-black text-sky-300 sm:text-[26px]">{competition.prizePool}</p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-black shadow-[0_15px_45px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5 hover:bg-sky-400 sm:px-6 sm:text-base">
                  <Coins size={16} />
                  ورود به لیگ
                </button>
              </div>
            </MagicCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
