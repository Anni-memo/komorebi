import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "子どもの発熱対応ガイド",
  description:
    "子どもが熱を出したときの月齢別対応・受診の目安・家でできるケア・救急に行くべきサインをわかりやすく解説。#8000の使い方も。",
};

const ageResponses = [
  {
    age: "生後3ヶ月未満",
    temperature: "38.0°C以上",
    action: "すぐに医療機関を受診してください",
    detail:
      "この月齢の発熱は重篤な感染症の可能性があります。夜間・休日でも迷わず受診してください。",
    urgency: "即受診",
    urgencyColor: "bg-red-100 text-red-700",
  },
  {
    age: "生後3〜6ヶ月",
    temperature: "38.0°C以上",
    action: "早めに医療機関を受診",
    detail:
      "元気があっても、この月齢では早めの受診が安心です。特に初めての発熱の場合は必ず受診を。",
    urgency: "早めに受診",
    urgencyColor: "bg-amber-100 text-amber-700",
  },
  {
    age: "生後6ヶ月〜1歳",
    temperature: "38.5°C以上",
    action: "様子を見つつ、改善しなければ受診",
    detail:
      "水分が取れていて機嫌がそこまで悪くなければ、翌日の受診でも対応可能な場合があります。ただし、ぐったりしている場合はすぐ受診を。",
    urgency: "状況により判断",
    urgencyColor: "bg-yellow-100 text-yellow-700",
  },
  {
    age: "1歳以上",
    temperature: "38.5°C以上",
    action: "全身状態を観察して判断",
    detail:
      "食欲・水分摂取・機嫌・活動量を総合的に判断します。高熱でも元気に遊んでいる場合は、翌日の受診で対応できることも。",
    urgency: "状況により判断",
    urgencyColor: "bg-yellow-100 text-yellow-700",
  },
];

const visitGuidelines = [
  {
    category: "すぐに受診すべきとき",
    color: "border-red-200",
    items: [
      "生後3ヶ月未満の発熱（38.0°C以上）",
      "けいれんを起こした（初めて・5分以上続く場合は救急車）",
      "意識がもうろうとしている",
      "ぐったりして反応が薄い",
      "呼吸が苦しそう（肩で息をする・陥没呼吸）",
      "顔色が悪い（青白い・土色）",
      "水分をまったく受け付けない",
    ],
  },
  {
    category: "翌日に受診で対応できることが多いとき",
    color: "border-amber-200",
    items: [
      "38.5°C以上だが水分が取れている",
      "多少機嫌が悪いが、反応はしっかりしている",
      "咳・鼻水はあるが呼吸は楽そう",
      "発熱が3日以上続いている",
    ],
  },
];

const homeCare = [
  {
    title: "水分補給",
    description:
      "少量ずつ、こまめに水分を与えます。母乳・ミルク・経口補水液（OS-1等）が適しています。嫌がらなければ薄めたイオン飲料も可。",
    icon: "&#128167;",
  },
  {
    title: "室温・衣服の調整",
    description:
      "悪寒がある（手足が冷たい）ときは温かくし、熱が上がりきった（手足が温かい・汗をかいている）ら薄着にして放熱を助けます。",
    icon: "&#127777;",
  },
  {
    title: "クーリング",
    description:
      "嫌がらなければ、首・わきの下・太ももの付け根を保冷剤やタオルで冷やします。おでこの冷却シートは気持ちよさの効果が主で、解熱効果は限定的です。",
    icon: "&#10052;",
  },
  {
    title: "安静と睡眠",
    description:
      "無理に食べさせなくても大丈夫です。水分が取れていれば、食欲は回復とともに戻ります。ゆっくり休ませてあげてください。",
    icon: "&#128164;",
  },
  {
    title: "体温の記録",
    description:
      "1日3〜4回、体温を測って記録しましょう。受診時に医師に伝えると診断の助けになります。",
    icon: "&#128203;",
  },
];

const antipyreticInfo = [
  {
    question: "使ってよい解熱剤は？",
    answer:
      "子どもに使えるのはアセトアミノフェン（カロナール等）です。イブプロフェン（ブルフェン等）は医師の指示がある場合に限ります。アスピリンは子どもには使用禁止です（ライ症候群のリスク）。",
  },
  {
    question: "いつ使う？",
    answer:
      "38.5°C以上で、つらそう・眠れない・水分が取れないときに使用を検討します。解熱剤は体温を下げるだけで、病気を治すものではありません。元気であれば無理に下げる必要はありません。",
  },
  {
    question: "使用間隔は？",
    answer:
      "最低4〜6時間あけてください。1日の使用回数は添付文書に従います。効果が出るまで30分〜1時間程度かかります。",
  },
  {
    question: "座薬と飲み薬、どちらがいい？",
    answer:
      "効果に大きな差はありません。吐き気がある場合は座薬が確実です。座薬は挿入後すぐに排出された場合は再挿入可能ですが、10分以上経っていれば吸収されているので追加しないでください。",
  },
];

const emergencySigns = [
  "けいれんが5分以上続く、または繰り返す",
  "意識がない・呼びかけに反応しない",
  "呼吸困難（唇が紫色になる・チアノーゼ）",
  "嘔吐が止まらず、水分がまったく取れない",
  "ぐったりして、起き上がれない",
  "激しく泣き止まない（乳児で30分以上）",
  "発疹が急速に広がる（特に紫色の発疹）",
];

const consultationContacts = [
  {
    name: "#8000（子ども医療電話相談）",
    description:
      "全国共通の短縮番号。小児科医師・看護師に電話で相談できます。夜間・休日の急な子どもの病気やケガの対応について助言を受けられます。",
    hours: "自治体により異なるが、概ね19:00〜翌8:00（休日は日中も対応する地域あり）",
    how: "固定電話・携帯電話から「#8000」をダイヤル",
  },
  {
    name: "救急安心センター（#7119）",
    description:
      "救急車を呼ぶべきか迷ったときに相談できる窓口。一部の自治体で実施。",
    hours: "24時間対応（実施地域による）",
    how: "「#7119」をダイヤル",
  },
  {
    name: "かかりつけ医",
    description:
      "日頃から相談できる小児科を見つけておくと、いざというときに安心です。予防接種や健診で通い慣れた医院がベストです。",
    hours: "診療時間内",
    how: "通常の受診方法で",
  },
];

export default function FeverGuidePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">健康・病気</Badge>
              <Badge variant="secondary">すべての親向け</Badge>
              <Badge variant="outline">保存版</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              子どもの発熱対応ガイド
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              お子さんが熱を出すと心配になりますよね。
              このページでは、月齢別の対応・受診の目安・家でできるケアをまとめています。
              落ち着いて、一つずつ確認していきましょう。
            </p>
          </div>

          {/* 重要なお知らせ */}
          <Card className="border-red-200 bg-red-50/50 shadow-none mb-8 dark:bg-red-950/20 dark:border-red-900/50">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>&#9888;</span>
                生後3ヶ月未満の発熱は即受診
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                生後3ヶ月未満の赤ちゃんが38.0°C以上の熱を出した場合は、
                時間帯にかかわらず、すぐに医療機関を受診してください。
                この月齢の発熱は重篤な感染症のサインである可能性があります。
              </p>
            </CardContent>
          </Card>

          {/* 月齢別の対応 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128118;</span>
              月齢別の発熱時の対応
            </h2>
            <div className="space-y-3">
              {ageResponses.map((item) => (
                <Card key={item.age} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{item.age}</h3>
                      <Badge
                        className={`${item.urgencyColor} border-0 text-xs shrink-0`}
                      >
                        {item.urgency}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mb-1">
                      {item.temperature} → {item.action}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 受診の目安 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#127973;</span>
              受診の目安
            </h2>
            <div className="space-y-4">
              {visitGuidelines.map((group) => (
                <Card
                  key={group.category}
                  className={`${group.color} shadow-none`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{group.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-foreground mt-0.5 shrink-0">
                            &#8226;
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 家でできるケア */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#127968;</span>
              家でできるケア
            </h2>
            <div className="space-y-3">
              {homeCare.map((care) => (
                <Card key={care.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span
                        className="text-xl shrink-0 mt-0.5"
                        aria-hidden
                        dangerouslySetInnerHTML={{ __html: care.icon }}
                      />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {care.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {care.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 解熱剤の使い方 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128138;</span>
              解熱剤の使い方
            </h2>
            <div className="space-y-3">
              {antipyreticInfo.map((item) => (
                <Card key={item.question} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-foreground text-sm mb-2">
                      {item.question}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 救急に行くべきサイン */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128680;</span>
              救急車を呼ぶ・救急外来に行くべきサイン
            </h2>
            <Card className="border-red-200 shadow-none dark:border-red-900/50">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground mb-3">
                  以下の症状が一つでもあれば、迷わず救急車（119番）を呼んでください。
                </p>
                <ul className="space-y-2">
                  {emergencySigns.map((sign) => (
                    <li
                      key={sign}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="text-red-600 shrink-0 font-bold">!</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 相談先 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128222;</span>
              相談先
            </h2>
            <div className="space-y-3">
              {consultationContacts.map((contact) => (
                <Card
                  key={contact.name}
                  className="border-border/50 shadow-none"
                >
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-foreground mb-1">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {contact.description}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 rounded-lg p-3">
                      <p>
                        <strong className="text-foreground">対応時間:</strong>{" "}
                        {contact.hours}
                      </p>
                      <p>
                        <strong className="text-foreground">利用方法:</strong>{" "}
                        {contact.how}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 出典・免責事項 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考文献
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 日本小児科学会.
                    &quot;こどもの救急（ONLINE-QQ）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 厚生労働省.
                    &quot;子ども医療電話相談事業（#8000）について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 日本小児科学会.
                    &quot;小児の解熱鎮痛薬の使い方.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> AAP (American
                    Academy of Pediatrics). &quot;Fever in Infants and
                    Children.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、医療アドバイスに代わるものではありません。
              お子さんの症状に不安がある場合は、必ず医療機関にご相談ください。
              #8000（子ども医療電話相談）は夜間・休日にも利用可能です。
            </p>
          </div>

          <div className="mt-8">
            <PdfDownloadSection
              title="子どもの発熱 対応フローチャート"
              catchcopy="夜中の「どうしよう」に答える1枚"
              description="月齢別の受診目安、家でできるケア、救急の判断基準をまとめました。"
              pdfPath="/pdf/fever-guide.pdf"
              usageTips={[
                { icon: "print", text: "冷蔵庫に貼っておく" },
                { icon: "share", text: "祖父母にも共有" },
                { icon: "other", text: "体温記録欄付き" },
              ]}
            />
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/vaccination-schedule"
              className={buttonVariants({ variant: "outline" })}
            >
              予防接種スケジュールを見る
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
