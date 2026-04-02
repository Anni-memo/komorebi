import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "RSVワクチン（アブリスボ）判断ガイド",
  description:
    "妊婦向けRSVワクチン（Abrysvo）のリスク・リターン・最新情報を整理。2026年4月から定期接種開始。判断に必要な情報をまとめました。",
};

const efficacyData = [
  { value: "81.8%", label: "生後90日以内の重篤なRSV下気道疾患を予防", source: "MATISSE Phase 3試験" },
  { value: "69.4%", label: "生後180日以内の重篤なRSV感染症を予防", source: "MATISSE Phase 3試験" },
  { value: "57.1%", label: "重症RSV下気道感染症の予防効果", source: "Kampmann et al. NEJM 2023" },
];

const vaccinationRisks = [
  {
    title: "局所反応",
    detail: "注射部位の痛み・腫れ・発赤（約70%に出現、数日で改善）",
    severity: "軽度",
  },
  {
    title: "全身反応",
    detail: "倦怠感・頭痛・筋肉痛・吐き気（約40〜50%に出現）",
    severity: "軽度",
  },
  {
    title: "早産リスク（注意点）",
    detail: "ワクチン群5.7% vs プラセボ群4.7%（統計的に有意差なし）。妊娠28〜36週の接種で対応。米国VSDデータでは4.1%と通常範囲内",
    severity: "管理可能",
  },
  {
    title: "重篤な副反応",
    detail: "アナフィラキシー等は極めてまれ。接種後30分の院内観察で対応",
    severity: "極めてまれ",
  },
  {
    title: "長期安全性データ",
    detail: "2023年承認のため、超長期データは今後の蓄積待ち。GBS（ギラン・バレー症候群）リスクは65歳以上の高齢者で指摘されているが、妊婦での増加は確認されていない",
    severity: "経過観察",
  },
];

const noVaccineRisks = [
  {
    title: "乳児の入院リスク",
    detail: "RSVは生後6ヶ月未満の乳児入院原因の第1位",
    importance: "最重要",
  },
  {
    title: "乳児自身はワクチン接種不可",
    detail: "生後数ヶ月はRSVワクチンの対象外。母体からの移行抗体が唯一の予防手段",
    importance: "重要",
  },
  {
    title: "重篤な下気道疾患",
    detail: "細気管支炎・肺炎に進行するリスク。呼吸困難・酸素投与が必要になるケースも",
    importance: "重要",
  },
  {
    title: "早産児・低出生体重児",
    detail: "肺機能が未成熟なため、特に重症化リスクが高い",
    importance: "重要",
  },
  {
    title: "NICU入院・人工呼吸の可能性",
    detail: "最重症例では集中治療が必要。家族・経済的負担も大きい",
    importance: "重要",
  },
];

const recommendCases = [
  "妊娠28〜36週で流行シーズン（秋〜冬）に分娩予定",
  "早産リスクが低い",
  "赤ちゃんが冬生まれ（RSV流行時期と重なる）",
  "初産婦で育児負担を軽減したい",
];

const cautionCases = [
  "早産リスクが高い（切迫早産など）",
  "28週未満での接種を検討している",
  "アレルギー既往歴がある",
  "夏生まれで流行シーズンと重ならない可能性",
];

export default function RSVVaccinePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge variant="secondary">予防接種</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">
                2026年4月〜 定期接種開始
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              RSVワクチン（アブリスボ）
              <br />
              リスク・リターン判断ガイド
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              赤ちゃんをRSウイルスから守るための、接種前に知っておくべき情報を整理しました。
              このページは判断を強制するものではなく、必要な情報を提供するためのものです。
            </p>
          </div>

          {/* 重要なお知らせ */}
          <Card className="border-primary/30 bg-primary/5 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>📢</span>
                2026年4月から定期接種が始まりました（原則無料）
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                これまで全額自己負担（約3万円）だったアブリスボが、2026年4月から公費で受けられるようになりました。
                対象は<strong className="text-foreground">妊娠28週0日〜36週6日の妊婦</strong>で、1回の筋肉注射です。
                過去の妊娠時に接種した方も対象になります。
              </p>
            </CardContent>
          </Card>

          {/* 有効性データ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📊</span>
              有効性データ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {efficacyData.map((d) => (
                <Card key={d.value} className="border-border/50 shadow-none">
                  <CardContent className="pt-5 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{d.value}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              出典: MATISSE Phase 3 RCT（18ヵ国・N=7,358）、Kampmann et al. NEJM 2023
            </p>
          </section>

          {/* なぜ妊娠中の接種が重要か */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">
                なぜ妊娠中の接種が重要なのか？
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                生まれたばかりの赤ちゃん自身はRSVワクチンを接種できません。
                妊婦が接種することで母体でつくられた抗体が胎盤を経由して赤ちゃんに移行し、
                生後最も危険な数ヶ月間を守ります。
              </p>
            </CardContent>
          </Card>

          {/* アブリスボとベイフォータスの違い */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔬</span>
              アブリスボとベイフォータスの違い
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-2 pr-4 font-semibold text-foreground w-1/2">アブリスボ（ファイザー）</th>
                        <th className="text-left py-2 font-semibold text-foreground w-1/2">ベイフォータス（サノフィ/AstraZeneca）</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/30">
                        <td className="py-2 pr-4">妊婦に接種する母子免疫ワクチン。胎盤経由で抗体を赤ちゃんに移行</td>
                        <td className="py-2">乳児に直接投与するモノクローナル抗体製剤（ニルセビマブ）</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-2 pr-4">2026年4月から定期接種（無料）</td>
                        <td className="py-2">2024年3月承認。任意接種（自費、数万円）</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-2 pr-4">1回の筋肉注射</td>
                        <td className="py-2">1回の筋肉注射。RSVシーズン前に投与</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">併用ではなく選択肢:</strong>{" "}
                    原則どちらか一方を選びます。アブリスボを接種した妊婦から生まれた赤ちゃんは、ベイフォータスは不要とされています。
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">従来のシナジス（パリビズマブ）との違い:</strong>{" "}
                    シナジスはハイリスク児に毎月投与が必要でしたが、ベイフォータスは1回で済みます。
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 打つリスク */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⚠️</span>
              打つリスク（副反応・懸念事項）
            </h2>
            <div className="space-y-3">
              {vaccinationRisks.map((risk, i) => (
                <Card key={risk.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{risk.title}</h3>
                          <Badge variant="outline" className="text-xs">{risk.severity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{risk.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 打たないリスク */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔴</span>
              打たないリスク（赤ちゃんへの影響）
            </h2>
            <div className="space-y-3">
              {noVaccineRisks.map((risk, i) => (
                <Card key={risk.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{risk.title}</h3>
                          <Badge variant="outline" className="text-xs">{risk.importance}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{risk.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 判断ガイド */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💡</span>
              判断の参考
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-primary/30 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-primary">積極的に検討したい場合</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recommendCases.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-komorebi-warm/30 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-amber-700">担当医と慎重に相談する場合</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cautionCases.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-amber-600 mt-0.5 shrink-0">&#9888;</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">出典・参考文献</h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> Kampmann B, et al. &quot;Bivalent Prefusion F Vaccine in Pregnancy to Prevent RSV Illness in Infants.&quot; <em>N Engl J Med.</em> 2023;388:1451-1464.
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> FDA. Abrysvo Prescribing Information. Approved August 21, 2023.
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> CDC. &quot;RSV Immunization Coverage Among Infants.&quot; <em>MMWR.</em> 2024;74(31).
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 日本小児科学会. &quot;RSウイルス母子免疫ワクチンに関する考え方.&quot; 2024年.
                  </li>
                  <li>
                    <strong className="text-foreground">[5]</strong> 厚生労働省 予防接種・ワクチン分科会. RSVワクチン定期接種化決定. 2025年.
                  </li>
                  <li>
                    <strong className="text-foreground">[6]</strong> WHO. RSVワクチン事前認証（Prequalification）. 2025年3月.
                  </li>
                  <li>
                    <strong className="text-foreground">[7]</strong> 厚生労働省. RSウイルスワクチン定期接種開始について. 2026年4月.{" "}
                    <a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/rs/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">厚生労働省</a>
                  </li>
                  <li>
                    <strong className="text-foreground">[8]</strong> 国立成育医療研究センター. RSV母子免疫ワクチンの接種率調査. 2026年1月.
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
              接種の可否・タイミングについては、必ず担当の産婦人科医または医療機関にご相談ください。
              個人の健康状態・妊娠経過・在住地域のRSV流行状況等によって、最適な判断は異なります。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/vaccination-schedule" className={buttonVariants({ variant: "outline" })}>
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
