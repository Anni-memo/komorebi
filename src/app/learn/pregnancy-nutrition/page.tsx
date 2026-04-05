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

export const metadata = {
  title: "妊娠中・産後の食事ガイド｜必要な栄養素と注意点",
  description:
    "妊娠中・産後に必要な栄養素、避けるべき食品、つわり中の食事のコツ。エビデンスに基づいた情報を整理。",
};

const pregnancyNutrients = [
  {
    name: "葉酸",
    amount: "400μg/日",
    timing: "特に妊娠初期",
    role: "神経管閉鎖障害の予防",
    foods: "ほうれん草・ブロッコリー・枝豆",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "鉄分",
    amount: "21.5mg/日（中期以降）",
    timing: "妊娠中期〜後期",
    role: "貧血予防。ビタミンCと一緒に摂ると吸収率アップ",
    foods: "赤身肉・小松菜・ひじき",
    color: "bg-red-100 text-red-700",
  },
  {
    name: "カルシウム",
    amount: "650mg/日",
    timing: "妊娠全期間",
    role: "赤ちゃんの骨・歯の形成",
    foods: "牛乳・小魚・豆腐",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "DHA",
    amount: "魚から適量を",
    timing: "妊娠全期間",
    role: "赤ちゃんの脳の発達に重要",
    foods: "サバ・イワシ・サンマ",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "タンパク質",
    amount: "中期75g/日、後期80g/日",
    timing: "妊娠中期〜後期",
    role: "赤ちゃんの体づくり",
    foods: "肉・魚・卵・大豆",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "ビタミンD",
    amount: "8.5μg/日",
    timing: "妊娠全期間",
    role: "カルシウムの吸収を助ける",
    foods: "日光浴・きのこ類・魚",
    color: "bg-yellow-100 text-yellow-700",
  },
];

const postpartumNutrients = [
  {
    name: "鉄分",
    role: "母体回復。出産で失った鉄分の補給が重要",
  },
  {
    name: "カルシウム",
    role: "授乳で消費されるため、意識的に摂取を",
  },
  {
    name: "ビタミンB群",
    role: "疲労回復・母乳の質の維持に",
  },
  {
    name: "水分",
    role: "授乳で1日+500ml以上を目安に。こまめな水分補給を",
  },
];

const avoidFoods = {
  prohibited: [
    { name: "生肉・生ハム", reason: "トキソプラズマ感染のリスク" },
    { name: "ナチュラルチーズの一部（加熱殺菌されていないもの）", reason: "リステリア菌感染のリスク" },
    { name: "アルコール", reason: "胎児性アルコール症候群のリスク。少量でも安全とは言えない" },
  ],
  limited: [
    { name: "マグロなど大型魚", reason: "水銀の蓄積。週1回（約80g）まで" },
    { name: "カフェイン", reason: "1日200mg以下（コーヒー約2杯まで）" },
    { name: "ビタミンA（レバー）", reason: "過剰摂取で胎児の奇形リスク。レバーの食べすぎに注意" },
  ],
  caution: [
    { name: "生卵", reason: "サルモネラ菌のリスク。新鮮なものでも加熱が安心" },
    { name: "刺身", reason: "新鮮なものなら少量OK。ただし食中毒リスクに注意" },
  ],
};

const morningTips = [
  {
    title: "食べられるものを食べる",
    detail: "栄養バランスはつわりが落ち着いてから整えれば大丈夫。この時期は食べられることが最優先",
  },
  {
    title: "少量を頻回に",
    detail: "空腹が吐き気を悪化させることがあります。1日5〜6回に分けて少しずつ食べましょう",
  },
  {
    title: "冷たいもの・酸味のあるものが食べやすい",
    detail: "冷やしたフルーツ、トマト、レモン水などが受け入れやすいことが多い",
  },
  {
    title: "水分補給を最優先",
    detail: "脱水は危険です。水が飲めないときは氷をなめる、経口補水液を試すなどの工夫を",
  },
  {
    title: "つらいときは産院に相談",
    detail: "体重が急減したり水分が摂れない場合は点滴が必要なこともあります。我慢しすぎないで",
  },
];

const trimesterSummary = [
  {
    period: "初期（〜15週）",
    points: "葉酸を最優先。つわりがあれば食べられるものを。サプリメントの活用も有効",
    color: "bg-green-100 text-green-700",
  },
  {
    period: "中期（16〜27週）",
    points: "鉄分・カルシウム・タンパク質を意識的に。体重管理も開始。バランスの良い食事を",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    period: "後期（28〜39週）",
    points: "タンパク質80g/日。鉄分の需要がピーク。胃が圧迫されるため、少量頻回が食べやすい",
    color: "bg-orange-100 text-orange-700",
  },
  {
    period: "産後・授乳中",
    points: "鉄分の補給・水分をしっかり。ビタミンB群で疲労回復。無理なダイエットは禁物",
    color: "bg-pink-100 text-pink-700",
  },
];

export default function PregnancyNutritionPage() {
  return (
    <>
      <ArticleJsonLd
        title="妊娠中・産後の食事ガイド｜必要な栄養素と注意点"
        description="妊娠中・産後に必要な栄養素、避けるべき食品、つわり中の食事のコツ。エビデンスに基づいた情報を整理。"
        path="/learn/pregnancy-nutrition"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["妊娠 食事", "妊婦 栄養", "葉酸"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "妊娠中・産後の食事ガイド" },
            ]} />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">食事</Badge>
              <Badge variant="secondary">妊婦・授乳中の方向け</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              妊娠中・産後の食事ガイド
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              必要な栄養素・避けるべき食品・つわり中の食事のコツを、
              厚生労働省の基準とエビデンスに基づいて整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "pregnancy-nutrients", label: "妊娠中に必要な栄養素" },
            { id: "postpartum-nutrients", label: "産後・授乳中に必要な栄養素" },
            { id: "avoid-foods", label: "避けるべき食品・注意が必要な食品" },
            { id: "morning-sickness", label: "つわり中の食事のコツ" },
            { id: "trimester-summary", label: "時期別のポイントまとめ" },
          ]} />

          {/* 妊娠中に必要な栄養素 */}
          <section id="pregnancy-nutrients" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🤰</span>
              妊娠中に必要な栄養素
            </h2>
            <div className="space-y-4">
              {pregnancyNutrients.map((nutrient) => (
                <Card key={nutrient.name} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={nutrient.color}>{nutrient.amount}</Badge>
                      <CardTitle className="text-sm">{nutrient.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">時期:</strong> {nutrient.timing}</p>
                      <p><strong className="text-foreground">役割:</strong> {nutrient.role}</p>
                      <p><strong className="text-foreground">食材:</strong> {nutrient.foods}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 産後・授乳中に必要な栄養素 */}
          <section id="postpartum-nutrients" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🍼</span>
              産後・授乳中に必要な栄養素
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3">
                  {postpartumNutrients.map((nutrient) => (
                    <li key={nutrient.name} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                      <div>
                        <strong className="text-foreground">{nutrient.name}:</strong>{" "}
                        {nutrient.role}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 避けるべき食品・注意が必要な食品 */}
          <section id="avoid-foods" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⚠️</span>
              避けるべき食品・注意が必要な食品
            </h2>

            {/* 禁止 */}
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Badge className="bg-red-100 text-red-700">禁止</Badge>
              摂取を避けるべき食品
            </h3>
            <div className="space-y-3 mb-6">
              {avoidFoods.prohibited.map((food) => (
                <Card key={food.name} className="border-red-200/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold shrink-0 mt-0.5">
                        &#10005;
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">{food.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{food.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 制限 */}
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-700">制限</Badge>
              量を控えるべき食品
            </h3>
            <div className="space-y-3 mb-6">
              {avoidFoods.limited.map((food) => (
                <Card key={food.name} className="border-amber-200/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        &#9888;
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">{food.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{food.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 注意 */}
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-700">注意</Badge>
              気をつけたい食品
            </h3>
            <div className="space-y-3">
              {avoidFoods.caution.map((food) => (
                <Card key={food.name} className="border-yellow-200/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold shrink-0 mt-0.5">
                        !
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">{food.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{food.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* つわり中の食事のコツ */}
          <section id="morning-sickness" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💡</span>
              つわり中の食事のコツ
            </h2>
            <div className="space-y-3">
              {morningTips.map((tip, i) => (
                <Card key={tip.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{tip.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 時期別のポイントまとめ */}
          <section id="trimester-summary" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              時期別のポイントまとめ
            </h2>
            <div className="space-y-4">
              {trimesterSummary.map((item) => (
                <Card key={item.period} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={item.color}>{item.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.points}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">出典・参考情報</h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 厚生労働省. &quot;日本人の食事摂取基準（2020年版）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 厚生労働省. &quot;妊産婦のための食生活指針（令和3年改定）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 厚生労働省. &quot;これからママになるあなたへ〜食べ物について知っておいてほしいこと.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 食品安全委員会. &quot;お母さんになるあなたへ〜食品に含まれるカフェインについて.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[5]</strong> 日本産科婦人科学会. &quot;産婦人科診療ガイドライン 産科編 2023.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 出典・参考文献 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考文献
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 厚生労働省.
                    &quot;妊産婦のための食生活指針.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 日本産科婦人科学会.
                    &quot;妊娠中の栄養管理.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 日本栄養士会.
                    &quot;妊娠期の食事摂取基準.&quot;
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
              個人の健康状態・妊娠経過・アレルギーなどによって最適な食事は異なります。
              具体的な食事指導については、担当の産婦人科医や管理栄養士にご相談ください。
            </p>
          </div>

          <ShareButtons title="妊娠中・産後の食事ガイド" path="/learn/pregnancy-nutrition" />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/concierge" className={buttonVariants({ variant: "outline" })}>
              コンシェルジュに相談する
            </Link>
            <Link href="/learn/baby-food" className={buttonVariants({ variant: "outline" })}>
              離乳食のはじめかたを読む
            </Link>
            <Link href="/learn" className={buttonVariants({ variant: "ghost" })}>
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
