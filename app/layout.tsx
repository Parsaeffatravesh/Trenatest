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
        className={`${dana.variable} min-h-screen font-sans bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] text-neutral-900 antialiased transition-colors duration-300 dark:from-[#020617] dark:to-[#0b1224] dark:text-neutral-100`}
      >
        <Providers>
          <BottomNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
