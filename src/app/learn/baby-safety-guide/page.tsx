"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleMeta } from "@/components/article-meta";

/* ─── 知っておくべき数字 ─── */
const keyStats = [
  { value: "215人", label: "子どもの不慮の事故死（2023年）", sub: "死亡原因全体の8.0%" },
  { value: "56%", label: "0歳児の事故は住居内で発生", sub: "最も身近な場所が最も危険" },
  { value: "30.6%", label: "事故死の約3割が0歳児", sub: "0〜4歳で56.8%を占める" },
];

/* ─── 月齢別リスクマップ ─── */
interface AgeRisk {
  age: string;
  emoji: string;
  color: string;
  risks: { type: string; detail: string }[];
}

const ageRisks: AgeRisk[] = [
  {
    age: "0〜6ヶ月",
    emoji: "👶",
    color: "border-l-rose-400",
    risks: [
      { type: "窒息", detail: "寝具・ぬいぐるみ・添い寝による気道閉塞が最多。うつぶせ寝は最大のリスク要因" },
      { type: "SIDS", detail: "乳幼児突然死症候群。生後2〜6ヶ月にピーク。あおむけ寝・禁煙・適温が3大予防策" },
      { type: "転落", detail: "ベッド・ソファ・おむつ替え台からの転落。寝返り開始前から注意が必要" },
      { type: "溺水", detail: "入浴時にわずか数cmの水深でも溺れる。沐浴中の目離しは厳禁" },
    ],
  },
  {
    age: "6〜12ヶ月",
    emoji: "🧒",
    color: "border-l-amber-400",
    risks: [
      { type: "誤飲", detail: "何でも口に入れる時期。直径39mm以下の物はすべて危険（トイレットペーパーの芯を通る大きさ）" },
      { type: "やけど", detail: "つかまり立ちで食卓・キッチンに手が届く。ポット・炊飯器の蒸気、味噌汁に注意" },
      { type: "溺水", detail: "浴槽への転落。残し湯は命に関わる。浴室のドアは必ずロック" },
      { type: "転落", detail: "ハイハイ・つかまり立ちで行動範囲が急拡大。階段・ベランダにゲートを" },
    ],
  },
  {
    age: "1〜3歳",
    emoji: "🧒",
    color: "border-l-sky-400",
    risks: [
      { type: "溺水", detail: "浴槽・水遊びでの溺水が死亡事故の上位。1人にするのは数十秒でも危険" },
      { type: "転落", detail: "窓・ベランダからの転落が2〜4歳に集中。窓際に足場になるものを置かない" },
      { type: "交通事故", detail: "駐車場・道路への飛び出し。手をつなぐ・ハーネスの活用を" },
      { type: "誤飲", detail: "薬・洗剤・タバコなど。大人の薬を目の届かない場所へ。ボタン電池は特に危険" },
    ],
  },
];

/* ─── SIDS予防の3原則 ─── */
const sidsPrevention = [
  {
    title: "あおむけ寝",
    detail: "医学上の理由がない限り、1歳になるまではあおむけで寝かせる。うつぶせ寝はSIDSリスクを大幅に高める。",
    icon: "😴",
  },
  {
    title: "母乳育児",
    detail: "母乳育児はSIDSリスクを下げる効果がある。できる範囲で取り組むだけでOK。完全母乳でなくても効果あり。",
    icon: "🤱",
  },
  {
    title: "喫煙回避",
    detail: "妊娠中・出産後ともに喫煙はSIDSの大きなリスク要因。受動喫煙も同様に危険。",
    icon: "🚭",
  },
];

const sidsChecklist = [
  "硬めのマットレスを使用する",
  "赤ちゃんの顔の周りに柔らかいもの（枕・ぬいぐるみ・ブランケット）を置かない",
  "ベビーベッドで1人で寝かせる（同室別床が理想）",
  "室温を暑くしすぎない（20〜22℃が目安）",
  "おしゃぶりの使用もリスク低減に有効とされている",
];

/* ─── 誤飲で多いもの5選 ─── */
interface IngestionItem {
  rank: number;
  item: string;
  danger: string;
  action: string;
  canInduce: boolean;
}

const ingestionItems: IngestionItem[] = [
  {
    rank: 1,
    item: "たばこ・電子たばこリキッド",
    danger: "ニコチン中毒。浸出液（灰皿の水等）は特に危険で致命的な量に達しうる",
    action: "口の中のたばこを取り除き、すぐに受診。吐かせない",
    canInduce: false,
  },
  {
    rank: 2,
    item: "医薬品・医薬部外品",
    danger: "大人用の薬は少量でも子どもには過量。血圧の薬・睡眠薬は特に危険",
    action: "何をどのくらい飲んだか確認し、#7119 または受診",
    canInduce: false,
  },
  {
    rank: 3,
    item: "化粧品",
    danger: "リップ・マニキュア・除光液など。除光液（アセトン）は少量でも中毒リスク",
    action: "除光液・ヘアカラー剤は受診。口紅程度なら経過観察が多い",
    canInduce: false,
  },
  {
    rank: 4,
    item: "洗剤・漂白剤",
    danger: "塩素系漂白剤は粘膜損傷の恐れ。食器用洗剤は比較的低毒性",
    action: "塩素系・酸性洗剤は吐かせず、すぐに受診。水を飲ませて希釈も慎重に",
    canInduce: false,
  },
  {
    rank: 5,
    item: "ボタン電池・磁石",
    danger: "ボタン電池は食道に張り付き2時間で穴が開く。磁石は複数飲むと腸壁を挟み穿孔",
    action: "飲んだ可能性があれば即受診。レントゲンで確認が必要",
    canInduce: false,
  },
];

/* ─── 部屋別チェックリスト ─── */
interface RoomCheck {
  room: string;
  emoji: string;
  checks: string[];
}

const roomChecks: RoomCheck[] = [
  {
    room: "リビング",
    emoji: "🛋️",
    checks: [
      "テーブルの角にコーナーガードを付ける",
      "テレビ台・本棚は壁に固定する（転倒防止）",
      "コンセントにカバーを付ける",
      "ブラインドの紐は手の届かない位置にまとめる",
      "直径39mm以下の小物を床に置かない",
      "たばこ・灰皿を子どもの手の届かない場所に移動",
    ],
  },
  {
    room: "キッチン",
    emoji: "🍳",
    checks: [
      "キッチンゲートを設置する",
      "包丁・ハサミは引き出しロック付きの場所に収納",
      "炊飯器・ポットは蒸気が当たらない高い場所に置く",
      "洗剤・漂白剤はチャイルドロック付きの棚に保管",
      "コンロのチャイルドロックを常時ONにする",
      "鍋の取っ手は手前に出さない",
    ],
  },
  {
    room: "浴室",
    emoji: "🛁",
    checks: [
      "浴室のドアにチャイルドロックを付ける",
      "残し湯をしない（浴槽の水を抜く）",
      "洗面器にも水を溜めたままにしない",
      "シャンプー・洗剤は高い棚に移動",
      "浴室暖房の吹き出し口に触れられないか確認",
      "滑り止めマットを浴槽内に敷く",
    ],
  },
  {
    room: "寝室",
    emoji: "🛏️",
    checks: [
      "ベビーベッドの柵の隙間は6cm以下か確認",
      "大人用ベッドでの添い寝を避ける（同室別床を推奨）",
      "枕・掛け布団・ぬいぐるみを赤ちゃんの周りに置かない",
      "窓際にベッドや足場になる家具を置かない",
      "カーテンの紐・コードを束ねて手が届かないようにする",
      "ベッドガード（柵）は18ヶ月未満には使用しない",
    ],
  },
];

/* ─── 緊急時フローチャート ─── */
interface EmergencyAction {
  situation: string;
  emoji: string;
  color: string;
  steps: string[];
  callNote: string;
}

const emergencyActions: EmergencyAction[] = [
  {
    situation: "窒息（のどに詰まった）",
    emoji: "🚨",
    color: "bg-red-50 border-red-200",
    steps: [
      "【1歳未満】背部叩打法: うつぶせに抱え、肩甲骨の間を手のひらの付け根で5回叩く",
      "【1歳未満】胸部突き上げ法: 仰向けにし、胸の真ん中を指2本で5回圧迫。交互に繰り返す",
      "【1歳以上】腹部突き上げ法（ハイムリック法）: 後ろから抱え、みぞおちの下を上方に圧迫",
      "意識がなくなったら119番 → 心肺蘇生を開始",
    ],
    callNote: "異物が取れなければすぐ119番",
  },
  {
    situation: "誤飲",
    emoji: "⚠️",
    color: "bg-amber-50 border-amber-200",
    steps: [
      "何を・どのくらい飲んだかを確認する",
      "口の中に残っていれば取り除く",
      "灯油・漂白剤・とがった物は吐かせない（粘膜損傷のリスク）",
      "たばこの浸出液・薬は中毒リスクが高い → すぐ受診",
    ],
    callNote: "#7119（救急相談）または中毒110番（072-727-2499）",
  },
  {
    situation: "やけど",
    emoji: "🔥",
    color: "bg-orange-50 border-orange-200",
    steps: [
      "すぐに流水で20分以上冷やす（氷は直接当てない）",
      "衣服の上からやけどした場合は無理に脱がさず、服の上から冷やす",
      "水ぶくれは破らない",
      "広範囲・顔・関節・陰部のやけどはすぐ受診",
    ],
    callNote: "広範囲の場合は119番",
  },
  {
    situation: "転落・頭を打った",
    emoji: "💫",
    color: "bg-blue-50 border-blue-200",
    steps: [
      "意識・呼吸を確認する",
      "嘔吐・けいれん・ぐったり・目の焦点が合わない場合はすぐ119番",
      "頭部に大きなたんこぶ・出血がある場合は受診",
      "24時間は注意深く様子を観察（嘔吐や意識変化がないか）",
    ],
    callNote: "意識がない・けいれんがあればすぐ119番",
  },
];

/* ─── 出典 ─── */
const references = [
  {
    id: 1,
    text: "消費者庁「子どもの事故防止ハンドブック」",
    url: "https://www.caa.go.jp/policies/policy/consumer_safety/child/",
  },
  {
    id: 2,
    text: "こども家庭庁「不慮の事故の発生傾向（令和6年12月資料）」",
    url: "https://www.cfa.go.jp/policies/child-safety-actions/databases",
  },
  {
    id: 3,
    text: "こども家庭庁「乳幼児突然死症候群（SIDS）対策」",
    url: "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids",
  },
  {
    id: 4,
    text: "日本小児科学会「安全な睡眠環境に関するガイドライン（2024年改訂）」",
    url: "https://www.jpeds.or.jp/modules/guidelines/index.php?content_id=160",
  },
  {
    id: 5,
    text: "政府広報オンライン「子供の誤飲・窒息事故に注意」",
    url: "https://www.gov-online.go.jp/article/202408/entry-6450.html",
  },
  {
    id: 6,
    text: "日本中毒情報センター「家庭用品等に係る健康被害情報」",
    url: "https://www.j-poison-ic.jp/",
  },
  {
    id: 7,
    text: "こども家庭庁「もしもの時の応急手当方法」",
    url: "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-7",
  },
];

export default function BabySafetyGuidePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">健康・病気</Badge>
              <Badge variant="secondary">0歳〜3歳の親向け</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">
                保存版
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              赤ちゃんの事故を防ぐ
            </h1>
            <ArticleMeta updatedAt="2026-04-05" />
            <p className="text-muted-foreground leading-relaxed">
              乳幼児の事故の多くは家庭内で起きています。
              月齢別のリスクを知り、部屋ごとの安全対策を整え、
              万が一のときの応急処置を頭に入れておくことが、子どもの命を守る第一歩です。
            </p>
          </div>

          {/* 知っておくべき数字 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🚨</span>
              知っておくべき数字
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {keyStats.map((stat) => (
                <Card key={stat.label} className="border-border/50 shadow-none text-center">
                  <CardContent className="pt-5">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm font-medium text-foreground mt-1">{stat.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 月齢別リスクマップ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📊</span>
              月齢別リスクマップ
            </h2>
            <div className="space-y-4">
              {ageRisks.map((age) => (
                <Card key={age.age} className={`border-l-4 ${age.color} shadow-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{age.emoji}</span>
                      {age.age}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {age.risks.map((risk) => (
                        <div key={risk.type} className="flex items-start gap-3 text-sm">
                          <Badge variant="outline" className="shrink-0 mt-0.5 min-w-[56px] justify-center">
                            {risk.type}
                          </Badge>
                          <p className="text-muted-foreground leading-relaxed">{risk.detail}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SIDS予防 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>😴</span>
              SIDS予防の3原則
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              SIDS（乳幼児突然死症候群）は令和6年に55名の乳児が亡くなっている、乳児期の死亡原因第3位の疾患です。
              原因は完全には解明されていませんが、以下の3原則でリスクを大幅に下げることができます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {sidsPrevention.map((item) => (
                <Card key={item.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-5 text-center">
                    <span className="text-3xl" aria-hidden>{item.icon}</span>
                    <p className="font-semibold text-foreground mt-2">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm font-semibold text-foreground mb-3">
                  安全な睡眠環境チェック（こども家庭庁 2024年改訂ガイドラインより）
                </p>
                <ul className="space-y-2">
                  {sidsChecklist.map((check) => (
                    <li key={check} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                      {check}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 誤飲で多いもの5選 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⚠️</span>
              誤飲で多いもの5選と対処法
            </h2>
            <div className="space-y-3">
              {ingestionItems.map((item) => (
                <Card key={item.rank} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-rose-700 text-xs font-bold shrink-0">
                        {item.rank}
                      </span>
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold text-foreground">{item.item}</p>
                        <p className="text-muted-foreground">{item.danger}</p>
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-xs font-medium text-foreground">対処: </span>
                          <span className="text-xs text-muted-foreground">{item.action}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-3 p-3 bg-rose-50 rounded-lg">
              <p className="text-xs text-rose-700 font-medium">
                原則: 誤飲したものが不明な場合は「吐かせない」で受診。
                灯油・漂白剤・とがった物・ボタン電池は絶対に吐かせないでください。
              </p>
            </div>
          </section>

          {/* 部屋別チェックリスト */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🏠</span>
              部屋別 安全チェックリスト
            </h2>
            <div className="space-y-4">
              {roomChecks.map((room) => (
                <Card key={room.room} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{room.emoji}</span>
                      {room.room}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {room.checks.map((check) => (
                        <li key={check} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 shrink-0">&#9744;</span>
                          {check}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 緊急時フローチャート */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🆘</span>
              緊急時の対応
            </h2>
            <div className="space-y-4">
              {emergencyActions.map((action) => (
                <Card key={action.situation} className={`${action.color} shadow-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{action.emoji}</span>
                      {action.situation}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 mb-3">
                      {action.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground shrink-0">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <div className="bg-white/60 rounded p-2">
                      <p className="text-xs font-medium text-foreground">
                        📞 {action.callNote}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-primary/30 bg-primary/5 shadow-none mt-4">
              <CardContent className="pt-5">
                <h3 className="font-semibold text-foreground mb-2">
                  緊急連絡先を冷蔵庫に貼っておきましょう
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">119</strong> — 救急車・消防
                  </div>
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">#7119</strong> — 救急安心センター（迷ったら）
                  </div>
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">#8000</strong> — 子ども医療電話相談
                  </div>
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">072-727-2499</strong> — 中毒110番（24h）
                  </div>
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
              本ページは一般的な情報提供を目的としています。
              緊急時はまず119番に電話してください。
              応急処置はあくまで救急隊到着までの暫定的な対応です。
              お子さんの状態に不安がある場合は、#8000（子ども医療電話相談）にご連絡ください。
            </p>
          </div>

          {/* PDF ダウンロード */}
          <div className="mt-8">
            <PdfDownloadSection
              title="部屋別 赤ちゃん安全チェックリスト"
              catchcopy="1部屋ずつ、安心を積み重ねる"
              description="リビング・キッチン・浴室・寝室の4エリアごとにチェックボックス形式でまとめました。印刷して使えます。"
              pdfPath="/pdf/baby-safety-checklist.pdf"
              usageTips={[
                { icon: "print", text: "印刷して部屋ごとにチェック" },
                { icon: "share", text: "祖父母・シッターさんにも共有" },
                { icon: "other", text: "緊急連絡先メモ欄付き" },
              ]}
            />
          </div>

          {/* 導線リンク */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/learn/newborn-sleep"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              新生児の睡眠パターンを知る
            </Link>
            <Link
              href="/learn/fever-guide"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              子どもの発熱対応ガイド
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
