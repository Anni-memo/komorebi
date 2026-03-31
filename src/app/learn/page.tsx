import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

const categories = [
  { label: "月齢別", value: "age" },
  { label: "悩み別", value: "concern" },
  { label: "身体発達", value: "development" },
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
    title: "妊娠中・産後の食事ガイド",
    tag: "食事",
    audience: "妊婦・授乳中の方向け",
    readTime: "5分で読める",
    summary: "必要な栄養素・避けるべき食品・つわり中の食事のコツをエビデンスに基づいて整理。",
    href: "/learn/pregnancy-nutrition",
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
    title: "妊娠中の体調トラブルと病気ガイド",
    tag: "健康・病気",
    audience: "妊婦向け",
    readTime: "5分で読める",
    summary: "つわり・妊娠高血圧・妊娠糖尿病など、妊娠中に気をつけたい症状と受診の目安を整理。",
    href: "/learn/pregnancy-health",
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
    title: "子どもがかかりやすい病気ガイド",
    tag: "健康・病気",
    audience: "すべての親向け",
    readTime: "保存版",
    summary: "突発性発疹・手足口病・RSウイルスなど、乳幼児の病気の症状・対応・受診の目安をまとめて確認。",
    href: "/learn/child-illness",
  },
  {
    title: "ベビー服・肌着の選びかた",
    tag: "出産準備",
    audience: "妊婦・すべての親向け",
    readTime: "5分で読める",
    summary: "短肌着、コンビ肌着、ツーウェイオール...種類・枚数・季節別の組み合わせを整理。",
    href: "/learn/baby-clothing",
  },
  {
    title: "沐浴・お風呂ガイド",
    tag: "日常ケア",
    audience: "新生児の親向け",
    readTime: "5分で読める",
    summary: "沐浴の手順・お湯の温度・よくある不安への対処法。1ヶ月健診後のお風呂移行も。",
    href: "/learn/bathing-guide",
  },
  {
    title: "赤ちゃんの行事カレンダー",
    tag: "行事・イベント",
    audience: "0歳〜1歳の親向け",
    readTime: "5分で読める",
    summary: "お七夜・お宮参り・お食い初めなど、1年間の行事を時系列で解説。費用目安付き。",
    href: "/learn/baby-events",
  },
  {
    title: "入院バッグ準備リスト",
    tag: "出産準備",
    audience: "妊婦向け",
    readTime: "保存版",
    summary: "陣痛バッグ・入院バッグ・赤ちゃん用を分けてリスト化。36週までに準備を。",
    href: "/learn/hospital-bag",
  },
  {
    title: "妊娠後期にできるマタニティヨガ",
    tag: "運動・ヨガ",
    audience: "妊婦向け",
    readTime: "5分で読める",
    summary: "腰痛・むくみに悩む妊娠後期のママへ。自宅で安全にできるポーズ5つと注意点を初心者向けに解説。",
    href: "/learn/maternity-yoga",
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
    title: "新生児のまくら｜必要性・窒息リスク・商品比較",
    tag: "睡眠",
    audience: "0歳の親向け",
    readTime: "5分で読める",
    summary: "まくらは必要？窒息リスクは？人気5商品の比較と、安全に使うためのルールを整理。",
    href: "/learn/baby-pillow",
  },
  {
    title: "身体調和ガイド｜赤ちゃんの発達を月齢で知る",
    tag: "身体発達",
    audience: "0〜3歳の親向け",
    readTime: "保存版",
    summary: "呼吸・摂食・運動・感覚統合の4領域から、月齢別の発達の連鎖を整理。「なぜ今これが大切か」がわかる。",
    href: "/learn/body-harmony",
  },
  {
    title: "知育の基本ガイド｜月齢別の発達と遊び",
    tag: "発達・知育",
    audience: "すべての親向け",
    readTime: "5分で読める",
    summary: "月齢別の発達の特徴と、家庭でできる知育遊びを整理。特別な教材は不要。",
    href: "/learn/early-education",
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
