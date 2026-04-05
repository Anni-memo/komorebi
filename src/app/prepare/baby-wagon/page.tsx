import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "ベビーワゴンの選びかた",
  description:
    "ベビーワゴンでおむつ・着替え・ケアグッズをまとめて移動。選ぶポイントとおすすめ3選を紹介。このページを見たら、もう探し回らなくて大丈夫です。",
};

const keyPoints = [
  {
    name: "段数とバスケットの深さ",
    detail: "3段が主流。上段はおむつ・おしり拭きなど頻繁に使うもの、中段は着替え、下段はストック。深すぎると中身が見えにくい",
  },
  {
    name: "キャスターの動きやすさ・ロック機能",
    detail: "片手で押せるスムーズなキャスターが理想。赤ちゃんのそばに置くときはロック付きだと安心",
  },
  {
    name: "サイズと設置場所",
    detail: "幅35〜45cmが一般的。リビングと寝室を行き来するなら、ドアの幅を確認しておくと失敗しない",
  },
  {
    name: "耐荷重と素材",
    detail: "スチール製は丈夫で安定感がある。プラスチック製は軽量で移動しやすい。どちらも一長一短",
  },
  {
    name: "組み立ての簡単さ",
    detail: "妊娠中や産後すぐに組み立てることが多い。工具不要のタイプや、完成品で届くものが楽",
  },
];

const products = [
  {
    name: "IKEA RÅSKOG ワゴン",
    brand: "IKEA",
    type: "スチール3段" as const,
    asin: "",
    officialUrl: "https://www.ikea.com/jp/",
    features: [
      "北欧デザインでインテリアに馴染む",
      "スチール製で頑丈、耐荷重も十分",
      "バスケットの深さがちょうど良く、中身が見やすい",
      "カラーバリエーションが豊富",
    ],
    bestFor: "デザインにこだわりたい方、長くインテリアとして使いたい方",
    notFor: "近くにIKEAがない方（通販は送料がかかる場合あり）",
    priceRange: "約4,000〜5,000円",
  },
  {
    name: "山善 バスケットトローリー",
    brand: "山善",
    type: "スチール3段" as const,
    asin: "B07477MH2X",
    officialUrl: "",
    features: [
      "IKEAのRÅSKOGと同等の機能で手軽に入手できる",
      "Amazonで購入可能、配送が早い",
      "キャスター付きで移動がスムーズ",
      "組み立てが比較的簡単（約15分）",
    ],
    bestFor: "Amazonで手軽に購入したい方、コスパを重視する方",
    notFor: "完成品で届いてほしい方（組み立てが必要）",
    priceRange: "約3,000〜4,500円",
  },
  {
    name: "ニトリ スチールワゴン",
    brand: "ニトリ",
    type: "スチール3段" as const,
    asin: "",
    officialUrl: "https://www.nitori-net.jp/",
    features: [
      "全国の店舗で実物を確認してから購入できる",
      "お値段以上のしっかりした作り",
      "キャスター付き、ストッパーも搭載",
      "シンプルなデザインでどんな部屋にも合う",
    ],
    bestFor: "実物を見て買いたい方、ニトリのポイントを活用したい方",
    notFor: "ネット通販だけで済ませたい方（店舗受取がメインの場合あり）",
    priceRange: "約2,500〜4,000円",
  },
];

const usageTips = [
  {
    title: "上段: すぐ使うもの",
    items: "おむつ、おしり拭き、ガーゼ、体温計、保湿クリーム",
  },
  {
    title: "中段: 着替え・タオル",
    items: "肌着の替え、スタイ、タオル、授乳パッド",
  },
  {
    title: "下段: ストック・予備",
    items: "おむつのストック、季節の着替え、ブランケット",
  },
];

const typeGuide = [
  {
    condition: "デザイン重視、長くインテリアとして使いたい",
    recommendation: "IKEA RÅSKOG ワゴン",
    reason: "北欧デザインが魅力。赤ちゃん時期が終わってもキッチンや洗面所で長く使える",
  },
  {
    condition: "すぐ届いてほしい、コスパ重視",
    recommendation: "山善 バスケットトローリー",
    reason: "Amazonで翌日届くことも。価格もリーズナブルで機能は十分",
  },
  {
    condition: "実物を見てから決めたい",
    recommendation: "ニトリ スチールワゴン",
    reason: "全国に店舗があり、実際にキャスターの動きやサイズ感を確認できる",
  },
];

export default function BabyWagonPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">収納・整理</Badge>
              <Badge variant="secondary">ベビーワゴン</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビーワゴンの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              おむつ・着替え・ケアグッズをひとまとめにして、必要な場所にすっと移動。
            </p>
          </div>

          {/* 1. 基本知識 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビーワゴンって必要？
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  赤ちゃんのお世話グッズは意外と多い。おむつ、おしり拭き、着替え、保湿クリーム、体温計...。
                  これらを<strong>ひとまとめにしてキャスターで移動できる</strong>のがベビーワゴンです。
                  リビングで過ごすとき、寝室で寝かしつけるとき、どこにいてもすぐに必要なものに手が届きます。
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  「なくても困らない」けれど「あると確実に楽になる」アイテム。
                  赤ちゃん時期が終わったあとも、キッチンワゴンや洗面所の収納として長く使えます。
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

          {/* 3. 収納例 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              段ごとの収納例
            </h2>
            <div className="space-y-3">
              {usageTips.map((tip) => (
                <Card key={tip.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm font-semibold text-foreground mb-1">{tip.title}</p>
                    <p className="text-xs text-muted-foreground">{tip.items}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. おすすめ商品 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おすすめのベビーワゴン3選
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
                      {product.asin ? (
                        <div className="md:w-48 shrink-0">
                          <AmazonProductCard
                            name={product.name}
                            asin={product.asin}
                            price={product.priceRange}
                            officialUrl={product.officialUrl || undefined}
                          />
                        </div>
                      ) : product.officialUrl ? (
                        <div className="md:w-48 shrink-0 flex items-center">
                          <a
                            href={product.officialUrl}
                            rel="noopener noreferrer"
                            className={buttonVariants({ variant: "outline", size: "sm" })}
                          >
                            公式サイトで見る
                          </a>
                        </div>
                      ) : null}
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

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どのワゴンを選んでも、お世話は格段に楽になります。</strong>
                <br />
                大事なのは「必要なものがすぐ手に届く環境」を作ること。
                <br />
                赤ちゃんのお世話で両手がふさがっているとき、
                <br />
                すべてがひとまとめになっているだけで心にゆとりが生まれます。
              </p>
            </CardContent>
          </Card>

          {/* 購入できる場所 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              購入できる場所
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              山善のバスケットトローリーはAmazonで購入できます。IKEAとニトリは公式サイト・店舗をご利用ください。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AmazonProductCard
                name="山善 バスケットトローリー"
                asin="B07477MH2X"
                price="¥3,000〜"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格は各販売店でご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              価格・仕様は2026年4月時点の情報です。実際の価格は販売店により異なります。
              ワゴンを赤ちゃんのそばに置くときは、必ずキャスターをロックしてください。
              小さなパーツやストック品は赤ちゃんの手が届かない下段に置くと安全です。
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
