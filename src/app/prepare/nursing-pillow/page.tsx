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
  title: "授乳クッションの選びかた",
  description:
    "授乳クッション、どれを選べばいい？厚み・硬さ・形状・多用途性を整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const whyConfusing = [
  "C型・U型・三日月型など形状の違いがわかりにくい",
  "「へたりにくい」と書いてあっても、実際にどのくらい持つのか見えない",
  "妊娠中の抱き枕兼用タイプと授乳専用タイプ、どちらが正解かわからない",
  "価格差が大きく（2,000〜7,000円）、高い方が本当に良いのか判断しにくい",
];

const axes = [
  {
    name: "厚み・高さ",
    why: "赤ちゃんの位置を胸の高さに合わせるための最重要ポイント。薄いと腕や肩に負担がかかる",
  },
  {
    name: "硬さ（へたりにくさ）",
    why: "柔らかすぎると赤ちゃんが沈み込み、姿勢が崩れる。毎日使うものなので耐久性も重要",
  },
  {
    name: "カバーの洗いやすさ",
    why: "母乳やミルクの吐き戻しは日常。カバーが外せて洗濯機で洗えるかどうかで衛生面が変わる",
  },
  {
    name: "多用途性",
    why: "妊娠中の抱き枕、お座りサポート、寝かしつけ等に使えると長くコスパが良い",
  },
  {
    name: "形状（C型・U型・三日月型）",
    why: "体型や授乳スタイルに合う合わないがある。C型は装着しやすく、U型は安定感がある",
  },
  {
    name: "価格帯",
    why: "2,000円台〜7,000円台まで幅がある。使う期間と用途の広さで費用対効果が変わる",
  },
];

const products = [
  {
    name: "エールベベ ギュット4WAY マシュマロ",
    brand: "エールベベ（カーメイト）",
    type: "4WAY多用途型" as const,
    asin: "B0BXNF98WP",
    officialUrl: "https://www.carmate.co.jp/ailebebe/",
    features: [
      "授乳クッション・抱き枕・お座りサポート・読書クッションの4通りに変形",
      "厚みがしっかりあり、赤ちゃんが胸の高さに来やすい",
      "マシュマロのような弾力で体にフィットしやすい",
      "カバーは取り外して洗濯機で丸洗いOK",
    ],
    bestFor: "妊娠中から産後まで長く使いたい方、多用途に活用したい方",
    notFor: "コンパクトさを求める方（4WAYのため大きめ）",
    priceRange: "約5,500〜6,500円",
    scene:
      "妊娠後期は抱き枕として寝苦しさを軽減。産後は授乳クッションに変形し、腕や肩が疲れにくく夜間授乳でも楽な姿勢を保てる。お座り期にはサポートクッションとしても活躍",
  },
  {
    name: "サンデシカ 妊娠中から使える抱きまくら",
    brand: "サンデシカ",
    type: "抱き枕兼用型" as const,
    asin: "B07V31JQJN",
    officialUrl: "https://www.sandesica.co.jp/",
    features: [
      "三日月型の大きなカーブで妊娠中の横向き寝をしっかりサポート",
      "スナップボタンでC型授乳クッションに変形可能",
      "中綿の量を調整できるジッパー付き",
      "洗濯機で丸洗いOK（ネット使用）",
    ],
    bestFor: "妊娠中の睡眠を改善したい方、1つで長期間使いたい方",
    notFor: "コンパクトに収納したい方、授乳専用の硬さを求める方",
    priceRange: "約4,500〜5,500円",
    scene:
      "妊娠中期からお腹を支える抱き枕として毎晩使える。産後はスナップを留めて授乳クッションに。中綿量の調整で好みの硬さに変えられるので、体型や使い方に合わせてカスタマイズ可能",
  },
  {
    name: "dacco 授乳用クッション",
    brand: "dacco（オオサキメディカル）",
    type: "産院採用・硬め型" as const,
    asin: "B004OR5GE2",
    officialUrl: "https://www.osaki-inc.co.jp/",
    features: [
      "産院での採用実績が多く、助産師からの評価が高い",
      "硬めのしっかりした中綿で赤ちゃんが沈み込みにくい",
      "へたりにくく、長期間使っても高さを維持しやすい",
      "カバーは取り外して洗濯OK",
    ],
    bestFor: "産院で使い慣れた方、へたりにくさを最重視する方",
    notFor: "柔らかい感触が好みの方、多用途に使いたい方",
    priceRange: "約3,500〜4,500円",
    scene:
      "入院中に病院で使って気に入り、退院後も同じものを買う方が多い。硬めなので赤ちゃんの位置が安定し、授乳姿勢が崩れにくい。吐き戻しがあってもカバーをすぐ外して洗えて衛生的",
  },
  {
    name: "西松屋 ふんわり授乳クッション",
    brand: "西松屋（PB商品）",
    type: "コスパ重視型" as const,
    asin: "",
    officialUrl: "https://www.24028.jp/",
    features: [
      "2,000円前後で購入できる圧倒的なコストパフォーマンス",
      "ふんわり柔らかい肌触り",
      "シンプルなC型で使い方がわかりやすい",
      "店舗数が多く、実物を見て買える",
    ],
    bestFor: "コスパ重視の方、まず試してみたい方、近くに西松屋がある方",
    notFor: "へたりにくさを重視する方（柔らかめなのでへたりやすい傾向）",
    priceRange: "約1,800〜2,500円",
    scene:
      "「まずは安く試したい」という方に最適。柔らかめなので使い始めは心地よい。へたってきたら買い替えても負担が少ない価格帯。全国の西松屋店舗で手に取って確認できるので、ネット購入が不安な方にも安心",
  },
];

const typeGuide = [
  {
    condition: "妊娠中から産後まで長く多用途に使いたい",
    recommendation: "エールベベ ギュット4WAY マシュマロ",
    reason:
      "4通りの使い方で妊娠中〜お座り期まで活躍。1つで済むのでトータルコスパも良い",
  },
  {
    condition: "へたりにくさ・授乳姿勢の安定感を重視",
    recommendation: "dacco 授乳用クッション",
    reason:
      "産院採用の実績。硬めの中綿で赤ちゃんが沈み込まず、長期間使っても高さを維持",
  },
  {
    condition: "コスパ重視、まず試してみたい",
    recommendation: "西松屋 ふんわり授乳クッション",
    reason:
      "2,000円前後で購入可能。へたったら買い替えても負担が少ない。実店舗で確認できる",
  },
  {
    condition: "妊娠中の睡眠改善も兼ねたい",
    recommendation: "サンデシカ 妊娠中から使える抱きまくら",
    reason:
      "三日月型の大きなカーブで横向き寝をサポート。スナップで授乳クッションにも変形",
  },
];

export default function NursingPillowPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "授乳クッションの選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">授乳グッズ</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              授乳クッションの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              人気の4製品に絞って、生活シーン別に整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "why-confusing", label: "授乳クッション、なぜ迷いやすいのか" },
            { id: "selection-axes", label: "選ぶときに見るべき6つの軸" },
            { id: "lifestyle-translation", label: "スペックを「暮らしのことば」に翻訳すると" },
            { id: "product-reviews", label: "まずはこの4つを見れば十分です" },
            { id: "type-guide", label: "あなたの状況に合わせて選ぶなら" },
            { id: "comparison-table", label: "比較表" },
            { id: "where-to-buy", label: "購入できる場所" },
          ]} />

          {/* 1. なぜ迷いやすいのか */}
          <section id="why-confusing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              授乳クッション、なぜ迷いやすいのか
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {whyConfusing.map((reason) => (
                    <li
                      key={reason}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-komorebi-warm mt-0.5 shrink-0">
                        &#9679;
                      </span>
                      {reason}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground mt-4 leading-relaxed">
                  結論から言うと、
                  <strong>
                    授乳クッションは「なくても授乳はできるけど、あると体の負担がまるで違う」アイテム
                  </strong>
                  です。
                  特に夜間授乳が続く時期は、腕や肩の疲労を軽減してくれる心強い存在になります。
                  ここでは「自分の体型や使い方に合うもの」を見つけやすくするために、比較軸を整理しました。
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
                        <h3 className="font-semibold text-foreground text-sm">
                          {axis.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {axis.why}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. 使用感まとめ（生活動線翻訳） */}
          <section id="lifestyle-translation" className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  スペックを「暮らしのことば」に翻訳すると
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        カタログの言葉
                      </p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>・高さ調整可能</li>
                        <li>・カバー取り外し可能</li>
                        <li>・4WAY対応</li>
                        <li>・硬めの中綿使用</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        暮らしで言うと
                      </p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>
                          ・腕や肩が疲れにくく、夜間授乳でも楽な姿勢を保てる
                        </li>
                        <li>・吐き戻しがあってもすぐ洗えて衛生的</li>
                        <li>
                          ・妊娠中から卒乳後まで買い替えなしで使い続けられる
                        </li>
                        <li>
                          ・赤ちゃんが沈み込まず、授乳中に何度も位置を直さなくて済む
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 4. 商品別の使用感 */}
          <section id="product-reviews" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              まずはこの4つを見れば十分です
            </h2>
            <div className="space-y-4">
              {products.map((product) => (
                <Card
                  key={product.name}
                  className="border-border/50 shadow-none"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-base">
                        {product.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {product.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            特徴
                          </p>
                          <ul className="space-y-1">
                            {product.features.map((f) => (
                              <li
                                key={f}
                                className="text-sm text-foreground flex items-start gap-2"
                              >
                                <span className="text-primary mt-0.5 shrink-0">
                                  &#10003;
                                </span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            <strong className="text-foreground">
                              生活シーンで言うと:
                            </strong>
                          </p>
                          <p className="text-sm text-foreground">
                            {product.scene}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">
                              向いている方:{" "}
                            </span>
                            <span className="text-foreground">
                              {product.bestFor}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              合わないかも:{" "}
                            </span>
                            <span className="text-foreground">
                              {product.notFor}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              価格帯:{" "}
                            </span>
                            <span className="text-foreground">
                              {product.priceRange}
                            </span>
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
                <Card
                  key={guide.condition}
                  className="border-border/50 shadow-none"
                >
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {guide.condition}
                    </p>
                    <p className="text-sm font-semibold text-primary mb-1">
                      → {guide.recommendation}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {guide.reason}
                    </p>
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
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">
                      商品
                    </th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                      厚み・高さ
                    </th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                      硬さ
                    </th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                      洗いやすさ
                    </th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                      多用途性
                    </th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">
                      コスパ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">
                      エールベベ ギュット4WAY
                    </td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">
                      サンデシカ 抱きまくら
                    </td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground font-medium">
                      dacco 授乳用クッション
                    </td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">◎</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-foreground font-medium">
                      西松屋 ふんわり授乳クッション
                    </td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">△</td>
                    <td className="py-2 px-2 text-foreground">○</td>
                    <td className="py-2 px-2 text-foreground">△</td>
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
                <strong>
                  授乳クッションがなくても、授乳はできます。
                </strong>
                <br />
                でも「あってよかった」と感じるママがとても多いアイテムです。
                <br />
                特に夜間授乳が続く時期は、腕と肩の疲労が全然違います。
                <br />
                迷ったらまず手頃なものから試して、合わなければ買い替えれば大丈夫です。
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
                name="エールベベ ギュット4WAY"
                asin="B0BXNF98WP"
                price="¥5,500〜"
                officialUrl="https://www.carmate.co.jp/ailebebe/"
              />
              <AmazonProductCard
                name="サンデシカ 抱きまくら"
                asin="B07V31JQJN"
                price="¥4,400〜"
                officialUrl="https://www.sandesica.co.jp/"
              />
              <AmazonProductCard
                name="dacco 授乳用クッション"
                asin="B004OR5GE2"
                price="¥2,800〜"
                officialUrl="https://www.osaki-inc.co.jp/"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="授乳クッションの選びかた" path="/prepare/nursing-pillow" />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/prepare"
              className={buttonVariants({ variant: "outline" })}
            >
              準備するトップに戻る
            </Link>
            <Link
              href="/concierge"
              className={buttonVariants({ variant: "ghost" })}
            >
              AIに他のおすすめを聞く
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
