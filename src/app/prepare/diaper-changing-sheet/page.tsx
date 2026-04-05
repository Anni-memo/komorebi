import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

export const metadata = {
  title: "おむつ替えシートの選びかた",
  description:
    "おむつ替えシート、使い捨てと洗えるタイプの違いを整理。外出時の必需品を選ぶコツを紹介。このページを見たら、もう探し回らなくて大丈夫です。",
};

const keyPoints = [
  {
    name: "使い捨て vs 洗えるタイプ",
    detail: "使い捨ては衛生的で外出向き。洗えるタイプはコスパが良く自宅メイン向き。両方あると使い分けできて便利",
  },
  {
    name: "防水性",
    detail: "おむつ替え中の「うっかり」は日常。裏面が防水加工されているものなら、外出先のソファやベッドを汚さずに済む",
  },
  {
    name: "サイズと携帯性",
    detail: "外出用は折りたたんでおむつポーチに入るサイズが理想。自宅用はゆとりのある大きめサイズが安心",
  },
  {
    name: "肌ざわり・素材",
    detail: "赤ちゃんの肌に直接触れるもの。コットンやパイル地など、柔らかい素材だと赤ちゃんも嫌がりにくい",
  },
  {
    name: "洗濯のしやすさ",
    detail: "洗えるタイプは洗濯機OKかどうかが重要。乾きやすい素材なら洗い替えの枚数を減らせる",
  },
];

const products = [
  {
    name: "ニトリ おむつ替えシート",
    brand: "ニトリ",
    type: "洗えるタイプ" as const,
    asin: "",
    officialUrl: "",
    features: [
      "裏面防水加工で漏れを防ぐ",
      "洗濯機で丸洗いできて衛生的",
      "お手頃価格で洗い替え用に複数枚揃えやすい",
      "全国の店舗で実物を確認してから購入できる",
    ],
    bestFor: "コスパ重視の方、自宅でのおむつ替えがメインの方",
    notFor: "ネット通販だけで揃えたい方",
    priceRange: "約500〜1,000円",
  },
  {
    name: "はぐまむ 防水おむつ替えシート",
    brand: "はぐまむ",
    type: "洗える防水タイプ" as const,
    asin: "B07DFKFM7X",
    officialUrl: "",
    features: [
      "表面はふんわりパイル地で赤ちゃんの肌にやさしい",
      "裏面は完全防水で安心感が高い",
      "コンパクトに折りたためて外出にも持っていける",
      "日本製で品質にこだわりたい方にも安心",
    ],
    bestFor: "肌ざわりを重視する方、自宅と外出の両方で使いたい方",
    notFor: "使い捨ての手軽さを求める方",
    priceRange: "約1,200〜1,800円",
  },
  {
    name: "Mushie おむつ替えマット",
    brand: "Mushie",
    type: "シリコン製" as const,
    asin: "B09JNLJ8GR",
    officialUrl: "",
    features: [
      "シリコン素材で拭くだけで清潔に保てる",
      "くるくる丸めてコンパクトに持ち運べる",
      "北欧デザインでおしゃれなカラー展開",
      "洗剤で洗えて衛生的、食洗機も可能",
    ],
    bestFor: "外出先での衛生面を重視する方、デザインにこだわる方",
    notFor: "柔らかい布の肌ざわりを求める方（シリコンは硬め）",
    priceRange: "約2,500〜3,500円",
  },
];

const typeGuide = [
  {
    condition: "自宅でのおむつ替えがメイン",
    recommendation: "はぐまむ 防水おむつ替えシート",
    reason: "パイル地の肌ざわりが良く、洗濯機で丸洗い。防水で布団やカーペットを守れる",
  },
  {
    condition: "外出先での衛生面が気になる",
    recommendation: "Mushie おむつ替えマット",
    reason: "シリコン製で拭くだけで清潔。丸めてバッグに入るので携帯性も高い",
  },
  {
    condition: "とにかくコスパ重視で複数枚欲しい",
    recommendation: "ニトリ おむつ替えシート",
    reason: "1枚500〜1,000円で洗い替え用に気軽に買い足せる。実店舗で確認もできる",
  },
];

export default function DiaperChangingSheetPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "おむつ替えシートの選びかた" },
          ]} />
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">おむつ関連</Badge>
              <Badge variant="secondary">お出かけ</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              おむつ替えシートの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              使い捨てと洗えるタイプの違い、外出時の必需品を整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "is-it-necessary", label: "おむつ替えシート、本当に必要？" },
            { id: "selection-points", label: "選ぶときに見るべき5つのポイント" },
            { id: "type-comparison", label: "使い捨て vs 洗えるタイプ vs シリコン" },
            { id: "products", label: "おすすめのおむつ替えシート3選" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. 基本知識 */}
          <section id="is-it-necessary" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おむつ替えシート、本当に必要？
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  おむつ替えの最中に赤ちゃんが動いたり、おしっこが飛んだり...。
                  <strong>「うっかり」は毎日のように起こります</strong>。
                  おむつ替えシートがあれば、布団・カーペット・外出先のソファを汚さずに済みます。
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  自宅では洗えるタイプ、外出時は使い捨てやシリコン製と使い分けるのがおすすめ。
                  特に外出先では、おむつ替えスペースの衛生面が気になることも多いので、
                  1枚あるだけで安心感が違います。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 選び方ポイント */}
          <section id="selection-points" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              選ぶときに見るべき5つのポイント
            </h2>
            <div className="space-y-3">
              {keyPoints.map((point, i) => (
                <Card key={point.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{point.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{point.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. 使い分けガイド */}
          <section id="type-comparison" className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  使い捨て vs 洗えるタイプ vs シリコン、どう使い分ける？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">使い捨てタイプ</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・衛生面で最も安心</li>
                      <li>・外出や旅行にぴったり</li>
                      <li>・ランニングコストがかかる</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">洗えるタイプ</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・自宅メインならコスパ最強</li>
                      <li>・肌ざわりが良い</li>
                      <li>・洗い替え用に2〜3枚必要</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">シリコン製</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・拭くだけで清潔</li>
                      <li>・コンパクトに丸められる</li>
                      <li>・初期費用はやや高め</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong className="text-foreground">おすすめの組み合わせ:</strong>{" "}
                  自宅用に洗えるタイプ2〜3枚 + 外出用にシリコン製1枚。これで大抵の場面はカバーできます。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 4. おすすめ商品 */}
          <section id="products" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おすすめのおむつ替えシート3選
            </h2>
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.name} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                        <Badge variant="secondary" className="text-xs">{product.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">特徴</p>
                          <ul className="space-y-1">
                            {product.features.map((f) => (
                              <li key={f} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">向いている方: </span>
                            <span className="text-foreground">{product.bestFor}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">合わないかも: </span>
                            <span className="text-foreground">{product.notFor}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">価格帯: </span>
                            <span className="text-foreground">{product.priceRange}</span>
                          </div>
                        </div>
                      </div>
                      {product.asin && (
                        <div className="md:w-48 shrink-0">
                          <AmazonProductCard
                            name={product.name}
                            asin={product.asin}
                            price={product.priceRange}
                            officialUrl={product.officialUrl || undefined}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. タイプ別おすすめ */}
          <section id="type-guide" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              あなたの状況に合わせて選ぶなら
            </h2>
            <div className="space-y-3">
              {typeGuide.map((guide) => (
                <Card key={guide.condition} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xs text-muted-foreground mb-1">{guide.condition}</p>
                    <p className="text-sm font-semibold text-primary mb-1">
                      → {guide.recommendation}
                    </p>
                    <p className="text-xs text-muted-foreground">{guide.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>おむつ替えシートは「あると安心」の代表格です。</strong>
                <br />
                汚れても大丈夫、という安心感があるだけで、
                <br />
                おむつ替えのストレスがぐっと減ります。
                <br />
                まずは洗えるタイプを1〜2枚用意しておけば十分。
                <br />
                外出が増えたら、携帯用を追加してみてください。
              </p>
            </CardContent>
          </Card>

          {/* 購入できる場所 */}
          <section id="where-to-buy" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              購入できる場所
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              はぐまむとMushieはAmazonで購入できます。ニトリは公式サイト・店舗をご利用ください。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AmazonProductCard
                name="はぐまむ 防水おむつ替えシート"
                asin="B07DFKFM7X"
                price="¥1,200〜"
              />
              <AmazonProductCard
                name="Mushie おむつ替えマット"
                asin="B09JNLJ8GR"
                price="¥2,500〜"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格は各販売店でご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="おむつ替えシートの選びかた" path="/prepare/diaper-changing-sheet" />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/prepare" className={buttonVariants({ variant: "outline" })}>
              準備するトップに戻る
            </Link>
            <Link href="/concierge" className={buttonVariants({ variant: "ghost" })}>
              AIに他のおすすめを聞く
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
