import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

export const metadata = {
  title: "沐浴・お風呂ガイド｜新生児の沐浴手順と温度・時間帯の目安",
  description:
    "新生児の沐浴はいつからいつまで？お湯の温度（38〜40度）、手順、必要なもの、よくある不安への対処法をわかりやすく解説。1ヶ月健診後のお風呂への移行も。",
};

const essentials = [
  { item: "ベビーバス", note: "シンク型・折りたたみ・マット型・空気入れなど" },
  { item: "ガーゼ（2〜3枚）", note: "顔や体を優しく洗うため" },
  { item: "ベビーソープ（泡タイプ推奨）", note: "片手で使えるポンプ式が便利" },
  { item: "バスタオル（2枚）", note: "1枚は下に敷く用、1枚は拭く用" },
  { item: "着替え一式", note: "肌着＋ウェアをあらかじめ広げておく" },
  { item: "おむつ", note: "着替えと一緒にセットしておく" },
  { item: "保湿剤", note: "お風呂上がりにすぐ塗れるよう準備" },
  { item: "湯温計", note: "慣れるまではあると安心" },
];

const steps = [
  {
    title: "準備を整える",
    detail: "着替え・おむつ・バスタオルを広げておく。ベビーバスにお湯を張る（38〜40度）。室温は23〜25度が目安です。",
  },
  {
    title: "赤ちゃんを脱がせる",
    detail: "おむつを外し、ガーゼや沐浴布を体にかけてあげると赤ちゃんが安心します。",
  },
  {
    title: "足からゆっくりお湯に入れる",
    detail: "首と頭をしっかり支え、足からゆっくりとお湯に入れます。急に入れると驚いてしまうので、声をかけながらゆっくりと。",
  },
  {
    title: "顔を洗う",
    detail: "ガーゼをお湯で湿らせ、目の周り→額→頬→あごの順にやさしく拭きます。石鹸は使わなくてもOKです。",
  },
  {
    title: "頭を洗う",
    detail: "ベビーソープを泡立て、指の腹でやさしく円を描くように洗います。すすぎはガーゼで丁寧に。",
  },
  {
    title: "体を洗う",
    detail: "首→胸→お腹→腕→足の順に洗います。首のしわ、脇の下、手のひらは汚れがたまりやすいポイントです。",
  },
  {
    title: "背中を洗う",
    detail: "赤ちゃんをうつ伏せ気味に腕に乗せ、背中とおしりを洗います。この体勢が不安な場合はスキップしてもOK。",
  },
  {
    title: "お湯で流して上げる",
    detail: "きれいなお湯（かけ湯）で石鹸を洗い流します。洗い残しは肌荒れの原因になるので丁寧に。",
  },
  {
    title: "バスタオルで拭く",
    detail: "広げておいたバスタオルの上に赤ちゃんを置き、押さえるように拭きます。こすらないのがポイント。",
  },
  {
    title: "保湿・着替え",
    detail: "保湿剤を全身に塗り、おむつを付けて着替えさせます。おへその消毒が必要な時期はこのタイミングで。",
  },
];

const worries = [
  {
    question: "泣いてしまう…",
    answer: "泣くのは自然なことです。慣れるまでは短時間で切り上げても問題ありません。沐浴布をかけると安心する子も多いです。",
  },
  {
    question: "耳にお湯が入ってしまった",
    answer: "赤ちゃんの耳は構造上、お湯が入っても鼓膜の手前で止まります。無理に綿棒で取ろうとせず、外側を軽く拭くだけで大丈夫です。",
  },
  {
    question: "うまく支えられない",
    answer: "最初は誰でも緊張します。利き手でない方の腕で首を支え、親指と中指で耳をふさぐようにすると安定します。慣れるまでは二人で行うのも良い方法です。",
  },
  {
    question: "毎日入れないとダメ？",
    answer: "夏場は毎日が理想ですが、冬場や体調が悪いときは1日おきでも問題ありません。お湯で絞ったガーゼで体を拭くだけでもOKです。",
  },
  {
    question: "おへそが取れていないけど大丈夫？",
    answer: "お湯に入れても大丈夫です。沐浴後にしっかり乾かし、必要に応じて消毒してください。通常2〜3週間で自然に取れます。",
  },
];

const bathTypes = [
  {
    type: "シンク型（台所用）",
    pros: "腰をかがめずに使えるので体への負担が少ない",
    cons: "キッチンのシンクサイズに合うか要確認",
  },
  {
    type: "折りたたみ式",
    pros: "収納がコンパクト。使い終わったら畳める",
    cons: "安定感がやや劣る場合がある",
  },
  {
    type: "マット型（沐浴マット）",
    pros: "赤ちゃんを寝かせられるので両手が使える。洗面台でも使用可能",
    cons: "お湯を溜める深さが浅い",
  },
  {
    type: "空気入れ式（エアタイプ）",
    pros: "柔らかく赤ちゃんにやさしい。旅行にも持ち運べる",
    cons: "空気漏れの可能性。乾かすのに時間がかかる",
  },
];

export default function BathingGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="沐浴・お風呂ガイド｜新生児の沐浴手順と温度・時間帯の目安"
        description="新生児の沐浴はいつからいつまで？お湯の温度（38〜40度）、手順、必要なもの、よくある不安への対処法をわかりやすく解説。1ヶ月健診後のお風呂への移行も。"
        path="/learn/bathing-guide"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["沐浴", "新生児 お風呂", "ベビーバス"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "沐浴・お風呂ガイド" },
            ]} />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">新生児</Badge>
              <Badge variant="secondary">日常ケア</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              沐浴・お風呂ガイド
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              はじめての沐浴は緊張するもの。手順がわかれば、きっと大丈夫です。
              赤ちゃんとの大切なスキンシップの時間を楽しんでください。
            </p>
          </div>

          <TableOfContents items={[
            { id: "about", label: "沐浴とは" },
            { id: "essentials", label: "必要なもの" },
            { id: "steps", label: "沐浴の手順" },
            { id: "temperature", label: "お湯の温度" },
            { id: "timing", label: "時間帯の目安" },
            { id: "worries", label: "よくある不安と対処" },
            { id: "transition", label: "1ヶ月健診後のお風呂への移行" },
            { id: "bath-types", label: "ベビーバスの種類" },
            { id: "references", label: "出典・参考文献" },
          ]} />

          {/* 沐浴とは */}
          <section id="about" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🛁</span>
              沐浴とは
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  沐浴とは、新生児をベビーバスなどで洗ってあげることです。
                  生まれたばかりの赤ちゃんは抵抗力が弱いため、大人と同じお風呂ではなく、
                  清潔なお湯で個別に洗ってあげます。
                </p>
                <div className="bg-primary/5 rounded-lg p-4">
                  <p className="text-sm text-foreground font-medium mb-1">期間の目安</p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">生後すぐ〜1ヶ月健診まで</strong>が一般的です。
                    1ヶ月健診で医師から許可が出れば、大人と一緒のお風呂に移行できます。
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 必要なもの */}
          <section id="essentials" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📦</span>
              必要なもの
            </h2>
            <div className="space-y-2">
              {essentials.map((e) => (
                <Card key={e.item} className="border-border/50 shadow-none">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{e.item}</p>
                        <p className="text-xs text-muted-foreground">{e.note}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 沐浴の手順 */}
          <section id="steps" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>👶</span>
              沐浴の手順（ステップバイステップ）
            </h2>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <Card key={step.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* お湯の温度 */}
          <section id="temperature" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🌡️</span>
              お湯の温度
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <div className="text-center mb-3">
                  <span className="text-3xl font-bold text-primary">38〜40℃</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  大人にとっては少しぬるいと感じる温度が赤ちゃんにはちょうど良い温度です。
                  湯温計を使うか、ひじの内側をお湯に入れて「ちょうどいいな」と感じる程度が目安です。
                  夏場は38度寄り、冬場は40度寄りにするとよいでしょう。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 時間帯の目安 */}
          <section id="timing" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🕐</span>
              時間帯の目安
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  <strong className="text-foreground">毎日だいたい同じ時間</strong>に入れるのが理想です。
                  生活リズムを整えるきっかけになります。
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#9679;</span>
                    午前中〜お昼過ぎがおすすめ（授乳の直後は避けて、1時間ほど空けると◎）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#9679;</span>
                    夕方〜夜でもOK。ただし遅すぎると赤ちゃんが疲れてぐずりやすい
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#9679;</span>
                    所要時間は5〜10分が目安。長湯は禁物です
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* よくある不安と対処 */}
          <section id="worries" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💬</span>
              よくある不安と対処
            </h2>
            <div className="space-y-3">
              {worries.map((w) => (
                <Card key={w.question} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-2">Q. {w.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{w.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 1ヶ月健診後のお風呂への移行 */}
          <section id="transition" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🚿</span>
              1ヶ月健診後のお風呂への移行
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  1ヶ月健診で医師から「大人と一緒に入っても大丈夫」と言われたら、お風呂デビューです。
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    最初はお湯を少なめにして、浅く入れるところから
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    バスマットやバスチェアがあると安心
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    脱衣所に着替えとバスタオルを用意してから入る
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    ワンオペのときは自分を先に洗い、赤ちゃんは最後に入れるとスムーズ
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    入浴時間は10〜15分程度に
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* ベビーバスの種類 */}
          <section id="bath-types" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🧴</span>
              ベビーバスの種類
            </h2>
            <div className="space-y-3">
              {bathTypes.map((bt) => (
                <Card key={bt.type} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-2">{bt.type}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary font-medium">メリット:</span> {bt.pros}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-amber-600 font-medium">注意点:</span> {bt.cons}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 出典 */}
          <section id="references" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📚</span>
              出典・参考文献
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 日本小児皮膚科学会「新生児・乳児の皮膚ケアに関するQ&A」.{" "}
                    <a href="https://jspd.umin.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">日本小児皮膚科学会</a>
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 日本小児科学会「乳幼児身体発育評価マニュアル」（2021年）.
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 厚生労働省「乳幼児健康診査 身体診察マニュアル」（母子保健課・乳児期の日常ケアに関する項）.
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 国立成育医療研究センター「新生児の沐浴と保湿ケア」.{" "}
                    <a href="https://www.ncchd.go.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">国立成育医療研究センター</a>
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
              赤ちゃんの肌トラブルや体調に不安がある場合は、小児科医またはかかりつけ医にご相談ください。
            </p>
          </div>

          <ShareButtons title="沐浴・お風呂ガイド" path="/learn/bathing-guide" />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn" className={buttonVariants({ variant: "outline" })}>
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
