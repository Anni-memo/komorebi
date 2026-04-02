import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { PdfDownloadSection } from "@/components/pdf-download-section";

export const metadata = {
  title: "STAGE 03｜7〜9ヶ月 おすわりと離乳食中期｜身体調和ガイド",
  description:
    "生後7〜9ヶ月の発達ガイド。おすわりの安定、ずりばい、舌の上下運動と離乳食中期の関係を解説。",
};

const milestones = [
  {
    category: "運動",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "支えなしで安定して座れる", detail: "体幹の筋力が十分に育ち、両手が自由に。この姿勢が手の探索活動を爆発的に増やします。" },
      { text: "ずりばいで移動する", detail: "腕と体幹を使って前進する最初の移動手段。はいはいの準備段階として全身の筋力を鍛えます。" },
      { text: "四つばいの姿勢を取る（前後に揺れる）", detail: "はいはいの直前段階。重心移動と四肢の協調を身体で学んでいます。" },
      { text: "小さなものを親指と人差し指でつまむ", detail: "粗大把握から精密把握への移行。手づかみ食べや、将来の箸・鉛筆操作の土台です。" },
    ],
  },
  {
    category: "摂食",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "舌を上下に動かして食べ物を押しつぶせる", detail: "前後運動だけだった舌が上下にも動くように。舌で上あごに食べ物を押し付けてつぶします。" },
      { text: "口を左右に動かし始める", detail: "食べ物を舌で歯ぐきの方に移動させる準備。噛む力の発達に直結します。" },
      { text: "コップから一口飲む練習ができる", detail: "唇を閉じて液体をすする動き。ストロー飲みとは異なる口の使い方を学びます。" },
      { text: "手づかみ食べに興味を示す", detail: "自分で食べたい意欲の現れ。食べ物の感触・温度・形を手で学ぶ感覚統合の経験でもあります。" },
    ],
  },
  {
    category: "感覚統合",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "ものを打ち合わせて音を出す", detail: "両手を中心線で合わせる動作。視覚・聴覚・触覚・固有受容覚の統合です。" },
      { text: "人見知りが始まる", detail: "「知っている人」と「知らない人」を区別できるようになった証拠。社会的認知の発達です。" },
      { text: "いないいないばあに反応する", detail: "「消えたものが存在し続ける」という対象の永続性の理解。認知発達の重要なマイルストーン。" },
    ],
  },
  {
    category: "呼吸",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "反復喃語が出る（「ばばば」「まままm」）", detail: "呼気を細かくコントロールして音を区切る力。呼吸と発声の協調がさらに精密になっています。" },
      { text: "食事中も鼻呼吸を維持できる", detail: "口で食べながら鼻で呼吸する。哺乳時代に培った「吸啜・嚥下・呼吸」の協調の進化形です。" },
    ],
  },
];

const touchTechniques = [
  {
    title: "おすわりバランス遊び",
    when: "床で遊ぶ時間",
    how: "座った状態の赤ちゃんの周りにおもちゃを置き、手を伸ばして取る動きを促す。体幹のバランス反応を鍛えます。",
    duration: "遊びの中で5〜10分",
    icon: "🧸",
  },
  {
    title: "ずりばい誘導",
    when: "うつぶせの時間",
    how: "少し手の届かない位置にお気に入りのおもちゃを置く。足裏に手を添えて蹴る感覚を教えると、前進のきっかけに。",
    duration: "数分（無理させない）",
    icon: "🎯",
  },
  {
    title: "口まわりの感覚遊び",
    when: "食事の前後",
    how: "歯固めや冷やしたシリコンスプーンを噛ませる。口の中のさまざまな場所に触れることで、舌と顎の動きを刺激。",
    duration: "自由に",
    icon: "🦷",
  },
  {
    title: "手指の分離運動あそび",
    when: "遊びの時間",
    how: "ボールを渡す、小さなものをつまませる、容器に入れるなど。親指と人差し指を独立して動かす経験を増やします。",
    duration: "遊びの中で自然に",
    icon: "🫳",
  },
  {
    title: "揺れ遊び（前庭覚刺激）",
    when: "抱っこ・膝の上",
    how: "膝の上に座らせてゆっくり前後左右に傾ける、「たかいたかい」をゆっくりやる。バランス感覚と空間認識を育てます。",
    duration: "1〜3分",
    icon: "🎠",
  },
];

const feedingGuide = {
  title: "離乳食中期のポイント",
  points: [
    { label: "舌でつぶせるかたさが目安", detail: "豆腐くらいのかたさ。舌を上あごに押し付けてつぶす練習です。やわらかすぎると舌の運動が育ちません。" },
    { label: "2回食へのステップアップ", detail: "1回食が安定したら、午前と午後の2回に。生活リズムと消化器官の成長を同時に促します。" },
    { label: "食材の種類を広げる", detail: "タンパク質（白身魚→赤身魚→鶏ささみ）を段階的に。新しい食材は1種類ずつ、午前中に試す。" },
    { label: "手づかみメニューを取り入れ始める", detail: "おにぎり・野菜スティックなど。「自分で食べる」経験が、手と口の協調を加速させます。" },
    { label: "スプーンは下唇に置く", detail: "上唇が自発的に降りてきて取り込むのを待つ。スプーンを口の奥に入れてしまうと、唇の運動が育ちません。" },
  ],
};

const warningSignals = [
  "7ヶ月を過ぎても支えなしで座れない",
  "一方の手だけで動作し、もう片方をほとんど使わない",
  "食べ物を口に入れても舌で押し出してしまう（舌挺出反射が強い）",
  "名前を呼んでも振り向かない",
  "喃語がほとんど出ない",
  "極端に人見知りがない（誰にでも無反応）",
];

const connectionToNext = {
  points: [
    "安定したおすわり → 両手が自由に → 手づかみ食べが本格化",
    "ずりばい → 四つばいはいはいへ → 全身の筋力が飛躍的に向上",
    "舌の上下運動 → 左右運動へ → 噛むための舌の使い方が完成に近づく",
    "精密把握（つまむ力） → 小さな食べ物を自分で食べる → スプーンを握る準備",
    "反復喃語 → 意味のある音（指さし+「あ！」） → 初語へ",
  ],
};

export default function Stage3Page() {
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
            <span className="text-foreground">STAGE 03</span>
          </nav>

          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-xs">摂食</Badge>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs">運動</Badge>
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 border text-xs">感覚統合</Badge>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground text-lg font-bold font-mono shrink-0">
                03
              </span>
              <div>
                <p className="text-xs font-mono text-muted-foreground">7〜9ヶ月</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  おすわりと離乳食中期
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              安定したおすわりが両手の自由を生み、探索活動が爆発します。
              舌は上下にも動くようになり、食べ物を「押しつぶす」力が育つ時期。
              手と口の連携が加速し、「自分でやりたい」意欲が芽生えます。
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              この時期のマイルストーン
            </h2>
            <div className="space-y-6">
              {milestones.map((group) => (
                <div key={group.category}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${group.color} border text-xs`}>{group.category}</Badge>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <Card key={item.text} className={`shadow-none border-l-4 ${group.borderColor} border-t-0 border-r-0 border-b-0`}>
                        <CardContent className="pt-4 pb-4">
                          <h3 className="font-semibold text-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-0.5 shrink-0">&#9675;</span>
                            {item.text}
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
              <span aria-hidden>🤲</span>
              この時期のやさしいタッチ
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
              <span aria-hidden>🥄</span>
              {feedingGuide.title}
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
              <span aria-hidden>⚠️</span>
              相談のめやす
            </h2>
            <Card className="bg-muted/30 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  以下のサインが気になる場合は、専門家に相談してみてください。
                </p>
                <ul className="space-y-2">
                  {warningSignals.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-amber-500 mt-0.5 shrink-0">&#9888;</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <hr className="border-border/50 my-10" />

          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔗</span>
              次のステージへのつながり
            </h2>
            <Card className="bg-komorebi-light/20 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {connectionToNext.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary mt-0.5 shrink-0">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* PDFダウンロード */}
          <div className="mt-8">
            <PdfDownloadSection
              title="STAGE 03 おすわりと離乳食中期"
              catchcopy="7〜9ヶ月 手と口の連携が加速する"
              description="おすわりチェック、離乳食中期のポイント、タッチ技法をまとめました。"
              pdfPath="/pdf/body-harmony-stage3.pdf"
              usageTips={[
                { icon: "print", text: "離乳食の参考に" },
                { icon: "share", text: "祖父母にも共有" },
                { icon: "other", text: "発達チェック欄付き" },
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
            <Link href="/learn/body-harmony/stage-4" className={buttonVariants({ variant: "default" })}>
              次のステージ：10〜12ヶ月 →
            </Link>
            <Link href="/learn/body-harmony/stage-2" className={buttonVariants({ variant: "outline" })}>
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
