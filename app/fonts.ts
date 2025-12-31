import localFont from "next/font/local";

export const dana = localFont({
  src: [
    {
      path: "../public/fonts/Dana-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Dana-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dana",
  display: "swap",
});
