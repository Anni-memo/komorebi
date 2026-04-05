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
  title: "抱っこ紐の選びかた",
  description:
    "抱っこ紐、どれを選べばいい？エルゴ・ビョルン・アップリカ・コンビの4製品を比較。装着のしやすさ、通気性、新生児対応を整理しました。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "有名ブランドが多くて、どこが違うのかわかりにくい",
  "試着できる店舗が限られていて、実際の装着感がつかめない",
  "新生児から使えるもの・使えないものの区別が難しい",
  "口コミでは「慣れれば大丈夫」と書いてあり、最初の使いやすさがわからない",
];

const axes = [
  {
    name: "対象月齢（新生児から使えるか）",
    why: "インサート不要で新生児から使えるかどうか。別売りパーツが必要だと出費と手間が増える",
  },
  {
    name: "装着のしやすさ（ひとりで付けられるか）",
    why: "ワンオペ育児では一人で装着できるかが最重要。バックルの位置や構造で大きく変わる",
  },
  {
    name: "通気性（メッシュの有無）",
    why: "赤ちゃんは大人より体温が高い。夏場はメッシュなしだと蒸れてぐずる原因になる",
  },
  {
    name: "腰・肩への負担",
    why: "長時間の抱っこや体重が増えてくると、荷重分散の設計が効いてくる",
  },
  {
    name: "前向き抱っこの可否",
    why: "好奇心が出る5〜6ヶ月以降、前向き抱っこができると散歩が楽しくなる",
  },
  {
    name: "価格帯",
    why: "1万円台〜3万円台まで幅がある。長く使うものなので「月あたりのコスト」で考えると選びやすい",
  },
];

const products = [
  {
    name: "エルゴベビー OMNI Breeze",
    brand: "エルゴベビー",
    type: "多機能メッシュ" as const,
    asin: "B093L84C7H",
    officialUrl: "https://ergobaby.jp/",
    features: [
      "新生児〜48ヶ月（20kg）まで。インサートなしで新生児対応",
      "SoftFlexメッシュ採用で通気性に優れる",
      "対面・前向き・腰抱き・おんぶの4通り",
      "腰ベルトが幅広で荷重分散に優れ、長時間でも疲れにくい",
    ],
    bestFor: "新生児から長期間使いたい方、腰や肩の負担を減らしたい方",
    notFor: "予算を1万円台に抑えたい方",
    priceRange: "約28,000〜33,000円",
    scene: "新生児期の寝かしつけから、1歳以降のお出かけまで1台で完結。パパとの共有もしやすい",
  },
  {
    name: "ベビービョルン HARMONY",
    brand: "ベビービョルン",
    type: "メッシュ特化" as const,
    asin: "B08GKQFBFG",
    officialUrl: "https://babybjorn.jp/",
    features: [
      "新生児〜36ヶ月（15kg）まで。インサート不要",
      "フルメッシュ構造で抜群の通気性",
      "前面のバックルだけで装着完了。一人でも簡単",
      "前向き抱っこ対応。赤ちゃんの好奇心を満たせる",
    ],
    bestFor: "メッシュ・通気性を最重視する方、装着のシンプルさを求める方",
    notFor: "3歳以降も使いたい方（対応体重15kgまで）",
    priceRange: "約27,000〜31,000円",
    scene: "夏場の抱っこや、ちょっとした買い物に。フロントバックルで素早く装着できる",
  },
  {
    name: "アップリカ コアラウルトラメッシュ EX",
    brand: "アップリカ",
    type: "ひとり装着特化" as const,
    asin: "B0BN3QXHXV",
    officialUrl: "https://www.aprica.jp/",
    features: [
      "新生児（横抱き）〜36ヶ月まで対応",
      "「ペタル構造」で前から赤ちゃんを入れられる。ひとりで装着しやすさNo.1",
      "ウルトラメッシュで通気性も十分",
      "横抱き（ママうで抱っこ）ができる唯一の製品",
    ],
    bestFor: "ワンオペ育児でひとりで装着したい方、横抱きも使いたい方",
    notFor: "前向き抱っこを使いたい方（非対応）",
    priceRange: "約22,000〜28,000円",
    scene: "ワンオペの日のお出かけ。赤ちゃんが寝たらそっと前から降ろせるのが便利",
  },
  {
    name: "コンビ ジョイン EL-E",
    brand: "コンビ",
    type: "コスパ型" as const,
    asin: "B0BXNRM8SF",
    officialUrl: "https://www.combi.co.jp/",
    features: [
      "首すわり（4ヶ月）〜36ヶ月まで対応",
      "肩ラクフィットベルトで肩への負担を分散",
      "落下防止のホールドベルト・ホールドカバーで安心設計",
      "国内ブランドならではの手頃な価格",
    ],
    bestFor: "コスパを重視する方、4ヶ月以降から使い始める方",
    notFor: "新生児期から使いたい方（別売りインファントシートが必要）",
    priceRange: "約12,000〜18,000円",
    scene: "首がすわってからのメイン抱っこ紐に。価格が手頃なので2本目としても",
  },
];

const typeGuide = [
  {
    condition: "新生児期から長く使いたい",
    recommendation: "エルゴベビー OMNI Breeze",
    reason: "インサート不要で新生児対応。48ヶ月・20kgまで使えて、1台で完結する",
  },
  {
    condition: "ワンオペ育児でひとりで装着したい",
    recommendation: "アップリカ コアラウルトラメッシュ",
    reason: "前から赤ちゃんを入れるペタル構造。背中に手を回さなくていい",
  },
  {
    condition: "メッシュ・通気性を最重視したい",
    recommendation: "ベビービョルン HARMONY または エルゴ OMNI Breeze",
    reason: "どちらもフルメッシュ。ビョルンは特に通気性に定評あり",
  },
  {
    condition: "コスパ重視、4ヶ月以降から使い始める",
    recommendation: "コンビ ジョイン",
    reason: "1万円台前半から買える。落下防止設計で安心。国内メーカーサポートも充実",
  },
];

export default function BabyCarrierPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "抱っこ紐の選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">抱っこ紐</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              抱っこ紐の選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              人気4製品に絞って、装着のしやすさ・通気性・コスパを整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき6つの軸" },
            { id: "products", label: "おすすめ商品" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              抱っこ紐、なぜ迷いやすいのか
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
                  結論から言うと、<strong>今回紹介する4製品はどれも定番で、大きな失敗はありません</strong>。
                  大切なのは「自分の生活スタイルに合うかどうか」。
                  ここでは比較軸を整理して、あなたに合う1本を見つけやすくしました。
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

          {/* 3. 使用感まとめ */}
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">新生児対応</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">装着しやすさ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">通気性</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">腰肩の負担</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">前向き</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">エルゴ OMNI Breeze</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ビョルン HARMONY</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">アップリカ コアラ</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">-</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">コンビ ジョイン</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">-</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どれを選んでも、赤ちゃんとのお出かけは楽しくなります。</strong>
                <br />
                今回紹介した4製品はどれも定番で、多くのパパ・ママに選ばれています。
                <br />
                合わなければメルカリなどで売って、別のものに買い替える方も多いです。
                <br />
                迷ったら、まず試着できるお店で背負い比べてみてください。
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
                name="エルゴベビー OMNI Breeze"
                asin="B093L84C7H"
                price="¥28,000〜"
                officialUrl="https://ergobaby.jp/"
              />
              <AmazonProductCard
                name="ベビービョルン HARMONY"
                asin="B08GKQFBFG"
                price="¥27,000〜"
                officialUrl="https://babybjorn.jp/"
              />
              <AmazonProductCard
                name="アップリカ コアラウルトラメッシュ"
                asin="B0BN3QXHXV"
                price="¥22,000〜"
                officialUrl="https://www.aprica.jp/"
              />
              <AmazonProductCard
                name="コンビ ジョイン"
                asin="B0BXNRM8SF"
                price="¥12,000〜"
                officialUrl="https://www.combi.co.jp/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="抱っこ紐の選びかた" path="/prepare/baby-carrier" />

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
