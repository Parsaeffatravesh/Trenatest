# Trenatest

داشبورد معاملاتی NeoTrader اکنون با Next.js و TypeScript راه‌اندازی شده است. رابط کاربری اصلی از فایل‌های `public/dashboard.html` و `public/dashboard.js` بارگذاری می‌شود و با کمک Tailwind CSS استایل‌دهی می‌شود.

## پیش‌نیازها
- Node.js 18 یا بالاتر
- نصب وابستگی‌ها با `npm install`

## اسکریپت‌ها
- `npm run dev` اجرای محیط توسعه
- `npm run build` ساخت خروجی تولیدی
- `npm run start` اجرای نسخه تولیدی پس از build
- `npm run lint` اجرای بررسی‌های Next.js

## ساختار مهم
- `app/page.tsx` خواندن محتوای HTML آماده و رندر آن در یک کامپوننت کلاینتی
- `app/components/TradingDashboard.tsx` بارگذاری اسکریپت‌های تعاملی داشبورد و مدیریت راه‌اندازی آن
- `public/dashboard.html` مارک‌آپ سمت کاربر
- `public/dashboard.js` منطق تعاملی (تغییر زبان، به‌روزرسانی نمودار، فرم سفارش‌ها و ...)
- `app/globals.css` استایل‌های اختصاصی و راه‌اندازی Tailwind

