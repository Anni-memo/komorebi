import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

export const metadata = {
  title: "離乳食のはじめかた | こもれび",
  description:
    "離乳食の開始時期、段階別の進め方（初期・中期・後期・完了期）、食物アレルギーの注意点、よくある悩みと対処法をわかりやすく解説します。",
};

const readinessSigns = [
  "首がしっかりすわっている",
  "支えがあればお座りができる",
  "食べ物に興味を示す（大人の食事を見てよだれを垂らす、手を伸ばすなど）",
  "スプーンを口に入れても舌で押し出すことが減った",
];

const stages = [
  {
    name: "初期（ゴックン期）",
    age: "5〜6ヶ月頃",
    texture: "なめらかなペースト状（ポタージュくらい）",
    frequency: "1日1回",
    foods: "10倍がゆ、にんじん・かぼちゃ・ほうれん草などのペースト、豆腐、白身魚",
    tips: "まずは10倍がゆを小さじ1杯から。1週間ほどして慣れたら野菜、さらに慣れたらたんぱく質へ進みます",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "中期（モグモグ期）",
    age: "7〜8ヶ月頃",
    texture: "舌でつぶせる硬さ（豆腐くらい）",
    frequency: "1日2回",
    foods: "7倍がゆ、細かく刻んだ野菜、鶏ささみ、卵黄、ヨーグルト、パンがゆ",
    tips: "食材の種類を少しずつ増やしましょう。卵は固ゆでの卵黄から始め、少量ずつ進めます",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "後期（カミカミ期）",
    age: "9〜11ヶ月頃",
    texture: "歯ぐきでつぶせる硬さ（バナナくらい）",
    frequency: "1日3回",
    foods: "5倍がゆ〜軟飯、手づかみ食べできるスティック野菜、赤身の魚や肉、全卵",
    tips: "手づかみ食べが始まる時期。汚れますが、食べる意欲を育てる大切なステップです",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "完了期（パクパク期）",
    age: "12〜18ヶ月頃",
    texture: "歯ぐきで噛める硬さ（肉団子くらい）",
    frequency: "1日3回＋おやつ1〜2回",
    foods: "軟飯〜普通のごはん、大人の食事の取り分け（薄味に調整）、牛乳",
    tips: "栄養の大部分を食事から摂れるようになります。まだ味付けは薄めを心がけましょう",
    color: "bg-red-100 text-red-700",
  },
];

const allergyTips = [
  { title: "初めての食材は少量から", detail: "新しい食材は小さじ1杯程度から始め、2〜3日は同じ食材で様子を見ます" },
  { title: "平日の午前中に試す", detail: "万が一アレルギー症状が出たとき、すぐに病院を受診できる時間帯を選びましょう" },
  { title: "特に注意が必要な食品", detail: "卵・牛乳・小麦は三大アレルゲンです。卵は固ゆでの卵黄から少量ずつ開始。2019年以降の研究では、早めの開始がアレルギー予防に有効とする報告もあります" },
  { title: "アレルギー症状の目安", detail: "口の周りの赤み・じんましん・嘔吐・下痢・咳・ぐったりなどの症状が出たら、すぐに医療機関を受診してください" },
  { title: "自己判断で除去しない", detail: "アレルギーが疑われる場合でも、医師の診断なく食品を除去すると栄養の偏りにつながります。必ず専門医に相談しましょう" },
];

const commonWorries = [
  { question: "全然食べてくれない", answer: "離乳食の開始時期は、食べる「練習」の期間です。母乳やミルクで栄養は足りているので、食べない日があっても焦る必要はありません。無理強いせず、楽しい雰囲気を大切にしましょう" },
  { question: "ベーッと口から出してしまう", answer: "舌で食べ物を押し出す反射（哺乳反射）がまだ残っているかもしれません。数日〜1週間あけて、もう一度試してみましょう" },
  { question: "手作りしないとダメ？", answer: "ベビーフード（市販品）を活用してまったく問題ありません。栄養バランスが整っており、衛生面でも安心です。親の負担軽減も大事な要素です" },
  { question: "食べムラがある", answer: "好き嫌いや食べムラは成長過程で自然なことです。食べない食材も、時間をおいて再挑戦すると食べることがよくあります" },
  { question: "便の色や回数が変わった", answer: "離乳食を始めると便の色・硬さ・回数が変わるのは普通です。ただし、血便や白い便が続く場合は受診してください" },
];

export default function BabyFoodPage() {
  return (
    <>
      <ArticleJsonLd
        title="離乳食のはじめかた"
        description="離乳食の開始時期、段階別の進め方（初期・中期・後期・完了期）、食物アレルギーの注意点、よくある悩みと対処法をわかりやすく解説します。"
        path="/learn/baby-food"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["離乳食", "赤ちゃん 食事", "食物アレルギー"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "離乳食のはじめかた" },
            ]} />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">食事</Badge>
              <Badge variant="secondary">5〜6ヶ月の親向け</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              離乳食のはじめかた
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              「いつから始める？」「何をどのくらい？」
              離乳食の基本的な進め方と、困ったときの対処法をまとめました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "readiness", label: "離乳食を始めるサイン" },
            { id: "stages", label: "段階別の進め方" },
            { id: "allergy", label: "食物アレルギーの注意点" },
            { id: "worries", label: "よくある悩みと対処法" },
          ]} />

          {/* 開始の目安 */}
          <section id="readiness" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🍼</span>
              離乳食を始めるサイン（5〜6ヶ月頃）
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  厚生労働省の「授乳・離乳の支援ガイド」では、生後5〜6ヶ月頃が開始の目安とされています。
                  月齢だけでなく、赤ちゃんの発達サインも確認しましょう。
                </p>
                <ul className="space-y-2">
                  {readinessSigns.map((sign) => (
                    <li key={sign} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 段階別の進め方 */}
          <section id="stages" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              段階別の進め方
            </h2>
            <div className="space-y-4">
              {stages.map((stage) => (
                <Card key={stage.name} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={stage.color}>{stage.age}</Badge>
                      <CardTitle className="text-sm">{stage.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">かたさ:</strong> {stage.texture}</p>
                      <p><strong className="text-foreground">回数:</strong> {stage.frequency}</p>
                      <p><strong className="text-foreground">主な食材:</strong> {stage.foods}</p>
                      <p className="text-xs bg-muted/30 rounded p-2">{stage.tips}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 食物アレルギー */}
          <section id="allergy" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⚠️</span>
              食物アレルギーの注意点
            </h2>
            <div className="space-y-3">
              {allergyTips.map((tip, i) => (
                <Card key={tip.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{tip.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* よくある悩み */}
          <section id="worries" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💬</span>
              よくある悩みと対処法
            </h2>
            <div className="space-y-3">
              {commonWorries.map((item) => (
                <Card key={item.question} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">Q. {item.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">出典・参考情報</h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 厚生労働省. &quot;授乳・離乳の支援ガイド（2019年改定版）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 日本小児アレルギー学会. &quot;食物アレルギー診療ガイドライン2021.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> Du Toit G, et al. &quot;Randomized Trial of Peanut Consumption in Infants at Risk for Peanut Allergy.&quot; <em>N Engl J Med.</em> 2015;372:803-813.
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 国立成育医療研究センター. &quot;離乳食のすすめ方.&quot;
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
              お子さまの発達や体質に合わせた進め方については、かかりつけの小児科医や管理栄養士にご相談ください。
            </p>
          </div>

          <div className="mt-8">
            <PdfDownloadSection
              title="離乳食の進め方ガイド"
              catchcopy="「今月は何が食べられる？」早見表"
              description="4段階の進め方、食材リスト、アレルギー注意点をA4 1枚にまとめました。"
              pdfPath="/pdf/baby-food.pdf"
              usageTips={[
                { icon: "print", text: "冷蔵庫に貼って確認" },
                { icon: "other", text: "買い物時の食材チェックに" },
                { icon: "share", text: "保育園の先生と共有" },
              ]}
            />
          </div>

          <ShareButtons title="離乳食のはじめかた" path="/learn/baby-food" />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/food-allergy-guide" className={buttonVariants({ variant: "outline" })}>
              食物アレルギーガイドを読む
            </Link>
            <Link href="/learn/newborn-sleep" className={buttonVariants({ variant: "outline" })}>
              新生児の睡眠パターンを読む
            </Link>
            <Link href="/learn" className={buttonVariants({ variant: "ghost" })}>
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
