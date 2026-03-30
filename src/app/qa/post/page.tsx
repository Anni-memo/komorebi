"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const categoryOptions = [
  "睡眠",
  "離乳食",
  "体調",
  "発達",
  "保活",
  "手続き・制度",
  "買い物",
  "メンタル",
  "夫婦関係",
  "その他",
];

const ageTagOptions = [
  "妊娠中",
  "0歳",
  "1歳",
  "2歳",
  "3歳以上",
];

export default function QAPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [ageTag, setAgeTag] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim() || !category || !ageTag) {
      setError("すべての項目を入力してください。");
      return;
    }

    setSubmitting(true);

    try {
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from("qa_posts")
        .insert({
          title: title.trim(),
          content: content.trim(),
          category,
          age_tag: ageTag,
        });

      if (insertError) throw insertError;

      router.push("/qa?posted=success");
    } catch {
      setError(
        "投稿の保存に失敗しました。しばらくしてからもう一度お試しください。"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            相談を投稿する
          </h1>
          <p className="text-muted-foreground mb-6">
            匿名で相談できます。同じ悩みを持つ方からの共感や回答がもらえます。
          </p>

          <Card className="border-border/50 shadow-none">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* タイトル */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    タイトル
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="例：夜泣きがつらくて限界です"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    maxLength={100}
                  />
                </div>

                {/* 内容 */}
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    相談内容
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="状況や悩みを自由に書いてください。匿名で投稿されます。"
                    rows={6}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-y"
                    maxLength={2000}
                  />
                </div>

                {/* カテゴリ */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    カテゴリ
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  >
                    <option value="">選択してください</option>
                    {categoryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 子どもの年齢 */}
                <div>
                  <label
                    htmlFor="ageTag"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    お子さまの年齢
                  </label>
                  <select
                    id="ageTag"
                    value={ageTag}
                    onChange={(e) => setAgeTag(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  >
                    <option value="">選択してください</option>
                    {ageTagOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* エラー */}
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                {/* 送信ボタン */}
                <div className="flex gap-3">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "投稿中..." : "投稿する"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/qa")}
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
