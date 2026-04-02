import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "STAGE 04｜10〜12ヶ月 はいはいとつかまり立ち｜身体調和ガイド",
  description:
    "生後10〜12ヶ月の発達ガイド。はいはいの重要性、つかまり立ち、手づかみ食べ、前歯噛みとりの発達を解説。",
};

const milestones = [
  {
    category: "運動",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "四つばいではいはいができる", detail: "手と膝で交互に前進。体幹・肩・腕・股関節すべてが協調する全身運動。将来の姿勢の良さにも影響します。" },
      { text: "家具につかまって立ち上がる", detail: "足裏全体で体重を支え、バランスを取る練習。ここから伝い歩き→独立歩行へ進みます。" },
      { text: "伝い歩きをする", detail: "つかまり立ちの状態で横移動。重心移動と足の踏みかえの練習です。" },
      { text: "つかまり立ちからゆっくり座れる", detail: "立ち上がるだけでなく「降りる」制御ができること。筋力だけでなく、運動の計画性が育っています。" },
    ],
  },
  {
    category: "摂食",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "手づかみで食べ物を口に運ぶ", detail: "「目で見る→手で掴む→口に運ぶ→噛む」の一連の動作。目・手・口の三者協調の集大成です。" },
      { text: "前歯で噛みとる動作がある", detail: "大きめの食べ物を前歯で適量かじり取る。一口量を自分で調整する力の始まりです。" },
      { text: "舌を左右に動かして歯ぐきですりつぶす", detail: "舌が食べ物を左右の歯ぐきに運び、すりつぶす。咀嚼パターンが大人に近づいています。" },
      { text: "コップ飲みが上達する", detail: "唇でコップの縁を捉え、傾きに合わせて液体を受け取る。繊細な口の制御力です。" },
    ],
  },
  {
    category: "感覚統合",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "指さしで意思を伝える", detail: "見つけたものを指で示し、大人と共有する。言語発達の重要な前段階（共同注意）です。" },
      { text: "「ちょうだい」「バイバイ」を理解する", detail: "言葉と動作の結びつきを学んでいます。理解は発語よりも先に育ちます。" },
      { text: "容器にものを入れたり出したりする", detail: "「入れる/出す」の反復は、空間認識と因果関係の理解を育てる知的な遊びです。" },
    ],
  },
  {
    category: "呼吸",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "意味のある音に近い発声がある", detail: "「マンマ」「ブーブー」など。呼吸を細かく区切り、口の形を変えて音を作り分けています。" },
      { text: "活動量に合わせて呼吸を調整できる", detail: "はいはいで息が上がっても、すぐに呼吸を整えられる。運動と呼吸の協調が成熟しています。" },
    ],
  },
];

const touchTechniques = [
  {
    title: "はいはいコースづくり",
    when: "遊びの時間",
    how: "クッションやトンネルで障害物コースを作る。登る・くぐる・回り込む動作が、体幹と四肢の協調を高めます。",
    duration: "10〜15分",
    icon: "🏗️",
  },
  {
    title: "立位でのバランス遊び",
    when: "つかまり立ちをしているとき",
    how: "テーブルの上におもちゃを置き、片手を離して遊ぶ場面を作る。自然にバランス練習になります。",
    duration: "遊びの中で自然に",
    icon: "🧍",
  },
  {
    title: "手づかみ食べの環境づくり",
    when: "食事の時間",
    how: "にんじんスティック・おにぎり・バナナなど、掴みやすい形に。散らかることを前提に、新聞紙やマットで準備。",
    duration: "食事時間全体",
    icon: "🥕",
  },
  {
    title: "足裏の感覚体験",
    when: "室内・外遊び",
    how: "芝生・畳・カーペットなど異なる素材の上に立たせる。足裏の感覚入力が立位バランスの安定に直結します。",
    duration: "数分ずつ",
    icon: "🦶",
  },
  {
    title: "ころがし遊び（ボール）",
    when: "遊びの時間",
    how: "向かい合って座りボールを転がし合う。追視・予測・手の構え・体幹の回旋が同時に育ちます。",
    duration: "5〜10分",
    icon: "⚽",
  },
];

const feedingGuide = {
  title: "離乳食後期（かみかみ期）のポイント",
  points: [
    { label: "歯ぐきでつぶせるかたさ", detail: "完熟バナナくらいが目安。やわらかすぎると「噛む」練習になりません。前歯で噛みとれる形状も用意。" },
    { label: "3回食への移行", detail: "家族の食事に近いリズムに。朝・昼・夕の3回で、生活リズム全体が安定します。" },
    { label: "手づかみメニューを毎食に", detail: "自分で食べる経験を毎回入れる。散らかっても「練習中」と割り切ることが大切です。" },
    { label: "噛みとりの練習", detail: "大きめの食べ物（スティック状）を渡して、自分で一口量をかじり取る経験を。丸飲みの予防にもなります。" },
    { label: "鉄分を意識する", detail: "この時期は体内の鉄貯蔵が減る時期。赤身の肉・魚、レバー、ほうれん草などを積極的に取り入れて。" },
  ],
};

const warningSignals = [
  "10ヶ月を過ぎてもはいはいの兆候がない（ずりばいも含めて）",
  "つかまり立ちをしようとしない",
  "片側の手足だけを使う傾向が強い",
  "食べ物を丸飲みし、噛む動作がほとんどない",
  "指さしをしない・大人の指さした方向を見ない",
  "呼名に反応しない",
];

const connectionToNext = {
  points: [
    "はいはいで鍛えた肩・腕の筋力 → スプーンを握って食べる力に",
    "つかまり立ち・伝い歩き → 独立歩行へ",
    "前歯の噛みとり → 奥歯でのすりつぶし咀嚼（噛む力の完成）へ",
    "指さし + 発声 → 意味のある初語（「ママ」「ワンワン」）へ",
    "手づかみ食べの巧みさ → スプーン・フォークの操作へ",
  ],
};

export default function Stage4Page() {
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
            <span className="text-foreground">STAGE 04</span>
          </nav>

          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs">運動</Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-xs">摂食</Badge>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground text-lg font-bold font-mono shrink-0">
                04
              </span>
              <div>
                <p className="text-xs font-mono text-muted-foreground">10〜12ヶ月</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  はいはいとつかまり立ち
                </h1>
              </div>
            </div>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              自分の力で空間を移動し、立ち上がる。「自分でやりたい」の意欲が身体の発達を加速させます。
              手づかみ食べが本格化し、前歯で噛みとる力が育つ時期です。
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

          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🥄</span>{feedingGuide.title}
            </h2>
            <div className="space-y-3">
              {feedingGuide.points.map((p, i) => (
                <Card key={p.label} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{p.label}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.detail}</p>
                      </div>
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
                <p className="text-sm text-muted-foreground mb-3">以下のサインが気になる場合は、専門家に相談してみてください。</p>
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

          <hr className="border-border/50 my-10" />

          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔗</span>次のステージへのつながり
            </h2>
            <Card className="bg-komorebi-light/20 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {connectionToNext.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary mt-0.5 shrink-0">→</span>{p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* PDFダウンロード */}
          <div className="mt-8">
            <PdfDownloadSection
              title="STAGE 04 はいはいとつかまり立ち"
              catchcopy="10〜12ヶ月 空間を自分で切りひらく"
              description="はいはい〜つかまり立ちのチェック、手づかみ食べ、タッチ技法をまとめました。"
              pdfPath="/pdf/body-harmony-stage4.pdf"
              usageTips={[
                { icon: "print", text: "安全対策の確認に" },
                { icon: "share", text: "保育園と情報共有" },
                { icon: "other", text: "手づかみ食べガイド付き" },
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
            <Link href="/learn/body-harmony/stage-5" className={buttonVariants({ variant: "default" })}>
              次のステージ：13〜18ヶ月 →
            </Link>
            <Link href="/learn/body-harmony/stage-3" className={buttonVariants({ variant: "outline" })}>
              ← 前のステージ
            </Link>
            <Link href="/learn/body-harmony" className={buttonVariants({ variant: "ghost" })}>
              身体調和ガイドに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
