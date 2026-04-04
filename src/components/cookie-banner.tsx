"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "komorebi_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] bg-card border-t border-border/50 shadow-lg px-4 py-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          こもれびでは、サービスの改善と利用状況の分析のためにCookieを使用しています。
          詳しくは
          <Link href="/privacy" className="text-primary hover:underline">
            プライバシーポリシー
          </Link>
          をご覧ください。
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          同意する
        </button>
      </div>
    </div>
  );
}
