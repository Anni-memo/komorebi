import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "3〜4ヶ月健診ガイド｜首すわりと成長の確認",
  description:
    "3〜4ヶ月児健診の流れ・チェック項目・持ち物・よくある質問をわかりやすく解説。首すわり・追視・体重増加など確認ポイントを整理。",
};

const checkItems = [
  {
    category: "身体測定",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    items: [
      { text: "体重・身長・頭囲の測定", detail: "成長曲線に沿っているか確認します。出生時から体重が約2倍になっているのが目安です。" },
      { text: "大泉門の確認", detail: "頭のてっぺんの柔らかい部分。閉じ具合や膨らみを確認します。" },
      { text: "皮膚の状態", detail: "乳児湿疹・おむつかぶれなどの確認と、ケアのアドバイスを受けられます。" },
    ],
  },
  {
    category: "運動発達",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    items: [
      { text: "首すわりの確認", detail: "うつぶせで頭を持ち上げる、縦抱きで首がぐらつかない。まだ不安定でも「もう少し」なら心配いりません。" },
      { text: "引き起こし反応", detail: "仰向けから手を引いて起こす動作で、首がついてくるか確認します。" },
      { text: "股関節の開き具合", detail: "先天性股関節脱臼のスクリーニング。足のしわの左右差もチェックポイントです。" },
    ],
  },
  {
    category: "精神・感覚発達",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    items: [
      { text: "追視（目で追うか）", detail: "おもちゃや人の顔を目で追えるか。左右180度追えるのが目安ですが、個人差があります。" },
      { text: "あやし笑い", detail: "あやすと笑う社会的微笑。表情のやりとりが始まっている証拠です。" },
      { text: "音への反応", detail: "大きな音に驚く、声のする方を向くなどの反応を確認します。" },
    ],
  },
  {
    category: "栄養・生活",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    items: [
      { text: "哺乳の状況", detail: "母乳・ミルクの量やリズム、飲み方の確認。体重増加が順調なら問題ありません。" },
      { text: "排泄の回数・状態", detail: "便の色・回数。母子手帳の便色カードで黄色〜緑が正常です。" },
      { text: "睡眠のリズム", detail: "昼夜の区別がつき始める時期。まだ夜中に起きるのは普通のことです。" },
    ],
  },
];

const dayFlow = [
  { time: "受付", detail: "母子手帳・問診票を提出。番号札を受け取ることが多いです。", icon: "📋" },
  { time: "身体測定", detail: "裸にして体重・身長・頭囲を測定。おむつ1枚になります。", icon: "📏" },
  { time: "小児科診察", detail: "首すわり・股関節・心音・追視などを医師がチェックします。", icon: "🩺" },
  { time: "保健師相談", detail: "育児の悩み・授乳・睡眠について個別に相談できます。", icon: "💬" },
  { time: "栄養相談", detail: "離乳食の開始時期・進め方について栄養士からアドバイス。（自治体による）", icon: "🥄" },
];

const faqs = [
  {
    q: "首がまだすわっていない気がします。大丈夫？",
    a: "3ヶ月時点ではまだ不安定な子も多くいます。4ヶ月健診で「もう少し」と言われた場合は、うつぶせ遊びを増やしつつ様子を見ましょう。5ヶ月を過ぎても不安定な場合は再相談を。",
  },
  {
    q: "体重が成長曲線の下のほうです。",
    a: "曲線内に入っていれば基本的に心配ありません。大切なのは「カーブに沿って増えているか」。横ばいや下降が続く場合は医師に相談しましょう。",
  },
  {
    q: "股関節脱臼と言われたらどうなりますか？",
    a: "早期発見であればリーメンビューゲルという装具で治療できることがほとんどです。3-4ヶ月健診での発見が最も有効とされています。",
  },
  {
    q: "健診に行けなかった場合は？",
    a: "多くの自治体で振替日が設けられています。保健センターに連絡すれば個別対応してもらえることもあります。",
  },
];

export default function Checkup34MonthsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* パンくず */}
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-primary transition-colors">学ぶ</Link>
            <span>/</span>
            <Link href="/learn/health-checkup" className="hover:text-primary transition-colors">乳幼児健診ガイド</Link>
            <span>/</span>
            <span className="text-foreground">3〜4ヶ月</span>
          </nav>

          {/* ヘッダー */}
          <section className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 border text-xs">3〜4ヶ月</Badge>
              <Badge className="bg-rose-100 text-rose-700 border-rose-200 border text-xs">健診</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              3〜4ヶ月健診ガイド
            </h1>
            <p className="text-sm text-muted-foreground">首すわりと成長の確認</p>
            <ArticleMeta updatedAt="2026-04-05" />
            <p className="text-muted-foreground leading-relaxed mt-3">
              多くの自治体で初めて受ける集団健診です。
              首すわり・体重増加・追視などを確認します。
              初めての場所で緊張するかもしれませんが、育児の悩みを専門家に相談できる貴重な機会です。
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
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 text-sm font-bold shrink-0">
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
              医師や保健師が確認する主な項目です。すべてが「できている必要」はありません。
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
            <Link href="/learn/health-checkup/6-7months" className={buttonVariants({ variant: "default" })}>
              次の健診：6〜7ヶ月 →
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
