import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "ベビー服・肌着の選びかた｜種類・枚数・季節別ガイド",
  description:
    "短肌着、コンビ肌着、ボディ肌着、ツーウェイオール...種類が多くて迷いやすいベビー服。季節別の組み合わせと必要枚数を、わかりやすく整理しました。",
};

const whyConfusing = [
  "種類が多い（短肌着、長肌着、コンビ肌着、ボディ肌着、ツーウェイオール...）",
  "季節によって組み合わせが違う",
  "「何枚必要か」が情報源によって違う",
  "サイズの選び方がわからない",
];

const clothingTypes = [
  {
    name: "短肌着（たんはだぎ）",
    features: "最も基本的な肌着。丈は腰まで。前開きで紐を結んで着せる。",
    when: "新生児〜3ヶ月。全季節の基本",
    count: "5〜6枚",
  },
  {
    name: "長肌着（ながはだぎ）",
    features: "短肌着の丈が長いバージョン。足先まで覆う。裾が開いているのでおむつ替えが楽。",
    when: "新生児期のみ。秋冬向け",
    count: "2〜3枚（なくてもOK。コンビ肌着で代用可）",
  },
  {
    name: "コンビ肌着",
    features: "股下にスナップボタンがあり、足をバタバタしてもはだけない。短肌着の上に重ねて使う。",
    when: "新生児〜6ヶ月。全季節",
    count: "5〜6枚",
  },
  {
    name: "ボディ肌着（ロンパース型）",
    features: "頭からかぶるタイプ。股下スナップでおむつ替え可能。1枚でサマになる。",
    when: "首すわり後（3〜4ヶ月）〜",
    count: "3〜5枚（先に買わなくてOK）",
  },
  {
    name: "ツーウェイオール",
    features: "股下のスナップの留め方で、ドレスオール（筒型）にもカバーオール（足分かれ）にもなる万能ウェア。",
    when: "新生児〜6ヶ月。外出着兼用",
    count: "2〜3枚",
  },
  {
    name: "カバーオール",
    features: "全身を覆うつなぎ型。足先までカバーするものもある。外出着として。",
    when: "2ヶ月頃〜。外出用",
    count: "2〜3枚",
  },
  {
    name: "ベスト",
    features: "肌着やウェアの上から羽織って体温調節。脱ぎ着が簡単。",
    when: "秋冬。室内外の温度差対策に",
    count: "1〜2枚",
  },
];

const seasonGuides = [
  {
    season: "春生まれ（3〜5月）",
    indoor: "短肌着 ＋ コンビ肌着",
    outdoor: "＋ ツーウェイオール",
    tips: "朝晩の寒暖差が大きい時期。薄手の上着やベストを1枚用意しておくと安心。日中は暖かくても、夕方から冷え込むことがあります。",
  },
  {
    season: "夏生まれ（6〜8月）",
    indoor: "短肌着1枚 or コンビ肌着1枚",
    outdoor: "＋ 薄手のツーウェイオール",
    tips: "エアコンの冷え対策におくるみやガーゼケットを。汗をかきやすいので着替えを多めに用意。室内では肌着1枚で過ごすことが多い季節です。",
  },
  {
    season: "秋生まれ（9〜11月）",
    indoor: "短肌着 ＋ コンビ肌着",
    outdoor: "＋ ツーウェイオール ＋ ベスト",
    tips: "生後1〜2ヶ月で冬に入るため、厚手の肌着やアウターを少しずつ追加。秋口は春と同じ組み合わせで、寒くなったら重ね着で調整します。",
  },
  {
    season: "冬生まれ（12〜2月）",
    indoor: "短肌着 ＋ コンビ肌着 ＋ ツーウェイオール",
    outdoor: "＋ カバーオール ＋ ベスト or アウター",
    tips: "室内は暖房で暖かいので着せすぎに注意。背中に手を入れて汗をかいていないかチェック。汗をかいていたら1枚減らしましょう。",
  },
];

const quantityTable = [
  { item: "短肌着", min: "4枚", recommended: "5〜6枚", note: "毎日洗濯なら4枚で足りる" },
  { item: "コンビ肌着", min: "4枚", recommended: "5〜6枚", note: "長肌着より使い勝手がよい" },
  { item: "長肌着", min: "0枚", recommended: "2〜3枚", note: "なくてもOK。コンビ肌着で代用可" },
  { item: "ツーウェイオール", min: "2枚", recommended: "3〜4枚", note: "外出着兼用" },
  { item: "ボディ肌着", min: "0枚", recommended: "3〜5枚", note: "首すわり後から。先に買わなくてOK" },
  { item: "カバーオール", min: "1枚", recommended: "2〜3枚", note: "外出用" },
  { item: "ベスト", min: "0〜1枚", recommended: "1〜2枚", note: "秋冬生まれは用意" },
];

const sizeGuide = [
  { size: "50", age: "新生児〜（身長50cm前後）" },
  { size: "50-60", age: "新生児〜3ヶ月" },
  { size: "60", age: "3ヶ月〜" },
  { size: "70", age: "6ヶ月〜" },
];

const commonMistakes = [
  {
    mistake: "買いすぎてしまう",
    solution: "最初は最低枚数で揃えて、足りなければ後から追加。ネット通販なら翌日届くことも多い",
  },
  {
    mistake: "大きめサイズを選んでしまう",
    solution: "新生児期に大きすぎると紐がゆるんだり、はだけやすくなる。50-60サイズを基本に",
  },
  {
    mistake: "季節を考えずに買う",
    solution: "生まれ月だけでなく、生後1〜2ヶ月後の気候も考慮。秋生まれなら冬支度も少し",
  },
  {
    mistake: "長肌着を大量購入してしまう",
    solution: "裾が分かれているコンビ肌着の方が、足をバタバタし始めても使い続けられる",
  },
];

const materials = [
  {
    name: "ガーゼ",
    features: "通気性・吸水性に優れ、乾きやすい",
    season: "夏向き",
    rating: "通気性◎",
  },
  {
    name: "フライス",
    features: "伸縮性が良く、やわらかい肌触り。綿100%のリブ編み",
    season: "通年OK",
    rating: "伸縮性◎",
  },
  {
    name: "天竺（てんじく）",
    features: "Tシャツと同じ薄手の編み方。さらっとした着心地",
    season: "春夏向き",
    rating: "軽さ◎",
  },
  {
    name: "スムース",
    features: "フライスより厚みがあり、なめらかな肌触り",
    season: "秋冬向き",
    rating: "保温性◎",
  },
  {
    name: "パイル",
    features: "タオルのような生地。厚手でふんわり",
    season: "冬向き",
    rating: "あたたかさ◎",
  },
];

export default function BabyClothingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">学ぶ</Badge>
              <Badge variant="secondary">ベビー服・肌着</Badge>
              <Badge variant="secondary">出産準備</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ベビー服・肌着の選びかた
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              種類が多くて迷いやすいベビー服。
              <br />
              季節別の組み合わせと必要枚数を、このページ1つで整理しました。
            </p>
          </div>

          {/* 1. なぜ迷いやすいのか */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              ベビー服、なぜ迷いやすいのか
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
                  ベビー服は種類が多いうえに、季節や成長で必要なものが変わります。
                  でも<strong>基本の考え方はシンプル</strong>です。
                  このページで整理していきましょう。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 肌着の種類を整理 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              肌着・ウェアの種類を整理
            </h2>
            <div className="space-y-3">
              {clothingTypes.map((type) => (
                <Card key={type.name} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground mb-3">{type.features}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-muted/30 rounded-lg p-2">
                        <span className="text-muted-foreground">使う時期: </span>
                        <span className="text-foreground">{type.when}</span>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-2">
                        <span className="text-muted-foreground">目安枚数: </span>
                        <span className="text-foreground font-medium">{type.count}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. 季節別の組み合わせガイド */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-2">
              季節別の組み合わせガイド
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              生まれ月によって基本の組み合わせが変わります。最も大切なセクションです。
            </p>
            <div className="space-y-4">
              {seasonGuides.map((guide) => (
                <Card key={guide.season} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{guide.season}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">室内</p>
                          <p className="text-sm text-foreground">{guide.indoor}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">外出</p>
                          <p className="text-sm text-foreground">{guide.outdoor}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5 shrink-0">&#9432;</span>
                        <p className="text-muted-foreground">{guide.tips}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. 必要枚数まとめ表 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              必要枚数まとめ
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">アイテム</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">最低枚数</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">おすすめ</th>
                    <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">備考</th>
                  </tr>
                </thead>
                <tbody>
                  {quantityTable.map((row, i) => (
                    <tr key={row.item} className={i < quantityTable.length - 1 ? "border-b border-border/50" : ""}>
                      <td className="py-2 pr-4 text-foreground font-medium">{row.item}</td>
                      <td className="py-2 px-2 text-foreground">{row.min}</td>
                      <td className="py-2 px-2 text-foreground">{row.recommended}</td>
                      <td className="py-2 px-2 text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              吐き戻しや汗で1日3回ほど着替えることも。洗濯頻度に合わせて調整してください。
            </p>
          </section>

          {/* 5. サイズの選び方 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              サイズの選び方
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">サイズ</th>
                        <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">目安</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map((row, i) => (
                        <tr key={row.size} className={i < sizeGuide.length - 1 ? "border-b border-border/50" : ""}>
                          <td className="py-2 pr-4 text-foreground font-medium">{row.size}</td>
                          <td className="py-2 px-2 text-foreground">{row.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    新生児用は<strong className="text-foreground">50-60サイズ</strong>を基本に選ぶ
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    「50-70」のようなフリーサイズは長く使えて便利
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    すぐ大きくなるので、同じサイズを大量に買いすぎない
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 6. よくある失敗と対策 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              よくある失敗と対策
            </h2>
            <div className="space-y-3">
              {commonMistakes.map((item) => (
                <Card key={item.mistake} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm font-semibold text-foreground mb-1">{item.mistake}</p>
                    <p className="text-sm text-muted-foreground">
                      → {item.solution}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 7. 素材の選び方 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-2">
              素材の選び方
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              赤ちゃんの肌着は綿100%が基本。同じ綿でも編み方で特徴が異なります。
            </p>
            <div className="space-y-3">
              {materials.map((mat) => (
                <Card key={mat.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{mat.name}</h3>
                          <Badge variant="outline" className="text-xs">{mat.season}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{mat.features}</p>
                      </div>
                      <span className="text-xs text-primary font-medium shrink-0">{mat.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 8. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>最初から完璧に揃えなくて大丈夫です。</strong>
                <br />
                必要になったときに追加すれば十分です。
                <br />
                赤ちゃんはすぐに大きくなるので、最初は最低枚数から始めて、
                <br />
                足りないと感じたら買い足す。それがいちばん無駄のない方法です。
              </p>
            </CardContent>
          </Card>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              本ページの情報は2026年3月時点の一般的な目安です。赤ちゃんの体型や成長速度には個人差があります。
              必要枚数は洗濯頻度や生活スタイルによっても変わります。
              肌トラブルが気になる場合は、小児科や助産師にご相談ください。
            </p>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              参考: ミキハウス 妊娠・出産・子育てマガジン、アカチャンホンポ、たまひよSHOP、エンジェリーベ、ユニクロ ベビー肌着ガイド
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn" className={buttonVariants({ variant: "outline" })}>
              学ぶトップに戻る
            </Link>
            <Link href="/concierge" className={buttonVariants({ variant: "ghost" })}>
              AIに相談する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
