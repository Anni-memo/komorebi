"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const suggestions = [
  "夜泣き",
  "離乳食",
  "予防接種",
  "保活",
  "児童手当",
  "おしりふき",
  "産後うつ",
  "発熱",
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const composingRef = useRef(false);
  const router = useRouter();

  const filtered = query
    ? suggestions.filter((s) => s.includes(query))
    : suggestions;

  function handleSearch(value: string) {
    const q = value.trim();
    if (!q) return;

    const routes: Record<string, string> = {
      夜泣き: "/learn/newborn-sleep",
      睡眠: "/learn/newborn-sleep",
      離乳食: "/learn/baby-food",
      予防接種: "/learn/vaccination-schedule",
      ワクチン: "/learn/vaccination-schedule",
      RSV: "/learn/rsv-vaccine",
      保活: "/learn/hokatsu",
      保育園: "/learn/hokatsu",
      児童手当: "/learn/postnatal-procedures",
      手続き: "/learn/postnatal-procedures",
      出生届: "/learn/postnatal-procedures",
      おしりふき: "/prepare/wipes",
      産後うつ: "/learn/mental-care",
      メンタル: "/learn/mental-care",
      発熱: "/learn/fever-guide",
      熱: "/learn/fever-guide",
    };

    for (const [keyword, route] of Object.entries(routes)) {
      if (q.includes(keyword)) {
        router.push(route);
        return;
      }
    }

    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="relative max-w-lg mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
      >
        <div className="relative">
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
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onCompositionStart={() => { composingRef.current = true; }}
            onCompositionEnd={(e) => {
              composingRef.current = false;
              setQuery((e.target as HTMLInputElement).value);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="気になることを検索（例：夜泣き、離乳食、予防接種）"
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
      </form>

      {focused && filtered.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-background border border-border rounded-xl shadow-lg z-10 py-2">
          <p className="text-xs text-muted-foreground px-4 py-1">
            よく検索されるキーワード
          </p>
          <div className="flex flex-wrap gap-1.5 px-4 py-2">
            {filtered.map((s) => (
              <button
                key={s}
                type="button"
                onMouseDown={() => handleSearch(s)}
                className="px-3 py-1 text-xs rounded-full border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
