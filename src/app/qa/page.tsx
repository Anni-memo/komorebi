"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmpathyButton } from "@/components/qa/empathy-button";
import { createClient } from "@/lib/supabase/client";

const categories = [
  "すべて", "睡眠", "離乳食", "体調", "発達", "保活", "手続き・制度", "買い物", "メンタル", "夫婦関係",
];

const mockQuestions = [
  {
    id: "mock-1",
    title: "夜泣きがつらくて限界です",
    category: "睡眠",
    age_tag: "0歳",
    answers: 12,
    empathy: 45,
    excerpt: "生後3ヶ月の子どもの夜泣きが毎晩続いていて、自分の睡眠がほとんどとれません...",
  },
  {
    id: "mock-2",
    title: "保活はいつから始めましたか？",
    category: "保活",
    age_tag: "0歳",
    answers: 8,
    empathy: 23,
    excerpt: "来年4月に保育園に入れたいのですが、いつ頃から動き始めればいいでしょうか...",
  },
  {
    id: "mock-3",
    title: "離乳食を全然食べてくれません",
    category: "離乳食",
    age_tag: "0歳",
    answers: 15,
    empathy: 38,
    excerpt: "6ヶ月から始めましたが、ほとんど口を開けてくれません。このまま進めていいのか...",
  },
  {
    id: "mock-4",
    title: "育児に追われて自分の時間がない",
    category: "メンタル",
    age_tag: "1歳",
    answers: 20,
    empathy: 67,
    excerpt: "毎日が育児と家事で終わってしまい、自分のことを何もできていません...",
  },
  {
    id: "mock-5",
    title: "児童手当の申請、出生届と同時にできますか？",
    category: "手続き・制度",
    age_tag: "出産直後",
    answers: 5,
    empathy: 12,
    excerpt: "もうすぐ出産予定です。手続きが多くて不安なので、まとめてできるものを知りたい...",
  },
];

type Question = {
  id: string;
  title: string;
  category: string;
  age_tag: string;
  answers: number;
  empathy: number;
  excerpt: string;
};

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("qa_posts")
          .select("id, title, category, age_tag, content")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) throw error;

        if (data && data.length > 0) {
          setQuestions(
            data.map((post) => ({
              id: post.id,
              title: post.title,
              category: post.category,
              age_tag: post.age_tag,
              answers: 0,
              empathy: 0,
              excerpt:
                post.content.length > 60
                  ? post.content.slice(0, 60) + "..."
                  : post.content,
            }))
          );
        }
        // data が空の場合はモックデータのまま
      } catch {
        // テーブルが存在しない・接続エラーなどはモックデータで表示
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const filtered =
    selectedCategory === "すべて"
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">相談する</h1>
            <Link href="/qa/post">
              <Button size="sm">相談を投稿する</Button>
            </Link>
          </div>
          <p className="text-muted-foreground mb-6">
            同じ悩みの親の声を読んだり、匿名で相談できます。
          </p>

          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={cat === selectedCategory ? "default" : "outline"}
                className="px-3 py-1.5 text-xs cursor-pointer hover:bg-primary/5 transition-colors shrink-0"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              読み込み中...
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  このカテゴリの相談はまだありません。
                </div>
              ) : (
                filtered.map((q) => (
                  <Card
                    key={q.id}
                    className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <CardContent className="pt-5">
                      <h3 className="font-semibold text-foreground mb-1">
                        {q.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {q.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {q.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {q.age_tag}
                        </Badge>
                        <span>回答 {q.answers}</span>
                        <EmpathyButton initialCount={q.empathy} />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/learn"
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground text-sm font-medium px-2.5 h-8 transition-all"
            >
              この悩みの基本記事を見る
            </Link>
            <Link
              href="/concierge"
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground text-sm font-medium px-2.5 h-8 transition-all"
            >
              AIに整理してもらう
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
