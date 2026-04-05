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
  title: "ベビーカーの選びかた",
  description:
    "種類が多くて迷いやすいベビーカーを、使い方に合わせて整理しました。Combi・Aprica・Cybex・Pigeonの4製品を比較。",
};

const whyConfusing = [
  "A型・B型・AB型・三輪…種類が多すぎる",
  "実際に使う場面をイメージしにくい",
  "「高ければよい」とも限らない",
];

const axes = [
  {
    name: "対象月齢（いつから使えるか）",
    why: "A型は生後1ヶ月から、B型は6〜7ヶ月から。使い始めの時期で選択肢が変わる",
  },
  {
    name: "重さ（片手で持てるか）",
    why: "電車移動や階段が多いなら5kg以下が理想。車移動中心なら7kg台でも問題なし",
  },
  {
    name: "折りたたみ（電車・車での収納）",
    why: "片手でワンタッチで畳めるか。電車・バス利用時や玄関収納で効いてくる",
  },
  {
    name: "リクライニング角度（新生児対応）",
    why: "新生児期はほぼフラットまで倒せることが必須。月齢が上がれば起こして使う",
  },
  {
    name: "走行性（段差・砂利への強さ）",
    why: "タイヤの大きさとサスペンションの有無で決まる。歩道の段差が多い地域では重要",
  },
];

const products = [
  {
    name: "Combi スゴカルSwitch エッグショック",
    brand: "Combi",
    type: "A型" as const,
    asin: "B0DGHP7XK5",
    officialUrl: "https://www.combi.co.jp/",
    features: [
      "両対面式で対面・背面をワンタッチ切替",
      "軽量5.0kgで片手で持ち上げられる",
      "エッグショック（卵を落としても割れない衝撃吸収素材）搭載",
      "ハンドル切替で小回りが利く",
    ],
    bestFor: "新生児から使いたい方、電車移動が多い方",
    notFor: "荒れた路面を頻繁に走る方",
    priceRange: "¥50,000〜65,000",
    scene: "駅のエレベーターで片手で畳みたい。改札で焦りたくない",
  },
  {
    name: "Aprica ラクーナクッション Free",
    brand: "Aprica",
    type: "A型" as const,
    asin: "B0DGHKXJ3R",
    officialUrl: "https://www.aprica.jp/",
    features: [
      "オート4キャスで対面・背面どちらでも小回りが利く",
      "ゆれぐらガードで振動を軽減",
      "大容量バスケットで買い物帰りも安心",
      "ダブル台形シートで赤ちゃんの姿勢が安定",
    ],
    bestFor: "振動が気になる方、買い物で荷物が多い方",
    notFor: "狭いエレベーターが多い環境、とにかく軽さ重視の方",
    priceRange: "¥55,000〜68,000",
    scene: "スーパーの帰りに荷物をカゴにどっさり載せたい",
  },
  {
    name: "Cybex LIBELLE",
    brand: "Cybex",
    type: "B型" as const,
    asin: "B0B5T9HZSJ",
    officialUrl: "https://cybex-online.com/ja-jp",
    features: [
      "超コンパクト折りたたみで機内持ち込み可能",
      "折りたたむと自転車カゴに入るサイズ",
      "6ヶ月から使えるセカンドカー向き",
      "軽量で持ち運びやすい",
    ],
    bestFor: "旅行・帰省が多い方、セカンドカーとして",
    notFor: "新生児期から使いたい方、荷物をたくさん載せたい方",
    priceRange: "¥28,000〜35,000",
    scene: "帰省の新幹線で座席の足元に収まる",
  },
  {
    name: "Pigeon Runfee RB2",
    brand: "Pigeon",
    type: "A型" as const,
    asin: "B0DGHL9YLQ",
    officialUrl: "https://products.pigeon.co.jp/",
    features: [
      "シングルタイヤで段差をスムーズに乗り越える",
      "座面が広めで赤ちゃんがゆったり座れる",
      "押しやすさに特化した設計",
      "ワンタッチ開閉対応、折りたたみ時も自立する",
    ],
    bestFor: "歩道の段差が多い地域にお住まいの方、長時間の散歩が多い方",
    notFor: "とにかくコンパクトさ重視の方",
    priceRange: "¥45,000〜60,000",
    scene: "近所の歩道の段差をガタガタせずスムーズに越えたい",
  },
];

const typeGuide = [
  {
    condition: "電車移動が多い",
    recommendation: "Combi スゴカルSwitch",
    reason: "5.0kgで片手で持てる。ワンタッチ開閉で電車の乗り降りもスムーズ",
  },
  {
    condition: "買い物メイン",
    recommendation: "Aprica ラクーナクッション Free",
    reason: "大容量バスケットで荷物がたっぷり入る。振動も抑えて赤ちゃんが寝ていても安心",
  },
  {
    condition: "旅行・セカンドカー",
    recommendation: "Cybex LIBELLE",
    reason: "超コンパクト折りたたみで機内持ち込み可能。帰省時にも場所を取らない",
  },
  {
    condition: "散歩・段差の多い地域",
    recommendation: "Pigeon Runfee RB2",
    reason: "シングルタイヤで段差をスムーズに乗り越える。押し心地が良く長時間でも疲れにくい",
  },
];

export default function StrollerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "ベビーカーの選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">比較</Badge>
              <Badge variant="secondary">外出</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビーカーの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              種類が多くて迷いやすいベビーカーを、使い方に合わせて整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "ベビーカー、なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき5つの軸" },
            { id: "product-reviews", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビーカー、なぜ迷いやすいのか
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
                  結論から言うと、<strong>日本で手に入る主要ベビーカーはどれも安全基準を満たしています</strong>。
                  大きな失敗はありません。
                  「自分の生活動線に合うかどうか」で選ぶと、迷いが減ります。
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

          {/* 3. 商品別の使用感 */}
          <section id="product-reviews" className="mb-8">
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
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">対象月齢</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">重さ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">折りたたみ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">リクライニング</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">走行性</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">Combi スゴカルSwitch</td>
                    <td className="py-2 px-2 text-foreground">1ヶ月〜</td>
                    <td className="py-2 px-2 text-foreground">◎ 5.0kg</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">Aprica ラクーナ Free</td>
                    <td className="py-2 px-2 text-foreground">1ヶ月〜</td>
                    <td className="py-2 px-2 text-foreground">○ 5.5kg</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">Cybex LIBELLE</td>
                    <td className="py-2 px-2 text-foreground">6ヶ月〜</td>
                    <td className="py-2 px-2 text-foreground">◎ 6.2kg</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">Pigeon Runfee RB2</td>
                    <td className="py-2 px-2 text-foreground">1ヶ月〜</td>
                    <td className="py-2 px-2 text-foreground">○ 5.6kg</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
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
                <strong>どのベビーカーも、基本的な安全基準を満たしています。</strong>
                <br />
                迷ったらまず試乗してみると、押し心地の違いが体感できます。
                <br />
                合わなければ買い替えたり、レンタルで試すこともできます。
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
                name="Combi スゴカルSwitch エッグショック"
                asin="B0DGHP7XK5"
                price="¥50,000〜"
                officialUrl="https://www.combi.co.jp/"
              />
              <AmazonProductCard
                name="Aprica ラクーナクッション Free"
                asin="B0DGHKXJ3R"
                price="¥55,000〜"
                officialUrl="https://www.aprica.jp/"
              />
              <AmazonProductCard
                name="Cybex LIBELLE"
                asin="B0B5T9HZSJ"
                price="¥28,000〜"
                officialUrl="https://cybex-online.com/ja-jp"
              />
              <AmazonProductCard
                name="Pigeon Runfee RB2"
                asin="B0DGHL9YLQ"
                price="¥45,000〜"
                officialUrl="https://products.pigeon.co.jp/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="ベビーカーの選びかた" path="/prepare/stroller" />

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
