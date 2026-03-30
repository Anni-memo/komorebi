import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

const categories = [
  { label: "月齢別", value: "age" },
  { label: "悩み別", value: "concern" },
  { label: "制度", value: "benefits" },
  { label: "買い物", value: "shopping" },
  { label: "メンタル", value: "mental" },
];

const articles = [
  {
    title: "RSVワクチン（アブリスボ）判断ガイド",
    tag: "予防接種",
    audience: "妊婦向け",
    readTime: "5分で読める",
    summary: "2026年4月から定期接種化。リスク・リターン・最新のエビデンスを整理。",
    href: "/learn/rsv-vaccine",
  },
  {
    title: "予防接種スケジュール＆チェックリスト",
    tag: "予防接種",
    audience: "すべての親向け",
    readTime: "保存版",
    summary: "月齢別の定期・任意接種スケジュール。接種済みチェック機能付き。",
    href: "/learn/vaccination-schedule",
  },
  {
    title: "新生児の睡眠パターンを知ろう",
    tag: "睡眠",
    audience: "0歳の親向け",
    readTime: "3分で読める",
    summary: "夜泣きの原因と、親の負担を減らすための基本的な知識を整理。",
    href: "/learn/newborn-sleep",
  },
  {
    title: "離乳食のはじめかた",
    tag: "食事",
    audience: "5〜6ヶ月の親向け",
    readTime: "5分で読める",
    summary: "いつから、何から始めるか。進め方の基本と困ったときの対処。",
    href: "/learn/baby-food",
  },
  {
    title: "出産後に必要な手続き一覧",
    tag: "手続き",
    audience: "出産直後の方向け",
    readTime: "保存版",
    summary: "出生届・健康保険・児童手当など、期限のある手続きをまとめて確認。",
    href: "/learn/postnatal-procedures",
  },
  {
    title: "保活の基本と始めるタイミング",
    tag: "保活",
    audience: "保育園を考えている方向け",
    readTime: "5分で読める",
    summary: "申請時期・見学のポイント・必要書類など、全体像を把握する。",
    href: "/learn/hokatsu",
  },
  {
    title: "子どもの発熱対応ガイド",
    tag: "健康・病気",
    audience: "すべての親向け",
    readTime: "保存版",
    summary: "月齢別の対応・受診の目安・家でできるケア・救急に行くべきサイン。#8000の使い方も。",
    href: "/learn/fever-guide",
  },
  {
    title: "産後のメンタルケア",
    tag: "メンタル",
    audience: "すべての親向け",
    readTime: "3分で読める",
    summary: "つらいときは自然なこと。相談先と、自分を責めないための考え方。",
    href: "/learn/mental-care",
  },
  {
    title: "地域の子育て支援制度の調べかた",
    tag: "制度",
    audience: "すべての親向け",
    readTime: "3分で読める",
    summary: "自治体ごとに異なる支援制度を効率よく調べる方法。",
  },
];

export default function LearnPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">学ぶ</h1>
          <p className="text-muted-foreground mb-6">
            必要な知識を、あなたの状況に合わせて整理しています。
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <Badge
                key={cat.value}
                variant="outline"
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/5 transition-colors"
              >
                {cat.label}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            {articles.map((article) => {
              const card = (
              <Card
                className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer"
              >
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        {article.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">{article.tag}</Badge>
                        <span className="text-xs text-muted-foreground">{article.audience}</span>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
              return article.href ? (
                <Link key={article.title} href={article.href} className="block">{card}</Link>
              ) : (
                <div key={article.title}>{card}</div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link href="/concierge" className={buttonVariants({ variant: "outline" })}>
              AIに絞り込みを相談する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
