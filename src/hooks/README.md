# Hooks

هوک‌های سفارشی مشترک یا دامنه‌ای در این پوشه قرار می‌گیرند.

## نمونه‌ها
- `useWebSocketFeed`: مدیریت اتصال، retry/backoff، throttle به ~10fps، انتشار وضعیت اتصال برای UI.
- `useViewportBreakpoints`: تشخیص sm/md/lg برای ریسپانسیو کردن چیدمان.
- `useKeyboardShortcuts`: ثبت و پاک کردن Hotkeyها (مثلاً B/S برای ترید، / برای جست‌وجو).
- `useTheme`: خواندن/ست کردن `data-theme` و جلوگیری از FOUC.

## دستورالعمل
- هر هوک تست واحد داشته باشد و حداقل یک Storybook/Docs snippet برای نحوه مصرف.
- side-effectها (EventListener، interval) در cleanup آزاد شوند.
- WebSocket/Timers باید در تسک‌های شدید با requestAnimationFrame یا throttle محافظت شوند.
