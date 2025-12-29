# Pages

صفحات سطح Route (Dashboard، Markets، Symbol، Orders/History، Portfolio، Settings) در این پوشه قرار می‌گیرند.

## الگوی پوشه
- هر صفحه یک پوشه اختصاصی با `index.tsx`/`page.tsx` + فایل تست/Storybook و `notes.md` برای حالت‌ها.
- حالت‌های Skeleton/Empty/Error باید در `notes.md` مستند شوند.
- نسخه موبایل/دسکتاپ در کامپوننت واحد با Breakpoint یا با فایل‌های جداگانه مدیریت شود.

## اتصال داده
- داده‌های سروری با React Query (fetch + cache + SWR) مدیریت می‌شوند.
- state UI (فیلتر، sort، تب فعال) در Zustand یا state محلی نگهداری شود.

## چک‌لیست A11y
- ترتیب Tab در فرم‌ها و جدول‌ها واضح باشد.
- فوکوس در Modal/Drawer trap شود و Esc کار کند.
- برای چارت خلاصه متنی (ARIA description) در دسترس باشد.
