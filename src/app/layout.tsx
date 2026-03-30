import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "こもれび — 子育ての案内所",
    template: "%s | こもれび",
  },
  description:
    "子育ての負担と不安を減らし、子に向ける時間を増やす。AIが状況を整理し、今必要な情報・手続き・準備を案内します。",
  keywords: ["子育て", "育児", "AI", "支援", "制度", "相談"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
