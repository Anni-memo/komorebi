import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "母乳バンクの基礎知識と利用ガイド",
  description:
    "母乳バンクとは何か、誰が利用できるか、安全性・費用・日本の現状をわかりやすく整理。早産児・低出生体重児の親が知っておきたい情報をまとめました。",
};

const keyNumbers = [
  { value: "1,214人", label: "2024年度にドナーミルクを利用した赤ちゃん", source: "日本財団母乳バンク" },
  { value: "114施設", label: "全国42都道府県のNICUで利用可能", source: "2024年度実績" },
  { value: "748人", label: "2024年度のドナー登録完了数", source: "日本財団母乳バンク" },
];

const donorMilkFlow = [
  {
    step: "1",
    title: "ドナー登録",
    detail: "母乳が十分に出ているお母さんが登録施設で血液検査・問診を受け、ドナーとして登録",
  },
  {
    step: "2",
    title: "搾乳・冷凍",
    detail: "自宅で搾乳し、冷凍した母乳を登録施設に持ち込み",
  },
  {
    step: "3",
    title: "殺菌処理",
    detail: "母乳バンクで62.5°C・30分間の低温殺菌処理（ホルダー殺菌法・国際標準）",
  },
  {
    step: "4",
    title: "細菌検査",
    detail: "殺菌後に細菌検査を実施。菌が検出されないことを確認してから冷凍保管",
  },
  {
    step: "5",
    title: "NICUへ提供",
    detail: "NICUからの要請に応じて配送。医師の判断のもと、赤ちゃんに提供",
  },
];

const benefits = [
  {
    title: "壊死性腸炎（NEC）リスクの低減",
    detail: "人工乳と比較して、ドナーミルクは壊死性腸炎のリスクを約1/1.87に低減",
    importance: "最重要",
  },
  {
    title: "感染症リスクの低下",
    detail: "母乳に含まれる免疫成分が重症感染症のリスクを下げる",
    importance: "重要",
  },
  {
    title: "経腸栄養の早期確立",
    detail: "消化管の成熟を促し、点滴からの離脱を早める",
    importance: "重要",
  },
  {
    title: "未熟児網膜症・慢性肺疾患の軽減",
    detail: "母乳栄養により、これらの合併症リスクが低下する研究結果",
    importance: "重要",
  },
];

const safetyPoints = [
  {
    title: "ドナースクリーニング",
    detail: "血液検査（HIV・肝炎ウイルス等）、問診、生活習慣の確認を実施",
    level: "厳格",
  },
  {
    title: "低温殺菌処理",
    detail: "62.5°C・30分間のホルダー殺菌法（国際標準の殺菌方法）",
    level: "国際基準",
  },
  {
    title: "細菌検査",
    detail: "殺菌後に菌が検出されないことが使用の絶対条件",
    level: "必須",
  },
  {
    title: "有効期限管理",
    detail: "殺菌後3ヶ月以内。期限を過ぎたものは廃棄",
    level: "厳格",
  },
];

const targetCases = [
  "極低出生体重児（出生体重1,500g未満）",
  "消化管の手術を受けた赤ちゃん",
  "先天性心疾患のある赤ちゃん",
  "消化管アレルギーのある赤ちゃん",
  "お母さんの母乳が出ない・足りない場合",
];

const donorEligibility = [
  "自分の赤ちゃんに必要な量以上に母乳が出ている",
  "喫煙していない、アルコール・薬物の常用がない",
  "血液検査でHIV・肝炎等の感染症が陰性",
  "ドナー登録施設に冷凍母乳を持ち込める",
];

export default function BreastMilkBankPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">新生児の親向け</Badge>
              <Badge variant="secondary">健康・病気</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">
                保存版
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              母乳バンクの基礎知識と
              <br />
              利用ガイド
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              早産や低出生体重で生まれた赤ちゃんにとって、母乳は命を守る大切な栄養です。
              お母さんの母乳が出ない・足りないとき、「母乳バンク」という選択肢があることを知ってください。
            </p>
          </div>

          {/* 母乳バンクとは */}
          <Card className="border-primary/30 bg-primary/5 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>🤱</span>
                母乳バンクとは
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                母乳バンクは、母乳が余っているドナー（寄付者）から提供された母乳を、
                <strong className="text-foreground">低温殺菌処理・細菌検査・冷凍保管</strong>し、
                NICUの赤ちゃんに「ドナーミルク」として届ける仕組みです。
                日本では2017年に本格始動し、現在は全国に広がっています。
              </p>
            </CardContent>
          </Card>

          {/* 数字で見る日本の母乳バンク */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📊</span>
              数字で見る日本の母乳バンク
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {keyNumbers.map((d) => (
                <Card key={d.value} className="border-border/50 shadow-none">
                  <CardContent className="pt-5 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{d.value}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              出典: 日本財団母乳バンク・日本母乳バンク協会 2024年度実績報告
            </p>
          </section>

          {/* ドナーミルクの流れ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔄</span>
              ドナーミルクができるまで
            </h2>
            <div className="space-y-3">
              {donorMilkFlow.map((item) => (
                <Card key={item.step} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {item.step}
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

          {/* 利用対象者 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>👶</span>
              利用の対象となる赤ちゃん
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {targetCases.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  ※利用はNICUの主治医が必要性を判断し、母乳バンクに発注する形で行われます。
                  親が直接申し込むのではなく、医療機関を通じて提供されます。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* ドナーミルクのメリット */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💚</span>
              ドナーミルクのメリット（人工乳との比較）
            </h2>
            <div className="space-y-3">
              {benefits.map((item, i) => (
                <Card key={item.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                          <Badge variant="outline" className="text-xs">{item.importance}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 安全性 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🛡️</span>
              安全性への取り組み
            </h2>
            <div className="space-y-3">
              {safetyPoints.map((item, i) => (
                <Card key={item.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                          <Badge variant="outline" className="text-xs">{item.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 費用 */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>💰</span>
                費用について
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                <strong className="text-foreground">親の自己負担は基本的にありません。</strong>
                ドナーミルクの費用はNICUのある病院が母乳バンクに会費として支払う形式です。
                NICUの入院費自体は乳幼児医療費助成制度の対象となります。
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                2025年度からは東京都が全国初の「ドナーミルク利用支援事業」を開始し、
                病院の費用負担を軽減する補助制度を設けています。
                今後、他の自治体への波及も期待されています。
              </p>
            </CardContent>
          </Card>

          {/* 日本の母乳バンク拠点 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🏥</span>
              日本の母乳バンク拠点
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-border/50 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-foreground">一般財団法人 日本財団母乳バンク</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>・日本橋母乳バンク（東京都中央区）</li>
                    <li>・藤田医科大学病院 日本財団母乳バンク（愛知県）</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border/50 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-foreground">一般社団法人 日本母乳バンク協会</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>・東京（豊洲ほか）を拠点に運営</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ※ドナーミルクの利用は拠点ではなく、登録されたNICU（全国114施設以上）で行われます。
              お子さんが入院しているNICUが登録施設かどうかは、主治医にお尋ねください。
            </p>
          </section>

          {/* 利用の流れ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              利用したいとき
            </h2>
            <Card className="border-primary/30 shadow-none">
              <CardContent className="pt-5">
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary shrink-0">1.</span>
                    <span><strong className="text-foreground">NICUの主治医・看護師に相談する</strong>（親が直接母乳バンクに申し込む必要はありません）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary shrink-0">2.</span>
                    <span>医師がドナーミルクの必要性を判断し、母乳バンクに発注</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary shrink-0">3.</span>
                    <span>殺菌・検査済みのドナーミルクがNICUに届けられ、赤ちゃんに提供</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary shrink-0">4.</span>
                    <span>費用は病院が負担するため、親の自己負担は基本的になし</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* ドナーになりたい方へ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🎁</span>
              ドナーになりたい方へ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-primary/30 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-primary">ドナーの条件</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {donorEligibility.map((c) => (
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
                  <CardTitle className="text-sm text-amber-700">登録の流れ</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 shrink-0">1.</span>
                      母乳バンクのサイトで最寄りのドナー登録施設を確認
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 shrink-0">2.</span>
                      登録施設で血液検査・問診を受ける
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 shrink-0">3.</span>
                      合格後、自宅で搾乳・冷凍して施設に持ち込み
                    </li>
                  </ol>
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
                    <strong className="text-foreground">[1]</strong> 一般財団法人 日本財団母乳バンク. 2024年度活動データ報告. milkbank.or.jp
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 一般社団法人 日本母乳バンク協会. ドナーミルクのご案内. jhmba.or.jp
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 東京都保健医療局. ドナーミルク利用支援事業. 2025年度開始.
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> こども家庭庁. 諸外国における母乳バンクの実態調査. 2025年3月.
                  </li>
                  <li>
                    <strong className="text-foreground">[5]</strong> 日本小児医療保健協議会. 早産児の経腸栄養に関する提言. 2019年.
                  </li>
                  <li>
                    <strong className="text-foreground">[6]</strong> 藤田医科大学病院. 国内3か所目の母乳バンク開設. 2025年.
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
              ドナーミルクの利用については、必ずお子さんの主治医・NICUスタッフにご相談ください。
              施設の登録状況や制度の詳細は変更される場合があります。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/rsv-vaccine" className={buttonVariants({ variant: "outline" })}>
              RSVワクチン判断ガイドを見る
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
