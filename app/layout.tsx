import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/theme-provider";
import { dana } from "@/app/fonts";
import { BottomNav } from "@/components/dashboard/bottom-nav";

export const metadata: Metadata = {
  title: "Trenatest Dashboard",
  description: "Modern dashboard panel with smooth animations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        className={`${dana.variable} min-h-screen font-sans bg-[#020617] text-slate-100 antialiased`}
      >
        <Providers>
          <BottomNav />
          {children}
        </Providers>
// app/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'NeoTrader Pro | پنل معاملاتی حرفه‌ای',
  description: 'A refactored trading terminal experience built with Next.js and TypeScript.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0a0e17] text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
