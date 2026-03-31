import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "STAGE 02｜4〜6ヶ月 首すわりと寝返りの時期｜身体調和ガイド",
  description:
    "生後4〜6ヶ月の発達ガイド。首すわり、寝返り、離乳食の準備。重力との対話が始まる大切な時期を解説。",
};

const milestones = [
  {
    category: "運動",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "首がしっかりすわっている", detail: "縦抱きにしても頭がグラグラしない状態。うつぶせで頭を45〜90度持ち上げ、左右を見回せます。" },
      { text: "うつぶせで胸まで持ち上げる", detail: "腕で身体を支える力がつき、視界が広がります。この姿勢が肩まわりの筋力を育てます。" },
      { text: "寝返り（片方向 → 両方向）", detail: "最初は偶然から。体幹の回旋運動を習得する過程で、全身の筋肉の協調性が飛躍的に高まります。" },
      { text: "足を掴む・口に持っていく", detail: "身体の柔軟性と体幹の安定性を示すサイン。自分の身体を探索しています。" },
      { text: "手を伸ばしてものを掴む", detail: "「見る→手を伸ばす→掴む」の一連の流れ。目と手の協調（eye-hand coordination）の始まりです。" },
    ],
  },
  {
    category: "感覚統合",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "おもちゃを両手で持ち替える", detail: "左右の手の協調。脳の左右半球をつなぐ脳梁の発達を反映しています。" },
      { text: "声のする方に素早く振り向く", detail: "聴覚の定位が正確になり、音の方向を瞬時に判断できるように。" },
      { text: "人の表情を読み取り始める", detail: "笑顔に笑顔で返す、怒った顔に不安を示すなど。社会的な感覚の統合が進んでいます。" },
    ],
  },
  {
    category: "摂食",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "よだれが増える", detail: "唾液腺の発達サイン。消化酵素が増え、離乳食を受け入れる準備が進んでいます。" },
      { text: "大人の食事をじっと見る", detail: "食への興味の芽生え。口をもぐもぐ動かす模倣が見られることも。" },
      { text: "スプーンを唇で取り込む準備がある", detail: "上唇が下に降りてスプーンの食べ物を取り込む動き。離乳食開始の目安の一つです。" },
    ],
  },
  {
    category: "呼吸",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "声を出して笑う", detail: "「あー」「きゃー」など。呼気のコントロールが育ち、呼吸と発声の協調が始まっています。" },
      { text: "鼻呼吸が安定して維持されている", detail: "口を閉じた状態が自然で、哺乳時以外は鼻で呼吸できている。" },
    ],
  },
];

const touchTechniques = [
  {
    title: "うつぶせ時間の段階的な延長",
    when: "起きていて機嫌のよい時間帯",
    how: "目の前におもちゃを置き、興味を引きながらうつぶせに。最初は1〜2分から、徐々に5〜10分へ。嫌がったら仰向けに戻す。",
    duration: "1回5〜10分、1日に数回",
    icon: "👶",
  },
  {
    title: "寝返り誘導のタッチ",
    when: "仰向けで遊んでいるとき",
    how: "片側の腰に手を添え、ゆっくり横向きに。おもちゃを反対側に置いて視線を誘導。赤ちゃんが自分で回転しきるのを待つ。",
    duration: "数回（左右交互に）",
    icon: "🔄",
  },
  {
    title: "手のひら・指の刺激",
    when: "遊びの時間",
    how: "さまざまな素材（布・木・シリコン）のおもちゃを握らせる。握る→離すの練習が、将来のスプーン操作の基礎になります。",
    duration: "遊びの中で自然に",
    icon: "✋",
  },
  {
    title: "足裏・足首のマッサージ",
    when: "おむつ替えのとき",
    how: "足裏を親指でゆっくり刺激し、足首をやさしく回す。将来の立位・歩行に必要な足の感覚を育てます。",
    duration: "1〜2分",
    icon: "🦶",
  },
  {
    title: "体幹のゆらゆら遊び",
    when: "抱っこのとき",
    how: "赤ちゃんを膝の上に座らせ（首を支えながら）、ゆっくり左右に傾ける。バランス感覚（前庭覚）を刺激します。",
    duration: "1〜2分",
    icon: "🫨",
  },
];

const feedingReadiness = {
  title: "離乳食スタートの見きわめ",
  intro: "一般的に5〜6ヶ月頃が開始の目安ですが、月齢だけでなく「身体の準備」で判断することが大切です。",
  signs: [
    { label: "首がしっかりすわっている", why: "飲み込みの安全のために必須。首が不安定だと誤嚥のリスクが上がります。" },
    { label: "支えがあれば座れる", why: "体幹が安定していると、食べ物を口の中で処理しやすくなります。" },
    { label: "大人の食事に興味を示す", why: "口をもぐもぐ動かす、手を伸ばすなどのサインが見られたら準備OK。" },
    { label: "舌で押し出す反射が弱まっている", why: "哺乳反射（舌挺出反射）が残っていると、スプーンの食べ物を押し出してしまいます。" },
    { label: "スプーンを唇で取り込める", why: "上唇が下りてきて食べ物をすくい取る動きができることが理想的です。" },
  ],
};

const warningSignals = [
  "4ヶ月を過ぎても首がすわらない",
  "うつぶせを極端に嫌がり、頭を全く持ち上げない",
  "片方の手しか使わない（左右差が顕著）",
  "おもちゃに手を伸ばそうとしない",
  "音や声にほとんど反応しない",
  "身体が常に反り返っている（過緊張の可能性）",
];

const connectionToNext = {
  points: [
    "安定した首すわり → おすわりへの準備が整う",
    "寝返りの体幹回旋 → ずりばい・はいはいの推進力に",
    "手で掴む力 → 手づかみ食べの土台",
    "スプーンの受け入れ → 離乳食中期（舌で押しつぶす）へスムーズに移行",
    "声を出して笑う → 喃語（「ばばば」「まままm」）への発展",
  ],
};

export default function Stage2Page() {
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
            <span className="text-foreground">STAGE 02</span>
          </nav>

          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs">運動</Badge>
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 border text-xs">感覚統合</Badge>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground text-lg font-bold font-mono shrink-0">
                02
              </span>
              <div>
                <p className="text-xs font-mono text-muted-foreground">4〜6ヶ月</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  首すわりと寝返りの時期
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              重力との対話が本格的に始まります。首がすわり、世界が「縦」に広がる。
              寝返りという全身運動を習得し、自分の身体を「動かせる」ことを発見する時期です。
              離乳食の準備もここから。
            </p>
          </section>

          {/* マイルストーン */}
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
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed pl-5">
                            {item.detail}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          {/* やさしいタッチ */}
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

          {/* 離乳食の準備 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🥄</span>
              {feedingReadiness.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {feedingReadiness.intro}
            </p>
            <div className="space-y-3">
              {feedingReadiness.signs.map((s, i) => (
                <Card key={s.label} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{s.label}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.why}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          {/* 相談のめやす */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⚠️</span>
              相談のめやす
            </h2>
            <Card className="bg-muted/30 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  以下のサインが気になる場合は、かかりつけの小児科医や保健師さんに相談してみてください。
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

          {/* 次のステージへ */}
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

          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              このページは一般的な発達の目安です。発達の時期には個人差があります。
              気になることがあれば、かかりつけの小児科医・作業療法士・保健センターにご相談ください。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/body-harmony/stage-3" className={buttonVariants({ variant: "default" })}>
              次のステージ：7〜9ヶ月 →
            </Link>
            <Link href="/learn/body-harmony/stage-1" className={buttonVariants({ variant: "outline" })}>
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
