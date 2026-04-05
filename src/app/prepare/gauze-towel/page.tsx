import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmazonProductCard } from "@/components/amazon-product-card";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

export const metadata = {
  title: "ガーゼ・タオルの選びかた",
  description:
    "赤ちゃん用ガーゼとタオル、何枚必要？素材の違い、サイズの選び方を整理。このページを見たら、もう探し回らなくて大丈夫です。",
};

const basicKnowledge = [
  {
    question: "いつから必要？",
    answer:
      "退院直後から毎日使います。沐浴、授乳、よだれ拭き、汗拭きなど用途が幅広く、新生児期の必需品です。",
  },
  {
    question: "何枚必要？",
    answer:
      "ガーゼハンカチは10〜20枚が目安。1日に5〜10枚使い、洗い替えが必要です。バスタオルは2〜3枚あると安心。",
  },
  {
    question: "いつまで使う？",
    answer:
      "ガーゼハンカチは1歳頃まで日常的に使います。バスタオルはその後もブランケット代わりなどで長く活躍します。",
  },
];

const selectionPoints = [
  {
    name: "素材（綿100%が基本）",
    why: "赤ちゃんの肌はデリケート。綿100%、できればオーガニックコットンが安心です。",
  },
  {
    name: "織り方（ガーゼの重ね枚数）",
    why: "2重ガーゼは薄くて乾きやすい。4重・6重は吸水性が高く、沐浴やバスタオルに向いています。",
  },
  {
    name: "サイズ",
    why: "ハンカチサイズ（約30×30cm）は万能。バスタオルサイズ（約60×120cm）はお風呂上がりやおくるみに。",
  },
  {
    name: "洗濯のしやすさ",
    why: "毎日たくさん洗うので、乾きが早く、ヘタりにくいものが長持ちします。",
  },
];

export default function GauzeTowelPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <BreadcrumbNav items={[
            { label: "トップ", href: "/" },
            { label: "準備する", href: "/prepare" },
            { label: "ガーゼ・タオルの選びかた" },
          ]} />

          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">準備する</Badge>
              <Badge variant="secondary">日用品</Badge>
              <Badge variant="secondary">ガーゼ・タオル</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ガーゼ・タオルの選びかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              このページを見たら、もう探し回らなくて大丈夫です。
              <br />
              必要な枚数、素材の選び方、おすすめ商品を整理しました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "basic-knowledge", label: "まず知っておきたい基本" },
            { id: "selection-points", label: "選ぶときのポイント" },
            { id: "usage-guide", label: "用途別の使い分け" },
            { id: "recommended-products", label: "おすすめのガーゼ・タオル" },
          ]} />

          {/* 1. 基本知識 */}
          <section id="basic-knowledge" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              まず知っておきたい基本
            </h2>
            <div className="space-y-3">
              {basicKnowledge.map((item) => (
                <Card key={item.question} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {item.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 2. 選び方のポイント */}
          <section id="selection-points" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              選ぶときのポイント
            </h2>
            <div className="space-y-3">
              {selectionPoints.map((point, i) => (
                <Card key={point.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">
                          {point.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {point.why}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. 使い方の目安 */}
          <section id="usage-guide" className="mb-8">
            <Card className="bg-muted/20 border-border/50 shadow-none">
              <CardContent className="pt-5">
                <h2 className="font-semibold text-foreground mb-3">
                  用途別の使い分け
                </h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-komorebi-warm mt-0.5 shrink-0">&#9679;</span>
                    <span>
                      <strong className="text-foreground">沐浴:</strong>{" "}
                      2重ガーゼのハンカチサイズを体にかける。赤ちゃんが安心します
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-komorebi-warm mt-0.5 shrink-0">&#9679;</span>
                    <span>
                      <strong className="text-foreground">授乳:</strong>{" "}
                      肩にかけて吐き戻し対策。口元を拭くのにも使います
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-komorebi-warm mt-0.5 shrink-0">&#9679;</span>
                    <span>
                      <strong className="text-foreground">よだれ・汗拭き:</strong>{" "}
                      外出時にも2〜3枚カバンに入れておくと安心
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-komorebi-warm mt-0.5 shrink-0">&#9679;</span>
                    <span>
                      <strong className="text-foreground">お風呂上がり:</strong>{" "}
                      ガーゼバスタオルで全身を包む。吸水性が高く肌にやさしい
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 4. おすすめ商品 */}
          <section id="recommended-products" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              おすすめのガーゼ・タオル
            </h2>
            <div className="space-y-4">
              {/* 10mois ガーゼハンカチセット */}
              <Card className="border-border/50 shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base">
                      10mois(ディモワ) ガーゼハンカチセット
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">10mois</Badge>
                      <Badge variant="secondary" className="text-xs">2重ガーゼ</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-3">
                      <ul className="space-y-1">
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          やわらかい綿100%の2重ガーゼ
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          かわいいデザインで出産祝いにも人気
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          セット売りで枚数がそろえやすい
                        </li>
                      </ul>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          沐浴・授乳・よだれ拭きなど、毎日のあらゆるシーンで活躍。デザイン性が高いので、お出かけ時にも使いやすいです。
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        価格帯: 約1,500〜2,500円（セット）
                      </p>
                    </div>
                    <div className="md:w-48 shrink-0">
                      <AmazonProductCard
                        name="10mois ガーゼハンカチセット"
                        asin="B07PZNWFMZ"
                        price="¥1,500〜"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 白十字 ベビーガーゼ */}
              <Card className="border-border/50 shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base">
                      白十字 ベビーガーゼ
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">白十字</Badge>
                      <Badge variant="secondary" className="text-xs">1重ガーゼ</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-3">
                      <ul className="space-y-1">
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          医療用品メーカーの安心品質
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          大判サイズで沐浴にもぴったり
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          コスパが良く、まとめ買いに最適
                        </li>
                      </ul>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          とにかくたくさん使うものだから、品質とコスパのバランスが大事。白十字は医療メーカーならではの安心感があります。
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        価格帯: 約600〜1,000円（10枚入り）
                      </p>
                    </div>
                    <div className="md:w-48 shrink-0">
                      <AmazonProductCard
                        name="白十字 ベビーガーゼ"
                        asin="B09MJNV14X"
                        price="¥600〜"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 今治タオル ベビーバスタオル */}
              <Card className="border-border/50 shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base">
                      今治タオル ベビーバスタオル
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">今治タオル</Badge>
                      <Badge variant="secondary" className="text-xs">6重ガーゼ</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-3">
                      <ul className="space-y-1">
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          今治ブランドの高品質ガーゼバスタオル
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          6重ガーゼで吸水性抜群、すぐ乾く
                        </li>
                        <li className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          おくるみやブランケットとしても使える
                        </li>
                      </ul>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          お風呂上がりに赤ちゃんを包む大判タオル。洗うたびにふわふわになる今治品質で、長く使えます。
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        価格帯: 約2,000〜4,000円
                      </p>
                    </div>
                    <div className="md:w-48 shrink-0">
                      <AmazonProductCard
                        name="今治タオル ベビーバスタオル"
                        asin="B01MQTN2AC"
                        price="¥2,000〜"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 5. 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>ガーゼは消耗品。迷ったらまず10枚そろえれば大丈夫です。</strong>
                <br />
                足りなくなったら買い足せばいいし、素材が合わなければ別のものを試せます。
                <br />
                綿100%であれば、どれを選んでも赤ちゃんの肌にやさしいです。
                <br />
                最初から完璧にそろえなくて大丈夫ですよ。
              </p>
            </CardContent>
          </Card>

          {/* 免責事項 */}
          <MedicalDisclaimer />

          <ShareButtons title="ガーゼ・タオルの選びかた" path="/prepare/gauze-towel" />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/prepare" className={buttonVariants({ variant: "outline" })}>
              準備するトップに戻る
            </Link>
            <Link href="/concierge" className={buttonVariants({ variant: "ghost" })}>
              AIに他のおすすめを聞く
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
