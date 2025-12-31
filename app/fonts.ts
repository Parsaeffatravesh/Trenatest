import { Vazirmatn } from "next/font/google";

export const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});
