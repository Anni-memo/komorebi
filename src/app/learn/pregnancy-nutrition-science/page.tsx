import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { PdfDownloadSection } from "@/components/pdf-download-section";

const nutrients = [
  {
    id: "protein",
    icon: "🥩",
    name: "たんぱく質",
    role: "胎児の体そのものをつくる主役",
    detail:
      "胎児の筋肉・骨格・皮膚・内臓・血液のすべてはたんぱく質から作られます。また、胎盤や羊水の生成、母体の子宮や乳腺の発達にも大量のたんぱく質が必要です。後期には胎児の体重が急増し、1日約30〜35gのたんぱく質が胎児側に移行するため、母体の推奨量は+25g（合計75g/日）まで増加します。",
    breakdown: [
      { period: "初期（〜13週）", addition: "付加なし（50g/日）", reason: "胎児はまだ数gのため、通常量で十分" },
      { period: "中期（14〜27週）", addition: "+5g（55g/日）", reason: "胎盤完成・胎児の骨格形成が本格化" },
      { period: "後期（28週〜）", addition: "+25g（75g/日）", reason: "胎児の体重が急増（1週間で約200g）" },
    ],
    deficiency: "低出生体重児のリスク上昇、胎児の発育遅延（IUGR）",
    sources: "肉・魚・卵・大豆製品・乳製品",
  },
  {
    id: "dha",
    icon: "🐟",
    name: "DHA（ドコサヘキサエン酸）",
    role: "胎児の脳と目をつくる必須脂肪酸",
    detail:
      "DHAは胎児の脳の重量の約10%、網膜の脂肪酸の約50%を構成する極めて重要な栄養素です。特に妊娠後期の20週以降、胎児の脳は急速に発達し、1日あたり約70mgのDHAが脳に蓄積されます。DHAは体内でほとんど合成できないため、母体の食事から胎盤を通じて供給するしかありません。複数の研究で、妊娠中のDHA摂取量と子どもの認知機能・視覚発達に正の相関が報告されています。",
    breakdown: [
      { period: "全期間", addition: "1.6g/日（n-3系脂肪酸として）", reason: "厚労省目安量。DHAとして1日約200mg以上が国際推奨" },
    ],
    deficiency: "胎児の神経発達への影響、早産リスクの上昇（複数のメタアナリシスで報告）",
    sources: "サバ・イワシ・サンマ・鮭・マグロ（週2〜3回の魚食が目安）",
  },
  {
    id: "iron",
    icon: "🩸",
    name: "鉄",
    role: "母子の酸素供給を支える生命線",
    detail:
      "妊娠中は循環血液量が約40%増加し、赤血球の生成に大量の鉄が必要です。同時に胎児自身の血液づくりや、胎盤の形成にも鉄が使われます。妊娠全期間で母体から約1,000mgの鉄が消費され（胎児300mg + 胎盤50mg + 母体血液増加500mg + 出産時出血150mg）、貯蔵鉄が不足すると鉄欠乏性貧血に陥ります。妊婦の約30〜40%が貧血とされ、最も不足しやすい栄養素です。",
    breakdown: [
      { period: "初期", addition: "+2.5mg（推奨9.0mg/日）", reason: "胎盤形成・血液量増加の開始" },
      { period: "中期・後期", addition: "+9.5mg（推奨16.0mg/日）", reason: "胎児への鉄移行が本格化、血液量がピークに" },
    ],
    deficiency: "母体の貧血、胎児の発育不全、早産・低出生体重児のリスク上昇",
    sources: "赤身肉・レバー（週1回まで）・あさり・小松菜・ほうれん草",
  },
  {
    id: "folic-acid",
    icon: "🌿",
    name: "葉酸",
    role: "赤ちゃんの神経管をつくる最初の栄養素",
    detail:
      "葉酸はDNAの合成と細胞分裂に不可欠なビタミンB群の一つです。特に妊娠初期（受胎後28日以内）に胎児の神経管が閉鎖する過程で決定的な役割を果たします。十分な葉酸摂取により、神経管閉鎖障害（二分脊椎・無脳症）のリスクが約70%低減することが大規模研究で証明されています。このため、妊娠1ヶ月前からの摂取が推奨されています。",
    breakdown: [
      { period: "妊娠1ヶ月前〜初期", addition: "食事240μg + サプリ400μg", reason: "神経管閉鎖障害の予防（厚労省推奨）" },
      { period: "中期・後期", addition: "480μg/日（食事から）", reason: "赤血球の生成・胎児の成長に継続的に必要" },
    ],
    deficiency: "神経管閉鎖障害（二分脊椎・無脳症）、巨赤芽球性貧血",
    sources: "ほうれん草・ブロッコリー・枝豆・納豆・アスパラガス",
  },
  {
    id: "calcium",
    icon: "🦴",
    name: "カルシウム",
    role: "胎児の骨と歯の材料",
    detail:
      "胎児の骨格は妊娠中期から急速に石灰化し、出産までに約30gのカルシウムが胎児に蓄積されます。興味深いことに、妊娠中はカルシウムの腸管吸収率が約2倍に上昇するため、厚労省は妊婦への付加量を設定していません（非妊時と同じ650mg/日）。ただし、元々の摂取量が不足している場合は母体の骨密度が低下するリスクがあり、日本人女性の平均摂取量は推奨量を下回っているのが現状です。",
    breakdown: [
      { period: "全期間", addition: "650mg/日（付加なし）", reason: "吸収率が自然に上昇するため。ただし元の摂取量が重要" },
    ],
    deficiency: "母体の骨密度低下、妊娠高血圧症候群のリスク上昇",
    sources: "牛乳・ヨーグルト・チーズ・小魚・豆腐・小松菜",
  },
  {
    id: "vitamin-k",
    icon: "🥬",
    name: "ビタミンK",
    role: "出産時の出血と新生児を守る",
    detail:
      "ビタミンKは血液凝固に必須のビタミンで、出産時の出血リスクを低減します。また、胎盤を通過しにくい性質があるため、新生児はビタミンK欠乏になりやすく、まれに「新生児ビタミンK欠乏性出血症（頭蓋内出血）」を引き起こすことがあります。母体が十分なビタミンKを摂取することで、へその緒を通じた供給量を少しでも増やすことが期待できます。出生後はK2シロップの投与で予防します。",
    breakdown: [
      { period: "全期間（特に後期）", addition: "150μg/日", reason: "出産時の出血対策 + 新生児への移行促進" },
    ],
    deficiency: "出産時の異常出血、新生児ビタミンK欠乏性出血症",
    sources: "納豆・ほうれん草・小松菜・ブロッコリー・わかめ",
  },
  {
    id: "vitamin-d",
    icon: "☀️",
    name: "ビタミンD",
    role: "カルシウム吸収と免疫の調整役",
    detail:
      "ビタミンDはカルシウムの腸管吸収を促進し、胎児の骨形成を間接的に支えます。さらに近年の研究では、妊娠中のビタミンD不足が妊娠糖尿病・妊娠高血圧症候群・早産のリスク上昇と関連することが報告されています。また、母体のビタミンD濃度が子どもの免疫系の発達にも影響を与える可能性が示唆されています。日本人女性の多くがビタミンD不足とされ、意識的な摂取が重要です。",
    breakdown: [
      { period: "全期間", addition: "8.5μg/日", reason: "骨形成支援 + 免疫調整（日光浴も有効）" },
    ],
    deficiency: "胎児のくる病（骨軟化）、母体の骨粗鬆症リスク",
    sources: "鮭・サンマ・しらす・きくらげ・卵黄 + 日光浴15分/日",
  },
];

const summaryTable = [
  { nutrient: "たんぱく質", early: "50g", mid: "55g", late: "75g", unit: "/日" },
  { nutrient: "鉄", early: "9.0mg", mid: "16.0mg", late: "16.0mg", unit: "/日" },
  { nutrient: "葉酸", early: "640μg*", mid: "480μg", late: "480μg", unit: "/日" },
  { nutrient: "DHA（n-3系）", early: "1.6g", mid: "1.6g", late: "1.6g", unit: "/日" },
  { nutrient: "カルシウム", early: "650mg", mid: "650mg", late: "650mg", unit: "/日" },
  { nutrient: "ビタミンK", early: "150μg", mid: "150μg", late: "150μg", unit: "/日" },
  { nutrient: "ビタミンD", early: "8.5μg", mid: "8.5μg", late: "8.5μg", unit: "/日" },
];

export const metadata = {
  title: "胎児に栄養素がなぜ必要？｜7つの栄養素の役割と推奨量 | こもれび",
  description:
    "たんぱく質・DHA・鉄・葉酸・カルシウム・ビタミンK・ビタミンDが胎児の発達にどう関わるか、厚労省の食事摂取基準に基づいて解説。妊娠期別の推奨量一覧表付き。",
};

export default function PregnancyNutritionSciencePage() {
  return (
    <>
      <ArticleJsonLd
        title="胎児に栄養素がなぜ必要？｜7つの栄養素の役割と推奨量"
        description="たんぱく質・DHA・鉄・葉酸・カルシウム・ビタミンK・ビタミンDの胎児への役割と推奨量を解説。"
        path="/learn/pregnancy-nutrition-science"
        datePublished="2026-04-06"
        tags={["妊娠 栄養", "胎児 たんぱく質", "妊婦 DHA", "葉酸", "鉄分"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="mb-8">
            <BreadcrumbNav
              items={[
                { label: "トップ", href: "/" },
                { label: "学ぶ", href: "/learn" },
                { label: "胎児と栄養素の科学" },
              ]}
            />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">栄養・食事</Badge>
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">保存版</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              胎児に栄養素がなぜ必要？
              <br />
              <span className="text-lg sm:text-xl text-muted-foreground font-normal">
                7つの栄養素の役割と妊娠期別の推奨量
              </span>
            </h1>
            <ArticleMeta updatedAt="2026-04-06" />
            <p className="text-muted-foreground leading-relaxed">
              「なぜこの栄養素を摂るべきなの？」という疑問に、
              <strong className="text-foreground">胎児の体のどの部分に・どう使われるか</strong>
              を科学的根拠に基づいて解説します。
              厚生労働省「日本人の食事摂取基準（2025年版）」と最新研究に準拠しています。
            </p>
          </div>

          {/* まとめ表（先に） */}
          <Card id="summary" className="border-primary/20 shadow-none mb-8 overflow-hidden">
            <CardContent className="pt-0 pb-0 px-0">
              <div className="bg-primary/5 px-4 py-3 border-b border-primary/10">
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span aria-hidden>📋</span>
                  妊娠期別 推奨摂取量まとめ
                </h2>
                <p className="text-[10px] text-muted-foreground mt-0.5">厚労省「日本人の食事摂取基準 2025年版」より</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-foreground">栄養素</th>
                      <th className="text-center px-3 py-2 text-xs font-semibold text-green-700">初期</th>
                      <th className="text-center px-3 py-2 text-xs font-semibold text-yellow-700">中期</th>
                      <th className="text-center px-3 py-2 text-xs font-semibold text-orange-700">後期</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryTable.map((row, i) => (
                      <tr key={row.nutrient} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <td className="px-3 py-2 text-xs font-medium text-foreground whitespace-nowrap">{row.nutrient}</td>
                        <td className="px-3 py-2 text-xs text-center text-muted-foreground">{row.early}</td>
                        <td className="px-3 py-2 text-xs text-center text-muted-foreground">{row.mid}</td>
                        <td className="px-3 py-2 text-xs text-center font-medium text-foreground">{row.late}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 text-[10px] text-muted-foreground border-t border-border/30">
                *葉酸の初期は食事240μg+サプリ400μgの合計。非妊娠時の推奨は240μg/日。
              </div>
            </CardContent>
          </Card>

          <TableOfContents
            items={[
              { id: "summary", label: "推奨摂取量まとめ表" },
              ...nutrients.map((n) => ({ id: n.id, label: `${n.icon} ${n.name}` })),
              { id: "references", label: "出典・参考文献" },
            ]}
          />

          {/* 各栄養素セクション */}
          {nutrients.map((n) => (
            <section key={n.id} id={n.id} className="mb-10 scroll-mt-20">
              <h2 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                <span aria-hidden>{n.icon}</span>
                {n.name}
              </h2>
              <p className="text-sm font-medium text-primary mb-3">{n.role}</p>

              {/* 解説 */}
              <Card className="border-border/50 shadow-none mb-3">
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {n.detail}
                  </p>
                </CardContent>
              </Card>

              {/* 期別推奨量 */}
              <Card className="border-border/50 shadow-none mb-3 overflow-hidden">
                <CardContent className="pt-0 pb-0 px-0">
                  <div className="bg-muted/30 px-4 py-2 border-b border-border/30">
                    <p className="text-xs font-semibold text-foreground">妊娠期別の推奨量</p>
                  </div>
                  {n.breakdown.map((b) => (
                    <div key={b.period} className="px-4 py-3 border-b border-border/20 last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">{b.period}</span>
                        <Badge variant="outline" className="text-xs">{b.addition}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{b.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 不足時のリスク + 食材 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="border-red-200/50 bg-red-50/30 shadow-none dark:bg-red-950/10 dark:border-red-800/30">
                  <CardContent className="pt-3 pb-3">
                    <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">不足するとどうなる？</p>
                    <p className="text-xs text-muted-foreground">{n.deficiency}</p>
                  </CardContent>
                </Card>
                <Card className="border-green-200/50 bg-green-50/30 shadow-none dark:bg-green-950/10 dark:border-green-800/30">
                  <CardContent className="pt-3 pb-3">
                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">おすすめ食材</p>
                    <p className="text-xs text-muted-foreground">{n.sources}</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          ))}

          {/* 出典 */}
          <section id="references" className="mb-8 scroll-mt-20">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考文献
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong>{" "}
                    厚生労働省.「日本人の食事摂取基準（2025年版）」策定検討会報告書. 2024.
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong>{" "}
                    厚生労働省.「妊娠前からはじめる妊産婦のための食生活指針」解説要領. 令和3年改定.
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong>{" "}
                    Middleton P, et al. &quot;Omega-3 fatty acid addition during pregnancy.&quot;
                    Cochrane Database Syst Rev. 2018.
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong>{" "}
                    MRC Vitamin Study Research Group. &quot;Prevention of neural tube defects.&quot;
                    Lancet. 1991;338:131-7.
                  </li>
                  <li>
                    <strong className="text-foreground">[5]</strong>{" "}
                    日本産科婦人科学会.「産婦人科診療ガイドライン 産科編 2023」.
                  </li>
                  <li>
                    <strong className="text-foreground">[6]</strong>{" "}
                    国立成育医療研究センター. 妊娠と栄養に関する研究報告.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 関連ページ */}
          <section className="mb-8">
            <Card className="border-primary/20 bg-primary/[0.03] shadow-none">
              <CardContent className="pt-5 pb-5">
                <p className="text-sm font-medium text-foreground mb-2">あわせて読みたい</p>
                <ul className="space-y-2">
                  <li>
                    <Link href="/learn/pregnancy-recipes" className="text-sm text-primary hover:underline">
                      妊娠月別おすすめ料理ガイド（63品レシピ付き）
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn/pregnancy-nutrition" className="text-sm text-primary hover:underline">
                      妊娠中の栄養ガイド
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn/food-allergy-guide" className="text-sm text-primary hover:underline">
                      食物アレルギーガイド
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* PDF */}
          <div className="mb-8">
            <PdfDownloadSection
              title="胎児の栄養素ガイド"
              catchcopy="7つの栄養素と推奨量を1枚に"
              description="たんぱく質・DHA・鉄・葉酸・カルシウム・ビタミンK・ビタミンDの役割と妊娠期別推奨量をA4 1枚にまとめました。"
              pdfPath="/pdf/pregnancy-nutrition-science.pdf"
              usageTips={[
                { icon: "print", text: "冷蔵庫に貼っておく" },
                { icon: "share", text: "パートナーと共有" },
                { icon: "other", text: "健診時に見返す" },
              ]}
            />
          </div>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、医療・栄養指導に代わるものではありません。
              個別の栄養相談については担当の産婦人科医や管理栄養士にご相談ください。
              サプリメントの使用は医師に相談のうえお願いします。
            </p>
          </div>

          <ShareButtons
            title="胎児に栄養素がなぜ必要？｜7つの栄養素の役割と推奨量"
            path="/learn/pregnancy-nutrition-science"
          />
          <MedicalDisclaimer />
        </div>
      </main>
      <Footer />
    </>
  );
}
