"use client";

import { useEffect, useState } from "react";

export function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Service Worker登録
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // SW登録失敗は無視（開発環境など）
      });
    }

    // インストールプロンプトをキャッチ
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      // 初回訪問 or 7日以上前に閉じた場合のみ表示
      const dismissed = localStorage.getItem("pwa-banner-dismissed");
      if (!dismissed || Date.now() - Number(dismissed) > 7 * 24 * 60 * 60 * 1000) {
        setShowBanner(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (installPrompt as any).prompt();
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("pwa-banner-dismissed", String(Date.now()));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md animate-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-xl border border-border/50 bg-card p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl" aria-hidden>🌿</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              こもれびをホーム画面に追加
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              アプリのようにすぐアクセスできます
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleDismiss}
            className="flex-1 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
          >
            あとで
          </button>
          <button
            onClick={handleInstall}
            className="flex-1 rounded-lg px-3 py-2 text-xs font-medium text-white transition-colors"
            style={{ backgroundColor: "#4a8c6f" }}
          >
            追加する
          </button>
        </div>
      </div>
    </div>
  );
}
