import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "ストローマグの選びかた",
  description:
    "6ヶ月頃から使えるストローマグを、漏れにくさ・洗いやすさ・容量で比較しました。リッチェル・コンビ・ピジョン・サーモスの4製品を紹介。",
};

const whyConfusing = [
  "スパウト・ストロー・コップ…ステップが多くて順番に迷う",
  "漏れにくさと飲みやすさが両立しにくい",
  "パーツが多いものは洗うのが大変そうに見える",
];

const axes = [
  {
    name: "漏れにくさ（カバンに入れても安心か）",
    why: "外出時にバッグの中で漏れるストレスは大きい。弁やパッキンの構造で差が出る",
  },
  {
    name: "洗いやすさ（パーツ数と形状）",
    why: "パーツが少なく、溝が浅いものほど衛生的に保ちやすい。毎日のことなので重要",
  },
  {
    name: "容量（お出かけの長さに合うか）",
    why: "近所の散歩なら150ml、長時間の外出なら200ml以上あると安心",
  },
  {
    name: "ステップアップ対応（長く使えるか）",
    why: "飲み口を交換してスパウト→ストロー→コップと段階を踏めるタイプもある",
  },
  {
    name: "保冷機能（夏場の外出に）",
    why: "真夏の公園遊びでは保冷タイプがあると飲み物がぬるくなりにくい",
  },
];

const products = [
  {
    name: "リッチェル アクリア コップでマグ",
    brand: "リッチェル",
    type: "ステップアップ" as const,
    asin: "B08F51JZW2",
    features: [
      "スパウト→ストロー→コップの3ステップに対応",
      "フタを外せばコップとしてそのまま使える",
      "パーツが少なく洗いやすいシンプル設計",
      "透明ボトルで残量が見えやすい",
    ],
    bestFor: "ステップアップしながら長く使いたい方",
    notFor: "保冷機能が欲しい方",
    priceRange: "¥1,500〜2,000",
    scene: "6ヶ月のスパウトから始めて、1歳過ぎにはコップ飲みの練習まで1つで完結",
  },
  {
    name: "コンビ ラクマグ",
    brand: "コンビ",
    type: "漏れにくい" as const,
    asin: "B08DG7FQWK",
    features: [
      "独自のラクピタ構造で傾けても漏れにくい",
      "ストローの先端が斜めカットで飲みやすい",
      "ハンドルが握りやすく赤ちゃんが自分で持てる",
      "煮沸・薬液・電子レンジ消毒すべてに対応",
    ],
    bestFor: "カバンに入れて持ち歩きたい方、漏れが気になる方",
    notFor: "コップ飲みへのステップアップを1つで済ませたい方",
    priceRange: "¥1,200〜1,800",
    scene: "バッグに横向きに入れてもサッと取り出して飲ませられる",
  },
  {
    name: "ピジョン マグマグ",
    brand: "ピジョン",
    type: "段階式" as const,
    asin: "B07X5RGMR9",
    features: [
      "3ヶ月のスパウトから段階的にステップアップ",
      "ボトルはそのままで飲み口だけ交換",
      "哺乳瓶で培った乳首設計のノウハウを活用",
      "替えパーツが手に入りやすい定番ブランド",
    ],
    bestFor: "赤ちゃんのペースに合わせて段階的に進めたい方",
    notFor: "パーツ管理をシンプルにしたい方",
    priceRange: "¥1,500〜2,500",
    scene: "3ヶ月のニップルから始めて、成長に合わせて飲み口を付け替えていく",
  },
  {
    name: "サーモス ベビーストローマグ",
    brand: "サーモス",
    type: "保冷" as const,
    asin: "B0C33NXWFK",
    features: [
      "真空断熱構造で冷たさをキープ",
      "ワンタッチオープンで片手で開閉",
      "底面にシリコン製カバーで滑りにくい",
      "ステンレスボディで丈夫、長く使える",
    ],
    bestFor: "夏場の外出が多い方、公園遊びが長い方",
    notFor: "軽さを最優先したい方（ステンレスのためやや重い）",
    priceRange: "¥2,000〜3,000",
    scene: "真夏の公園で2時間遊んでも、冷たい麦茶がそのまま飲める",
  },
];

const typeGuide = [
  {
    condition: "1つで長く使いたい",
    recommendation: "リッチェル アクリア コップでマグ",
    reason: "スパウト→ストロー→コップまでカバー。パーツ交換だけでステップアップ",
  },
  {
    condition: "外出時の漏れが心配",
    recommendation: "コンビ ラクマグ",
    reason: "ラクピタ構造で傾けても漏れにくい。バッグに入れるときも安心",
  },
  {
    condition: "赤ちゃんのペースで段階的に",
    recommendation: "ピジョン マグマグ",
    reason: "3ヶ月から使えるニップルタイプ付き。哺乳瓶から自然に移行しやすい",
  },
  {
    condition: "夏場の外出が多い",
    recommendation: "サーモス ベビーストローマグ",
    reason: "真空断熱で保冷バッチリ。長時間の外出でも冷たいまま飲ませられる",
  },
];

export default function StrawMugPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">食事</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ストローマグの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              6ヶ月頃から少しずつ始まる水分補給。漏れにくさ・洗いやすさ・容量を軸に、定番4製品を比較しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ストローマグ、なぜ迷いやすいのか
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {whyConfusing.map((reason) => (
                    <li key={reason} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-komorebi-warm mt-0.5 shrink-0">&#9679;</span>
                      {reason}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground mt-4 leading-relaxed">
                  ストロー飲みは<strong>個人差が大きく、すぐ飲める子もいれば時間がかかる子もいます</strong>。
                  マグの良し悪しではなく相性の問題なので、
                  焦らず赤ちゃんのペースに合わせてあげれば大丈夫です。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 比較軸 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              選ぶときに見るべき5つの軸
            </h2>
            <div className="space-y-3">
              {axes.map((axis, i) => (
                <Card key={axis.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{axis.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{axis.why}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. 商品別の使用感 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              まずはこの4つを見れば十分です
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
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            <strong className="text-foreground">生活シーンで言うと:</strong>
                          </p>
                          <p className="text-sm text-foreground">{product.scene}</p>
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
                      <div className="md:w-48 shrink-0">
                        <AmazonProductCard
                          name={product.name}
                          asin={product.asin}
                          price={product.priceRange}
                        />
                      </div>
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

          {/* 5. 比較表 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">比較表</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">商品</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">漏れにくさ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">洗いやすさ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">容量</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">ステップアップ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">保冷</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">リッチェル アクリア</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">200ml</td>
                    <td className="py-2 px-2 text-foreground">◎ 3段階</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">コンビ ラクマグ</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">240ml</td>
                    <td className="py-2 px-2 text-foreground">○ 2段階</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ピジョン マグマグ</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">200ml</td>
                    <td className="py-2 px-2 text-foreground">◎ 4段階</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">サーモス ストローマグ</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">250ml</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>ストロー飲みの上達は赤ちゃんそれぞれ。マグの問題ではありません。</strong>
                <br />
                うまく飲めなくても焦らなくて大丈夫。
                <br />
                どのマグを選んでも、赤ちゃんは自分のペースでちゃんと飲めるようになります。
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
                name="リッチェル アクリア コップでマグ"
                asin="B08F51JZW2"
                price="¥1,500〜"
              />
              <AmazonProductCard
                name="コンビ ラクマグ"
                asin="B08DG7FQWK"
                price="¥1,200〜"
              />
              <AmazonProductCard
                name="ピジョン マグマグ"
                asin="B07X5RGMR9"
                price="¥1,500〜"
              />
              <AmazonProductCard
                name="サーモス ベビーストローマグ"
                asin="B0C33NXWFK"
                price="¥2,000〜"
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
              価格・仕様は2026年時点の情報です。実際の価格は販売店により異なります。
              ストローマグは赤ちゃんの月齢や飲む力によって合うものが変わるため、
              最初は1つ試してみて、合わなければ別のタイプを検討するのがおすすめです。
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
