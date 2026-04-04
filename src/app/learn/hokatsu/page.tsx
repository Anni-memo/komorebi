import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "保活ガイド - 保育園探しの全体像",
  description:
    "保活のスケジュール・保育園の種類・見学ポイント・必要書類・点数制度をわかりやすく解説。初めての保活でも安心して進められます。",
};

const schedule = [
  {
    period: "出産前〜産後すぐ",
    tasks: [
      "住んでいる自治体の保育園情報を収集",
      "認可・認可外・小規模など種類を把握",
      "入園希望時期を決める",
    ],
  },
  {
    period: "4月入園の場合：前年4〜8月",
    tasks: [
      "候補の保育園をリストアップ",
      "見学の予約を開始",
      "自治体の保育課に点数制度を確認",
    ],
  },
  {
    period: "前年9〜11月",
    tasks: [
      "見学を完了させる",
      "希望順位を決める",
      "申請書類を準備・記入",
    ],
  },
  {
    period: "前年11〜12月",
    tasks: [
      "申請書類を提出（自治体により締切が異なる）",
      "就労証明書など勤務先からの書類を取得",
    ],
  },
  {
    period: "1〜2月",
    tasks: [
      "一次選考の結果通知",
      "内定した場合：入園説明会・面談",
      "不承諾の場合：二次募集に申請",
    ],
  },
  {
    period: "3月",
    tasks: [
      "入園準備（持ち物・名前つけ等）",
      "慣らし保育のスケジュール確認",
    ],
  },
];

const nurseryTypes = [
  {
    name: "認可保育園",
    description: "国の基準を満たし、自治体が管理。保育料は所得に応じて決定。最も一般的な選択肢。",
    pros: "保育料が所得連動で抑えられる、基準が明確",
    cons: "競争率が高い地域がある",
  },
  {
    name: "認可外保育施設",
    description: "都道府県に届出をした施設。認可基準とは異なる独自の基準で運営。",
    pros: "空きがある場合が多い、独自のカリキュラム",
    cons: "保育料が高めの場合がある、施設差が大きい",
  },
  {
    name: "小規模保育事業（A・B・C型）",
    description: "定員6〜19名の少人数保育。0〜2歳児対象。家庭的な雰囲気。",
    pros: "少人数で手厚い保育、自宅近くにある場合が多い",
    cons: "3歳以降の転園が必要",
  },
  {
    name: "企業主導型保育事業",
    description: "企業が設置する保育施設。従業員枠と地域枠がある。",
    pros: "職場近くで便利、認可並みの保育料の場合も",
    cons: "定員が少ない、企業の方針変更リスク",
  },
  {
    name: "認定こども園",
    description: "幼稚園と保育園の機能を併せ持つ施設。教育と保育の両方を提供。",
    pros: "教育的な活動が充実、保護者の就労状況が変わっても継続可能",
    cons: "地域によっては数が少ない",
  },
];

const visitChecklist = [
  { category: "安全面", items: ["施設の清潔さ", "安全対策（柵・ロック等）", "避難訓練の頻度", "SIDS対策（午睡チェック）"] },
  { category: "保育内容", items: ["1日のスケジュール", "外遊びの頻度", "食事（自園調理かどうか）", "アレルギー対応"] },
  { category: "体制", items: ["保育士の人数と配置", "保育士の雰囲気・子どもへの接し方", "園長の方針", "職員の定着率"] },
  { category: "実務面", items: ["登降園の時間・延長保育", "持ち物の量（布おむつ・布団等）", "保護者参加行事の頻度", "病児・病後児保育の対応"] },
];

const documents = [
  { name: "入園申込書", detail: "自治体の保育課窓口またはWebサイトで入手" },
  { name: "就労証明書", detail: "勤務先に依頼（発行に1〜2週間かかる場合あり）" },
  { name: "課税証明書・所得証明書", detail: "保育料算定に使用。マイナンバー提出で省略できる自治体も" },
  { name: "母子健康手帳の写し", detail: "出産前の申請時に必要な場合あり" },
  { name: "復職証明書", detail: "育休中の場合、復職予定を証明する書類" },
];

const scoringFactors = [
  { factor: "就労状況", description: "フルタイム勤務が最も高い点数。週の就労時間・日数で変動", example: "フルタイム: 20点 / パート: 10〜18点（自治体による）" },
  { factor: "世帯構成", description: "ひとり親・祖父母同居の有無など", example: "ひとり親: 加点あり" },
  { factor: "兄弟関係", description: "きょうだいが同じ園に在園中だと加点", example: "兄弟加点: +2〜3点" },
  { factor: "育休復帰", description: "育休明けの復職で加点される自治体が多い", example: "育休復帰加点: +1〜2点" },
  { factor: "認可外利用実績", description: "認可外保育施設の利用実績がある場合に加点", example: "利用実績加点: +1〜2点" },
];

const rejectionOptions = [
  {
    title: "二次募集に申請する",
    description: "一次で空きが出た園への申請。締切が早いので結果通知後すぐ確認を。",
  },
  {
    title: "認可外保育施設を検討する",
    description: "認可外に入園しながら翌年度の認可を再申請する方法。利用実績の加点がつく自治体も。",
  },
  {
    title: "育休を延長する",
    description: "不承諾通知があれば、育児休業給付金の延長申請が可能（最大2歳まで）。",
  },
  {
    title: "他の自治体の施設も確認",
    description: "隣接自治体の保育施設が利用可能な場合もある。広域入園制度を確認。",
  },
  {
    title: "企業主導型保育を探す",
    description: "地域枠があれば、勤務先に関係なく利用可能な場合がある。",
  },
];

export default function HokatsuPage() {
  return (
    <>
      <ArticleJsonLd
        title="保活ガイド - 保育園探しの全体像"
        description="保活のスケジュール・保育園の種類・見学ポイント・必要書類・点数制度をわかりやすく解説。初めての保活でも安心して進められます。"
        path="/learn/hokatsu"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["保活", "保育園", "入園申請"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">保活</Badge>
              <Badge variant="secondary">保育園を考えている方向け</Badge>
              <Badge variant="outline">保存版</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              保活ガイド
              <br />
              保育園探しの全体像をつかもう
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              「保活って何から始めればいいの？」という不安に応えるために、
              スケジュール・保育園の種類・見学のポイント・書類・点数制度まで、
              全体像を整理しました。
            </p>
          </div>

          {/* 全体スケジュール */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128197;</span>
              保活の全体スケジュール
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              4月入園を目指す場合の一般的なスケジュールです。自治体によって時期が異なるため、
              お住まいの自治体の保育課に必ず確認してください。
            </p>
            <div className="space-y-3">
              {schedule.map((step, i) => (
                <Card key={step.period} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {step.period}
                        </h3>
                        <ul className="space-y-1">
                          {step.tasks.map((task) => (
                            <li
                              key={task}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-1 shrink-0">&#8226;</span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 保育園の種類 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#127979;</span>
              保育園の種類
            </h2>
            <div className="space-y-3">
              {nurseryTypes.map((type) => (
                <Card key={type.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-foreground mb-1">{type.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {type.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-primary shrink-0">&#9675;</span>
                        <span className="text-muted-foreground">{type.pros}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-600 shrink-0">&#9651;</span>
                        <span className="text-muted-foreground">{type.cons}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 見学チェックポイント */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128270;</span>
              見学のチェックポイント
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              見学は電話で予約するのが一般的です。午前中（子どもたちが活動している時間）がおすすめです。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visitChecklist.map((group) => (
                <Card key={group.category} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-primary">
                      {group.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-0.5 shrink-0">&#9744;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 必要書類 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128196;</span>
              必要書類
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3">
                  {documents.map((doc) => (
                    <li key={doc.name} className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/10 text-primary text-xs shrink-0 mt-0.5">
                        &#10003;
                      </span>
                      <div>
                        <span className="font-medium text-foreground text-sm">
                          {doc.name}
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {doc.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded-lg">
                  必要書類は自治体によって異なります。申請前にお住まいの自治体の保育課に確認してください。
                  就労証明書は発行に時間がかかるため、早めに勤務先に依頼しましょう。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 点数制度 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128290;</span>
              点数制度の基本
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              認可保育園の選考は「点数制」で行われます。基本指数（就労状況等）と調整指数（加点・減点）の
              合計で優先順位が決まります。点数の基準は自治体ごとに異なります。
            </p>
            <div className="space-y-3">
              {scoringFactors.map((item) => (
                <Card key={item.factor} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {item.factor}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground bg-muted/30 rounded px-2 py-1 inline-block">
                      例: {item.example}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 落ちたときの対処法 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128161;</span>
              落ちたときの対処法
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-4">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  不承諾になっても、落ち込みすぎないでください。
                  多くの自治体では二次募集がありますし、年度途中の空きが出ることもあります。
                  できることを一つずつ進めていきましょう。
                </p>
              </CardContent>
            </Card>
            <div className="space-y-3">
              {rejectionOptions.map((option, i) => (
                <Card key={option.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 出典・免責事項 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">出典・参考</h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 内閣府.
                    &quot;子ども・子育て支援新制度について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 厚生労働省.
                    &quot;保育所等関連状況取りまとめ.&quot; 各年度.
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong>{" "}
                    各自治体の保育課案内資料（入園のしおり等）.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、特定の自治体の制度を保証するものではありません。
              保育園の申請方法・点数制度・締切は自治体ごとに異なります。
              必ずお住まいの自治体の保育課にご確認ください。
              掲載情報は2026年3月時点のものです。
            </p>
          </div>

          <div className="mt-8">
            <PdfDownloadSection
              title="保活スケジュール"
              catchcopy="見学から内定まで、やること全部"
              description="月別のやることリスト、必要書類、見学チェックポイントを1枚にまとめました。"
              pdfPath="/pdf/hokatsu.pdf"
              usageTips={[
                { icon: "print", text: "手帳に挟んで持ち歩く" },
                { icon: "share", text: "夫婦で分担を決める" },
                { icon: "other", text: "見学メモ欄付き" },
              ]}
            />
          </div>

          <div className="mt-4">
            <PdfDownloadSection
              title="保育園比較シート"
              catchcopy="見学メモをこの1枚に"
              description="3園を並べて比較できる記入式シート。見学時に持参して、その場で記入できます。"
              pdfPath="/pdf/nursery-comparison.pdf"
              usageTips={[
                { icon: "print", text: "見学時に持参して記入" },
                { icon: "share", text: "夫婦で比較検討" },
                { icon: "other", text: "○△×で簡単評価" },
              ]}
            />
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/postnatal-procedures"
              className={buttonVariants({ variant: "outline" })}
            >
              出産後の手続き一覧を見る
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
