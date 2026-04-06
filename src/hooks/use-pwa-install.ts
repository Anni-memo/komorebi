"use client";

import { useEffect, useState, useCallback } from "react";

let deferredPrompt: Event | null = null;

export function usePwaInstall() {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 既にインストール済みか判定（standalone or fullscreen）
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches
    ) {
      setIsInstalled(true);
      return;
    }

    // 既にキャッチ済みのプロンプトがあれば利用
    if (deferredPrompt) {
      setCanInstall(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // インストール完了を検知
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setCanInstall(false);
      deferredPrompt = null;
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (deferredPrompt as any).prompt();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (deferredPrompt as any).userChoice;
    if (result.outcome === "accepted") {
      setIsInstalled(true);
      setCanInstall(false);
    }
    deferredPrompt = null;
  }, []);

  return { canInstall, isInstalled, install };
}
