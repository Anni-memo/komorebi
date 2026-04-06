"use client";

import { useEffect } from "react";

function detectBrowser(): "ios-safari" | "ios-other" | "android-chrome" | "android-firefox" | "desktop-firefox" | "desktop-chrome" | "other" {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  const isChrome = /Chrome/.test(ua) && !/Edg/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);

  if (isIOS && isSafari) return "ios-safari";
  if (isIOS) return "ios-other";
  if (isAndroid && isChrome) return "android-chrome";
  if (isAndroid && isFirefox) return "android-firefox";
  if (isFirefox) return "desktop-firefox";
  if (isChrome) return "desktop-chrome";
  return "other";
}

const guides: Record<string, { title: string; steps: string[] }> = {
  "ios-safari": {
    title: "iPhoneでホーム画面に追加",
    steps: [
      "画面下の「共有」ボタン（□↑）をタップ",
      "「ホーム画面に追加」をタップ",
      "「追加」をタップ",
    ],
  },
  "ios-other": {
    title: "iPhoneでホーム画面に追加",
    steps: [
      "Safariでこのページを開いてください",
      "画面下の「共有」ボタン（□↑）をタップ",
      "「ホーム画面に追加」をタップ",
    ],
  },
  "android-firefox": {
    title: "Firefoxでホーム画面に追加",
    steps: [
      "右上の「︙」メニューをタップ",
      "「ホーム画面にショートカットを追加」をタップ",
      "「追加」をタップ",
    ],
  },
  "desktop-firefox": {
    title: "Firefoxでアプリとして追加",
    steps: [
      "アドレスバーのURLをコピーします",
      "Chrome または Edge でこのURLを開きます",
      "アドレスバー右の「インストール」アイコンをクリック",
    ],
  },
  "desktop-chrome": {
    title: "Chromeでアプリとして追加",
    steps: [
      "アドレスバー右のインストールアイコン（⊕）をクリック",
      "「インストール」をクリック",
    ],
  },
  "other": {
    title: "ホーム画面に追加",
    steps: [
      "ブラウザのメニューを開きます",
      "「ホーム画面に追加」または「アプリをインストール」を選択",
    ],
  },
};

export function PwaInstallGuide({ onClose }: { onClose: () => void }) {
  const browser = typeof navigator !== "undefined" ? detectBrowser() : "other";
  const guide = guides[browser] || guides.other;

  // ESCキーで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative bg-card rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🌿</span>
          <div>
            <h3 className="font-bold text-foreground text-base">{guide.title}</h3>
            <p className="text-xs text-muted-foreground">アプリのようにすぐアクセスできます</p>
          </div>
        </div>

        <ol className="space-y-3 mb-5">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-foreground leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        <button
          onClick={onClose}
          className="w-full rounded-xl py-2.5 text-sm font-medium text-primary-foreground transition-colors"
          style={{ backgroundColor: "#4a8c6f" }}
        >
          わかりました
        </button>
      </div>
    </div>
  );
}
