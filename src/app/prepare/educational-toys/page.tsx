import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";

export const metadata = {
  title: "知育玩具の選びかた｜月齢別おすすめ",
  description:
    "月齢・年齢別のおすすめ知育玩具と選びかたのポイント。安全基準・素材・発達に合った玩具を整理。",
};

const selectionPoints = [
  {
    title: "月齢・発達に合っているか",
    detail: "対象月齢の表示を参考に。少し先の発達を見据えたものを選ぶと長く使えます。",
  },
  {
    title: "安全基準を満たしているか",
    detail: "STマーク（日本）、CEマーク（EU）を確認。口に入れても安全な塗料・素材かどうかも重要です。",
  },
  {
    title: "長く遊べるか",
    detail: "成長に合わせて遊びかたが変わるものがおすすめ。積み木は0歳で舐める→1歳で積む→2歳で見立て遊びと変化します。",
  },
  {
    title: "シンプルなものほど想像力を使う",
    detail: "ボタンを押すだけのおもちゃより、自分で動かし方を考えるおもちゃのほうが、遊びの幅が広がります。",
  },
];

const ageRecommendations = [
  {
    age: "0〜6ヶ月",
    color: "bg-pink-100 text-pink-700",
    toys: [
      { name: "オーボール", why: "軽くて握りやすい。振ると音が出るタイプも。最初のおもちゃに最適", asin: "B00NOFGO6S", price: "約1,000円" },
      { name: "布絵本", why: "カシャカシャ音やミラー付き。洗えるので衛生的。触感も楽しめる", asin: "B09BFPTP3S", price: "約1,500円" },
      { name: "メリー・モビール", why: "視覚の発達をサポート。音楽付きタイプは聴覚刺激にも", asin: "B07BFSS8GN", price: "約4,000〜8,000円" },
    ],
  },
  {
    age: "6〜12ヶ月",
    color: "bg-orange-100 text-orange-700",
    toys: [
      { name: "積み木（音いっぱいつみき等）", why: "握る・叩く・積むと段階的に遊べる。木製は手触りが良く長く使える", asin: "B00IYET1GI", price: "約3,000〜5,000円" },
      { name: "コップがさね", why: "重ねる・並べる・お風呂でも使える。色・大きさの概念が育つ", asin: "B003GX0DCA", price: "約1,000円" },
      { name: "ルーピング（ビーズコースター）", why: "指先の巧緻性を育てる。ビーズを動かすだけのシンプルさが良い", asin: "B000YDDF6O", price: "約2,000〜4,000円" },
      { name: "型はめパズル", why: "形の認識と手先の協応動作を育てる。最初は丸・三角・四角の3種で十分", asin: "B0B5GLLTB9", price: "約2,000〜3,000円" },
    ],
  },
  {
    age: "1〜2歳",
    color: "bg-green-100 text-green-700",
    toys: [
      { name: "クレヨン・お絵かきボード", why: "手で描く楽しさを知る。磁気ボードなら壁や床を汚さず安心", asin: "B0D36QFMWW", price: "約1,500〜3,000円" },
      { name: "おままごとセット", why: "ごっこ遊びで社会性と想像力が育つ。木製は質感が良く丈夫", asin: "B071LFFNHY", price: "約3,000〜5,000円" },
      { name: "シンプルなブロック（デュプロ等）", why: "組み立て・壊す・また作る。創造力と空間認識が育つ", asin: "B00NHQFA1I", price: "約3,000〜6,000円" },
      { name: "楽器（太鼓・木琴）", why: "叩くとリズム感が育つ。音の大小や高低の違いを体験できる", asin: "B01CHHMP5Q", price: "約2,000〜4,000円" },
    ],
  },
  {
    age: "2〜3歳",
    color: "bg-blue-100 text-blue-700",
    toys: [
      { name: "粘土（小麦粘土・シリコン粘土）", why: "こねる・ちぎる・形を作る。手先の発達と創造力を刺激", asin: "B0784JRFQ1", price: "約500〜1,500円" },
      { name: "はさみ・のり（安全タイプ）", why: "切る・貼るの動作で巧緻性がぐんと伸びる。3歳前後から", asin: "B001GR5UB0", price: "約500〜1,000円" },
      { name: "マグネットブロック（マグフォーマー等）", why: "磁石でくっつく楽しさ。平面→立体の理解が自然に身につく", asin: "B07MC6QGFL", price: "約4,000〜8,000円" },
      { name: "絵本", why: "語彙力・想像力・集中力の土台。年齢に合った絵本を繰り返し読むのが効果的", asin: "B0DGT5MX1T", price: "約800〜1,500円/冊" },
    ],
  },
];

const brands = [
  {
    name: "ボーネルンド",
    description: "知育玩具の定番ブランド。世界中から良質な遊び道具を厳選して提供。実店舗での遊び場（キドキド）も人気。",
    strength: "品質と安全性の高さ",
  },
  {
    name: "くもん出版",
    description: "学習系知育玩具に強い。ジグソーパズル、くもんのカード、知育ドリルなど段階的に学べるシリーズが充実。",
    strength: "段階的な学びの設計",
  },
  {
    name: "フィッシャープライス",
    description: "海外大手の幼児玩具ブランド。0歳向けが特に充実。カラフルで赤ちゃんの興味を引くデザイン。",
    strength: "0歳からの豊富なラインナップ",
  },
  {
    name: "エド・インター",
    description: "日本の木製知育玩具メーカー。温かみのある木のおもちゃが中心。価格も比較的手頃。",
    strength: "木製の温かみとコスパ",
  },
  {
    name: "レゴデュプロ",
    description: "レゴの1.5歳〜向けシリーズ。大きなブロックで誤飲の心配なし。通常レゴとの互換性もあり長く使える。",
    strength: "ブロック遊びの定番。成長後も使える",
  },
];

const storageTips = [
  {
    title: "ローテーションで「新鮮さ」を保つ",
    detail: "おもちゃを全部出さず、2〜3週間ごとに入れ替える。久しぶりに出したおもちゃは新鮮に感じ、集中して遊べます。",
  },
  {
    title: "子どもが自分で片づけられる仕組み",
    detail: "写真やイラストで「ここに入れる」とわかるようにする。低い棚やカゴを使い、子ども目線で取り出せる高さに。",
  },
  {
    title: "量を増やしすぎない",
    detail: "選択肢が多すぎると子どもは逆に遊べなくなります。「今の発達に合うもの」を数点出しておくのがベスト。",
  },
];

export default function EducationalToysPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">知育玩具</Badge>
              <Badge variant="secondary">比較ガイド</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              知育玩具の選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう迷わなくて大丈夫です。
              <br />
              月齢別のおすすめと、選ぶときのポイントを整理しました。
            </p>
          </div>

          {/* 1. 選びかたのポイント */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              選びかたのポイント
            </h2>
            <div className="space-y-3">
              {selectionPoints.map((point, i) => (
                <Card key={point.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{point.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{point.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 2. 月齢別おすすめ玩具 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              月齢別おすすめ玩具
            </h2>
            <div className="space-y-6">
              {ageRecommendations.map((group) => (
                <div key={group.age}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${group.color} border-0 text-xs font-bold`}>
                      {group.age}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {group.toys.map((toy) => (
                      <Card key={toy.name} className="border-border/50 shadow-none">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{toy.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                                {toy.why}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                価格目安: {toy.price}
                              </p>
                            </div>
                            <div className="md:w-48 shrink-0">
                              <AmazonProductCard
                                name={toy.name}
                                asin={toy.asin}
                                price={toy.price}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 価格は変動します。最新の価格はAmazonでご確認ください。
            </p>
          </section>

          {/* 3. 人気の知育玩具ブランド */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              人気の知育玩具ブランド
            </h2>
            <div className="space-y-3">
              {brands.map((brand) => (
                <Card key={brand.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">{brand.name}</h3>
                      <Badge variant="outline" className="text-xs shrink-0">{brand.strength}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{brand.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. おもちゃの管理・収納のコツ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📦</span>
              おもちゃの管理・収納のコツ
            </h2>
            <div className="space-y-3">
              {storageTips.map((tip, i) => (
                <Card key={tip.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-komorebi-warm/20 text-foreground text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{tip.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{tip.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>高いおもちゃ＝良いおもちゃ、ではありません。</strong>
                <br />
                ペットボトル、新聞紙、段ボール。身近なものが最高のおもちゃになります。
                <br />
                大切なのは、一緒に遊ぶ時間そのものです。
              </p>
            </CardContent>
          </Card>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              価格・仕様は2026年3月時点の情報です。実際の価格は販売店により異なります。
              おもちゃの対象月齢・安全基準は各メーカーの表示を必ずご確認ください。
              小さな部品のあるおもちゃは誤飲に注意し、必ず保護者の目の届く場所で遊ばせてください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/early-education" className={buttonVariants({ variant: "outline" })}>
              知育の基本ガイドを読む
            </Link>
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
