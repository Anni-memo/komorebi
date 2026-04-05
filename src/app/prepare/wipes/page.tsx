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
  title: "おしりふきの選びかた",
  description:
    "赤ちゃんのおしりふき、どれを選べばいい？厚手・薄手の違い、肌へのやさしさ、コスパを整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "種類が多すぎて、違いがわからない",
  "口コミを見ても「どれも良い」と書いてあって決められない",
  "厚手がいいのか薄手がいいのか、使ってみないとわからない",
];

const axes = [
  {
    name: "厚さ",
    why: "1枚で拭ききれるかどうかに直結。厚手は枚数少なく済むが単価が高い",
  },
  {
    name: "水分量",
    why: "水分が多いほど肌への摩擦が減る。乾きにくさ（保存性）にも影響",
  },
  {
    name: "成分のやさしさ",
    why: "新生児やかぶれやすい子には、水99%や無添加が安心材料になる",
  },
  {
    name: "1枚あたりの価格",
    why: "1日10〜15枚使うと月300〜450枚。コスパは長期的に効いてくる",
  },
  {
    name: "取り出しやすさ",
    why: "片手で1枚ずつ出せるかどうか。おむつ替え中は両手が使えない",
  },
];

const products = [
  {
    name: "アカチャンホンポ 水99% Super 厚手",
    brand: "アカチャンホンポ",
    type: "厚手" as const,
    asin: "B0BKJQF8WK",
    officialUrl: "https://www.akachan.jp/",
    features: [
      "水分量が豊富で肌への摩擦が少ない",
      "厚手で1枚で拭ききりやすい",
      "成分の99%が純水。刺激成分を極力抑えた処方",
      "新生児の軟便やこびりつきにも対応",
    ],
    bestFor: "肌がデリケートな子、新生児期、少ない枚数で済ませたい方",
    notFor: "近くにアカチャンホンポがない方（通販は可能）",
    priceRange: "約2.5〜3円/枚",
    scene: "家での日常使い。軟便のときも1〜2枚で済むので手早い",
  },
  {
    name: "パンパース 肌へのいちばん",
    brand: "P&G",
    type: "厚手" as const,
    asin: "B06W5T41QK",
    officialUrl: "https://www.jp.pampers.com/",
    features: [
      "全商品中トップクラスの水分量",
      "拭き取り性能が高く、1回のスワイプでしっかり取れる",
      "厚手でしっかりした使用感",
      "入手しやすい（ドラッグストア・通販どこでも）",
    ],
    bestFor: "拭き取り性能を重視する方、どこでも買える安心感がほしい方",
    notFor: "香りが気になる方（わずかに香料あり）",
    priceRange: "約3〜4円/枚",
    scene: "外出先でも家でも。1枚でしっかり拭けるので持ち運びも少量で足りる",
  },
  {
    name: "ムーニー ナチュラル",
    brand: "ユニ・チャーム",
    type: "厚手" as const,
    asin: "B0CPXRQ1JM",
    officialUrl: "https://www.unicharm.co.jp/moony/",
    features: [
      "オーガニックコットン配合でふわふわの肌触り",
      "どの評価項目でも平均的に高スコア",
      "厚みと柔らかさのバランスが良い",
      "無香料・無着色",
    ],
    bestFor: "肌触りの良さを重視する方、バランス型を求める方",
    notFor: "コスパ最優先の方（やや高め）",
    priceRange: "約3〜3.5円/枚",
    scene: "日常使い全般。敏感肌の子にもやさしく、親の手にも心地よい",
  },
  {
    name: "ピジョン おしりナップ やわらか厚手仕上げ",
    brand: "ピジョン",
    type: "厚手" as const,
    asin: "B07YBQBHVV",
    officialUrl: "https://products.pigeon.co.jp/",
    features: [
      "哺乳瓶メーカーの安心感",
      "厚手で丈夫、破れにくい",
      "適度な水分量",
      "大判サイズで拭きやすい",
    ],
    bestFor: "丈夫さを重視する方、大きめサイズが好みの方",
    notFor: "水分量をたっぷり求める方（他より控えめ）",
    priceRange: "約2.5〜3円/枚",
    scene: "しっかり拭きたい場面。外出時の手口拭きとしても使いやすい",
  },
];

const typeGuide = [
  {
    condition: "新生児期（0〜3ヶ月）、肌がデリケート",
    recommendation: "水99% Super 厚手 または ムーニー ナチュラル",
    reason: "水分が多く成分がやさしい。軟便も少ない枚数で対応",
  },
  {
    condition: "拭き取り性能重視、入手しやすさ重視",
    recommendation: "パンパース 肌へのいちばん",
    reason: "水分量No.1で拭き取り力が高い。どこでも買える",
  },
  {
    condition: "バランス重視、肌触り重視",
    recommendation: "ムーニー ナチュラル",
    reason: "オーガニックコットン配合でふわふわ。全項目で安定した評価",
  },
  {
    condition: "コスパ重視、丈夫さ重視",
    recommendation: "ピジョン おしりナップ または 水99% Super 厚手",
    reason: "1枚あたり約2.5円〜。丈夫で破れにくい",
  },
];

export default function WipesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "おしりふきの選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">おむつ・おしりふき</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              おしりふきの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              厚手4製品に絞って、生活シーン別に整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "おしりふき、なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき5つの軸" },
            { id: "thick-vs-thin", label: "厚手と薄手、どちらがいい？" },
            { id: "product-reviews", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おしりふき、なぜ迷いやすいのか
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
                  結論から言うと、<strong>日本の主要メーカーのおしりふきはどれも品質が高い</strong>です。
                  大きな失敗はありません。
                  ここでは「自分の家庭に合うもの」を見つけやすくするために、比較軸を整理しました。
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

          {/* 3. 厚手 vs 薄手 */}
          <section id="thick-vs-thin" className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  厚手と薄手、どちらがいい？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">厚手がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・少ない枚数で手早く終わらせたい</li>
                      <li>・新生児期で軟便が多い</li>
                      <li>・外出時に持つ枚数を減らしたい</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">薄手がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・何枚も使って丁寧に拭きたい</li>
                      <li>・コスパを最優先にしたい</li>
                      <li>・手口拭きとしても大量に使いたい</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  今回は多くの方に使いやすい<strong className="text-foreground">厚手タイプ</strong>を中心にご紹介しています。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 4. 商品別の使用感 */}
          <section id="product-reviews" className="mb-8">
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">厚さ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">水分量</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">肌やさしさ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">コスパ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">水99% Super 厚手</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">パンパース 肌へのいちばん</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ムーニー ナチュラル</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">ピジョン おしりナップ</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
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
                日本のおしりふきはどれも品質が高いので、大きな失敗はありません。
                <br />
                合わなければ次に別のものを試せば大丈夫です。
                <br />
                迷ったらまず1つ買って使ってみてください。
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
                name="アカチャンホンポ 水99% Super 厚手"
                asin="B0BKJQF8WK"
                price="¥1,280〜"
                officialUrl="https://www.akachan.jp/"
              />
              <AmazonProductCard
                name="パンパース 肌へのいちばん"
                asin="B06W5T41QK"
                price="¥1,480〜"
                officialUrl="https://www.jp.pampers.com/"
              />
              <AmazonProductCard
                name="ムーニー ナチュラル"
                asin="B0CPXRQ1JM"
                price="¥1,380〜"
                officialUrl="https://www.unicharm.co.jp/moony/"
              />
              <AmazonProductCard
                name="ピジョン おしりナップ"
                asin="B07YBQBHVV"
                price="¥1,080〜"
                officialUrl="https://products.pigeon.co.jp/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="おしりふきの選びかた" path="/prepare/wipes" />

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
