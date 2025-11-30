# Components

این پوشه شامل کامپوننت‌های UI است که به دو دسته اصلی تقسیم می‌شوند:
- `common/`: کامپوننت‌های عمومی و پرمصرف (Button, Input, Modal, Toast, Tabs, Table) با حالت‌های Loading/Disabled/RTL.
- `trading/`: کامپوننت‌های دامنه معاملاتی (TradeTicket، OrderBook، Watchlist، ChartPanel، Positions) که باید Presentational/Container تفکیک شوند.

## اصول طراحی
- کامپوننت‌های Presentational: فقط UI و پروپس؛ بدون فراخوانی مستقیم سرویس.
- کامپوننت‌های Container: مدیریت داده (React Query/Zustand)، اتصال WebSocket و تزریق پروپس به نسخه UI.
- هر کامپوننت باید حالت‌های Loading، Error، Empty و تم تیره/روشن را پوشش دهد.
- Hotkeys برای کامپوننت‌های کلیدی (مثلاً B برای خرید در TradeTicket) در props و README مستند شود.

## چک‌لیست
- [ ] PropTypes/TypeScript types کامل و self-documented.
- [ ] تست دسترس‌پذیری (فوکوس‌استیت، ARIA مناسب برای Modal/Menu/Table).
- [ ] استایل‌ها بر اساس `tokens.css` و Tailwind/CSS Modules بدون درهم‌آمیختگی حوزه‌ها.
