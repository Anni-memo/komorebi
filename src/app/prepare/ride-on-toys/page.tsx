import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "三輪車・手押し車の選びかた",
  description:
    "1歳頃から使える三輪車・手押し車・キックバイクを比較。iimo・ストライダー・BRIO・D-bikeの4製品を紹介。",
};

const whyConfusing = [
  "三輪車・手押し車・キックバイク…種類が違いすぎて比較しにくい",
  "「何歳から何を使えばいいか」の目安が分かりにくい",
  "室内用か屋外用かで選択肢が変わる",
];

const axes = [
  {
    name: "対象年齢（いつから使えるか）",
    why: "1歳前後から使えるものと、2歳以降向けのものがある。お子さまの発達段階に合わせて選ぶ",
  },
  {
    name: "使う場所（室内か屋外か）",
    why: "室内用は床を傷つけないタイヤ、屋外用は耐久性のあるタイヤが必要",
  },
  {
    name: "親のサポート（押し棒やガードの有無）",
    why: "まだ自分でこげない時期は、親が後ろから押せるハンドル付きが便利",
  },
  {
    name: "収納サイズ（折りたためるか）",
    why: "マンションや玄関が狭い場合、折りたたみ対応だと場所を取らない",
  },
  {
    name: "次のステップへの接続（自転車への移行）",
    why: "キックバイクはバランス感覚が身につき、自転車への移行がスムーズになると言われている",
  },
];

const products = [
  {
    name: "iimo トライシクル02",
    brand: "iimo",
    type: "コンパクト三輪車" as const,
    asin: "B07KNVGMZP",
    features: [
      "折りたたみ可能で玄関収納に便利",
      "取り外し可能な押し棒で親がコントロール",
      "着脱式ソフトガードで落下を防止",
      "シンプルでおしゃれなデザイン",
    ],
    bestFor: "1歳半頃から三輪車デビューしたい方、収納スペースが限られる方",
    notFor: "屋内で使いたい方、自転車への早期移行を考えている方",
    priceRange: "¥12,000〜16,000",
    scene: "1歳半でまだこげないけど、押し棒で公園までお散歩。折りたたんで玄関に収納",
  },
  {
    name: "ストライダー 12インチ スポーツモデル",
    brand: "ストライダー",
    type: "キックバイク" as const,
    asin: "B01MF9F0TG",
    features: [
      "ペダルなしで足で蹴って進むバランスバイク",
      "わずか3kgの超軽量で子どもが自分で扱える",
      "バランス感覚が身につき自転車への移行がスムーズ",
      "世界200万台以上の販売実績",
    ],
    bestFor: "2歳頃から、自転車への移行を見据えたい方",
    notFor: "1歳前半のお子さま、公道での使用（公道走行不可）",
    priceRange: "¥13,000〜16,000",
    scene: "公園で足で蹴ってスイスイ。3歳頃にはバランスが取れて、自転車デビューも早くなる",
  },
  {
    name: "BRIO 手押し車",
    brand: "BRIO",
    type: "木製・知育" as const,
    asin: "B000IZTXLA",
    features: [
      "スウェーデン製の木製おもちゃ。温かみのあるデザイン",
      "つかまり立ち〜よちよち歩きの時期にぴったり",
      "車輪の負荷を調整でき、歩くスピードをコントロール可能",
      "カゴ部分におもちゃを入れて運ぶ楽しさ",
    ],
    bestFor: "つかまり立ち期のお子さま、木のおもちゃが好きな方",
    notFor: "屋外で使いたい方、長期間使いたい方（歩行が安定すると卒業）",
    priceRange: "¥5,000〜7,000",
    scene: "リビングでつかまり立ちの練習。おもちゃを積んで押し歩きする姿がかわいい",
  },
  {
    name: "D-bike mini プラス",
    brand: "アイデス",
    type: "室内用・1歳から" as const,
    asin: "B075CV3RNQ",
    features: [
      "1歳の誕生日プレゼントの定番",
      "前輪2つ・後輪1つの安定設計で倒れにくい",
      "室内で使えるやわらかタイヤ",
      "サドルが低く、足が届きやすい",
    ],
    bestFor: "1歳のお誕生日プレゼントに、室内で体を動かしたい方",
    notFor: "2歳以降の活発なお子さま（小さくなる）、屋外使用",
    priceRange: "¥6,000〜8,000",
    scene: "1歳のお誕生日にプレゼント。リビングでまたがってトコトコ移動する姿に成長を感じる",
  },
];

const typeGuide = [
  {
    condition: "1歳半〜公園でのお散歩",
    recommendation: "iimo トライシクル02",
    reason: "押し棒付きで親がコントロール。折りたたみできて収納も楽",
  },
  {
    condition: "2歳〜自転車への準備",
    recommendation: "ストライダー 12インチ",
    reason: "バランス感覚が自然に身につく。自転車への移行がスムーズになる",
  },
  {
    condition: "つかまり立ち期・室内",
    recommendation: "BRIO 手押し車",
    reason: "木のぬくもりが心地よい。歩行の練習にもなるロングセラー",
  },
  {
    condition: "1歳の誕生日プレゼント",
    recommendation: "D-bike mini プラス",
    reason: "室内で安全に遊べる。1歳児の体格にぴったりサイズ",
  },
];

export default function RideOnToysPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">あそび</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              三輪車・手押し車の選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              1歳頃から楽しめる乗り物おもちゃ。三輪車・キックバイク・手押し車の特徴を整理しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              乗り物おもちゃ、なぜ迷いやすいのか
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
                  <strong>「お子さまの年齢」と「使う場所」</strong>の2つで絞れます。
                  室内なら手押し車かD-bike、屋外なら三輪車かキックバイク。
                  どれも体の発達によい遊びなので、お子さまが楽しそうなものを選べば正解です。
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

          {/* 3. 商品別の使用感 */}
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
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. タイプ別おすすめ */}
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

          {/* 5. 比較表 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">比較表</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">商品</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">対象年齢</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">使う場所</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">押し棒</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">折りたたみ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">自転車移行</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">iimo トライシクル02</td>
                    <td className="py-2 px-2 text-foreground">1.5歳〜</td>
                    <td className="py-2 px-2 text-foreground">屋外</td>
                    <td className="py-2 px-2 text-foreground">◎ あり</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">ストライダー 12インチ</td>
                    <td className="py-2 px-2 text-foreground">2歳〜</td>
                    <td className="py-2 px-2 text-foreground">屋外</td>
                    <td className="py-2 px-2 text-foreground">× なし</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">BRIO 手押し車</td>
                    <td className="py-2 px-2 text-foreground">9ヶ月〜</td>
                    <td className="py-2 px-2 text-foreground">室内</td>
                    <td className="py-2 px-2 text-foreground">− 手押し式</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">D-bike mini</td>
                    <td className="py-2 px-2 text-foreground">1歳〜</td>
                    <td className="py-2 px-2 text-foreground">室内</td>
                    <td className="py-2 px-2 text-foreground">× なし</td>
                    <td className="py-2 px-2 text-foreground">×</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>乗り物おもちゃは、お子さまが「楽しい！」と感じることが一番大切です。</strong>
                <br />
                どれが正解ということはありません。
                <br />
                お子さまの興味と年齢に合ったものを選んであげれば、自然と体の使い方を覚えていきます。
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
                name="iimo トライシクル02"
                asin="B07KNVGMZP"
                price="¥12,000〜"
              />
              <AmazonProductCard
                name="ストライダー 12インチ スポーツモデル"
                asin="B01MF9F0TG"
                price="¥13,000〜"
              />
              <AmazonProductCard
                name="BRIO 手押し車"
                asin="B000IZTXLA"
                price="¥5,000〜"
              />
              <AmazonProductCard
                name="D-bike mini プラス"
                asin="B075CV3RNQ"
                price="¥6,000〜"
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
              価格・仕様は2026年時点の情報です。実際の価格は販売店により異なります。
              キックバイク（ストライダー等）は公道での走行が禁止されています。
              必ず公園や広場など安全な場所で、ヘルメットを着用してお使いください。
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
