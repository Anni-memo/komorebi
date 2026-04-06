"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ShareButtons } from "@/components/share-buttons";
import { getRecipeBySlug, getRecipesByMonth } from "@/lib/pregnancy-recipes";

const trimesterColors: Record<string, string> = {
  初期: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  中期: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  後期: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

export default function RecipeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="max-w-3xl mx-auto px-4 py-20 text-center">
            <p className="text-muted-foreground mb-4">レシピが見つかりませんでした。</p>
            <Link href="/learn/pregnancy-recipes" className="text-primary hover:underline">
              レシピ一覧に戻る
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // 同じ月の他のレシピ
  const sameMonthRecipes = getRecipesByMonth(recipe.month).filter((r) => r.slug !== recipe.slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* パンくず */}
          <BreadcrumbNav
            items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "月別レシピ", href: "/learn/pregnancy-recipes" },
              { label: recipe.name },
            ]}
          />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={trimesterColors[recipe.trimester]}>
                {recipe.trimester}
              </Badge>
              <Badge variant="secondary">妊娠{recipe.month}ヶ月</Badge>
              <Badge variant="outline">{recipe.time}</Badge>
              <Badge variant="outline">{recipe.servings}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">
              {recipe.name}
            </h1>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {recipe.nutrients.split("・").map((n) => (
                <span
                  key={n}
                  className="text-xs px-2.5 py-1 bg-primary/10 rounded-full text-primary font-medium"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* なぜこの時期に？ */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>🤰</span>
                なぜ{recipe.month}ヶ月目（{recipe.weeks}）におすすめ？
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {recipe.whyNow}
              </p>
            </CardContent>
          </Card>

          {/* 材料 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <span aria-hidden>🥕</span>
              材料（{recipe.servings}）
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-4 pb-2">
                <ul className="divide-y divide-border/30">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.name} className="flex items-center justify-between py-2.5 px-1">
                      <span className="text-sm text-foreground">{ing.name}</span>
                      <span className="text-sm text-muted-foreground">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 作り方 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <span aria-hidden>👩‍🍳</span>
              作り方
            </h2>
            <div className="space-y-3">
              {recipe.steps.map((step, i) => (
                <Card key={i} className="border-border/50 shadow-none">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">{step}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 栄養成分 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <span aria-hidden>📊</span>
              栄養メモ（1人分あたり）
            </h2>
            <Card className="border-border/50 shadow-none overflow-hidden">
              <CardContent className="pt-0 pb-0 px-0">
                <div className="grid grid-cols-2 sm:grid-cols-3">
                  {recipe.nutritionFacts.map((fact, i) => (
                    <div
                      key={fact.label}
                      className={`px-4 py-3 ${i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""} border-border/30`}
                    >
                      <p className="text-xs text-muted-foreground">{fact.label}</p>
                      <p className="text-sm font-semibold text-foreground">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ワンポイント */}
          <Card className="bg-muted/30 border-border/40 shadow-none mb-8">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">ワンポイント: </strong>
                {recipe.tip}
              </p>
            </CardContent>
          </Card>

          {/* 同じ月の他のレシピ */}
          {sameMonthRecipes.length > 0 && (
            <section className="mb-8">
              <h2 className="text-base font-bold text-foreground mb-3">
                {recipe.month}ヶ月目の他のレシピ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sameMonthRecipes.map((r) => (
                  <Link key={r.slug} href={`/learn/pregnancy-recipes/${r.slug}`}>
                    <Card className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer h-full">
                      <CardContent className="pt-3 pb-3">
                        <p className="text-sm font-medium text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{r.nutrients} — {r.time}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 導線 */}
          <div className="space-y-3 mb-8">
            <Link
              href={`/learn/pregnancy-recipes#month-${recipe.month}`}
              className="block text-center py-3 px-4 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
            >
              ← {recipe.month}ヶ月のレシピ一覧に戻る
            </Link>
            <a
              href="https://anni-memo.github.io/health-clinic/nutrition/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 px-4 rounded-xl border border-primary/30 bg-primary/5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              もっと健康レシピを見る → 健康クリニック
            </a>
          </div>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              栄養成分は概算値です。アレルギーのある食材は避け、
              具体的な食事指導については担当の産婦人科医や管理栄養士にご相談ください。
            </p>
          </div>

          <ShareButtons
            title={`${recipe.name}｜妊娠${recipe.month}ヶ月のおすすめレシピ`}
            path={`/learn/pregnancy-recipes/${recipe.slug}`}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
