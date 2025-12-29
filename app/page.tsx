import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 text-center px-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">خوش آمدید</h1>
        <p className="text-neutral-600 max-w-xl">
          این پروژه یک داشبورد مدرن با انیمیشن‌های نرم، گرید بنیتو و سايدبار واکنش‌گرا است.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-80 transition"
        >
          مشاهده داشبورد
        </Link>
      </div>
    </main>
  );
}
