import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "ベビーモニターの選びかた",
  description:
    "ベビーモニター、どれを選べばいい？パナソニック・トリビュート・Cubo Ai・Tapoの4製品を比較。映像品質、暗視機能、スマホ連携を整理しました。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "専用モニター型とスマホ連携型、どちらがいいのかわからない",
  "「見守りカメラ」と「ベビーモニター」の違いが曖昧",
  "Wi-Fi不要のものとWi-Fi必須のもの、セキュリティが心配",
  "高機能なものは高額だが、本当にその機能が必要かわからない",
];

const axes = [
  {
    name: "映像品質（解像度）",
    why: "暗い部屋でも赤ちゃんの様子がはっきり見えるかどうか。最低でも720p、できれば1080pが安心",
  },
  {
    name: "暗視（ナイトビジョン）機能",
    why: "赤ちゃんの睡眠中は部屋を暗くするため、暗視機能の品質が実用性に直結する",
  },
  {
    name: "通知機能（泣き声・動き検知）",
    why: "泣き声や動きを検知して通知してくれると、別室にいても安心。過敏すぎると通知疲れに",
  },
  {
    name: "スマホ連携 / 専用モニター",
    why: "スマホ連携型は外出先からも見られる。専用モニター型はWi-Fi不要で安定・セキュリティも高い",
  },
  {
    name: "価格帯",
    why: "3,000円台〜40,000円台まで幅が広い。使う期間と機能のバランスで選ぶ",
  },
];

const products = [
  {
    name: "パナソニック ベビーモニター KX-HBC200",
    brand: "パナソニック",
    type: "専用モニター型" as const,
    features: [
      "専用モニター付きでWi-Fi不要。セットアップが簡単",
      "DECT準拠方式で安定した映像伝送。ハッキングリスクなし",
      "暗視機能・おやすみ音・温度センサー内蔵",
      "2.4インチ専用モニターで手元ですぐ確認できる",
    ],
    bestFor: "Wi-Fiが不安定な家庭、セキュリティを最重視する方、シンプルに使いたい方",
    notFor: "外出先から見たい方、高画質にこだわる方",
    priceRange: "約15,000〜20,000円",
    scene: "寝室に設置して、リビングの専用モニターで確認。夜間の見守りに特に安心",
  },
  {
    name: "トリビュート ワイヤレスベビーカメラ BM-LTL2",
    brand: "トリビュート",
    type: "コスパ専用モニター型" as const,
    features: [
      "Wi-Fi不要の専用モニター型。すぐに使い始められる",
      "赤外線暗視で暗い部屋でもくっきり",
      "子守歌・温度表示・双方向通話対応",
      "日本メーカーで取扱説明書もわかりやすい",
    ],
    bestFor: "手頃な価格で専用モニターがほしい方、ネット接続に不安がある方",
    notFor: "スマホで見たい方、AI機能を求める方",
    priceRange: "約8,000〜12,000円",
    scene: "2階の寝室で赤ちゃんが寝ている間、1階のリビングで安心して過ごせる",
  },
  {
    name: "Cubo Ai Plus",
    brand: "Cubo Ai",
    type: "AI高機能型" as const,
    features: [
      "AI顔認識で「顔が覆われた」「うつぶせ寝」を検知して即通知",
      "1080p HD画質。暗視でも高画質",
      "泣き声検知・危険エリア通知・成長記録の自動撮影",
      "スマホアプリで外出先からもリアルタイム視聴",
    ],
    bestFor: "安全機能を最重視する方、AI検知に価値を感じる方",
    notFor: "Wi-Fi環境がない方、サブスク費用を避けたい方（一部機能は有料プラン）",
    priceRange: "約30,000〜40,000円",
    scene: "SIDS（乳幼児突然死症候群）への不安が強い方に。うつぶせ寝の自動検知は他にない安心感",
  },
  {
    name: "TP-Link Tapo C200",
    brand: "TP-Link",
    type: "コスパ代表" as const,
    features: [
      "見守りカメラとして圧倒的なコストパフォーマンス",
      "1080p HD画質、360度回転（パン・チルト）対応",
      "暗視機能・動体検知・双方向通話対応",
      "スマホアプリ（Tapo）で複数カメラの管理も可能",
    ],
    bestFor: "とにかく安く始めたい方、まずは試してみたい方",
    notFor: "ベビー専用の安全機能（うつぶせ検知等）を求める方",
    priceRange: "約3,000〜4,500円",
    scene: "「高いモニターを買って使わなかったらもったいない」と思う方に。まずこれで試して、物足りなければ買い替えても損が少ない",
  },
];

const typeGuide = [
  {
    condition: "Wi-Fi不安・セキュリティ重視・シンプルに使いたい",
    recommendation: "パナソニック KX-HBC200",
    reason: "Wi-Fi不要の専用モニター型。ハッキングリスクゼロで、設定も電源を入れるだけ",
  },
  {
    condition: "手頃な価格で専用モニターがほしい",
    recommendation: "トリビュート BM-LTL2",
    reason: "1万円前後で専用モニター付き。日本メーカーでサポートも安心",
  },
  {
    condition: "SIDS対策・うつぶせ寝検知など安全機能を最重視",
    recommendation: "Cubo Ai Plus",
    reason: "AI顔認識でうつぶせ寝・顔覆いを検知。安全への安心感は他製品を大きく上回る",
  },
  {
    condition: "まずは安く試したい、コスパ最優先",
    recommendation: "Tapo C200",
    reason: "3,000円台で1080p・暗視・動体検知。合わなくても損が小さい",
  },
];

export default function BabyMonitorPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">ベビーモニター</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビーモニターの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              タイプの異なる4製品に絞って、映像品質・安全機能・コスパを整理しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビーモニター、なぜ迷いやすいのか
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
                  結論から言うと、<strong>必要な機能は生活環境によって大きく変わります</strong>。
                  「部屋の間取り」「Wi-Fi環境」「予算」の3つで絞ると選びやすくなります。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 比較軸 */}
          <section className="mb-8">
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

          {/* 3. 専用モニター vs スマホ連携 */}
          <section className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  専用モニター型とスマホ連携型、どちらがいい？
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">専用モニター型がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・Wi-Fi環境が不安定、またはない</li>
                      <li>・ネット接続のセキュリティが心配</li>
                      <li>・設定の手間なく、すぐ使いたい</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">スマホ連携型がおすすめの方</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>・外出先からも見守りたい</li>
                      <li>・AI検知などの高機能がほしい</li>
                      <li>・家に安定したWi-Fiがある</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong className="text-foreground">どちらが多い？</strong>{" "}
                  日本では専用モニター型の人気が根強いですが、スマホ連携型も急速に普及しています。
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">映像品質</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">暗視</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">通知機能</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">スマホ連携</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">価格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">パナソニック</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">-</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">トリビュート</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">-</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">Cubo Ai Plus</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">Tapo C200</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
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
                <strong>ベビーモニターは「あると安心」なもの。なくても大丈夫です。</strong>
                <br />
                ワンルームで赤ちゃんのそばにいられるなら、急いで買う必要はありません。
                <br />
                別室で寝かせる場面が出てきたとき、改めて検討しても遅くないです。
                <br />
                迷ったら、まずは安いものから試してみてください。
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
                name="パナソニック ベビーモニター"
                asin="B07B9NBHQF"
                price="¥15,000〜"
              />
              <AmazonProductCard
                name="トリビュート ベビーモニター"
                asin="B0BW254GT5"
                price="¥12,000〜"
              />
              <AmazonProductCard
                name="Cubo Ai Plus"
                asin="B09YDRQKFK"
                price="¥35,000〜"
              />
              <AmazonProductCard
                name="Tapo C200"
                asin="B09N384TJ2"
                price="¥3,500〜"
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
              Wi-Fi接続型の製品はセキュリティ設定（パスワード変更等）を必ず行ってください。
              参考: 各メーカー公式サイト、マイベスト、家電批評
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
