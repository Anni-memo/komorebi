import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "バウンサーの選びかた",
  description:
    "バウンサー、手動と電動どっちがいい？ビョルン・ネムリラ・ユラリズムを比較。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "手動と電動、価格差が大きくてどちらにすべきか悩む",
  "「結局使わなかった」という口コミも多くて不安",
  "バウンサーとハイローチェア、何が違うのかわからない",
  "赤ちゃんが気に入るかどうかは使ってみないとわからない",
];

const axes = [
  {
    name: "手動 vs 電動",
    why: "手動は自分の足や手で揺らす。電動はスイッチひとつで自動。ワンオペ度で判断",
  },
  {
    name: "リクライニング段数",
    why: "フラットに近い角度は新生児向き。起こせるとお座り期まで使える",
  },
  {
    name: "使用期間",
    why: "手動バウンサーは約2歳まで。電動ハイローチェアは4歳頃まで使えるものも",
  },
  {
    name: "折りたたみ・収納",
    why: "使わないときに場所を取らないか。リビングが狭い家庭では重要",
  },
  {
    name: "洗濯のしやすさ",
    why: "吐き戻しやよだれで汚れやすい。シートが外して洗えるかどうか",
  },
  {
    name: "価格帯",
    why: "手動は5,000〜25,000円、電動は30,000〜70,000円。価格差が大きい",
  },
];

const products = [
  {
    name: "ベビービョルン バウンサーBliss",
    brand: "ベビービョルン",
    type: "手動" as const,
    features: [
      "赤ちゃん自身の動きで自然に揺れるエルゴノミックデザイン",
      "メッシュ素材で通気性抜群。夏場も蒸れにくい",
      "折りたたむと厚さ約12cmでコンパクトに収納",
      "シートカバーは洗濯機で丸洗い可能",
    ],
    bestFor: "シンプル・軽量を求める方、持ち運びたい方",
    notFor: "自動で揺らしてほしい方（手動なので赤ちゃんが自分で揺らす仕組み）",
    priceRange: "約20,000〜27,000円",
    scene: "料理中にキッチンの横で。お風呂待ちの脱衣所で。軽いので家中どこでも移動できる",
  },
  {
    name: "コンビ ネムリラ AUTO SWING",
    brand: "コンビ",
    type: "電動" as const,
    features: [
      "電動スウィングで寝かしつけをサポート",
      "ダッコシートプラスで包まれるような安心感",
      "4段階リクライニングとステップ連動で成長に対応",
      "テーブル付きで離乳食の椅子としても使える",
    ],
    bestFor: "ワンオペの時間が長い方、寝かしつけに苦労している方",
    notFor: "軽量・コンパクトを求める方（約12kgと重い）",
    priceRange: "約40,000〜65,000円",
    scene: "寝かしつけに時間がかかるとき、スイッチひとつで揺れが始まる。両手が空くのが最大の利点",
  },
  {
    name: "アップリカ ユラリズム オート",
    brand: "アップリカ",
    type: "電動" as const,
    features: [
      "電動でゆったりとしたスウィング",
      "ママの抱っこに近い「ヨコ抱き」対応",
      "静音設計で赤ちゃんの眠りを妨げない",
      "テーブル付きでハイチェアとしても使える",
    ],
    bestFor: "新生児期から長く使いたい方、静音性を重視する方",
    notFor: "予算を抑えたい方（電動は高額）",
    priceRange: "約35,000〜60,000円",
    scene: "新生児からお座りまで1台で対応。リビングでの定位置として活躍する",
  },
  {
    name: "リッチェル バウンシングシート",
    brand: "リッチェル",
    type: "手動・コスパ" as const,
    features: [
      "主要メーカーの中で圧倒的なコスパ",
      "メッシュシートで通気性が良い",
      "軽量で移動が楽",
      "トイバー付きでおもちゃを取り付けられる",
    ],
    bestFor: "コスパ重視の方、まず試してみたい方",
    notFor: "電動の自動揺れを求める方",
    priceRange: "約5,000〜8,000円",
    scene: "「バウンサーが合うかわからない」ときのお試しに。使わなくなっても後悔しない価格",
  },
];

const typeGuide = [
  {
    condition: "ワンオペが多い、寝かしつけに苦労",
    recommendation: "コンビ ネムリラ or アップリカ ユラリズム（電動）",
    reason: "電動スウィングで両手が空く。家事をしながら寝かしつけができる",
  },
  {
    condition: "シンプル・軽量・持ち運びたい",
    recommendation: "ベビービョルン バウンサーBliss",
    reason: "折りたたみで場所を取らない。赤ちゃんの自重で自然に揺れる",
  },
  {
    condition: "コスパ重視、まず試してみたい",
    recommendation: "リッチェル バウンシングシート",
    reason: "5,000〜8,000円で試せる。合わなくても家計への影響が少ない",
  },
  {
    condition: "長く使いたい（離乳食の椅子としても）",
    recommendation: "コンビ ネムリラ or アップリカ ユラリズム",
    reason: "テーブル付きでハイチェアとしても使える。4歳頃まで活躍",
  },
];

export default function BouncerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">バウンサー</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              バウンサーの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              手動と電動の違い、使用シーンを整理しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              バウンサー、なぜ迷いやすいのか
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
                  結論から言うと、<strong>バウンサーは「あると助かる」タイプの育児グッズ</strong>です。
                  必需品ではないけれど、ワンオペの時間が長い方には強い味方になります。
                  赤ちゃんの好みもあるので、迷ったら安いものから試すのがおすすめです。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 比較軸 */}
          <section className="mb-8">
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

          {/* 3. 手動 vs 電動 */}
          <section className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  手動と電動、どちらがいい？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">手動がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・予算を抑えたい</li>
                      <li>・軽くてコンパクトなものがいい</li>
                      <li>・リビング以外にも持ち運びたい</li>
                      <li>・「揺れ」より「居場所」として使いたい</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">電動がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・ワンオペの時間が長い</li>
                      <li>・寝かしつけに苦労している</li>
                      <li>・離乳食の椅子としても使いたい</li>
                      <li>・長期間（4歳頃まで）使いたい</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong className="text-foreground">手動バウンサー</strong>は「赤ちゃんの居場所」、
                  <strong className="text-foreground">電動ハイローチェア</strong>は「寝かしつけ＋椅子」と考えるとわかりやすいです。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 4. 商品別の使用感 */}
          <section className="mb-8">
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
                    <div className="space-y-3">
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

          {/* 6. 比較表 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">比較表</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">商品</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">タイプ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">リクライニング</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">使用期間</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">折りたたみ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ビョルン Bliss</td>
                    <td className="py-2 px-2 text-foreground">手動</td>
                    <td className="py-2 px-2 text-foreground">3段階</td>
                    <td className="py-2 px-2 text-foreground">〜2歳</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">約2〜2.7万</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ネムリラ</td>
                    <td className="py-2 px-2 text-foreground">電動</td>
                    <td className="py-2 px-2 text-foreground">4段階</td>
                    <td className="py-2 px-2 text-foreground">〜4歳</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">約4〜6.5万</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ユラリズム</td>
                    <td className="py-2 px-2 text-foreground">電動</td>
                    <td className="py-2 px-2 text-foreground">5段階</td>
                    <td className="py-2 px-2 text-foreground">〜4歳</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">約3.5〜6万</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">リッチェル</td>
                    <td className="py-2 px-2 text-foreground">手動</td>
                    <td className="py-2 px-2 text-foreground">3段階</td>
                    <td className="py-2 px-2 text-foreground">〜2歳</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">約0.5〜0.8万</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>バウンサーがなくても、赤ちゃんは元気に育ちます。</strong>
                <br />
                あくまで「あると助かる」グッズです。
                <br />
                赤ちゃんによって好みが分かれるので、迷ったらまず安いものから試すか、
                <br />
                レンタルで使い心地を確かめてみてください。
              </p>
            </CardContent>
          </Card>

          {/* 購入できる場所 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              購入できる場所
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              ここで紹介した商品はAmazonでも購入できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AmazonProductCard
                name="ベビービョルン Bliss"
                asin="B07GBYVZ59"
                imageId="41yq8gUvURL"
                price="¥25,000〜"
              />
              <AmazonProductCard
                name="コンビ ネムリラ"
                asin="B0BXNT75HJ"
                imageId="41FqYzXNURL"
                price="¥38,000〜"
              />
              <AmazonProductCard
                name="アップリカ ユラリズム"
                asin="B0BN3T8NTF"
                imageId="41Dq1eKRURL"
                price="¥35,000〜"
              />
              <AmazonProductCard
                name="リッチェル バウンシングシート"
                asin="B0051SSSV2"
                imageId="41kXeVzNURL"
                price="¥5,500〜"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              価格・仕様は2026年3月時点の情報です。実際の価格は販売店により異なります。
              バウンサーは赤ちゃんの好みが分かれるため、可能であればレンタルや店頭で試してから購入することをおすすめします。
              参考: LDK Baby、マイベスト、ママリ口コミ大賞
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
