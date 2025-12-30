import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/theme-provider";
import { vazirmatn } from "@/app/fonts";

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
    <html lang="fa" dir="rtl" suppressHydrationWarning style={{ fontFamily: 'var(--font-vazirmatn)' }} className={vazirmatn.variable}>
      <body style={{ fontFamily: 'var(--font-vazirmatn)' }} className="min-h-screen bg-[#020617] text-slate-100 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
