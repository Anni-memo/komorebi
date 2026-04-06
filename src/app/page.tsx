import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchBar } from "@/components/search-bar";
import { AuthRedirect } from "@/components/auth-redirect";
import { CounterBanner } from "@/components/counter-banner";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: "📋",
    title: "今やることがわかる",
    description:
      "妊娠中、0歳、1歳などの状況に合わせて、今確認したいことを整理して案内。",
  },
  {
    icon: "📝",
    title: "申請や準備漏れを減らせる",
    description:
      "地域や家族の状況に応じて、制度や準備の候補をわかりやすく表示。",
  },
  {
    icon: "💬",
    title: "不安なときに相談できる",
    description:
      "同じ悩みの親の声や、信頼できる情報・相談先へつながる。",
  },
];

const conciergeQuestions = [
  { label: "妊娠中", emoji: "🤰" },
  { label: "0歳", emoji: "👶" },
  { label: "1歳", emoji: "🧒" },
  { label: "2歳以上", emoji: "👦" },
];

const concerns = [
  "妊娠・出産準備",
  "夜泣き",
  "離乳食",
  "発熱・体調",
  "保活",
  "子育て支援制度",
  "必要なものの準備",
  "メンタル・孤独感",
];

const steps = [
  {
    title: "AIが短い質問で状況を整理",
    description: "3分ほどの簡単な質問に答えるだけ。",
  },
  {
    title: "今必要なこと・制度・準備を案内",
    description: "あなたの状況に合わせて情報を整理。",
  },
  {
    title: "学ぶ・相談する・準備する",
    description: "必要なタイミングで必要な行動へ。",
  },
];

const personalHomeSections = [
  "あなたの今やること",
  "近いうちに必要なこと",
  "使えるかもしれない制度",
  "先に読んでおくと安心な記事",
  "同じ悩みの相談",
  "用意しておくと楽になるもの",
];

const pathways = [
  {
    icon: "📖",
    title: "学ぶ",
    description: "月齢・年齢ごとに必要な知識を整理",
    href: "/learn",
  },
  {
    icon: "💬",
    title: "相談する",
    description: "同じ悩みの親と匿名でつながる",
    href: "/qa",
  },
  {
    icon: "🛒",
    title: "準備する",
    description: "用意しておくと安心なものを確認できる",
    href: "/prepare",
  },
];

const safetyPoints = [
  "必要な質問だけを聞きます",
  "いつでもスキップできます",
  "AIが断定的な判断をしません",
  "医療や制度の最終確認は公式窓口へつなぎます",
  "個人情報は慎重に扱います",
];

export default function HomePage() {
  return (
    <>
      <AuthRedirect />
      <Header />
      <main className="flex-1">
        {/* 1. ファーストビュー */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-header.png"
              alt="木漏れ日の中で赤ちゃんと過ごすお母さん"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>
          <div className="max-w-3xl mx-auto px-4 pt-20 pb-16 text-center relative">
            <h1 className="text-3xl sm:text-4xl font-bold leading-snug tracking-tight text-white mb-4 drop-shadow-lg">
              子育ての負担と不安を減らし、
              <br />
              子に向ける時間を増やす。
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-xl mx-auto drop-shadow">
              AIがあなたの状況を整理して、
              <br className="sm:hidden" />
              今必要な情報・手続き・準備を案内します。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/concierge" className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}>
                AIに相談してはじめる
              </Link>
              <Link href="#features" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "text-base px-8")}>
                できることを見る
              </Link>
            </div>
            <div className="mt-8">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* 胎動・陣痛カウンター（34週以降の妊婦向け） */}
        <CounterBanner />

        {/* 2. できること紹介 */}
        <section id="features" className="py-16 bg-muted/20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-border/50 shadow-none"
                >
                  <CardContent className="pt-6">
                    <span className="text-2xl mb-3 block" aria-hidden>
                      {feature.icon}
                    </span>
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 3. AIコンシェルジュ導線 */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-foreground mb-2">
              AIコンシェルジュ
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              短い質問に答えるだけで、あなたに合った案内が届きます。
            </p>
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary/5 px-6 py-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm" aria-hidden>
                      🌿
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      こもれび AI
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-muted/50 rounded-xl px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground leading-relaxed">
                      今どの段階ですか？
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {conciergeQuestions.map((q) => (
                      <Badge
                        key={q.label}
                        variant="outline"
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/5 transition-colors"
                      >
                        <span className="mr-1" aria-hidden>
                          {q.emoji}
                        </span>
                        {q.label}
                      </Badge>
                    ))}
                  </div>
                  <div className="bg-muted/50 rounded-xl px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground leading-relaxed">
                      今いちばん困っていることは何ですか？
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link href="/concierge" className={cn(buttonVariants(), "w-full")}>
                    今の状況を整理する
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4. パーソナルホームの説明 */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-foreground mb-2">
              あなた専用のホーム
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              答えて終わりではありません。
              <br />
              あなたの状況に合わせて、今やることを見える形でお返しします。
            </p>
            <Card className="border-border/50 shadow-sm">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {personalHomeSections.map((section) => (
                    <div
                      key={section}
                      className="flex items-center gap-3 rounded-lg bg-background px-4 py-3 border border-border/30"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="text-sm text-foreground">{section}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. こんな悩みに対応しています */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              こんな悩みに対応しています
            </h2>
            <p className="text-muted-foreground mb-8">
              子育てでは、わからないことが次々に出てきます。
              <br />
              この場所は、そうした迷いを整理するための案内所です。
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {concerns.map((concern) => (
                <Badge
                  key={concern}
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {concern}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* 6. サービスの流れ */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-foreground mb-2">
              はじめかた
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              むずかしい操作はありません。
              <br />
              短い質問に答えるだけで、今必要な情報が見えやすくなります。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div key={s.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. 学び・相談・準備の導線 */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pathways.map((p) => (
                <Link key={p.title} href={p.href} className="group">
                  <Card className="border-border/50 shadow-none group-hover:border-primary/30 transition-colors h-full">
                    <CardContent className="pt-6">
                      <span className="text-2xl mb-3 block" aria-hidden>
                        {p.icon}
                      </span>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {p.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 8. 安心設計の説明 */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              安心して使える設計
            </h2>
            <p className="text-muted-foreground mb-8">
              このサービスは、親を焦らせるためではなく、
              <br />
              安心して次の行動を選べるようにするためにあります。
            </p>
            <div className="space-y-3 text-left max-w-md mx-auto">
              {safetyPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="text-primary mt-0.5 shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM7.25 10.75l-2.5-2.5 1.06-1.06L7.25 8.63l3.44-3.44 1.06 1.06-4.5 4.5z" />
                    </svg>
                  </span>
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. 最後のCTA */}
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              子育てを、
              <br />
              ひとりで整理しなくていい場所へ。
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/concierge" className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}>
                AIに相談してはじめる
              </Link>
              <Link href="#features" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "text-base px-8")}>
                まずはできることを見る
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
