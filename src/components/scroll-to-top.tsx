"use client";

import { useState, useEffect } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-4 z-[9997] w-10 h-10 rounded-full bg-primary/80 text-primary-foreground shadow-md hover:bg-primary transition-colors flex items-center justify-center text-lg"
      aria-label="ページの先頭へ戻る"
    >
      ↑
    </button>
  );
}
