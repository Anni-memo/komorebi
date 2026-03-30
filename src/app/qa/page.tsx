import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

const categories = [
  "すべて", "睡眠", "離乳食", "体調", "発達", "保活", "手続き・制度", "買い物", "メンタル", "夫婦関係",
];

const questions = [
  {
    title: "夜泣きがつらくて限界です",
    category: "睡眠",
    ageTag: "0歳",
    answers: 12,
    empathy: 45,
    excerpt: "生後3ヶ月の子どもの夜泣きが毎晩続いていて、自分の睡眠がほとんどとれません...",
  },
  {
    title: "保活はいつから始めましたか？",
    category: "保活",
    ageTag: "0歳",
    answers: 8,
    empathy: 23,
    excerpt: "来年4月に保育園に入れたいのですが、いつ頃から動き始めればいいでしょうか...",
  },
  {
    title: "離乳食を全然食べてくれません",
    category: "離乳食",
    ageTag: "0歳",
    answers: 15,
    empathy: 38,
    excerpt: "6ヶ月から始めましたが、ほとんど口を開けてくれません。このまま進めていいのか...",
  },
  {
    title: "育児に追われて自分の時間がない",
    category: "メンタル",
    ageTag: "1歳",
    answers: 20,
    empathy: 67,
    excerpt: "毎日が育児と家事で終わってしまい、自分のことを何もできていません...",
  },
  {
    title: "児童手当の申請、出生届と同時にできますか？",
    category: "手続き・制度",
    ageTag: "出産直後",
    answers: 5,
    empathy: 12,
    excerpt: "もうすぐ出産予定です。手続きが多くて不安なので、まとめてできるものを知りたい...",
  },
];

export default function QAPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">相談する</h1>
            <button className={buttonVariants({ size: "sm" })}>相談を投稿する</button>
          </div>
          <p className="text-muted-foreground mb-6">
            同じ悩みの親の声を読んだり、匿名で相談できます。
          </p>

          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={cat === "すべて" ? "default" : "outline"}
                className="px-3 py-1.5 text-xs cursor-pointer hover:bg-primary/5 transition-colors shrink-0"
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            {questions.map((q) => (
              <Card
                key={q.title}
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
                    <Badge variant="secondary" className="text-xs">{q.category}</Badge>
                    <Badge variant="outline" className="text-xs">{q.ageTag}</Badge>
                    <span>回答 {q.answers}</span>
                    <span>共感 {q.empathy}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/learn" className={buttonVariants({ variant: "outline" })}>
              この悩みの基本記事を見る
            </Link>
            <Link href="/concierge" className={buttonVariants({ variant: "outline" })}>
              AIに整理してもらう
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
