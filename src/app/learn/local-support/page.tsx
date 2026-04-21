import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

export const metadata = {
  title: "地域の子育て支援制度の調べかた",
  description:
    "自治体ごとに異なる子育て支援制度を効率よく調べる方法を解説。児童手当・医療費助成・一時保育・ファミサポなど、使える制度を見逃さないためのガイド。",
};

const searchMethods = [
  {
    title: "自治体の公式サイトで調べる",
    icon: "🏛️",
    steps: [
      "「○○市 子育て支援」で検索する",
      "「子育て」「福祉」カテゴリのページを確認",
      "「子育てガイドブック」のPDFがあればダウンロード",
    ],
    tip: "多くの自治体が子育て世帯向けの冊子（PDF）を公開しています。これが最も網羅的な情報源です。",
  },
  {
    title: "子育て支援センターに行く",
    icon: "🏠",
    steps: [
      "最寄りの子育て支援センター・子育て広場を探す",
      "スタッフに「使える制度を教えてほしい」と相談",
      "チラシやパンフレットをもらう",
    ],
    tip: "対面で相談できるため、自分の状況に合った制度をピンポイントで教えてもらえます。申請の手続きまで案内してくれることも。",
  },
  {
    title: "母子手帳の交付時・健診時に確認する",
    icon: "📋",
    steps: [
      "母子手帳の交付時に渡される案内を確認",
      "乳幼児健診の会場で配布されるチラシをチェック",
      "保健師さんに個別相談する",
    ],
    tip: "母子手帳の交付時は制度説明を受けられる貴重な機会。聞きたいことをメモして持っていくと効率的です。",
  },
  {
    title: "マイナポータルで確認する",
    icon: "📱",
    steps: [
      "マイナポータル（myna.go.jp）にログイン",
      "「子育てに関する手続き」を検索",
      "自治体のオンライン申請に対応している制度を確認",
    ],
    tip: "児童手当の申請など、一部の手続きはオンラインで完結できます。",
  },
];

const commonBenefits = [
  {
    name: "児童手当",
    overview: "0歳〜高校生の子どもがいる家庭に月額10,000〜15,000円を支給",
    where: "住民票のある市区町村の窓口、またはマイナポータル",
    deadline: "出生届提出後15日以内に申請（さかのぼり不可）",
  },
  {
    name: "乳幼児医療費助成（マル乳・マル子）",
    overview: "子どもの医療費の自己負担分を助成。対象年齢・所得制限は自治体により異なる",
    where: "住民票のある市区町村の窓口",
    deadline: "出生後すぐ（健康保険加入後に申請）",
  },
  {
    name: "出産育児一時金",
    overview: "出産1回につき50万円を支給。直接支払制度で病院に直接支払われることが多い",
    where: "加入している健康保険組合・協会けんぽ",
    deadline: "出産翌日から2年以内",
  },
  {
    name: "育児休業給付金",
    overview: "育休中の収入を保障。最初の180日は賃金の67%、以降50%",
    where: "勤務先経由でハローワークに申請",
    deadline: "育休開始後〜2ヶ月ごとに申請",
  },
  {
    name: "一時保育・緊急保育",
    overview: "リフレッシュや急用時に一時的に子どもを預けられる。1日2,000〜3,000円程度",
    where: "実施している保育園・自治体窓口に直接申し込み",
    deadline: "事前登録が必要な場合が多い",
  },
  {
    name: "ファミリー・サポート・センター",
    overview: "地域の提供会員が子どもの送迎や預かりをサポート。1時間700〜1,000円程度",
    where: "自治体のファミサポ事務局に登録",
    deadline: "利用前に会員登録（面談あり）",
  },
];

const localOnlyExamples = [
  {
    category: "経済的支援",
    examples: [
      "第2子以降の保育料無料化",
      "おむつ定額サービス補助",
      "子育てタクシー利用券",
      "多子世帯への給付金",
    ],
  },
  {
    category: "育児サポート",
    examples: [
      "産後ドゥーラ・ヘルパー派遣",
      "産後ケア施設の利用補助",
      "子育てコンシェルジュ（個別相談員）",
      "双子・多胎児家庭への特別支援",
    ],
  },
  {
    category: "施設・サービス",
    examples: [
      "子育て広場・児童館の無料利用",
      "おもちゃライブラリー（貸出サービス）",
      "子育てカフェ・親子サロン",
      "育児講座・離乳食教室の無料開催",
    ],
  },
];

const faq = [
  {
    question: "引っ越したら手続きはやり直し？",
    answer:
      "はい。児童手当や医療費助成は転出届・転入届と一緒に手続きが必要です。転入先の自治体で新たに申請してください。転出から15日以内に手続きしないと、手当が途切れる場合があります。",
  },
  {
    question: "所得制限で対象外になった場合は？",
    answer:
      "自治体独自の制度には所得制限がないものもあります。また、所得制限の基準は毎年見直されることがあるため、定期的に確認してください。",
  },
  {
    question: "申請を忘れていた場合、さかのぼってもらえる？",
    answer:
      "制度によります。児童手当は原則さかのぼり不可。医療費助成は領収書があれば後から申請できる自治体もあります。まずは窓口に相談してください。",
  },
];

export default function LocalSupportPage() {
  return (
    <>
      <ArticleJsonLd
        title="地域の子育て支援制度の調べかた"
        description="自治体ごとに異なる子育て支援制度を効率よく調べる方法を解説。"
        path="/learn/local-support"
        datePublished="2026-04-05"
        tags={["制度", "子育て支援", "自治体", "児童手当", "医療費助成"]}
        faq={faq}
        breadcrumbs={[
          { name: "トップ", href: "/" },
          { name: "学ぶ", href: "/learn" },
          { name: "地域の子育て支援制度の調べかた" },
        ]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "地域の子育て支援制度の調べかた" },
            ]} />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">制度</Badge>
              <Badge variant="secondary">手続き</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              地域の子育て支援制度の調べかた
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              子育て支援の制度は自治体によって大きく異なります。
              <br />
              「知らなかった」で損をしないために、効率よく調べる方法を整理しました。
            </p>
            <ArticleMeta updatedAt="2026-04-05" />
          </div>

          <TableOfContents items={[
            { id: "methods", label: "支援制度を調べる4つの方法" },
            { id: "common-benefits", label: "まず確認したい主な制度" },
            { id: "local-only", label: "自治体によってはこんな制度も" },
            { id: "checklist", label: "制度の調べ忘れチェックリスト" },
            { id: "faq", label: "よくある質問" },
            { id: "references", label: "出典・参考文献" },
          ]} />

          {/* 大前提 */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>子育て支援制度は「国の制度」と「自治体独自の制度」の2種類</strong>があります。
                国の制度（児童手当など）はどこに住んでも同じですが、
                自治体独自の制度は住んでいる場所で大きく変わります。
                同じ県内でも隣の市と内容が違うことは珍しくありません。
              </p>
            </CardContent>
          </Card>

          {/* 調べ方4つ */}
          <section id="methods" className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4">
              支援制度を調べる4つの方法
            </h2>
            <div className="space-y-4">
              {searchMethods.map((method, i) => (
                <Card key={method.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-xl" aria-hidden>{method.icon}</span>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <h3 className="font-semibold text-foreground">{method.title}</h3>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mb-3 ml-9">
                      {method.steps.map((step) => (
                        <li key={step} className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-muted/30 rounded-lg p-3 ml-9">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">ポイント: </strong>
                        {method.tip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 全国共通の主な制度 */}
          <section id="common-benefits" className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4">
              まず確認したい主な制度
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              全国共通の制度を中心に、子育て家庭が使える主な支援をまとめました。
            </p>
            <div className="space-y-3">
              {commonBenefits.map((benefit) => (
                <Card key={benefit.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-2">
                      {benefit.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {benefit.overview}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">申請先: </span>
                        <span className="text-foreground">{benefit.where}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">期限: </span>
                        <span className="text-foreground">{benefit.deadline}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 自治体独自の制度例 */}
          <section id="local-only" className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4">
              自治体によってはこんな制度も
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              以下は一部の自治体で実施されている制度の例です。
              お住まいの地域で利用できるか確認してみてください。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {localOnlyExamples.map((group) => (
                <Card key={group.category} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-2">
                      {group.category}
                    </h3>
                    <ul className="space-y-1">
                      {group.examples.map((ex) => (
                        <li key={ex} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-primary mt-0.5 shrink-0">・</span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* チェックリスト */}
          <section id="checklist" className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4">
              制度の調べ忘れチェックリスト
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {[
                    "児童手当の申請は済んでいますか？",
                    "乳幼児医療費助成の受給者証は届いていますか？",
                    "出産育児一時金の手続きは完了していますか？",
                    "自治体の子育てガイドブック（PDF）をダウンロードしましたか？",
                    "最寄りの子育て支援センターの場所を確認しましたか？",
                    "ファミリー・サポート・センターへの登録は検討しましたか？",
                    "一時保育の事前登録が必要か確認しましたか？",
                    "産後ケア事業（デイケア・宿泊型）の有無を確認しましたか？",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-border shrink-0 mt-0.5 text-xs text-muted-foreground">
                        &#9744;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4">
              よくある質問
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <Card key={item.question} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      Q. {item.question}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/20 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5 text-center">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>制度を全部覚える必要はありません。</strong>
                <br />
                「困ったときに、どこに聞けばいいか」を知っておくだけで十分です。
                <br />
                自治体の窓口や子育て支援センターは、いつでもあなたの味方です。
              </p>
            </CardContent>
          </Card>

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
                    <strong className="text-foreground">[1]</strong> こども家庭庁「子育て支援施策」公式情報.{" "}
                    <a href="https://www.cfa.go.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">こども家庭庁</a>
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 厚生労働省「地域子育て支援拠点事業」.{" "}
                    <a href="https://www.mhlw.go.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">厚生労働省</a>
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 内閣府「子ども・子育て支援新制度」.{" "}
                    <a href="https://www.cao.go.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">内閣府</a>
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 全国社会福祉協議会「ファミリー・サポート・センター事業」.{" "}
                    <a href="https://www.shakyo.or.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">全国社会福祉協議会</a>
                  </li>
                  <li>
                    <strong className="text-foreground">[5]</strong> 各都道府県・市区町村の子ども家庭支援ウェブページ（地域別制度の一次情報）.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <ShareButtons title="地域の子育て支援制度の調べかた" path="/learn/local-support" />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn" className={buttonVariants({ variant: "outline" })}>
              学ぶトップに戻る
            </Link>
            <Link href="/benefits" className={buttonVariants({ variant: "outline" })}>
              制度を調べる
            </Link>
            <Link href="/concierge" className={buttonVariants({ variant: "ghost" })}>
              AIに相談する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
