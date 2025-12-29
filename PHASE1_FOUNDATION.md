# فاز 1: بنیاد طراحی و معماری (Deliverable)

این سند خروجی‌های عملی فاز 1 را ارائه می‌دهد تا تیم بتواند با اطمینان وارد فاز 2 (وایرفریم Hi-Fi و کیت کامپوننت) شود.

## 1. اهداف، شاخص‌ها و پرسوناهای هسته
- **هدف محصول**: داشبورد معاملاتی سریع، شفاف و امن برای تریدرهای حرفه‌ای و نیمه‌حرفه‌ای.
- **شاخص‌های موفقیت**: TTI دسکتاپ < 2s، امتیاز Lighthouse ≥ 90 (Performance/Best Practices/Accessibility)، خطای رندر داده زنده ≈ 0 در تست 30 دقیقه‌ای.
- **پرسوناها**:
  - تریدر روزانه (دسکتاپ، Hotkey-heavy، نیاز به چارت با FPS بالا).
  - سرمایه‌گذار میان‌مدت (موبایل/تبلت، تمرکز بر دیده‌بان و پرتفوی).
  - ادمین پشتیبانی (وب، مانیتور سفارش‌ها و وضعیت اتصال).

## 2. فلوهای اصلی (Annotated)
- **جست‌وجوی نماد و افزودن به دیده‌بان**: ورودی جست‌وجو با پیشنهاد فوری، افزودن/حذف Batch، فیلتر بازار؛ حالت‌های Empty/Error با CTA retry.
- **تریدتیکت (Market/Limit/Stop)**: محاسبه آنی کارمزد و مجموع نهایی، ولیدیشن موجودی/گام قیمت، جلوگیری از Double-submit، 2FA برای سفارش‌های حساس.
- **پرتفوی و P&L**: نمایش سود/ضرر روزانه و تحقق‌نیافته، فیلتر تاریخ، حالت Skeleton در لود و پیام خطای شبکه با Retry.
- **هشدار قیمتی**: تنظیم حد بالا/پایین، انتخاب کانال اعلان (درون‌برنامه/ایمیل)، کنترل نرخ ارسال.
- **حالات اتصال**: بنر قطع WebSocket، دکمه Reconnect، fallback polling، Indicator سبز/نارنجی/قرمز در هدر.

## 3. تصمیمات معماری فرانت‌اند
- **استک**: React + TypeScript، Vite/Next برای کد اسپلینتینگ؛ Tailwind برای استایل پایه + CSS Modules برای بخش‌های نیازمند Isolation.
- **State و داده زنده**: React Query برای state سروری، Zustand برای state UI گلوبال؛ WebSocket اصلی با throttle ~10fps، fallback به polling 5s.
- **ساختار پوشه**:
  - `src/assets`, `src/components/{common,trading}`, `src/pages`, `src/hooks`, `src/services`, `src/utils`, `src/theme`.
  - کامپوننت‌های دامنه (OrderBook, TradeTicket, Watchlist, ChartPanel) در `components/trading` با تقسیم Presentational/Container.
- **عملکرد**: Virtualization برای جداول/OrderBook (react-window)، Memoization selective، Web Worker اختیاری برای محاسبات اندیکاتور.

## 4. توکن‌های طراحی پایه (CSS Variables پیشنهادی)
```css
:root {
  /* رنگ‌های پایه */
  --color-bg: #0f172a;           /* بگراند تیره اصلی */
  --color-surface: #111827;      /* کارت‌ها/پانل */
  --color-text: #e5e7eb;         /* متن اصلی */
  --color-muted: #9ca3af;        /* متن ثانویه */
  --color-brand: #38bdf8;        /* تأکیدی/پرایمری */
  --color-success: #22c55e;      /* صعود قیمت */
  --color-danger: #ef4444;       /* نزول قیمت */
  --color-warning: #f59e0b;      /* هشدار */

  /* تایپوگرافی */
  --font-body: "IRANSans", "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "Roboto Mono", "Vazirmatn", ui-monospace, SFMono-Regular;
  --font-size-base: 14px;
  --font-size-sm: 12px;
  --font-size-lg: 16px;

  /* فاصله و Radius */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --shadow-elevated: 0 12px 32px rgba(0,0,0,0.28);

  /* انیمیشن */
  --transition-fast: 120ms ease;
  --transition-base: 180ms ease;
}

[data-theme="light"] {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --color-muted: #475569;
  --color-brand: #2563eb;
  --color-success: #16a34a;
  --color-danger: #dc2626;
  --color-warning: #d97706;
}
```
- **کنتراست**: پالت بالا برای متن/پس‌زمینه حداقل 4.5:1 را پوشش می‌دهد؛ متن روی `--color-surface` در هر دو تم تست شده است.
- **تایپو**: ارقام Tabular از فونت mono در جداول مالی استفاده شود تا ستون‌ها نلرزند.

## 5. چک‌لیست پذیرش فاز 1
- [x] فلوهای اصلی با حالت‌های خطا/اتصال مستند شدند.
- [x] تصمیمات استک و معماری پوشه تأیید شد.
- [x] توکن‌های دو تم با تست کنتراست پایه تدوین شد.
- [ ] WA: تأیید ذی‌نفعان و قفل خروجی‌ها برای ورود به فاز 2 (اکشن بعدی).

## 6. گام‌های بعدی (ورود به فاز 2)
- تولید وایرفریم Annotated (دسکتاپ/موبایل) برای صفحات: داشبورد، نماد، سفارشات/تاریخچه، پرتفوی، تنظیمات.
- تعریف API رفتاری کامپوننت‌های OrderBook، TradeTicket، Watchlist، ChartPanel (Props/States/Hotkeys/RTL).
- مستندسازی سناریوهای RTL و جدول Skeleton/Empty/Error برای هر صفحه.
