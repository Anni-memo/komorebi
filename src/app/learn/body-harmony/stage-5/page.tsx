import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "STAGE 05｜13〜18ヶ月 歩行の確立と食べる力｜身体調和ガイド",
  description:
    "生後13〜18ヶ月の発達ガイド。独立歩行、スプーンの練習、奥歯の咀嚼、口呼吸の注意点を解説。",
};

const milestones = [
  {
    category: "運動",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "一人歩きが安定する", detail: "最初はよちよちでも、数週間で急速に安定します。転んでも手をついて身体を守れるようになります。" },
      { text: "しゃがんで立ち上がれる", detail: "膝を曲げてしゃがみ、ものを拾って立ち上がる。下半身の筋力と体幹のバランスが統合された動きです。" },
      { text: "階段をのぼろうとする（四つばい）", detail: "手と足を交互に使って段差を攻略。高さへの挑戦は空間認識と運動計画の発達を示します。" },
      { text: "ボールを蹴ろうとする", detail: "片足で立ち、もう片方を振る動作。高度なバランス制御の始まりです。" },
    ],
  },
  {
    category: "摂食",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "スプーンを使おうとする", detail: "握りは上からの「手づかみ握り」で十分。食べ物をすくって口に運ぶ一連の動作が、目と手と口の高度な協調です。" },
      { text: "奥歯ですりつぶすように噛む", detail: "第一乳臼歯が生え始め、奥歯でのすりつぶし咀嚼が可能に。食べられる食材の幅が大きく広がります。" },
      { text: "ストロー・コップ飲みが安定する", detail: "ストローは唇を丸める、コップは唇を広げる——異なる口の使い方を場面に応じて切り替えられます。" },
      { text: "好き嫌いが出始める", detail: "味覚と自我の発達の現れ。無理に食べさせず、繰り返し出し続けることで受け入れが広がります。" },
    ],
  },
  {
    category: "呼吸",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "意味のある単語が出る", detail: "「ママ」「ワンワン」「マンマ」など。呼気の制御と口の形の組み合わせが言葉を生み出しています。" },
      { text: "口呼吸の習慣に注意が必要", detail: "歩行が始まり活動量が増えると口呼吸になりやすい。口がいつも開いていないか観察してください。" },
    ],
  },
  {
    category: "感覚統合",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "積み木を2〜3個積む", detail: "目と手の協調に加え、「そっと離す」という力加減の制御。微細運動の重要なマイルストーンです。" },
      { text: "クレヨンで殴り書きをする", detail: "「道具を使って痕跡を残す」体験。握る力、腕の振り、視覚のフィードバックが統合されています。" },
      { text: "簡単な指示を理解して行動する", detail: "「持ってきて」「座って」など。言語理解と身体の動作を結びつける高度な統合です。" },
    ],
  },
];

const touchTechniques = [
  {
    title: "でこぼこ道を歩く",
    when: "外遊び・室内",
    how: "芝生・砂場・畳・マットなど異なる地面を歩かせる。足裏からの感覚入力がバランスと歩行の質を高めます。",
    duration: "散歩の中で自然に",
    icon: "🥾",
  },
  {
    title: "坂道・段差のぼり",
    when: "外遊び・公園",
    how: "ゆるやかな坂道を自力で登る。急な段差は四つばいで。重心移動と筋力のトレーニングです。",
    duration: "5〜10分",
    icon: "⛰️",
  },
  {
    title: "スプーン練習の環境づくり",
    when: "食事の時間",
    how: "すくいやすい深めの皿、曲がるスプーン、滑り止めマット。道具を工夫すると自分で食べる成功体験が増えます。",
    duration: "食事時間全体",
    icon: "🥄",
  },
  {
    title: "口の体操あそび",
    when: "遊びの時間・食事前",
    how: "シャボン玉（吹く力）、ラッパのおもちゃ（唇を丸める）、ストローで紙を吸い上げる遊び。口まわりの筋肉を楽しく鍛えます。",
    duration: "数分",
    icon: "🫧",
  },
  {
    title: "全身を使う遊び",
    when: "室内・外遊び",
    how: "トンネルくぐり、低い台からジャンプ（大人が手を持つ）、ダンス。多様な動きが運動プログラムを豊かにします。",
    duration: "10〜15分",
    icon: "🤸",
  },
];

const breathingAlert = {
  title: "口呼吸に気づくポイント",
  intro: "この時期に口呼吸が習慣化すると、歯並び・顔の発育・睡眠の質・集中力に長期的な影響があります。",
  signs: [
    "日中、口がいつも開いている",
    "食事中にくちゃくちゃ音を立てる（口を閉じて噛めない）",
    "夜間のいびきが目立つ",
    "唇が乾燥しやすい",
    "風邪をひきやすい（鼻のフィルター機能が使われていない）",
  ],
  actions: [
    "鼻づまりがあれば耳鼻科に相談（アデノイド・扁桃肥大の確認）",
    "食事は口を閉じて噛む習慣づけ（かたい食材を取り入れる）",
    "口を使う遊び（シャボン玉・ラッパ）で口輪筋を鍛える",
    "おしゃぶりの長期使用は控える（開咬のリスク）",
  ],
};

const warningSignals = [
  "15ヶ月を過ぎても歩かない",
  "歩き方が極端に不安定・左右差がある",
  "意味のある単語が一つも出ない",
  "指さしをしない・大人の言葉にほとんど反応しない",
  "食べ物をほとんど噛まず丸飲みする",
  "常に口が開いている・いびきがひどい",
];

const connectionToNext = {
  points: [
    "安定した歩行 → 走る・跳ぶ・登るなど全身運動の多様化",
    "奥歯のすりつぶし → 大人と同じ形状の食事へ移行",
    "スプーン操作 → フォーク・箸への段階的な移行",
    "初語の出現 → 二語文・三語文（語彙の爆発期）へ",
    "口まわりの筋力 → 発音の正確さ・口腔機能の完成",
  ],
};

export default function Stage5Page() {
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
            <span className="text-foreground">STAGE 05</span>
          </nav>

          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs">運動</Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-xs">摂食</Badge>
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 border text-xs">呼吸</Badge>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground text-lg font-bold font-mono shrink-0">
                05
              </span>
              <div>
                <p className="text-xs font-mono text-muted-foreground">13〜18ヶ月</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  歩行の確立と食べる力
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              自立への最初の飛躍。二本の足で世界を歩き、スプーンを握り、言葉で気持ちを伝え始める。
              0〜12ヶ月で積み上げた土台が「できること」に変わり始める時期です。
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

          {/* 口呼吸アラート */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>👄</span>{breathingAlert.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{breathingAlert.intro}</p>

            <Card className="bg-sky-50/50 border-sky-200 shadow-none mb-4">
              <CardContent className="pt-5">
                <h3 className="font-semibold text-foreground text-sm mb-3">こんなサインに注意</h3>
                <ul className="space-y-2">
                  {breathingAlert.signs.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-sky-500 mt-0.5 shrink-0">&#9679;</span>{s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-komorebi-light/20 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <h3 className="font-semibold text-foreground text-sm mb-3">できること</h3>
                <ul className="space-y-2">
                  {breathingAlert.actions.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary mt-0.5 shrink-0">&#10003;</span>{a}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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

          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              このページは一般的な発達の目安です。発達の時期には個人差があります。
              気になることがあれば、かかりつけの小児科医・作業療法士・保健センターにご相談ください。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/body-harmony/stage-6" className={buttonVariants({ variant: "default" })}>
              次のステージ：19〜36ヶ月 →
            </Link>
            <Link href="/learn/body-harmony/stage-4" className={buttonVariants({ variant: "outline" })}>
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
