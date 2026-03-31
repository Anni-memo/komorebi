import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "STAGE 01｜0〜3ヶ月 呼吸と哺乳の基盤づくり｜身体調和ガイド",
  description:
    "生後0〜3ヶ月の発達ガイド。鼻呼吸の安定、哺乳のリズム、原始反射の統合など、すべての発達の出発点を解説。",
};

const milestones = [
  {
    category: "呼吸",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "鼻呼吸が安定している", detail: "口を閉じて静かに呼吸できている状態。授乳中も鼻で息ができることが哺乳の質を決めます。" },
      { text: "呼吸のリズムが整ってきている", detail: "新生児期は不規則ですが、徐々に一定のリズムに。腹式呼吸が優位です。" },
      { text: "泣き声が力強い", detail: "泣くことは最初の「呼吸トレーニング」。横隔膜と腹筋を使う全身運動です。" },
    ],
  },
  {
    category: "摂食",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "哺乳時に唇をしっかり閉じられる", detail: "唇の密閉が弱いと空気を飲み込みやすく、お腹の張りやげっぷの原因に。" },
      { text: "舌を前後に動かして吸啜できる", detail: "この「前後運動」が、将来の舌の上下・左右運動の土台になります。" },
      { text: "吸啜・嚥下・呼吸を協調できる", detail: "飲む→飲み込む→息をするの3つを同時にこなす、生後最初の「マルチタスク」です。" },
    ],
  },
  {
    category: "運動",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "手を口に持っていく", detail: "偶然の動きから始まり、自分の身体を発見するプロセス。手と口の協調の始まりです。" },
      { text: "うつぶせで一瞬頭を上げようとする", detail: "首の筋肉を使う最初の試み。毎日少しずつのうつぶせ時間が力を育てます。" },
      { text: "手足をバタバタ動かす", detail: "一見無秩序な動きですが、筋肉と神経のつながりを強化する大切な運動です。" },
      { text: "原始反射が見られる", detail: "モロー反射・把握反射・吸啜反射など。これらが徐々に統合され、随意運動に移行します。" },
    ],
  },
  {
    category: "感覚統合",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "あやすと目を合わせる", detail: "視覚と聴覚の統合。声のする方に顔を向け、目を合わせることで社会性の土台が育ちます。" },
      { text: "触れられると落ち着く", detail: "肌への刺激（触覚）が安心感を生み、ストレスホルモンを下げます。" },
      { text: "音や光に反応する", detail: "感覚入力を受け取り、処理する力が育ち始めています。" },
    ],
  },
];

const touchTechniques = [
  {
    title: "おなかの時計回りマッサージ",
    when: "お風呂あがり・おむつ替えのとき",
    how: "おへそを中心に、手のひら全体でゆっくり時計回りに。ガス抜き・排泄のサポートに。",
    duration: "1〜2分",
    icon: "🫧",
  },
  {
    title: "足裏のやさしい刺激",
    when: "着替えのとき・遊びの時間",
    how: "親指で足裏をかかとからつま先に向かってゆっくりなでる。足の感覚を目覚めさせます。",
    duration: "30秒〜1分（片足ずつ）",
    icon: "🦶",
  },
  {
    title: "口まわりのトントン",
    when: "授乳の5分前",
    how: "唇のまわりを指先でやさしくトントン。哺乳前の「準備運動」として舌と唇の動きを引き出します。",
    duration: "30秒",
    icon: "👄",
  },
  {
    title: "手のひら開きの促し",
    when: "起きているとき",
    how: "握りしめている手を、小指側からそっと開く。把握反射の統合を促し、将来の「つかむ」動作の準備に。",
    duration: "数回繰り返し",
    icon: "🤲",
  },
  {
    title: "背中のストローク",
    when: "うつぶせ時間のあと・泣いているとき",
    how: "背骨に沿って、上から下にやさしくなでる。脊柱まわりの筋肉を刺激し、うつぶせの力を育てます。",
    duration: "1〜2分",
    icon: "🫳",
  },
];

const feedingGuide = {
  title: "この時期の授乳のポイント",
  points: [
    {
      label: "ラッチオン（吸着）",
      detail: "赤ちゃんの口が大きく開いた瞬間に、乳輪まで深く含ませる。浅い吸着は乳首の痛み・空気の飲み込みの原因に。",
    },
    {
      label: "抱き方のバリエーション",
      detail: "横抱き・フットボール抱き・添い乳。抱き方を変えると赤ちゃんの舌の使い方も変わり、口の運動が多様になります。",
    },
    {
      label: "哺乳瓶の場合",
      detail: "乳首の穴が大きすぎると「吸う力」が育ちにくい。低月齢用の乳首を使い、赤ちゃん自身が吸い出す力を引き出す。",
    },
    {
      label: "げっぷの出し方",
      detail: "縦抱きで背中をトントンするだけでなく、少し前かがみにして背中をさする方法も。胃の中の空気が出やすくなります。",
    },
  ],
};

const warningSignals = [
  "哺乳時にむせることが非常に多い",
  "口を大きく開けて呼吸していることが多い（口呼吸が常態化）",
  "手足をほとんど動かさない・反応が乏しい",
  "モロー反射が3ヶ月を過ぎても強く残っている",
  "体重が増えない・哺乳量が極端に少ない",
];

const connectionToNext = {
  title: "次のステージへのつながり",
  points: [
    "鼻呼吸が安定すると → 哺乳がスムーズになり → 体重増加 → 筋力の発達が加速",
    "哺乳で鍛えた舌の前後運動 → 4〜6ヶ月の離乳食開始時にスプーンを受け入れる準備",
    "うつぶせでの頭上げ → 首の筋力 → 4ヶ月頃の首すわりへ",
    "手を口に持っていく動作 → 手と口の協調 → おもちゃを掴んで舐める探索行動へ",
  ],
};

export default function Stage1Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">

          {/* パンくず */}
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-primary transition-colors">学ぶ</Link>
            <span>/</span>
            <Link href="/learn/body-harmony" className="hover:text-primary transition-colors">身体調和ガイド</Link>
            <span>/</span>
            <span className="text-foreground">STAGE 01</span>
          </nav>

          {/* ヘッダー */}
          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 border text-xs">呼吸</Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-xs">摂食</Badge>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground text-lg font-bold font-mono shrink-0">
                01
              </span>
              <div>
                <p className="text-xs font-mono text-muted-foreground">0〜3ヶ月</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  呼吸と哺乳の基盤づくり
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              すべてはここから始まります。鼻で息をする、おっぱいを飲む、手足を動かす——。
              まだ「見えにくい」発達ですが、この3ヶ月で築かれる土台が、
              首すわり・離乳食・歩行のすべてを支えます。
            </p>
          </section>

          {/* マイルストーン（領域別） */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              この時期のマイルストーン
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              4つの領域ごとに、この時期に見られる発達のサインを整理しました。
              すべてが「できている必要」はありません。お子さまのペースを見守ってください。
            </p>

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
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              赤ちゃんが起きていて機嫌のよいときに試してみてください。
              嫌がったらすぐにやめて大丈夫です。
            </p>
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

          {/* 授乳ガイド */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🍼</span>
              {feedingGuide.title}
            </h2>
            <div className="space-y-3">
              {feedingGuide.points.map((p, i) => (
                <Card key={p.label} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
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

          {/* 気をつけたいサイン */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⚠️</span>
              相談のめやす
            </h2>
            <Card className="bg-muted/30 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  以下のサインが気になる場合は、かかりつけの小児科医や保健師さんに相談してみてください。
                  「気になる」だけでも相談して大丈夫です。
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
              {connectionToNext.title}
            </h2>
            <Card className="bg-komorebi-light/20 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  0〜3ヶ月で育った力は、次のステージでこう花開きます：
                </p>
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

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              このページは一般的な発達の目安を整理したものであり、医療的な診断・助言を目的としたものではありません。
              発達の時期には個人差があります。気になることがあれば、かかりつけの小児科医・作業療法士・保健センターにご相談ください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/body-harmony/stage-2" className={buttonVariants({ variant: "default" })}>
              次のステージ：4〜6ヶ月 →
            </Link>
            <Link href="/learn/body-harmony" className={buttonVariants({ variant: "outline" })}>
              身体調和ガイドに戻る
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
