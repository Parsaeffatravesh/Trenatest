import { MagicCard } from "@/components/ui/magic-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Wallet, ShieldCheck, Copy, ArrowUpRight } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="relative mx-auto max-w-5xl space-y-8 overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-b from-[#0b1224] to-[#05080f] p-6 pb-20 text-white shadow-2xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-600 to-purple-700 p-6 text-white shadow-2xl shadow-sky-500/20 sm:p-8">
              <div className="relative z-10 flex flex-row items-center gap-4 sm:gap-6 lg:flex-col lg:items-start lg:gap-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <Wallet size={26} strokeWidth={1.5} />
                </div>

                <div className="flex-1 space-y-2 text-left lg:text-left">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">DIGITAL ASSET CARD</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Available Balance</p>
                    <h2 className="text-3xl font-black tracking-tight sm:text-4xl">$۱۲,۴۵۰.۰۰</h2>
                  </div>
                  <p className="text-sm font-mono tracking-widest text-white/80">**** **** 4290</p>
                </div>

                <div className="flex flex-col items-end gap-3 lg:w-full lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                    فعال
                  </div>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white transition hover:bg-white/30 backdrop-blur-md">
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <MagicCard className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">وضعیت احراز هویت</p>
                  <p className="text-xs text-neutral-500">تایید شده در سطح ۲</p>
                </div>
              </div>
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            </MagicCard>
          </FadeIn>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <FadeIn delay={0.3}>
            <MagicCard>
              <h3 className="mb-8 flex items-center gap-2 text-xl font-bold text-white">اطلاعات حساب کاربری</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InfoItem label="نام نمایشی" value="MOHAMMAD.PRO" isEditable />
                  <InfoItem label="ایمیل" value="mohammad@trade.io" isEditable={false} />
                  <InfoItem label="زبان پنل" value="فارسی (IR)" isEditable />
                  <InfoItem label="منطقه زمانی" value="UTC +3:30" isEditable />
                </div>

                <div className="border-t border-white/5 pt-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Wallet Address (TRC-20)</p>
                  <div className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-black/40 p-4 sm:flex-row sm:items-center">
                    <code className="flex-1 break-all text-xs text-sky-400">TYv1G7p9...3x8L2mNpR4v8qZ</code>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-300 transition-colors hover:border-white/20 hover:text-white">
                      <Copy size={16} />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </MagicCard>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, isEditable }: { label: string; value: string; isEditable: boolean }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
      <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3">
        <span className="text-sm text-neutral-200">{value}</span>
        {isEditable && <button className="text-[10px] font-bold text-sky-500 hover:underline">ویرایش</button>}
      </div>
    </div>
  );
}
