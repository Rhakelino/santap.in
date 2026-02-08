import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Santap.in - Cookies, Brownies & More",
  description: "Baked with passion, served with love.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={outfit.variable}>{children}</body>
    </html>
  );
}
