"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleMeta } from "@/components/article-meta";

/* ─── 2026年の制度変更ハイライト ─── */
const highlights = [
  {
    label: "2026年4月〜",
    title: "子ども・子育て支援金制度",
    description:
      "医療保険料と一体で月額平均250円を徴収。財源は児童手当・こども誰でも通園制度など6事業に充当。",
    color: "bg-rose-100 text-rose-700",
  },
  {
    label: "2026年4月〜",
    title: "こども誰でも通園制度",
    description:
      "親の就労要件なしで月10時間まで利用可能。生後6ヶ月〜満3歳未満が対象。1時間あたり約300円。",
    color: "bg-sky-100 text-sky-700",
  },
  {
    label: "2026年10月〜",
    title: "国民年金 育児期間保険料免除",
    description:
      "自営業・フリーランスの方も子が1歳になるまで国民年金保険料（月約16,980円）が全額免除。納付済期間として算入。",
    color: "bg-emerald-100 text-emerald-700",
  },
];

/* ─── ライフステージ別 制度データ ─── */

interface Benefit {
  title: string;
  amount: string;
  who: string;
  where: string;
  deadline: string;
  notes: string;
  isNew?: boolean;
}

interface LifeStage {
  emoji: string;
  label: string;
  benefits: Benefit[];
}

const lifeStages: LifeStage[] = [
  {
    emoji: "🤰",
    label: "妊娠期",
    benefits: [
      {
        title: "妊婦のための支援給付",
        amount: "合計10万円相当（届出後5万円＋32週以降5万円×胎児数）",
        who: "妊娠届を提出した妊婦",
        where: "市区町村窓口（面談後に申請）",
        deadline: "妊娠届提出後すみやかに",
        notes:
          "2025年4月に法定給付に格上げ。伴走型相談支援とセット。流産・死産・人工妊娠中絶も対象。多胎児は2回目が人数×5万円。",
        isNew: true,
      },
      {
        title: "妊婦健診費用助成",
        amount: "公費負担14回（全国平均 約10〜12万円）",
        who: "妊娠届を提出した妊婦",
        where: "妊娠届提出時に受診票を交付",
        deadline: "妊娠届提出時",
        notes:
          "全市区町村で14回以上助成。助成額は自治体間で最大1.86倍の格差あり。受診票を医療機関窓口で提出。",
      },
    ],
  },
  {
    emoji: "👶",
    label: "出産〜育休期",
    benefits: [
      {
        title: "出産育児一時金",
        amount: "1児につき50万円",
        who: "公的医療保険の加入者",
        where: "加入保険組合・協会けんぽ・市区町村",
        deadline: "出産日の翌日から2年以内",
        notes:
          "多くの医療機関で「直接支払制度」が利用可能。窓口負担は差額のみ。正常分娩の全国平均は約51.8万円。出産費用の保険適用化は2026年度中に具体策とりまとめ予定。",
      },
      {
        title: "出生後休業支援給付金",
        amount: "育児休業給付金に+13%上乗せ（合計80%＝実質手取り10割）",
        who: "出生後8週以内に14日以上の育休を取得した父母",
        where: "事業主経由でハローワーク",
        deadline: "育児休業給付金と同時に申請",
        notes:
          "夫婦ともに取得が条件（配偶者が専業主婦/夫の場合は本人のみでも一定要件で対象可）。男性の育休取得促進が狙い。",
        isNew: true,
      },
      {
        title: "育児休業給付金",
        amount: "休業開始〜180日: 賃金の67%、181日以降: 50%",
        who: "雇用保険被保険者で育休を取得した方",
        where: "事業主経由でハローワーク",
        deadline: "育休開始日から4ヶ月後の月末まで",
        notes:
          "上記の出生後休業支援給付金と合算で、出生後8週間は実質手取り10割に。社会保険料免除も合わせて手取り減少を最小限に。",
      },
      {
        title: "育児時短就業給付金",
        amount: "時短勤務中の賃金の10%",
        who: "2歳未満の子を養育し時短勤務をする雇用保険被保険者",
        where: "事業主経由でハローワーク",
        deadline: "時短勤務開始後に申請",
        notes:
          "賃金＋給付金が時短前賃金を超えない範囲で調整。支給上限額あり（月459,000円基準）。",
        isNew: true,
      },
    ],
  },
  {
    emoji: "🧒",
    label: "0歳〜就学前",
    benefits: [
      {
        title: "児童手当",
        amount:
          "0〜3歳未満: 月15,000円 / 3歳〜高校生: 月10,000円 / 第3子以降: 全年齢 月30,000円",
        who: "18歳到達後の最初の3月31日までの子を養育する保護者",
        where: "住所地の市区町村役場",
        deadline: "出生日の翌日から15日以内（15日特例）",
        notes:
          "2024年10月に大幅拡充。所得制限撤廃、高校生まで延長。第3子のカウントは22歳年度末まで（大学生等も算入）。偶数月に2か月分支給。",
      },
      {
        title: "子ども医療費助成",
        amount: "医療費の自己負担を全額〜一部助成（自治体により異なる）",
        who: "多くの自治体で18歳（高校卒業）まで",
        where: "市区町村窓口で医療証を申請",
        deadline: "健康保険加入後すみやかに",
        notes:
          "東京23区は全区で高校生まで拡大済み。所得制限なしの自治体が増加中。自治体間格差が依然大きいため、お住まいの自治体で確認を。",
      },
      {
        title: "幼児教育・保育の無償化",
        amount:
          "3〜5歳: 保育料無償（上限あり。幼稚園月25,700円/認可外月37,000円）。0〜2歳: 住民税非課税世帯のみ無償",
        who: "3〜5歳の全世帯 + 0〜2歳の非課税世帯",
        where: "市区町村に施設等利用給付認定を申請",
        deadline: "利用開始前に申請",
        notes:
          "給食費・通園送迎費・行事費等は自己負担。東京都は2025年9月〜第1子も無償化。大阪市・京都市等も独自に第2子完全無償化を実施中。",
      },
      {
        title: "こども誰でも通園制度",
        amount: "1時間あたり約300円（月10時間まで）",
        who: "生後6ヶ月〜満3歳未満で保育所等に通っていない子",
        where: "「つうえんポータル」または市区町村窓口",
        deadline: "随時申込",
        notes:
          "親の就労要件不問。保育所・認定こども園・幼稚園等で実施。子どもの社会性発達や保護者のレスパイトを目的とした新制度。",
        isNew: true,
      },
      {
        title: "国民年金 育児期間保険料免除",
        amount: "国民年金保険料（月約16,980円）が全額免除",
        who: "国民年金第1号被保険者（自営業・フリーランス等）",
        where: "マイナポータル（電子申請）または市区町村窓口",
        deadline: "子が1歳になるまで",
        notes:
          "所得制限・休業要件なし。将来の年金額への影響なし（納付済期間として算入）。",
        isNew: true,
      },
    ],
  },
];

/* ─── トータル受給シミュレーション ─── */
const simulations = [
  {
    label: "第1子・第2子",
    items: [
      { name: "妊婦のための支援給付", amount: "10万円" },
      { name: "出産育児一時金", amount: "50万円" },
      { name: "児童手当（0〜18歳合計）", amount: "約234万円" },
      { name: "幼児教育・保育無償化（3〜5歳）", amount: "約100万円相当" },
    ],
    total: "約394万円〜",
    note: "育休給付金・医療費助成は含まず",
  },
  {
    label: "第3子以降",
    items: [
      { name: "妊婦のための支援給付", amount: "10万円" },
      { name: "出産育児一時金", amount: "50万円" },
      { name: "児童手当（0〜18歳合計）", amount: "約648万円" },
      { name: "幼児教育・保育無償化（3〜5歳）", amount: "約100万円相当" },
      { name: "保育料 第3子無償（0〜2歳）", amount: "約100万円相当" },
    ],
    total: "約908万円〜",
    note: "育休給付金・医療費助成は含まず",
  },
];

/* ─── 申請タイムライン ─── */
const timeline = [
  {
    timing: "妊娠判明",
    tasks: "妊娠届を提出 → 支援給付5万円（面談後）＋妊婦健診受診票14回分",
  },
  {
    timing: "妊娠32週〜",
    tasks: "支援給付2回目5万円（面談後）、入院バッグの準備",
  },
  {
    timing: "出産当日〜",
    tasks: "出産育児一時金（直接支払制度の確認）",
  },
  {
    timing: "出生後14日以内",
    tasks: "出生届 → 健康保険加入 → 子ども医療費助成",
  },
  {
    timing: "出生後15日以内",
    tasks: "児童手当の申請（15日特例で翌月分から支給）",
  },
  {
    timing: "育休開始時",
    tasks: "育児休業給付金 + 出生後休業支援給付金の申請",
  },
  {
    timing: "復職時",
    tasks: "時短勤務の場合 → 育児時短就業給付金の申請",
  },
  {
    timing: "子が6ヶ月〜",
    tasks: "こども誰でも通園制度の利用検討（月10時間）",
  },
  {
    timing: "3歳〜",
    tasks: "幼児教育・保育無償化の適用確認",
  },
];

/* ─── 出典 ─── */
const references = [
  {
    id: 1,
    text: "こども家庭庁「児童手当制度のご案内」",
    url: "https://www.cfa.go.jp/policies/kokoseido/jidouteate/annai",
  },
  {
    id: 2,
    text: "政府広報オンライン「2024年10月分から児童手当が大幅拡充」",
    url: "https://www.gov-online.go.jp/tokusyu/jidoteate/",
  },
  {
    id: 3,
    text: "こども家庭庁「妊産婦への伴走型相談支援と経済的支援」",
    url: "https://www.cfa.go.jp/policies/shussan-kosodate",
  },
  {
    id: 4,
    text: "厚生労働省「出産育児一時金について」",
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html",
  },
  {
    id: 5,
    text: "こども家庭庁「こども誰でも通園制度について」",
    url: "https://www.cfa.go.jp/policies/hoiku/daredemo-tsuen",
  },
  {
    id: 6,
    text: "厚生労働省「育児休業給付について」",
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000158500.html",
  },
  {
    id: 7,
    text: "こども家庭庁「幼児教育・保育の無償化概要」",
    url: "https://www.cfa.go.jp/policies/kokoseido/mushouka/gaiyou",
  },
];

export default function ChildcareBenefitsGuidePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">制度</Badge>
              <Badge variant="secondary">妊婦〜就学前の親向け</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">
                保存版
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              子育て世帯が使える給付金・制度まとめ
            </h1>
            <ArticleMeta updatedAt="2026-04-05" />
            <p className="text-muted-foreground leading-relaxed">
              妊娠から小学校入学までに使える公的制度を、ライフステージ順に整理しました。
              2026年4月スタートの新制度を含む最新版です。
              「いつ・どこで・いくら」がわかる申請タイムラインも掲載しています。
            </p>
          </div>

          {/* 2026年の制度変更ハイライト */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔔</span>
              2026年の制度変更ハイライト
            </h2>
            <div className="space-y-3">
              {highlights.map((h) => (
                <Card
                  key={h.title}
                  className="border-border/50 shadow-none"
                >
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-3">
                      <Badge className={`${h.color} shrink-0`}>{h.label}</Badge>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {h.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {h.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ライフステージ別の制度 */}
          {lifeStages.map((stage) => (
            <section key={stage.label} className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span aria-hidden>{stage.emoji}</span>
                {stage.label}に使える制度
              </h2>
              <div className="space-y-4">
                {stage.benefits.map((b) => (
                  <Card
                    key={b.title}
                    className="border-border/50 shadow-none"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{b.title}</CardTitle>
                        {b.isNew && (
                          <Badge className="bg-primary/20 text-primary text-[10px]">
                            新制度
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="bg-primary/5 rounded-lg p-3">
                          <span className="text-xs text-muted-foreground">
                            金額
                          </span>
                          <p className="font-semibold text-foreground mt-0.5">
                            {b.amount}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <strong className="text-foreground">対象:</strong>{" "}
                            <span className="text-muted-foreground">
                              {b.who}
                            </span>
                          </div>
                          <div>
                            <strong className="text-foreground">届出先:</strong>{" "}
                            <span className="text-muted-foreground">
                              {b.where}
                            </span>
                          </div>
                        </div>
                        <div>
                          <strong className="text-foreground">期限:</strong>{" "}
                          <span className="text-muted-foreground">
                            {b.deadline}
                          </span>
                        </div>
                        <div className="text-xs bg-muted/30 rounded p-2 text-muted-foreground leading-relaxed">
                          {b.notes}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}

          {/* トータル受給シミュレーション */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💰</span>
              トータル受給シミュレーション
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {simulations.map((sim) => (
                <Card
                  key={sim.label}
                  className="border-border/50 shadow-none"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{sim.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {sim.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex justify-between items-start gap-2"
                        >
                          <span className="text-muted-foreground text-xs">
                            {item.name}
                          </span>
                          <span className="font-medium text-foreground text-xs shrink-0">
                            {item.amount}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-border/50 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-foreground text-sm">
                            合計
                          </span>
                          <span className="font-bold text-primary text-lg">
                            {sim.total}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          ※{sim.note}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 申請タイムライン */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📝</span>
              申請タイムライン
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <div className="space-y-3">
                  {timeline.map((step) => (
                    <div key={step.timing} className="flex items-start gap-3">
                      <Badge
                        variant="outline"
                        className="shrink-0 mt-0.5 min-w-[100px] justify-center text-[11px]"
                      >
                        {step.timing}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {step.tasks}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 出典・参考文献 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考文献
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  {references.map((ref) => (
                    <li key={ref.id}>
                      <strong className="text-foreground">[{ref.id}]</strong>{" "}
                      {ref.text}{" "}
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground break-all"
                      >
                        {ref.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは2026年4月時点の一般的な情報提供を目的としています。
              制度の詳細・金額・対象要件は自治体・加入保険・年度によって異なる場合があります。
              最新の情報は、お住まいの市区町村窓口またはウェブサイトでご確認ください。
            </p>
          </div>

          {/* PDF ダウンロード */}
          <div className="mt-8">
            <PdfDownloadSection
              title="子育て給付金 申請タイムラインチェックリスト"
              catchcopy="いつ・どこで・何を申請？漏れゼロへ"
              description="妊娠〜3歳までの時系列で「申請期限・窓口・必要書類」を一覧にまとめました。"
              pdfPath="/pdf/childcare-benefits-timeline.pdf"
              usageTips={[
                { icon: "print", text: "母子手帳と一緒に保管" },
                { icon: "share", text: "パートナーと共有して役割分担" },
                { icon: "other", text: "自治体独自制度のメモ欄付き" },
              ]}
            />
          </div>

          {/* 導線リンク */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/learn/postnatal-procedures"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              出産後の手続きチェックリストを見る
            </Link>
            <Link
              href="/learn/hokatsu"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              保活の基本を読む
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-lg px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
