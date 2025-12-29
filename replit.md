# Trenatest Trading Dashboard

## Overview

A professional trading terminal UI built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. The application provides real-time market data visualization, order management, portfolio tracking, and a competition/gamification layer for traders. It supports dual-language (English/Persian) with RTL layout, dark/light themes, and is designed for both desktop and mobile experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Stack
- **Framework**: Next.js 14 with App Router for server-side rendering and routing
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS for utility-first styling, with CSS Modules for component isolation
- **Animation**: Framer Motion for smooth UI transitions and micro-interactions
- **Icons**: Lucide React for consistent iconography

### Project Structure
The codebase follows a hybrid structure with both Next.js App Router (`app/`) and a Vite-based React setup (`src/`):

```
app/                    # Next.js App Router pages and layouts
  dashboard/            # Dashboard section with nested routes
  fonts/                # Local font files
  globals.css           # Global styles
  layout.tsx            # Root layout with theme provider

components/             # Shared UI components
  dashboard/            # Dashboard-specific components (sidebar, bottom-nav)
  layout/               # Layout components (Header, MobileNav)
  market/               # Market data components (OrderBook, RecentTrades)
  positions/            # Position and order management
  trade/                # Trading interface components
  trading/cards/        # Card-based trading widgets
  ui/                   # Reusable UI primitives (MagicCard, FadeIn, etc.)

lib/                    # Utilities and data
  api/                  # API client with idempotency support
  data/                 # Mock data generators
  format.ts             # Number/price formatting with i18n
  i18n.ts               # Translation system (EN/FA)
  mockData.ts           # Static mock data

src/                    # Alternative Vite-based structure
  components/           # Common and trading components
  hooks/                # Custom React hooks
  pages/                # Route-level views
  services/             # API/WebSocket clients
  theme/                # Design tokens and CSS variables

types/                  # TypeScript type definitions
```

### State Management Strategy
- **Server State**: React Query pattern recommended for API data with SWR-style caching
- **UI State**: Zustand for global UI state (filters, theme, connection status)
- **Local State**: React useState for component-specific state
- **Real-time Data**: WebSocket feeds with ~10fps throttling and polling fallback

### Component Architecture
- **Presentational/Container Split**: Trading components separate UI from data logic
- **Atomic Design**: Components organized from atoms (Button, Input) to organisms (TradeTicket, OrderBook)
- **Virtualization**: react-window for high-performance lists (OrderBook, trade tables)

### Theme System
- **Dual Theme**: Dark (default) and light modes via `data-theme` attribute
- **Design Tokens**: CSS custom properties in `src/theme/tokens.css` covering colors, typography, spacing, shadows
- **RTL Support**: Full right-to-left layout support for Persian language
- **Accessibility**: WCAG 2.1 AA compliance target with 4.5:1 contrast ratios

### Responsive Layout
- **Desktop**: Sidebar navigation visible on the right (lg:flex)
- **Mobile**: Bottom navigation bar (BottomNav) with 4 main sections
- **Breakpoint**: lg (1024px) for switching between desktop/mobile layouts
- **Safe area**: Main content has pb-24 on mobile to avoid overlap with BottomNav

### Performance Considerations
- WebSocket data throttled to ~10fps to prevent excessive re-renders
- Selective memoization with React.memo/useMemo for trading components
- Code splitting via Next.js App Router
- Skeleton loading states for async content
- Route prefetching for faster navigation

## External Dependencies

### Core Framework
- `next@14.2.10` - React framework with App Router
- `react@18.3.1` / `react-dom@18.3.1` - UI library
- `typescript@5.6.3` - Type safety

### Styling & Animation
- `tailwindcss@3.4.10` - Utility-first CSS framework
- `framer-motion@^12.23.26` - Animation library
- `clsx@2.1.1` / `tailwind-merge@2.5.2` - Class name utilities

### UI Components
- `lucide-react@^0.562.0` - Icon library
- `next-themes@^0.4.6` - Theme switching support

### Development Tools
- `eslint@8.57.1` / `eslint-config-next` - Linting
- `postcss@8.4.41` / `autoprefixer` - CSS processing

### API Configuration
- Backend API base URL configured via `NEXT_PUBLIC_API_BASE_URL` environment variable
- Default fallback: `http://localhost:8080/api/v1`
- API client includes idempotency-key headers for mutating operations

### Planned Integrations (from architecture docs)
- WebSocket for real-time market data feeds
- HttpOnly cookies for secure token storage
- 2FA for sensitive trading operations