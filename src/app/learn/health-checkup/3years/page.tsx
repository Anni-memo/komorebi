import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "3歳児健診ガイド｜ことば・社会性・視聴覚の総チェック",
  description:
    "3歳児健診の流れ・チェック項目・事前準備・よくある質問を解説。視力・聴力検査、言語発達、社会性など就園前の総合チェックを整理。",
};

const checkItems = [
  {
    category: "身体測定",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "体重・身長の測定", detail: "3歳児の平均身長は約93〜96cm、体重は約13〜15kg。成長曲線に沿っているかを確認します。" },
      { text: "尿検査", detail: "多くの自治体で実施。腎臓疾患のスクリーニング。朝一番の尿を自宅で採取して持参します。" },
    ],
  },
  {
    category: "視覚・聴覚",
    color: "bg-rose-100 text-rose-700",
    borderColor: "border-l-rose-400",
    items: [
      { text: "視力検査", detail: "自宅で事前練習が必要。ランドルト環（Cの字）の向きを答える練習をしておきましょう。弱視の早期発見が重要です。" },
      { text: "聴力検査", detail: "ささやき声への反応や、自宅での事前チェックシートで確認。聴力に問題がある場合、言語発達にも影響します。" },
    ],
  },
  {
    category: "言語・認知発達",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "二語文以上で話せるか", detail: "「ワンワン いた」「ママ ちょうだい」など。三語文が出ている子も多い時期です。" },
      { text: "名前と年齢が言えるか", detail: "「〇〇ちゃん」「3さい」と答えられるか。恥ずかしがって言えない子もいるので、普段の様子も伝えましょう。" },
      { text: "色の識別", detail: "赤・青・黄色など基本的な色を理解しているか。すべて正確でなくても大丈夫です。" },
      { text: "数の理解", detail: "「1つちょうだい」に応えられるか。3まで数えられる子もいますが、個人差が大きいです。" },
    ],
  },
  {
    category: "社会性・生活習慣",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "お友達との関わり", detail: "並行遊び（隣で同じ遊び）から、少しずつやりとり遊びへ。まだ一人遊びが好きな子も多いです。" },
      { text: "排泄の自立度", detail: "おむつが取れている必要はありません。トイレに興味を持ち始めているか、排尿間隔が空いてきているかを確認します。" },
      { text: "着替えへの参加", detail: "自分でズボンを上げようとする、靴を履こうとするなど。完璧にできなくても「やろうとする」姿勢が発達のサインです。" },
      { text: "食事の自立度", detail: "スプーン・フォークを使って一人で食べられるか。こぼすのは普通です。" },
    ],
  },
  {
    category: "歯科",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "乳歯の状態", detail: "3歳で乳歯20本がそろうのが目安。虫歯の有無、歯並び、噛み合わせを確認します。" },
      { text: "歯みがき習慣", detail: "仕上げみがきの継続が重要。奥歯が生えそろうこの時期は虫歯リスクが高くなります。" },
    ],
  },
];

const homePrep = [
  {
    title: "視力検査の練習",
    detail: "健診の1〜2週間前から、ランドルト環（Cの字）カードで練習しておきましょう。「穴が開いているのはどっち？」とゲーム感覚で。片目ずつ隠して確認します。",
    icon: "👁️",
    important: true,
  },
  {
    title: "聴力チェックシートの記入",
    detail: "自治体から届く事前チェックシートに記入。テレビを消した静かな部屋で、ささやき声に反応するか確認します。",
    icon: "👂",
    important: true,
  },
  {
    title: "尿の採取",
    detail: "当日朝一番の尿を採取。採尿パックが同封されていることが多いです。事前に一度練習しておくと安心。",
    icon: "🧪",
    important: true,
  },
  {
    title: "問診票の記入",
    detail: "3歳児健診の問診票は項目が多いです。前日までに記入を済ませておきましょう。普段の様子をありのまま書いてOKです。",
    icon: "📝",
    important: false,
  },
  {
    title: "お子さまへの説明",
    detail: "「明日は先生にお口見てもらおうね」「目の検査ごっこしようね」など、事前に伝えておくと当日スムーズです。",
    icon: "🗣️",
    important: false,
  },
];

const dayFlow = [
  { time: "受付", detail: "母子手帳・問診票・尿・視力聴力チェックシートを提出。", icon: "📋" },
  { time: "尿検査提出", detail: "持参した尿を提出。腎疾患のスクリーニング検査です。", icon: "🧪" },
  { time: "身体測定", detail: "体重・身長を測定。", icon: "📏" },
  { time: "視力・聴力検査", detail: "保健師が個別に実施。自宅での事前チェック結果も確認します。", icon: "👁️" },
  { time: "歯科健診", detail: "歯科医による虫歯チェック・歯みがき指導・フッ素塗布。", icon: "🦷" },
  { time: "小児科診察", detail: "言語・運動・社会性などを総合的に確認します。", icon: "🩺" },
  { time: "保健師相談", detail: "育児の悩み・就園準備・発達の気になる点を個別に相談できます。", icon: "💬" },
];

const faqs = [
  {
    q: "視力検査の練習がうまくいきません。",
    a: "3歳ではまだ検査の意味を理解するのが難しい子もいます。「Cのどこが開いてる？」より「穴はどっち向き？」「くちが開いてるのどっち？」など言い方を変えてみましょう。当日できなくても、再検査で対応してもらえます。",
  },
  {
    q: "おむつがまだ取れていません。3歳健診に行っても大丈夫？",
    a: "まったく問題ありません。3歳でおむつの子は珍しくありません。健診では排泄の自立度を「確認」するだけで、取れていないことを責められることはありません。",
  },
  {
    q: "言葉が遅い気がします。",
    a: "3歳時点での言語発達は個人差が大きいです。二語文が出ていれば基本的に心配ありません。発音が不明瞭でも、5歳頃までに改善することが多いです。気になる場合は、この健診で言語聴覚士への紹介を依頼できます。",
  },
  {
    q: "健診でじっとしていられない・泣いてしまいそうです。",
    a: "3歳児が健診で騒ぐのは日常茶飯事です。保健師さんも慣れています。お気に入りのおもちゃや絵本を持参し、待ち時間対策をしておきましょう。",
  },
  {
    q: "弱視って何ですか？",
    a: "片目または両目の視力が正常に発達しない状態です。3歳児健診での早期発見が非常に重要で、6歳頃までに治療を始めれば改善が期待できます。だからこそ視力検査の事前練習が大切です。",
  },
];

export default function Checkup3YearsPage() {
  return (
    <>
      <ArticleJsonLd
        title="3歳児健診ガイド｜ことば・社会性・視聴覚の総チェック"
        description="3歳児健診の流れ・チェック項目・事前準備・よくある質問を解説。視力・聴力検査、言語発達、社会性など就園前の総合チェックを整理。"
        path="/learn/health-checkup/3years"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["3歳児健診", "視力検査", "言語発達"]}
        breadcrumbs={[
          { name: "トップ", href: "/" },
          { name: "学ぶ", href: "/learn" },
          { name: "乳幼児健診ガイド", href: "/learn/health-checkup" },
          { name: "3歳" },
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
            <span className="text-foreground">3歳</span>
          </nav>

          {/* ヘッダー */}
          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 border text-xs">3歳</Badge>
              <Badge className="bg-rose-100 text-rose-700 border-rose-200 border text-xs">健診</Badge>
              <Badge className="bg-red-100 text-red-700 border-red-200 border text-xs">法定健診</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              3歳児健診ガイド
            </h1>
            <p className="text-sm text-muted-foreground">ことば・社会性・視聴覚の総チェック</p>
            <ArticleMeta updatedAt="2026-04-05" />
            <p className="text-muted-foreground leading-relaxed mt-3">
              乳幼児健診の中で最も包括的な健診です。視力・聴力の検査が加わり、
              言語発達・社会性・生活習慣まで幅広く確認します。
              事前準備が必要な項目が多いので、早めの準備がおすすめです。
            </p>
          </section>

          {/* 法定健診の注意 */}
          <Card className="bg-amber-50 border-amber-200 shadow-none mb-10">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm text-foreground font-medium mb-1">法律で定められた健診です</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                3歳児健診は母子保健法で実施が義務づけられています。
                就園前の最後の総合チェックとなるため、必ず受診しましょう。
              </p>
            </CardContent>
          </Card>

          {/* 事前準備 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🏠</span>
              事前準備（これが大切！）
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              3歳児健診は事前準備が多い健診です。1〜2週間前から少しずつ取り組みましょう。
            </p>
            <div className="space-y-3">
              {homePrep.map((item) => (
                <Card key={item.title} className={`shadow-none ${item.important ? "border-amber-200 bg-amber-50/50" : "border-border/50"}`}>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-lg shrink-0" aria-hidden>{item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                          {item.title}
                          {item.important && (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-[10px]">重要</Badge>
                          )}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <hr className="border-border/50 my-10" />

          {/* 当日の流れ */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🕐</span>
              当日の流れ（約2〜3時間）
            </h2>
            <div className="space-y-3">
              {dayFlow.map((step, i) => (
                <Card key={step.time} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-700 text-sm font-bold shrink-0">
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
              項目が多い健診ですが、「テスト」ではありません。
              お子さまの今の状態を把握し、必要なサポートにつなげるための機会です。
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

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <p className="text-sm text-foreground leading-relaxed font-medium mb-2">
                3歳児健診を終えたら
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                法定の乳幼児健診はこれで最後です。
                ここまでの健診を通じて、お子さまの成長を見守ってこられたこと自体がすばらしいことです。
                この先は就園先での健康診断が中心になります。
                気になることがあれば、いつでもかかりつけ医や保健センターに相談してください。
              </p>
            </CardContent>
          </Card>

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
            <Link href="/learn/health-checkup" className={buttonVariants({ variant: "outline" })}>
              乳幼児健診ガイドに戻る
            </Link>
            <Link href="/learn" className={buttonVariants({ variant: "outline" })}>
              学ぶトップに戻る
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
