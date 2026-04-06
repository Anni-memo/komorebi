import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { pregnancyRecipes } from "@/lib/pregnancy-recipes";

export const metadata = {
  title:
    "妊娠月別おすすめ料理ガイド｜2〜10ヶ月の簡単レシピ63品 | こもれび",
  description:
    "妊娠2ヶ月から10ヶ月まで、月ごとの体調と必要な栄養素に合わせた簡単レシピを各7品ずつ紹介。つわり期・安定期・後期それぞれに最適な料理を管理栄養士監修情報に基づいてセレクト。",
};

const trimesterColors: Record<string, string> = {
  初期: "bg-green-100 text-green-700",
  中期: "bg-yellow-100 text-yellow-700",
  後期: "bg-orange-100 text-orange-700",
};

export default function PregnancyRecipesPage() {
  return (
    <>
      <ArticleJsonLd
        title="妊娠月別おすすめ料理ガイド｜2〜10ヶ月の簡単レシピ63品"
        description="妊娠2ヶ月から10ヶ月まで、月ごとの体調と必要な栄養素に合わせた簡単レシピを各7品ずつ紹介。"
        path="/learn/pregnancy-recipes"
        datePublished="2026-04-06"
        tags={[
          "妊娠 レシピ",
          "妊婦 料理",
          "つわり 食事",
          "妊娠中期 レシピ",
          "妊娠後期 レシピ",
        ]}
      />
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

          <TableOfContents
            items={pregnancyRecipes.map((m) => ({
              id: `month-${m.month}`,
              label: `${m.month}ヶ月（${m.weeks}）— ${m.trimester}`,
            }))}
          />

          {/* 月別セクション */}
          {pregnancyRecipes.map((monthData) => (
            <section
              key={monthData.month}
              id={`month-${monthData.month}`}
              className="mb-10"
            >
              {/* 月ヘッダー */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
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
          <section className="mb-8">
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
