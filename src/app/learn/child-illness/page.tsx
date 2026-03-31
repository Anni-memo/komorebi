import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "子どもがかかりやすい病気ガイド",
  description:
    "乳幼児がかかりやすい病気の症状・対応・受診の目安。突発性発疹、手足口病、RSウイルスなどを解説。",
};

const commonInfections = [
  {
    name: "突発性発疹",
    age: "生後6ヶ月〜1歳ごろ",
    season: "通年",
    detail:
      "突然の高熱（38〜40度）が3日ほど続き、解熱とともに全身に発疹が出ます。ほぼ自然治癒し、発疹が出れば診断確定。多くの子が1歳までに経験します。",
    care: "水分補給と安静。高熱でも比較的機嫌がよいことが多いです。熱性けいれんに注意。",
    icon: "&#129338;",
  },
  {
    name: "手足口病",
    age: "1〜5歳に多い",
    season: "夏（6〜8月）",
    detail:
      "口の中・手のひら・足の裏に小さな水疱ができます。発熱は軽いことが多いですが、口の中の水疱が痛くて食べられなくなることがあります。",
    care: "特効薬はありません。口の痛みが強い場合は、冷たく柔らかい食べ物（ゼリー・豆腐など）を。水分補給が最も重要です。",
    icon: "&#9995;",
  },
  {
    name: "RSウイルス",
    age: "0〜2歳（特に0歳児は重症化リスク）",
    season: "秋〜冬",
    detail:
      "鼻水・咳から始まり、細気管支炎や肺炎に進行することがあります。特に生後6ヶ月未満の赤ちゃんは重症化しやすく、入院が必要になることも。",
    care: "呼吸が苦しそう（ゼーゼー・肩で息をする・陥没呼吸）なら早めに受診を。こまめな鼻吸いと水分補給。",
    icon: "&#129531;",
  },
  {
    name: "ヘルパンギーナ",
    age: "1〜5歳に多い",
    season: "夏（6〜8月）",
    detail:
      "突然の高熱（39〜40度）と喉の奥にできる小さな水疱が特徴の夏風邪です。喉の痛みが強く、食事を嫌がることが多いです。",
    care: "喉が痛くて食べられないときは、水分を優先。冷たい飲み物や経口補水液を少量ずつ与えてください。通常2〜4日で回復します。",
    icon: "&#127777;",
  },
  {
    name: "ロタウイルス",
    age: "0〜2歳",
    season: "冬〜春（1〜4月）",
    detail:
      "激しい嘔吐と白っぽい水様性の下痢が特徴。脱水症状になりやすく、重症化すると入院が必要になることもあります。",
    care: "嘔吐が落ち着いたら、経口補水液をスプーン1杯ずつこまめに。ワクチン（生後14週6日までに初回接種）で重症化を予防できます。",
    icon: "&#129440;",
  },
  {
    name: "インフルエンザ",
    age: "すべての年齢",
    season: "冬（12〜3月）",
    detail:
      "突然の高熱（38〜40度）、全身倦怠感、関節痛が特徴。子どもでは急激な症状悪化や、まれに脳症を起こすことがあります。",
    care: "発症48時間以内の抗インフルエンザ薬が有効。異常行動（急に走り出す・意味不明なことを言う）に注意し、目を離さないでください。",
    icon: "&#129298;",
  },
  {
    name: "溶連菌感染症",
    age: "3歳以上に多い",
    season: "冬〜春",
    detail:
      "発熱、のどの強い痛み、体の発疹（細かい赤い発疹）が特徴。舌がイチゴのようにブツブツになることも（イチゴ舌）。",
    care: "抗生剤（ペニシリン系）で治療します。処方された抗生剤は、症状が改善しても必ず最後まで飲み切ってください。不完全な治療はリウマチ熱・腎炎のリスクがあります。",
    icon: "&#128138;",
  },
];

const allergyConditions = [
  {
    name: "食物アレルギー",
    detail:
      "卵・牛乳・小麦が3大アレルゲン。初めての食品は、少量から・平日の午前中（受診しやすい時間帯）に試すのが基本です。じんましん・嘔吐・ぐったりする場合はすぐ受診を。",
    management:
      "正確な診断（血液検査＋食物経口負荷試験）のもと、必要最小限の除去が基本。自己判断での過度な除去は栄養面のリスクがあります。",
  },
  {
    name: "アトピー性皮膚炎",
    detail:
      "慢性的な痒みのある湿疹。乳児では顔・頭、幼児では肘や膝の裏側に出やすい特徴があります。乾燥が悪化因子になるため、保湿が基本のケアです。",
    management:
      "保湿剤を毎日塗る＋炎症にはステロイド外用薬を医師の指示どおりに使用。適切に使えばステロイドは怖い薬ではありません。自己判断で中断しないことが大切です。",
  },
  {
    name: "気管支喘息",
    detail:
      "気道の慢性的な炎症により、ゼーゼー・ヒューヒューという喘鳴や、夜間〜明け方の咳が特徴です。風邪や運動、気温の変化で発作が起きやすくなります。",
    management:
      "発作が起きたときの治療だけでなく、長期管理薬（吸入ステロイドなど）で炎症をコントロールすることが重要。自己判断で薬を減らさないでください。",
  },
];

const visitGuidelinesByAge = [
  {
    category: "3ヶ月未満の赤ちゃん",
    color: "border-red-200",
    items: [
      "38.0度以上の発熱 → 必ず受診（時間帯を問わず）",
      "この月齢の発熱は重篤な感染症の可能性があり、検査が必要です",
    ],
  },
  {
    category: "すぐに受診すべきとき（すべての月齢）",
    color: "border-red-200",
    items: [
      "ぐったりして反応が薄い・元気がまったくない",
      "水分がまったく取れない（半日以上おしっこが出ない）",
      "呼吸が苦しそう（肩で息をする・肋骨の間がへこむ・唇が紫色）",
      "けいれんを起こした（初めて、または5分以上続く場合は救急車）",
      "意識がもうろうとしている",
      "激しい腹痛で泣き止まない",
    ],
  },
  {
    category: "翌日の受診でよいことが多いとき",
    color: "border-amber-200",
    items: [
      "熱はあるが水分が取れていて、機嫌もそこそこ",
      "咳・鼻水はあるが呼吸は楽そう",
      "下痢・嘔吐はあるが水分は少しずつ取れている",
      "発疹が出たが全身状態は良好",
    ],
  },
];

const homeCareBasics = [
  {
    title: "水分補給",
    description:
      "少量ずつ、こまめに水分を与えます。嘔吐がある場合は、5分おきにスプーン1杯ずつから。母乳・ミルク・経口補水液（OS-1等）が適しています。",
    icon: "&#128167;",
  },
  {
    title: "安静・休息",
    description:
      "無理に食べさせなくて大丈夫。水分が取れていれば、食欲は回復とともに戻ります。ゆっくり休ませてあげてください。",
    icon: "&#128164;",
  },
  {
    title: "解熱剤の使い方",
    description:
      "38.5度以上でつらそうなときにアセトアミノフェン（カロナール等）を使用。元気なら無理に下げなくてOK。使用間隔は最低4〜6時間。アスピリンは子どもに使用禁止です。",
    icon: "&#128138;",
  },
  {
    title: "感染予防",
    description:
      "家族への感染を防ぐため、手洗い・タオルの個別使用を徹底。嘔吐物・下痢の処理は手袋＋塩素系消毒液で。兄弟がいる場合は可能な限り別室で過ごしましょう。",
    icon: "&#128694;",
  },
];

const consultInfo = {
  name: "#8000（子ども医療電話相談）",
  description:
    "夜間・休日に子どもの症状で迷ったとき、小児科医師・看護師に電話で相談できます。全国共通の短縮番号です。",
  hours:
    "自治体により異なるが、概ね19:00〜翌8:00（休日は日中も対応する地域あり）",
  how: "固定電話・携帯電話から「#8000」をダイヤル",
};

export default function ChildIllnessPage() {
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
              子どもがかかりやすい病気ガイド
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              乳幼児はさまざまな感染症にかかりながら免疫を獲得していきます。
              「この症状は何？」「病院に行くべき？」と迷ったときのために、
              よくある病気の特徴・対応・受診の目安をまとめました。
            </p>
          </div>

          {/* 重要なお知らせ */}
          <Card className="border-red-200 bg-red-50/50 shadow-none mb-8 dark:bg-red-950/20 dark:border-red-900/50">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>&#9888;</span>
                3ヶ月未満の発熱は即受診
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                生後3ヶ月未満の赤ちゃんが38.0度以上の熱を出した場合は、
                時間帯にかかわらず、すぐに医療機関を受診してください。
                迷ったら#8000（子ども医療電話相談）に電話を。
              </p>
            </CardContent>
          </Card>

          {/* よくある感染症 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#129440;</span>
              よくある感染症
            </h2>
            <div className="space-y-3">
              {commonInfections.map((item) => (
                <Card key={item.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span
                        className="text-xl shrink-0 mt-0.5"
                        aria-hidden
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      />
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">
                            {item.name}
                          </h3>
                          <div className="flex gap-2 shrink-0">
                            <span className="text-xs text-muted-foreground">
                              {item.age}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.season}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          {item.detail}
                        </p>
                        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                          <strong className="text-foreground">
                            家庭でのケア:
                          </strong>{" "}
                          {item.care}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* アレルギー関連 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#127800;</span>
              アレルギー関連
            </h2>
            <div className="space-y-3">
              {allergyConditions.map((item) => (
                <Card key={item.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {item.detail}
                    </p>
                    <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                      <strong className="text-foreground">管理のポイント:</strong>{" "}
                      {item.management}
                    </div>
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
              {visitGuidelinesByAge.map((group) => (
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

            {/* #8000案内 */}
            <Card className="border-border/50 shadow-none mt-4">
              <CardContent className="pt-5">
                <h3 className="font-semibold text-foreground mb-1">
                  {consultInfo.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {consultInfo.description}
                </p>
                <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 rounded-lg p-3">
                  <p>
                    <strong className="text-foreground">対応時間:</strong>{" "}
                    {consultInfo.hours}
                  </p>
                  <p>
                    <strong className="text-foreground">利用方法:</strong>{" "}
                    {consultInfo.how}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 家庭でのケアの基本 */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#127968;</span>
              家庭でのケアの基本
            </h2>
            <div className="space-y-3">
              {homeCareBasics.map((care) => (
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
                    <strong className="text-foreground">[3]</strong> 日本小児アレルギー学会.
                    &quot;食物アレルギー診療ガイドライン2021.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 日本小児科学会.
                    &quot;予防接種と感染症の基礎知識.&quot;
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

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/fever-guide"
              className={buttonVariants({ variant: "outline" })}
            >
              発熱対応ガイドを見る
            </Link>
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
