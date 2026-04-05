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
  title: "おくるみ・スワドルの選びかた",
  description:
    "おくるみ・スワドル、どれを選べばいい？ガーゼおくるみ・モスリン・スリーパー型の違いを整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "「おくるみ」と「スワドル」の違いがわかりにくい",
  "ガーゼ・モスリン・フリースなど素材の使い分けが見えない",
  "1枚布タイプと着るタイプ、どちらが安全か迷う",
  "寝返りが始まったらいつ卒業させるべきかわからない",
];

const axes = [
  {
    name: "素材（ガーゼ / モスリン / フリース）",
    why: "通気性と保温性のバランスが季節によって変わる。夏はモスリンやガーゼ、冬はフリースや厚手素材が向く",
  },
  {
    name: "使用時期（新生児期 / 寝返り後）",
    why: "新生児期はモロー反射を抑えるため巻くタイプが有効。寝返り後は腕が自由になるスリーパー型が安全",
  },
  {
    name: "形状（1枚布 / 着るタイプ）",
    why: "1枚布は巻き方の自由度が高いが慣れが必要。着るタイプはファスナーで簡単に着脱できる",
  },
  {
    name: "おくるみ卒業のしやすさ",
    why: "段階的に腕を出せるタイプなら、赤ちゃんも親もスムーズに卒業しやすい",
  },
];

const products = [
  {
    name: "aden+anais モスリンスワドル",
    brand: "aden+anais",
    type: "1枚布・モスリン" as const,
    asin: "B01NBMJH8G",
    officialUrl: "",
    features: [
      "モスリンコットン100%で通気性が抜群",
      "120×120cmの大判サイズで巻きやすい",
      "洗うほどに柔らかくなる肌ざわり",
      "おくるみ以外にもブランケットや授乳ケープとして使える",
    ],
    bestFor: "オールシーズン使いたい方、多用途に活用したい方",
    notFor: "巻く手間を省きたい方、スワドルに不慣れな方",
    priceRange: "約2,000〜3,500円（1枚あたり）",
    scene: "退院時から使い始め、おくるみ卒業後もブランケットやベビーカーの日よけとして長く活躍。洗い替え用に2〜3枚あると安心",
  },
  {
    name: "スワドルアップ",
    brand: "Love To Dream",
    type: "着るおくるみ" as const,
    asin: "B07BH4NMQR",
    officialUrl: "",
    features: [
      "ファスナーで着せるだけ、巻く技術が不要",
      "両手を上に上げた自然な姿勢で眠れる設計",
      "モロー反射を抑えつつ、手が顔の近くにあるので自己鎮静しやすい",
      "腕部分が外せるトランジションモデルで卒業がスムーズ",
    ],
    bestFor: "おくるみを巻くのが苦手な方、夜泣き対策に悩む方",
    notFor: "暑い季節に薄手のものを求める方（やや厚め）",
    priceRange: "約3,500〜5,000円",
    scene: "夜間の寝かしつけに苦労しているご家庭に。着せるだけでモロー反射を抑え、赤ちゃんがぐっすり眠りやすくなる。卒業時は腕パーツを外すだけ",
  },
  {
    name: "aden+anais ドリームブランケット",
    brand: "aden+anais",
    type: "4層モスリン" as const,
    asin: "B07L3Z6GNR",
    officialUrl: "",
    features: [
      "モスリンコットン4層構造で適度な保温性",
      "通気性を保ちながら冷え対策もできる",
      "120×120cmの大判で、おくるみからブランケットまで対応",
      "洗濯機で丸洗い可能、乾きも早い",
    ],
    bestFor: "秋冬生まれの赤ちゃん、ブランケットとしても長く使いたい方",
    notFor: "真夏の新生児期に使いたい方（やや暖かすぎる場合がある）",
    priceRange: "約3,500〜5,000円",
    scene: "秋冬の退院時に赤ちゃんをふんわり包んで、そのまま車やベビーカーでも使える。成長後はお昼寝用ブランケットとして2〜3歳まで活躍",
  },
];

const typeGuide = [
  {
    condition: "新生児期のモロー反射が気になる",
    recommendation: "スワドルアップ（着るタイプ）",
    reason: "着せるだけで簡単にモロー反射を抑えられる。巻く技術が不要で、夜中のおむつ替え後もすぐ着せ直せる",
  },
  {
    condition: "多用途に長く使いたい",
    recommendation: "aden+anais モスリンスワドル（1枚布）",
    reason: "おくるみ、ブランケット、授乳ケープ、日よけなど用途が広い。コスパが良く洗い替え用に複数枚持てる",
  },
  {
    condition: "秋冬生まれで保温性が欲しい",
    recommendation: "aden+anais ドリームブランケット（4層モスリン）",
    reason: "4層構造で適度な保温性があり、通気性も確保。冬のお出かけ時の防寒にも使える",
  },
  {
    condition: "おくるみ卒業をスムーズにしたい",
    recommendation: "スワドルアップ トランジションモデル",
    reason: "腕部分を片方ずつ外して段階的に卒業できる。赤ちゃんへの負担が少ない",
  },
];

export default function SwaddlePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "おくるみ・スワドルの選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">おくるみ</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              おくるみ・スワドルの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              素材・形状・卒業のしやすさを整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "おくるみ・スワドル、なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき4つの軸" },
            { id: "product-reviews", label: "まずはこの3つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おくるみ・スワドル、なぜ迷いやすいのか
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
                  結論から言うと、<strong>どのタイプでも赤ちゃんは安心して眠れます</strong>。
                  大事なのは「赤ちゃんの月齢と季節に合っているか」。
                  ここでは選びやすくなるよう、比較軸を整理しました。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 比較軸 */}
          <section id="selection-axes" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              選ぶときに見るべき4つの軸
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
          <section id="product-reviews" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              まずはこの3つを見れば十分です
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
                      {product.asin && (
                        <div className="md:w-48 shrink-0">
                          <AmazonProductCard
                            name={product.name}
                            asin={product.asin}
                            price={product.priceRange}
                            officialUrl={product.officialUrl || undefined}
                          />
                        </div>
                      )}
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">タイプ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">素材</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">使用時期</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">卒業しやすさ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">aden+anais スワドル</td>
                    <td className="py-2 px-2 text-foreground">1枚布</td>
                    <td className="py-2 px-2 text-foreground">モスリン</td>
                    <td className="py-2 px-2 text-foreground">新生児〜</td>
                    <td className="py-2 px-2 text-foreground">◎（自然に移行）</td>
                    <td className="py-2 px-2 text-foreground">約2,000〜3,500円</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">スワドルアップ</td>
                    <td className="py-2 px-2 text-foreground">着るタイプ</td>
                    <td className="py-2 px-2 text-foreground">コットン混</td>
                    <td className="py-2 px-2 text-foreground">新生児〜6ヶ月</td>
                    <td className="py-2 px-2 text-foreground">◎（腕パーツ着脱）</td>
                    <td className="py-2 px-2 text-foreground">約3,500〜5,000円</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">ドリームブランケット</td>
                    <td className="py-2 px-2 text-foreground">4層ブランケット</td>
                    <td className="py-2 px-2 text-foreground">モスリン4層</td>
                    <td className="py-2 px-2 text-foreground">新生児〜3歳</td>
                    <td className="py-2 px-2 text-foreground">○（ブランケットへ移行）</td>
                    <td className="py-2 px-2 text-foreground">約3,500〜5,000円</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どれを選んでも、赤ちゃんはちゃんと眠れます。</strong>
                <br />
                おくるみは赤ちゃんに安心感を与える道具。完璧に巻けなくても大丈夫。
                <br />
                大切なのは「赤ちゃんの顔が見える状態」と「暑くなりすぎない素材選び」。
                <br />
                寝返りが始まったら、腕が自由になるタイプに切り替えましょう。
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
                name="aden+anais モスリンスワドル"
                asin="B01NBMJH8G"
                price="¥2,000〜"
              />
              <AmazonProductCard
                name="スワドルアップ"
                asin="B07BH4NMQR"
                price="¥3,500〜"
              />
              <AmazonProductCard
                name="aden+anais ドリームブランケット"
                asin="B07L3Z6GNR"
                price="¥3,500〜"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="おくるみ・スワドルの選びかた" path="/prepare/swaddle" />

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
