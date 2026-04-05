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
  title: "ベビーベッド・寝具の選びかた",
  description:
    "ベビーベッドと布団、どちらを選ぶ？レギュラー・ミニ・添い寝型の違い、折りたたみ、安全基準を整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "ベッドと布団、どちらが安全なのかわからない",
  "レギュラーサイズとミニサイズ、どっちが正解？",
  "使う期間が短いのに高い買い物をすべきか迷う",
  "SG・PSCマークなど安全基準の違いがわからない",
];

const axes = [
  {
    name: "サイズ（レギュラー / ミニ / 添い寝型）",
    why: "部屋の広さと設置場所で選択肢が決まる。レギュラーは約120×70cm、ミニは約90×60cm",
  },
  {
    name: "折りたたみ可否",
    why: "里帰り出産や帰省時に持ち運びたいなら折りたたみ式が便利",
  },
  {
    name: "使用期間（何ヶ月まで）",
    why: "ミニは生後6ヶ月頃まで、レギュラーは24ヶ月頃まで。成長速度で変わる",
  },
  {
    name: "安全基準（SG / PSC マーク）",
    why: "PSCマークは法律上の安全基準。SGマークは任意だが製品安全の目安になる",
  },
  {
    name: "価格帯",
    why: "ベッドは1〜5万円、布団セットは5千〜2万円。レンタルという選択肢もある",
  },
];

const products = [
  {
    name: "ネオママイズム ベビーベッド",
    brand: "ネオママイズム",
    type: "折りたたみ・ミニ" as const,
    asin: "B09TVFF1PC",
    officialUrl: "",
    features: [
      "折りたたみ式で収納・持ち運びが容易",
      "キャスター付きで部屋間の移動がスムーズ",
      "ミニサイズで省スペース（約90×60cm）",
      "SGマーク認証取得で安全性が高い",
    ],
    bestFor: "里帰り出産、部屋が狭い家庭、帰省が多い方",
    notFor: "生後6ヶ月以降も長く使いたい方",
    priceRange: "約15,000〜20,000円",
    scene: "リビングと寝室を行き来する生活。折りたためるので里帰り出産にも最適",
  },
  {
    name: "カトージ ミニベビーベッド",
    brand: "カトージ",
    type: "ミニ" as const,
    asin: "B07K319ZXG",
    officialUrl: "https://www.katoji.co.jp/",
    features: [
      "国内老舗ブランドの安心感",
      "ミニサイズながらしっかりした作り",
      "床板の高さ調整が可能（3段階）",
      "PSC・SGマーク取得済み",
    ],
    bestFor: "マンション住まいで省スペースが必要な方",
    notFor: "大きめの赤ちゃん（早めにサイズアウトする可能性）",
    priceRange: "約15,000〜25,000円",
    scene: "6畳の寝室でも無理なく置ける。ベッド下は収納スペースとしても活躍",
  },
  {
    name: "ファルスカ ベッドインベッド",
    brand: "ファルスカ",
    type: "添い寝型" as const,
    asin: "B07YBQC92Z",
    officialUrl: "https://farska.com/",
    features: [
      "大人のベッドの上に置いて添い寝ができる",
      "三角形のフレームで寝返りによる圧迫を防止",
      "成長に合わせて形を変えて長く使える",
      "軽量・コンパクトで旅行や帰省にも便利",
    ],
    bestFor: "添い寝をしたいけど安全面が気になる方、持ち運びたい方",
    notFor: "独立した寝室空間を確保したい方",
    priceRange: "約8,000〜12,000円",
    scene: "夜間の授乳が多い時期、すぐそばで赤ちゃんを寝かせたい。旅行にも持っていける",
  },
  {
    name: "西松屋 ベビー布団セット",
    brand: "西松屋",
    type: "布団セット" as const,
    asin: "",
    officialUrl: "https://www.24028.jp/",
    features: [
      "掛け布団・敷き布団・カバー類が一式そろう",
      "圧倒的なコストパフォーマンス",
      "洗濯機で丸洗い可能な製品が多い",
      "店舗数が多く実物を見て購入しやすい",
    ],
    bestFor: "コスパ重視の方、ベッドを置くスペースがない方",
    notFor: "ペットがいる家庭（床に近いためホコリやペット対策が必要）",
    priceRange: "約5,000〜10,000円",
    scene: "和室に布団を敷く生活スタイル。ベッドを買わずに費用を他に回したい方に",
  },
];

const typeGuide = [
  {
    condition: "部屋が狭い（6畳以下）",
    recommendation: "ミニベッド or ベッドインベッド",
    reason: "レギュラーサイズは場所を取る。ミニなら生活動線を確保できる",
  },
  {
    condition: "長く使いたい（2歳頃まで）",
    recommendation: "レギュラーサイズのベビーベッド",
    reason: "ミニは6ヶ月頃でサイズアウト。長く使うならレギュラーが結果的にお得",
  },
  {
    condition: "里帰り出産を予定している",
    recommendation: "折りたたみ式ベビーベッド",
    reason: "持ち運びやすく、実家でも自宅でも使える",
  },
  {
    condition: "コスパ重視、とにかく費用を抑えたい",
    recommendation: "布団セット（西松屋など）",
    reason: "5千〜1万円で一式揃う。ベッド代を浮かせて他の準備に回せる",
  },
];

export default function BabyBedPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "ベビーベッド・寝具の選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">睡眠環境</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビーベッド・寝具の選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              ベッドと布団の違い、サイズ選び、安全基準を整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき5つの軸" },
            { id: "bed-vs-futon", label: "ベビーベッドと布団、どちらがいい？" },
            { id: "products", label: "おすすめ商品" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビーベッド・寝具、なぜ迷いやすいのか
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
                  結論から言うと、<strong>ベッドでも布団でも、安全に使えばどちらでも大丈夫</strong>です。
                  大事なのは「自分の家庭の生活スタイルに合っているか」。
                  ここでは選びやすくなるよう、比較軸を整理しました。
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

          {/* 3. ベッド vs 布団 */}
          <section id="bed-vs-futon" className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  ベビーベッドと布団、どちらがいい？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">ベッドがおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・ペットがいる、上の子が小さい（安全柵として機能）</li>
                      <li>・腰痛がある（かがまず抱き上げられる）</li>
                      <li>・ホコリやダニが気になる（床から距離を取れる）</li>
                      <li>・おむつ替えを楽にしたい（高さがあると腰が楽）</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">布団がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・部屋が狭く、ベッドを置くスペースがない</li>
                      <li>・費用をできるだけ抑えたい</li>
                      <li>・添い寝・添い乳をしたい</li>
                      <li>・使わないときは畳んで部屋を広く使いたい</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  どちらを選んでも、<strong className="text-foreground">硬めの敷布団を使い、掛け布団は軽いもの</strong>を選ぶのが安全のポイントです。
                  柔らかすぎる寝具はSIDS（乳幼児突然死症候群）のリスク要因とされています。
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">タイプ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">折りたたみ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">使用期間</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">安全基準</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ネオママイズム</td>
                    <td className="py-2 px-2 text-foreground">ミニ</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">〜6ヶ月</td>
                    <td className="py-2 px-2 text-foreground">SG</td>
                    <td className="py-2 px-2 text-foreground">約1.5〜2万</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">カトージ ミニ</td>
                    <td className="py-2 px-2 text-foreground">ミニ</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">〜6ヶ月</td>
                    <td className="py-2 px-2 text-foreground">PSC・SG</td>
                    <td className="py-2 px-2 text-foreground">約1.5〜2.5万</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ファルスカ</td>
                    <td className="py-2 px-2 text-foreground">添い寝</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">〜12ヶ月</td>
                    <td className="py-2 px-2 text-foreground">-</td>
                    <td className="py-2 px-2 text-foreground">約0.8〜1.2万</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">西松屋 布団セット</td>
                    <td className="py-2 px-2 text-foreground">布団</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">〜24ヶ月</td>
                    <td className="py-2 px-2 text-foreground">-</td>
                    <td className="py-2 px-2 text-foreground">約0.5〜1万</td>
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
                ベッドでも布団でも、安全に使えば問題ありません。
                <br />
                大切なのは「硬めの敷布団」と「顔まわりに物を置かない」こと。
                <br />
                迷ったら、まず今の部屋のスペースを測ってみてください。
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
                name="ネオママイズム ベビーベッド"
                asin="B09TVFF1PC"
                price="¥15,000〜"
              />
              <AmazonProductCard
                name="カトージ ミニベビーベッド"
                asin="B07K319ZXG"
                price="¥18,000〜"
                officialUrl="https://www.katoji.co.jp/"
              />
              <AmazonProductCard
                name="ファルスカ ベッドインベッド"
                asin="B07YBQC92Z"
                price="¥8,800〜"
                officialUrl="https://farska.com/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="ベビーベッド・寝具の選びかた" path="/prepare/baby-bed" />

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
