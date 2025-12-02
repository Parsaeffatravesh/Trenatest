import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NeoTrader Pro | پنل معاملاتی حرفه‌ای',
  description: 'نسخه Next.js و TypeScript از داشبورد معاملاتی NeoTrader.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
