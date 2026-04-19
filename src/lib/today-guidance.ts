// 今日のAIカード用ガイダンス（ルールベース Phase 1）
// Phase 2 で Claude API による動的生成に差し替え予定。
// 出典: stage-messages.ts と同じ公的情報源。

export type StatusLevel = "green" | "yellow" | "red";

export interface TodayTodo {
  label: string;
  href?: string;
}

export interface TodayGuidance {
  statusLevel: StatusLevel;
  statusText: string;
  caution: string;
  todos: TodayTodo[];
}

interface PregnancyRule {
  weekMin: number;
  weekMax: number;
  guidance: TodayGuidance;
}

interface PostnatalRule {
  monthMin: number;
  monthMax: number;
  guidance: TodayGuidance;
}

const pregnancyRules: PregnancyRule[] = [
  {
    weekMin: 4,
    weekMax: 11,
    guidance: {
      statusLevel: "yellow",
      statusText: "つわりが出やすい時期です",
      caution: "水分が取れない・急な出血・強い腹痛があれば受診を",
      todos: [
        { label: "葉酸サプリを確認", href: "/learn/pregnancy-nutrition" },
        { label: "母子手帳の交付手続き", href: "/benefits" },
        { label: "食べられるものを少量ずつ" },
      ],
    },
  },
  {
    weekMin: 12,
    weekMax: 27,
    guidance: {
      statusLevel: "green",
      statusText: "体調が安定しやすい時期です",
      caution: "出血・強い腹痛・胎動の急な減少は要受診",
      todos: [
        { label: "妊娠中の栄養ガイドを見る", href: "/learn/pregnancy-nutrition" },
        { label: "今月のおすすめ料理", href: "/learn/pregnancy-recipes" },
        { label: "使える制度を確認", href: "/benefits" },
      ],
    },
  },
  {
    weekMin: 28,
    weekMax: 35,
    guidance: {
      statusLevel: "yellow",
      statusText: "お腹の張りが増えやすい時期です",
      caution: "胎動が少ない・張りが頻繁なときは病院へ連絡",
      todos: [
        { label: "胎動カウンターで様子見", href: "/learn/contraction-counter" },
        { label: "入院準備チェック", href: "/prepare" },
        { label: "休息をいつもより多く" },
      ],
    },
  },
  {
    weekMin: 36,
    weekMax: 41,
    guidance: {
      statusLevel: "red",
      statusText: "臨月・いつ陣痛が来てもおかしくない時期です",
      caution: "陣痛が10分間隔になったら病院へ連絡",
      todos: [
        { label: "陣痛カウンター", href: "/learn/contraction-counter" },
        { label: "入院バッグ最終確認", href: "/prepare" },
        { label: "出産後の手続き一覧を把握", href: "/learn/postnatal-procedures" },
      ],
    },
  },
];

const postnatalRules: PostnatalRule[] = [
  {
    monthMin: 0,
    monthMax: 0,
    guidance: {
      statusLevel: "red",
      statusText: "出産おつかれさまでした。期限ありの手続きが集中します",
      caution: "出生届は14日以内、児童手当は申請の翌月分から支給",
      todos: [
        { label: "出生届・児童手当を確認", href: "/benefits" },
        { label: "産後の手続き一覧", href: "/learn/postnatal-procedures" },
        { label: "今日はできるだけ休む" },
      ],
    },
  },
  {
    monthMin: 1,
    monthMax: 2,
    guidance: {
      statusLevel: "yellow",
      statusText: "1ヶ月健診と予防接種の準備時期です",
      caution: "発熱・授乳できない・元気がないときは小児科へ",
      todos: [
        { label: "予防接種スケジュール", href: "/learn/vaccination-schedule" },
        { label: "1ヶ月健診の持ち物", href: "/prepare" },
        { label: "使える制度を確認", href: "/benefits" },
      ],
    },
  },
  {
    monthMin: 3,
    monthMax: 5,
    guidance: {
      statusLevel: "green",
      statusText: "生活リズムが少し整ってくる時期です",
      caution: "体重増加がゆるやか・母乳量の不安は健診で相談",
      todos: [
        { label: "予防接種の進捗確認", href: "/learn/vaccination-schedule" },
        { label: "離乳食の準備を知る", href: "/learn" },
        { label: "家族の分担を話し合う" },
      ],
    },
  },
  {
    monthMin: 6,
    monthMax: 11,
    guidance: {
      statusLevel: "green",
      statusText: "離乳食がはじまる時期です",
      caution: "窒息・アレルギー症状が出たらすぐ受診",
      todos: [
        { label: "離乳食の進め方", href: "/learn" },
        { label: "予防接種の進捗確認", href: "/learn/vaccination-schedule" },
        { label: "保活の情報収集", href: "/learn/hokatsu" },
      ],
    },
  },
  {
    monthMin: 12,
    monthMax: 23,
    guidance: {
      statusLevel: "green",
      statusText: "歩きはじめ・ことばが増える時期です",
      caution: "転倒・誤飲・やけどの予防を最優先で",
      todos: [
        { label: "保活の流れを確認", href: "/learn/hokatsu" },
        { label: "1歳半健診の準備" },
        { label: "使える制度を確認", href: "/benefits" },
      ],
    },
  },
  {
    monthMin: 24,
    monthMax: 999,
    guidance: {
      statusLevel: "green",
      statusText: "できることが増える時期です",
      caution: "発達の心配は3歳児健診でも相談できます",
      todos: [
        { label: "3歳児健診の準備" },
        { label: "使える制度を確認", href: "/benefits" },
        { label: "家族イベントを計画" },
      ],
    },
  },
];

const defaultGuidance: TodayGuidance = {
  statusLevel: "green",
  statusText: "今日もおつかれさまです",
  caution: "気になることがあれば「相談する」から質問できます",
  todos: [
    { label: "使える制度を確認", href: "/benefits" },
    { label: "記事を読む", href: "/learn" },
    { label: "相談する", href: "/qa" },
  ],
};

function calcPregnancyWeeksFromDue(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const daysDiff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return 40 - Math.floor(daysDiff / 7);
}

function calcMonthsFromBirth(birthdate: string): number {
  const birth = new Date(birthdate);
  const now = new Date();
  return (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
}

export interface TodayGuidanceInput {
  stage: string | null;
  expected_due_date: string | null;
  child_birthdate: string | null;
}

export function getTodayGuidance(profile: TodayGuidanceInput): TodayGuidance {
  if (profile.stage === "pregnant" && profile.expected_due_date) {
    const weeks = calcPregnancyWeeksFromDue(profile.expected_due_date);
    const rule = pregnancyRules.find((r) => weeks >= r.weekMin && weeks <= r.weekMax);
    if (rule) return rule.guidance;
  }

  if (
    (profile.stage === "newborn" || profile.stage === "0" || profile.stage === "1" || profile.stage === "2" || profile.stage === "3+") &&
    profile.child_birthdate
  ) {
    const months = calcMonthsFromBirth(profile.child_birthdate);
    const rule = postnatalRules.find((r) => months >= r.monthMin && months <= r.monthMax);
    if (rule) return rule.guidance;
  }

  return defaultGuidance;
}
