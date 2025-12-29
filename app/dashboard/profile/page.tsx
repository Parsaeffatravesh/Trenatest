import { FadeIn } from "@/components/ui/fade-in";
import { User, Camera, BadgeCheck } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Sidebar - User Info Card */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="relative mb-4 group cursor-pointer">
                <div className="w-28 h-28 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-4xl overflow-hidden border-4 border-white dark:border-neutral-900 shadow-lg">
                  🧔🏻‍♂️
                  {/* Image Placeholder */}
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" />
                </div>
                <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white dark:border-neutral-900">
                    <BadgeCheck size={16} />
                </div>
              </div>
              <h2 className="text-xl font-bold">محمد احمدی</h2>
              <p className="text-sm text-neutral-500">سطح: تریدر حرفه‌ای</p>
              
              <div className="w-full mt-6 space-y-2">
                 <div className="flex justify-between text-sm py-2 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-500">عضویت</span>
                    <span className="font-medium">۳ ماه</span>
                 </div>
                 <div className="flex justify-between text-sm py-2">
                    <span className="text-neutral-500">وضعیت</span>
                    <span className="text-emerald-500 font-medium">احراز شده</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Main Content - Forms */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg"><User size={20}/></div>
                <h3 className="text-lg font-bold">اطلاعات شخصی</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">نام کامل</label>
                  <input type="text" defaultValue="محمد احمدی" className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">ایمیل</label>
                  <input type="email" defaultValue="mohammad@example.com" className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">بیوگرافی کوتاه</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="درباره استراتژی ترید خود بنویسید..." />
                </div>
              </div>
              
              <div className="flex justify-end mt-8">
                <button className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-90 transition-opacity">
                    ذخیره تغییرات
                </button>
              </div>
            </div>
          </div>

        </div>
      </FadeIn>
    </div>
  );
}
