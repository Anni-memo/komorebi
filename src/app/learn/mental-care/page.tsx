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
  title: "産後のメンタルケア | こもれび",
  description:
    "産後うつの兆候、マタニティブルーズとの違い、セルフケアの方法、相談先一覧、パートナーへの情報をまとめました。つらいときは自然なこと。一人で抱え込まないでください。",
};

const babyBluesVsDepression = [
  {
    aspect: "発症時期",
    blues: "産後2〜3日〜2週間以内",
    depression: "産後2週間〜数ヶ月（1年以内）",
  },
  {
    aspect: "持続期間",
    blues: "数日〜2週間程度で自然に改善",
    depression: "2週間以上続く（治療なしでは長期化も）",
  },
  {
    aspect: "頻度",
    blues: "産後の女性の50〜80%が経験",
    depression: "産後の女性の10〜15%が経験",
  },
  {
    aspect: "主な症状",
    blues: "涙もろさ、気分の浮き沈み、不安、イライラ",
    depression: "強い悲しみ、興味の喪失、集中力低下、不眠、食欲変化、自責感",
  },
  {
    aspect: "対応",
    blues: "休養と周囲のサポートで改善することが多い",
    depression: "専門家への相談・治療が必要",
  },
];

const depressionSigns = [
  "2週間以上、気分が落ち込んでいる・悲しい気持ちが続く",
  "赤ちゃんや物事への興味や喜びを感じられない",
  "強い疲労感が休んでも取れない",
  "眠れない、または過度に眠ってしまう",
  "食欲がない、または過食してしまう",
  "自分を責める気持ちが強い（「母親失格だ」など）",
  "集中力が低下し、日常の判断が難しい",
  "赤ちゃんへの愛情を感じられないと悩む",
  "死にたい・消えてしまいたいという気持ちが浮かぶ",
];

const selfCareTips = [
  { title: "完璧を手放す", detail: "「よい親」の定義は人それぞれ。家事が行き届かなくても、赤ちゃんが泣き止まなくても、あなたのせいではありません" },
  { title: "休息を最優先にする", detail: "睡眠不足はメンタルに直結します。赤ちゃんが寝ているときに一緒に休む、家事を最低限にするなど、意識的に休息をとりましょう" },
  { title: "人とつながる", detail: "孤立はメンタルの大敵です。家族・友人との会話、地域の子育て広場、オンラインの親コミュニティなど、無理のない形で人とつながりましょう" },
  { title: "外の空気を吸う", detail: "短い散歩でも気分転換になります。日光を浴びることはセロトニンの分泌を促し、気持ちの安定に役立ちます" },
  { title: "自分の時間を確保する", detail: "たとえ15分でも、自分だけの時間を持つことは大切です。パートナーや家族に赤ちゃんを預けて、好きなことをする時間をつくりましょう" },
  { title: "感情を書き出す", detail: "つらい気持ちをノートやスマホに書き出すだけでも、気持ちの整理に役立ちます。うまく言葉にならなくても大丈夫です" },
];

const helpResources = [
  {
    name: "こころの健康相談統一ダイヤル",
    contact: "0570-064-556",
    detail: "都道府県・政令指定都市の精神保健福祉センターにつながります",
    hours: "地域により異なる",
  },
  {
    name: "よりそいホットライン",
    contact: "0120-279-338（24時間無料）",
    detail: "生活・暮らしの困りごと全般。外国語対応あり",
    hours: "24時間対応",
  },
  {
    name: "産後ケア事業（各自治体）",
    contact: "お住まいの市区町村に問い合わせ",
    detail: "宿泊型・デイサービス型・訪問型で産後の心身のケアを受けられます。2024年度から全国展開が進んでいます",
    hours: "自治体により異なる",
  },
  {
    name: "子育て世代包括支援センター",
    contact: "お住まいの市区町村に問い合わせ",
    detail: "妊娠期から子育て期の相談をワンストップで受け付けています。保健師・助産師が対応",
    hours: "自治体により異なる",
  },
  {
    name: "産婦人科・小児科のかかりつけ医",
    contact: "通院中の医療機関",
    detail: "健診のついでに相談できます。つらい状態を伝えることは恥ずかしいことではありません",
    hours: "診療時間内",
  },
  {
    name: "精神科・心療内科",
    contact: "地域の医療機関を検索",
    detail: "産後うつの治療は、カウンセリングや薬物療法が有効です。授乳中でも使える薬があります",
    hours: "診療時間内",
  },
];

const partnerInfo = [
  { title: "「がんばれ」より「何をしてほしい？」", detail: "励ましの言葉が逆にプレッシャーになることがあります。具体的に何を手伝えるか聞いてみましょう" },
  { title: "家事・育児の分担を主体的に", detail: "「手伝う」ではなく「担当する」意識が大切です。授乳以外の家事・育児は分担できます" },
  { title: "話を聴く", detail: "解決策を提示するより、まず気持ちを受け止めることが重要です。「つらいね」「よくやってるよ」という言葉が支えになります" },
  { title: "異変に気づく", detail: "2週間以上の気分の落ち込み、赤ちゃんへの無関心、「死にたい」という発言があったら、専門家への相談を促してください" },
  { title: "パートナー自身のケアも", detail: "父親・パートナーにも産後うつは起こり得ます（約10%）。自分自身のメンタルにも注意を払いましょう" },
];

export default function MentalCarePage() {
  return (
    <>
      <ArticleJsonLd
        title="産後のメンタルケア"
        description="産後うつの兆候、マタニティブルーズとの違い、セルフケアの方法、相談先一覧、パートナーへの情報をまとめました。つらいときは自然なこと。一人で抱え込まないでください。"
        path="/learn/mental-care"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["産後うつ", "メンタルケア", "産後ケア"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "産後のメンタルケア" },
            ]} />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">メンタル</Badge>
              <Badge variant="secondary">すべての親向け</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              産後のメンタルケア
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              出産後に気持ちが不安定になるのは、とても自然なことです。
              「つらい」と感じたら、それはあなたが弱いからではありません。
              このページでは、知っておいてほしいサインと頼れる相談先をまとめました。
            </p>
          </div>

          <TableOfContents items={[
            { id: "message", label: "今、つらい気持ちを抱えている方へ" },
            { id: "difference", label: "マタニティブルーズと産後うつの違い" },
            { id: "signs", label: "こんなサインがあったら相談を" },
            { id: "self-care", label: "セルフケアの方法" },
            { id: "help", label: "相談先一覧" },
            { id: "partner", label: "パートナー・ご家族の方へ" },
            { id: "references", label: "出典・参考情報" },
          ]} />

          {/* 大切なメッセージ */}
          <Card id="message" className="border-primary/30 bg-primary/5 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">
                今、つらい気持ちを抱えている方へ
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                産後のつらさは、ホルモンの急激な変化・睡眠不足・生活の大きな変化が重なって起こるものです。
                自分を責める必要はまったくありません。
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                「死にたい」「消えてしまいたい」という気持ちがある場合は、
                すぐに<strong className="text-foreground">こころの健康相談統一ダイヤル（0570-064-556）</strong>
                または<strong className="text-foreground">よりそいホットライン（0120-279-338）</strong>にお電話ください。
              </p>
            </CardContent>
          </Card>

          {/* マタニティブルーズと産後うつの違い */}
          <section id="difference" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📖</span>
              マタニティブルーズと産後うつの違い
            </h2>
            <Card className="border-border/50 shadow-none overflow-hidden">
              <CardContent className="pt-5 px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3 text-foreground font-semibold"></th>
                        <th className="text-left py-2 px-3 text-foreground font-semibold">マタニティブルーズ</th>
                        <th className="text-left py-2 px-3 text-foreground font-semibold">産後うつ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {babyBluesVsDepression.map((row) => (
                        <tr key={row.aspect} className="border-b last:border-b-0">
                          <td className="py-2 px-3 font-medium text-foreground whitespace-nowrap">{row.aspect}</td>
                          <td className="py-2 px-3 text-muted-foreground">{row.blues}</td>
                          <td className="py-2 px-3 text-muted-foreground">{row.depression}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 産後うつの兆候 */}
          <section id="signs" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔍</span>
              こんなサインがあったら相談を
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  以下のような状態が2週間以上続く場合は、産後うつの可能性があります。
                  一つでも当てはまると感じたら、かかりつけ医や相談窓口に連絡してみてください。
                </p>
                <ul className="space-y-2">
                  {depressionSigns.map((sign) => (
                    <li key={sign} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-amber-500 mt-0.5 shrink-0">&#9679;</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* セルフケア */}
          <section id="self-care" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🌿</span>
              セルフケアの方法
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-4">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  セルフケアは「余裕があったらやること」ではなく、心身を守るための大切な習慣です。
                  すべてを実践する必要はありません。今の自分にできそうなものを一つ選んでみてください。
                </p>
              </CardContent>
            </Card>
            <div className="space-y-3">
              {selfCareTips.map((tip) => (
                <Card key={tip.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 相談先一覧 */}
          <section id="help" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📞</span>
              相談先一覧
            </h2>
            <div className="space-y-3">
              {helpResources.map((resource) => (
                <Card key={resource.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">{resource.name}</h3>
                      <Badge variant="outline" className="text-xs shrink-0">{resource.hours}</Badge>
                    </div>
                    <p className="text-sm font-medium text-primary mb-1">{resource.contact}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{resource.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* パートナーへの情報 */}
          <section id="partner" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>👥</span>
              パートナー・ご家族の方へ
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
          <section id="references" className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">出典・参考情報</h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 日本産科婦人科学会. &quot;産後うつ病について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 厚生労働省. &quot;産後ケア事業について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 日本周産期メンタルヘルス学会. &quot;周産期メンタルヘルス コンセンサスガイド 2023.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> Paulson JF, Bazemore SD. &quot;Prenatal and Postpartum Depression in Fathers.&quot; <em>JAMA.</em> 2010;303(19):1961-1969.
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
              心身の不調が続く場合は、医療機関や専門の相談窓口に必ずご相談ください。
            </p>
          </div>

          <ShareButtons title="産後のメンタルケア" path="/learn/mental-care" />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/postnatal-procedures" className={buttonVariants({ variant: "outline" })}>
              出産後の手続き一覧を読む
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
