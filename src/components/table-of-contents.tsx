"use client";

import { useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="border border-border/50 rounded-lg bg-muted/20 mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground"
      >
        <span className="flex items-center gap-2">
          <span aria-hidden>📑</span>
          目次（{items.length}項目）
        </span>
        <span className="text-muted-foreground text-xs">
          {open ? "閉じる" : "開く"}
        </span>
      </button>
      {open && (
        <nav className="px-4 pb-4">
          <ol className="space-y-1.5">
            {items.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-xs text-muted-foreground/60 mt-0.5 shrink-0 w-4 text-right">
                    {i + 1}.
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}
