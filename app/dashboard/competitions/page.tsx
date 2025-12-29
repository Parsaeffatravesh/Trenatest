"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Filter, Target, Users, X, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CompetitionStatus = "open" | "closing" | "full";
type CompetitionType = "neon" | "classic" | "pro";

type Competition = {
  id: number;
  title: string;
  entryFee: number;
  prizePool: number;
  participants: number;
  status: CompetitionStatus;
  type: CompetitionType;
  timeLeft: string;
};

const competitions: Competition[] = [
  { id: 1, title: "لیگ الماس ماهانه", entryFee: 49, prizePool: 25000, participants: 250, status: "open", type: "neon", timeLeft: "۱۲ روز" },
  { id: 2, title: "چالش شبانه نقره", entryFee: 0, prizePool: 5000, participants: 120, status: "closing", type: "classic", timeLeft: "۴ ساعت" },
  { id: 3, title: "نبرد پروفشنال", entryFee: 99, prizePool: 50000, participants: 90, status: "open", type: "pro", timeLeft: "۱۹ روز" },
  { id: 4, title: "تورنمنت سرعتی", entryFee: 29, prizePool: 12000, participants: 210, status: "full", type: "classic", timeLeft: "اتمام" },
  { id: 5, title: "لیگ پریمیوم", entryFee: 79, prizePool: 30000, participants: 140, status: "closing", type: "neon", timeLeft: "۳ روز" },
  { id: 6, title: "چالش استارتاپ", entryFee: 15, prizePool: 8000, participants: 320, status: "open", type: "classic", timeLeft: "۷ روز" },
];

const defaultFilters = {
  status: "all",
  fee: "all",
  prize: "all",
  type: "all",
  sort: "popular",
};

export default function AllCompetitionsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (!isFilterOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFilterOpen]);

  const filteredCompetitions = useMemo(() => {
    let filtered = [...competitions];

    if (filters.status !== "all") {
      filtered = filtered.filter((competition) => competition.status === filters.status);
    }

    if (filters.fee !== "all") {
      filtered = filtered.filter((competition) =>
        filters.fee === "free" ? competition.entryFee === 0 : competition.entryFee > 0,
      );
    }

    if (filters.prize !== "all") {
      filtered = filtered.filter((competition) => {
        if (filters.prize === "under-10k") return competition.prizePool < 10000;
        if (filters.prize === "10k-30k") return competition.prizePool >= 10000 && competition.prizePool <= 30000;
        return competition.prizePool > 30000;
      });
    }

    if (filters.type !== "all") {
      filtered = filtered.filter((competition) => competition.type === filters.type);
    }

    if (filters.sort === "popular") {
      filtered.sort((a, b) => b.participants - a.participants);
    }
    if (filters.sort === "prize") {
      filtered.sort((a, b) => b.prizePool - a.prizePool);
    }
    if (filters.sort === "fee") {
      filtered.sort((a, b) => a.entryFee - b.entryFee);
    }
    if (filters.sort === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [filters]);

  const formatCurrency = (value: number) => `$${value.toLocaleString("en-US")}`;

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
          <button
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-all w-full md:w-auto justify-center"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter size={16} /> فیلتر مسابقات
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCompetitions.map((competition, i) => (
          <FadeIn key={competition.id} delay={i * 0.05}>
            <MagicCard className="group flex flex-col h-full border-white/5 bg-neutral-900/40 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none mb-1">Entry Fee</p>
                  <p className="text-xs font-bold text-slate-200 bg-white/5 px-3 py-1 rounded-full inline-flex">
                    {competition.entryFee ? formatCurrency(competition.entryFee) : "رایگان"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{competition.title}</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                    <Users size={12} /> {competition.participants.toLocaleString("fa-IR")} نفر
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">
                    <Zap size={12} fill="currentColor" /> {competition.type === "neon" ? "نئون" : competition.type === "classic" ? "کلاسیک" : "پرو"}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                    {competition.status === "open" ? "ثبت‌نام باز" : competition.status === "closing" ? "در حال تکمیل" : "تکمیل شد"}
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-end bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Prize Pool</p>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">
                      {formatCurrency(competition.prizePool)}
                    </p>
                  </div>
                  <button className="bg-sky-500 hover:bg-sky-400 text-black px-5 py-2 rounded-xl text-xs font-black transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                    ورود
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span className="uppercase tracking-widest text-slate-500">Time Left</span>
                  <span className="text-white font-bold">{competition.timeLeft}</span>
                </div>
              </div>
            </MagicCard>
          </FadeIn>
        ))}
      </div>

      <button
        className="md:hidden fixed bottom-20 right-6 z-40 flex items-center gap-2 rounded-full bg-sky-500 text-black px-4 py-3 text-xs font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)]"
        onClick={() => setIsFilterOpen(true)}
      >
        <Filter size={16} /> فیلتر
      </button>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}>
          <div
            className="w-full max-w-sm h-full bg-[#0b1224] border-l border-white/10 p-6 space-y-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">فیلتر مسابقات</h2>
              <button className="p-2 rounded-lg hover:bg-white/10" onClick={() => setIsFilterOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <FilterField
                label="وضعیت"
                value={filters.status}
                onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                options={[
                  { value: "all", label: "همه" },
                  { value: "open", label: "ثبت‌نام باز" },
                  { value: "closing", label: "در حال تکمیل" },
                  { value: "full", label: "تکمیل شده" },
                ]}
              />
              <FilterField
                label="هزینه ورود"
                value={filters.fee}
                onChange={(value) => setFilters((prev) => ({ ...prev, fee: value }))}
                options={[
                  { value: "all", label: "همه" },
                  { value: "free", label: "رایگان" },
                  { value: "paid", label: "پرداختی" },
                ]}
              />
              <FilterField
                label="جایزه"
                value={filters.prize}
                onChange={(value) => setFilters((prev) => ({ ...prev, prize: value }))}
                options={[
                  { value: "all", label: "همه" },
                  { value: "under-10k", label: "زیر ۱۰٬۰۰۰" },
                  { value: "10k-30k", label: "۱۰٬۰۰۰ تا ۳۰٬۰۰۰" },
                  { value: "over-30k", label: "بالای ۳۰٬۰۰۰" },
                ]}
              />
              <FilterField
                label="نوع مسابقه"
                value={filters.type}
                onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
                options={[
                  { value: "all", label: "همه" },
                  { value: "neon", label: "نئون" },
                  { value: "classic", label: "کلاسیک" },
                  { value: "pro", label: "پرو" },
                ]}
              />
              <FilterField
                label="مرتب‌سازی"
                value={filters.sort}
                onChange={(value) => setFilters((prev) => ({ ...prev, sort: value }))}
                options={[
                  { value: "popular", label: "محبوب‌ترین" },
                  { value: "prize", label: "بیشترین جایزه" },
                  { value: "fee", label: "کمترین هزینه" },
                  { value: "newest", label: "جدیدترین" },
                ]}
              />
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-white/10 text-white py-2 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors"
                onClick={() => setFilters(defaultFilters)}
              >
                پاک کردن
              </button>
              <button
                className="flex-1 bg-sky-500 text-black py-2 rounded-xl text-sm font-bold hover:bg-sky-400 transition-colors"
                onClick={() => setIsFilterOpen(false)}
              >
                اعمال فیلتر
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-neutral-300">
      <span className="text-[11px] uppercase tracking-widest text-neutral-500">{label}</span>
      <select
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
