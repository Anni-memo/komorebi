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
  title: "ベビーゲートの選びかた",
  description:
    "はいはい開始後に必要になるベビーゲート。つっぱり式・ねじ止め式・置くだけタイプの3種類を比較しました。",
};

const whyConfusing = [
  "つっぱり式・ねじ止め式・置くだけ…設置方法が3種類もある",
  "設置場所の幅や壁の材質で使えるものが変わる",
  "「いつまで使うか」が想像しにくい",
];

const axes = [
  {
    name: "設置方法（壁に穴を開けてよいか）",
    why: "賃貸ならつっぱり式か置くだけタイプ。持ち家でしっかり固定したいならねじ止め式",
  },
  {
    name: "設置場所の幅（対応サイズ）",
    why: "間口の広さに合わないと設置できない。購入前に必ずメジャーで計測を",
  },
  {
    name: "開閉のしやすさ（大人の通りやすさ）",
    why: "1日に何度も通る場所なので、片手で開閉できるかは地味に重要",
  },
  {
    name: "耐久性（子どもの力に耐えるか）",
    why: "1〜2歳になると押したり引いたりする力が強くなる。ぐらつきにくさが安全に直結",
  },
  {
    name: "撤去のしやすさ（使わなくなった後）",
    why: "つっぱり式は跡が残りにくい。ねじ止め式は穴が残る。引越しや模様替えも考慮",
  },
];

const products = [
  {
    name: "日本育児 スマートゲイト2",
    brand: "日本育児",
    type: "つっぱり式" as const,
    asin: "B079YXRJRM",
    features: [
      "つっぱり式の定番。壁に穴を開けずに設置できる",
      "片手でロック解除＆オートクローズ機能",
      "ダブルロックで子どもが簡単に開けられない",
      "拡張フレームで幅の調整が可能",
    ],
    bestFor: "賃貸にお住まいの方、階段上以外の場所に設置したい方",
    notFor: "階段上に設置したい方（つっぱり式は階段上には非推奨）",
    priceRange: "¥5,000〜8,000",
    scene: "キッチンの入り口につっぱって設置。料理中に赤ちゃんが入ってこない安心感",
  },
  {
    name: "ベビーダン ガードミー",
    brand: "ベビーダン",
    type: "ロール式" as const,
    asin: "B01HQJ27B4",
    features: [
      "ロールスクリーン式で使わないときはスッキリ収納",
      "開口部が広くても対応できる（最大113cm）",
      "廊下やリビングの間仕切りにも使いやすい",
      "デンマーク製のシンプルなデザイン",
    ],
    bestFor: "見た目をスッキリさせたい方、広い間口に設置したい方",
    notFor: "頻繁に出入りする場所（開閉がやや手間）",
    priceRange: "¥10,000〜14,000",
    scene: "リビングと廊下の間仕切りに。使わないときはロールが巻き取られて目立たない",
  },
  {
    name: "日本育児 おくだけとおせんぼ",
    brand: "日本育児",
    type: "置くだけ" as const,
    asin: "B00BLN2V8K",
    features: [
      "置くだけで設置完了。工具も壁も不要",
      "セーフティプレートを子どもが踏むことで安定する仕組み",
      "場所を変えて使い回しができる",
      "突っ張れない広い空間でも使える",
    ],
    bestFor: "壁がない場所に設置したい方、設置場所を変えたい方",
    notFor: "2歳以降の力が強い子（動かされる可能性あり）",
    priceRange: "¥6,000〜10,000",
    scene: "テレビ周りやキッチンカウンター前に。壁がなくてもサッと置ける手軽さ",
  },
  {
    name: "リッチェル 木のオートロックゲート",
    brand: "リッチェル",
    type: "ねじ止め式" as const,
    asin: "B01FJCN0GY",
    features: [
      "壁にねじ止めで固定するため安定感が抜群",
      "階段上にも設置できる高い安全性",
      "木製フレームでインテリアに馴染む",
      "オートロック機能で閉め忘れを防止",
    ],
    bestFor: "階段上に設置したい方、しっかり固定したい持ち家の方",
    notFor: "賃貸で壁に穴を開けたくない方",
    priceRange: "¥8,000〜12,000",
    scene: "2階への階段上にしっかりねじ止め。つかまり立ちの赤ちゃんが押しても動かない",
  },
];

const typeGuide = [
  {
    condition: "賃貸・キッチン入り口",
    recommendation: "日本育児 スマートゲイト2",
    reason: "壁に穴を開けずにしっかり固定。つっぱり式の定番で信頼性が高い",
  },
  {
    condition: "見た目スッキリ・広い間口",
    recommendation: "ベビーダン ガードミー",
    reason: "ロール式で使わないときは収納される。広い間口にも対応できる",
  },
  {
    condition: "壁がない場所・移動して使いたい",
    recommendation: "日本育児 おくだけとおせんぼ",
    reason: "工具不要で置くだけ。テレビ前やカウンター前など場所を選ばない",
  },
  {
    condition: "階段上・しっかり固定",
    recommendation: "リッチェル 木のオートロックゲート",
    reason: "ねじ止めで最も安定。階段上に設置できるのはねじ止め式だけ",
  },
];

export default function BabyGatePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "ベビーゲートの選びかた" },
          ]} />
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">安全対策</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビーゲートの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              はいはいが始まると急に必要になるベビーゲート。つっぱり式・ねじ止め式・置くだけタイプの特徴を整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "ベビーゲート、なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき5つの軸" },
            { id: "products", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビーゲート、なぜ迷いやすいのか
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
                  ゲート選びで一番大切なのは<strong>「どこに設置するか」と「壁に穴を開けてよいか」</strong>の2点です。
                  この2つが決まれば、選べるタイプは自然と絞られます。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 比較軸 */}
          <section id="selection-axes" className="mb-8">
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
          <section id="products" className="mb-8">
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

          {/* 5. 比較表 */}
          <section id="comparison-table" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">比較表</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">商品</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">設置方法</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">安定感</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">開閉</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">階段上</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">賃貸OK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">スマートゲイト2</td>
                    <td className="py-2 px-2 text-foreground">つっぱり</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎ 片手OK</td>
                    <td className="py-2 px-2 text-foreground">× 非推奨</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ガードミー</td>
                    <td className="py-2 px-2 text-foreground">ロール式</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">△ 要確認</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">おくだけとおせんぼ</td>
                    <td className="py-2 px-2 text-foreground">置くだけ</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">◎ 扉なし</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">木のオートロックゲート</td>
                    <td className="py-2 px-2 text-foreground">ねじ止め</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎ 片手OK</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">× 穴あき</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>ゲートは「完璧に防ぐ」ものではなく、「気づくまでの時間を稼ぐ」ものです。</strong>
                <br />
                どのタイプを選んでも、危険を減らす効果は十分あります。
                <br />
                設置場所を計測して、まずは一番必要な場所から始めてみてください。
              </p>
            </CardContent>
          </Card>

          {/* 購入できる場所 */}
          <section id="where-to-buy" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              購入できる場所
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              ここで紹介した商品はAmazonでも購入できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AmazonProductCard
                name="日本育児 スマートゲイト2"
                asin="B079YXRJRM"
                price="¥5,000〜"
              />
              <AmazonProductCard
                name="ベビーダン ガードミー"
                asin="B01HQJ27B4"
                price="¥10,000〜"
              />
              <AmazonProductCard
                name="日本育児 おくだけとおせんぼ"
                asin="B00BLN2V8K"
                price="¥6,000〜"
              />
              <AmazonProductCard
                name="リッチェル 木のオートロックゲート"
                asin="B01FJCN0GY"
                price="¥8,000〜"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="ベビーゲートの選びかた" path="/prepare/baby-gate" />

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
