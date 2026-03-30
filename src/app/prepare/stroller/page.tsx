import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "ベビーカーの選びかた",
  description:
    "ベビーカー、どれを選べばいい？コンビ・アップリカ・ピジョン・サイベックスの4製品を比較。重さ、走行性、折りたたみやすさを整理しました。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "A型・B型・AB型の違いがそもそもわかりにくい",
  "軽さと走行性がトレードオフで、何を優先すべきか迷う",
  "実際に押してみないと走行感がわからない",
  "価格帯が2万円〜8万円と広く、どこに落としどころを置くか悩む",
];

const axes = [
  {
    name: "重さ（片手で持てるか）",
    why: "電車移動や階段が多いなら5kg以下が理想。車移動中心なら7kg台でも問題なし",
  },
  {
    name: "走行性（段差・坂道）",
    why: "タイヤの大きさとサスペンションの有無で決まる。歩道の段差が多い地域では重要",
  },
  {
    name: "折りたたみやすさ",
    why: "片手でワンタッチで畳めるか。電車・バス利用時や玄関収納で効いてくる",
  },
  {
    name: "シートの快適性",
    why: "赤ちゃんが嫌がると乗ってくれない。クッション性・通気性・リクライニング角度がポイント",
  },
  {
    name: "対面/背面切替",
    why: "低月齢は対面（親の顔が見える）が安心。成長したら背面（景色が見える）が楽しい",
  },
  {
    name: "価格帯",
    why: "使用期間は約3年。月あたりのコストで考えると、高めのモデルも選択肢に入りやすい",
  },
];

const products = [
  {
    name: "コンビ スゴカルα エッグショック",
    brand: "コンビ",
    type: "超軽量" as const,
    features: [
      "重さ約5.0kgで片手で持ち上げられる軽さ",
      "エッグショック（卵を落としても割れない衝撃吸収素材）搭載",
      "ワンタッチ開閉＆持ちカルグリップで電車移動が楽",
      "オート4キャスで対面・背面どちらでも小回りが利く",
    ],
    bestFor: "電車移動が多い方、階段を使う場面がある方、軽さ最優先の方",
    notFor: "走行性を最優先にしたい方（軽さとのトレードオフ）",
    priceRange: "約55,000〜65,000円",
    scene: "電車でのお出かけ、駅のエレベーターが混雑しているとき階段を使える安心感",
  },
  {
    name: "アップリカ ラクーナクッション AF",
    brand: "アップリカ",
    type: "バランス型" as const,
    features: [
      "重さ約5.4kgで軽量と走行性を両立",
      "しっかりフレームとゆれぐらガード機構で安定走行",
      "ダブル台形シートで赤ちゃんの姿勢が安定",
      "大容量バスケット（座面下27L）で荷物が入る",
    ],
    bestFor: "軽さと走行性のバランスを求める方、荷物が多い方",
    notFor: "4kg台の超軽量にこだわる方",
    priceRange: "約50,000〜60,000円",
    scene: "近所のスーパーへの買い物から、週末の公園まで。荷物が多くても足元に入る",
  },
  {
    name: "ピジョン ランフィ RB2",
    brand: "ピジョン",
    type: "走行性バランス" as const,
    features: [
      "シングルタイヤ採用で段差をスムーズに乗り越える",
      "重さ約5.6kgでバランスの良い重量",
      "ソファのような乗り心地のクッション設計",
      "ワンタッチ開閉対応。折りたたみ時も自立する",
    ],
    bestFor: "段差の多い地域にお住まいの方、走行性と軽さの両立を求める方",
    notFor: "最軽量を求める方（5kg以下ではない）",
    priceRange: "約52,000〜62,000円",
    scene: "歩道の段差や踏切を越えるとき、シングルタイヤの乗り越えやすさを実感する",
  },
  {
    name: "サイベックス メリオ カーボン",
    brand: "サイベックス",
    type: "走行性特化" as const,
    features: [
      "カーボンフレームで約5.9kgながら剛性が高い",
      "大径タイヤ＋4輪サスペンションで走行性はトップクラス",
      "片手でコンパクトに折りたため、自立する",
      "ハイシートで地面の熱やほこりから赤ちゃんを遠ざける",
    ],
    bestFor: "走行性を最重視する方、段差や坂道が多い地域の方、デザインにもこだわりたい方",
    notFor: "予算を5万円以下に抑えたい方",
    priceRange: "約64,000〜73,000円",
    scene: "石畳や坂道が多い街での散歩。押し心地の良さでお出かけが億劫にならない",
  },
];

const typeGuide = [
  {
    condition: "軽さ最優先（電車移動が多い）",
    recommendation: "コンビ スゴカルα",
    reason: "約5.0kgで片手で持てる。ワンタッチ開閉で電車の乗り降りもスムーズ",
  },
  {
    condition: "走行性重視（段差・坂道が多い地域）",
    recommendation: "サイベックス メリオ カーボン",
    reason: "大径タイヤ＋4輪サスペンション。石畳や段差でもストレスなく走行できる",
  },
  {
    condition: "バランス型（軽さも走行性もほしい）",
    recommendation: "アップリカ ラクーナ または ピジョン ランフィ",
    reason: "5kg台で走行性も確保。日常使いで大きな不満が出にくいオールラウンダー",
  },
];

export default function StrollerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">ベビーカー</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビーカーの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              人気4製品に絞って、重さ・走行性・価格を整理しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビーカー、なぜ迷いやすいのか
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
                  結論から言うと、<strong>今回紹介する4製品はどれもA型（生後1ヶ月から使えるタイプ）の定番</strong>です。
                  大きな失敗はありません。
                  「自分の生活動線に合うかどうか」で選ぶと、迷いが減ります。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 比較軸 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              選ぶときに見るべき6つの軸
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

          {/* 3. 使用感まとめ */}
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
                    <div className="space-y-3">
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">重さ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">走行性</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">折りたたみ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">シート快適性</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">対面/背面</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">コンビ スゴカルα</td>
                    <td className="py-2 px-2 text-foreground">◎ 5.0kg</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">アップリカ ラクーナ</td>
                    <td className="py-2 px-2 text-foreground">○ 5.4kg</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ピジョン ランフィ</td>
                    <td className="py-2 px-2 text-foreground">○ 5.6kg</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">サイベックス メリオ</td>
                    <td className="py-2 px-2 text-foreground">○ 5.9kg</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どれを選んでも、赤ちゃんとの毎日は快適になります。</strong>
                <br />
                今回紹介した4製品はすべてA型の定番モデルで、大きな失敗はありません。
                <br />
                お住まいの地域と移動手段に合うものを選べば、それが正解です。
                <br />
                迷ったら、ベビー用品店で実際に押し比べてみてください。
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
                name="コンビ スゴカルα"
                asin="B0C6HBQP8M"
                imageId="41xYQdKEURL"
                price="¥55,000〜"
              />
              <AmazonProductCard
                name="アップリカ ラクーナクッション"
                asin="B0C7K8VW6G"
                imageId="41bVfKzMURL"
                price="¥50,000〜"
              />
              <AmazonProductCard
                name="ピジョン ランフィ"
                asin="B0BZ5BWVQH"
                imageId="41kXeVzNURL"
                price="¥52,000〜"
              />
              <AmazonProductCard
                name="サイベックス メリオ"
                asin="B0CDQJGGFZ"
                imageId="41wDqXzMURL"
                price="¥64,000〜"
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
              ベビーカーは赤ちゃんの体格や生活環境によって最適なものが変わるため、
              可能であれば店頭で実際に押してみることをおすすめします。
              参考: 各メーカー公式サイト、マイベスト、たまひよ、ベビーカレンダー
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
