# فاز 2: وایرفریم Hi-Fi و کیت کامپوننت (Deliverable)

این سند خروجی‌های عملی فاز 2 را جمع‌بندی می‌کند تا تیم طراحی و توسعه بتوانند وارد پیاده‌سازی (فاز 3) شوند. تمرکز بر وایرفریم‌های Annotated، API رفتاری کامپوننت‌ها، راهنمای چارت/داده زنده، جریان‌های ولیدیشن/امنیت، دسترس‌پذیری و هندآف است.

## 1. وایرفریم‌های Annotated (دسکتاپ/موبایل)
- **داشبورد**: هدر با Indicator اتصال (سبز/نارنجی/قرمز) و بنر قطع WebSocket + دکمه Reconnect؛ کارت دیده‌بان با اسپارک‌لاین و فیلتر سریع؛ چارت اصلی با تب‌های تایم‌فریم؛ ویجت اوردربوک/عمق بازار؛ Toast اعلان سفارش و هشدار قیمت. حالت‌ها: Skeleton لود اولیه، Empty (بدون نماد) با CTA افزودن، Error/Timeout با Retry.
- **صفحه نماد**: چارت کندل + حجم + MA/RSI، لیست سفارشات باز/تاریخچه با مجازی‌سازی؛ تریدتیکت چسبان (Market/Limit/Stop) با نمایش کارمزد و مجموع نهایی؛ حالت قطع اتصال با Freeze داده و پیام «در حال اتصال مجدد». موبایل: چیدمان Stack، تب پایین برای «چارت | اردرها | دیده‌بان | هشدار»؛ Drawer برای Order Ticket.
- **پرتفوی و P&L**: کارت سود/ضرر روزانه و تحقق‌نیافته، فیلتر تاریخ و کلاس دارایی؛ جدول پوزیشن‌ها با ارقام tabular و رنگ وضعیت؛ حالت Empty با CTA «افزودن نماد به دیده‌بان». Skeleton برای لود و Error با Retry.
- **سفارشات و تاریخچه**: تب سفارشات فعال/تاریخچه، فیلتر سریع (نوع، وضعیت، بازه زمانی)؛ Batch Cancel/Amend؛ ردیف قابل باز شدن برای جزئیات؛ حالت Queue در قطع اتصال. موبایل: کارت‌سازی ردیف‌ها، Swipe برای اقدام سریع.
- **هشدار قیمتی**: فرم حد بالا/پایین، انتخاب کانال اعلان (درون‌برنامه/ایمیل)، نرخ محدودکننده ارسال؛ لیست هشدارها با Toggle فعال/غیرفعال. حالت Empty/Expired.
- **حالات عمومی**: هر صفحه شامل Skeleton/Empty/Error + CTA اصلاحی، دستورالعمل ریسپانسیو (Desktop Grid چندستونه، Mobile Stack/Tab/Drawer) و نمونه RTL (تراز راست، آیکن‌های برعکس‌شده در nav).

## 2. کیت کامپوننت و API رفتاری
### 2.1 کامپوننت‌های پایه (UI Kit)
| Component | Props کلیدی | State/Status | تعامل کیبورد/RTL |
| --- | --- | --- | --- |
| Button/Link | `variant` (primary/secondary/ghost), `size`, `icon`, `loading`, `href` | hover, focus-visible, active, disabled, loading | Enter/Space فعال، Focus Ring، در RTL آیکن‌ها mirroring |
| Input/Textarea | `label`, `hint`, `error`, `prefix/suffix`, `debounceMs` | focus, error, success | Tab/F6، Escape برای پاک‌سازی، اعلان خطا ARIA |
| Select/Combobox | `options`, `searchable`, `multi`, `emptyState`, `loading`, `onCreateOption?` | open/closed, loading, selected, error | Arrow Up/Down، Enter/Space انتخاب، Esc بستن، Home/End، پشتیبانی RTL برای جهت فلش |
| Tooltip/Popover | `trigger` (hover/click/focus), `placement`, `delay` | open/closed | Esc بستن، Trap فوکوس در Popover تعاملی |
| Modal/Drawer | `size`, `onClose`, `closeOnBackdrop`, `aria-label`, `initialFocus` | open/closed, busy | Esc بستن، Tab Trap، Shift+Tab معکوس، در RTL انیمیشن از راست |
| Tabs/Pagination | `value`, `onChange`, `items`, `count`, `pageSize` | active, disabled | Arrow Left/Right (RTL-aware)، Home/End، Enter انتخاب |

### 2.2 کامپوننت‌های دامنه معاملاتی
| Component | Props کلیدی | State/Status | تعاملات کلیدی |
| --- | --- | --- | --- |
| OrderTicket | `mode` (market/limit/stop), `symbol`, `qty`, `price`, `tp/sl`, `fee`, `onSubmit`, `validateStep`, `twoFactorRequired` | loading, error, insufficientBalance, submitted, queuedWhenOffline | Hotkeys: B/S برای خرید/فروش، Enter برای Submit، Ctrl/Cmd+Enter تایید نهایی، جلوگیری از Double-submit، پیام خطا human-readable |
| OrderBook | `bids`, `asks`, `lastPrice`, `spread`, `onSelectPrice`, `depthLevels`, `virtualized` | loading, empty, error, disconnected | Scroll/Arrow برای حرکت روی ردیف، Enter برای انتخاب قیمت، Highlight تغییرات قیمت با throttle 10fps |
| WatchlistCard | `symbols`, `filters`, `sparkData`, `onAdd/remove`, `batchActions`, `sort` | loading, empty, error | Keyboard برای reorder (Alt+Arrow)، Enter روی CTA، Hover/Fade برای تغییرات قیمت |
| PositionsTable | `rows`, `pnlDaily`, `pnlUnrealized`, `columnsConfig`, `onClose/Amend`, `virtualized` | loading, empty, error, disconnected | Arrow/Tab navigation، Enter روی Action، رنگ وضعیت کوررنگی‌پسند |
| ChartPanel | `series`, `indicators`, `timeframe`, `onCrosshairMove`, `onPlaceOrder`, `theme` | loading, error, disconnected, throttled | Scroll/Pinch Zoom، Drag Pan، Right-click Context Menu سفارش، Drag Handle برای ویرایش سفارش |
| AlertsPanel | `alerts`, `channels`, `onCreate/update/delete`, `throttleLimit` | loading, empty, error, expired | Keyboard focus برای Toggle، Enter برای Save، پیام نرخ محدودکننده |

## 3. چارت و داده زنده
- **هدف عملکرد**: FPS ≥ 50 برای 5k نقطه داده؛ throttle رندر UI به ~10fps؛ windowing داده تاریخی (مثلاً 500-1k نقطه قابل مشاهده، بقیه در background).
- **ارتباط**: WebSocket اصلی؛ fallback SSE/HTTP Polling 5s. بنر قطع اتصال + دکمه Reconnect؛ Queue/Retry برای سفارش‌های ثبت‌شده در قطع موقت.
- **تعاملات**: Zoom/Pan، Crosshair با Tooltip لحظه‌ای، Drag برای ویرایش سفارش در چارت، Context Menu برای لغو/تغییر سفارش، Snap به گام قیمت.
- **بهینه‌سازی**: Offload محاسبات اندیکاتور به Web Worker اختیاری؛ Memoization سری‌ها؛ Batch DOM updates؛ Virtualized OrderBook/جداول.

## 4. جریان‌های ولیدیشن و امنیت UX
- **Order Submit**: ولیدیشن step قیمت/حجم، موجودی، کارمزد و مجموع نهایی در لحظه؛ جلوگیری از Double-submit (قفل دکمه یا nonce). پیام‌های خطا کوتاه، قابل ترجمه، با کد خطا.
- **2FA**: سفارش‌های حساس → Dialog کد یکبارمصرف (TOTP/SMS) با شمارش معکوس و گزینه Resend (rate limited). خطای تایم‌اوت/کد اشتباه با CTA Retry.
- **خطای شبکه/Timeout**: نمایش حالت Queue اگر سفارش ارسال شد ولی پاسخ نیامد؛ دکمه Retry/Cancel؛ Log در Activity Feed.
- **حریم خصوصی**: مخفی/نمایش موجودی با Toggle؛ هشدار در صورت نزدیک بودن به حد ریسک؛ عدم نمایش توکن در UI/Storage.

## 5. دسترس‌پذیری و i18n
- **WCAG 2.1 AA**: کنتراست ≥ 4.5:1 برای متن‌ها؛ Focus Ring قابل مشاهده؛ ترتیب Tab منطقی؛ همه کنترل‌ها با کیبورد قابل استفاده باشند (Modal/Menu/Combobox با Trap).
- **خوانشگر صفحه**: نقش ARIA برای تب، جدول، Tooltip/Popover؛ اعلان وضعیت اتصال و خطا با `aria-live`.
- **RTL/چندزبانه**: چرخش آیکن‌های جهت‌دار در RTL، تراز راست متن، کنترل طول رشته‌ها (متن fa/en نمونه)؛ فرمت اعداد/تاریخ بر اساس Locale.
- **کوررنگی**: پالت سبز/قرمز با تمایل آبی/نارنجی؛ تست grayscale و شبیه‌سازی Deuteranopia/Protanopia.

## 6. برنامه تست کاربردپذیری و بنچمارک
- **سناریوها (۵ مورد)**: جست‌وجوی نماد و افزودن به دیده‌بان؛ ثبت سفارش Limit با 2FA و مشاهده تأیید؛ مشاهده پرتفوی و بستن پوزیشن؛ تنظیم هشدار قیمتی و دریافت نوتیف؛ واکنش به قطع اتصال و ارسال مجدد سفارش.
- **معیارها**: زمان تکمیل، نرخ خطا، رضایت SUS/NPS کوتاه، نرخ تشخیص وضعیت اتصال. هدف: زمان تکمیل < 90 ثانیه برای هر سناریو، خطا < 5%.
- **نمونه کاربران**: حداقل 5 نفر (۲ تریدر حرفه‌ای، ۲ نیمه‌حرفه‌ای، ۱ ادمین). ضبط و تحلیل بینش + اقدام اصلاحی.
- **بنچمارک عملکرد**: اندازه باندل هدف < 200KB gzipped برای صفحه اصلی، TTI دسکتاپ < 2s، FPS چارت ≥ 50، تست 30 دقیقه‌ای بدون خطای رندر داده.

## 7. Design Ops و هندآف
- **Storybook**: تم سوییچر (تیره/روشن)، داستان‌های کنترل‌دار برای Button/Input/Select/Modal/OrderTicket/OrderBook/ChartPanel/WatchlistCard.
- **Tickets (Jira/Linear)**: هر کامپوننت با لینک به فریم و جدول API؛ برچسب A11y/i18n/perf؛ شامل حالت‌های Skeleton/Empty/Error/Disconnected.
- **دارایی‌ها**: tokens.css، آیکن‌های RTL-aware، نمونه متن fa/en، لینک وایرفریم Annotated.
- **چک‌لیست هندآف**: Breakpoints، spacing/radius/shadow، حالات تعاملی، hotkeys، پیام‌های خطا، نرخ throttle، رویدادهای telemetry.

## 8. چک‌لیست پذیرش فاز 2
- [x] وایرفریم Annotated دسکتاپ/موبایل با حالت‌های Skeleton/Empty/Error/Disconnected و دستورالعمل RTL/Responsive.
- [x] کیت کامپوننت با Props/States/Keyboard Interactions و کامپوننت‌های دامنه معاملاتی.
- [x] گایدلاین چارت و سیاست داده زنده (throttle، windowing، fallback ارتباط).
- [x] جریان‌های ولیدیشن/امنیت شامل 2FA، Double-submit guard، خطاهای شبکه/Timeout.
- [x] چک‌لیست WCAG/i18n و الزامات کوررنگی/ARIA.
- [x] برنامه تست کاربردپذیری و بنچمارک عملکرد با معیارهای هدف.
- [x] Design Ops/Handoff شامل Storybook، دارایی‌ها و تیکتینگ.

## 9. گام بعدی
- قفل خروجی‌های فاز 2 پس از تأیید ذی‌نفعان؛ آغاز فاز 3 (پیاده‌سازی اولیه، Storybook، اتصال به فید نمونه) با استفاده از مشخصات این سند.
