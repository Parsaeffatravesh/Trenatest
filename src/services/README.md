# Services

ماژول‌های ارتباط با API و مدیریت داده سروری در این پوشه قرار می‌گیرند.

## راهنما
- از fetch/axios با interceptor برای احراز هویت و هندل خطا استفاده کنید؛ پاسخ‌ها را به DTOهای شفاف تبدیل کنید.
- تایپ‌ها در سطح درخواست/پاسخ TypeScript تعریف شود و در hooks مصرف شوند.
- WebSocket client در زیرپوشه `realtime/` با مدیریت backoff و health-check نگهداری گردد.
- همه متدهای حساس (ثبت سفارش، تغییر رمز 2FA) باید شناسه ردیابی (traceId) تولید و در لاگ سرور استفاده کنند.

## الگوی فایل
```
services/
  apiClient.ts          // تنظیمات axios/fetch + retry
  auth.ts               // login/logout/refresh
  orders.ts             // create/cancel/amend order
  marketData.ts         // quotes, orderbook, trades
  alerts.ts             // price alerts CRUD
  realtime/socket.ts    // WebSocket client + reconnection
```

## چک‌لیست
- [ ] توکن‌ها در HttpOnly cookie؛ از LocalStorage برای JWT استفاده نشود.
- [ ] تنظیم هدر `Accept-Language` بر اساس زبان فعال UI.
- [ ] هندل خطای شبکه/Timeout با Retry محدود و پیام کاربرپسند.
