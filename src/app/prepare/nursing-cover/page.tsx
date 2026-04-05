import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "授乳ケープの選びかた",
  description:
    "授乳ケープ、エプロン型・ポンチョ型・ストール型の違いを整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const keyPoints = [
  {
    name: "形状（エプロン型 / ポンチョ型 / ストール型）",
    detail: "エプロン型は首からかけるタイプで安定感がある。ポンチョ型は360度カバーで安心。ストール型は普段使いもできてファッション性が高い",
  },
  {
    name: "通気性・赤ちゃんの様子の見やすさ",
    detail: "ワイヤー入りで胸元に空間ができるタイプなら、赤ちゃんの顔が見えて通気性も確保できる",
  },
  {
    name: "コンパクトさ・携帯性",
    detail: "外出時に持ち歩くもの。畳んでバッグに入るか、ポーチ付きかどうかがポイント",
  },
  {
    name: "洗濯のしやすさ",
    detail: "ミルクの吐き戻しや汗で汚れやすい。洗濯機で丸洗いできると衛生的",
  },
  {
    name: "多用途性",
    detail: "ベビーカーの日よけやブランケット代わりになるものもある。1枚で何役もこなせると外出時の荷物が減る",
  },
];

const products = [
  {
    name: "ベベオレ 授乳ケープ",
    brand: "ベベオレ",
    type: "エプロン型" as const,
    asin: "B003HPCMU6",
    officialUrl: "",
    features: [
      "ワイヤー入りで胸元に空間ができ、赤ちゃんの顔が見える",
      "首ひもの長さ調節が可能",
      "おしゃれな柄が豊富でファッション性が高い",
      "コンパクトに畳んで付属のポーチに収納できる",
    ],
    bestFor: "外出先で授乳する機会が多い方、赤ちゃんの様子を確認しながら授乳したい方",
    notFor: "360度しっかり隠したい方（エプロン型は背面がオープン）",
    priceRange: "約3,000〜4,500円",
  },
  {
    name: "DORACO 授乳ケープ",
    brand: "DORACO",
    type: "ポンチョ型" as const,
    asin: "B019GWFN8Q",
    officialUrl: "",
    features: [
      "360度カバーで周囲の視線を気にせず授乳できる",
      "かぶるだけの簡単装着",
      "コットン素材で通気性が良い",
      "おしゃれなデザインで普段着としても違和感がない",
    ],
    bestFor: "電車やカフェなど人の多い場所で授乳する方",
    notFor: "コンパクトさを最重視する方（布の面積が大きめ）",
    priceRange: "約3,500〜5,000円",
  },
  {
    name: "犬印本舗 マルチウェイ授乳ケープ",
    brand: "犬印本舗",
    type: "ストール型" as const,
    asin: "B077ZQ91CC",
    officialUrl: "",
    features: [
      "授乳ケープ・ストール・ベビーカーカバーの3WAY",
      "マタニティ老舗ブランドの安心感",
      "薄手で軽く、バッグに入れても場所を取らない",
      "シンプルなデザインで服装を選ばない",
    ],
    bestFor: "荷物を増やしたくない方、普段使いもできるものが欲しい方",
    notFor: "ワイヤー入りの安定感を求める方",
    priceRange: "約2,500〜3,500円",
  },
];

const typeGuide = [
  {
    condition: "赤ちゃんの顔を見ながら授乳したい",
    recommendation: "ベベオレ（エプロン型・ワイヤー入り）",
    reason: "ワイヤーで胸元に空間ができるので、赤ちゃんの様子を確認しやすい。通気性も良い",
  },
  {
    condition: "人の多い場所で安心して授乳したい",
    recommendation: "DORACO（ポンチョ型）",
    reason: "360度カバーで周囲の目を気にしなくて済む。かぶるだけで簡単",
  },
  {
    condition: "できるだけ荷物を減らしたい",
    recommendation: "犬印本舗（ストール型）",
    reason: "薄手でコンパクト。ストールとしても使えるので、授乳ケープ単体で持ち歩く必要がない",
  },
];

export default function NursingCoverPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">授乳グッズ</Badge>
              <Badge variant="secondary">お出かけ</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              授乳ケープの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              エプロン型・ポンチョ型・ストール型の違いを整理しました。
            </p>
          </div>

          {/* 1. 基本知識 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              授乳ケープを選ぶときに知っておきたいこと
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  授乳ケープは外出先で授乳するときに周囲の視線をカバーする布です。
                  大きく分けて<strong>エプロン型・ポンチョ型・ストール型</strong>の3タイプがあり、
                  それぞれ使い勝手が違います。
                  「必ず必要」というわけではありませんが、
                  あると外出のハードルがぐっと下がります。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 選び方ポイント */}
          <section className="mb-8">
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

          {/* 3. おすすめ商品 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おすすめの授乳ケープ3選
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

          {/* 4. タイプ別おすすめ */}
          <section className="mb-8">
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

          {/* 5. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>授乳ケープがなくても、授乳はできます。</strong>
                <br />
                大きめのストールやブランケットで代用する方もたくさんいます。
                <br />
                でも「あると安心」と感じるなら、1枚あるだけで外出がぐっと楽になります。
                <br />
                まずは自分の外出スタイルに合うタイプを選んでみてください。
              </p>
            </CardContent>
          </Card>

          {/* 購入できる場所 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              購入できる場所
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              ここで紹介した商品はAmazonでも購入できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AmazonProductCard
                name="ベベオレ 授乳ケープ"
                asin="B003HPCMU6"
                price="¥3,000〜"
              />
              <AmazonProductCard
                name="DORACO 授乳ケープ"
                asin="B019GWFN8Q"
                price="¥3,500〜"
              />
              <AmazonProductCard
                name="犬印本舗 マルチウェイ授乳ケープ"
                asin="B077ZQ91CC"
                price="¥2,500〜"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              価格・仕様は2026年4月時点の情報です。実際の価格は販売店により異なります。
              授乳ケープは必須アイテムではありません。ご自身の外出頻度やスタイルに合わせてご検討ください。
            </p>
          </div>

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
