import { FadeIn } from "@/components/ui/fade-in";
import { Clock, TrendingUp, Trophy } from "lucide-react";

export default function MyCompetitionsPage() {
  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-2xl font-bold">مسابقات من</h1>
        <p className="text-neutral-500 text-sm">وضعیت عملکرد شما در چالش‌های فعال.</p>
      </FadeIn>

      {/* لیست مسابقات فعال */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2].map((item, idx) => (
          <FadeIn key={item} delay={idx * 0.1}>
            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm hover:shadow-md transition-all">
              {/* نوار وضعیت رنگی سمت راست */}
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-l-full" />
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">چالش ترید ۵۰ هزار دلاری</h3>
                  <span className="text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 px-2 py-1 rounded-md mt-1 inline-block">
                    در جریان
                  </span>
                </div>
                <Trophy className="text-yellow-500 h-6 w-6" />
              </div>

              {/* آمار کلیدی */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-neutral-500">سود کسب شده</p>
                  <p className="font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingUp size={14} /> +$1,240
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-500">رتبه فعلی</p>
                  <p className="font-bold text-neutral-800 dark:text-neutral-200">#42</p>
                </div>
              </div>

              {/* نوار زمان */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> زمان باقی‌مانده</span>
                  <span>۱۲ روز</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-800 dark:bg-white w-[60%] rounded-full" />
                </div>
              </div>
              
              <button className="w-full mt-6 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                مشاهده جزئیات
              </button>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
