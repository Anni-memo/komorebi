import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "1歳6ヶ月健診ガイド｜歩行とことばの芽生え",
  description:
    "1歳6ヶ月児健診の流れ・チェック項目・持ち物・よくある質問を解説。ひとり歩き・有意語・指さし・歯科健診など確認ポイントを整理。",
};

const checkItems = [
  {
    category: "身体測定",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "体重・身長・頭囲の測定", detail: "出生時の約3倍の体重、約1.5倍の身長が目安。成長曲線のカーブに沿っているかを確認します。" },
      { text: "大泉門の閉鎖", detail: "1歳半頃に閉じるのが標準的。まだ少し開いている子もいますが、多くは正常範囲です。" },
    ],
  },
  {
    category: "運動発達",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "ひとり歩き", detail: "1歳6ヶ月時点で歩けることが目安ですが、1歳3ヶ月〜1歳8ヶ月と幅があります。つたい歩きが上手なら心配は少ないです。" },
      { text: "小さなものをつまめるか", detail: "親指と人差し指で小さなものをつまむ「ピンサーグラスプ」。手先の器用さの指標です。" },
      { text: "積み木を積めるか", detail: "2〜3個積めることが目安。積む動作は、目と手の協調・力のコントロール・集中力を総合的に確認します。" },
    ],
  },
  {
    category: "言語・コミュニケーション",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "有意語（意味のある言葉）", detail: "「ママ」「ワンワン」「ブーブー」など。3〜5語出ていれば標準的。まだ少なくても理解語が増えていればOK。" },
      { text: "指さし", detail: "欲しいものを指さす「要求の指さし」と、見つけたものを示す「共感の指さし」。言葉が出る前の重要なコミュニケーション手段です。" },
      { text: "簡単な指示の理解", detail: "「ちょうだい」「ないないして」などの簡単な言葉を理解して行動できるか。" },
      { text: "絵本への反応", detail: "知っている絵を指さす、ページをめくりたがるなどの反応。言語発達を支える重要な活動です。" },
    ],
  },
  {
    category: "歯科",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "歯の本数と状態", detail: "上下合わせて8〜12本が目安。虫歯の有無、歯並び、噛み合わせを歯科医がチェックします。" },
      { text: "歯みがき習慣", detail: "仕上げみがきの方法、フッ素塗布の案内を受けられます。" },
      { text: "食事の形態", detail: "離乳食の完了に向けて、噛む力や食事形態のアドバイスを受けられます。" },
    ],
  },
];

const dayFlow = [
  { time: "受付", detail: "母子手帳・問診票・尿検査（自治体による）を提出。", icon: "📋" },
  { time: "身体測定", detail: "体重・身長・頭囲を測定。", icon: "📏" },
  { time: "歯科健診", detail: "歯科医による虫歯チェック・歯みがき指導。フッ素塗布を行う自治体も。", icon: "🦷" },
  { time: "小児科診察", detail: "歩行・積み木・言葉・指さしなどを総合的に確認します。", icon: "🩺" },
  { time: "保健師相談", detail: "ことばの遅れ・食事・しつけ・イヤイヤ期など何でも相談できます。", icon: "💬" },
  { time: "栄養相談", detail: "偏食・食べムラ・おやつの与え方などのアドバイス。（自治体による）", icon: "🥄" },
];

const faqs = [
  {
    q: "言葉がまだ1〜2語しか出ません。",
    a: "1歳半時点で言葉が少ない子は珍しくありません。大切なのは「理解語」が増えているか。「ゴミぽいして」「お靴持ってきて」に反応するなら、言語理解は進んでいます。2歳頃に急に話し始める子も多いです。",
  },
  {
    q: "まだ歩けなくて心配です。",
    a: "ひとり歩きの開始は9ヶ月〜1歳8ヶ月と幅があります。つたい歩きが安定しているなら、あと少しのことが多いです。1歳8ヶ月を過ぎても歩かない場合は小児科に相談しましょう。",
  },
  {
    q: "歯みがきを嫌がって仕上げみがきができません。",
    a: "この時期はほぼ全員が嫌がります。膝の上に寝かせて、歌を歌いながら短時間でサッと済ませるのがコツ。完璧を目指さず「毎日触れる」ことが大切です。",
  },
  {
    q: "指さしをしません。",
    a: "指さしの出現時期は10ヶ月〜1歳半と幅があります。日常の中で「あ、ワンワンいたね」と大人が指さしながら語りかけることで促されます。",
  },
  {
    q: "1歳半健診で「経過観察」と言われました。",
    a: "「経過観察」は「様子を見ましょう」という意味で、「問題がある」ということではありません。発達のペースを確認するために2歳頃にフォロー健診を案内されることが多いです。",
  },
];

export default function Checkup18MonthsPage() {
  return (
    <>
      <ArticleJsonLd
        title="1歳6ヶ月健診ガイド｜歩行とことばの芽生え"
        description="1歳6ヶ月児健診の流れ・チェック項目・持ち物・よくある質問を解説。ひとり歩き・有意語・指さし・歯科健診など確認ポイントを整理。"
        path="/learn/health-checkup/18months"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["1歳半健診", "歩行", "言語発達"]}
        breadcrumbs={[
          { name: "トップ", href: "/" },
          { name: "学ぶ", href: "/learn" },
          { name: "乳幼児健診ガイド", href: "/learn/health-checkup" },
          { name: "1歳6ヶ月" },
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
            <span className="text-foreground">1歳6ヶ月</span>
          </nav>

          {/* ヘッダー */}
          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-xs">1歳6ヶ月</Badge>
              <Badge className="bg-rose-100 text-rose-700 border-rose-200 border text-xs">健診</Badge>
              <Badge className="bg-red-100 text-red-700 border-red-200 border text-xs">法定健診</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              1歳6ヶ月健診ガイド
            </h1>
            <p className="text-sm text-muted-foreground">歩行とことばの芽生え</p>
            <ArticleMeta updatedAt="2026-04-05" />
            <p className="text-muted-foreground leading-relaxed mt-3">
              母子保健法で義務づけられている重要な健診です。
              歩行・言葉・指さし・歯の状態など、身体と心の発達を総合的に確認します。
              初めての歯科健診も行われることが多く、内容が盛りだくさんの健診です。
            </p>
          </section>

          {/* 法定健診の注意 */}
          <Card className="bg-amber-50 border-amber-200 shadow-none mb-10">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm text-foreground font-medium mb-1">法律で定められた健診です</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                1歳6ヶ月健診は母子保健法で実施が義務づけられています。
                未受診の場合、自治体から連絡が届くことがあります。
                お子さまの成長を確認する大切な機会ですので、必ず受診しましょう。
              </p>
            </CardContent>
          </Card>

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
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-sm font-bold shrink-0">
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
              この健診はチェック項目が多いですが、すべてを完璧にクリアする必要はありません。
              お子さまの「今」を確認し、必要なサポートにつなげることが目的です。
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
            <Link href="/learn/health-checkup/3years" className={buttonVariants({ variant: "default" })}>
              次の健診：3歳 →
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
