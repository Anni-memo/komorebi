import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "身体調和ガイド｜赤ちゃんの発達を月齢で知る",
  description:
    "呼吸・摂食・運動・感覚統合の4領域から、赤ちゃんの身体発達を月齢別に整理。首すわり、離乳食、はいはい——それぞれの「なぜ今」がわかるガイド。",
};

/* ─── 4つの支援領域 ─── */
const domains = [
  {
    id: "breathing",
    icon: "🌬️",
    label: "呼吸",
    color: "bg-sky-100 text-sky-700 border-sky-200",
    accent: "border-sky-300",
    description:
      "安定した呼吸は、すべての発達の土台。鼻呼吸が定着すると、哺乳・睡眠・情緒が安定します。",
  },
  {
    id: "feeding",
    icon: "🍼",
    label: "摂食",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    accent: "border-amber-300",
    description:
      "舌の使い方、唇の閉じ方、噛む力。口の発達は言葉の発達にもつながる大切な連鎖です。",
  },
  {
    id: "motor",
    icon: "🤸",
    label: "運動",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    accent: "border-emerald-300",
    description:
      "首すわり→寝返り→おすわり→はいはい→歩行。一つひとつの動きが、次の動きの準備になっています。",
  },
  {
    id: "sensory",
    icon: "🫧",
    label: "感覚統合",
    color: "bg-violet-100 text-violet-700 border-violet-200",
    accent: "border-violet-300",
    description:
      "触れる・揺れる・見る・聞く。感覚を統合する力が育つと、身体の使い方が滑らかになります。",
  },
];

/* ─── 6つのステージ（月齢区分） ─── */
const stages = [
  {
    id: "stage-1",
    number: "01",
    age: "0〜3ヶ月",
    title: "呼吸と哺乳の基盤づくり",
    subtitle: "生きる力の最初の一歩",
    tags: ["呼吸", "摂食"],
    tagColors: ["bg-sky-100 text-sky-700", "bg-amber-100 text-amber-700"],
    summary:
      "鼻呼吸の安定、哺乳のリズム、手足のばたつき。まだ目に見えにくい時期ですが、すべての発達はここから始まっています。",
    milestones: [
      "鼻呼吸が安定している",
      "哺乳時に唇をしっかり閉じられる",
      "手を口に持っていく動作がある",
      "あやすと目を合わせる",
      "うつぶせで一瞬頭を上げようとする",
    ],
    keyInsight:
      "この時期の「やさしいタッチ」は、赤ちゃんの身体が外の世界に慣れる手助けになります。",
  },
  {
    id: "stage-2",
    number: "02",
    age: "4〜6ヶ月",
    title: "首すわりと寝返りの時期",
    subtitle: "重力との対話がはじまる",
    tags: ["運動", "感覚統合"],
    tagColors: ["bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700"],
    summary:
      "首がすわり、世界が「縦」に広がります。寝返りは全身の筋肉を協調させる最初の大技。離乳食の準備も始まる頃です。",
    milestones: [
      "首がしっかりすわっている",
      "うつぶせで胸を持ち上げる",
      "寝返り（片方向 → 両方向）",
      "手を伸ばしてものを掴む",
      "足を口に持っていく（体幹の柔軟性）",
      "スプーンを唇で取り込む準備がある",
    ],
    keyInsight:
      "首すわりが十分でないまま離乳食を始めると、飲み込みがうまくいかないことがあります。運動と摂食は連動しています。",
  },
  {
    id: "stage-3",
    number: "03",
    age: "7〜9ヶ月",
    title: "おすわりと離乳食中期",
    subtitle: "手と口の連携が加速する",
    tags: ["摂食", "運動", "感覚統合"],
    tagColors: [
      "bg-amber-100 text-amber-700",
      "bg-emerald-100 text-emerald-700",
      "bg-violet-100 text-violet-700",
    ],
    summary:
      "安定したおすわりが、両手の自由を生みます。舌は前後だけでなく上下にも動くように。食材をつぶす力が育ちます。",
    milestones: [
      "支えなしで座っていられる",
      "ずりばいで移動する",
      "親指と他の指でものをつまめる",
      "舌で食べ物を上あごに押しつぶせる",
      "コップから一口飲む練習ができる",
      "「ばばば」「まままm」など反復喃語が出る",
    ],
    keyInsight:
      "舌の上下運動は、将来の「噛む力」と「はっきり話す力」の両方につながります。離乳食は口の運動トレーニングでもあります。",
  },
  {
    id: "stage-4",
    number: "04",
    age: "10〜12ヶ月",
    title: "はいはいとつかまり立ち",
    subtitle: "空間を自分で切りひらく",
    tags: ["運動", "摂食"],
    tagColors: ["bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700"],
    summary:
      "はいはいで体幹と腕の力が鍛えられ、つかまり立ちへ。手づかみ食べが始まり、「自分で食べたい」意欲が育ちます。",
    milestones: [
      "四つばいではいはいができる",
      "家具につかまって立ち上がる",
      "手づかみで食べ物を口に運ぶ",
      "前歯で噛みとる動作がある",
      "指さしで意思を伝える",
      "簡単な言葉を理解している（「ちょうだい」など）",
    ],
    keyInsight:
      "はいはいを十分に経験すると、肩まわりの筋力が育ち、将来のスプーンや鉛筆の操作がスムーズになります。",
  },
  {
    id: "stage-5",
    number: "05",
    age: "13〜18ヶ月",
    title: "歩行の確立と食べる力",
    subtitle: "自立への最初の飛躍",
    tags: ["運動", "摂食", "呼吸"],
    tagColors: [
      "bg-emerald-100 text-emerald-700",
      "bg-amber-100 text-amber-700",
      "bg-sky-100 text-sky-700",
    ],
    summary:
      "歩行が安定し、行動範囲が爆発的に広がります。奥歯が生え始め、すりつぶす咀嚼ができるように。口呼吸の習慣に注意が必要な時期です。",
    milestones: [
      "一人歩きが安定する",
      "しゃがんで立ち上がれる",
      "スプーンを使おうとする",
      "奥歯ですりつぶすように噛む",
      "ストロー・コップ飲みができる",
      "意味のある単語が出る（「ママ」「ワンワン」）",
    ],
    keyInsight:
      "この時期に口がいつも開いていたら要注意。鼻呼吸の習慣は、歯並び・顔の発達・集中力にも影響します。",
  },
  {
    id: "stage-6",
    number: "06",
    age: "19〜36ヶ月",
    title: "走る・噛む・話す",
    subtitle: "身体の調和が花ひらく",
    tags: ["運動", "摂食", "感覚統合", "呼吸"],
    tagColors: [
      "bg-emerald-100 text-emerald-700",
      "bg-amber-100 text-amber-700",
      "bg-violet-100 text-violet-700",
      "bg-sky-100 text-sky-700",
    ],
    summary:
      "走る・跳ぶ・登るといった全身運動が豊かになり、食事では大人に近い咀嚼ができるように。言葉が爆発的に増え、4領域すべてが統合されていきます。",
    milestones: [
      "走る・階段を登る（手すりあり）",
      "ジャンプする",
      "大人と同じ形状の食事を噛んで食べられる",
      "二語文・三語文が出る",
      "クレヨンで丸を描く",
      "着替えを自分でやろうとする",
    ],
    keyInsight:
      "0〜18ヶ月で積み上げた4領域の土台が、この時期に「できること」として目に見える形になります。",
  },
];

/* ─── 発達の連鎖（なぜつながるのか） ─── */
const chains = [
  {
    from: "鼻呼吸の安定",
    to: "哺乳がスムーズに",
    why: "鼻で息をしながら飲めるから",
    color: "border-l-sky-400",
  },
  {
    from: "哺乳時の舌の動き",
    to: "離乳食で舌を使える",
    why: "前後→上下→左右と舌の運動が段階的に育つ",
    color: "border-l-amber-400",
  },
  {
    from: "首すわり",
    to: "安全に飲み込める",
    why: "頭が安定すると喉の筋肉も協調する",
    color: "border-l-emerald-400",
  },
  {
    from: "はいはい",
    to: "肩・腕の筋力が育つ",
    why: "体重を腕で支える経験がスプーンや鉛筆の操作につながる",
    color: "border-l-emerald-400",
  },
  {
    from: "噛む練習（離乳食後期）",
    to: "はっきり話せるようになる",
    why: "咀嚼で鍛えた口の筋肉が、発音の正確さを支える",
    color: "border-l-amber-400",
  },
  {
    from: "感覚遊び（触る・揺れる）",
    to: "バランス感覚の発達",
    why: "前庭覚・固有受容覚が育つと、座る・立つ・歩くが安定する",
    color: "border-l-violet-400",
  },
];

/* ─── 家庭でできること ─── */
const homeActions = [
  {
    title: "やさしく触れる",
    detail:
      "お風呂あがりや着替えのとき、手足・おなか・背中をゆっくりなでる。赤ちゃんの身体認識を育てます。",
    icon: "🤲",
  },
  {
    title: "うつぶせ時間をつくる",
    detail:
      "起きているときに短時間のうつぶせを。首・背中・腕の力が育ちます。嫌がったら無理せず短く。",
    icon: "👶",
  },
  {
    title: "口まわりのタッチ",
    detail:
      "授乳前に唇のまわりをやさしくトントン。哺乳の準備運動になり、舌の動きを引き出します。",
    icon: "👄",
  },
  {
    title: "話しかける・歌う",
    detail:
      "声のリズムが呼吸のリズムを整えます。赤ちゃんは声を聴きながら、口の動きも学んでいます。",
    icon: "🎵",
  },
  {
    title: "抱っこのバリエーション",
    detail:
      "縦抱き・横抱き・向かい合わせ。抱き方を変えると、赤ちゃんが使う筋肉も変わります。",
    icon: "🫂",
  },
  {
    title: "「待つ」を大切に",
    detail:
      "寝返りやおすわりを「させる」のではなく、赤ちゃんが自分で到達するのを見守る。プロセスそのものが発達です。",
    icon: "🕊️",
  },
];

export default function BodyHarmonyPage() {
  return (
    <>
      <ArticleJsonLd
        title="身体調和ガイド｜赤ちゃんの発達を月齢で知る"
        description="呼吸・摂食・運動・感覚統合の4領域から、赤ちゃんの身体発達を月齢別に整理。首すわり、離乳食、はいはい——それぞれの「なぜ今」がわかるガイド。"
        path="/learn/body-harmony"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["身体発達", "赤ちゃん 発達", "月齢別"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">

          {/* ── ヒーロー ── */}
          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">身体発達</Badge>
              <Badge variant="secondary">0〜3歳</Badge>
              <Badge variant="secondary">保存版</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              身体調和ガイド
              <br />
              <span className="text-xl sm:text-2xl font-medium text-muted-foreground">
                赤ちゃんの「できる」が連鎖でつながる
              </span>
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              首がすわる、寝返りする、離乳食を食べる、歩く、話す——。
              赤ちゃんの発達は、一つひとつがバラバラではなく、<strong className="text-foreground">連鎖</strong>しています。
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              このガイドでは、<strong className="text-foreground">呼吸・摂食・運動・感覚統合</strong>の4つの領域から、
              月齢ごとの発達のつながりを整理しました。
              「今、この子に何が起きているのか」を知ることで、不安が安心に変わります。
            </p>
          </section>

          {/* ── 身体調和とは ── */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold">?</span>
              身体調和とは
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  身体調和（Body Harmonizing Support）とは、
                  <strong>赤ちゃんの身体が本来持っている発達の力を、やさしいタッチで引き出す</strong>アプローチです。
                  岐阜県
                  <a href="https://www.city.hida.gifu.jp/site/marugoto/79769.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
                    飛騨市
                  </a>
                  が「まるごと健康増進」の一環として推進しており、乳幼児期の発達支援として注目されています。
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  現代の生活環境では、抱っこ紐やバウンサーの長時間使用、うつぶせ時間の不足など、
                  赤ちゃんが自然に身体を使う機会が減っています。
                  身体調和は、専門家でなくても家庭で実践できる方法で、赤ちゃんの発達を支えます。
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  大切なのは「訓練」ではなく「調和」。
                  赤ちゃんのペースを尊重しながら、身体が自然に次のステップへ向かう手助けをします。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* ── 4つの領域 ── */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔗</span>
              4つの領域
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              身体調和は4つの領域で赤ちゃんの発達を捉えます。
              どれか一つではなく、4つが互いに影響し合いながら育ちます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {domains.map((d) => (
                <Card key={d.id} className={`shadow-none border ${d.accent}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span aria-hidden>{d.icon}</span>
                      <Badge className={`${d.color} border text-xs`}>{d.label}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {d.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 3分で全体像 ── */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🗺️</span>
              3分で全体像をつかむ
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              0〜36ヶ月を6つのステージに分けました。
              それぞれの時期に「何が育っているのか」を大まかに把握できます。
            </p>
            <div className="space-y-3">
              {stages.map((s) => (
                <Link key={s.id} href={`/learn/body-harmony/${s.id}`} className="block">
                  <Card className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5 font-mono">
                          {s.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="outline" className="text-xs font-mono">{s.age}</Badge>
                            {s.tags.map((tag, i) => (
                              <Badge key={tag} className={`${s.tagColors[i]} border-0 text-[10px]`}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="font-semibold text-foreground text-sm">{s.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{s.subtitle}</p>
                        </div>
                        <span className="text-muted-foreground text-sm shrink-0 mt-2">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          {/* ── 月齢別ステージ詳細 ── */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <span aria-hidden>📅</span>
              月齢別ステージ
            </h2>

            <div className="space-y-8">
              {stages.map((s) => (
                <div key={s.id} id={s.id}>
                  {/* ステージヘッダー */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-bold font-mono shrink-0">
                      {s.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{s.age}</span>
                        {s.tags.map((tag, i) => (
                          <Badge key={tag} className={`${s.tagColors[i]} border-0 text-[10px]`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-bold text-foreground">{s.title}</h3>
                    </div>
                  </div>

                  {/* 概要 */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 pl-[52px]">
                    {s.summary}
                  </p>

                  {/* マイルストーン */}
                  <Card className="border-border/50 shadow-none ml-[52px]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs text-muted-foreground font-mono tracking-wider">
                        この時期のマイルストーン
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {s.milestones.map((m) => (
                          <li key={m} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-primary mt-0.5 shrink-0">&#9675;</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* キーインサイト */}
                  <div className="mt-3 ml-[52px] p-3 bg-komorebi-light/20 rounded-lg border border-primary/10">
                    <p className="text-xs text-foreground leading-relaxed">
                      <strong className="text-primary">💡 知っておきたいこと:</strong>{" "}
                      {s.keyInsight}
                    </p>
                  </div>

                  {/* 詳細ページへ */}
                  <div className="mt-3 ml-[52px]">
                    <Link
                      href={`/learn/body-harmony/${s.id}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      {s.age} の詳しいガイドを見る →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              ※ 発達の時期には個人差があります。月齢はあくまで目安であり、
              お子さまのペースを尊重することが最も大切です。
            </p>
          </section>

          <hr className="border-border/50 my-10" />

          {/* ── なぜ「連鎖」なのか ── */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⛓️</span>
              なぜ「連鎖」なのか
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              赤ちゃんの発達は直線ではなく、<strong className="text-foreground">網目のようにつながっています</strong>。
              ある領域の発達が、別の領域の準備になっている——その連鎖を知ると、
              「なぜ今これが大切なのか」が見えてきます。
            </p>
            <div className="space-y-3">
              {chains.map((c, i) => (
                <Card key={i} className={`shadow-none border-l-4 ${c.color} border-t-0 border-r-0 border-b-0`}>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">{c.from}</span>
                      <span className="text-muted-foreground text-xs">→</span>
                      <span className="text-sm font-semibold text-foreground">{c.to}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.why}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          {/* ── 家庭でできること ── */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🏠</span>
              家庭でできること
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              特別な道具や資格は必要ありません。
              毎日のお世話の中で、少し意識を変えるだけで赤ちゃんの発達を支えられます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {homeActions.map((a) => (
                <Card key={a.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0" aria-hidden>{a.icon}</span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{a.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 安心メッセージ ── */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>「うちの子、遅れてるかも」と感じたら。</strong>
                <br />
                発達のスピードは一人ひとり違います。
                <br />
                大切なのは月齢通りかどうかではなく、
                <strong className="text-primary">その子なりの順番で進んでいるか</strong>
                ということ。
                <br />
                気になることがあれば、かかりつけ医や保健師さんに相談してください。
              </p>
            </CardContent>
          </Card>

          {/* ── PDFダウンロード ── */}
          <div className="mt-8">
            <PdfDownloadSection
              title="身体調和ガイド PDF一覧"
              catchcopy="各ステージの発達チェックシートを印刷できます"
              description="各ステージページからA4 1枚のPDFをダウンロードできます。健診や保育園との情報共有にお使いください。"
              pdfPath="/pdf/body-harmony-stage1.pdf"
              usageTips={[
                { icon: "print", text: "月齢に合わせて印刷" },
                { icon: "share", text: "支援者・保育士と共有" },
                { icon: "other", text: "全6ステージ対応" },
              ]}
            />
          </div>

          {/* ── 免責事項 ── */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              このページは一般的な発達の目安を整理したものであり、医療的な診断・助言を目的としたものではありません。
              お子さまの発達に不安がある場合は、かかりつけの小児科医・作業療法士・地域の保健センターにご相談ください。
              身体調和支援（BHS）は
              <a href="https://www.city.hida.gifu.jp/site/marugoto/79769.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
                飛騨市が推進するアプローチ
              </a>
              を参考にしています。
            </p>
          </div>

          {/* ── 導線 ── */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/early-education" className={buttonVariants({ variant: "outline" })}>
              知育ガイドを見る
            </Link>
            <Link href="/concierge" className={buttonVariants({ variant: "ghost" })}>
              AIに相談する
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
