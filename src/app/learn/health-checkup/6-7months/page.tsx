import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "6〜7ヶ月健診ガイド｜おすわりと離乳食のスタート",
  description:
    "6〜7ヶ月児健診の流れ・チェック項目・持ち物・よくある質問を解説。おすわり・寝返り・離乳食の進み具合など確認ポイントを整理。",
};

const checkItems = [
  {
    category: "身体測定",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "体重・身長・頭囲の測定", detail: "出生時の約2.5倍の体重が目安。この時期から成長速度がゆるやかになるのは正常です。" },
      { text: "大泉門の確認", detail: "まだ開いている状態が正常。過度に膨らんでいないか、へこんでいないかを確認します。" },
    ],
  },
  {
    category: "運動発達",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "おすわりの安定度", detail: "支えなしで座れるか。まだ前に手をついて座る「お手つきおすわり」でも発達は順調です。" },
      { text: "寝返り", detail: "仰向け→うつぶせ、うつぶせ→仰向けの両方ができるか。片方だけでも心配ありません。" },
      { text: "手を伸ばして物をつかむ", detail: "興味のあるものに手を伸ばし、つかんで口に持っていく動作。目と手の協調運動の発達です。" },
      { text: "パラシュート反射", detail: "前に倒すと手を前に出して支えようとする反応。7ヶ月頃から出現します。" },
    ],
  },
  {
    category: "精神・社会性発達",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "人見知りの有無", detail: "知らない人を見て泣く・固まるのは、親と他者を区別できている証拠。発達の重要なサインです。" },
      { text: "声を出すコミュニケーション", detail: "「あー」「うー」だけでなく、声の抑揚で感情を表現し始めます。" },
      { text: "おもちゃへの興味", detail: "手に持ったおもちゃを振る・叩く・口に入れるなどの探索行動を確認します。" },
    ],
  },
  {
    category: "栄養・離乳食",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "離乳食の開始・進み具合", detail: "5〜6ヶ月で開始が目安。10倍がゆ→野菜→たんぱく質の順で進めます。まだ1回食でOK。" },
      { text: "スプーンへの反応", detail: "舌で押し出さずに飲み込めるか。押し出し反射が残っている場合はもう少し待ちましょう。" },
      { text: "母乳・ミルクの量", detail: "離乳食を始めても、栄養の大半はまだ母乳・ミルクから。急に減らさなくて大丈夫です。" },
    ],
  },
];

const dayFlow = [
  { time: "受付", detail: "母子手帳・問診票を提出。事前に記入しておくとスムーズです。", icon: "📋" },
  { time: "身体測定", detail: "体重・身長・頭囲を測定。前回の健診との比較で成長カーブを確認します。", icon: "📏" },
  { time: "小児科診察", detail: "おすわり・パラシュート反射・心音・腹部などを確認します。", icon: "🩺" },
  { time: "離乳食相談", detail: "進め方・食材の順番・アレルギーの心配事などを栄養士に相談できます。", icon: "🥄" },
  { time: "保健師相談", detail: "睡眠リズム・人見知り・育児の悩みなど個別に話せます。", icon: "💬" },
];

const faqs = [
  {
    q: "おすわりがまだできません。",
    a: "6ヶ月ではまだ不安定な子も多くいます。一人座りの完成は7〜8ヶ月が目安です。うつぶせ遊びや支えありのおすわり練習で筋力を育てましょう。",
  },
  {
    q: "離乳食を全然食べてくれません。",
    a: "5〜6ヶ月開始はあくまで目安。赤ちゃんが食に興味を示すサイン（大人の食事をじっと見る、口をもぐもぐする等）を待ってからでも遅くありません。",
  },
  {
    q: "人見知りがひどくて心配です。",
    a: "人見知りは「親を特別な存在として認識できている」発達のサインです。激しい子もそうでない子もいますが、どちらも正常な発達過程です。",
  },
  {
    q: "寝返りを片方向しかしません。",
    a: "最初は片方向だけが普通です。反対向きは数週間〜1ヶ月遅れることが多いです。気になる場合は反対向きに興味を引くおもちゃを置いてみましょう。",
  },
];

export default function Checkup67MonthsPage() {
  return (
    <>
      <ArticleJsonLd
        title="6〜7ヶ月健診ガイド｜おすわりと離乳食のスタート"
        description="6〜7ヶ月児健診の流れ・チェック項目・持ち物・よくある質問を解説。おすわり・寝返り・離乳食の進み具合など確認ポイントを整理。"
        path="/learn/health-checkup/6-7months"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["6ヶ月健診", "おすわり", "離乳食"]}
        breadcrumbs={[
          { name: "トップ", href: "/" },
          { name: "学ぶ", href: "/learn" },
          { name: "乳幼児健診ガイド", href: "/learn/health-checkup" },
          { name: "6〜7ヶ月" },
        ]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* パンくず */}
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-primary transition-colors">学ぶ</Link>
            <span>/</span>
            <Link href="/learn/health-checkup" className="hover:text-primary transition-colors">乳幼児健診ガイド</Link>
            <span>/</span>
            <span className="text-foreground">6〜7ヶ月</span>
          </nav>

          {/* ヘッダー */}
          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs">6〜7ヶ月</Badge>
              <Badge className="bg-rose-100 text-rose-700 border-rose-200 border text-xs">健診</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              6〜7ヶ月健診ガイド
            </h1>
            <p className="text-sm text-muted-foreground">おすわりと離乳食のスタート</p>
            <ArticleMeta updatedAt="2026-04-05" />
            <p className="text-muted-foreground leading-relaxed mt-3">
              おすわり・寝返り・離乳食——赤ちゃんの「できること」が増えてくる時期です。
              同時に成長の個人差が見えやすくなり、不安を感じることもあるかもしれません。
              この健診は、お子さまのペースを確認し、次のステップを一緒に考える機会です。
            </p>
          </section>

          {/* 当日の流れ */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🕐</span>
              当日の流れ（約1〜2時間）
            </h2>
            <div className="space-y-3">
              {dayFlow.map((step, i) => (
                <Card key={step.time} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                          <span aria-hidden>{step.icon}</span>
                          {step.time}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          {/* チェック項目 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              チェック項目
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              この時期は発達の個人差が大きいです。「まだ」は「遅れ」ではありません。
            </p>
            <div className="space-y-6">
              {checkItems.map((group) => (
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

          {/* よくある質問 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>❓</span>
              よくある質問
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.q} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-2">Q. {faq.q}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">A. {faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 出典 */}
          <section id="references" className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📚</span>
              出典・参考文献
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 厚生労働省「授乳・離乳の支援ガイド」（2019年改定版）（雇用均等・児童家庭局母子保健課）.
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 厚生労働省「乳幼児健康診査 身体診察マニュアル」（母子保健課）.
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 日本小児科学会「乳幼児身体発育評価マニュアル」（2021年）.
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 日本小児アレルギー学会「食物アレルギー診療ガイドライン2021」.{" "}
                    <a href="https://www.jspaci.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">日本小児アレルギー学会</a>
                  </li>
                  <li>
                    <strong className="text-foreground">[5]</strong> 国立成育医療研究センター「乳児期の発達と離乳食」.{" "}
                    <a href="https://www.ncchd.go.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">国立成育医療研究センター</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              このページは一般的な健診情報を整理したものであり、医療的な診断・助言を目的としたものではありません。
              健診の内容や時期は自治体によって異なります。詳しくはお住まいの保健センターにお問い合わせください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/health-checkup/18months" className={buttonVariants({ variant: "default" })}>
              次の健診：1歳6ヶ月 →
            </Link>
            <Link href="/learn/health-checkup" className={buttonVariants({ variant: "outline" })}>
              乳幼児健診ガイドに戻る
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
