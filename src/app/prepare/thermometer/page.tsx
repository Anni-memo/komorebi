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
  title: "体温計の選びかた",
  description:
    "赤ちゃんの体温計、予測式・非接触・耳式どれがいい？測定時間、精度、使いやすさを整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "予測式・非接触・耳式、どれが正確なのかわからない",
  "赤ちゃんがじっとしていてくれないから測れるか不安",
  "大人用の体温計では使えないのか疑問",
  "非接触は便利そうだけど精度が心配",
];

const axes = [
  {
    name: "測定方式（予測式 / 非接触 / 耳式）",
    why: "予測式はわきで15〜20秒。非接触はおでこで1秒。耳式は耳の中で1秒。精度と手軽さのバランスが異なる",
  },
  {
    name: "測定時間",
    why: "じっとしていられない赤ちゃんには短時間で測れるものが便利。ただし短いほど誤差が出やすい傾向も",
  },
  {
    name: "精度",
    why: "保育園の登園判断や受診の目安に使うなら、精度は重要。予測式が最もバランスが良い",
  },
  {
    name: "使いやすさ（先端の形状・持ちやすさ）",
    why: "赤ちゃん用は先端がやわらかく短い。大人用だとわきに挟みにくいことがある",
  },
  {
    name: "価格帯",
    why: "予測式は1,500〜3,000円、非接触は3,000〜5,000円、耳式は2,000〜4,000円",
  },
];

const products = [
  {
    name: "オムロン けんおんくん MC-682",
    brand: "オムロン",
    type: "予測式（わき）" as const,
    asin: "B00CWA11WQ",
    officialUrl: "https://www.healthcare.omron.co.jp/",
    features: [
      "わき専用で赤ちゃんに特化した設計",
      "予測検温わずか15秒で完了",
      "先端がやわらかく曲がるので肌にやさしい",
      "検温結果を10回分メモリ。体温の変化を追える",
    ],
    bestFor: "正確さと手軽さのバランスを求める方、初めての赤ちゃん体温計に",
    notFor: "寝ている間にサッと測りたい方（わきに挟む必要あり）",
    priceRange: "約2,000〜3,000円",
    scene: "朝の検温、保育園の登園前チェック。15秒なら泣き出す前に測り終えられる",
  },
  {
    name: "テルモ 電子体温計 C531",
    brand: "テルモ",
    type: "予測式（わき）" as const,
    asin: "B09M3WWFNR",
    officialUrl: "https://www.terumo.co.jp/",
    features: [
      "医療機器メーカーの高い信頼性",
      "予測検温約20秒、実測検温にも切り替え可能",
      "シンプルな操作で迷わない",
      "防水設計で丸洗いできて衛生的",
    ],
    bestFor: "信頼できるメーカーで選びたい方、シンプル操作が好みの方",
    notFor: "とにかく短時間で測りたい方（20秒は標準的）",
    priceRange: "約1,500〜2,500円",
    scene: "家庭の定番体温計。赤ちゃんが大きくなってからも家族全員で使える",
  },
  {
    name: "ピジョン おでこで測る体温計 チビオンTouch",
    brand: "ピジョン",
    type: "非接触（おでこ）" as const,
    asin: "B01KZFB4FQ",
    officialUrl: "https://products.pigeon.co.jp/",
    features: [
      "おでこに1秒タッチするだけで検温完了",
      "寝ている赤ちゃんを起こさず測れる",
      "体温の変動を見やすい体温トレンド表示",
      "室温表示機能付きで赤ちゃんの環境管理にも便利",
    ],
    bestFor: "夜中の検温、寝ている間に測りたい方、サッと手軽に済ませたい方",
    notFor: "高い精度を求める方（環境温度の影響を受けやすい）",
    priceRange: "約3,500〜5,000円",
    scene: "夜中に熱っぽいかも？と思ったとき、寝顔のままおでこにピッ。起こさず確認できる",
  },
  {
    name: "コンビ ベビーレーベル 耳式体温計",
    brand: "コンビ",
    type: "耳式" as const,
    asin: "B075FMC8WQ",
    officialUrl: "https://www.combi.co.jp/",
    features: [
      "耳に入れて約1秒で検温完了",
      "赤ちゃん用品メーカーの安心設計",
      "小さな耳にフィットする専用プローブカバー付き",
      "25回分のメモリ機能で体温管理しやすい",
    ],
    bestFor: "短時間で測りたいけど非接触より精度がほしい方",
    notFor: "耳に入れるのを嫌がる赤ちゃん、中耳炎がある場合",
    priceRange: "約3,000〜4,000円",
    scene: "動き回る月齢になってから特に便利。わきに挟めない元気な赤ちゃんにも対応",
  },
];

const typeGuide = [
  {
    condition: "初めての赤ちゃん、1本で万能に使いたい",
    recommendation: "オムロン けんおんくん MC-682",
    reason: "15秒の予測式で精度と手軽さのバランスが最も良い。迷ったらこれ",
  },
  {
    condition: "夜中に起こさず測りたい",
    recommendation: "ピジョン チビオンTouch（非接触）",
    reason: "おでこに1秒タッチ。寝ている赤ちゃんを起こさず熱を確認できる",
  },
  {
    condition: "動き回る月齢、じっとしていられない",
    recommendation: "耳式体温計",
    reason: "耳に1秒で完了。わきに挟むのが難しくなってきたら検討を",
  },
  {
    condition: "2本持ちで万全にしたい",
    recommendation: "予測式（日常用）+ 非接触（夜間用）",
    reason: "精度が必要な場面は予測式、サッと確認したい場面は非接触と使い分ける家庭が多い",
  },
];

export default function ThermometerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "体温計の選びかた" },
          ]} />
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">ヘルスケア</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              体温計の選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              予測式・非接触・耳式の違いを、生活シーン別に整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "体温計、なぜ迷いやすいのか" },
            { id: "comparison-axes", label: "選ぶときに見るべき5つの軸" },
            { id: "products", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8" id="why-confusing">
            <h2 className="text-lg font-bold text-foreground mb-4">
              体温計、なぜ迷いやすいのか
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
                  結論から言うと、<strong>迷ったら予測式（わき）を1本持っておけば間違いない</strong>です。
                  精度・価格・使いやすさのバランスが最も良く、保育園の検温にも対応できます。
                  余裕があれば非接触を2本目に持つと便利です。
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">方式</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">測定時間</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">精度</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">オムロン MC-682</td>
                    <td className="py-2 px-2 text-foreground">予測式</td>
                    <td className="py-2 px-2 text-foreground">15秒</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">約2,500円</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">テルモ C531</td>
                    <td className="py-2 px-2 text-foreground">予測式</td>
                    <td className="py-2 px-2 text-foreground">20秒</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">約2,000円</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ピジョン チビオン</td>
                    <td className="py-2 px-2 text-foreground">非接触</td>
                    <td className="py-2 px-2 text-foreground">1秒</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">約4,000円</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">コンビ 耳式</td>
                    <td className="py-2 px-2 text-foreground">耳式</td>
                    <td className="py-2 px-2 text-foreground">1秒</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">約3,500円</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どれを選んでも、体温はきちんと測れます。</strong>
                <br />
                赤ちゃんの平熱は36.5〜37.5度と高め。まず元気なときに何度か測って平熱を把握しておきましょう。
                <br />
                平熱がわかっていれば、いざというとき慌てずに判断できます。
                <br />
                迷ったら、まず予測式を1本。それが赤ちゃん体温計の王道です。
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
                name="オムロン けんおんくん MC-682"
                asin="B00CWA11WQ"
                price="¥2,500〜"
                officialUrl="https://www.healthcare.omron.co.jp/"
              />
              <AmazonProductCard
                name="テルモ 電子体温計 C531"
                asin="B09M3WWFNR"
                price="¥1,800〜"
                officialUrl="https://www.terumo.co.jp/"
              />
              <AmazonProductCard
                name="ピジョン チビオンTouch"
                asin="B01KZFB4FQ"
                price="¥3,800〜"
                officialUrl="https://products.pigeon.co.jp/"
              />
              <AmazonProductCard
                name="コンビ ベビーレーベル 耳式体温計"
                asin="B075FMC8WQ"
                price="¥3,200〜"
                officialUrl="https://www.combi.co.jp/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="体温計の選びかた" path="/prepare/thermometer" />

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
