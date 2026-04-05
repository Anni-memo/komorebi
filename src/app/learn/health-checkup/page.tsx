import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

export const metadata = {
  title: "��幼児健診ガイド｜月齢別にわかる健診の流れと準備",
  description:
    "3-4ヶ月・6-7ヶ月・1歳半・3歳の乳幼児健診を月齢別に解説。当日の流れ、チェック項目、持ち物、よくある質問をまとめました。",
};

const checkups = [
  {
    id: "3-4months",
    age: "3〜4ヶ月",
    title: "首すわりと成長の確認",
    icon: "👶",
    color: "bg-sky-100 text-sky-700 border-sky-200",
    borderColor: "border-l-sky-400",
    summary:
      "首すわり・追視・あやし笑い。赤ちゃんの発達の最初のチェックポイント。多くの自治体で最も早い集団健診です。",
    checkItems: [
      "首すわりの確認",
      "体重・身長・頭囲の測定",
      "追視（目で追うか）",
      "あやし笑いがあるか",
      "股関節脱臼の確認",
    ],
  },
  {
    id: "6-7months",
    age: "6〜7ヶ月",
    title: "おすわりと離乳食のスタート",
    icon: "🍼",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    borderColor: "border-l-emerald-400",
    summary:
      "おすわり・寝返り・離乳食の進み具合。この時期は成長に個人差が出やすく、不安を感じやすい時期でもあります。",
    checkItems: [
      "おすわりの安定度",
      "寝返りができるか",
      "手を伸ばして物をつかむか",
      "離乳食の進み具合",
      "人見知りの有無",
    ],
  },
  {
    id: "18months",
    age: "1歳6ヶ月",
    title: "歩行とことばの芽生え",
    icon: "🚶",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    borderColor: "border-l-amber-400",
    summary:
      "ひとり歩き・意味のある言葉・指さし。運動面と言語面の発達を総合的に確認する重要な健診です。",
    checkItems: [
      "ひとり歩きができるか",
      "意味のある言葉（ママ、ワンワン等）",
      "指さしで要求や共感を示すか",
      "積み木を2〜3個積めるか",
      "歯の状態（虫歯・歯並び）",
    ],
  },
  {
    id: "3years",
    age: "3歳",
    title: "ことば・社会性・視聴覚の総チェック",
    icon: "🎨",
    color: "bg-violet-100 text-violet-700 border-violet-200",
    borderColor: "border-l-violet-400",
    summary:
      "二語文・お友達との関わり・視力と聴力。就園前に行われる最も包括的な健診。事前アンケートが多いのも特徴です。",
    checkItems: [
      "二語文以上で話せるか",
      "名前・年齢が言えるか",
      "視力検査（自宅で事前練習）",
      "聴力検査",
      "お友達と遊べるか",
      "排泄の自立度",
    ],
  },
];

const generalTips = [
  {
    icon: "📋",
    title: "母子健康手帳",
    detail: "必ず持参。成長曲線の記録・予防接種歴の確認に使います。",
  },
  {
    icon: "👶",
    title: "着脱しやすい服装",
    detail: "身体測定があるため、脱がせやすい前開きの服がおすすめ。",
  },
  {
    icon: "📝",
    title: "質問メモ",
    detail: "聞きたいことを事前にメモしておくと、短い診察時間を有効に使えます。",
  },
  {
    icon: "🧸",
    title: "お気に入りのおもちゃ",
    detail: "待ち時間が長いことも。お気に入りがあると安心です。",
  },
  {
    icon: "🍼",
    title: "ミルク・おやつ・おむつ",
    detail: "2時間程度かかることもあるため、授乳・おむつ替えの準備を。",
  },
];

export default function HealthCheckupPage() {
  return (
    <>
      <ArticleJsonLd
        title="乳幼児健診ガイド｜月齢別にわかる健診の流れと準備"
        description="3-4ヶ月・6-7ヶ月・1歳半・3歳の乳幼児健診を月齢別に解説。当日の流れ、チェック項目、持ち物、よくある質問をまとめました。"
        path="/learn/health-checkup"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["乳幼児健診", "健診 準備", "月齢別"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <section className="mb-10">
            <BreadcrumbNav items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "乳幼児健診ガイド" },
            ]} />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-rose-100 text-rose-700 border-rose-200 border text-xs">
                健康・病気
              </Badge>
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 border text-xs">
                健診
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              乳幼児健診ガイド
            </h1>
            <ArticleMeta updatedAt="2026-04-05" />
            <p className="text-muted-foreground leading-relaxed mt-3">
              乳幼児健診は、赤ちゃんの成長と発達を専門家と一緒に確認できる大切な機会です。
              「何を見られるの？」「準備は？」——月齢別に流れとポイントを整理しました。
            </p>
          </section>

          <TableOfContents items={[
            { id: "overview", label: "乳幼児健診とは" },
            { id: "guide", label: "月齢別ガイド" },
            { id: "preparation", label: "どの健診にも共通の準備" },
          ]} />

          {/* 概要カード */}
          <section id="overview" className="mb-10">
            <Card className="bg-komorebi-light/20 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-bold text-foreground text-sm mb-2">
                  乳幼児健診とは
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  母子保健法に基づき、自治体が実施する無料の健康診査です。
                  身体の成長だけでなく、発達・栄養・育児環境を総合的に確認します。
                  1歳6ヶ月健診と3歳児健診は法律で義務づけられており、
                  3-4ヶ月・6-7ヶ月健診は多くの自治体で実施されています。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 月齢別ガイド一覧 */}
          <section id="guide" className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📅</span>
              月齢別ガイド
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              各健診の詳しい内容・当日の流れ・よくある質問は、それぞれのページでご確認ください。
            </p>
            <div className="space-y-4">
              {checkups.map((c) => (
                <Link
                  key={c.id}
                  href={`/learn/health-checkup/${c.id}`}
                  className="block group"
                >
                  <Card
                    className={`border-l-4 ${c.borderColor} border-t-0 border-r-0 border-b border-b-border/50 shadow-none hover:bg-muted/30 transition-colors`}
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        <span
                          className="text-2xl shrink-0 mt-0.5"
                          aria-hidden
                        >
                          {c.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={`${c.color} border text-xs`}
                            >
                              {c.age}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                            {c.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {c.summary}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {c.checkItems.slice(0, 3).map((item) => (
                              <span
                                key={item}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                              >
                                {item}
                              </span>
                            ))}
                            {c.checkItems.length > 3 && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                +{c.checkItems.length - 3}項目
                              </span>
                            )}
                          </div>
                        </div>
                        <span
                          className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2"
                          aria-hidden
                        >
                          →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          {/* 共通の持ち物・準備 */}
          <section id="preparation" className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🎒</span>
              どの健診にも共通の準備
            </h2>
            <div className="space-y-3">
              {generalTips.map((tip) => (
                <Card
                  key={tip.title}
                  className="border-border/50 shadow-none"
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-lg shrink-0" aria-hidden>
                        {tip.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">
                          {tip.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {tip.detail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <p className="text-sm text-foreground leading-relaxed font-medium mb-2">
                健診は「テスト」ではありません
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                発達の進み方はお子さまそれぞれ。健診は、今のお子さまの状態を専門家と一緒に確認し、
                必要なサポートを早めに受けるための機会です。
                「できていないこと」より「次にどう見守るか」を一緒に考える場だと思ってください。
              </p>
            </CardContent>
          </Card>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              このページは一般的な健診情報を整理したものであり、医療的な診断・助言を目的としたものではありません。
              健診の内容や時期は自治体によって異なる場合があります。
              詳しくはお住まいの自治体や保健センターにお問い合わせください。
            </p>
          </div>

          <ShareButtons title="乳幼児健診ガイド" path="/learn/health-checkup" />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn"
              className={buttonVariants({ variant: "outline" })}
            >
              学ぶトップに戻る
            </Link>
            <Link
              href="/learn/vaccination-schedule"
              className={buttonVariants({ variant: "outline" })}
            >
              予防接種スケジュール
            </Link>
            <Link
              href="/concierge"
              className={buttonVariants({ variant: "ghost" })}
            >
              AIに相談する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
