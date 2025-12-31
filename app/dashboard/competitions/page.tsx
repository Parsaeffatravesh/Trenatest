import CompetitionsListClient from "@/components/competitions/competitions-list-client";
import { FadeIn } from "@/components/ui/fade-in";

const competitions = [
  { id: 1, title: "لیگ الماس ماهانه", entryFee: 49, prizePool: 25000, status: "open", type: "neon", participants: 250 },
  { id: 2, title: "چالش نقره‌ای سریع", entryFee: 0, prizePool: 2500, status: "closing", type: "standard", participants: 120 },
  { id: 3, title: "سوپر لیگ شبانه", entryFee: 99, prizePool: 50000, status: "open", type: "speed", participants: 410 },
  { id: 4, title: "ماراتن تابستان", entryFee: 25, prizePool: 15000, status: "full", type: "standard", participants: 300 },
  { id: 5, title: "پریمیوم هفتگی", entryFee: 75, prizePool: 32000, status: "open", type: "neon", participants: 180 },
  { id: 6, title: "توربو دوستانه", entryFee: 10, prizePool: 6000, status: "closing", type: "speed", participants: 90 },
];

export default function AllCompetitionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-24">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative">
            <div className="absolute -right-4 top-0 w-20 h-20 bg-sky-500/10 blur-3xl rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase italic">Global Arena</h1>
            <p className="text-neutral-500 text-sm mt-1">تمام مسابقات فعال در سطح جهانی</p>
          </div>
        </div>
      </FadeIn>

      <CompetitionsListClient initialData={competitions} />
    </div>
  );
}
