"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleMeta } from "@/components/article-meta";

/* ─── ネントレとは ─── */
const keyPoints = [
  { value: "約70%", label: "夜泣きに悩む保護者の割合", sub: "生後6〜12ヶ月の調査（日本小児科学会）" },
  { value: "8〜10ヶ月", label: "夜泣きのピーク時期", sub: "睡眠サイクルの発達に伴う一時的な現象" },
  { value: "4〜7日", label: "多くのネントレで効果が出るまでの期間", sub: "一貫性のある対応が鍵" },
];

/* ─── 月齢別推奨睡眠時間 ─── */
interface SleepByAge {
  age: string;
  emoji: string;
  color: string;
  totalHours: string;
  nightHours: string;
  napHours: string;
  napCount: string;
  note: string;
}

const sleepByAge: SleepByAge[] = [
  {
    age: "0〜3ヶ月",
    emoji: "👶",
    color: "border-l-rose-400",
    totalHours: "14〜17時間",
    nightHours: "8〜9時間（断続的）",
    napHours: "6〜8時間",
    napCount: "3〜5回",
    note: "昼夜の区別がまだない時期。ネントレは推奨されない",
  },
  {
    age: "4〜6ヶ月",
    emoji: "👶",
    color: "border-l-amber-400",
    totalHours: "12〜16時間",
    nightHours: "10〜12時間",
    napHours: "3〜4時間",
    napCount: "2〜3回",
    note: "ネントレ開始の目安。夜間の長い睡眠が可能になり始める",
  },
  {
    age: "7〜12ヶ月",
    emoji: "🧒",
    color: "border-l-sky-400",
    totalHours: "12〜15時間",
    nightHours: "10〜12時間",
    napHours: "2〜3時間",
    napCount: "2回",
    note: "夜泣きピーク期。生活リズムを整えることが最も重要",
  },
  {
    age: "1〜2歳",
    emoji: "🧒",
    color: "border-l-green-400",
    totalHours: "11〜14時間",
    nightHours: "10〜12時間",
    napHours: "1〜2時間",
    napCount: "1回",
    note: "昼寝が1回に移行。就寝時間の一貫性がポイント",
  },
];

/* ─── 夜泣きの原因3つ ─── */
const nightCryingCauses = [
  {
    title: "睡眠サイクルの発達",
    detail: "生後8ヶ月頃から大人と似た睡眠サイクル（約50〜60分周期）が形成され始めます。サイクルの切り替わり時に一時的に覚醒し、自分で再入眠できないと泣いてしまいます。",
    icon: "🔄",
  },
  {
    title: "分離不安の芽生え",
    detail: "生後8〜10ヶ月は「対象の永続性」を理解し始める時期です。親がそばにいないことに気づき不安を感じるため、夜中に目が覚めると泣いて呼びます。",
    icon: "💛",
  },
  {
    title: "発達の急成長期（リープ）",
    detail: "はいはい・つかまり立ちなど運動発達の節目では、脳が活発に働き睡眠が浅くなります。日中の刺激が多すぎても夜泣きにつながります。",
    icon: "📈",
  },
];

/* ─── 4つの方法比較 ─── */
interface TrainingMethod {
  name: string;
  emoji: string;
  color: string;
  origin: string;
  approach: string;
  parentBurden: string;
  effectSpeed: string;
  suitableFor: string;
  caution: string;
}

const trainingMethods: TrainingMethod[] = [
  {
    name: "ジーナ式",
    emoji: "📅",
    color: "border-l-violet-400",
    origin: "ジーナ・フォード（英国ナニー）",
    approach: "授乳・昼寝・就寝を分刻みでスケジュール管理。生活リズム全体を整えることで自然に夜通し眠れるようにする",
    parentBurden: "中〜高（スケジュール管理が細かい）",
    effectSpeed: "2〜4週間",
    suitableFor: "規則正しい生活を好む家庭。早い月齢（生後6週〜）から始められる",
    caution: "スケジュールに縛られすぎるとストレスに。柔軟なアレンジが大切",
  },
  {
    name: "ファーバー法（段階的消去法）",
    emoji: "⏱️",
    color: "border-l-sky-400",
    origin: "リチャード・ファーバー医師（米国）",
    approach: "泣いても一定時間待ってから短時間の声かけ。待ち時間を段階的に延ばしていく（3分→5分→10分…）",
    parentBurden: "中（泣き声を聞く精神的負担あり）",
    effectSpeed: "4〜7日",
    suitableFor: "生後6ヶ月以降。ある程度泣かせることに抵抗が少ない家庭",
    caution: "待ち時間中の泣き声がつらい場合は無理をしない。中断すると逆効果になることも",
  },
  {
    name: "椅子メソッド（シャッフル法）",
    emoji: "🪑",
    color: "border-l-amber-400",
    origin: "キム・ウエスト（米国睡眠コンサルタント）",
    approach: "ベッドサイドに椅子を置いて見守り、3日ごとに椅子をドアに向かって少しずつ離していく",
    parentBurden: "低〜中（そばにいるので安心感がある）",
    effectSpeed: "1〜2週間",
    suitableFor: "泣かせたくないが自力入眠を身につけさせたい家庭",
    caution: "進み方がゆっくりなため、途中でブレやすい。一貫性を保つことが成功の鍵",
  },
  {
    name: "完全消去法（CIO）",
    emoji: "🚪",
    color: "border-l-rose-400",
    origin: "マーク・ワイスブルース医師（米国）",
    approach: "就寝ルーティン後にベッドに置き、朝まで介入しない。泣いてもそのまま見守る",
    parentBurden: "高（精神的に最もつらい方法）",
    effectSpeed: "3〜5日",
    suitableFor: "生後6ヶ月以降。他の方法で効果がなかった場合の選択肢",
    caution: "日本では抵抗感が強い方法。安全な睡眠環境が大前提。無理に選ぶ必要はない",
  },
];

/* ─── 開始判断チェックリスト ─── */
const readinessChecklist = [
  "月齢が4ヶ月以上（修正月齢で判断）",
  "体重が順調に増えている（成長曲線の範囲内）",
  "医師から夜間授乳の必要がないと言われている",
  "赤ちゃんが健康で、発熱や体調不良がない",
  "引っ越し・保育園入園など大きな環境変化の直後ではない",
  "保護者自身の体調・メンタルが安定している",
  "パートナーや家族の協力が得られる",
];

/* ─── 7日間実践プラン ─── */
interface DayPlan {
  day: string;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
  tip: string;
}

const sevenDayPlan: DayPlan[] = [
  {
    day: "1日目",
    theme: "観察と記録",
    morning: "起床時間を決めて固定する（例: 7時）",
    afternoon: "昼寝のタイミングと長さを記録する",
    evening: "就寝ルーティンを決める（入浴→着替え→絵本→消灯）",
    night: "初日は従来通りの対応でOK。現状を記録する",
    tip: "まずは「記録する」ことが最優先。変えようとしなくて大丈夫",
  },
  {
    day: "2日目",
    theme: "就寝ルーティン開始",
    morning: "決めた時間に起こし、朝日を浴びせる",
    afternoon: "活動時間（起きていられる長さ）を意識して昼寝させる",
    evening: "就寝ルーティンを初めて実行する。毎日同じ順番・同じ時間で",
    night: "ルーティン後にベッドに置く。泣いたら選んだ方法で対応",
    tip: "初日は1〜2時間泣くこともある。これは正常な反応",
  },
  {
    day: "3日目",
    theme: "一貫性を保つ",
    morning: "同じ時間に起床。朝のルーティンも固定し始める",
    afternoon: "昼寝を適切な時間で切り上げる（15時以降の昼寝は避ける）",
    evening: "同じルーティンを繰り返す。時間帯もなるべく同じに",
    night: "泣き時間が少し短くなることが多い。記録を続ける",
    tip: "「昨日より少しでもマシ」ならOK。比較対象は昨日だけ",
  },
  {
    day: "4日目",
    theme: "パターンが見えてくる",
    morning: "生活リズムが定まり始める。朝食のタイミングも整え始める",
    afternoon: "活動時間に合わせた昼寝スケジュールが定着し始める",
    evening: "ルーティンへの反応が変わってくる（安心のサインに注目）",
    night: "入眠までの時間が短くなり始める",
    tip: "4日目に一時的に悪化する「消去バースト」が起きることもある。想定内",
  },
  {
    day: "5日目",
    theme: "安定期に入る",
    morning: "起床・朝食・午前の活動がスムーズになる",
    afternoon: "昼寝の寝つきも改善し始める",
    evening: "ルーティンが「当たり前」になってくる",
    night: "多くの場合、泣き時間が大幅に減少する",
    tip: "うまくいっていたら自分を褒める。ここまで続けたことがすごい",
  },
  {
    day: "6日目",
    theme: "微調整",
    morning: "睡眠ログを振り返り、就寝時間の微調整をする",
    afternoon: "昼寝が長すぎ・短すぎないか確認",
    evening: "ルーティンの中で特に効果的だった要素を把握する",
    night: "夜間覚醒があっても短時間で再入眠できるようになる",
    tip: "完璧を目指さない。「7割できていれば成功」がネントレの鉄則",
  },
  {
    day: "7日目",
    theme: "定着と振り返り",
    morning: "1週間の記録を振り返り、変化を確認する",
    afternoon: "今後のスケジュールとして定着させる",
    evening: "ルーティンが自然に流れるようになっている",
    night: "自力入眠ができるようになっていれば大成功",
    tip: "後戻りする日もある。それも含めて成長のプロセス",
  },
];

/* ─── 失敗パターン5選 ─── */
interface FailurePattern {
  rank: number;
  pattern: string;
  why: string;
  fix: string;
}

const failurePatterns: FailurePattern[] = [
  {
    rank: 1,
    pattern: "途中で方針がブレる",
    why: "泣き声に耐えられず、日によって対応が変わると赤ちゃんは混乱する。「泣けば抱っこしてもらえる」と学習してしまう",
    fix: "最低5日間は同じ方法を貫く。つらければパートナーと交代制にする",
  },
  {
    rank: 2,
    pattern: "就寝時間が遅すぎる",
    why: "「疲れさせれば寝る」は逆効果。過疲労になるとコルチゾール（ストレスホルモン）が分泌され、かえって寝つきが悪くなる",
    fix: "最後の昼寝から3〜4時間後を目安に就寝。19時台が理想的",
  },
  {
    rank: 3,
    pattern: "昼寝を軽視する",
    why: "日中の睡眠が足りないと夜の睡眠の質も下がる。昼寝と夜の睡眠はセットで考える必要がある",
    fix: "月齢に合った昼寝回数・時間を確保。活動時間（連続起床時間）を意識する",
  },
  {
    rank: 4,
    pattern: "環境が整っていない",
    why: "明るい部屋・騒がしい環境・暑すぎる室温では、どんな方法でもうまくいかない",
    fix: "遮光カーテンで暗くする。室温20〜22℃。ホワイトノイズの活用も効果的",
  },
  {
    rank: 5,
    pattern: "体調不良時に始める・続ける",
    why: "発熱・歯ぐずり・予防接種後などは通常の睡眠パターンが乱れる時期。この時期にネントレを始めても効果が出にくい",
    fix: "体調が回復してから再開する。中断しても、それまでの積み重ねはリセットされない",
  },
];

/* ─── Q&A ─── */
interface QAItem {
  question: string;
  answer: string;
}

const qaItems: QAItem[] = [
  {
    question: "ネントレは赤ちゃんに悪影響がありますか？",
    answer: "複数の長期追跡研究（オーストラリア・2012年、米国小児科学会・2016年）で、ネントレを受けた子どもに情緒面・行動面・親子関係への悪影響は認められていません。ただし、生後4ヶ月未満や体重増加不良のある赤ちゃんには推奨されません。",
  },
  {
    question: "添い乳をやめないとネントレはできませんか？",
    answer: "添い乳が「入眠の条件」になっている場合は、徐々に切り離していく必要があります。いきなりやめるのではなく、授乳→ウトウト→ベッドに置く、という段階を踏むのが現実的です。",
  },
  {
    question: "夜間授乳はいつやめてよいですか？",
    answer: "一般的に、体重が7kg以上あり成長曲線に沿って順調に増えていれば、生後6ヶ月頃から夜間授乳なしで朝まで過ごせる子が多いとされています。ただし、かかりつけ医に相談してから判断してください。",
  },
  {
    question: "上の子がいる場合はどうすればよいですか？",
    answer: "上の子を先に寝かせてからネントレを行うか、パートナーと分担するのが効果的です。泣き声で上の子が起きる場合は、一時的に部屋を分けることも検討してください。ホワイトノイズマシンも有効です。",
  },
  {
    question: "ネントレは何歳まで効果がありますか？",
    answer: "自力入眠のスキルは生涯の財産です。最も効果が出やすいのは生後4〜18ヶ月ですが、2〜3歳でも就寝ルーティンの確立やご褒美シールなどの方法で改善できます。",
  },
];

/* ─── 出典 ─── */
const references = [
  {
    id: 1,
    text: "厚生労働省「健康づくりのための睡眠ガイド2023」",
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/suimin/index.html",
  },
  {
    id: 2,
    text: "日本小児科学会「乳幼児の睡眠と発達に関する提言（2023年）」",
    url: "https://www.jpeds.or.jp/",
  },
  {
    id: 3,
    text: "日本睡眠学会「小児の睡眠障害に関するガイドライン」",
    url: "https://jssr.jp/",
  },
  {
    id: 4,
    text: "こども家庭庁「乳幼児突然死症候群（SIDS）対策 ─ 安全な睡眠環境」",
    url: "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids",
  },
  {
    id: 5,
    text: "Mindell JA, et al. \"Behavioral treatment of bedtime problems and night wakings in infants and young children.\" Sleep. 2006;29(10):1263-76.",
    url: "https://pubmed.ncbi.nlm.nih.gov/17068979/",
  },
  {
    id: 6,
    text: "Price AM, et al. \"Five-year follow-up of harms and benefits of behavioral infant sleep intervention.\" Pediatrics. 2012;130(4):643-51.",
    url: "https://pubmed.ncbi.nlm.nih.gov/22966026/",
  },
];

export default function SleepTrainingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">睡眠</Badge>
              <Badge variant="secondary">0歳の親向け</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">
                保存版
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              ネントレ完全ガイド ─ 赤ちゃんの「自分で眠る力」を育てる
            </h1>
            <ArticleMeta updatedAt="2026-04-06" />
            <p className="text-muted-foreground leading-relaxed">
              夜泣きに悩む日々は、親にとって心身ともに大きな負担です。
              ネントレ（ねんねトレーニング）は、赤ちゃんが自分の力で眠りにつく方法を学ぶためのアプローチです。
              このガイドでは、月齢別の睡眠の目安から具体的な実践方法まで、エビデンスに基づいた情報をまとめました。
            </p>
          </div>

          {/* 知っておくべき数字 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💤</span>
              ネントレとは
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              ネントレとは、赤ちゃんが抱っこや授乳なしで自力で入眠・再入眠できるようにするトレーニングの総称です。
              「泣かせっぱなしにする」というイメージがありますが、実際にはさまざまな方法があり、
              泣かせない穏やかなアプローチも含まれます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {keyPoints.map((stat) => (
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

          {/* 月齢別推奨睡眠時間 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📊</span>
              月齢別の推奨睡眠時間
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              厚生労働省「健康づくりのための睡眠ガイド2023」を基に、月齢ごとの睡眠時間の目安をまとめました。
              個人差が大きいため、あくまで参考値として捉えてください。
            </p>
            <div className="space-y-4">
              {sleepByAge.map((age) => (
                <Card key={age.age} className={`border-l-4 ${age.color} shadow-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{age.emoji}</span>
                      {age.age}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div className="text-muted-foreground">
                        <strong className="text-foreground">合計:</strong> {age.totalHours}
                      </div>
                      <div className="text-muted-foreground">
                        <strong className="text-foreground">夜間:</strong> {age.nightHours}
                      </div>
                      <div className="text-muted-foreground">
                        <strong className="text-foreground">昼寝:</strong> {age.napHours}
                      </div>
                      <div className="text-muted-foreground">
                        <strong className="text-foreground">昼寝回数:</strong> {age.napCount}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground bg-muted/30 rounded p-2">{age.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 夜泣きのピークと原因 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🌙</span>
              夜泣きのピーク（8〜10ヶ月）と3つの原因
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              夜泣きは生後8〜10ヶ月にピークを迎えます。これは赤ちゃんの脳と心が大きく成長している証拠です。
              原因を理解することで、冷静に対処しやすくなります。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {nightCryingCauses.map((item) => (
                <Card key={item.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-5 text-center">
                    <span className="text-3xl" aria-hidden>{item.icon}</span>
                    <p className="font-semibold text-foreground mt-2">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 4つの方法比較 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔍</span>
              ネントレ4つの方法を比較する
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              ネントレにはさまざまな方法があります。どれが「正解」ということはなく、
              赤ちゃんの性格・月齢・家庭の状況に合った方法を選ぶことが大切です。
            </p>
            <div className="space-y-4">
              {trainingMethods.map((method) => (
                <Card key={method.name} className={`border-l-4 ${method.color} shadow-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{method.emoji}</span>
                      {method.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{method.origin}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">{method.approach}</p>
                      <div className="grid grid-cols-2 gap-2 bg-muted/30 rounded p-3">
                        <div className="text-muted-foreground">
                          <strong className="text-foreground">親の負担:</strong> {method.parentBurden}
                        </div>
                        <div className="text-muted-foreground">
                          <strong className="text-foreground">効果の目安:</strong> {method.effectSpeed}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">向いている家庭:</strong> {method.suitableFor}
                      </p>
                      <div className="bg-amber-50 rounded p-2">
                        <p className="text-xs text-amber-700">
                          <strong>注意:</strong> {method.caution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 開始判断チェックリスト */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>✅</span>
              ネントレを始めてよいかチェック
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              以下の項目をすべて満たしていれば、ネントレを始める準備ができています。
              1つでも当てはまらない場合は、時期を待つか小児科医に相談してください。
            </p>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2">
                  {readinessChecklist.map((check) => (
                    <li key={check} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">&#9744;</span>
                      {check}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 7日間実践プラン */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              7日間実践プラン
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              どの方法を選んでも共通する、7日間のステップバイステップガイドです。
              「今日やること」が明確なので、迷わず進められます。
            </p>
            <div className="space-y-4">
              {sevenDayPlan.map((day) => (
                <Card key={day.day} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
                        {day.day.replace("日目", "")}
                      </span>
                      {day.day} ─ {day.theme}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="text-muted-foreground">
                          <strong className="text-foreground">朝:</strong> {day.morning}
                        </div>
                        <div className="text-muted-foreground">
                          <strong className="text-foreground">昼:</strong> {day.afternoon}
                        </div>
                        <div className="text-muted-foreground">
                          <strong className="text-foreground">夕:</strong> {day.evening}
                        </div>
                        <div className="text-muted-foreground">
                          <strong className="text-foreground">夜:</strong> {day.night}
                        </div>
                      </div>
                      <div className="bg-komorebi-light/30 rounded p-2">
                        <p className="text-xs text-foreground">
                          <strong>ポイント:</strong> {day.tip}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 失敗パターン5選 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>⚠️</span>
              よくある失敗パターン5選
            </h2>
            <div className="space-y-3">
              {failurePatterns.map((item) => (
                <Card key={item.rank} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0">
                        {item.rank}
                      </span>
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold text-foreground">{item.pattern}</p>
                        <p className="text-muted-foreground">{item.why}</p>
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-xs font-medium text-foreground">対策: </span>
                          <span className="text-xs text-muted-foreground">{item.fix}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Q&A */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>❓</span>
              よくある質問
            </h2>
            <div className="space-y-3">
              {qaItems.map((qa, i) => (
                <Card key={i} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <p className="font-semibold text-foreground text-sm mb-2">{qa.question}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{qa.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
              ネントレの開始にあたっては、お子さんの月齢・体重・健康状態を考慮し、
              必要に応じてかかりつけの小児科医にご相談ください。
              赤ちゃんの発達には個人差があり、すべての方法がすべてのお子さんに適するわけではありません。
            </p>
          </div>

          {/* PDF ダウンロード */}
          <div className="mt-8">
            <PdfDownloadSection
              title="7日間チャレンジシート"
              catchcopy="1日ずつ、ねんねの力を育てる"
              description="7日間の記録欄・就寝ルーティンチェックリスト・月齢別睡眠時間の目安をA4一枚にまとめました。印刷して冷蔵庫に貼れます。"
              pdfPath="/pdf/sleep-training-7day-sheet.pdf"
              usageTips={[
                { icon: "print", text: "印刷して毎日記録をつける" },
                { icon: "share", text: "パートナーと共有して交代制に" },
                { icon: "other", text: "就寝ルーティン表付き" },
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
              href="/learn/baby-safety-guide"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              赤ちゃんの安全ガイド
            </Link>
            <Link
              href="/learn/mental-care"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              産後のメンタルケア
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
