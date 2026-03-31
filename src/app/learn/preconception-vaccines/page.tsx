import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";

export const metadata = {
  title: "妊活前に受けておきたい予防接種ガイド｜風疹・麻疹・水痘 | こもれび",
  description:
    "妊娠前に必要な予防接種（風疹・麻疹・水痘・おたふくかぜ・B型肝炎・HPV）を一覧で解説。抗体検査の受け方、費用、助成制度、スケジュールの組み方まで。",
};

const liveVaccines = [
  {
    name: "MRワクチン（麻疹・風疹混合）",
    priority: "最優先",
    why: "妊娠初期に風疹に感染すると、赤ちゃんに先天性風疹症候群（CRS）を引き起こす可能性があります。心臓の異常・難聴・白内障などの重い障害につながることがあります。麻疹は妊婦が感染すると重症化しやすく、流産・早産のリスクが約30%に上昇します。",
    antibodyTest:
      "HI法で32倍未満、またはEIA法-IgGで8.0未満の場合は接種が推奨されます。",
    schedule: "1回接種（抗体が十分につかない場合は2回）",
    waitPeriod: "接種後2か月間は避妊が必要",
    cost: "約8,000〜10,000円（自費）",
    subsidy:
      "多くの自治体で抗体検査が無料、ワクチン接種の助成あり。パートナー（男性）への助成も実施している自治体が多数。",
  },
  {
    name: "水痘ワクチン（みずぼうそう）",
    priority: "重要",
    why: "妊娠前半に感染すると先天性水痘症候群（赤ちゃんの目・脳・体の異常）のリスクがあります。妊娠後期の感染では新生児水痘として重症化する可能性があります。",
    antibodyTest: "抗体検査で免疫の有無を確認できます。",
    schedule: "2回接種（1回目から4週間以上あけて2回目）",
    waitPeriod: "接種後2か月間は避妊が必要",
    cost: "約6,000〜9,000円/回（自費）",
    subsidy: "自治体による。一部助成がある地域もあります。",
  },
  {
    name: "おたふくかぜワクチン（ムンプス）",
    priority: "推奨",
    why: "妊娠初期の感染で流産率が上昇するとされています。妊娠中は接種できない生ワクチンのため、妊娠前に済ませておく必要があります。",
    antibodyTest: "抗体検査で確認できます。",
    schedule: "1回接種（抗体が不十分なら2回）",
    waitPeriod: "接種後2か月間は避妊が必要",
    cost: "約5,000〜6,500円（自費）",
    subsidy: "自治体による。MRワクチンと同時接種も可能です。",
  },
];

const inactivatedVaccines = [
  {
    name: "B型肝炎ワクチン",
    priority: "重要",
    why: "母子感染（垂直感染）により、赤ちゃんがキャリア化し、将来的に慢性肝炎・肝硬変・肝がんにつながるリスクがあります。",
    schedule:
      "3回接種（1回目 → 4週間後に2回目 → 1回目から20〜24週後に3回目）。完了まで約5〜6か月かかるため、妊活開始の半年前には始めましょう。",
    waitPeriod: "避妊期間は不要",
    cost: "約5,000〜7,000円/回（自費）",
  },
  {
    name: "HPVワクチン（子宮頸がん予防）",
    priority: "推奨",
    why: "子宮頸がんの予防に有効です。不活化ワクチンですが、妊娠中の接種は推奨されていないため、妊娠前に完了しておくのが理想です。",
    schedule:
      "2〜3回接種（約6か月で完了）。定期接種対象（小6〜高1相当の女性）なら無料。キャッチアップ接種の対象の方もいます。",
    waitPeriod: "避妊期間は不要（ただし妊娠中は接種を中断）",
    cost: "定期接種対象なら無料。自費の場合は約15,000〜20,000円/回",
  },
  {
    name: "インフルエンザワクチン",
    priority: "推奨",
    why: "妊婦はインフルエンザに感染すると重症化しやすいことがわかっています。不活化ワクチンのため妊娠中も接種可能ですが、流行シーズン前の接種がおすすめです。",
    schedule: "毎年1回接種",
    waitPeriod: "避妊期間は不要。妊娠中も接種OK",
    cost: "約3,500〜4,500円",
  },
];

const pregnancyVaccineClassification = {
  ng: [
    "MR（麻疹・風疹混合）",
    "麻疹単独",
    "風疹単独",
    "水痘",
    "おたふくかぜ",
    "BCG",
  ],
  ok: [
    { name: "インフルエンザ", timing: "妊娠全期間" },
    { name: "新型コロナ", timing: "妊娠全期間" },
    {
      name: "RSウイルス（アブリスボ）",
      timing: "妊娠28〜36週（2026年4月〜定期接種化）",
    },
    { name: "百日咳（三種混合）", timing: "妊娠27〜36週" },
    { name: "B型肝炎", timing: "必要時" },
  ],
};

const scheduleSteps = [
  {
    timing: "妊活開始の6か月前",
    action: "抗体検査を受ける",
    detail:
      "麻疹・風疹・水痘・おたふくかぜの4つの抗体を調べます。産婦人科や内科で受けられます。風疹の抗体検査は多くの自治体で無料です。",
  },
  {
    timing: "抗体検査の結果後すぐ",
    action: "不足しているワクチンを接種",
    detail:
      "生ワクチン（MR・水痘・おたふく）は同日に接種できます。同時接種で通院回数を減らせます。",
  },
  {
    timing: "同時期に開始",
    action: "B型肝炎・HPVワクチンも開始",
    detail:
      "完了まで5〜6か月かかるため、生ワクチンと並行して始めましょう。不活化ワクチンなので避妊期間は不要です。",
  },
  {
    timing: "生ワクチン接種後2か月間",
    action: "避妊期間",
    detail:
      "生ワクチン接種後は2か月間の避妊が必要です。この期間にB型肝炎やHPVの2回目以降を進めると効率的です。",
  },
  {
    timing: "避妊期間終了後",
    action: "妊活スタート",
    detail:
      "抗体がしっかりついた状態で妊活を始められます。パートナーの風疹抗体も確認しておくとより安心です。",
  },
];

const partnerInfo = [
  {
    title: "パートナーの風疹対策が赤ちゃんを守る",
    detail:
      "妊婦自身がワクチンを打てない以上、周囲が感染しないことが最大の予防策です。特に男性は風疹の定期接種を1回しか受けていない世代があり、抗体が不十分なケースがあります。",
  },
  {
    title: "昭和37〜54年生まれの男性は特に注意",
    detail:
      "この世代は子ども時代に風疹の定期接種を受ける機会がありませんでした。国の追加対策として抗体検査・接種が原則無料で受けられます（経過措置あり、令和9年3月末まで）。",
  },
  {
    title: "自治体の助成を活用する",
    detail:
      "「妊娠希望女性の配偶者・同居者」として男性にも抗体検査・ワクチン接種の助成を実施している自治体が多数あります。お住まいの自治体の保健所・健康推進課に確認しましょう。",
  },
];

const faq = [
  {
    q: "抗体検査はどこで受けられますか？",
    a: "産婦人科、内科、健診センターなどで受けられます。風疹の抗体検査は多くの自治体で無料です。まずはお住まいの自治体の保健所に問い合わせるのがおすすめです。",
  },
  {
    q: "子どものころにかかったから大丈夫ですか？",
    a: "必ずしも大丈夫とは限りません。記憶違いのケースもありますし、一度かかっても抗体が十分でないことがあります。妊活前に抗体検査で確認することをおすすめします。",
  },
  {
    q: "生ワクチンを打った後、うっかり妊娠してしまったら？",
    a: "現在のところ、生ワクチン接種後に妊娠が判明したケースで胎児に問題が起きたという報告はありません。慌てる必要はありませんが、かかりつけの医師に相談してください。中絶の必要はないとされています。",
  },
  {
    q: "複数のワクチンを同時に打てますか？",
    a: "はい、異なる種類のワクチンは同時接種が可能です。MR・水痘・おたふくかぜの3つを同日に接種することもできます。通院回数を減らせるメリットがあります。",
  },
  {
    q: "費用はどのくらいかかりますか？",
    a: "全て自費の場合、MR（約9,000円）+ 水痘2回（約15,000円）+ おたふく（約6,000円）で約30,000円程度です。ただし自治体の助成を使えば大幅に軽減できます。まず助成制度を確認しましょう。",
  },
];

export default function PreconceptionVaccinesPage() {
  return (
    <>
      <ArticleJsonLd
        title="妊活前に受けておきたい予防接種ガイド"
        description="妊娠前に必要な予防接種（風疹・麻疹・水痘・おたふくかぜ・B型肝炎・HPV）を一覧で解説。抗体検査・費用・助成制度・スケジュールまで。"
        path="/learn/preconception-vaccines"
        datePublished="2026-03-31"
        tags={[
          "妊活",
          "予防接種",
          "風疹",
          "麻疹",
          "水痘",
          "先天性風疹症候群",
          "抗体検査",
        ]}
        faq={faq.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">予防接種</Badge>
              <Badge variant="secondary">妊活・妊娠準備</Badge>
              <Badge variant="secondary">保存版</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              妊活前に受けておきたい予防接種ガイド
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              「妊活を始めたいけど、何か準備が必要？」
              実は、妊娠前にしか打てないワクチンがあります。
              風疹・麻疹・水痘など、赤ちゃんを感染症から守るために大切な予防接種を、費用・助成制度・スケジュールまでまとめました。
            </p>
          </div>

          {/* 大切なメッセージ */}
          <Card className="border-primary/30 bg-primary/5 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">
                なぜ「妊娠前」に予防接種が必要なの？
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                風疹・麻疹・水痘・おたふくかぜのワクチンは
                <strong className="text-foreground">
                  生ワクチン（弱毒化した病原体を使ったワクチン）
                </strong>
                のため、妊娠中は接種できません。
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                これらの感染症に妊娠中にかかると、赤ちゃんに深刻な影響が出る可能性があります。
                だからこそ、
                <strong className="text-foreground">
                  妊活を始める前に抗体を確認し、必要なワクチンを打っておく
                </strong>
                ことが大切です。
              </p>
            </CardContent>
          </Card>

          {/* 生ワクチン（妊娠前に必須） */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💉</span>
              妊娠前に必ず確認したいワクチン（生ワクチン）
            </h2>
            <Card className="bg-red-50 border-red-200 shadow-none mb-4">
              <CardContent className="pt-5">
                <p className="text-sm text-red-800 leading-relaxed">
                  以下は<strong>生ワクチン</strong>のため、
                  <strong>妊娠中は接種できません</strong>
                  。接種後は<strong>2か月間の避妊</strong>
                  が必要です。妊活開始前に済ませましょう。
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {liveVaccines.map((v) => (
                <Card key={v.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-bold text-foreground">{v.name}</h3>
                      <Badge
                        variant="secondary"
                        className={
                          v.priority === "最優先"
                            ? "bg-red-100 text-red-700"
                            : v.priority === "重要"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                        }
                      >
                        {v.priority}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-red-600 mb-1">
                          妊娠中に感染すると
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {v.why}
                        </p>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs font-semibold text-blue-700 mb-1">
                          抗体検査の目安
                        </p>
                        <p className="text-sm text-blue-800">
                          {v.antibodyTest}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-muted/30 rounded">
                          <span className="text-xs text-muted-foreground">
                            接種回数:
                          </span>
                          <p className="text-foreground">{v.schedule}</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <span className="text-xs text-muted-foreground">
                            避妊期間:
                          </span>
                          <p className="text-foreground">{v.waitPeriod}</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <span className="text-xs text-muted-foreground">
                            費用目安:
                          </span>
                          <p className="text-foreground">{v.cost}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded">
                          <span className="text-xs text-green-700">
                            助成制度:
                          </span>
                          <p className="text-sm text-green-800">{v.subsidy}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 不活化ワクチン */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🛡</span>
              妊娠前に受けておくと安心なワクチン（不活化ワクチン）
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-4">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  不活化ワクチンは妊娠中も接種可能ですが、妊娠前に済ませておくとより安心です。
                  避妊期間は不要です。
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {inactivatedVaccines.map((v) => (
                <Card key={v.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-sm">
                        {v.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={
                          v.priority === "重要"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        {v.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {v.why}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-muted/30 rounded">
                        <span className="text-xs text-muted-foreground">
                          接種スケジュール:
                        </span>
                        <p className="text-foreground">{v.schedule}</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <span className="text-xs text-muted-foreground">
                          費用目安:
                        </span>
                        <p className="text-foreground">{v.cost}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 妊娠中のワクチン分類 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              妊娠中のワクチン — 打てるもの・打てないもの
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-red-200 bg-red-50/50 shadow-none">
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold text-red-800 text-sm mb-3">
                    妊娠中は接種できない
                  </h3>
                  <ul className="space-y-1.5">
                    {pregnancyVaccineClassification.ng.map((name) => (
                      <li
                        key={name}
                        className="flex items-center gap-2 text-sm text-red-700"
                      >
                        <span className="shrink-0">&#10060;</span>
                        {name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-200 bg-green-50/50 shadow-none">
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold text-green-800 text-sm mb-3">
                    妊娠中も接種できる
                  </h3>
                  <ul className="space-y-1.5">
                    {pregnancyVaccineClassification.ok.map((v) => (
                      <li
                        key={v.name}
                        className="flex items-start gap-2 text-sm text-green-700"
                      >
                        <span className="shrink-0 mt-0.5">&#10003;</span>
                        <span>
                          {v.name}
                          <span className="text-xs text-green-600 ml-1">
                            （{v.timing}）
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* スケジュールの組み方 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📅</span>
              おすすめスケジュール — 妊活6か月前から始めよう
            </h2>
            <div className="space-y-3">
              {scheduleSteps.map((step, i) => (
                <Card key={step.timing} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {step.timing}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {step.action}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* パートナーへの情報 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>👥</span>
              パートナー（男性）の風疹対策も大切です
            </h2>
            <div className="space-y-3">
              {partnerInfo.map((item, i) => (
                <Card key={item.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {item.title}
                        </h3>
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

          {/* よくある質問 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#10067;</span>
              よくある質問
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <Card key={item.q} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-2">
                      Q. {item.q}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* まとめ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🌿</span>
              まとめ
            </h2>
            <Card className="border-primary/30 bg-primary/5 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  妊活前の予防接種は、まだ見ぬ赤ちゃんへの「最初のプレゼント」です。
                  抗体検査を受けて、必要なワクチンを打っておくだけで、防げるリスクがたくさんあります。
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  自治体の助成制度を使えば、費用の負担も軽減できます。
                  まずはお住まいの自治体に問い合わせて、抗体検査から始めてみてください。
                </p>
                <p className="text-sm text-foreground font-medium">
                  焦る必要はありません。一つひとつ準備を進めていきましょう。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 1分で読める要約 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              1分で読める要約
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    風疹・麻疹・水痘・おたふくかぜは生ワクチン → 妊娠中は打てない → 妊活前に必須
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    まず抗体検査（風疹は多くの自治体で無料）→ 不足分を接種
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    生ワクチン接種後は2か月間の避妊が必要
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    B型肝炎は完了まで約半年 → 妊活6か月前から開始
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    パートナーの風疹対策も重要。助成制度を活用しましょう
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考情報
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong>{" "}
                    厚生労働省.
                    &quot;風しんの追加的対策について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong>{" "}
                    厚生労働省.
                    &quot;先天性風しん症候群とは.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong>{" "}
                    日本産科婦人科学会.
                    &quot;妊娠前の健康管理について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong>{" "}
                    日本小児科学会.
                    &quot;妊婦への接種が推奨されるワクチン.&quot; 2024.
                  </li>
                  <li>
                    <strong className="text-foreground">[5]</strong>{" "}
                    政府広報オンライン.
                    &quot;昭和37〜54年度生まれの男性の皆さんへ 風しんの予防接種にご協力ください.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、医療アドバイスや診断に代わるものではありません。
              ワクチン接種の要否や時期については、必ずかかりつけの医師にご相談ください。
              助成制度の内容は自治体により異なります。最新情報はお住まいの自治体にお問い合わせください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/rsv-vaccine"
              className={buttonVariants({ variant: "outline" })}
            >
              RSVワクチン判断ガイドを読む
            </Link>
            <Link
              href="/learn"
              className={buttonVariants({ variant: "ghost" })}
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
