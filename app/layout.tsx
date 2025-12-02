import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NeoTrader Pro | پنل معاملاتی حرفه‌ای',
  description: 'A refactored trading terminal experience built with Next.js and TypeScript.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0a0e17] text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
