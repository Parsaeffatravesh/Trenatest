# راه‌اندازی و اجرای پروژه

این پروژه با Next.js 14 و App Router ساخته شده و برای استایل‌دهی از Tailwind CSS و برای انیمیشن‌ها از Framer Motion استفاده می‌کند.

## پیش‌نیازها
- Node.js 18 یا بالاتر
- npm (یا yarn/pnpm)

## نصب وابستگی‌ها
```bash
npm install
```

## اجرای محیط توسعه
```bash
npm run dev
```
سپس مرورگر را به آدرس `http://localhost:3000` باز کنید.

## بیلد و اجرای نسخه تولید
```bash
npm run build
npm start
```

## ساختار اصلی
- `app/` شامل فایل‌های App Router (صفحات و لایه‌ها)
- `components/` شامل کامپوننت‌های UI مانند `FadeIn` و `Sidebar`
- `lib/utils.ts` شامل تابع کمکی `cn` برای مدیریت کلاس‌ها
- `app/dashboard/page.tsx` صفحه اصلی داشبورد با گرید بنیتو و کارت‌ها
- `app/dashboard/layout.tsx` لایه داشبورد برای قرار دادن Sidebar کنار محتوا
