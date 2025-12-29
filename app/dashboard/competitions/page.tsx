import { FadeIn } from "@/components/ui/fade-in";
import { Zap, Users, ArrowLeft } from "lucide-react";

export default function CompetitionsPage() {
  return (
    <div className="space-y-8">
      
      {/* Hero Banner - Featured Competition */}
      <FadeIn>
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-emerald-950 dark:to-neutral-900 text-white p-8 md:p-12 shadow-xl">
          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-md mb-4">
              <Zap size={12} className="text-yellow-400 fill-yellow-400" /> پیشنهاد ویژه
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              لیگ قهرمانان ترید <br/> <span className="text-emerald-400">با جایزه ۵۰,۰۰۰ دلاری</span>
            </h2>
            <p className="text-neutral-300 mb-8 leading-relaxed">
              بزرگترین رقابت سال شروع شد. مهارت خود را در بازارهای جهانی به چالش بکشید و برنده جایزه بزرگ شوید.
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
              ثبت نام در مسابقه <ArrowLeft size={16} />
            </button>
          </div>
          {/* تزئینات پس‌زمینه */}
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
        </div>
      </FadeIn>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <div className="flex flex-col h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 hover:border-emerald-500/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xl">
                  🚀
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-400">جایزه کل</p>
                  <p className="text-lg font-bold text-emerald-600">$5,000</p>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2">چالش هفتگی فارکس</h3>
              <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                مناسب برای اسکالپرها. قوانین ساده و بدون محدودیت دراوداون روزانه.
              </p>

              <div className="mt-auto pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center text-xs text-neutral-500 gap-1">
                  <Users size={14} /> ۳۴۰ شرکت‌کننده
                </div>
                <button className="bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-xs font-bold hover:opacity-80 transition-opacity">
                  ورود: $10
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
