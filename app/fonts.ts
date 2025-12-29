import localFont from "next/font/local";

export const dana = localFont({
  src: [
    {
      path: "./fonts/Dana-Regular_1751409247369.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Dana-Bold_1751409244371.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dana",
  display: "swap",
});
