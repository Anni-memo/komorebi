"use client";

import { useEffect, useState } from "react";

interface Bookmark {
  url: string;
  title: string;
  savedAt: string;
}

const STORAGE_KEY = "komorebi-bookmarks";

function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: Bookmark[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function BookmarkButton({
  articleUrl,
  articleTitle,
}: {
  articleUrl: string;
  articleTitle: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const bookmarks = getBookmarks();
    setSaved(bookmarks.some((b) => b.url === articleUrl));
  }, [articleUrl]);

  function toggle() {
    const bookmarks = getBookmarks();
    const exists = bookmarks.some((b) => b.url === articleUrl);

    if (exists) {
      const updated = bookmarks.filter((b) => b.url !== articleUrl);
      saveBookmarks(updated);
      setSaved(false);
    } else {
      bookmarks.push({
        url: articleUrl,
        title: articleTitle,
        savedAt: new Date().toISOString(),
      });
      saveBookmarks(bookmarks);
      setSaved(true);
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "ブックマークを解除" : "ブックマークに追加"}
      className="inline-flex items-center justify-center rounded-full p-2 transition-colors hover:bg-muted/50"
    >
      {saved ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-pink-500"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 text-muted-foreground"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      )}
    </button>
  );
}

export { getBookmarks, saveBookmarks, STORAGE_KEY };
export type { Bookmark };
