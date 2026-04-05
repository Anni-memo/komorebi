import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "ファーストシューズの選びかた",
  description:
    "つかまり立ち〜よちよち歩き期のファーストシューズ選び。ニューバランス・アシックス・ミキハウス・イフミーの4ブランドを比較。",
};

const whyConfusing = [
  "「足に悪い靴を履かせたくない」というプレッシャーが強い",
  "サイズの測りかたが分からない（赤ちゃんは足を測らせてくれない）",
  "デザインで選んでいいのか、機能で選ぶべきか迷う",
];

const axes = [
  {
    name: "サイズ（実寸+0.5〜1cmが目安）",
    why: "赤ちゃんの足は柔らかいので、きつい靴は変形のリスク。大きすぎると歩きにくい",
  },
  {
    name: "ソールの柔らかさ（足指が使えるか）",
    why: "ファーストシューズは裸足に近い感覚が理想。ソールが硬すぎると足指でつかむ力が育ちにくい",
  },
  {
    name: "履き口の広さ（履かせやすさ）",
    why: "赤ちゃんは足を入れるのを嫌がることも多い。履き口が大きく開くと親のストレスが減る",
  },
  {
    name: "つま先の余裕（指が動かせるか）",
    why: "つま先が丸く広いデザインなら、足指を自由に動かして地面をつかむ感覚が育つ",
  },
  {
    name: "かかとの安定性（グラつきを防ぐ）",
    why: "かかと周りがしっかりしていると、よちよち歩きでも足首が安定しやすい",
  },
];

const products = [
  {
    name: "ニューバランス IT313",
    brand: "ニューバランス",
    type: "幅広・安定" as const,
    asin: "B09F9P6BZ5",
    features: [
      "幅広設計で日本の赤ちゃんの足にフィットしやすい",
      "面ファスナーが大きく開いて履かせやすい",
      "クッション性の高いソールで歩き始めの衝撃を吸収",
      "カラーバリエーションが豊富",
    ],
    bestFor: "幅広・甲高の赤ちゃん、履かせやすさを重視する方",
    notFor: "細身の足の赤ちゃん（フィット感がゆるくなることも）",
    priceRange: "¥4,000〜5,500",
    scene: "足の幅が広めの赤ちゃんに。ガバッと開いてサッと履かせられるから朝の準備が楽",
  },
  {
    name: "アシックス ファブレ FIRST",
    brand: "アシックス",
    type: "国産・足型研究" as const,
    asin: "B08K3XRDWL",
    features: [
      "日本の赤ちゃん数万人の足型データに基づく設計",
      "つま先が大きく丸い形で指が自由に動く",
      "2本ベルトでフィット感を細かく調整可能",
      "かかと部分の安定構造で歩行をサポート",
    ],
    bestFor: "足の発達を重視する方、小児科でもよく推奨されるブランド",
    notFor: "カラーバリエーションを重視する方（控えめなデザインが多い）",
    priceRange: "¥4,500〜6,000",
    scene: "「足にいい靴を」と思ったらまずアシックス。研究に基づいた安心感がある",
  },
  {
    name: "ミキハウス ファーストシューズ",
    brand: "ミキハウス",
    type: "高品質" as const,
    asin: "B0BCR8DJ6F",
    features: [
      "国内工場で熟練職人が手作り",
      "フレックスソールで足なりに曲がる柔らかさ",
      "大きく開く履き口で赤ちゃんの足を入れやすい",
      "お祝いやプレゼントにも選ばれる上質な仕上がり",
    ],
    bestFor: "品質にこだわりたい方、出産祝いとして贈りたい方",
    notFor: "コストを抑えたい方",
    priceRange: "¥7,000〜9,000",
    scene: "「最初の一足は特別なものを」という気持ちに応えてくれる丁寧な作り",
  },
  {
    name: "イフミー FIRST",
    brand: "イフミー",
    type: "コスパ◎" as const,
    asin: "B0BLC4W34Y",
    features: [
      "早稲田大学スポーツ科学学術院との共同開発",
      "足指が動きやすい独自のウインドラスソーサー搭載",
      "息するソール（通気孔付き）で蒸れにくい",
      "手頃な価格で機能性が高い",
    ],
    bestFor: "コスパを重視する方、汗っかきの赤ちゃん",
    notFor: "ブランド感やデザイン性を重視する方",
    priceRange: "¥3,000〜4,000",
    scene: "すぐサイズアウトするファーストシューズ。コスパがいいと気軽に買い替えできる",
  },
];

const typeGuide = [
  {
    condition: "幅広・甲高の足",
    recommendation: "ニューバランス IT313",
    reason: "幅広設計で窮屈にならない。履き口が大きく開いて履かせやすいのもポイント",
  },
  {
    condition: "足の発達を重視したい",
    recommendation: "アシックス ファブレ FIRST",
    reason: "日本の赤ちゃんの足型データに基づく設計。小児科でも推奨されることが多い",
  },
  {
    condition: "特別な一足・お祝い",
    recommendation: "ミキハウス ファーストシューズ",
    reason: "国内工場の手作り。出産祝いにも喜ばれる上質さ",
  },
  {
    condition: "コスパ重視・買い替え前提",
    recommendation: "イフミー FIRST",
    reason: "大学との共同開発で機能性は十分。3ヶ月でサイズアウトしても気負わない価格",
  },
];

export default function FirstShoesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">おでかけ</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ファーストシューズの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              つかまり立ちからよちよち歩きへ。足の発達を守る最初の一足を、4ブランドで比較しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ファーストシューズ、なぜ迷いやすいのか
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
                  大切なのは<strong>「サイズが合っていること」と「足指が動かせること」</strong>の2点です。
                  この2つを押さえていれば、どのブランドを選んでも大丈夫。
                  3ヶ月ほどでサイズアウトするので、気負わず選んでください。
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">幅</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">ソールの柔軟性</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">履かせやすさ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">かかと安定</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">NB IT313</td>
                    <td className="py-2 px-2 text-foreground">◎ 幅広</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">¥4,000〜</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">アシックス ファブレ</td>
                    <td className="py-2 px-2 text-foreground">○ 標準</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">¥4,500〜</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ミキハウス</td>
                    <td className="py-2 px-2 text-foreground">○ 標準</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">¥7,000〜</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">イフミー FIRST</td>
                    <td className="py-2 px-2 text-foreground">○ 標準</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">¥3,000〜</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>ファーストシューズは3ヶ月ほどでサイズアウトします。</strong>
                <br />
                だから、気負いすぎなくて大丈夫。
                <br />
                サイズが合っていて、足指が動かせれば、どれを選んでもお子さまの成長を支えてくれます。
              </p>
            </CardContent>
          </Card>

          {/* 購入できる場所 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              購入できる場所
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              ここで紹介した商品はAmazonでも購入できます。できれば一度店頭で足のサイズを測ってもらうと安心です。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AmazonProductCard
                name="ニューバランス IT313"
                asin="B09F9P6BZ5"
                price="¥4,000〜"
              />
              <AmazonProductCard
                name="アシックス ファブレ FIRST"
                asin="B08K3XRDWL"
                price="¥4,500〜"
              />
              <AmazonProductCard
                name="ミキハウス ファーストシューズ"
                asin="B0BCR8DJ6F"
                price="¥7,000〜"
              />
              <AmazonProductCard
                name="イフミー FIRST"
                asin="B0BLC4W34Y"
                price="¥3,000〜"
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
              赤ちゃんの足のサイズは個人差が大きいため、
              可能であれば靴専門店やベビー用品店で足のサイズを計測してから購入することをおすすめします。
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
