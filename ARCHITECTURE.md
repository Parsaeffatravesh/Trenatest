# معماری پیشنهادی فرانت‌اند پنل معاملاتی

این سند ترجمه عملی خروجی فاز ۱ است و توضیح می‌دهد ساختار پروژه، لایه‌ها و جریان داده چگونه پیاده‌سازی می‌شود.

## استک و بیلد
- **React + TypeScript** با Vite (یا Next برای SSR/SSG).
- **Tailwind CSS** برای استایل سریع؛ **CSS Modules** در کامپوننت‌های نیازمند Isolation.
- **ESLint + Prettier** برای یکنواختی کد؛ **Husky** برای pre-commit lint/test (در فاز ۳ فعال می‌شود).

## ساختار پوشه‌ها
```
src/
  assets/          فونت، آیکن، تصاویر
  components/      UI عمومی و دامنه‌ای (common, trading)
  pages/           Route-level views
  hooks/           هوک‌های سفارشی (WebSocket، hotkeys، theme)
  services/        API/Realtime clients (HTTP/WebSocket)
  utils/           توابع کمکی بدون وابستگی به UI
  theme/           توکن‌های طراحی و تمینگ دوگانه
```
- Presentational/Container در `components/trading` تفکیک می‌شود تا رندر مجدد حداقل شود.
- هر صفحه `notes.md` برای حالت‌های Skeleton/Empty/Error/RTL دارد (الگو در `src/pages/README.md`).

## جریان داده و State
- **React Query**: منبع حقیقت داده سروری (quotes, orderbook, portfolio). کش با SWR و invalidation بعد از اقدامات کاربر.
- **Zustand**: state UI گلوبال (فیلتر، تم فعال، hotkeys، وضعیت اتصال).
- **WebSocket**: فید زنده با throttle ~10fps؛ fallback polling 5s. وضعیت اتصال در هدر به‌روز می‌شود.
- **Context محدود**: برای user/session یا theme فقط در نزدیک‌ترین سطح لازم.

## عملکرد و بلادرنگ
- Virtualization برای OrderBook/Table (react-window).
- Memoization گزینشی (React.memo/useMemo) و تقسیم state بین کامپوننت‌های ریز برای جلوگیری از رندر کامل.
- استفاده از Web Worker اختیاری برای اندیکاتورهای سنگین در ChartPanel.

## امنیت و UX
- وابستگی به HttpOnly Cookie برای توکن؛ جلوگیری از ذخیره JWT در LocalStorage.
- جلوگیری از Double-submit در فرم‌ها؛ 2FA برای سفارش‌های حساس.
- بنر قطع WebSocket، دکمه Reconnect و پیام خطای انسان‌خوان.

## مسیر بعدی (فاز ۲)
- تولید وایرفریم Annotated (دسکتاپ/موبایل) برای صفحات اصلی.
- تعریف Prop API و تعاملات کیبورد برای کامپوننت‌های دامنه‌ای.
- نوشتن سناریوهای RTL و جدول Skeleton/Empty/Error در `notes.md` هر صفحه.
