import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "STAGE 06｜19〜36ヶ月 走る・噛む・話す｜身体調和ガイド",
  description:
    "生後19〜36ヶ月の発達ガイド。全身運動の多様化、咀嚼の完成、言葉の爆発期。4領域すべてが統合される集大成。",
};

const milestones = [
  {
    category: "運動",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "走る", detail: "歩行の延長ではなく、両足が同時に地面から離れる新しい運動パターン。バランス・スピード・方向転換の制御を学びます。" },
      { text: "階段を手すりを持って上り下りする", detail: "交互に足を出す動作は高度な運動計画。最初は一段ずつ両足を揃え、やがて交互足に。" },
      { text: "ジャンプする（両足で）", detail: "両足同時に地面を蹴り、着地する。全身の筋力とタイミングの統合です。2歳半頃から安定します。" },
      { text: "ボールを投げる", detail: "狙って投げるには、視覚・体幹の回旋・腕の振り・手を離すタイミングの統合が必要です。" },
      { text: "三輪車をこぐ", detail: "足を交互に動かし、ハンドルで方向を変え、前を見る。複数の動作の同時制御です。" },
    ],
  },
  {
    category: "摂食",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "大人と同じ形状の食事を噛んで食べられる", detail: "前歯で噛みとり、奥歯ですりつぶし、舌で食塊をまとめて飲み込む。咀嚼の完成です。" },
      { text: "スプーン・フォークを上手に使う", detail: "握りが「手のひら握り」から「指握り（鉛筆持ち）」に近づきます。食具操作の精密化です。" },
      { text: "こぼさずにコップで飲める", detail: "唇と舌の繊細な制御が完成に近づいています。" },
      { text: "食事のマナーが身につき始める", detail: "「座って食べる」「お皿に手を添える」など。社会性と身体制御の統合です。" },
    ],
  },
  {
    category: "呼吸",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "二語文・三語文が出る", detail: "「ママ、きた」「ワンワン、いた」など。呼気を長く保ち、複数の音を組み合わせる力が育っています。" },
      { text: "歌をうたおうとする", detail: "メロディに合わせて呼吸をコントロールし、音程を変える。呼吸と発声の高度な協調です。" },
      { text: "鼻呼吸が定着している", detail: "活動中も安静時も鼻で呼吸。口腔機能の発達と表裏一体の関係です。" },
    ],
  },
  {
    category: "感覚統合",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "クレヨンで丸を描く", detail: "始点と終点を結ぶ「閉じた形」は認知的にも運動的にも大きなジャンプ。文字の前段階です。" },
      { text: "着替えを自分でやろうとする", detail: "ボタン・ジッパー・靴の脱ぎ履き。両手の協調と手指の巧緻性の集大成です。" },
      { text: "ごっこ遊びをする", detail: "「〜のふりをする」は高度な想像力。見立て・役割の理解・ストーリーの構成を統合する力です。" },
      { text: "順番を待てるようになる", detail: "衝動のコントロールと社会的ルールの理解。身体と感情の「調和」が社会性に現れた形です。" },
    ],
  },
];

const touchTechniques = [
  {
    title: "全身を使う運動遊び",
    when: "公園・室内",
    how: "走る、跳ぶ、登る、ぶら下がる、転がる。多様な動きを「遊び」の中で経験させる。アスレチック遊具が最適です。",
    duration: "20〜30分",
    icon: "🏃",
  },
  {
    title: "バランス遊び",
    when: "室内・外遊び",
    how: "一本橋（テープを貼った線の上を歩く）、平均台（低い縁石の上を歩く）、片足立ち遊び。前庭覚と固有受容覚の統合を高めます。",
    duration: "5〜10分",
    icon: "🤸",
  },
  {
    title: "手指の巧緻性トレーニング",
    when: "遊び・お手伝い",
    how: "粘土、シール貼り、ひも通し、洗濯バサミ遊び。親指・人差し指・中指の3指操作が鉛筆持ちの準備になります。",
    duration: "遊びの中で自然に",
    icon: "✂️",
  },
  {
    title: "噛む力を育てる食事",
    when: "毎日の食事",
    how: "りんご・にんじんスティック・フランスパンなど、しっかり噛む必要がある食材を意識的に取り入れる。顎の発達と歯並びに影響します。",
    duration: "食事時間全体",
    icon: "🍎",
  },
  {
    title: "ことば遊び",
    when: "日常の中で",
    how: "絵本の読み聞かせ、しりとり、「これなあに？」遊び。言葉のやりとりが呼吸と口の運動を自然にトレーニングします。",
    duration: "日常的に",
    icon: "📖",
  },
];

const summarySection = {
  title: "0〜36ヶ月のふりかえり",
  timeline: [
    { stage: "STAGE 01", age: "0〜3ヶ月", achievement: "鼻呼吸と哺乳の基盤" },
    { stage: "STAGE 02", age: "4〜6ヶ月", achievement: "首すわり・寝返り" },
    { stage: "STAGE 03", age: "7〜9ヶ月", achievement: "おすわり・舌の上下運動" },
    { stage: "STAGE 04", age: "10〜12ヶ月", achievement: "はいはい・つかまり立ち・手づかみ食べ" },
    { stage: "STAGE 05", age: "13〜18ヶ月", achievement: "歩行・スプーン・初語" },
    { stage: "STAGE 06", age: "19〜36ヶ月", achievement: "走る・噛む・話す——4領域の統合" },
  ],
};

const warningSignals = [
  "2歳を過ぎても意味のある言葉が数語しか出ない",
  "走るときにいつもつまずく・転びやすい",
  "食事を極端に嫌がる・特定の食感しか受け入れない",
  "他の子どもに全く関心を示さない",
  "指示を理解していない様子がある",
  "常に口が開いている・いびきがひどい",
];

export default function Stage6Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">

          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-primary transition-colors">学ぶ</Link>
            <span>/</span>
            <Link href="/learn/body-harmony" className="hover:text-primary transition-colors">身体調和ガイド</Link>
            <span>/</span>
            <span className="text-foreground">STAGE 06</span>
          </nav>

          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs">運動</Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-xs">摂食</Badge>
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 border text-xs">感覚統合</Badge>
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 border text-xs">呼吸</Badge>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground text-lg font-bold font-mono shrink-0">
                06
              </span>
              <div>
                <p className="text-xs font-mono text-muted-foreground">19〜36ヶ月</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  走る・噛む・話す
                </h1>
              </div>
            </div>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              身体調和の集大成。0〜18ヶ月で積み上げた4領域すべてが花開く時期です。
              走る・跳ぶ・登るといった全身運動、大人に近い咀嚼、言葉の爆発——。
              「できること」が目に見えて増え、子どもの世界が大きく広がります。
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>この時期のマイルストーン
            </h2>
            <div className="space-y-6">
              {milestones.map((group) => (
                <div key={group.category}>
                  <Badge className={`${group.color} border text-xs mb-3`}>{group.category}</Badge>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <Card key={item.text} className={`shadow-none border-l-4 ${group.borderColor} border-t-0 border-r-0 border-b-0`}>
                        <CardContent className="pt-4 pb-4">
                          <h3 className="font-semibold text-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-0.5 shrink-0">&#9675;</span>{item.text}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed pl-5">{item.detail}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🤲</span>この時期のやさしいタッチ
            </h2>
            <div className="space-y-4">
              {touchTechniques.map((t) => (
                <Card key={t.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0" aria-hidden>{t.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm">{t.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1 mb-2">
                          <Badge variant="outline" className="text-[10px]">🕐 {t.duration}</Badge>
                          <Badge variant="outline" className="text-[10px]">📍 {t.when}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t.how}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          {/* ふりかえり */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🗺️</span>{summarySection.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              36ヶ月間の発達の旅をふりかえります。どのステージも次のステージの土台になっていました。
            </p>
            <div className="space-y-2">
              {summarySection.timeline.map((t, i) => (
                <Card key={t.stage} className={`shadow-none border-border/50 ${i === 5 ? "border-primary/30 bg-komorebi-light/10" : ""}`}>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold font-mono shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{t.age}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{t.achievement}</p>
                      </div>
                      {i < 5 && <span className="text-muted-foreground text-xs shrink-0">↓</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⚠️</span>相談のめやす
            </h2>
            <Card className="bg-muted/30 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {warningSignals.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-amber-500 mt-0.5 shrink-0">&#9888;</span>{s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>ここまでの36ヶ月間、お疲れさまでした。</strong>
                <br />
                赤ちゃんが呼吸して、飲んで、動いて、感じて、食べて、話す——。
                <br />
                その一つひとつのステップを見守ってきたあなたの存在が、
                <br />
                <strong className="text-primary">お子さまの最大の「身体調和」です。</strong>
              </p>
            </CardContent>
          </Card>

          {/* PDFダウンロード */}
          <div className="mt-8">
            <PdfDownloadSection
              title="STAGE 06 走る・噛む・話す"
              catchcopy="19〜36ヶ月 身体の調和が花ひらく"
              description="運動・食事・言葉の総合チェック、0-36ヶ月のふりかえりをまとめました。"
              pdfPath="/pdf/body-harmony-stage6.pdf"
              usageTips={[
                { icon: "print", text: "3歳児健診の準備に" },
                { icon: "share", text: "幼稚園・保育園と共有" },
                { icon: "other", text: "全ステージふりかえり付き" },
              ]}
            />
          </div>

          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              このページは一般的な発達の目安です。発達の時期には個人差があります。
              気になることがあれば、かかりつけの小児科医・作業療法士・保健センターにご相談ください。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/body-harmony" className={buttonVariants({ variant: "default" })}>
              身体調和ガイドに戻る
            </Link>
            <Link href="/learn/body-harmony/stage-5" className={buttonVariants({ variant: "outline" })}>
              ← 前のステージ
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
