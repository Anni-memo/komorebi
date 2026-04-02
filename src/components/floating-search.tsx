"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const suggestions = [
  "夜泣き",
  "離乳食",
  "予防接種",
  "保活",
  "児童手当",
  "発熱",
  "産後うつ",
  "RSVワクチン",
];

const routes: Record<string, string> = {
  夜泣き: "/learn/newborn-sleep",
  睡眠: "/learn/newborn-sleep",
  離乳食: "/learn/baby-food",
  予防接種: "/learn/vaccination-schedule",
  ワクチン: "/learn/vaccination-schedule",
  RSV: "/learn/rsv-vaccine",
  RSVワクチン: "/learn/rsv-vaccine",
  保活: "/learn/hokatsu",
  保育園: "/learn/hokatsu",
  児童手当: "/learn/postnatal-procedures",
  手続き: "/learn/postnatal-procedures",
  出生届: "/learn/postnatal-procedures",
  産後うつ: "/learn/mental-care",
  メンタル: "/learn/mental-care",
  発熱: "/learn/fever-guide",
  熱: "/learn/fever-guide",
};

export function FloatingSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  // トップページでは非表示（既に検索窓がある）
  if (pathname === "/") return null;

  const filtered = query
    ? suggestions.filter((s) => s.includes(query))
    : suggestions;

  function handleSearch(value: string) {
    const q = value.trim();
    if (!q) return;
    for (const [keyword, route] of Object.entries(routes)) {
      if (q.includes(keyword)) {
        router.push(route);
        setOpen(false);
        setQuery("");
        return;
      }
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
    setQuery("");
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <>
      {/* FABボタン */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all"
          aria-label="検索"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="9.5" cy="9.5" r="7" />
            <path d="M14.5 14.5L20 20" />
          </svg>
        </button>
      )}

      {/* 検索オーバーレイ */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-2xl p-5 pb-8 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 検索入力 */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
            >
              <div className="relative mb-4">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="7" cy="7" r="5" />
                  <path d="M11 11l3.5 3.5" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="気になることを検索"
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground px-2 py-1"
                >
                  閉じる
                </button>
              </div>
            </form>

            {/* サジェスト */}
            <p className="text-xs text-muted-foreground mb-2">よく検索されるキーワード</p>
            <div className="flex flex-wrap gap-2">
              {filtered.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSearch(s)}
                  className="px-3 py-1.5 text-xs rounded-full border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
