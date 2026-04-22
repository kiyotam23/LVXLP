import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { DepthBackground } from "@/components/DepthBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LVXLP | Shopping Landing",
  description:
    "フルスクリーン背景動画、スクロール演出、配送トラッカー風UIを備えたモダンLP（静的書き出し対応）。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white">
        <SmoothScroll>
          <DepthBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
