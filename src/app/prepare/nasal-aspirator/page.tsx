import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "電動鼻吸い器の選びかた",
  description:
    "電動鼻吸い器、どれを選べばいい？メルシーポット・ピジョン・ベビースマイルを比較。吸引力、音、お手入れを整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "据え置き型とハンディ型、どちらが正解かわからない",
  "吸引力が強すぎると赤ちゃんが痛がらないか心配",
  "音がうるさいと嫌がって使えないのでは？",
  "そもそも電動が必要なのか、口で吸うタイプで十分なのか",
];

const axes = [
  {
    name: "吸引力",
    why: "粘度の高い鼻水にも対応できるかどうか。据え置き型が一般的に強い",
  },
  {
    name: "音の大きさ",
    why: "音に敏感な赤ちゃんは泣いて嫌がることも。静音性は使い続けられるかに影響",
  },
  {
    name: "お手入れのしやすさ",
    why: "毎回分解して洗う必要がある。パーツが少ないほど楽。煮沸消毒対応かも重要",
  },
  {
    name: "持ち運び（据え置き vs ハンディ）",
    why: "家専用なら据え置き。保育園の送り迎え前にサッと使いたいならハンディ",
  },
  {
    name: "価格帯",
    why: "据え置き型は8,000〜15,000円、ハンディ型は3,000〜5,000円。併用する家庭も多い",
  },
];

const products = [
  {
    name: "メルシーポット S-504",
    brand: "シースター",
    type: "据え置き" as const,
    features: [
      "電動鼻吸い器の代名詞。圧倒的な知名度と販売実績",
      "耳鼻科レベルの吸引力（-83kPa±10%）",
      "2024年モデルで静音化・小型化が実現",
      "ベビちゃんクリップで吸引力を瞬間的に高める機能付き",
    ],
    bestFor: "しっかり吸引したい方、家での使用がメインの方",
    notFor: "持ち運びを重視する方（据え置き型のため）",
    priceRange: "約10,000〜13,000円",
    scene: "風邪の季節、寝る前にしっかり吸引。奥の方の鼻水も吸えるので耳鼻科に行く回数が減る",
  },
  {
    name: "ピジョン 電動鼻吸い器",
    brand: "ピジョン",
    type: "据え置き" as const,
    features: [
      "哺乳瓶メーカーの安心感と品質",
      "吸引力をダイヤルで細かく調整できる",
      "洗浄パーツが少なくお手入れが楽",
      "静音設計で赤ちゃんが怖がりにくい",
    ],
    bestFor: "吸引力を細かく調整したい方、お手入れの楽さ重視の方",
    notFor: "最強の吸引力を求める方（メルシーポットよりやや控えめ）",
    priceRange: "約10,000〜13,000円",
    scene: "新生児の繊細な鼻にもやさしい吸引力調整。パーツが少ないから洗い物がストレスにならない",
  },
  {
    name: "ベビースマイル S-303",
    brand: "シースター",
    type: "ハンディ" as const,
    features: [
      "電池式でどこでも使えるハンディタイプ",
      "メルシーポットと同じメーカーの技術力",
      "片手で持てるコンパクトサイズ",
      "キャップ付きでバッグに入れて持ち運べる",
    ],
    bestFor: "外出先でも使いたい方、据え置きのサブ機として",
    notFor: "粘度の高い鼻水をしっかり吸いたい方（据え置きより吸引力は控えめ）",
    priceRange: "約3,500〜5,000円",
    scene: "保育園に行く前にサッと一吸い。外出先のおむつ替えのときにも。据え置きとの併用が理想",
  },
  {
    name: "コンビ 電動鼻吸い器 S-80",
    brand: "コンビ",
    type: "据え置き" as const,
    features: [
      "静音設計で赤ちゃんが嫌がりにくい",
      "医療機器メーカーとの共同開発",
      "シンプルな構造でパーツが少ない",
      "コンパクトな本体で収納しやすい",
    ],
    bestFor: "静音性を最優先にしたい方、シンプルなものを求める方",
    notFor: "ハンディ型の気軽さを求める方",
    priceRange: "約8,000〜12,000円",
    scene: "寝ている赤ちゃんの鼻詰まりにも使いやすい静かさ。音に敏感な子にはこれ",
  },
];

const typeGuide = [
  {
    condition: "しっかり吸引、家での使用メイン",
    recommendation: "メルシーポット S-504",
    reason: "耳鼻科レベルの吸引力。風邪の季節に頼れる1台",
  },
  {
    condition: "吸引力の調整、お手入れの楽さ重視",
    recommendation: "ピジョン 電動鼻吸い器",
    reason: "ダイヤルで細かく調整。パーツが少なく洗いやすい",
  },
  {
    condition: "外出先でも使いたい、サブ機がほしい",
    recommendation: "ベビースマイル S-303",
    reason: "ハンディで持ち運べる。据え置きと併用がベスト",
  },
  {
    condition: "音に敏感な赤ちゃん、静音性最優先",
    recommendation: "コンビ 電動鼻吸い器 or ピジョン",
    reason: "静音設計で赤ちゃんが怖がりにくい",
  },
];

export default function NasalAspiratorPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">ヘルスケア</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              電動鼻吸い器の選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              据え置き型とハンディ型の違い、吸引力と静音性を整理しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              電動鼻吸い器、なぜ迷いやすいのか
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
                  結論から言うと、<strong>電動鼻吸い器は「買ってよかった育児グッズNo.1」に選ばれることが多い</strong>アイテムです。
                  口で吸うタイプは親への感染リスクがあるため、電動がおすすめ。
                  据え置き型をメインに、余裕があればハンディ型をサブに持つのが理想です。
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

          {/* 3. 据え置き vs ハンディ */}
          <section className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  据え置き型とハンディ型、どちらがいい？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">据え置き型</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・吸引力が強く、粘度の高い鼻水も対応</li>
                      <li>・風邪をひいたときに頼りになる</li>
                      <li>・耳鼻科に行く回数を減らせる</li>
                      <li>・電源コードが必要</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">ハンディ型</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・電池式でどこでも使える</li>
                      <li>・コンパクトで持ち運びが楽</li>
                      <li>・サラサラの鼻水ならこれで十分</li>
                      <li>・据え置きより吸引力は控えめ</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong className="text-foreground">おすすめは「据え置き型をメイン＋ハンディ型をサブ」の併用。</strong>
                  予算が限られている場合は、まず据え置き型1台で十分です。
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">吸引力</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">静音性</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">お手入れ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">メルシーポット</td>
                    <td className="py-2 px-2 text-foreground">据え置き</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">約1〜1.3万</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ピジョン</td>
                    <td className="py-2 px-2 text-foreground">据え置き</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">約1〜1.3万</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ベビースマイル</td>
                    <td className="py-2 px-2 text-foreground">ハンディ</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">約0.35〜0.5万</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">コンビ</td>
                    <td className="py-2 px-2 text-foreground">据え置き</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">約0.8〜1.2万</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どれを選んでも、鼻詰まりの不安は軽くなります。</strong>
                <br />
                電動鼻吸い器は「買ってよかった」と多くの先輩ママパパが言うアイテムです。
                <br />
                赤ちゃんは最初泣きますが、すぐ慣れます。吸った後のスッキリした顔を見ると安心します。
                <br />
                迷ったらメルシーポットかピジョンを選べば間違いありません。
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
                name="メルシーポット"
                asin="B09YDQ79FR"
                imageId="41Xy1KZWXKL"
                price="¥9,800〜"
              />
              <AmazonProductCard
                name="ピジョン 電動鼻吸い器"
                asin="B089Y12RHN"
                imageId="41kXeVzKURL"
                price="¥5,500〜"
              />
              <AmazonProductCard
                name="ベビースマイル"
                asin="B08FSBNZWN"
                imageId="41JiVqKpURL"
                price="¥3,800〜"
              />
              <AmazonProductCard
                name="コンビ 電動鼻吸い器"
                asin="B0BXNQG5Q8"
                imageId="41FqNzXMURL"
                price="¥4,500〜"
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
              鼻血が出る場合や長期間鼻詰まりが続く場合は、耳鼻科を受診してください。
              参考: LDK Baby、マイベスト、ママリ口コミ大賞
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
