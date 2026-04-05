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
  title: "ベビーチェアの選びかた",
  description:
    "ハイチェア・ローチェア・テーブルチェアの違いを整理。ストッケ・大和屋・インジェニュイティ・イングリッシーナの4製品を比較しました。",
};

const whyConfusing = [
  "ハイチェア・ローチェア・テーブルチェア…種類が違いすぎる",
  "成長に合わせて買い替えが必要なのか分かりにくい",
  "価格差が大きく、高いものを買うべきか迷う",
];

const axes = [
  {
    name: "食事スタイル（ダイニングテーブルか座卓か）",
    why: "ハイチェアはダイニング向き、ローチェアは座卓やリビング向き。生活スタイルで決まる",
  },
  {
    name: "成長対応（何歳まで使えるか）",
    why: "座面や足置きの高さを調整できるタイプは長く使える。買い替え頻度に直結する",
  },
  {
    name: "安定感（ぐらつかないか）",
    why: "赤ちゃんが動いても倒れにくいことが大前提。脚の形状やベルトの有無で差が出る",
  },
  {
    name: "足が着くか（食事の姿勢）",
    why: "足がブラブラしていると噛む力が入りにくい。足置き付きのものが食事に向いている",
  },
  {
    name: "持ち運び（帰省・外食に使えるか）",
    why: "テーブルチェアは折りたたんで持ち運べる。外食や帰省先で重宝する",
  },
];

const products = [
  {
    name: "ストッケ トリップトラップ",
    brand: "ストッケ",
    type: "ハイチェア" as const,
    asin: "B000EIWX9G",
    officialUrl: "https://www.stokke.com/ja-jp/",
    features: [
      "座面・足置きの高さを14段階で調整可能",
      "大人まで使える耐荷重136kg設計",
      "別売りベビーセットで6ヶ月から使用可能",
      "北欧デザインでインテリアに馴染む",
    ],
    bestFor: "長く1脚を使い続けたい方、ダイニングテーブルで食事する家庭",
    notFor: "初期費用を抑えたい方、持ち運びしたい方",
    priceRange: "¥36,000〜46,000",
    scene: "6ヶ月の離乳食から始めて、小学生になっても勉強椅子として現役",
  },
  {
    name: "大和屋 すくすくチェア プラス",
    brand: "大和屋",
    type: "ハイチェア" as const,
    asin: "B006WL2INQ",
    features: [
      "座面・足置きを細かく調整できる国産設計",
      "テーブル付きで離乳食期に便利",
      "ガードとベルトで安全性が高い",
      "トリップトラップの約半額のコストパフォーマンス",
    ],
    bestFor: "コスパを重視しつつ成長対応もほしい方",
    notFor: "デザイン性を最優先する方",
    priceRange: "¥15,000〜20,000",
    scene: "しっかりした作りの国産チェアを、お財布にやさしい価格で手に入れたい",
  },
  {
    name: "インジェニュイティ ベビーベース",
    brand: "インジェニュイティ",
    type: "ローチェア" as const,
    asin: "B07GBWBM1W",
    features: [
      "床置き・椅子の上どちらでも使える2WAY",
      "内側のシートが取り外せて成長に対応",
      "軽量で持ち運びやすい",
      "付属トレイで食事にもすぐ使える",
    ],
    bestFor: "座卓で食事する家庭、帰省先にも持っていきたい方",
    notFor: "足が着く姿勢を重視する方、長期間使いたい方",
    priceRange: "¥4,000〜6,000",
    scene: "リビングのローテーブルで離乳食。帰省のときはトランクに入れて持参",
  },
  {
    name: "イングリッシーナ ファスト",
    brand: "イングリッシーナ",
    type: "テーブルチェア" as const,
    asin: "B00C5A3MWY",
    features: [
      "テーブルに挟むだけで設置完了、工具不要",
      "折りたたむと専用バッグに収納可能",
      "5点式ベルトで安全性が高い",
      "外食先やカフェでも使いやすいコンパクトさ",
    ],
    bestFor: "外食が多い方、省スペースに椅子を置きたい方",
    notFor: "足が着く姿勢を重視する方、テーブルの厚さが合わない場合",
    priceRange: "¥9,000〜12,000",
    scene: "カフェやレストランのテーブルにサッと取り付けて、家族で外食を楽しむ",
  },
];

const typeGuide = [
  {
    condition: "長く使いたい・ダイニングテーブル",
    recommendation: "ストッケ トリップトラップ",
    reason: "大人まで使える耐久性。初期費用は高いが、買い替え不要で結果的にコスパが良い",
  },
  {
    condition: "コスパ重視・ダイニングテーブル",
    recommendation: "大和屋 すくすくチェア プラス",
    reason: "国産で安心の品質。トリップトラップの約半額で成長対応ハイチェアが手に入る",
  },
  {
    condition: "座卓・リビング中心",
    recommendation: "インジェニュイティ ベビーベース",
    reason: "床置きOKで座卓に合う。椅子の上にも置ける2WAYで使い勝手がよい",
  },
  {
    condition: "外食・帰省が多い",
    recommendation: "イングリッシーナ ファスト",
    reason: "テーブルに挟むだけ。折りたたんで持ち運べるので外出先で重宝する",
  },
];

export default function BabyChairPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "ベビーチェアの選びかた" },
          ]} />
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">家具</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビーチェアの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              離乳食が始まる6ヶ月頃から必要になるベビーチェア。ハイチェア・ローチェア・テーブルチェアの3タイプを比較しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "ベビーチェア、なぜ迷いやすいのか" },
            { id: "comparison-axes", label: "選ぶときに見るべき5つの軸" },
            { id: "products", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8" id="why-confusing">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビーチェア、なぜ迷いやすいのか
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
                  チェア選びのポイントは<strong>「ふだんどこで食事するか」</strong>で決まります。
                  ダイニングテーブルならハイチェア、座卓ならローチェア、外食が多いならテーブルチェア。
                  生活スタイルに合わせれば、自然と選択肢は絞れます。
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">成長対応</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">足置き</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">持ち運び</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">トリップトラップ</td>
                    <td className="py-2 px-2 text-foreground">ハイチェア</td>
                    <td className="py-2 px-2 text-foreground">◎ 大人まで</td>
                    <td className="py-2 px-2 text-foreground">◎ 調整可</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">¥36,000〜</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">すくすくチェア</td>
                    <td className="py-2 px-2 text-foreground">ハイチェア</td>
                    <td className="py-2 px-2 text-foreground">◎ 10歳頃まで</td>
                    <td className="py-2 px-2 text-foreground">◎ 調整可</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">¥15,000〜</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ベビーベース</td>
                    <td className="py-2 px-2 text-foreground">ローチェア</td>
                    <td className="py-2 px-2 text-foreground">○ 3歳頃まで</td>
                    <td className="py-2 px-2 text-foreground">× なし</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">¥4,000〜</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">ファスト</td>
                    <td className="py-2 px-2 text-foreground">テーブル取付</td>
                    <td className="py-2 px-2 text-foreground">△ 3歳頃まで</td>
                    <td className="py-2 px-2 text-foreground">× なし</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">¥9,000〜</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どのタイプのチェアでも、赤ちゃんはちゃんとご飯を食べられます。</strong>
                <br />
                「足が着く方がいい」など色々な情報がありますが、
                <br />
                まずはご家庭の食事スタイルに合うものを選べば、それで十分です。
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
                name="ストッケ トリップトラップ"
                asin="B000EIWX9G"
                price="¥36,000〜"
                officialUrl="https://www.stokke.com/ja-jp/"
              />
              <AmazonProductCard
                name="大和屋 すくすくチェア プラス"
                asin="B006WL2INQ"
                price="¥15,000〜"
              />
              <AmazonProductCard
                name="インジェニュイティ ベビーベース"
                asin="B07GBWBM1W"
                price="¥4,000〜"
              />
              <AmazonProductCard
                name="イングリッシーナ ファスト"
                asin="B00C5A3MWY"
                price="¥9,000〜"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="ベビーチェアの選びかた" path="/prepare/baby-chair" />

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
