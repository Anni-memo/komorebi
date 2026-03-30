import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "離乳食グッズの選びかた",
  description:
    "離乳食グッズ、何を揃えればいい？手動 vs 電動、冷凍保存、調理セットを整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "「最低限これだけ」がわからない。セットで買うべき？",
  "手動で十分なのか、電動を買うべきなのか迷う",
  "100均でも代用できると聞くけど、専用品との差がわからない",
  "冷凍ストック派か、毎回作る派かで必要なものが変わる",
];

const axes = [
  {
    name: "手動 vs 電動",
    why: "少量だけなら手動で十分。まとめて作り置きするなら電動が時短になる",
  },
  {
    name: "冷凍保存のしやすさ",
    why: "離乳食は冷凍ストックが基本。小分けトレーの使いやすさが毎日の手間に直結",
  },
  {
    name: "調理工程の少なさ",
    why: "すりつぶす・裏ごす・刻む。工程が少ないほど続けやすい",
  },
  {
    name: "洗いやすさ",
    why: "パーツが多いと洗い物が増える。食洗機対応かどうかもチェック",
  },
  {
    name: "価格帯",
    why: "セットで2,000〜5,000円、電動は10,000〜20,000円。使う期間は約1年",
  },
];

const products = [
  {
    name: "リッチェル わけわけフリージングブロックトレー",
    brand: "リッチェル",
    type: "冷凍保存" as const,
    asin: "B009AULKVY",
    officialUrl: "https://www.richell.co.jp/",
    features: [
      "離乳食の冷凍ストック作りの定番中の定番",
      "15ml・25ml・50mlの3サイズ展開で月齢に合わせやすい",
      "底を押すだけで1個ずつ取り出せる",
      "積み重ねて冷凍庫に収納できる省スペース設計",
    ],
    bestFor: "冷凍ストック派の方、まとめて作り置きしたい方",
    notFor: "毎回その場で作る派の方（使う場面が少ない）",
    priceRange: "約400〜600円/個",
    scene: "週末にまとめて作って冷凍。平日はレンジで解凍するだけ。ワンオペの強い味方",
  },
  {
    name: "ピジョン 調理セット",
    brand: "ピジョン",
    type: "手動・セット" as const,
    asin: "B000FHR5GM",
    officialUrl: "https://products.pigeon.co.jp/",
    features: [
      "おろし器・裏ごし器・すり鉢・すり棒など一式がコンパクトにまとまる",
      "電子レンジ・食洗機対応で衛生的",
      "離乳食初期〜完了期まで使える",
      "哺乳瓶メーカーの安心設計",
    ],
    bestFor: "離乳食初心者、まず一式揃えたい方",
    notFor: "大量に作り置きしたい方（手動なので量が多いと大変）",
    priceRange: "約2,000〜3,000円",
    scene: "離乳食スタート時にこれ1つあれば始められる。少量ずつ丁寧に作りたい方に",
  },
  {
    name: "コンビ ベビーレーベル 離乳食ナビゲート調理セット",
    brand: "コンビ",
    type: "手動・セット" as const,
    asin: "B00BQ1MN9O",
    officialUrl: "https://www.combi.co.jp/",
    features: [
      "すりつぶし・裏ごし・角切りなど段階別に使える",
      "重ねてコンパクトに収納できる",
      "ステップごとのガイド付きで初心者にやさしい",
      "電子レンジ加熱に対応",
    ],
    bestFor: "離乳食の進め方がわからない初心者",
    notFor: "すでにブレンダーを持っている方（機能が重複する）",
    priceRange: "約2,500〜3,500円",
    scene: "月齢に合わせて使うパーツが変わるガイド付き。初めての離乳食でも手順がわかりやすい",
  },
  {
    name: "ベビーブレッツァ フードメーカー",
    brand: "ベビーブレッツァ",
    type: "電動・時短" as const,
    asin: "B08GY4Y6J7",
    officialUrl: "",
    features: [
      "蒸す＋刻む＋混ぜるを1台で完結",
      "ボタン1つで蒸し野菜のペーストが完成",
      "まとめて作って冷凍ストックが効率的に作れる",
      "大容量で一度にたくさん調理できる",
    ],
    bestFor: "時短重視の方、まとめて作り置きしたい方、双子の家庭",
    notFor: "少量だけ作りたい方（大きいので場所を取る）",
    priceRange: "約12,000〜18,000円",
    scene: "週末に1時間で1週間分の離乳食を作り置き。共働き家庭の強い味方",
  },
];

const typeGuide = [
  {
    condition: "離乳食をこれから始める初心者",
    recommendation: "ピジョン 調理セット or コンビ ベビーレーベル",
    reason: "一式揃って2,000〜3,000円。まずはこれで十分に始められる",
  },
  {
    condition: "冷凍ストック派、まとめて作り置き",
    recommendation: "リッチェル フリージングブロックトレー ＋ 調理セット",
    reason: "トレーは必須。調理セットと組み合わせれば初期〜完了期まで対応",
  },
  {
    condition: "時短重視、共働き、双子",
    recommendation: "ベビーブレッツァ フードメーカー",
    reason: "初期投資は高いが、毎日の調理時間を大幅に短縮。1年使えば元は取れる",
  },
  {
    condition: "コスパ重視、最低限で始めたい",
    recommendation: "リッチェル トレー ＋ 100均のすり鉢・裏ごし器",
    reason: "冷凍トレーだけは専用品がおすすめ。調理器具は100均でも代用可能",
  },
];

export default function BabyFoodGoodsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">離乳食</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              離乳食グッズの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              手動・電動の違いと、冷凍ストックの作り方を整理しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              離乳食グッズ、なぜ迷いやすいのか
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
                  結論から言うと、<strong>最初は手動の調理セットと冷凍トレーがあれば十分</strong>です。
                  電動が必要かどうかは、離乳食を始めてから判断しても遅くありません。
                  ここでは「何から揃えればいいか」を整理しました。
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

          {/* 3. 手動 vs 電動 */}
          <section className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  手動と電動、どちらがいい？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">手動がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・少量ずつ丁寧に作りたい</li>
                      <li>・初期投資を抑えたい</li>
                      <li>・収納スペースが限られている</li>
                      <li>・離乳食初期（ペースト状）だけ手作りする予定</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">電動がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・まとめて作り置きしたい</li>
                      <li>・共働きで調理時間を短縮したい</li>
                      <li>・双子や年子で量が必要</li>
                      <li>・離乳食を長期間（完了期まで）手作りする予定</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  迷ったらまず<strong className="text-foreground">手動の調理セット</strong>から始めて、
                  「もっと楽にしたい」と思ったら電動を検討するのがおすすめです。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 4. 商品別の使用感 */}
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
                          officialUrl={product.officialUrl || undefined}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. タイプ別おすすめ */}
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

          {/* 6. 比較表 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">比較表</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">商品</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">タイプ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">冷凍保存</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">時短</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">洗いやすさ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">コスパ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">リッチェル トレー</td>
                    <td className="py-2 px-2 text-foreground">保存</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ピジョン 調理セット</td>
                    <td className="py-2 px-2 text-foreground">手動</td>
                    <td className="py-2 px-2 text-foreground">-</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">コンビ ベビーレーベル</td>
                    <td className="py-2 px-2 text-foreground">手動</td>
                    <td className="py-2 px-2 text-foreground">-</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">ブレッツァ</td>
                    <td className="py-2 px-2 text-foreground">電動</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>道具にこだわりすぎなくて大丈夫です。</strong>
                <br />
                離乳食は「完璧に作ること」より「続けられること」が大事。
                <br />
                ベビーフードを活用しながら、無理のない範囲で手作りすれば十分です。
                <br />
                まずは冷凍トレーと調理セットから始めてみてください。
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
                name="リッチェル フリージングトレー"
                asin="B009AULKVY"
                price="¥600〜"
                officialUrl="https://www.richell.co.jp/"
              />
              <AmazonProductCard
                name="ピジョン 調理セット"
                asin="B000FHR5GM"
                price="¥2,200〜"
                officialUrl="https://products.pigeon.co.jp/"
              />
              <AmazonProductCard
                name="コンビ ベビーレーベル"
                asin="B00BQ1MN9O"
                price="¥3,500〜"
                officialUrl="https://www.combi.co.jp/"
              />
              <AmazonProductCard
                name="ベビーブレッツァ"
                asin="B08GY4Y6J7"
                price="¥12,000〜"
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
              価格・仕様は2026年3月時点の情報です。実際の価格は販売店により異なります。
              アレルギーが気になる食材は、かかりつけ医に相談のうえ進めてください。
              参考: ひよこクラブ編集部、マイベスト、ママリ口コミ大賞
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
