import { FadeIn } from "@/components/ui/fade-in";
import { Activity, CreditCard, DollarSign, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "درآمد کل", value: "$45,231.89", icon: DollarSign, change: "+20.1%" },
    { title: "اشتراک‌ها", value: "+2350", icon: Users, change: "+180.1%" },
    { title: "فروش‌ها", value: "+12,234", icon: CreditCard, change: "+19%" },
    { title: "فعال در لحظه", value: "+573", icon: Activity, change: "+201" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              داشبورد
            </h1>
            <p className="text-neutral-500 mt-2 text-sm">نگاهی کلی به عملکرد حساب کاربری شما.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm">
              فیلترها
            </button>
            <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-black/20">
              دریافت گزارش
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.1}>
            <div className="p-6 rounded-[24px] border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl hover:shadow-neutral-200/40 dark:hover:shadow-neutral-900/50 transition-all duration-300 group">
              <div className="flex flex-row items-center justify-between pb-4">
                <span className="text-sm font-medium text-neutral-500 group-hover:text-emerald-500 transition-colors">
                  {item.title}
                </span>
                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                  <item.icon className="h-4 w-4 text-neutral-500 group-hover:text-emerald-600" />
                </div>
              </div>

              <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{item.value}</div>

              <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                <span className="text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                  <TrendingUp size={12} /> {item.change}
                </span>
                نسبت به ماه قبل
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Chart */}
        <div className="lg:col-span-4">
          <FadeIn delay={0.4} className="h-full">
            <div className="h-[450px] rounded-[32px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="font-bold text-lg">نمودار فروش</h3>
                <p className="text-sm text-neutral-500">تحلیل داده‌های ۶ ماه اخیر</p>
              </div>

              <div className="w-full flex-1 flex items-center justify-center text-neutral-400 bg-neutral-50 dark:bg-neutral-950/50 border-2 border-dashed border-neutral-100 dark:border-neutral-800 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span>محل قرارگیری نمودار (Recharts)</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-3">
          <FadeIn delay={0.5} className="h-full">
            <div className="h-[450px] rounded-[32px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm flex flex-col">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="font-bold text-lg">تراکنش‌های اخیر</h3>
                <button className="text-xs font-medium text-emerald-600 hover:text-emerald-500">
                  مشاهده همه
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center group cursor-pointer p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-xl transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-sm">
                      AR
                    </div>

                    <div className="mr-4 space-y-1">
                      <p className="text-sm font-bold leading-none text-neutral-800 dark:text-neutral-200">
                        علی رضایی
                      </p>
                      <p className="text-xs text-neutral-500">ali.rezaei@email.com</p>
                    </div>

                    <div className="mr-auto font-bold text-sm text-neutral-900 dark:text-white">
                      +$1,999.00
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
