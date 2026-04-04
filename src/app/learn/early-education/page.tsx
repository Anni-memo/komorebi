import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "知育の基本ガイド｜月齢別の発達と遊び",
  description:
    "月齢・年齢別の発達の特徴と、家庭でできる知育遊びを整理。五感・運動・言語・社会性の発達をサポート。",
};

const developmentStages = [
  {
    age: "0〜3ヶ月",
    theme: "視覚・聴覚の発達",
    plays: ["ガラガラを目の前でゆっくり動かす", "モビールを見せる", "たくさん話しかける", "肌のふれあい（抱っこ、なでる）"],
    color: "bg-pink-100 text-pink-700",
  },
  {
    age: "4〜6ヶ月",
    theme: "手で掴む・舐める",
    plays: ["ラトルを握らせる", "布絵本をめくる", "鏡遊び（自分の顔を見せる）", "いろんな素材に触れさせる"],
    color: "bg-orange-100 text-orange-700",
  },
  {
    age: "7〜9ヶ月",
    theme: "おすわり・ずりばい",
    plays: ["積み木を倒して遊ぶ", "いないいないばあ", "型落とし（ボール落とし）", "音の出るおもちゃを叩く"],
    color: "bg-amber-100 text-amber-700",
  },
  {
    age: "10〜12ヶ月",
    theme: "つかまり立ち・指先の発達",
    plays: ["小さなものをつまむ遊び", "太鼓やタンバリンを叩く", "コップ重ね", "引っ張る・押すおもちゃ"],
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    age: "1歳〜1歳半",
    theme: "歩行・言葉の芽生え",
    plays: ["クレヨンでお絵かき", "砂遊び", "簡単なパズル（2〜3ピース）", "絵本の読み聞かせ"],
    color: "bg-green-100 text-green-700",
  },
  {
    age: "1歳半〜2歳",
    theme: "語彙爆発・模倣",
    plays: ["ごっこ遊び（電話ごっこなど）", "ブロックを積む", "粘土をこねる", "色の名前遊び"],
    color: "bg-teal-100 text-teal-700",
  },
  {
    age: "2〜3歳",
    theme: "想像力・社会性",
    plays: ["ままごと・お店屋さんごっこ", "数かぞえ遊び", "はさみで切る練習", "お手伝い（洗濯物をたたむなど）"],
    color: "bg-blue-100 text-blue-700",
  },
];

const sensePlayIdeas = [
  {
    sense: "視覚",
    icon: "👁",
    ideas: ["色水あそび（ペットボトルに色水を入れて混ぜる）", "影絵あそび（手や紙で影をつくる）", "カラフルな積み木の色分け"],
  },
  {
    sense: "聴覚",
    icon: "👂",
    ideas: ["手作り楽器（ペットボトルにビーズを入れるなど）", "音当てクイズ（何の音かな？）", "歌やリズムに合わせて体を動かす"],
  },
  {
    sense: "触覚",
    icon: "🤚",
    ideas: ["水遊び・氷あそび", "砂遊び・泥んこ遊び", "粘土やスライム（感触を楽しむ）"],
  },
  {
    sense: "嗅覚・味覚",
    icon: "👃",
    ideas: ["お料理のお手伝い（野菜を洗う、混ぜるなど）", "花や果物のにおいをかぐ", "いろんな食感の食べ物を試す"],
  },
];

const importantTips = [
  {
    title: "遊びは子どものペースで",
    detail: "興味を示さないときは無理に続けない。「今はこれが楽しいんだな」と観察することが大切です。",
  },
  {
    title: "「正解」を求めない",
    detail: "積み木を積まずに舐めてもOK。パズルをひっくり返してもOK。子どもなりの探索が知育そのものです。",
  },
  {
    title: "大人も一緒に楽しむ",
    detail: "「すごいね」「おもしろいね」と共感しながら遊ぶと、子どもの意欲がぐんと伸びます。",
  },
  {
    title: "テレビ・スマホは時間を決めて",
    detail: "WHOは2歳未満の画面視聴を推奨せず、2〜4歳は1日1時間以内を目安としています。五感を使う遊びを優先しましょう。",
  },
];

export default function EarlyEducationPage() {
  return (
    <>
      <ArticleJsonLd
        title="知育の基本ガイド｜月齢別の発達と遊び"
        description="月齢・年齢別の発達の特徴と、家庭でできる知育遊びを整理。五感・運動・言語・社会性の発達をサポート。"
        path="/learn/early-education"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["知育", "月齢別 発達", "知育遊び"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">発達・知育</Badge>
              <Badge variant="secondary">すべての親向け</Badge>
              <Badge variant="secondary">5分で読める</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              知育の基本ガイド
              <br />
              月齢別の発達と遊び
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              月齢・年齢別の発達の特徴と、家庭でできる知育遊びを整理しました。
              特別な教材や教室は必要ありません。日常の関わりが、子どもの力を育てます。
            </p>
          </div>

          {/* 1. 知育とは */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🌱</span>
              知育とは
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  知育とは、<strong>特別な教育プログラムのことではありません。</strong>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  日常の遊びや親子の関わりの中で、子どもの「考える力」「感じる力」「伝える力」を
                  自然に育てていくことです。積み木を積む、絵本を読む、砂場で遊ぶ――
                  そうした何気ない体験のすべてが、脳と心の発達につながっています。
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  大切なのは、子どもが「楽しい」と感じること。
                  楽しいと感じたとき、子どもの脳は最も活発に学んでいます。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 2. 月齢・年齢別の発達と遊び */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📅</span>
              月齢・年齢別の発達と遊び
            </h2>
            <div className="space-y-4">
              {developmentStages.map((stage) => (
                <Card key={stage.age} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <Badge className={`${stage.color} border-0 text-xs font-bold`}>
                        {stage.age}
                      </Badge>
                      <CardTitle className="text-base">{stage.theme}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {stage.plays.map((play) => (
                        <li key={play} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          {play}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 発達の時期には個人差があります。月齢はあくまで目安です。
            </p>
          </section>

          {/* 3. 五感を育てる遊びのアイデア */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🎨</span>
              五感を育てる遊びのアイデア
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sensePlayIdeas.map((sense) => (
                <Card key={sense.sense} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span aria-hidden>{sense.icon}</span>
                      {sense.sense}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {sense.ideas.map((idea) => (
                        <li key={idea} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-komorebi-warm mt-0.5 shrink-0">&#9679;</span>
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. 知育で大切なこと */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💡</span>
              知育で大切なこと
            </h2>
            <div className="space-y-3">
              {importantTips.map((tip, i) => (
                <Card key={tip.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{tip.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>「ちゃんと知育しなきゃ」と思わなくて大丈夫です。</strong>
                <br />
                一緒に笑ったり、驚いたり、「なんだろう？」と考えたり。
                <br />
                その時間そのものが、子どもにとって最高の知育です。
              </p>
            </CardContent>
          </Card>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              発達の時期や興味には個人差があります。ここに記載した月齢はあくまで目安です。
              お子さまの発達に不安がある場合は、かかりつけの小児科医や地域の保健センターにご相談ください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/prepare/educational-toys" className={buttonVariants({ variant: "outline" })}>
              知育玩具の選びかたを見る
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
