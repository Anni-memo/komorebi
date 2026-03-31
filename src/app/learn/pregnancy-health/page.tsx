import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "妊娠中の体調トラブルと病気ガイド",
  description:
    "妊娠中に気をつけたい症状・病気と受診の目安。妊娠高血圧症候群、妊娠糖尿病、切迫早産などを整理。",
};

const commonTroubles = [
  {
    name: "つわり",
    period: "妊娠5〜16週ごろ",
    detail:
      "吐き気・嘔吐・食欲低下が代表的。多くは妊娠16週ごろまでに落ち着きます。水分も取れない・体重が急減する場合は「妊娠悪阻」の可能性があるため受診してください。",
    icon: "&#129326;",
  },
  {
    name: "便秘・痔",
    period: "妊娠全期",
    detail:
      "プロゲステロン（黄体ホルモン）の影響で腸の動きが鈍くなり、後期は子宮の圧迫も加わります。水分・食物繊維を意識し、改善しなければ産科で相談を。",
    icon: "&#128137;",
  },
  {
    name: "腰痛",
    period: "妊娠中期〜後期",
    detail:
      "体重増加と重心の変化、リラキシンというホルモンによる関節の緩みが原因です。骨盤ベルトの使用やストレッチが有効。痛みが強い場合は医師に相談を。",
    icon: "&#129468;",
  },
  {
    name: "むくみ（浮腫）",
    period: "特に妊娠後期",
    detail:
      "血液量の増加や子宮による血管圧迫が原因。足を高くして休む、適度な運動が有効です。急なむくみ＋頭痛・視覚異常がある場合は妊娠高血圧症候群の可能性があるため、すぐに受診してください。",
    icon: "&#129462;",
  },
  {
    name: "貧血",
    period: "妊娠中期以降",
    detail:
      "胎児への鉄分供給が増え、母体が鉄欠乏性貧血になりやすくなります。立ちくらみ・動悸・息切れがあれば健診で相談を。鉄剤の処方で改善することが多いです。",
    icon: "&#128167;",
  },
];

const seriousConditions = [
  {
    name: "妊娠高血圧症候群",
    urgency: "要注意",
    urgencyColor: "bg-red-100 text-red-700",
    detail:
      "妊娠20週以降に血圧140/90mmHg以上、またはタンパク尿を伴う状態。重症化すると母子ともに危険です。頭痛・目がチカチカする・急なむくみがあればすぐに受診してください。",
    risk: "母体：子癇（けいれん）、HELLP症候群。胎児：発育不全、常位胎盤早期剥離。",
  },
  {
    name: "妊娠糖尿病",
    urgency: "管理が必要",
    urgencyColor: "bg-amber-100 text-amber-700",
    detail:
      "妊娠中に初めて発見・発症する血糖異常。妊娠中期の血糖検査（糖負荷試験）で診断されます。食事療法が基本で、必要に応じてインスリン治療を行います。",
    risk: "巨大児（4,000g以上）、新生児低血糖、難産のリスク。産後に2型糖尿病に移行する可能性も。",
  },
  {
    name: "切迫早産",
    urgency: "安静が必要",
    urgencyColor: "bg-amber-100 text-amber-700",
    detail:
      "妊娠22〜37週未満に、規則的なお腹の張りや子宮頸管の短縮が見られる状態。出血を伴うこともあります。安静が第一で、状態によっては入院・点滴治療が必要です。",
    risk: "早産児は呼吸障害・低体温などのリスクがあるため、できるだけ妊娠を継続することが重要。",
  },
  {
    name: "前置胎盤",
    urgency: "管理入院の可能性",
    urgencyColor: "bg-amber-100 text-amber-700",
    detail:
      "胎盤が子宮口の一部または全部を覆っている状態。妊娠後期に大量出血のリスクがあり、帝王切開での分娩が基本です。出血があった場合は安静にしてすぐに受診を。",
    risk: "突然の大量出血により母子ともに危険になる可能性。管理入院で慎重に経過を観察します。",
  },
  {
    name: "常位胎盤早期剥離",
    urgency: "救急",
    urgencyColor: "bg-red-100 text-red-700",
    detail:
      "正常な位置にある胎盤が、分娩前に子宮壁からはがれてしまう状態。突然の激しい腹痛と出血が特徴で、一刻を争う緊急事態です。",
    risk: "母体：大量出血・DIC（播種性血管内凝固症候群）。胎児：酸素供給の途絶。迷わず救急車を呼んでください。",
  },
];

const infections = [
  {
    name: "風疹",
    risk: "高",
    riskColor: "border-red-200",
    detail:
      "妊娠初期（特に12週まで）に感染すると、胎児に先天性風疹症候群（心疾患・白内障・難聴）を引き起こすリスクがあります。",
    prevention:
      "妊娠前に抗体検査を受け、抗体が低ければワクチン接種を（妊娠中は接種不可）。パートナーのワクチン接種も重要です。",
  },
  {
    name: "トキソプラズマ",
    risk: "中",
    riskColor: "border-amber-200",
    detail:
      "初感染の場合、胎盤を通じて胎児に感染し、先天性トキソプラズマ症（水頭症・脈絡膜網膜炎など）のリスクがあります。",
    prevention:
      "生肉・加熱不十分な肉を避ける。猫のトイレ掃除は他の家族に任せる。ガーデニングは手袋を着用し、作業後はよく手を洗う。",
  },
  {
    name: "サイトメガロウイルス（CMV）",
    risk: "中",
    riskColor: "border-amber-200",
    detail:
      "上の子の唾液・尿などから感染することが多く、妊娠中の初感染で胎児に先天性CMV感染症（難聴・発達遅延など）を引き起こす可能性があります。",
    prevention:
      "上の子の食べ残しを食べない、食器を共有しない、おむつ替え・鼻水の処理後は手洗いを徹底する。",
  },
  {
    name: "リステリア",
    risk: "中",
    riskColor: "border-amber-200",
    detail:
      "リステリア菌に汚染された食品から感染。妊婦は一般の人より約20倍感染しやすいとされ、流産・早産・新生児感染のリスクがあります。",
    prevention:
      "ナチュラルチーズ（加熱殺菌されていないもの）、生ハム・スモークサーモンなどの非加熱食肉製品を避ける。食品は十分に加熱してから食べる。",
  },
];

const emergencySigns = [
  "性器出血（量にかかわらず）",
  "強い腹痛・お腹が板のように硬くなる",
  "破水感（水っぽいおりものが止まらない）",
  "胎動の明らかな減少・消失",
  "激しい頭痛・目がチカチカする（視覚異常）",
  "38度以上の発熱",
  "急激なむくみ（顔・手がパンパンになる）",
];

export default function PregnancyHealthPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">健康・病気</Badge>
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge variant="outline">5分で読める</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              妊娠中の体調トラブルと病気ガイド
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              妊娠中は体にさまざまな変化が起こります。
              「これは普通？」「受診すべき？」と迷う場面も多いですよね。
              このページでは、よくある体調トラブルから注意が必要な病気まで、受診の目安とあわせて整理しています。
            </p>
          </div>

          {/* 重要なお知らせ */}
          <Card className="border-red-200 bg-red-50/50 shadow-none mb-8 dark:bg-red-950/20 dark:border-red-900/50">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>&#9888;</span>
                出血・強い腹痛・破水感はすぐ受診
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                妊娠中の出血、強い腹痛、破水感がある場合は、時間帯にかかわらず、すぐにかかりつけの産科に連絡してください。
                夜間・休日で連絡がつかない場合は救急車を呼んでください。
              </p>
            </CardContent>
          </Card>

          {/* 妊娠中に多い体調トラブル */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#129328;</span>
              妊娠中に多い体調トラブル
            </h2>
            <div className="space-y-3">
              {commonTroubles.map((item) => (
                <Card key={item.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span
                        className="text-xl shrink-0 mt-0.5"
                        aria-hidden
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">
                            {item.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 注意が必要な病気 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#127973;</span>
              注意が必要な病気
            </h2>
            <div className="space-y-3">
              {seriousConditions.map((item) => (
                <Card key={item.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <Badge
                        className={`${item.urgencyColor} border-0 text-xs shrink-0`}
                      >
                        {item.urgency}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {item.detail}
                    </p>
                    <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                      <strong className="text-foreground">リスク:</strong>{" "}
                      {item.risk}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 感染症に注意 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#129440;</span>
              感染症に注意
            </h2>
            <div className="space-y-4">
              {infections.map((item) => (
                <Card
                  key={item.name}
                  className={`${item.riskColor} shadow-none`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {item.detail}
                    </p>
                    <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                      <strong className="text-foreground">予防:</strong>{" "}
                      {item.prevention}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 受診の目安チェックリスト */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128680;</span>
              すぐ受診すべきサイン
            </h2>
            <Card className="border-red-200 shadow-none dark:border-red-900/50">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground mb-3">
                  以下の症状が一つでもあれば、すぐにかかりつけ産科に連絡してください。連絡がつかない場合は救急車（119番）を呼んでください。
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

          {/* 出典・免責事項 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考文献
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 日本産科婦人科学会.
                    &quot;妊娠高血圧症候群（HDP）の診療指針.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 日本糖尿病・妊娠学会.
                    &quot;妊娠糖尿病の診断と管理.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 国立感染症研究所.
                    &quot;先天性感染症（風疹・トキソプラズマ・CMV）.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 厚生労働省.
                    &quot;リステリアによる食中毒について.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、医療アドバイスに代わるものではありません。
              症状に不安がある場合は、必ずかかりつけの産科にご相談ください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/fever-guide"
              className={buttonVariants({ variant: "outline" })}
            >
              子どもの発熱対応ガイドを見る
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
