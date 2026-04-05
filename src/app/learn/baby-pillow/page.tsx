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

export const metadata = {
  title: "新生児のまくら｜必要性・窒息リスク・商品比較ガイド | こもれび",
  description:
    "新生児にまくらは必要？医学的な見解・窒息リスク・人気5商品の比較を整理。安全に使うためのポイントもまとめました。",
};

const medicalFacts = [
  "新生児の背骨はC字カーブ。大人のようなS字カーブではないため、頭を支える枕は本来不要",
  "枕が「必要」になるのは、背骨のS字カーブが形成される10歳前後から",
  "ただし「向き癖による頭の変形（絶壁）防止」目的で使うケースが一般的",
  "頭の形が気になる場合、生後6ヶ月頃までが矯正しやすい時期とされている",
];

const safetyGuidelines = [
  {
    org: "AAP（米国小児科学会）",
    statement:
      "枕を含む柔らかい寝具は睡眠環境から除外すべき。SIDS死亡リスクが2.3〜5.1倍に上昇",
  },
  {
    org: "FDA（米国食品医薬品局）",
    statement:
      "乳幼児用の頭部形成枕は使用しないでください（公式安全通信）",
  },
  {
    org: "こども家庭庁（日本）",
    statement: "柔らかい寝具による窒息事故に注意喚起",
  },
];

const safeUsageRules = [
  "必ず保護者が目を離さない時間帯のみ使用する",
  "就寝時（夜間・昼寝）には使わないのが最も安全",
  "顔が埋まらない硬めの素材を選ぶ",
  "メッシュ素材など通気性の高いものを優先する",
  "枕と顔の間に隙間ができないか定期的にチェックする",
];

const products = [
  {
    name: "ユニースリープ",
    price: "約11,000円",
    ageRange: "0〜24ヶ月",
    type: "3D縫製型",
    breathability: "○",
    washable: "可",
    safetyFeature: "3D縫製で顔埋め防止",
    highlight: "リボンでサイズ調整可。楽天1位獲得・SNSで人気",
    bestFor: "予算は気にしない・長期間使いたい方",
  },
  {
    name: "ジオピロー",
    price: "約6,980円",
    ageRange: "新生児〜",
    type: "3Dメッシュ立体型",
    breathability: "◎",
    washable: "可",
    safetyFeature: "3Dメッシュで窒息リスク低減",
    highlight: "ヘルメット矯正の技術を応用。圧力分散設計",
    bestFor: "新生児期から絶壁予防を始めたい方",
  },
  {
    name: "エスメラルダ",
    price: "約2,998円",
    ageRange: "4ヶ月頃〜",
    type: "インサート式ドーナツ型",
    breathability: "○",
    washable: "可",
    safetyFeature: "高さ調整で個別対応",
    highlight: "インサートで高さ調整可能。デザイン豊富。日本製",
    bestFor: "首すわり後の向き癖対策に",
  },
  {
    name: "サンデシカ",
    price: "約2,500〜3,500円",
    ageRange: "新生児〜",
    type: "傾斜型 / ドーナツ型",
    breathability: "◎",
    washable: "丸洗いOK",
    safetyFeature: "エアーパイプ素材で通気性確保",
    highlight: "10度の傾斜で吐き戻し対策にも。6重ガーゼ使用",
    bestFor: "吐き戻しも気になる方",
  },
  {
    name: "西川 ドーナツ枕",
    price: "約2,000〜3,000円",
    ageRange: "新生児〜",
    type: "ドーナツ型",
    breathability: "○",
    washable: "可",
    safetyFeature: "老舗寝具メーカーの品質基準",
    highlight: "医師推奨。コスパが良く、信頼のブランド",
    bestFor: "コスパ重視で安心を選びたい方",
  },
];

const scenarioGuides = [
  {
    situation: "新生児期から絶壁を予防したい",
    recommendation: "ジオピロー or ユニースリープ",
    reason: "0ヶ月から使える＋窒息対策が手厚い",
  },
  {
    situation: "コスパ重視でまず試したい",
    recommendation: "西川 or サンデシカ",
    reason: "2,000〜3,500円で医師推奨の安心感",
  },
  {
    situation: "吐き戻しも気になる",
    recommendation: "サンデシカ（傾斜型）",
    reason: "10度傾斜で吐き戻し対策にもなる",
  },
  {
    situation: "予算は気にしない・最高品質がほしい",
    recommendation: "ユニースリープ",
    reason: "0〜24ヶ月の長期使用・楽天1位獲得",
  },
  {
    situation: "4ヶ月以降で向き癖対策したい",
    recommendation: "エスメラルダ",
    reason: "インサートで個別調整可・デザイン豊富",
  },
];

const faq = [
  {
    q: "ドーナツ枕で絶壁は本当に治る？",
    a: "医学的にドーナツ枕だけで絶壁が「治る」というエビデンスは限定的です。ただし向き癖を防ぐことで、頭の形が偏るのを予防する効果は期待できます。すでに変形が進んでいる場合は、ヘルメット矯正について小児科に相談してください。",
  },
  {
    q: "いつから使い始めるのがいい？",
    a: "向き癖が気になり始めたら（多くは生後1〜2ヶ月）が目安です。ただし新生児期は窒息リスクが最も高い時期。使う場合は必ず保護者の見守り下で。",
  },
  {
    q: "夜間の就寝時にも使っていい？",
    a: "AAP・FDAともに就寝時の枕使用は推奨していません。日中の見守り下での使用にとどめるのが最も安全です。",
  },
  {
    q: "タオルを丸めて代用しても大丈夫？",
    a: "タオルは崩れやすく、顔にかぶさる・隙間に挟まるリスクがあるため推奨しません。使うならベビー枕専用の製品を選んでください。",
  },
];

const references = [
  {
    name: "AAP Safe Sleep Guidelines（2022）",
    url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/A-Parents-Guide-to-Safe-Sleep.aspx",
  },
  {
    name: "AAP Updated Recommendations（2022）",
    url: "https://publications.aap.org/pediatrics/article/150/1/e2022057990/188304/Sleep-Related-Infant-Deaths-Updated-2022",
  },
  {
    name: "FDA安全通信 — 頭の形成用枕",
    url: "https://atamanokatachi.com/blog/crania-deformity-blog/716/",
  },
  {
    name: "こども家庭庁 — 窒息・誤飲事故",
    url: "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-1",
  },
  {
    name: "マイベスト ベビー枕ランキング（2026年3月）",
    url: "https://my-best.com/2025",
  },
];

export default function BabyPillowPage() {
  return (
    <>
      <ArticleJsonLd
        title="新生児のまくら｜必要性・窒息リスク・商品比較ガイド"
        description="新生児にまくらは必要？医学的な見解・窒息リスク・人気5商品の比較を整理。安全に使うためのポイントもまとめました。"
        path="/learn/baby-pillow"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["ベビー枕", "新生児 まくら", "向き癖"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "新生児のまくら" },
            ]} />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">学ぶ</Badge>
              <Badge variant="secondary">睡眠</Badge>
              <Badge variant="secondary">出産準備</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              新生児のまくら｜必要性・窒息リスク・商品比較
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              まくらは必要？安全なの？どれを選べばいい？
              <br />
              医学的な見解と人気5商品の比較を、このページ1つで整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "necessity", label: "そもそも新生児にまくらは必要？" },
            { id: "sids-risk", label: "窒息・SIDSリスク" },
            { id: "safe-usage", label: "それでも使う場合の安全ルール" },
            { id: "comparison", label: "人気5商品を比較" },
            { id: "scenario", label: "あなたの状況別おすすめ" },
            { id: "faq", label: "よくある質問" },
          ]} />

          {/* 1. そもそも必要？ */}
          <section id="necessity" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              そもそも新生児にまくらは必要？
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {medicalFacts.map((fact) => (
                    <li
                      key={fact}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-komorebi-warm mt-0.5 shrink-0">
                        &#9679;
                      </span>
                      {fact}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground mt-4 leading-relaxed">
                  <strong>結論: 医学的には不要。</strong>
                  ただし向き癖・絶壁が気になる場合に限り、安全対策をした上で検討する選択肢です。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 窒息・SIDSリスク */}
          <section id="sids-risk" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-2">
              窒息・SIDSリスク（最重要）
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              まくらを検討する前に、必ず知っておくべき安全情報です。
            </p>
            <div className="space-y-3">
              {safetyGuidelines.map((item) => (
                <Card
                  key={item.org}
                  className="border-border/50 shadow-none border-l-4 border-l-destructive/40"
                >
                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {item.org}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.statement}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. 安全に使うためのルール */}
          <section id="safe-usage" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              それでも使う場合の安全ルール
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {safeUsageRules.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5 shrink-0">
                        &#10003;
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 4. 商品比較表 */}
          <section id="comparison" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-2">
              人気5商品を比較
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              2026年3月時点の市場調査に基づく比較です。
            </p>
            <div className="space-y-4">
              {products.map((product) => (
                <Card
                  key={product.name}
                  className="border-border/50 shadow-none"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {product.name}
                      </CardTitle>
                      <span className="text-sm font-bold text-primary">
                        {product.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground mb-3">
                      {product.highlight}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3">
                      <div className="bg-muted/30 rounded-lg p-2">
                        <span className="text-muted-foreground">対象: </span>
                        <span className="text-foreground">
                          {product.ageRange}
                        </span>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-2">
                        <span className="text-muted-foreground">タイプ: </span>
                        <span className="text-foreground">{product.type}</span>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-2">
                        <span className="text-muted-foreground">通気性: </span>
                        <span className="text-foreground">
                          {product.breathability}
                        </span>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-2">
                        <span className="text-muted-foreground">洗濯: </span>
                        <span className="text-foreground">
                          {product.washable}
                        </span>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-2 col-span-2 sm:col-span-2">
                        <span className="text-muted-foreground">
                          安全対策:{" "}
                        </span>
                        <span className="text-foreground">
                          {product.safetyFeature}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5 shrink-0">
                        &#9432;
                      </span>
                      <p className="text-muted-foreground">
                        こんな方に: {product.bestFor}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. シーン別おすすめ */}
          <section id="scenario" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              あなたの状況別おすすめ
            </h2>
            <div className="space-y-3">
              {scenarioGuides.map((guide) => (
                <Card
                  key={guide.situation}
                  className="border-border/50 shadow-none"
                >
                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {guide.situation}
                    </p>
                    <p className="text-sm text-primary font-medium mb-1">
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

          {/* 6. よくある質問 */}
          <section id="faq" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              よくある質問
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <Card
                  key={item.q}
                  className="border-border/50 shadow-none"
                >
                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Q. {item.q}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 7. 結論メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>
                  安全面を最優先にするなら「使わない」が正解です。
                </strong>
                <br />
                向き癖・絶壁が気になる場合は、
                <br />
                通気性が高く硬めの素材を選び、
                <br />
                保護者の見守り下でのみ使用する。
                <br />
                それが現実的ないちばん安全な方法です。
              </p>
            </CardContent>
          </Card>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-3">
              出典・参考
            </h2>
            <ul className="space-y-1">
              {references.map((ref) => (
                <li key={ref.name} className="text-xs text-muted-foreground">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground transition-colors"
                  >
                    {ref.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              本ページの情報は2026年3月時点の一般的な情報です。
              赤ちゃんの頭の形や向き癖には個人差があります。
              頭の変形が気になる場合は、小児科や専門のクリニックにご相談ください。
              商品情報は調査時点のものであり、価格・仕様は変更される場合があります。
            </p>
          </div>

          <ShareButtons title="新生児のまくら｜必要性・窒息リスク・商品比較" path="/learn/baby-pillow" />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn"
              className={buttonVariants({ variant: "outline" })}
            >
              学ぶトップに戻る
            </Link>
            <Link
              href="/concierge"
              className={buttonVariants({ variant: "ghost" })}
            >
              AIに相談する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
