# Trenatest User Dashboard

## Overview

A bilingual user dashboard panel built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. The application provides competition management, user profile, and dashboard features. It supports both Persian (RTL) and English (LTR) languages with a language switcher in the profile page. Dark-only theme designed for both desktop and mobile experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (December 2025)

- **Top Navbar**: Added navbar with wallet balance display (click to deposit/withdraw) and notifications
- **Notifications Panel**: Badge with unread count, dropdown panel, "mark all read" button
- **Wallet Modal**: Deposit/withdraw functionality with network selection
- **Sharper UI**: Reduced border-radius from 32px to xl for cleaner look
- **Space Optimization**: Better use of screen space with reduced padding/gaps
- **Bilingual Support**: Complete i18n system with Persian/English translations
- **Language Switcher**: Profile page toggle between Persian and English
- **RTL/LTR Direction**: Layout direction dynamically adjusts based on language
- **Font**: Vazirmatn from Google Fonts - English numerals by default
- **Dark-Only Theme**: Removed light theme to prevent hydration issues

## System Architecture

### Frontend Stack
- **Framework**: Next.js 14 with App Router for server-side rendering and routing
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS for utility-first styling
- **Animation**: CSS animations (fadeInUp, pageIn) for performance
- **Icons**: Lucide React for consistent iconography
- **i18n**: Custom context-based internationalization system

### Project Structure
```
app/                    # Next.js App Router pages and layouts
  dashboard/            # Dashboard section with nested routes
    competitions/       # All competitions page
    my-competitions/    # User's competitions page
    profile/            # User profile with language switcher
  fonts.ts              # Vazirmatn font configuration
  globals.css           # Global styles with animations
  layout.tsx            # Root layout with i18n provider

components/             # Shared UI components
  dashboard/            # Dashboard-specific components
    sidebar.tsx         # Desktop sidebar (direction-aware)
    bottom-nav.tsx      # Mobile bottom navigation
    overview-chart.tsx  # Dashboard chart component
  ui/                   # Reusable UI primitives

lib/                    # Utilities
  i18n/                 # Internationalization
    context.tsx         # I18nProvider and useI18n hook
    translations.ts     # Persian/English translations
    index.ts            # Export barrel
  api/                  # API client
  format.ts             # Number formatting
  utils.ts              # Utility functions
```

### i18n System
- **Context-based**: I18nProvider wraps the app in theme-provider.tsx
- **Translations**: All UI text in lib/i18n/translations.ts (fa/en)
- **Persistence**: Language choice saved to localStorage
- **Direction**: RTL for Persian, LTR for English - applied to sidebar and layout

### Theme System
- **Dark Only**: Single dark theme to prevent hydration mismatches
- **Design Tokens**: CSS custom properties for colors, typography
- **RTL/LTR Support**: Full bidirectional layout based on language
- **Accessibility**: High contrast ratios, reduced motion support

### Responsive Layout
- **Desktop**: Sidebar navigation (direction-aware based on language)
- **Mobile**: Bottom navigation bar with 4 main sections
- **Breakpoint**: lg (1024px) for switching between desktop/mobile layouts
- **Safe area**: Main content has pb-24 on mobile to avoid overlap with BottomNav

### Performance Considerations
- CSS animations with will-change and transform for GPU acceleration
- React.memo for static components (sidebar menu items)
- requestAnimationFrame throttling for MagicCard effects
- Removed backdrop-blur filters for better performance
- Smart prefetch (onHover instead of always-on)
- prefers-reduced-motion support for accessibility

## External Dependencies

### Core Framework
- `next@14.2.10` - React framework with App Router
- `react@18.3.1` / `react-dom@18.3.1` - UI library
- `typescript@5.6.3` - Type safety

### Styling & Animation
- `tailwindcss@3.4.10` - Utility-first CSS framework
- `framer-motion@^12.23.26` - Animation library (minimal use)
- `clsx@2.1.1` / `tailwind-merge@2.5.2` - Class name utilities

### UI Components
- `lucide-react@^0.562.0` - Icon library
- `next-themes@^0.4.6` - Theme provider wrapper

### Development Tools
- `eslint@8.57.1` / `eslint-config-next` - Linting
- `postcss@8.4.41` / `autoprefixer` - CSS processing
