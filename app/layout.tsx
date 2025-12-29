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
      </body>
    </html>
  );
}
