import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { assetUrl } from "@/lib/base-path";
import { profile } from "@/lib/content";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.nameZh} · ${profile.role}`,
    template: `%s · ${profile.nameZh}`,
  },
  description: `${profile.nameZh}（${profile.nameEnReading}），${profile.role}。AI 短视频编导作品集与简历。${profile.mark}。`,
};

const fontFaces = [
  ["Noto Sans SC", 400, "noto-sans-sc-400.woff2"],
  ["Noto Sans SC", 500, "noto-sans-sc-500.woff2"],
  ["Noto Sans SC", 700, "noto-sans-sc-700.woff2"],
  ["Noto Serif SC", 500, "noto-serif-sc-500.woff2"],
  ["Noto Serif SC", 700, "noto-serif-sc-700.woff2"],
]
  .map(
    ([family, weight, file]) => `@font-face{font-family:"${family}";src:url("${assetUrl(`/fonts/${file}`)}") format("woff2");font-weight:${weight};font-style:normal;font-display:swap;}`,
  )
  .join("");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`dark ${geist.variable} ${mono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
      </head>
      <body className="min-h-screen bg-[#050913] text-[#f6eddf] antialiased">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
