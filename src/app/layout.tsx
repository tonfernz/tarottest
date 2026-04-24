import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const notoThai = localFont({
  src: [
    {
      path: "../../font/NotoSansThai-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../font/NotoSansThai-SemiBold.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "../../font/NotoSansThai-Bold.ttf",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-noto-thai",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Earth Tone Tarot Reading",
  description: "A soft three-card tarot reading experience."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={notoThai.variable}>
      <body className="font-thai antialiased">{children}</body>
    </html>
  );
}
