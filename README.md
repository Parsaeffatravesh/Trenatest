# Trenatest

Refactored trading terminal UI built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
npm start
```

The main experience lives in `app/page.tsx` and uses lightweight mock data with live-refreshing order book and trade feeds, dual-language support (EN/FA), and the glassmorphic theme carried over from the original static prototype.

## Backend API wiring

- Set `NEXT_PUBLIC_API_BASE_URL` to point at the user-service gateway (defaults to `http://localhost:8080/api/v1`).
- The `lib/api/client.ts` helper wraps the available auth, tickets, XP, missions, and leaderboard endpoints with idempotency-key headers for mutating calls.
