"use client";

import { useEffect, useState, useCallback } from "react";

let deferredPrompt: Event | null = null;

export function usePwaInstall() {
  const [hasNativePrompt, setHasNativePrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // 既にインストール済みか判定（standalone or fullscreen）
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches
    ) {
      setIsInstalled(true);
      return;
    }

    if (deferredPrompt) {
      setHasNativePrompt(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setHasNativePrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setHasNativePrompt(false);
      deferredPrompt = null;
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = useCallback(async () => {
    if (deferredPrompt) {
      // Chrome/Edge: ネイティブプロンプト
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (deferredPrompt as any).prompt();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (deferredPrompt as any).userChoice;
      if (result.outcome === "accepted") {
        setIsInstalled(true);
        setHasNativePrompt(false);
      }
      deferredPrompt = null;
    } else {
      // Firefox/Safari等: 手順ガイドを表示
      setShowGuide(true);
    }
  }, []);

  const closeGuide = useCallback(() => setShowGuide(false), []);

  return { hasNativePrompt, isInstalled, showGuide, install, closeGuide };
}
