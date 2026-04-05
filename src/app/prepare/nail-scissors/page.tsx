import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "赤ちゃんのつめ切りの選びかた",
  description:
    "赤ちゃんのつめ切り、はさみ・クリッパー・電動やすりどれがいい？タイプ別の特徴と選び方を整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const basicKnowledge = [
  {
    question: "いつから切る必要がある？",
    answer:
      "生まれたときからつめは伸びています。退院後すぐに切る場面もあります。新生児のつめは薄くて小さく、顔をひっかいて傷をつけることがあるので、こまめなケアが必要です。",
  },
  {
    question: "どのくらいの頻度で切る？",
    answer:
      "赤ちゃんのつめは大人より早く伸びます。3〜4日に1回が目安。手のつめは特に伸びが早いです。",
  },
  {
    question: "いつ切るのがベスト？",
    answer:
      "寝ているときが一番切りやすいです。起きているときは授乳中やテレビに集中しているタイミングもおすすめ。",
  },
];

const selectionPoints = [
  {
    name: "タイプ（はさみ / クリッパー / 電動やすり）",
    why: "新生児にははさみタイプが定番。月齢が上がるとクリッパーや電動やすりも選択肢に。",
  },
  {
    name: "刃先の安全性",
    why: "赤ちゃん用は刃先が丸くなっていて、肌を傷つけにくい設計。大人用の流用は避けましょう。",
  },
  {
    name: "持ちやすさ",
    why: "小さなつめを切るので、親の指にフィットするサイズ感が大事。すべり止め付きだとなお安心。",
  },
  {
    name: "お手入れのしやすさ",
    why: "清潔に保つことが大切。刃を拭きやすい構造やケース付きだと管理しやすいです。",
  },
];

export default function NailScissorsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">ケア用品</Badge>
              <Badge variant="secondary">つめ切り</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              赤ちゃんのつめ切りの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              はさみ・クリッパー・電動やすり、それぞれの特徴を整理しました。
            </p>
          </div>

          {/* 1. 基本知識 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              まず知っておきたい基本
            </h2>
            <div className="space-y-3">
              {basicKnowledge.map((item) => (
                <Card key={item.question} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {item.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 2. 選び方のポイント */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              選ぶときのポイント
            </h2>
            <div className="space-y-3">
              {selectionPoints.map((point, i) => (
                <Card key={point.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">
                          {point.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {point.why}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. タイプ別の特徴 */}
          <section className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  タイプ別の特徴
                </h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">はさみタイプ</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・新生児から使える定番。刃先が丸く安全</li>
                      <li>・小さなつめを少しずつカットできる</li>
                      <li>・価格が手ごろ（500〜1,000円程度）</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">クリッパータイプ（てこ型）</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・大人のつめ切りに近い使い勝手</li>
                      <li>・つめが硬くなる6ヶ月頃からおすすめ</li>
                      <li>・一度にパチンと切れるので手早い</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">電動やすりタイプ</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・つめを削って整えるので深爪の心配がない</li>
                      <li>・寝ている間にやさしく仕上げられる</li>
                      <li>・月齢別のアタッチメント付きが多い</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong className="text-foreground">新生児期はまず「はさみタイプ」を1本。</strong>
                  月齢が上がって動き回るようになったら、電動やすりを追加するのもおすすめです。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 4. おすすめ商品 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おすすめのつめ切り
            </h2>
            <div className="space-y-4">
              {/* ピジョン 新生児つめきりはさみ */}
              <Card className="border-border/50 shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base">
                      ピジョン 新生児つめきりはさみ
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">ピジョン</Badge>
                      <Badge variant="secondary" className="text-xs">はさみタイプ</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-3">
                      <ul className="space-y-1">
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          小さく薄い新生児のつめに特化した刃先
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          刃先が丸く、赤ちゃんの指を傷つけにくい
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          抗菌剤入りハンドルで衛生的
                        </li>
                      </ul>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          新生児つめ切りの定番中の定番。産院でも使われていることが多く、初めてのつめ切りに安心の1本です。
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        価格帯: 約600〜900円
                      </p>
                    </div>
                    <div className="md:w-48 shrink-0">
                      <AmazonProductCard
                        name="ピジョン 新生児つめきりはさみ"
                        asin="B000FI0QWS"
                        price="¥600〜"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* コンビ ベビーレーベル つめきりハサミ */}
              <Card className="border-border/50 shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base">
                      コンビ ベビーレーベル つめきりハサミ
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">コンビ</Badge>
                      <Badge variant="secondary" className="text-xs">はさみタイプ</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-3">
                      <ul className="space-y-1">
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          3ヶ月頃から使えるしっかりした刃
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          ハンドルが大きめで親の指にフィット
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          キャップ付きで持ち運びにも安心
                        </li>
                      </ul>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          少し月齢が上がってつめがしっかりしてきた頃に。ハンドルの握りやすさに定評があり、長く使えます。
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        価格帯: 約700〜1,000円
                      </p>
                    </div>
                    <div className="md:w-48 shrink-0">
                      <AmazonProductCard
                        name="コンビ ベビーレーベル つめきりハサミ"
                        asin="B005OSRHNG"
                        price="¥700〜"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* コンビ ベビー用電動ネイルケア */}
              <Card className="border-border/50 shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base">
                      コンビ ベビー用電動ネイルケア
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">コンビ</Badge>
                      <Badge variant="secondary" className="text-xs">電動やすり</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-3">
                      <ul className="space-y-1">
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          つめを削るタイプなので深爪の心配なし
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          月齢に合わせた6種類のアタッチメント付き
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          LEDライト付きで暗い部屋でも使える
                        </li>
                      </ul>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          はさみが怖いという方に。寝ている間にやさしく削れるので、親も赤ちゃんもストレスフリー。大人のネイルケアにも使えます。
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        価格帯: 約1,500〜2,500円
                      </p>
                    </div>
                    <div className="md:w-48 shrink-0">
                      <AmazonProductCard
                        name="コンビ ベビー用電動ネイルケア"
                        asin="B08GS4QJ4J"
                        price="¥1,500〜"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 5. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>赤ちゃんのつめ切り、最初は誰でも緊張します。</strong>
                <br />
                少しずつ、慣れていけば大丈夫。完璧に切れなくても問題ありません。
                <br />
                万が一少し切りすぎても、赤ちゃんのつめはすぐに伸びます。
                <br />
                はさみが怖ければ、電動やすりから始めるのも良い選択です。
              </p>
            </CardContent>
          </Card>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              価格・仕様は2026年4月時点の情報です。実際の価格は販売店により異なります。
              つめ切り中に出血した場合は、清潔なガーゼで数分押さえれば止まります。心配な場合はかかりつけ医にご相談ください。
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
