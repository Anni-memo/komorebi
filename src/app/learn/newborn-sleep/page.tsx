import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "新生児の睡眠パターンを知ろう | こもれび",
  description:
    "月齢別の睡眠時間の目安、夜泣きの原因と対処法、親の睡眠確保のコツ、安全な睡眠環境（SIDS予防）についてわかりやすく解説します。",
};

const sleepByAge = [
  { age: "0〜1ヶ月", total: "16〜18時間", pattern: "2〜3時間おきに目覚める。昼夜の区別がまだない", note: "授乳のたびに起きるのは正常です" },
  { age: "1〜3ヶ月", total: "14〜17時間", pattern: "少しずつ夜の睡眠が長くなる（3〜4時間連続も）", note: "昼夜のリズムが徐々にできてきます" },
  { age: "3〜6ヶ月", total: "13〜15時間", pattern: "夜に5〜6時間続けて眠れる子も。昼寝は3〜4回", note: "生活リズムを意識し始めるとよい時期" },
  { age: "6〜12ヶ月", total: "12〜14時間", pattern: "夜通し眠れる子が増える。昼寝は2回程度に", note: "夜泣きが始まる・再開する子もいます" },
];

const nightCryingCauses = [
  { title: "空腹", detail: "特に新生児期は胃が小さく、頻回の授乳が必要です。成長とともに間隔は広がります" },
  { title: "おむつの不快感", detail: "濡れたおむつが気になって泣くことがあります。確認してあげましょう" },
  { title: "室温・着衣の調整", detail: "暑すぎ・寒すぎで不快になることがあります。背中やお腹を触って確認するのがコツです" },
  { title: "睡眠サイクルの未成熟", detail: "赤ちゃんの睡眠サイクルは約50分と短く、大人（約90分）より頻繁に浅い眠りの段階が訪れます" },
  { title: "成長・発達の変化", detail: "寝返り・はいはいなど運動発達の節目や、歯の生え始めの時期に夜泣きが増えることがあります" },
  { title: "分離不安", detail: "6ヶ月頃から親の存在を強く意識し始め、離れると不安で泣くことがあります" },
];

const parentSleepTips = [
  { title: "赤ちゃんが寝たら一緒に休む", detail: "家事は後回しにして、赤ちゃんの昼寝に合わせて仮眠をとりましょう。15〜20分の仮眠でも疲労回復に効果があります" },
  { title: "夜間の交代制を検討する", detail: "パートナーと交代で対応する時間帯を決めておくと、まとまった睡眠を確保しやすくなります" },
  { title: "完璧を目指さない", detail: "赤ちゃんが泣くのは自然なこと。すべてを即座に解決できなくても、自分を責める必要はありません" },
  { title: "頼れるものは頼る", detail: "家族・自治体の産後ケア・ファミリーサポートなど、使える支援を遠慮なく活用しましょう" },
  { title: "カフェインの摂り方に注意", detail: "授乳中のカフェインは1日200〜300mg（コーヒー2杯程度）まで。午後以降は控えると自分の睡眠の質も上がります" },
];

const sidsPrevention = [
  { title: "仰向けに寝かせる", detail: "1歳になるまでは仰向け寝が推奨されています。うつぶせ寝はSIDSリスクを高めます" },
  { title: "硬めのマットレスを使う", detail: "柔らかい寝具は窒息のリスクがあります。ベビー布団は硬めのものを選びましょう" },
  { title: "顔の周りにものを置かない", detail: "枕・ぬいぐるみ・ブランケット・バンパーなどは赤ちゃんのそばに置かないようにします" },
  { title: "適切な室温を保つ", detail: "室温は20〜22度が目安。厚着させすぎないよう注意しましょう" },
  { title: "同室別床が推奨", detail: "親と同じ部屋で、赤ちゃん専用のベビーベッドに寝かせるのが最も安全とされています" },
  { title: "禁煙環境", detail: "受動喫煙はSIDSの大きなリスク因子です。家庭内・車内は完全禁煙にしましょう" },
  { title: "母乳育児も予防に寄与", detail: "母乳育児にはSIDSリスクを下げる効果があるとされています。ただし、母乳でなくても他の対策をしっかり行えば大丈夫です" },
];

export default function NewbornSleepPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">睡眠</Badge>
              <Badge variant="secondary">0歳の親向け</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              新生児の睡眠パターンを知ろう
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              赤ちゃんの眠りには大人とは違うリズムがあります。
              夜泣きや細切れ睡眠に悩む方へ、月齢別の目安と安全な睡眠環境について整理しました。
            </p>
          </div>

          {/* 月齢別の睡眠時間 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🕐</span>
              月齢別の睡眠時間の目安
            </h2>
            <div className="space-y-3">
              {sleepByAge.map((item) => (
                <Card key={item.age} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 mt-0.5">{item.age}</Badge>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-primary text-sm">合計 {item.total}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-1">{item.pattern}</p>
                        <p className="text-xs text-muted-foreground/70">{item.note}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ 睡眠時間には個人差があります。目安として参考にしてください。
            </p>
          </section>

          {/* 夜泣きの原因と対処法 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🌙</span>
              夜泣きの原因と対処法
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-4">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  夜泣きは多くの赤ちゃんに見られる自然な現象です。
                  原因がはっきりしないことも多く、「何をしても泣き止まない」のは珍しいことではありません。
                  自分の対応が悪いのでは、と思う必要はまったくありません。
                </p>
              </CardContent>
            </Card>
            <div className="space-y-3">
              {nightCryingCauses.map((cause, i) => (
                <Card key={cause.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">{cause.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{cause.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 親の睡眠確保 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💤</span>
              親の睡眠を確保するコツ
            </h2>
            <div className="space-y-3">
              {parentSleepTips.map((tip) => (
                <Card key={tip.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SIDS予防 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🛡️</span>
              安全な睡眠環境（SIDS予防）
            </h2>
            <Card className="border-primary/30 bg-primary/5 shadow-none mb-4">
              <CardContent className="pt-5">
                <h3 className="font-semibold text-foreground mb-2">SIDS（乳幼児突然死症候群）とは</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  それまで元気だった赤ちゃんが、主に睡眠中に予兆なく亡くなる疾患です。
                  日本では年間約60〜80例が報告されています。
                  原因は完全には解明されていませんが、以下の対策でリスクを大きく下げることができます。
                </p>
              </CardContent>
            </Card>
            <div className="space-y-3">
              {sidsPrevention.map((item, i) => (
                <Card key={item.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">出典・参考情報</h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 厚生労働省. &quot;乳幼児突然死症候群（SIDS）についての対策について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 日本小児科学会. &quot;乳幼児の睡眠に関する提言.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> American Academy of Pediatrics. &quot;Safe Sleep Recommendations.&quot; <em>Pediatrics.</em> 2022.
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 国立成育医療研究センター. &quot;赤ちゃんの睡眠 Q&amp;A.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、医療アドバイスに代わるものではありません。
              赤ちゃんの睡眠について心配なことがある場合は、かかりつけの小児科医にご相談ください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/mental-care" className={buttonVariants({ variant: "outline" })}>
              産後のメンタルケアを読む
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
