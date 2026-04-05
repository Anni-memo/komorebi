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
  title: "おむつの選びかた",
  description:
    "新生児用おむつ、どれを選べばいい？パンパース・メリーズ・ムーニー・グーンを比較。吸収力、肌触り、コスパを整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "どのメーカーも「No.1」と書いてあって違いがわからない",
  "赤ちゃんの体型や肌質は使ってみないとわからない",
  "口コミが分かれすぎていて参考にならない",
  "テープ式とパンツ式の切り替え時期がわからない",
];

const axes = [
  {
    name: "吸収力",
    why: "夜通し替えない時間もある。吸収力が高いほど漏れにくく、肌かぶれも減る",
  },
  {
    name: "肌触り・素材",
    why: "新生児の肌は大人の半分の薄さ。コットンのような肌触りが低刺激",
  },
  {
    name: "フィット感（漏れにくさ）",
    why: "背中漏れ・太もも漏れは体型との相性。試してみるしかない部分もある",
  },
  {
    name: "通気性",
    why: "ムレはかぶれの大きな原因。通気性が高いほど夏場も安心",
  },
  {
    name: "サイズ展開",
    why: "新生児〜Sへの切り替え時期は赤ちゃんによって異なる。細かいサイズ展開があると安心",
  },
  {
    name: "1枚あたりの価格",
    why: "新生児期は1日10〜15回交換。月300〜450枚で、コスパは家計に直結",
  },
];

const products = [
  {
    name: "パンパース はじめての肌へのいちばん",
    brand: "P&G",
    type: "プレミアム" as const,
    asin: "B0CQ4K15T3",
    officialUrl: "https://www.jp.pampers.com/",
    features: [
      "産院での使用率No.1。病院で最初に使うおむつとして選ばれている",
      "独自の吸収体で最長12時間吸収",
      "厳選された柔らか素材で肌への刺激を軽減",
      "おへそカットで新生児のおへそに当たらない設計",
    ],
    bestFor: "新生児期、敏感肌の赤ちゃん、産院と同じものを使いたい方",
    notFor: "コスパを最優先にしたい方（プレミアムラインは高め）",
    priceRange: "約25〜30円/枚",
    scene: "退院直後から安心して使える。産院で慣れているから赤ちゃんも嫌がりにくい",
  },
  {
    name: "メリーズ ファーストプレミアム",
    brand: "花王",
    type: "プレミアム" as const,
    asin: "B0CPXS7HGV",
    officialUrl: "https://www.kao.co.jp/merries/",
    features: [
      "ふわさらエアスルー構造で通気性が高い",
      "太もも周りのギャザーがゆったり設計",
      "3層エアスルー構造でムレを逃す",
      "やわらかフィットで赤ちゃんの動きに追従",
    ],
    bestFor: "太もも太めの赤ちゃん、ムレ・かぶれが気になる方",
    notFor: "細身の赤ちゃん（フィット感がゆるく感じることがある）",
    priceRange: "約25〜30円/枚",
    scene: "夏場のムレ対策に。ぽっちゃり体型の子はメリーズだとフィットしやすい",
  },
  {
    name: "ムーニー ナチュラル",
    brand: "ユニ・チャーム",
    type: "プレミアム" as const,
    asin: "B0CPXPG5JN",
    officialUrl: "https://www.unicharm.co.jp/moony/",
    features: [
      "オーガニックコットン配合の表面シート",
      "背中漏れ防止ポケットで「うんち漏れ」を軽減",
      "しなやかストレッチで体にフィット",
      "無添加（香料・着色料不使用）",
    ],
    bestFor: "バランス重視の方、背中漏れに悩んでいる方",
    notFor: "最安値を求める方（プレミアムラインのため）",
    priceRange: "約22〜28円/枚",
    scene: "背中漏れが気になる抱っこ時やチャイルドシートで。バランスの良さが日常使いに向く",
  },
  {
    name: "グーン プラス",
    brand: "大王製紙",
    type: "スタンダード" as const,
    asin: "B0BGM6BWMX",
    officialUrl: "https://www.elleair.jp/goo-n/",
    features: [
      "主要4社の中でコスパが最も良い",
      "エリエール品質の肌触り",
      "ビタミンE配合でやさしい肌あたり",
      "しっかり吸収で基本性能は十分",
    ],
    bestFor: "コスパ重視の方、肌トラブルが少ない赤ちゃん",
    notFor: "プレミアムな肌触りを求める方",
    priceRange: "約15〜20円/枚",
    scene: "毎日大量に使うからこそコスパは大事。基本性能はしっかりしているので普段使いに",
  },
];

const typeGuide = [
  {
    condition: "新生児・肌が敏感",
    recommendation: "パンパース はじめての肌へのいちばん or メリーズ ファーストプレミアム",
    reason: "産院採用率の高さ、肌触りの柔らかさがトップクラス",
  },
  {
    condition: "コスパ重視",
    recommendation: "グーン プラス",
    reason: "1枚あたり約15〜20円。月の出費を数千円抑えられる",
  },
  {
    condition: "バランス型、背中漏れ対策",
    recommendation: "ムーニー ナチュラル",
    reason: "背中漏れ防止ポケットが優秀。全体的にバランスが良い",
  },
  {
    condition: "太もも太めの赤ちゃん",
    recommendation: "メリーズ ファーストプレミアム",
    reason: "ゆったり設計で太もも周りに余裕がある。ムレにくさもトップ",
  },
];

export default function DiapersPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "おむつの選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">おむつ</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              おむつの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              主要4ブランドに絞って、赤ちゃんのタイプ別に整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "おむつ、なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき6つの軸" },
            { id: "tape-vs-pants", label: "テープ式とパンツ式、いつ切り替える？" },
            { id: "products", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おむつ、なぜ迷いやすいのか
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
                  結論から言うと、<strong>日本の主要メーカーのおむつはどれも品質が高い</strong>です。
                  大きな失敗はありません。
                  ただし赤ちゃんの体型や肌質との「相性」があるので、最初は少量パックで試すのが賢い方法です。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 比較軸 */}
          <section id="selection-axes" className="mb-8">
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

          {/* 3. テープ式 vs パンツ式 */}
          <section id="tape-vs-pants" className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  テープ式とパンツ式、いつ切り替える？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">テープ式（新生児〜）</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・寝たまま交換しやすい</li>
                      <li>・サイズの微調整ができる</li>
                      <li>・新生児期はテープ式一択</li>
                      <li>・うんちの時に広げやすく拭きやすい</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">パンツ式（寝返り〜）</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・動き回る赤ちゃんに履かせやすい</li>
                      <li>・立ったまま交換できる</li>
                      <li>・ずれにくく漏れにくい</li>
                      <li>・おしっこだけなら脇を破いて素早く交換</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong className="text-foreground">目安は寝返り〜ハイハイが始まる頃（生後5〜8ヶ月）。</strong>
                  おむつ交換中にゴロゴロ転がるようになったら切り替えのサインです。
                  テープとパンツを併用する期間があっても問題ありません。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 4. 商品別の使用感 */}
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

          {/* 6. 比較表 */}
          <section id="comparison-table" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">比較表</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">商品</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">吸収力</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">肌触り</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">フィット感</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">通気性</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">コスパ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">パンパース</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">メリーズ</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ムーニー</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">グーン プラス</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
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
                <strong>どれを選んでも、赤ちゃんは元気に育ちます。</strong>
                <br />
                日本のおむつはどれも世界トップクラスの品質です。
                <br />
                合わなければ次に別のものを試せば大丈夫。
                <br />
                迷ったら少量パックを2〜3種類買って比べてみてください。
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
                name="パンパース はじめての肌へのいちばん"
                asin="B0CQ4K15T3"
                price="¥1,600〜"
                officialUrl="https://www.jp.pampers.com/"
              />
              <AmazonProductCard
                name="メリーズ ファーストプレミアム"
                asin="B0CPXS7HGV"
                price="¥1,500〜"
                officialUrl="https://www.kao.co.jp/merries/"
              />
              <AmazonProductCard
                name="ムーニー ナチュラル"
                asin="B0CPXPG5JN"
                price="¥1,400〜"
                officialUrl="https://www.unicharm.co.jp/moony/"
              />
              <AmazonProductCard
                name="グーン プラス"
                asin="B0BGM6BWMX"
                price="¥1,200〜"
                officialUrl="https://www.elleair.jp/goo-n/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="おむつの選びかた" path="/prepare/diapers" />

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
