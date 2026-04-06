"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PdfDownloadSection } from "@/components/pdf-download-section";
import { ArticleMeta } from "@/components/article-meta";

/* ─── 数字で知る食物アレルギー ─── */
const keyStats = [
  { value: "約10%", label: "乳児の食物アレルギー有病率", sub: "10人に1人が何らかの食物アレルギーを持つ" },
  { value: "鶏卵 62%", label: "0歳児の原因食物第1位", sub: "次いで牛乳（20%）、小麦（7%）" },
  { value: "約9割", label: "乳児期発症の鶏卵アレルギー寛解率", sub: "多くは成長とともに食べられるようになる" },
];

/* ─── 早期導入エビデンス ─── */
interface ResearchEvidence {
  study: string;
  year: string;
  journal: string;
  emoji: string;
  finding: string;
  detail: string;
}

const researchEvidence: ResearchEvidence[] = [
  {
    study: "LEAP研究",
    year: "2015年",
    journal: "New England Journal of Medicine",
    emoji: "🥜",
    finding: "ピーナッツの早期導入で、アレルギー発症リスクが約80%低下",
    detail:
      "ピーナッツアレルギーのハイリスク乳児640人を対象に、生後4〜11ヶ月からピーナッツを摂取させたグループと、5歳まで完全回避したグループを比較。早期導入群ではアレルギー発症率が3.2%にとどまり、回避群の17.2%と比べ約80%のリスク低下が確認された。",
  },
  {
    study: "PETIT研究",
    year: "2017年",
    journal: "日本・国立成育医療研究センター",
    emoji: "🥚",
    finding: "加熱鶏卵の早期少量導入で、卵アレルギー発症を約80%予防",
    detail:
      "アトピー性皮膚炎のある乳児147人を対象に、生後6ヶ月から加熱卵粉末を少量ずつ導入したグループと、1歳まで完全除去したグループを比較。早期導入群の卵アレルギー発症率は8%で、除去群の38%と比べ約80%の予防効果が示された。スキンケアによる皮膚バリアの維持も重要な要素。",
  },
  {
    study: "EAT研究",
    year: "2016年",
    journal: "New England Journal of Medicine",
    emoji: "🍽️",
    finding: "6種アレルゲンの早期導入で食物アレルギー全体の発症率が低下",
    detail:
      "イギリスで1,303人の母乳栄養児を対象に、生後3ヶ月から6種のアレルゲン食品（ピーナッツ・鶏卵・牛乳・ゴマ・白身魚・小麦）を導入。プロトコル遵守群では食物アレルギー発症率が2.4%と、対照群の7.3%から有意に低下した。",
  },
];

/* ─── 月齢別アレルゲン導入カレンダー ─── */
interface AllergenTimeline {
  age: string;
  emoji: string;
  color: string;
  foods: { name: string; howTo: string }[];
}

const allergenTimeline: AllergenTimeline[] = [
  {
    age: "5〜6ヶ月（離乳食初期）",
    emoji: "👶",
    color: "border-l-emerald-400",
    foods: [
      { name: "お粥（米）", howTo: "10倍粥から開始。米アレルギーはまれだが基本の確認として" },
      { name: "加熱卵黄", howTo: "固ゆで卵の卵黄を耳かき1杯分から。2〜3日おきに増量" },
    ],
  },
  {
    age: "7〜8ヶ月（離乳食中期）",
    emoji: "🍼",
    color: "border-l-sky-400",
    foods: [
      { name: "加熱全卵", howTo: "卵黄に慣れたら、固ゆで全卵を耳かき1杯分から開始" },
      { name: "小麦", howTo: "うどんを小さじ1から。やわらかく煮て細かく切る" },
      { name: "乳製品", howTo: "ヨーグルトを小さじ1から。加熱した牛乳も可" },
    ],
  },
  {
    age: "9〜11ヶ月（離乳食後期）",
    emoji: "🧒",
    color: "border-l-amber-400",
    foods: [
      { name: "大豆", howTo: "絹ごし豆腐を小さじ1から。加熱して潰す" },
      { name: "ピーナッツ", howTo: "ピーナッツバター（無糖・無塩）を少量、お粥に混ぜて。粒のままは窒息リスクのため絶対不可" },
      { name: "白身魚→赤身魚", howTo: "たい・ひらめから開始し、鮭・まぐろへ段階的に" },
      { name: "ゴマ", howTo: "すりゴマを少量、おかずに混ぜて" },
    ],
  },
  {
    age: "1歳〜（離乳食完了期以降）",
    emoji: "🧒",
    color: "border-l-rose-400",
    foods: [
      { name: "甲殻類（エビ・カニ）", howTo: "加熱した小えびを少量から。1歳以降が目安" },
      { name: "そば", howTo: "少量のそば湯から開始。アレルギー反応が強く出やすいため慎重に" },
      { name: "ナッツ類", howTo: "くるみ・カシューナッツなど。ペースト状にして少量ずつ" },
    ],
  },
];

/* ─── 安全な試し方5原則 ─── */
const safetyPrinciples = [
  {
    number: 1,
    title: "初めての食材は平日の午前中に",
    detail: "万が一のアレルギー反応に備え、かかりつけ医が診療している時間帯に試す。土日・祝日・夜間は避ける。",
    icon: "🕐",
  },
  {
    number: 2,
    title: "1回に1種類、少量から",
    detail: "耳かき1杯〜小さじ1程度から始め、2〜3日かけて増量する。複数の新しい食材を同時に試さない。",
    icon: "☝️",
  },
  {
    number: 3,
    title: "よく加熱する",
    detail: "卵・牛乳・小麦などのタンパク質は加熱によりアレルゲン性が低下する。特に卵は固ゆで20分が基本。",
    icon: "🔥",
  },
  {
    number: 4,
    title: "食後2時間は注意深く観察",
    detail: "即時型アレルギー反応の多くは摂取後30分〜2時間以内に出現する。皮膚・呼吸・消化器症状に注目。",
    icon: "👀",
  },
  {
    number: 5,
    title: "肌の状態を整えてから",
    detail: "湿疹のある肌から食物抗原が侵入しアレルギーが成立する（経皮感作）。保湿・スキンケアでバリア機能を維持する。",
    icon: "🧴",
  },
];

/* ─── 症状3段階フローチャート ─── */
interface SymptomLevel {
  level: string;
  severity: string;
  emoji: string;
  color: string;
  symptoms: string[];
  action: string;
}

const symptomLevels: SymptomLevel[] = [
  {
    level: "軽度",
    severity: "グレード1",
    emoji: "🟡",
    color: "bg-yellow-50 border-yellow-200",
    symptoms: [
      "皮膚の一部に蕁麻疹・赤み・かゆみ",
      "口の周りが赤くなる",
      "くしゃみ・鼻水が出る",
    ],
    action: "症状が出た食材と量を記録し、かかりつけ医に相談。抗ヒスタミン薬の内服（処方がある場合）。自宅で30分〜1時間経過観察。",
  },
  {
    level: "中等度",
    severity: "グレード2",
    emoji: "🟠",
    color: "bg-orange-50 border-orange-200",
    symptoms: [
      "全身に蕁麻疹が広がる",
      "顔や唇が腫れる（血管性浮腫）",
      "繰り返す嘔吐・腹痛",
      "咳が続く・ゼーゼーする",
    ],
    action: "すぐに医療機関を受診する。#7119（救急安心センター）に電話して指示を仰ぐ。症状が急速に悪化する場合は119番。",
  },
  {
    level: "重度（アナフィラキシー）",
    severity: "グレード3",
    emoji: "🔴",
    color: "bg-red-50 border-red-200",
    symptoms: [
      "呼吸困難・喘鳴（ヒューヒュー・ゼーゼー）",
      "声がかすれる・出にくい",
      "ぐったりする・意識がもうろう",
      "血圧低下・顔面蒼白",
      "2つ以上の臓器に症状が出ている",
    ],
    action: "ただちに119番で救急車を呼ぶ。エピペン/ネフィーが処方されていれば迷わず使用する。仰向けに寝かせ足を高くする。嘔吐がある場合は横向きに。",
  },
];

/* ─── エピペン・ネフィー ─── */
interface EmergencyMed {
  name: string;
  emoji: string;
  points: string[];
}

const emergencyMeds: EmergencyMed[] = [
  {
    name: "エピペン（アドレナリン自己注射薬）",
    emoji: "💉",
    points: [
      "体重15kg以上で処方可能（0.15mg製剤と0.3mg製剤の2種類）",
      "太ももの外側に衣服の上から注射。安全キャップを外して押し付けるだけ",
      "使用後は必ず119番で救急搬送。効果は10〜15分程度で切れることがある",
      "保管温度は15〜30℃。直射日光を避け、冷蔵庫には入れない",
      "使用期限（約1年）を定期的に確認し、期限切れ前に処方を更新する",
    ],
  },
  {
    name: "ネフィー（エピネフリン点鼻薬・2025年承認）",
    emoji: "👃",
    points: [
      "注射不要で鼻腔に噴霧するタイプのアドレナリン製剤",
      "体重15kg以上の小児から使用可能",
      "注射への恐怖がある保護者・教職員にとって使いやすい選択肢",
      "片方の鼻腔に1回噴霧。効果発現は注射と同等とされる",
      "エピペンと同様、使用後は必ず救急搬送が必要",
    ],
  },
];

/* ─── よくある質問 ─── */
interface QAItem {
  q: string;
  a: string;
}

const qaItems: QAItem[] = [
  {
    q: "アレルギーが心配で離乳食を遅らせたほうがいいですか？",
    a: "いいえ。現在のエビデンスでは、離乳食の開始を遅らせることにアレルギー予防効果はなく、むしろ早期導入が予防につながることが示されています。生後5〜6ヶ月を目安に、適切な手順で開始しましょう。",
  },
  {
    q: "両親にアレルギーがある場合、子どもの検査を先にすべきですか？",
    a: "家族歴だけを理由に血液検査（特異的IgE）を行い、陽性だからと除去することは推奨されていません。検査陽性でも実際に食べて症状が出ない（耐性がある）ケースは多いです。まずはかかりつけ医に相談し、必要に応じて少量から試すことが大切です。",
  },
  {
    q: "保育園に食物アレルギーの対応を依頼するには？",
    a: "「保育所におけるアレルギー対応ガイドライン（2019年改訂版）」に基づき、主治医の「生活管理指導表」を提出します。完全除去を基本とし、自宅で安全に食べられることを確認してから保育園での提供を依頼するのが原則です。",
  },
  {
    q: "アレルギーは一生治らないのですか？",
    a: "食物アレルギーは年齢とともに寛解（耐性獲得）することが多いです。鶏卵・牛乳・小麦は3歳までに約50%、小学校入学までに約70〜80%が食べられるようになります。一方、ピーナッツ・ナッツ類・甲殻類は寛解しにくい傾向があります。定期的な医師の評価のもと、経口負荷試験で確認します。",
  },
  {
    q: "口の周りだけ赤くなるのは食物アレルギーですか？",
    a: "口の周りの赤みだけでは食物アレルギーとは限りません。食べ物の酸や塩分による接触性の刺激で赤くなることも多いです（接触性皮膚炎）。ワセリンを口の周りに塗ってから食事をし、それでも蕁麻疹が出る場合や全身症状が伴う場合はアレルギーの可能性があるため受診しましょう。",
  },
];

/* ─── 出典 ─── */
const references = [
  {
    id: 1,
    text: "厚生労働省「食物アレルギーの栄養食事指導の手引き2022」",
    url: "https://www.mhlw.go.jp/content/000846568.pdf",
  },
  {
    id: 2,
    text: "国立成育医療研究センター「鶏卵アレルギー発症予防に関する提言」",
    url: "https://www.ncchd.go.jp/hospital/about/section/allergy/allergy_egg.html",
  },
  {
    id: 3,
    text: "日本小児アレルギー学会「食物アレルギー診療ガイドライン2021」",
    url: "https://www.jspaci.jp/guide2021/",
  },
  {
    id: 4,
    text: "日本アレルギー学会「アナフィラキシーガイドライン2022」",
    url: "https://www.jsaweb.jp/modules/guideline/index.php?content_id=3",
  },
  {
    id: 5,
    text: "Du Toit G, et al. Randomized trial of peanut consumption in infants at risk for peanut allergy (LEAP). N Engl J Med. 2015;372:803-813.",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1414850",
  },
  {
    id: 6,
    text: "Natsume O, et al. Two-step egg introduction for prevention of egg allergy in high-risk infants (PETIT). Lancet. 2017;389:276-286.",
    url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)31418-0/fulltext",
  },
  {
    id: 7,
    text: "消費者庁「食物アレルギー表示に関する情報」",
    url: "https://www.caa.go.jp/policies/policy/food_labeling/food_sanitation/allergy/",
  },
];

export default function FoodAllergyGuidePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">食事</Badge>
              <Badge variant="secondary">0歳の親向け</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">
                保存版
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              食物アレルギーガイド ── 安全な食材導入と緊急対応
            </h1>
            <ArticleMeta updatedAt="2026-04-06" />
            <p className="text-muted-foreground leading-relaxed">
              食物アレルギーは乳児の約10人に1人が経験しますが、
              正しい知識と適切な進め方で、多くのリスクを減らすことができます。
              最新のエビデンスに基づいた「いつ・何を・どうやって」導入するかの具体的な手順と、
              万が一の症状が出たときの対応をまとめました。
            </p>
          </div>

          {/* 数字で知る食物アレルギー */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📊</span>
              数字で知る食物アレルギー
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

          {/* 早期導入エビデンス */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🔬</span>
              早期導入エビデンス ── 研究が示す「食べて予防」
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              かつては「アレルギーの原因食物を避ける」のが常識でしたが、
              近年の大規模研究により、早い時期から少量ずつ食べさせることで
              アレルギー発症を予防できることが明らかになっています。
            </p>
            <div className="space-y-4">
              {researchEvidence.map((research) => (
                <Card key={research.study} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{research.emoji}</span>
                      {research.study}（{research.year}）
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{research.journal}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold text-primary mb-2">{research.finding}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{research.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mt-4">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">ポイント: </strong>
                  早期導入の前提として、湿疹（アトピー性皮膚炎）のコントロールが重要です。
                  肌のバリアが壊れた状態では皮膚から食物抗原が侵入し、
                  アレルギーが成立しやすくなります（経皮感作）。
                  まずはスキンケアで肌を整えてから、食材導入を進めましょう。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 月齢別アレルゲン導入カレンダー */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📅</span>
              月齢別アレルゲン導入カレンダー
            </h2>
            <div className="space-y-4">
              {allergenTimeline.map((period) => (
                <Card key={period.age} className={`border-l-4 ${period.color} shadow-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{period.emoji}</span>
                      {period.age}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {period.foods.map((food) => (
                        <div key={food.name} className="flex items-start gap-3 text-sm">
                          <Badge variant="outline" className="shrink-0 mt-0.5 min-w-[80px] justify-center">
                            {food.name}
                          </Badge>
                          <p className="text-muted-foreground leading-relaxed">{food.howTo}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 安全な試し方5原則 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>✅</span>
              安全な試し方5原則
            </h2>
            <div className="space-y-3">
              {safetyPrinciples.map((principle) => (
                <Card key={principle.number} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-lg shrink-0" aria-hidden>
                        {principle.icon}
                      </span>
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold text-foreground">
                          {principle.number}. {principle.title}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">{principle.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 症状3段階フローチャート */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🚦</span>
              症状3段階フローチャート
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              食物アレルギーの症状は、軽度の皮膚症状からアナフィラキシーまで幅広く出現します。
              症状の重さに応じた対応を覚えておきましょう。
            </p>
            <div className="space-y-4">
              {symptomLevels.map((level) => (
                <Card key={level.level} className={`${level.color} shadow-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{level.emoji}</span>
                      {level.level}（{level.severity}）
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-3">
                      {level.symptoms.map((symptom, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-foreground shrink-0">・</span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white/60 rounded p-3">
                      <p className="text-xs font-medium text-foreground">
                        対応: {level.action}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-primary/30 bg-primary/5 shadow-none mt-4">
              <CardContent className="pt-5">
                <h3 className="font-semibold text-foreground mb-2">
                  緊急連絡先
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">119</strong> — 救急車（アナフィラキシー時）
                  </div>
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">#7119</strong> — 救急安心センター（迷ったら）
                  </div>
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">#8000</strong> — 子ども医療電話相談
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* エピペン・ネフィー */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>💉</span>
              エピペン・ネフィー ── 緊急時の薬を知っておく
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              アナフィラキシー時に使用するアドレナリン製剤です。
              処方されている場合は、保護者・保育士・教職員が使い方を事前に練習しておくことが重要です。
              「迷ったら打つ」が原則です。
            </p>
            <div className="space-y-4">
              {emergencyMeds.map((med) => (
                <Card key={med.name} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{med.emoji}</span>
                      {med.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {med.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* よくある質問 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>❓</span>
              よくある質問
            </h2>
            <div className="space-y-3">
              {qaItems.map((item, i) => (
                <Card key={i} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Q. {item.q}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A. {item.a}
                    </p>
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
              食物アレルギーの診断・治療は必ず医師の指導のもとで行ってください。
              アナフィラキシーが疑われる場合はただちに119番に電話してください。
              個々のお子さんの状態に応じた判断はかかりつけ医にご相談ください。
            </p>
          </div>

          {/* PDF ダウンロード */}
          <div className="mt-8">
            <PdfDownloadSection
              title="アレルゲン導入チェックシート"
              catchcopy="ひとつずつ、安心を積み重ねる"
              description="月齢別に導入する食材・量・日付を記録できるチェックシートです。かかりつけ医への相談時にも活用できます。"
              pdfPath="/pdf/allergen-introduction-checklist.pdf"
              usageTips={[
                { icon: "print", text: "印刷して冷蔵庫に貼る" },
                { icon: "share", text: "かかりつけ医に持参して相談" },
                { icon: "other", text: "保育園への提出資料としても活用" },
              ]}
            />
          </div>

          {/* 導線リンク */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/learn/baby-food"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              離乳食の進め方ガイド
            </Link>
            <Link
              href="/learn/baby-safety-guide"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              赤ちゃんの事故を防ぐ
            </Link>
            <Link
              href="/learn/vaccination-schedule"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              予防接種スケジュール
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
