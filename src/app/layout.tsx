import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { WebSiteJsonLd } from "@/components/seo/json-ld";
import { FloatingSearch } from "@/components/floating-search";
import { CookieBanner } from "@/components/cookie-banner";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FloatingMusic } from "@/components/floating-music";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://komorebi.constella-hd.co.jp"),
  title: {
    default: "こもれび — 子育ての案内所",
    template: "%s | こもれび",
  },
  description:
    "子育ての負担と不安を減らし、子に向ける時間を増やす。AIが状況を整理し、今必要な情報・手続き・準備を案内します。",
  keywords: ["子育て", "育児", "AI", "支援", "制度", "相談"],
  manifest: "/manifest.json",
  openGraph: {
    title: "こもれび — 子育ての案内所",
    description:
      "子育ての負担と不安を減らし、子に向ける時間を増やす。AIが状況を整理し、今必要な情報・手続き・準備を案内します。",
    type: "website",
    url: "https://komorebi.constella-hd.co.jp",
    siteName: "こもれび",
  },
  twitter: {
    card: "summary",
    title: "こもれび — 子育ての案内所",
    description:
      "子育ての負担と不安を減らし、子に向ける時間を増やす。AIが状況を整理し、今必要な情報・手続き・準備を案内します。",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#4a8c6f" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
        >
          メインコンテンツへスキップ
        </a>
        <WebSiteJsonLd />
        {children}
        <FloatingSearch />
        <ScrollToTop />
        <CookieBanner />
        <FloatingMusic />
        <PwaRegister />
        <Analytics />
      </body>
    </html>
  );
}
