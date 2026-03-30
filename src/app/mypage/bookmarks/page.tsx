"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  type Bookmark,
  STORAGE_KEY,
} from "@/components/bookmark-button";

function getBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBookmarks(getBookmarks());
    setMounted(true);
  }, []);

  function removeBookmark(url: string) {
    const updated = bookmarks.filter((b) => b.url !== url);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setBookmarks(updated);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">保存した記事</h1>
            <Link href="/mypage">
              <Button variant="outline" size="sm">
                マイページに戻る
              </Button>
            </Link>
          </div>

          {mounted && bookmarks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                保存した記事はありません
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                記事のハートアイコンをタップすると、ここに保存されます。
              </p>
            </div>
          )}

          <div className="space-y-3">
            {bookmarks.map((bookmark) => (
              <Card
                key={bookmark.url}
                className="border-border/50 shadow-none"
              >
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={bookmark.url}
                        className="font-medium text-foreground hover:text-primary transition-colors text-sm leading-relaxed line-clamp-2"
                      >
                        {bookmark.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(bookmark.savedAt).toLocaleDateString("ja-JP")}
                        に保存
                      </p>
                    </div>
                    <button
                      onClick={() => removeBookmark(bookmark.url)}
                      className="shrink-0 text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1"
                      aria-label="削除"
                    >
                      削除
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
