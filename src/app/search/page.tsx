"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const searchIndex = [
  { title: "RSVワクチン判断ガイド", type: "記事", keywords: ["RSV", "ワクチン", "予防接種", "妊婦", "アブリスボ"], href: "/learn/rsv-vaccine" },
  { title: "予防接種スケジュール", type: "記事", keywords: ["予防接種", "ワクチン", "BCG", "ヒブ", "肺炎球菌"], href: "/learn/vaccination-schedule" },
  { title: "新生児の睡眠パターン", type: "記事", keywords: ["睡眠", "夜泣き", "寝かしつけ", "SIDS"], href: "/learn/newborn-sleep" },
  { title: "離乳食のはじめかた", type: "記事", keywords: ["離乳食", "食事", "アレルギー", "5ヶ月"], href: "/learn/baby-food" },
  { title: "出産後に必要な手続き", type: "記事", keywords: ["手続き", "出生届", "児童手当", "健康保険", "マイナンバー"], href: "/learn/postnatal-procedures" },
  { title: "産後のメンタルケア", type: "記事", keywords: ["メンタル", "産後うつ", "相談", "カウンセリング"], href: "/learn/mental-care" },
  { title: "保活ガイド", type: "記事", keywords: ["保活", "保育園", "申請", "見学", "点数"], href: "/learn/hokatsu" },
  { title: "子どもの発熱対応", type: "記事", keywords: ["発熱", "熱", "受診", "解熱剤", "#8000"], href: "/learn/fever-guide" },
  { title: "ベビー服・肌着の選びかた", type: "記事", keywords: ["肌着", "短肌着", "コンビ肌着", "洋服", "ベビー服", "出産準備", "季節"], href: "/learn/baby-clothing" },
  { title: "沐浴・お風呂ガイド", type: "記事", keywords: ["沐浴", "お風呂", "ベビーバス", "新生児", "お湯", "温度"], href: "/learn/bathing-guide" },
  { title: "赤ちゃんの行事カレンダー", type: "記事", keywords: ["行事", "お宮参り", "お食い初め", "お七夜", "ハーフバースデー", "一升餅", "初節句"], href: "/learn/baby-events" },
  { title: "入院バッグ準備リスト", type: "記事", keywords: ["入院", "バッグ", "出産準備", "陣痛", "持ち物", "チェックリスト"], href: "/learn/hospital-bag" },
  { title: "おしりふきの選びかた", type: "準備", keywords: ["おしりふき", "パンパース", "ムーニー"], href: "/prepare/wipes" },
  { title: "ベビーベッド・寝具の選びかた", type: "準備", keywords: ["ベビーベッド", "布団", "寝具", "ネオママイズム", "カトージ", "ファルスカ", "西松屋"], href: "/prepare/baby-bed" },
  { title: "おむつの選びかた", type: "準備", keywords: ["おむつ", "パンパース", "メリーズ", "ムーニー", "グーン"], href: "/prepare/diapers" },
  { title: "離乳食グッズの選びかた", type: "準備", keywords: ["離乳食", "フリージング", "ブレンダー", "リッチェル", "ピジョン", "ブレッツァ"], href: "/prepare/baby-food-goods" },
  { title: "バウンサーの選びかた", type: "準備", keywords: ["バウンサー", "ビョルン", "ネムリラ", "ユラリズム", "リッチェル"], href: "/prepare/bouncer" },
  { title: "電動鼻吸い器の選びかた", type: "準備", keywords: ["鼻吸い器", "メルシーポット", "ピジョン", "ベビースマイル", "鼻水"], href: "/prepare/nasal-aspirator" },
  { title: "抱っこ紐の選びかた", type: "準備", keywords: ["抱っこ紐", "エルゴ", "ビョルン", "アップリカ"], href: "/prepare/baby-carrier" },
  { title: "ベビーカーの選びかた", type: "準備", keywords: ["ベビーカー", "コンビ", "アップリカ", "ピジョン", "サイベックス"], href: "/prepare/stroller" },
  { title: "チャイルドシートの選びかた", type: "準備", keywords: ["チャイルドシート", "ISOFIX", "回転式", "コンビ", "アップリカ", "サイベックス"], href: "/prepare/childseat" },
  { title: "ガーゼ・タオルの選びかた", type: "準備", keywords: ["ガーゼ", "タオル", "沐浴", "授乳", "よだれ"], href: "/prepare/gauze-towel" },
  { title: "ベビーバスの選びかた", type: "準備", keywords: ["ベビーバス", "沐浴", "リッチェル", "エアー", "折りたたみ"], href: "/prepare/baby-bath" },
  { title: "体温計の選びかた", type: "準備", keywords: ["体温計", "非接触", "予測式", "耳式", "オムロン", "テルモ"], href: "/prepare/thermometer" },
  { title: "赤ちゃんのつめ切りの選びかた", type: "準備", keywords: ["つめ切り", "爪切り", "ネイルケア", "ピジョン", "コンビ"], href: "/prepare/nail-scissors" },
  { title: "おくるみ・スワドルの選びかた", type: "準備", keywords: ["おくるみ", "スワドル", "モスリン", "スワドルアップ", "寝かしつけ"], href: "/prepare/swaddle" },
  { title: "授乳ケープの選びかた", type: "準備", keywords: ["授乳ケープ", "授乳", "外出", "ポンチョ", "ストール"], href: "/prepare/nursing-cover" },
  { title: "ベビーワゴンの選びかた", type: "準備", keywords: ["ベビーワゴン", "収納", "IKEA", "山善", "ニトリ"], href: "/prepare/baby-wagon" },
  { title: "おむつ替えシートの選びかた", type: "準備", keywords: ["おむつ替え", "シート", "防水", "外出"], href: "/prepare/diaper-changing-sheet" },
  { title: "ストローマグの選びかた", type: "準備", keywords: ["ストローマグ", "マグ", "飲む練習", "リッチェル", "コンビ"], href: "/prepare/straw-mug" },
  { title: "ベビーチェアの選びかた", type: "準備", keywords: ["ベビーチェア", "ハイチェア", "ローチェア", "トリップトラップ", "離乳食"], href: "/prepare/baby-chair" },
  { title: "ベビーゲートの選びかた", type: "準備", keywords: ["ベビーゲート", "安全対策", "つっぱり", "置くだけ", "階段"], href: "/prepare/baby-gate" },
  { title: "ファーストシューズの選びかた", type: "準備", keywords: ["ファーストシューズ", "靴", "つかまり立ち", "ニューバランス", "アシックス"], href: "/prepare/first-shoes" },
  { title: "三輪車・手押し車の選びかた", type: "準備", keywords: ["三輪車", "手押し車", "キックバイク", "ストライダー", "外遊び"], href: "/prepare/ride-on-toys" },
  { title: "地域の子育て支援制度の調べかた", type: "記事", keywords: ["支援制度", "自治体", "児童手当", "医療費助成", "ファミサポ", "一時保育"], href: "/learn/local-support" },
  { title: "出産育児一時金", type: "制度", keywords: ["出産", "一時金", "給付", "50万"], href: "/benefits" },
  { title: "児童手当", type: "制度", keywords: ["児童手当", "手当", "申請"], href: "/benefits" },
  { title: "乳幼児医療費助成", type: "制度", keywords: ["医療費", "助成", "乳幼児"], href: "/benefits" },
  { title: "胎動・陣痛カウンター", type: "ツール", keywords: ["胎動", "陣痛", "カウンター", "計測", "間隔", "出産"], href: "/learn/contraction-counter" },
  { title: "妊娠月別おすすめ料理ガイド", type: "記事", keywords: ["料理", "レシピ", "妊娠", "つわり", "食事", "栄養", "葉酸", "鉄分"], href: "/learn/pregnancy-recipes" },
  { title: "胎児に栄養素がなぜ必要？", type: "記事", keywords: ["栄養", "たんぱく質", "DHA", "鉄", "葉酸", "カルシウム", "ビタミン", "胎児", "発達"], href: "/learn/pregnancy-nutrition-science" },
];

type SearchResult = typeof searchIndex[number];

function groupByType(results: SearchResult[]) {
  const groups: Record<string, SearchResult[]> = {};
  for (const item of results) {
    if (!groups[item.type]) groups[item.type] = [];
    groups[item.type].push(item);
  }
  return groups;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return searchIndex.filter(
      (item) =>
        item.title.includes(q) ||
        item.keywords.some((kw) => kw.includes(q) || q.includes(kw))
    );
  }, [query]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    // 検索結果が1件のみの場合、直接そのページへ遷移
    if (results.length === 1) {
      router.push(results[0].href);
      return;
    }
    // URLを更新して検索状態を保持
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  const grouped = useMemo(() => groupByType(results), [results]);

  const typeLabels: Record<string, string> = {
    "記事": "記事",
    "準備": "準備",
    "制度": "制度",
    "相談": "相談",
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-6">検索</h1>

          <form
            onSubmit={handleSearch}
            className="mb-8"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
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
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="キーワードで検索（例：夜泣き、離乳食、保活）"
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  autoFocus
                />
              </div>
              <Button type="submit" className="shrink-0 rounded-xl px-5">
                検索
              </Button>
            </div>
          </form>

          {query.trim() === "" ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              キーワードを入力すると、記事・相談・準備ガイドから検索できます。
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm mb-2">
                「{query}」に一致するコンテンツが見つかりませんでした。
              </p>
              <p className="text-muted-foreground text-xs">
                別のキーワードで試してみてください。
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([type, items]) => (
                <section key={type}>
                  <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {typeLabels[type] ?? type}
                    </Badge>
                    <span>{items.length}件</span>
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <Link key={item.href + item.title} href={item.href}>
                        <Card className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer">
                          <CardContent className="pt-4 pb-4">
                            <h3 className="font-semibold text-foreground text-sm">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.keywords.join("・")}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">読み込み中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
