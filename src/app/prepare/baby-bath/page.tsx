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
  title: "ベビーバスの選びかた",
  description:
    "ベビーバス、エアー・シンク・折りたたみどれがいい？タイプ別の違い、使用期間、収納性を整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "エアー型・プラスチック型・折りたたみ型、違いがわからない",
  "使う期間が1ヶ月程度なのに買う必要があるのか迷う",
  "収納場所がないから大きいものは困る",
  "シンクで代用できるという情報もあって判断できない",
];

const axes = [
  {
    name: "タイプ（エアー / シンク / 折りたたみ / プラスチック）",
    why: "収納スペースと使いやすさのバランスで選ぶ。エアーは軽くて収納しやすい",
  },
  {
    name: "使用期間",
    why: "沐浴は生後1ヶ月頃まで。折りたたみ型なら2歳頃まで水遊びにも使える",
  },
  {
    name: "収納性",
    why: "マンションでは収納がネック。エアーなら空気を抜いてコンパクトに、折りたたみも薄く収納可能",
  },
  {
    name: "安定性・安全性",
    why: "赤ちゃんを片手で支えながら洗うので、滑り止めやくぼみがあると安心",
  },
  {
    name: "価格帯",
    why: "1,000〜5,000円が主流。短期間しか使わないなら安価なものでも十分",
  },
];

const products = [
  {
    name: "リッチェル ふかふかベビーバスW",
    brand: "リッチェル",
    type: "エアータイプ" as const,
    asin: "B07PFNRVNQ",
    officialUrl: "https://www.richell.co.jp/",
    features: [
      "空気で膨らませるエアータイプで軽量",
      "背もたれのくぼみが赤ちゃんのずり落ちを防止",
      "使わないときは空気を抜いてコンパクト収納",
      "やわらかい素材で赤ちゃんの頭をぶつけても安心",
    ],
    bestFor: "収納場所が限られる方、帰省や旅行にも持っていきたい方",
    notFor: "耐久性を重視する方（穴が開くリスクあり）",
    priceRange: "約2,000〜2,500円",
    scene: "マンションの洗面台やシンクの横に置いて使う。使い終わったら空気を抜いて引き出しへ",
  },
  {
    name: "永和 新生児用ベビーバス",
    brand: "永和",
    type: "プラスチックタイプ" as const,
    asin: "B000FI0O2I",
    officialUrl: "",
    features: [
      "シンプルなプラスチック製で安定感抜群",
      "底に栓があり、お湯を抜くのが簡単",
      "赤ちゃんのおしりを支えるくぼみ付き",
      "圧倒的な低価格で気軽に購入できる",
    ],
    bestFor: "安定した場所で沐浴したい方、コスパ重視の方",
    notFor: "収納場所がない方（折りたためない）",
    priceRange: "約1,500〜2,000円",
    scene: "お風呂場やリビングの床に置いて使う。安定感があるので初めての沐浴でも安心",
  },
  {
    name: "Stokke フレキシバス",
    brand: "Stokke",
    type: "折りたたみタイプ" as const,
    asin: "B006GQKLG8",
    officialUrl: "https://www.stokke.com/",
    features: [
      "折りたたむと厚さ約10cmでスリム収納",
      "新生児サポート（別売）で0ヶ月から使える",
      "4歳頃まで長く使える大きめサイズ",
      "デザイン性が高くインテリアに馴染む",
    ],
    bestFor: "長く使いたい方、デザインにもこだわりたい方",
    notFor: "初期費用を抑えたい方（やや高価）",
    priceRange: "約4,000〜5,500円",
    scene: "沐浴期間が終わっても、夏の水遊びや足湯に。折りたたんで洗濯機横のすき間に収納",
  },
  {
    name: "西松屋 SmartAngel ベビーバス",
    brand: "西松屋",
    type: "プラスチックタイプ" as const,
    asin: "",
    officialUrl: "https://www.24028.jp/",
    features: [
      "西松屋プライベートブランドで最安クラス",
      "シンプルで必要十分な機能",
      "店舗で実物を確認して購入できる",
      "底栓付きで排水が簡単",
    ],
    bestFor: "とにかく費用を抑えたい方、近くに西松屋がある方",
    notFor: "長期間使いたい方、収納スペースがない方",
    priceRange: "約1,000〜1,500円",
    scene: "沐浴期間だけ使えればOKという割り切り派に。使い終わったら処分しやすい",
  },
];

const typeGuide = [
  {
    condition: "マンションで収納スペースが限られている",
    recommendation: "リッチェル ふかふかベビーバスW（エアータイプ）",
    reason: "空気を抜けばA4サイズ以下に。引き出しやクローゼットに収まる",
  },
  {
    condition: "とにかく安くシンプルに済ませたい",
    recommendation: "永和 ベビーバス or 西松屋 ベビーバス",
    reason: "1,000〜2,000円で購入可能。1ヶ月の沐浴期間には十分",
  },
  {
    condition: "長く使いたい、2人目以降も視野に",
    recommendation: "Stokke フレキシバス",
    reason: "折りたたみで収納しやすく、4歳頃まで水遊びにも使える",
  },
  {
    condition: "里帰り出産を予定している",
    recommendation: "リッチェル ふかふかベビーバスW",
    reason: "軽量で持ち運びやすい。旅行バッグに入れて移動できる",
  },
];

export default function BabyBathPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "ベビーバスの選びかた" },
          ]} />
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">沐浴・入浴</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビーバスの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              エアー・プラスチック・折りたたみの違いを整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "ベビーバス、なぜ迷いやすいのか" },
            { id: "comparison-axes", label: "選ぶときに見るべき5つの軸" },
            { id: "products", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8" id="why-confusing">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビーバス、なぜ迷いやすいのか
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
                  結論から言うと、<strong>どのタイプでも沐浴はちゃんとできます</strong>。
                  大事なのは「自分の家の環境に合っているか」と「収納できるか」。
                  ここでは選びやすくなるよう、タイプ別に整理しました。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 比較軸 */}
          <section className="mb-8" id="comparison-axes">
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
          <section className="mb-8" id="products">
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
          <section className="mb-8" id="type-guide">
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
          <section className="mb-8" id="comparison-table">
            <h2 className="text-lg font-bold text-foreground mb-4">比較表</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">商品</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">タイプ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">収納性</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">安定性</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">リッチェル</td>
                    <td className="py-2 px-2 text-foreground">エアー</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">約2,000円</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">永和</td>
                    <td className="py-2 px-2 text-foreground">プラスチック</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">約1,500円</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">Stokke</td>
                    <td className="py-2 px-2 text-foreground">折りたたみ</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">約4,500円</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">西松屋</td>
                    <td className="py-2 px-2 text-foreground">プラスチック</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">約1,000円</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どれを選んでも、赤ちゃんはきちんと沐浴できます。</strong>
                <br />
                沐浴期間は約1ヶ月。短い期間だからこそ、深く悩まなくて大丈夫。
                <br />
                大切なのは「お湯の温度（38〜40度）」と「赤ちゃんをしっかり支えること」。
                <br />
                道具よりも、ゆったりした気持ちで向き合えることのほうが大事です。
              </p>
            </CardContent>
          </Card>

          {/* 購入できる場所 */}
          <section className="mb-8" id="where-to-buy">
            <h2 className="text-lg font-bold text-foreground mb-4">
              購入できる場所
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              ここで紹介した商品はAmazonでも購入できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AmazonProductCard
                name="リッチェル ふかふかベビーバスW"
                asin="B07PFNRVNQ"
                price="¥2,000〜"
                officialUrl="https://www.richell.co.jp/"
              />
              <AmazonProductCard
                name="永和 新生児用ベビーバス"
                asin="B000FI0O2I"
                price="¥1,500〜"
              />
              <AmazonProductCard
                name="Stokke フレキシバス"
                asin="B006GQKLG8"
                price="¥4,500〜"
                officialUrl="https://www.stokke.com/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="ベビーバスの選びかた" path="/prepare/baby-bath" />

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
