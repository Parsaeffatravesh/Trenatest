import localFont from "next/font/local";

export const vazirmatn = localFont({
  src: [
    {
      path: "./fonts/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});
