"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { pregnancyRecipes } from "@/lib/pregnancy-recipes";

const trimesterColors: Record<string, string> = {
  初期: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  中期: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  後期: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

const trimesterBorder: Record<string, string> = {
  初期: "border-l-green-400",
  中期: "border-l-yellow-400",
  後期: "border-l-orange-400",
};

// トリメスター別にグループ化
const trimesterGroups = [
  { label: "初期", sub: "2〜4ヶ月", months: pregnancyRecipes.filter((m) => m.trimester === "初期") },
  { label: "中期", sub: "5〜7ヶ月", months: pregnancyRecipes.filter((m) => m.trimester === "中期") },
  { label: "後期", sub: "8〜10ヶ月", months: pregnancyRecipes.filter((m) => m.trimester === "後期") },
];

// ── ツリーナビ（投資Library LIBRARY MAP 風） ──
function RecipeTreeNav() {
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({
    初期: true,
    中期: true,
    後期: true,
  });

  function toggle(cat: string) {
    setOpenCats((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }

  return (
    <div className="bg-foreground/[0.03] border border-border/50 rounded-xl overflow-hidden mb-8">
      <div className="px-5 pt-4 pb-2">
        <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/60 uppercase">
          Recipe Map
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
        {trimesterGroups.map((group) => {
          const isOpen = openCats[group.label];
          return (
            <div key={group.label} className="border-t sm:border-t-0 sm:border-l border-border/30 first:border-l-0 first:border-t-0">
              <button
                onClick={() => toggle(group.label)}
                className="w-full flex items-center gap-2 px-5 py-3 hover:bg-muted/30 transition-colors text-left"
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                >
                  <path d="M2 1l4 3-4 3z" fill="currentColor" className="text-primary/60" />
                </svg>
                <span className="text-sm font-bold text-foreground">{group.label}</span>
                <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wider ml-auto">
                  {group.sub}
                </span>
              </button>
              {isOpen && (
                <div className="pb-3 px-5 pl-9 space-y-0.5">
                  {group.months.map((m) => (
                    <a
                      key={m.month}
                      href={`#month-${m.month}`}
                      className="block text-xs text-muted-foreground py-1 pl-3 border-l border-primary/15 hover:text-primary hover:pl-4 hover:border-primary/40 transition-all"
                    >
                      {m.month}ヶ月（{m.weeks}）
                      <span className="text-muted-foreground/40 ml-1.5">{m.recipes.length}品</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 目次（メモの複利風 — アンカーリンク付き） ──
function RecipeTOC() {
  return (
    <Card className="border-l-4 border-l-primary/60 border-border/40 shadow-none mb-8 bg-muted/20">
      <CardContent className="pt-4 pb-4">
        <p className="text-[10px] font-mono tracking-[0.18em] text-primary/60 uppercase mb-3">
          目次
        </p>
        <div className="space-y-3">
          {trimesterGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full inline-block ${
                  group.label === "初期" ? "bg-green-400" : group.label === "中期" ? "bg-yellow-400" : "bg-orange-400"
                }`} />
                {group.label}（{group.sub}）
              </p>
              <div className="pl-3.5 border-l border-border/40 space-y-0.5">
                {group.months.map((m) => (
                  <a
                    key={m.month}
                    href={`#month-${m.month}`}
                    className="block text-xs text-muted-foreground hover:text-primary transition-colors py-0.5"
                  >
                    {m.month}ヶ月（{m.weeks}）— {m.keyNutrients}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-1 border-t border-border/30">
            <a href="#summary" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              月別まとめ表
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PregnancyRecipesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav
              items={[
                { label: "トップ", href: "/" },
                { label: "学ぶ", href: "/learn" },
                { label: "妊娠月別おすすめ料理" },
              ]}
            />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">食事・レシピ</Badge>
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge variant="secondary">月別ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              妊娠月別おすすめ料理ガイド
            </h1>
            <ArticleMeta updatedAt="2026-04-06" />
            <p className="text-muted-foreground leading-relaxed">
              「今の体調で何を食べればいい？」を解決する、
              <strong className="text-foreground">
                妊娠2ヶ月〜10ヶ月まで月別の簡単レシピ63品
              </strong>
              。つわり期は食べやすいもの中心、安定期は鉄分・カルシウム強化、
              後期はDHA・高たんぱくなど、その月の体に合った料理を厳選しました。
            </p>
          </div>

          {/* 使い方 */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">使い方:</strong>{" "}
                今の妊娠月に合ったセクションを見て、気になる料理から試してみてください。
                すべて
                <strong className="text-foreground">
                  15〜30分で作れる家庭料理
                </strong>
                です。マイホームからログインすると、あなたの週数に合わせたおすすめが自動で表示されます。
              </p>
            </CardContent>
          </Card>

          {/* ── ツリーナビ（LIBRARY MAP風） ── */}
          <RecipeTreeNav />

          {/* ── 目次（メモの複利風） ── */}
          <RecipeTOC />

          {/* 月別セクション */}
          {pregnancyRecipes.map((monthData) => (
            <section
              key={monthData.month}
              id={`month-${monthData.month}`}
              className="mb-10 scroll-mt-20"
            >
              {/* 月ヘッダー */}
              <div className={`flex flex-wrap items-center gap-2 mb-3 pl-3 border-l-4 ${trimesterBorder[monthData.trimester]}`}>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <span aria-hidden>🍽️</span>
                  {monthData.month}ヶ月（{monthData.weeks}）
                </h2>
                <Badge className={trimesterColors[monthData.trimester]}>
                  {monthData.trimester}
                </Badge>
              </div>

              {/* 体調・栄養概要 */}
              <Card className="border-border/50 shadow-none mb-4">
                <CardContent className="pt-4 pb-4">
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">体の変化:</strong>{" "}
                      {monthData.bodyChange}
                    </p>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">
                        重点栄養素:
                      </strong>{" "}
                      {monthData.keyNutrients}
                    </p>
                    <div className="p-2.5 bg-primary/5 rounded-lg">
                      <p className="text-xs text-primary font-medium">
                        {monthData.mealTip}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* レシピ7品 */}
              <div className="space-y-3">
                {monthData.recipes.map((recipe, i) => (
                  <Card
                    key={recipe.name}
                    className="border-border/50 shadow-none"
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h3 className="font-semibold text-foreground text-sm">
                              {recipe.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className="text-xs shrink-0"
                            >
                              {recipe.time}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-1.5">
                            {recipe.nutrients.split("・").map((n) => (
                              <span
                                key={n}
                                className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                              >
                                {n}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {recipe.point}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}

          {/* まとめ表 */}
          <section id="summary" className="mb-8 scroll-mt-20">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              月別まとめ
            </h2>
            <Card className="border-border/50 shadow-none overflow-hidden">
              <CardContent className="pt-0 pb-0 px-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border/50">
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-foreground whitespace-nowrap">
                          月
                        </th>
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-foreground whitespace-nowrap">
                          体調
                        </th>
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-foreground whitespace-nowrap">
                          重点栄養素
                        </th>
                        <th className="text-left px-3 py-2.5 text-xs font-semibold text-foreground whitespace-nowrap">
                          食事のコツ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pregnancyRecipes.map((m, idx) => (
                        <tr
                          key={m.month}
                          className={
                            idx % 2 === 0
                              ? "bg-background"
                              : "bg-muted/20"
                          }
                        >
                          <td className="px-3 py-2 text-xs whitespace-nowrap">
                            <a
                              href={`#month-${m.month}`}
                              className="text-primary hover:underline font-medium"
                            >
                              {m.month}ヶ月
                            </a>
                          </td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">
                            {m.bodyChange.split("。")[0]}
                          </td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">
                            {m.keyNutrients}
                          </td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">
                            {m.mealTip}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 関連ページ */}
          <section className="mb-8">
            <Card className="border-primary/20 bg-primary/[0.03] shadow-none">
              <CardContent className="pt-5 pb-5">
                <p className="text-sm font-medium text-foreground mb-2">
                  あわせて読みたい
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/learn/pregnancy-nutrition"
                      className="text-sm text-primary hover:underline"
                    >
                      妊娠中の栄養ガイド（栄養素の詳細・推奨摂取量）
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/learn/baby-food"
                      className="text-sm text-primary hover:underline"
                    >
                      離乳食のはじめかた
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考情報
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong>{" "}
                    厚生労働省.
                    &quot;妊娠前からはじめる妊産婦のための食生活指針（令和3年改定）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong>{" "}
                    厚生労働省.
                    &quot;日本人の食事摂取基準（2020年版・2025年版）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong>{" "}
                    母子栄養協会.
                    &quot;つわり中の食事術（管理栄養士監修）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong>{" "}
                    アカチャンホンポ.
                    &quot;管理栄養士監修 妊娠中のお食事ガイド.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、医療・栄養指導に代わるものではありません。
              アレルギーのある食材は避け、具体的な食事指導については担当の産婦人科医や管理栄養士にご相談ください。
            </p>
          </div>

          <ShareButtons
            title="妊娠月別おすすめ料理ガイド｜2〜10ヶ月の簡単レシピ63品"
            path="/learn/pregnancy-recipes"
          />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/pregnancy-nutrition"
              className={buttonVariants({ variant: "outline" })}
            >
              栄養ガイドを読む
            </Link>
            <Link
              href="/concierge"
              className={buttonVariants({ variant: "outline" })}
            >
              コンシェルジュに相談する
            </Link>
            <Link
              href="/learn"
              className={buttonVariants({ variant: "ghost" })}
            >
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
