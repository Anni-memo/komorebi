import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { PdfDownloadSection } from "@/components/pdf-download-section";

export const metadata = {
  title: "妊娠中の栄養ガイド｜必要な栄養素・おすすめ食材・レシピ例 | こもれび",
  description:
    "妊娠中に必要な10の栄養素を厚生労働省の基準に基づいて解説。葉酸・鉄分・カルシウム・DHAなど、推奨摂取量・食材・簡単レシピ例・妊娠期別のポイントまで。",
};

const nutrients = [
  {
    name: "葉酸（ビタミンB9）",
    emoji: "🥬",
    color: "bg-green-100 text-green-700",
    amount: "480μg/日 ＋ サプリ400μg（初期）",
    timing: "妊娠1か月前〜初期が最重要",
    role: "胎児の脳・脊髄の発達に不可欠。細胞分裂・DNA合成に関与",
    risk: "不足すると神経管閉鎖障害（二分脊椎、無脳症）のリスクが上昇",
    foods: ["ほうれん草", "ブロッコリー", "モロヘイヤ", "枝豆", "納豆", "いちご"],
    recipes: [
      "ほうれん草と卵のスープ（加熱は短時間で）",
      "枝豆ごはん",
      "ブロッコリーの温サラダ",
    ],
    tip: "水溶性で熱に弱いため、蒸す・短時間加熱が効果的。妊娠初期はサプリメントの併用が推奨されています。",
  },
  {
    name: "鉄分",
    emoji: "🥩",
    color: "bg-red-100 text-red-700",
    amount: "初期 9.0mg/日 → 中後期 16.0mg/日",
    timing: "妊娠中期〜後期に需要が急増",
    role: "赤血球のヘモグロビンの材料。母体と胎児への酸素運搬に不可欠",
    risk: "不足すると鉄欠乏性貧血（疲労感、動悸、息切れ）、早産リスク上昇",
    foods: ["赤身の牛肉", "カツオ", "あさり", "しじみ", "小松菜", "納豆", "ひじき"],
    recipes: [
      "牛肉とピーマンの炒め物",
      "あさりの味噌汁",
      "小松菜と油揚げの煮びたし",
      "ひじきの煮物",
    ],
    tip: "ビタミンCと一緒に摂ると吸収率アップ。食事前後30分はコーヒー・紅茶を避けると効果的です。",
  },
  {
    name: "カルシウム",
    emoji: "🦴",
    color: "bg-blue-100 text-blue-700",
    amount: "650mg/日",
    timing: "妊娠全期間",
    role: "胎児の骨格・歯の形成に不可欠。妊娠高血圧症候群の予防にも関与",
    risk: "不足すると母体の骨密度が低下し、将来の骨粗鬆症リスクが上昇",
    foods: ["牛乳", "ヨーグルト", "木綿豆腐", "しらす", "小松菜", "切り干し大根"],
    recipes: [
      "しらすと小松菜のふりかけ",
      "豆腐チャンプルー",
      "切り干し大根の煮物",
      "牛乳を使ったシチュー",
    ],
    tip: "ビタミンDがカルシウムの吸収を促進します。加工食品に含まれるリンの過剰摂取は吸収を阻害するため注意。",
  },
  {
    name: "DHA（ドコサヘキサエン酸）",
    emoji: "🐟",
    color: "bg-cyan-100 text-cyan-700",
    amount: "n-3系脂肪酸 1.6g/日",
    timing: "妊娠全期間（後期に特に重要）",
    role: "胎児の脳・網膜の発達に重要。神経細胞の主要な構成成分",
    risk: "不足すると胎児の脳・視覚発達への影響が懸念される",
    foods: ["サバ", "サンマ", "イワシ", "ブリ", "鮭", "アジ"],
    recipes: [
      "サバの味噌煮",
      "サンマの塩焼き",
      "鮭のホイル焼き",
      "ブリ大根",
    ],
    tip: "サケ・アジ・サバ・イワシなどは水銀の心配なく食べられます。大型魚は別途注意が必要です。",
  },
  {
    name: "ビタミンD",
    emoji: "☀️",
    color: "bg-yellow-100 text-yellow-700",
    amount: "8.5μg/日",
    timing: "妊娠全期間",
    role: "カルシウムの吸収を促進し、胎児の骨形成を助ける",
    risk: "不足すると新生児のくる病リスク、母体の免疫機能低下",
    foods: ["鮭", "しらす干し", "きくらげ（乾燥）", "干し椎茸", "卵黄"],
    recipes: [
      "鮭の塩焼き",
      "きのこの炊き込みごはん",
      "しらすおろし",
    ],
    tip: "日光浴による皮膚での合成も重要。1日15〜30分程度の屋外活動が推奨されます。",
  },
  {
    name: "たんぱく質",
    emoji: "🍗",
    color: "bg-orange-100 text-orange-700",
    amount: "初期 50g → 中期 55g → 後期 75g/日",
    timing: "後期に需要が大幅増加",
    role: "胎児の体（筋肉、血液、臓器）を構成する基本材料",
    risk: "不足すると胎児の発育不良、低出生体重児のリスク",
    foods: ["鶏むね肉", "豚ヒレ肉", "鮭", "卵", "豆腐", "納豆"],
    recipes: [
      "鶏の照り焼き",
      "豚しゃぶサラダ",
      "鮭と豆腐のちゃんちゃん焼き",
      "豆乳スープ",
    ],
    tip: "動物性と植物性をバランスよく摂りましょう。後期は1日75gが目安（鶏むね肉100gで約25g）。",
  },
  {
    name: "亜鉛",
    emoji: "🥚",
    color: "bg-purple-100 text-purple-700",
    amount: "10mg/日",
    timing: "妊娠全期間",
    role: "300種類以上の酵素の構成成分。胎児の細胞分裂・DNA合成に不可欠",
    risk: "不足すると低体重児、味覚障害、免疫力低下のリスク",
    foods: ["牛赤身肉", "卵", "納豆", "アーモンド", "チーズ"],
    recipes: [
      "牛肉とごぼうのしぐれ煮",
      "納豆オムレツ",
      "アーモンドを添えたサラダ",
    ],
    tip: "牡蠣は亜鉛が豊富ですが、妊娠中は必ず十分に加熱してから食べてください。",
  },
  {
    name: "ビタミンB群（B1・B2・B6・B12）",
    emoji: "🍌",
    color: "bg-amber-100 text-amber-700",
    amount: "B6: 1.3mg/日、B12: 2.8μg/日",
    timing: "妊娠全期間",
    role: "エネルギー代謝・赤血球の生成。B6はつわり軽減にも関与",
    risk: "不足すると貧血、つわり悪化、疲労感の増加",
    foods: ["豚肉（B1）", "カツオ（B6）", "バナナ（B6）", "しじみ（B12）", "のり（B12）"],
    recipes: [
      "豚の生姜焼き",
      "バナナスムージー",
      "しじみの味噌汁",
    ],
    tip: "B12は葉酸と協力して赤血球を作ります。両方をバランスよく摂ることが大切です。",
  },
  {
    name: "ビタミンC",
    emoji: "🍓",
    color: "bg-rose-100 text-rose-700",
    amount: "110mg/日",
    timing: "妊娠全期間",
    role: "鉄分の吸収を促進。コラーゲン生成・免疫機能をサポート",
    risk: "不足すると鉄の吸収効率低下、免疫力低下",
    foods: ["いちご", "キウイ", "ピーマン", "ブロッコリー", "柑橘類"],
    recipes: [
      "フルーツヨーグルト（いちご＋キウイ）",
      "カラフルピーマンの炒め物",
      "ブロッコリーのツナサラダ",
    ],
    tip: "鉄分の多い食事と一緒にビタミンCを摂ると、鉄の吸収率が大幅にアップします。",
  },
  {
    name: "食物繊維",
    emoji: "🥦",
    color: "bg-emerald-100 text-emerald-700",
    amount: "18g/日以上",
    timing: "妊娠全期間（便秘予防に特に重要）",
    role: "妊娠中のホルモン変化による便秘を予防。腸内環境の改善",
    risk: "不足すると便秘の悪化、腸内環境の乱れ",
    foods: ["ごぼう", "さつまいも", "きのこ類", "わかめ", "オートミール", "りんご"],
    recipes: [
      "きんぴらごぼう",
      "さつまいもの甘煮",
      "きのこの味噌汁",
      "オートミールのお粥",
    ],
    tip: "不溶性（ごぼう等）と水溶性（わかめ等）を2:1の割合で摂るのが理想的です。",
  },
];

const trimesterGuide = [
  {
    period: "妊娠初期（0〜13週）",
    color: "bg-green-100 text-green-700",
    energy: "+50 kcal/日",
    keyNutrients: "葉酸（最重要）、ビタミンB6",
    description:
      "葉酸のサプリメント（400μg/日）が最も重要な時期。つわりで食べられない場合は「食べられるものを食べられる時に」が基本です。",
    meals: [
      "冷やしたフルーツ・トマト",
      "レモン水・炭酸水",
      "少量ずつ1日5〜6回に分けて",
    ],
  },
  {
    period: "妊娠中期（14〜27週）",
    color: "bg-yellow-100 text-yellow-700",
    energy: "+250 kcal/日",
    keyNutrients: "鉄分（+9.5mg）、カルシウム、たんぱく質",
    description:
      "鉄分の需要が急増する時期。胎盤が完成し、栄養バランスを特に意識しましょう。主食・副菜・主菜をそろえた食事がおすすめです。",
    meals: [
      "赤身肉＋緑黄色野菜の定食スタイル",
      "あさりの味噌汁＋小松菜のおひたし",
      "しらすごはん＋豆腐の味噌汁",
    ],
  },
  {
    period: "妊娠後期（28週〜）",
    color: "bg-orange-100 text-orange-700",
    energy: "+450 kcal/日",
    keyNutrients: "たんぱく質（+25g）、DHA、鉄分",
    description:
      "胎児の急成長期。たんぱく質と鉄分の需要がピークに。子宮が胃を圧迫するため、1回量を減らし小分けに食べましょう。",
    meals: [
      "鮭＋納豆＋卵の高たんぱく朝食",
      "サバの味噌煮定食（DHA補給）",
      "鶏肉と野菜のスープ（少量頻回）",
    ],
  },
];

const avoidFoods = {
  prohibited: [
    { name: "アルコール", reason: "完全に禁止。胎児性アルコール症候群のリスク。少量でも安全とは言えません" },
    { name: "生肉・レアステーキ", reason: "トキソプラズマ感染のリスク。胎児に先天性感染症を起こす可能性" },
    {
      name: "非加熱のナチュラルチーズ・生ハム",
      reason: "リステリア菌感染のリスク。妊婦は胎盤・胎児感染から流産に至る可能性。十分に加熱すれば安全",
    },
  ],
  limited: [
    {
      name: "大型魚（キンメダイ、メカジキ、クロマグロ等）",
      reason: "水銀の蓄積。1回約80gとして週1回まで。キハダマグロ・サケ・アジ等は制限なし",
    },
    {
      name: "カフェイン（コーヒー・紅茶）",
      reason: "1日200〜300mg以下（コーヒー約2杯まで）。鉄分の吸収も阻害するため食事前後は避ける",
    },
    {
      name: "レバー（ビタミンA）",
      reason: "妊娠初期の過剰摂取で催奇形性リスク。鶏レバー100gで約14,000μgRAE。週1回少量に",
    },
    {
      name: "うなぎの蒲焼き",
      reason: "ビタミンAが豊富（100gで約1,500μgRAE）。週1回までが目安",
    },
  ],
  caution: [
    { name: "生卵", reason: "サルモネラ菌のリスク。新鮮なものでも加熱が安心" },
    { name: "刺身・寿司", reason: "アニサキス等の寄生虫、食中毒菌のリスク。新鮮なものでも注意" },
    { name: "昆布（ヨウ素）", reason: "日本人は過剰摂取傾向。毎日の大量摂取は避ける" },
    { name: "ひじき（ヒ素）", reason: "小鉢1杯程度を週2回までが目安" },
  ],
};

const morningTips = [
  {
    title: "食べられるものを食べる",
    detail:
      "栄養バランスはつわりが落ち着いてから整えれば大丈夫。この時期は食べられることが最優先です",
  },
  {
    title: "少量を頻回に",
    detail:
      "空腹が吐き気を悪化させることがあります。1日5〜6回に分けて少しずつ食べましょう",
  },
  {
    title: "冷たいもの・酸味のあるものが食べやすい",
    detail:
      "冷やしたフルーツ、トマト、レモン水などが受け入れやすいことが多いです",
  },
  {
    title: "水分補給を最優先",
    detail:
      "脱水は危険です。水が飲めないときは氷をなめる、経口補水液を試すなどの工夫を",
  },
  {
    title: "つらいときは産院に相談",
    detail:
      "体重が急減したり水分が摂れない場合は点滴が必要なこともあります。我慢しすぎないでください",
  },
];

const faq = [
  {
    q: "サプリメントは飲んだ方がいいですか？",
    a: "葉酸は妊娠1か月前〜3か月まで、食事に加えてサプリメントから400μg/日の摂取が厚生労働省から推奨されています。ただし1,000μg/日を超えないように注意してください。鉄分やカルシウムのサプリは、医師に相談してから始めましょう。",
  },
  {
    q: "お寿司や刺身は絶対に食べてはいけないのですか？",
    a: "「絶対にダメ」ではありませんが、食中毒や寄生虫のリスクがあるため、妊娠中は加熱した魚介類のほうが安心です。どうしても食べたい場合は、新鮮なものを少量にとどめ、体調に注意してください。",
  },
  {
    q: "カフェインは完全にやめるべきですか？",
    a: "完全にゼロにする必要はありません。1日200〜300mg以下（コーヒー約2杯、紅茶約4杯程度）なら問題ないとされています。ただし鉄の吸収を阻害するため、食事の前後30分は控えると良いでしょう。",
  },
  {
    q: "つわりで全然食べられません。赤ちゃんは大丈夫？",
    a: "妊娠初期は赤ちゃんに必要なエネルギーはごくわずかです。食べられるものを食べられる時に摂れば大丈夫です。ただし、水分も摂れない状態が続く場合は必ず産婦人科を受診してください。",
  },
  {
    q: "ベジタリアン・ヴィーガンの場合、何に注意すべきですか？",
    a: "ビタミンB12（動物性食品に多い）、鉄分、亜鉛、DHA、たんぱく質が不足しやすくなります。管理栄養士や医師と相談し、必要に応じてサプリメントで補うことを検討してください。",
  },
];

export default function PregnancyNutritionPage() {
  return (
    <>
      <ArticleJsonLd
        title="妊娠中の栄養ガイド｜必要な栄養素・おすすめ食材・レシピ例"
        description="妊娠中に必要な10の栄養素を厚生労働省の基準に基づいて解説。推奨摂取量・食材・簡単レシピ例・妊娠期別のポイントまで。"
        path="/learn/pregnancy-nutrition"
        datePublished="2026-03-30"
        dateModified="2026-04-06"
        tags={[
          "妊娠 食事",
          "妊婦 栄養",
          "葉酸",
          "鉄分",
          "カルシウム",
          "DHA",
          "妊娠中 レシピ",
        ]}
        faq={faq.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav
              items={[
                { label: "トップ", href: "/" },
                { label: "学ぶ", href: "/learn" },
                { label: "妊娠中の栄養ガイド" },
              ]}
            />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">食事・栄養</Badge>
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge variant="secondary">10分で読める</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              妊娠中の栄養ガイド
            </h1>
            <ArticleMeta updatedAt="2026-04-06" />
            <p className="text-muted-foreground leading-relaxed">
              「何を食べればいいの？」「この食品は大丈夫？」
              妊娠中の食事の不安を解消するために、厚生労働省の基準に基づいた
              <strong className="text-foreground">
                10の必須栄養素・おすすめ食材・簡単レシピ
              </strong>
              を整理しました。
            </p>
          </div>

          <TableOfContents
            items={[
              { id: "nutrients", label: "妊娠中に必要な10の栄養素" },
              { id: "trimester", label: "妊娠期別の栄養ポイント" },
              { id: "avoid-foods", label: "避けるべき食品・注意が必要な食品" },
              { id: "morning-sickness", label: "つわり中の食事のコツ" },
              { id: "sample-menu", label: "1日の献立例" },
              { id: "faq", label: "よくある質問" },
              { id: "pdf", label: "PDFダウンロード" },
            ]}
          />

          {/* 10の栄養素 */}
          <section id="nutrients" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🤰</span>
              妊娠中に必要な10の栄養素
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-4">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  摂取量は厚生労働省「日本人の食事摂取基準（2020年版・2025年版）」に基づいています。
                  個人の状態によって必要量は異なりますので、
                  <strong className="text-foreground">
                    かかりつけの医師や管理栄養士にもご相談ください
                  </strong>
                  。
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {nutrients.map((nutrient) => (
                <Card
                  key={nutrient.name}
                  className="border-border/50 shadow-none"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span aria-hidden className="text-lg">
                        {nutrient.emoji}
                      </span>
                      <CardTitle className="text-base">
                        {nutrient.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* 基本情報 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <Badge className={nutrient.color}>
                            {nutrient.amount}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {nutrient.timing}
                        </p>
                      </div>

                      {/* 役割 */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">役割:</strong>{" "}
                        {nutrient.role}
                      </p>

                      {/* 不足リスク */}
                      <div className="p-2.5 bg-red-50 rounded-lg">
                        <p className="text-xs text-red-700 leading-relaxed">
                          <strong>不足すると:</strong> {nutrient.risk}
                        </p>
                      </div>

                      {/* おすすめ食材 */}
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1.5">
                          おすすめ食材
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {nutrient.foods.map((food) => (
                            <span
                              key={food}
                              className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground"
                            >
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* レシピ例 */}
                      <div className="p-2.5 bg-primary/5 rounded-lg">
                        <p className="text-xs font-semibold text-primary mb-1.5">
                          簡単レシピ例
                        </p>
                        <ul className="space-y-1">
                          {nutrient.recipes.map((recipe) => (
                            <li
                              key={recipe}
                              className="text-xs text-muted-foreground flex items-start gap-1.5"
                            >
                              <span className="text-primary shrink-0">
                                &#9679;
                              </span>
                              {recipe}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* ワンポイント */}
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        {nutrient.tip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 妊娠期別のポイント */}
          <section id="trimester" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📅</span>
              妊娠期別の栄養ポイント
            </h2>
            <div className="space-y-4">
              {trimesterGuide.map((item) => (
                <Card
                  key={item.period}
                  className="border-border/50 shadow-none"
                >
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={item.color}>{item.period}</Badge>
                      <span className="text-xs text-muted-foreground">
                        エネルギー付加量: {item.energy}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">重点栄養素:</strong>{" "}
                        {item.keyNutrients}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      <div className="p-2.5 bg-primary/5 rounded-lg">
                        <p className="text-xs font-semibold text-primary mb-1.5">
                          おすすめの食事例
                        </p>
                        <ul className="space-y-1">
                          {item.meals.map((meal) => (
                            <li
                              key={meal}
                              className="text-xs text-muted-foreground flex items-start gap-1.5"
                            >
                              <span className="text-primary shrink-0">
                                &#9679;
                              </span>
                              {meal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 避けるべき食品 */}
          <section id="avoid-foods" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#9888;&#65039;</span>
              避けるべき食品・注意が必要な食品
            </h2>

            {/* 禁止 */}
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Badge className="bg-red-100 text-red-700">禁止</Badge>
              摂取を避けるべき食品
            </h3>
            <div className="space-y-3 mb-6">
              {avoidFoods.prohibited.map((food) => (
                <Card
                  key={food.name}
                  className="border-red-200/50 shadow-none"
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold shrink-0 mt-0.5">
                        &#10005;
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {food.name}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {food.reason}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 制限 */}
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-700">制限</Badge>
              量を控えるべき食品
            </h3>
            <div className="space-y-3 mb-6">
              {avoidFoods.limited.map((food) => (
                <Card
                  key={food.name}
                  className="border-amber-200/50 shadow-none"
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        &#9888;
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {food.name}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {food.reason}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 注意 */}
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-700">注意</Badge>
              気をつけたい食品
            </h3>
            <div className="space-y-3">
              {avoidFoods.caution.map((food) => (
                <Card
                  key={food.name}
                  className="border-yellow-200/50 shadow-none"
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold shrink-0 mt-0.5">
                        !
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {food.name}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {food.reason}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* つわり中の食事のコツ */}
          <section id="morning-sickness" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128161;</span>
              つわり中の食事のコツ
            </h2>
            <div className="space-y-3">
              {morningTips.map((tip, i) => (
                <Card key={tip.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {tip.detail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 1日の献立例 */}
          <section id="sample-menu" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🍽️</span>
              1日の献立例（妊娠中期）
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">
                      朝食
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        &#9679; ごはん＋納豆（葉酸・たんぱく質・亜鉛）
                      </li>
                      <li>
                        &#9679; しじみの味噌汁（鉄分・B12）
                      </li>
                      <li>&#9679; ヨーグルト＋いちご（カルシウム・ビタミンC）</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">
                      昼食
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        &#9679; 鮭の塩焼き定食（DHA・ビタミンD・たんぱく質）
                      </li>
                      <li>
                        &#9679; ほうれん草のおひたし（葉酸・鉄分）
                      </li>
                      <li>&#9679; きんぴらごぼう（食物繊維）</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">
                      夕食
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        &#9679; 牛肉とピーマンの炒め物（鉄分・亜鉛・ビタミンC）
                      </li>
                      <li>
                        &#9679; 豆腐とわかめの味噌汁（カルシウム・食物繊維）
                      </li>
                      <li>&#9679; 切り干し大根の煮物（カルシウム・食物繊維）</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">
                      間食
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        &#9679; アーモンド少量（亜鉛・ビタミンE）
                      </li>
                      <li>
                        &#9679; バナナ（ビタミンB6・食物繊維）
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* よくある質問 */}
          <section id="faq" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#10067;</span>
              よくある質問
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <Card key={item.q} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-2">
                      Q. {item.q}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* PDF */}
          <section id="pdf" className="mb-8">
            <PdfDownloadSection
              pdfPath="/pdf/pregnancy-nutrition.pdf"
              title="妊娠中の栄養ガイド"
              catchcopy="冷蔵庫に貼れる一覧表つき"
              description="10の必須栄養素・おすすめ食材・レシピ例・避けるべき食品を、印刷して使えるA4サイズにまとめました。"
              usageTips={[
                { icon: "print", text: "印刷して冷蔵庫に貼る" },
                { icon: "share", text: "パートナーと共有" },
                { icon: "other", text: "健診時の参考に" },
              ]}
            />
          </section>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考情報
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong>{" "}
                    厚生労働省. &quot;日本人の食事摂取基準（2020年版）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong>{" "}
                    厚生労働省. &quot;日本人の食事摂取基準（2025年版）策定検討会報告書.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong>{" "}
                    厚生労働省. &quot;妊娠前からはじめる妊産婦のための食生活指針（令和3年改定）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong>{" "}
                    厚生労働省. &quot;魚介類に含まれる水銀について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[5]</strong>{" "}
                    厚生労働省. &quot;リステリアによる食中毒.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[6]</strong>{" "}
                    厚生労働省. &quot;食品に含まれるカフェインの過剰摂取についてQ&amp;A.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[7]</strong>{" "}
                    日本産科婦人科学会. &quot;産婦人科診療ガイドライン 産科編 2023.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、医療・栄養指導に代わるものではありません。
              個人の健康状態・妊娠経過・アレルギーなどによって最適な食事は異なります。
              具体的な食事指導については、担当の産婦人科医や管理栄養士にご相談ください。
            </p>
          </div>

          <ShareButtons
            title="妊娠中の栄養ガイド｜必要な栄養素・おすすめ食材・レシピ例"
            path="/learn/pregnancy-nutrition"
          />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/baby-food"
              className={buttonVariants({ variant: "outline" })}
            >
              離乳食のはじめかたを読む
            </Link>
            <Link
              href="/concierge"
              className={buttonVariants({ variant: "outline" })}
            >
              コンシェルジュに相談する
            </Link>
            <Link
              href="/learn"
              className={buttonVariants({ variant: "ghost" })}
            >
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
