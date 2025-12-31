"use client";

import * as React from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Filter, Target, Users, Zap } from "lucide-react";
import FilterSelect from "@/components/ui/FilterSelect";

export default function AllCompetitionsPage() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [feeFilter, setFeeFilter] = React.useState("all");
  const [prizeFilter, setPrizeFilter] = React.useState("all");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [sortOption, setSortOption] = React.useState("featured");

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    }
    if (isFilterOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFilterOpen]);

  // mock data — فقط برای نمایش UX
  const competitions = [
    { id: 1, title: "لیگ الماس ماهانه", entryFee: 49, prizePool: 25000, status: "open", type: "neon", participants: 250 },
    { id: 2, title: "چالش نقره‌ای سریع", entryFee: 0, prizePool: 2500, status: "closing", type: "standard", participants: 120 },
    { id: 3, title: "سوپر لیگ شبانه", entryFee: 99, prizePool: 50000, status: "open", type: "speed", participants: 410 },
    { id: 4, title: "ماراتن تابستان", entryFee: 25, prizePool: 15000, status: "full", type: "standard", participants: 300 },
    { id: 5, title: "پریمیوم هفتگی", entryFee: 75, prizePool: 32000, status: "open", type: "neon", participants: 180 },
    { id: 6, title: "توربو دوستانه", entryFee: 10, prizePool: 6000, status: "closing", type: "speed", participants: 90 },
  ];

  const filteredCompetitions = React.useMemo(() => {
    let filtered = competitions.filter((competition) => {
      const statusMatch = statusFilter === "all" || competition.status === statusFilter;
      const feeMatch = feeFilter === "all" || (feeFilter === "free" ? competition.entryFee === 0 : competition.entryFee > 0);
      const prizeMatch =
        prizeFilter === "all" ||
        (prizeFilter === "low" && competition.prizePool < 5000) ||
        (prizeFilter === "mid" && competition.prizePool >= 5000 && competition.prizePool <= 20000) ||
        (prizeFilter === "high" && competition.prizePool > 20000);
      const typeMatch = typeFilter === "all" || competition.type === typeFilter;
      return statusMatch && feeMatch && prizeMatch && typeMatch;
    });

    filtered = [...filtered].sort((a, b) => {
      if (sortOption === "fee-asc") return a.entryFee - b.entryFee;
      if (sortOption === "fee-desc") return b.entryFee - a.entryFee;
      if (sortOption === "prize-asc") return a.prizePool - b.prizePool;
      if (sortOption === "prize-desc") return b.prizePool - a.prizePool;
      return 0;
    });

    return filtered;
  }, [competitions, feeFilter, prizeFilter, sortOption, statusFilter, typeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-24">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative">
            <div className="absolute -right-4 top-0 w-20 h-20 bg-sky-500/10 blur-3xl rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase italic">Global Arena</h1>
            <p className="text-neutral-500 text-sm mt-1">تمام مسابقات فعال در سطح جهانی</p>
          </div>

          {/* موبایل: دکمهٔ فیلتر */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-neutral-300 hover:bg-white/10 transition-all w-full md:w-auto justify-center md:hidden"
          >
            <Filter size={16} /> فیلتر مسابقات
          </button>
        </div>
      </FadeIn>

      {/* دسکتاپ: نوار فیلتر (md+) */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4 bg-black/30 border border-white/5 rounded-lg p-4">
        <FilterSelect
          label="وضعیت"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: "همه" },
            { value: "open", label: "باز" },
            { value: "closing", label: "درحال بسته شدن" },
            { value: "full", label: "تکمیل شده" },
          ]}
        />
        <FilterSelect
          label="ورودی"
          value={feeFilter}
          onChange={setFeeFilter}
          options={[
            { value: "all", label: "همه" },
            { value: "free", label: "رایگان" },
            { value: "paid", label: "پرداختی" },
          ]}
        />
        <FilterSelect
          label="جایزه"
          value={prizeFilter}
          onChange={setPrizeFilter}
          options={[
            { value: "all", label: "همه" },
            { value: "low", label: "کمتر از ۵k" },
            { value: "mid", label: "۵k تا ۲۰k" },
            { value: "high", label: "بیشتر از ۲۰k" },
          ]}
        />
        <FilterSelect
          label="نوع"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: "all", label: "همه" },
            { value: "neon", label: "نئون" },
            { value: "standard", label: "استاندارد" },
            { value: "speed", label: "سریع" },
          ]}
        />
        <FilterSelect
          label="مرتب‌سازی"
          value={sortOption}
          onChange={setSortOption}
          options={[
            { value: "featured", label: "پیشنهادی" },
            { value: "fee-asc", label: "هزینه صعودی" },
            { value: "fee-desc", label: "هزینه نزولی" },
            { value: "prize-desc", label: "جایزه نزولی" },
            { value: "prize-asc", label: "جایزه صعودی" },
          ]}
        />
      </div>

      {/* لیست یا Empty state */}
      {filteredCompetitions.length === 0 ? (
        <div className="rounded-lg border border-white/5 bg-white/5 p-10 text-center text-sm text-neutral-400">
          مسابقه‌ای با فیلترهای انتخاب‌شده پیدا نشد.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCompetitions.map((competition, index) => (
            <FadeIn key={competition.id} delay={index * 0.05}>
              <MagicCard className="group flex flex-col h-full border-white/5 bg-neutral-900/40 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400 group-hover:scale-110 transition-transform">
                    <Target size={24} />
                  </div>

                  <div className="text-left">
                    <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest leading-none mb-1">Entry Fee</p>
                    <p className="text-xl font-black text-white">{competition.entryFee === 0 ? "Free" : `$${competition.entryFee}`}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{competition.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 bg-white/5 px-2 py-1 rounded">
                      <Users size={12} /> {competition.participants} نفر
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                      <Zap size={12} fill="currentColor" />{" "}
                      {competition.type === "neon" ? "نئون" : competition.type === "speed" ? "سریع" : "استاندارد"}
                    </div>
                    <span className="text-[10px] text-neutral-400 bg-white/5 px-2 py-1 rounded uppercase font-bold">
                      {competition.status === "open" ? "OPEN" : competition.status === "closing" ? "CLOSING" : "FULL"}
                    </span>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-end bg-black/40 p-4 rounded-lg border border-white/5">
                    <div>
                      <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1">Prize Pool</p>
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">
                        ${competition.prizePool.toLocaleString("en-US")}
                      </p>
                    </div>
                    <button className="bg-sky-500 hover:bg-sky-400 text-black px-5 py-2 rounded-lg text-xs font-black transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                      ورود
                    </button>
                  </div>
                </div>
              </MagicCard>
            </FadeIn>
          ))}
        </div>
      )}

      {/* Modal / Drawer موبایل */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 px-4 py-6"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-lg border border-white/10 bg-neutral-900/95 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">فیلتر مسابقات</h2>
              <button onClick={() => setIsFilterOpen(false)} className="text-xs text-neutral-400 hover:text-white transition-colors">
                بستن
              </button>
            </div>

            <div className="grid gap-4">
              <FilterSelect
                label="وضعیت"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: "all", label: "همه" },
                  { value: "open", label: "باز" },
                  { value: "closing", label: "درحال بسته شدن" },
                  { value: "full", label: "تکمیل شده" },
                ]}
              />

              <FilterSelect
                label="ورودی"
                value={feeFilter}
                onChange={setFeeFilter}
                options={[
                  { value: "all", label: "همه" },
                  { value: "free", label: "رایگان" },
                  { value: "paid", label: "پرداختی" },
                ]}
              />

              <FilterSelect
                label="جایزه"
                value={prizeFilter}
                onChange={setPrizeFilter}
                options={[
                  { value: "all", label: "همه" },
                  { value: "low", label: "کمتر از ۵k" },
                  { value: "mid", label: "۵k تا ۲۰k" },
                  { value: "high", label: "بیشتر از ۲۰k" },
                ]}
              />

              <FilterSelect
                label="نوع"
                value={typeFilter}
                onChange={setTypeFilter}
                options={[
                  { value: "all", label: "همه" },
                  { value: "neon", label: "نئون" },
                  { value: "standard", label: "استاندارد" },
                  { value: "speed", label: "سریع" },
                ]}
              />

              <FilterSelect
                label="مرتب‌سازی"
                value={sortOption}
                onChange={setSortOption}
                options={[
                  { value: "featured", label: "پیشنهادی" },
                  { value: "fee-asc", label: "هزینه صعودی" },
                  { value: "fee-desc", label: "هزینه نزولی" },
                  { value: "prize-desc", label: "جایزه نزولی" },
                  { value: "prize-asc", label: "جایزه صعودی" },
                ]}
              />
            </div>

            <button onClick={() => setIsFilterOpen(false)} className="mt-6 w-full rounded-lg bg-sky-500 py-2 text-sm font-bold text-black">
              اعمال فیلتر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
