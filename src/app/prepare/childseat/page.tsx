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
  title: "チャイルドシートの選びかた",
  description:
    "チャイルドシート、どれを選べばいい？回転式・ISOFIX・新生児対応の違いを整理。コンビ・アップリカ・サイベックス・ジョイーの4製品を比較しました。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "回転式と固定式の違いがよくわからない",
  "ISOFIX対応かシートベルト固定か、自分の車でどちらが使えるか不安",
  "新生児から使えるものと、1歳からのものの区別がつきにくい",
  "価格帯が2万円〜7万円と広く、何に差があるのかわかりにくい",
];

const axes = [
  {
    name: "回転式かどうか",
    why: "ドアが狭い車や駐車場で特に重要。赤ちゃんの乗せ降ろしが格段に楽になる",
  },
  {
    name: "ISOFIX対応",
    why: "金具でワンタッチ固定。取り付けミスが起きにくく安全性が高い。2012年以降の車はほぼ対応",
  },
  {
    name: "新生児から使えるか",
    why: "退院時から必要。新生児対応なら買い直し不要で長く使える",
  },
  {
    name: "リクライニング段数",
    why: "新生児期はフラットに近い角度が必須。成長に合わせて角度を変えられると快適",
  },
  {
    name: "サイズ・重さ",
    why: "車種によっては助手席側にしか付けられないことも。載せ替えがあるなら軽さも重要",
  },
  {
    name: "価格帯",
    why: "使用期間は約4年。安全基準はどれもクリアしているので、生活に合う機能で選ぶのが合理的",
  },
];

const products = [
  {
    name: "コンビ クルムーヴ スマート",
    brand: "コンビ",
    type: "回転式" as const,
    asin: "B0C6HD29CG",
    officialUrl: "https://www.combi.co.jp/",
    features: [
      "360度回転式で乗せ降ろしが楽。ドアが狭くても対応しやすい",
      "ISOFIX対応でワンタッチ取り付け。取り付けミスを防げる",
      "新生児から4歳頃まで使えるロングユース設計",
      "エッグショック搭載で頭部への衝撃を吸収",
      "3段階リクライニングで成長に合わせて調整可能",
    ],
    bestFor: "乗せ降ろしの楽さを最重視する方、コンパクトカーの方",
    notFor: "予算を3万円以下に抑えたい方",
    priceRange: "約45,000〜55,000円",
    scene: "スーパーの駐車場で片手に荷物を持ちながら、もう片手でくるっと回して乗せられる",
    weight: "約12.2kg",
    recline: "3段階",
  },
  {
    name: "アップリカ フラディア グロウ",
    brand: "アップリカ",
    type: "回転式・ベッド型" as const,
    asin: "B0BN3SD8YG",
    officialUrl: "https://www.aprica.jp/",
    features: [
      "横向きベッド型にできるのは国内ほぼアップリカだけ。新生児の呼吸が楽",
      "360度回転式でISOFIX対応",
      "新生児から4歳頃まで対応",
      "フルリクライニングで寝ている赤ちゃんをそのまま乗せやすい",
      "サイドシールド搭載で側面衝突にも対応",
    ],
    bestFor: "新生児期の快適性を最重視する方、長距離ドライブが多い方",
    notFor: "コンパクトな車に載せたい方（ベッド型は場所を取る）",
    priceRange: "約50,000〜65,000円",
    scene: "退院時から使えるベッド型で、新生児を平らな姿勢のまま車に乗せられる安心感",
    weight: "約14.8kg",
    recline: "4段階（ベッド型含む）",
  },
  {
    name: "サイベックス シローナ",
    brand: "サイベックス",
    type: "回転式" as const,
    asin: "B0C5KQ3VCM",
    officialUrl: "https://cybex-online.com/ja-jp",
    features: [
      "ヨーロッパ安全基準で高評価。世界的に支持されるブランド",
      "360度回転式でISOFIX対応",
      "新生児から4歳頃まで使用可能",
      "リニアサイドインパクトプロテクション（L.S.P.）搭載",
      "ヘッドレストとハーネスが連動して高さ調整できる",
    ],
    bestFor: "安全性とデザインを両立したい方、海外ブランドに信頼を置く方",
    notFor: "予算を4万円以下に抑えたい方、軽さ重視の方",
    priceRange: "約55,000〜70,000円",
    scene: "安全性に定評のある欧州ブランド。デザインもスタイリッシュで車内に馴染む",
    weight: "約15.0kg",
    recline: "5段階",
  },
  {
    name: "ジョイー アーク360",
    brand: "ジョイー",
    type: "回転式" as const,
    asin: "B0BGM8R4H8",
    officialUrl: "https://joie-baby.jp/",
    features: [
      "回転式・ISOFIX対応でありながらコスパが高い",
      "新生児から4歳頃まで使用可能",
      "側面衝突保護「ガードサラウンドセーフティパネル」搭載",
      "ヘッドレスト高さ調整可能で成長に対応",
      "カバーが取り外して洗える",
    ],
    bestFor: "回転式・ISOFIXを手頃な価格で手に入れたい方",
    notFor: "ベッド型（横向き）が必要な方",
    priceRange: "約25,000〜35,000円",
    scene: "「回転式がいいけど予算は抑えたい」という方にちょうどいい。基本機能はしっかりカバー",
    weight: "約11.9kg",
    recline: "5段階",
  },
];

const typeGuide = [
  {
    condition: "乗せ降ろしの楽さ重視、コンパクトカー",
    recommendation: "コンビ クルムーヴ スマート",
    reason: "回転式で軽め。エッグショック搭載で安全性も確保。バランスが良い",
  },
  {
    condition: "新生児期の快適性重視、長距離ドライブが多い",
    recommendation: "アップリカ フラディア グロウ",
    reason: "横向きベッド型は国内でほぼ唯一。新生児の呼吸が楽で、退院直後から安心して使える",
  },
  {
    condition: "安全性とデザインの両立",
    recommendation: "サイベックス シローナ",
    reason: "欧州の安全基準で高評価。デザインもスタイリッシュで所有満足度が高い",
  },
  {
    condition: "コスパ重視、基本機能は押さえたい",
    recommendation: "ジョイー アーク360",
    reason: "回転式・ISOFIX対応で2万円台〜。必要十分な機能を手頃な価格で",
  },
];

export default function ChildseatPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "チャイルドシートの選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">チャイルドシート</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              チャイルドシートの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              回転式4製品に絞って、安全性・使いやすさ・価格を整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "チャイルドシート、なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき6つの軸" },
            { id: "rotating-vs-fixed", label: "回転式と固定式、どちらがいい？" },
            { id: "products", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              チャイルドシート、なぜ迷いやすいのか
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
                  結論から言うと、<strong>今回紹介する4製品はすべて回転式・ISOFIX対応・新生児から使えるモデル</strong>です。
                  日本の安全基準をクリアしているので、大きな失敗はありません。
                  「自分の車と生活スタイルに合うかどうか」で選ぶと、迷いが減ります。
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

          {/* 3. 回転式 vs 固定式 */}
          <section id="rotating-vs-fixed" className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  回転式と固定式、どちらがいい？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">回転式がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・ドアの開口部が狭い車（コンパクトカーなど）</li>
                      <li>・一人で赤ちゃんを乗せ降ろしすることが多い</li>
                      <li>・腰への負担を減らしたい</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">固定式がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・予算を最小限に抑えたい</li>
                      <li>・車のドアが広く乗せ降ろしに困らない</li>
                      <li>・軽さを最優先にしたい</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  今回は多くの方に使いやすい<strong className="text-foreground">回転式タイプ</strong>を中心にご紹介しています。
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">回転式</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">ISOFIX</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">新生児対応</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">リクライニング</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">重さ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">コンビ クルムーヴ</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">3段階</td>
                    <td className="py-2 px-2 text-foreground">12.2kg</td>
                    <td className="py-2 px-2 text-foreground">4.5〜5.5万</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">アップリカ フラディア</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○（ベッド型）</td>
                    <td className="py-2 px-2 text-foreground">4段階</td>
                    <td className="py-2 px-2 text-foreground">14.8kg</td>
                    <td className="py-2 px-2 text-foreground">5〜6.5万</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">サイベックス シローナ</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">5段階</td>
                    <td className="py-2 px-2 text-foreground">15.0kg</td>
                    <td className="py-2 px-2 text-foreground">5.5〜7万</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">ジョイー アーク360</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">5段階</td>
                    <td className="py-2 px-2 text-foreground">11.9kg</td>
                    <td className="py-2 px-2 text-foreground">2.5〜3.5万</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>どれを選んでも、赤ちゃんは安全に車に乗れます。</strong>
                <br />
                今回紹介した4製品はすべて日本の安全基準をクリアした定番モデルです。
                <br />
                お使いの車種と生活スタイルに合うものを選べば、それが正解です。
                <br />
                迷ったら、ベビー用品店で実際にお車に取り付けてみてください。
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
                name="コンビ クルムーヴ スマート"
                asin="B0C6HD29CG"
                price="¥45,000〜"
                officialUrl="https://www.combi.co.jp/"
              />
              <AmazonProductCard
                name="アップリカ フラディア グロウ"
                asin="B0BN3SD8YG"
                price="¥48,000〜"
                officialUrl="https://www.aprica.jp/"
              />
              <AmazonProductCard
                name="サイベックス シローナ"
                asin="B0C5KQ3VCM"
                price="¥55,000〜"
                officialUrl="https://cybex-online.com/ja-jp"
              />
              <AmazonProductCard
                name="ジョイー アーク360"
                asin="B0BGM8R4H8"
                price="¥28,000〜"
                officialUrl="https://joie-baby.jp/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="チャイルドシートの選びかた" path="/prepare/childseat" />

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
