import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "哺乳瓶の選びかた",
  description:
    "哺乳瓶、どれを選べばいい？ピジョン・コンビ・ビーンスターク・チュチュの4製品を比較。乳首の形状、洗いやすさ、素材の違いを整理しました。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "乳首の形状やサイズ展開が多く、何が違うのかわからない",
  "母乳との併用（混合育児）で嫌がらないか心配",
  "ガラスとプラスチック、どちらがいいのか決められない",
  "月齢ごとに乳首を替える必要があると聞いて不安",
];

const axes = [
  {
    name: "乳首の形状",
    why: "母乳に近い形状かどうかで、混合育児のスムーズさが変わる。飲み方のクセがつきにくいものが安心",
  },
  {
    name: "流量調整（月齢対応）",
    why: "新生児は少量ずつ、成長に合わせて流量を増やす必要がある。乳首サイズの切り替えが簡単かどうかがポイント",
  },
  {
    name: "洗いやすさ",
    why: "1日に何度も洗浄・消毒する。パーツが少なくシンプルな構造ほど負担が減る",
  },
  {
    name: "素材（ガラス / プラスチック）",
    why: "ガラスは傷つきにくく清潔を保ちやすい。プラスチックは軽くて割れない。使い分けも可能",
  },
  {
    name: "価格帯",
    why: "本体＋替え乳首のトータルコスト。長く使うほど乳首の買い替え費用が効いてくる",
  },
];

const products = [
  {
    name: "ピジョン 母乳実感",
    brand: "ピジョン",
    type: "母乳併用の定番" as const,
    asin: "B0BZ5CKJF6",
    officialUrl: "https://products.pigeon.co.jp/",
    features: [
      "母乳を飲む動きを研究して設計された「母乳実感乳首」",
      "SSサイズ（新生児）からLLサイズまで5段階の乳首展開",
      "ガラス製・プラスチック製の両方をラインナップ",
      "産院での採用率が圧倒的に高く、入院中から使い慣れることが多い",
    ],
    bestFor: "混合育児の方、産院で使い始めた方、迷ったらまずこれ",
    notFor: "海外ブランドにこだわりがある方",
    priceRange: "約1,500〜2,500円（本体）",
    scene: "産院退院後からそのまま使い続けるケースが最も多い。パパやおじいちゃん・おばあちゃんでも授乳しやすい",
  },
  {
    name: "コンビ テテオ 授乳のお手本",
    brand: "コンビ",
    type: "飲む練習特化" as const,
    asin: "B07DFQJM5V",
    officialUrl: "https://www.combi.co.jp/",
    features: [
      "「4段階の流量調節」が乳首1つでできる独自設計",
      "乳首を回すだけで流量を変えられるので、買い替え頻度が低い",
      "赤ちゃんが自分で飲む力を育てるコンセプト",
      "プラスチック製で軽量。お出かけ向き",
    ],
    bestFor: "乳首の買い替えを減らしたい方、赤ちゃんの「飲む力」を育てたい方",
    notFor: "ガラス製を使いたい方（プラスチックのみ）",
    priceRange: "約1,800〜2,200円（本体）",
    scene: "1つの乳首で流量を調整できるので、外出時に替え乳首を持ち歩かなくてよい",
  },
  {
    name: "ビーンスターク 赤ちゃん思い 広口タイプ",
    brand: "ビーンスターク（雪印）",
    type: "ミルクメーカー品質" as const,
    asin: "B000FQQ5VG",
    officialUrl: "https://www.beanstalksnow.co.jp/",
    features: [
      "粉ミルクメーカーの雪印ビーンスタークが開発。ミルクとの相性を考慮",
      "ニプル（乳首）は「クロスカット」で流量が赤ちゃんの吸う力に応じて変化",
      "広口で粉ミルクが入れやすい",
      "ガラス製・プラスチック製を展開。耐熱ガラスで煮沸消毒も安心",
    ],
    bestFor: "完全ミルク育児の方、ビーンスタークの粉ミルクを使う方",
    notFor: "母乳との併用で乳首の形にこだわりたい方",
    priceRange: "約1,200〜2,000円（本体）",
    scene: "粉ミルクを計量して入れやすい広口設計。夜間の調乳で手早く準備できる",
  },
  {
    name: "ChuChu（チュチュ）広口タイプ",
    brand: "ジェクス",
    type: "コスパ型" as const,
    asin: "B00BEXNH86",
    officialUrl: "https://www.jex-inc.co.jp/",
    features: [
      "「スーパークロスカット乳首」で月齢に合わせた買い替えが不要",
      "赤ちゃんが吸った分だけミルクが出る構造で、むせにくい",
      "パーツが少なくシンプル。洗浄・組み立てがとにかく楽",
      "本体価格が手頃で、コスパに優れる",
    ],
    bestFor: "洗いやすさ・シンプルさを最優先にしたい方、乳首を月齢で替えたくない方",
    notFor: "産院でピジョンに慣れた子は嫌がる可能性あり",
    priceRange: "約800〜1,500円（本体）",
    scene: "深夜の授乳・洗い物を最小限にしたいとき。パーツが少ないので消毒もあっという間",
  },
];

const typeGuide = [
  {
    condition: "混合育児（母乳＋ミルク）、産院で使い始めた",
    recommendation: "ピジョン 母乳実感",
    reason: "母乳を飲む動きに近い設計。産院からの切り替えがスムーズ",
  },
  {
    condition: "乳首の買い替えを減らしたい、お出かけが多い",
    recommendation: "コンビ テテオ",
    reason: "1つの乳首で4段階流量調節。替え乳首を持ち歩く必要がない",
  },
  {
    condition: "完全ミルク育児、粉ミルクの調乳を楽にしたい",
    recommendation: "ビーンスターク 広口タイプ",
    reason: "広口で粉ミルクが入れやすい。ミルクメーカーならではの設計",
  },
  {
    condition: "洗いやすさ最優先、コスパ重視",
    recommendation: "チュチュ 広口タイプ",
    reason: "パーツが最も少なくシンプル。本体も手頃で乳首の買い替えも不要",
  },
];

export default function BottlePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">哺乳瓶・ミルク</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              哺乳瓶の選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              人気4製品に絞って、乳首の形状・洗いやすさ・コスパを整理しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              哺乳瓶、なぜ迷いやすいのか
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
                  結論から言うと、<strong>日本の主要メーカーの哺乳瓶はどれも品質が高い</strong>です。
                  大きな失敗はありません。
                  ここでは「自分の育児スタイルに合うもの」を見つけやすくするために、比較軸を整理しました。
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

          {/* 3. ガラス vs プラスチック */}
          <section className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  ガラスとプラスチック、どちらがいい？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">ガラス製がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・傷がつきにくく清潔を保ちたい</li>
                      <li>・ミルクの温度を素早く下げたい</li>
                      <li>・主に家で使う</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">プラスチック製がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・外出先でも使いたい（軽い・割れない）</li>
                      <li>・赤ちゃんが自分で持つようになったとき安心</li>
                      <li>・落としても割れない安心感がほしい</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  多くの方は<strong className="text-foreground">家用にガラス、外出用にプラスチック</strong>と使い分けています。
                  まず1本なら、使う場面が多い方を選ぶのがおすすめです。
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
                          officialUrl={product.officialUrl}
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">乳首の形状</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">流量調整</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">洗いやすさ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">素材</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">コスパ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ピジョン 母乳実感</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground text-xs">ガラス/プラ</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">コンビ テテオ</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground text-xs">プラのみ</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ビーンスターク</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground text-xs">ガラス/プラ</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">チュチュ 広口</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground text-xs">プラのみ</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どれを選んでも、赤ちゃんはちゃんとミルクを飲めます。</strong>
                <br />
                日本の哺乳瓶はどれも品質が高く、大きな失敗はありません。
                <br />
                最初は赤ちゃんが嫌がることもありますが、慣れていくことがほとんどです。
                <br />
                迷ったら、産院で使っていたものと同じブランドから始めてみてください。
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
                name="ピジョン 母乳実感"
                asin="B0BZ5CKJF6"
                price="¥1,800〜"
                officialUrl="https://products.pigeon.co.jp/"
              />
              <AmazonProductCard
                name="コンビ テテオ"
                asin="B07DFQJM5V"
                price="¥1,600〜"
                officialUrl="https://www.combi.co.jp/"
              />
              <AmazonProductCard
                name="ビーンスターク 哺乳瓶"
                asin="B000FQQ5VG"
                price="¥1,400〜"
                officialUrl="https://www.beanstalksnow.co.jp/"
              />
              <AmazonProductCard
                name="チュチュ 広口タイプ"
                asin="B00BEXNH86"
                price="¥1,200〜"
                officialUrl="https://www.jex-inc.co.jp/"
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
              赤ちゃんによって好みの乳首形状は異なるため、合わない場合は別の製品を試すことをおすすめします。
              参考: 各メーカー公式サイト、マイベスト、たまひよ、ゼクシィBaby
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
