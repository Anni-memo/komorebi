// 妊娠・産後の節目エールメッセージ
// 出典: こもれび伴走通知 — 認知負荷軽減と安心感の提供

export interface MilestoneMessage {
  key: string;
  title: string;
  body: string;
  actionUrl?: string;
  category: string;
}

// ─── 妊娠期（週数ベース） ───

export interface PregnancyMilestone extends MilestoneMessage {
  weekStart: number;
}

export const pregnancyMilestones: PregnancyMilestone[] = [
  {
    key: "pregnancy_week_12",
    weekStart: 12,
    title: "安定期が近づいてきました",
    body: "妊娠12週。ここまで本当にお疲れさまです。つわりが楽になってくる方も多い時期。無理せず、ご自分のペースで過ごしてくださいね。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "pregnancy_week_16",
    weekStart: 16,
    title: "安定期に入りました",
    body: "妊娠16週、安定期ですね。少しほっとできる時期です。胎動を感じ始める方もいらっしゃいます。赤ちゃんは元気に成長しています。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "pregnancy_week_20",
    weekStart: 20,
    title: "折り返し地点です",
    body: "妊娠20週、ちょうど半分まで来ました。ここまでよく頑張りましたね。お腹も少しずつ目立ち始める頃。周りの方にも頼りながら過ごしてください。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "pregnancy_week_28",
    weekStart: 28,
    title: "妊娠後期に入りました",
    body: "妊娠28週、後期に入りました。赤ちゃんの胎動もしっかり感じられる頃ですね。体を大切に、ゆったり過ごしてください。",
    actionUrl: "/prepare",
    category: "エール",
  },
  {
    key: "pregnancy_week_32",
    weekStart: 32,
    title: "あと2ヶ月ほどです",
    body: "妊娠32週。出産まであと約2ヶ月。入院の準備も少しずつ進めていきましょう。焦らなくて大丈夫、一つずつで十分です。",
    actionUrl: "/prepare",
    category: "エール",
  },
  {
    key: "pregnancy_week_36",
    weekStart: 36,
    title: "36週まで来ました",
    body: "妊娠36週。ここまで本当によく頑張りました。赤ちゃんに会える日が近づいています。不安なことは遠慮なく医師や助産師さんに相談してくださいね。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "pregnancy_week_37",
    weekStart: 37,
    title: "正期産に入りました",
    body: "妊娠37週、正期産です。いつ赤ちゃんに会えてもいい時期になりました。リラックスして、体力を温存しておきましょう。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "pregnancy_week_40",
    weekStart: 40,
    title: "予定日ですね",
    body: "妊娠40週、予定日を迎えました。赤ちゃんには赤ちゃんのタイミングがあります。医療チームが見守っていますので、安心して過ごしてください。",
    actionUrl: "/home",
    category: "エール",
  },
];

// ─── 産後（月齢ベース） ───

export interface PostnatalMilestone extends MilestoneMessage {
  monthTarget: number;
}

export const postnatalMilestones: PostnatalMilestone[] = [
  {
    key: "postnatal_day_0",
    monthTarget: 0,
    title: "ご出産おめでとうございます",
    body: "赤ちゃんの誕生、おめでとうございます。これから始まる日々を、こもれびが一緒に見守ります。まずはお体の回復を最優先に。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "postnatal_month_1",
    monthTarget: 1,
    title: "生後1ヶ月、お疲れさまです",
    body: "生後1ヶ月を迎えました。初めてだらけの毎日、ここまで乗り越えた自分を褒めてあげてください。つらいときは周りに頼って大丈夫です。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "postnatal_month_3",
    monthTarget: 3,
    title: "生後3ヶ月ですね",
    body: "生後3ヶ月。少しずつ生活リズムが見えてくる頃。赤ちゃんの笑顔が増えてきていませんか？あなたの頑張りに赤ちゃんが応えています。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "postnatal_month_6",
    monthTarget: 6,
    title: "半年間、頑張りました",
    body: "生後6ヶ月、半年を迎えました。離乳食が始まる時期ですね。量を食べなくても大丈夫。口に入れる経験そのものが大切です。",
    actionUrl: "/home",
    category: "エール",
  },
  {
    key: "postnatal_month_12",
    monthTarget: 12,
    title: "1歳のお誕生日おめでとうございます",
    body: "1歳のお誕生日、おめでとうございます。この1年、本当に頑張りました。赤ちゃんの成長はあなたの愛情の証です。",
    actionUrl: "/home",
    category: "エール",
  },
];

// ─── ヘルパー ───

/**
 * 出産予定日から現在の妊娠週数を計算（整数）
 * stage-messages.ts の calcWeeksFromDueDate と同じロジック
 */
export function getPregnancyWeek(dueDateStr: string, today: Date = new Date()): number {
  const [y, m, d] = dueDateStr.split("-").map(Number);
  const dueDate = new Date(y, m - 1, d);
  dueDate.setHours(0, 0, 0, 0);
  // 最終月経日 = 予定日 - 280日
  const lmp = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000);
  const now = new Date(today);
  now.setHours(0, 0, 0, 0);
  const diffDays = Math.round((now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7);
}

/**
 * 生年月日から月齢を計算（整数）
 */
export function getChildMonths(birthdateStr: string, today: Date = new Date()): number {
  const birth = new Date(birthdateStr);
  const months =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth());
  const dayDiff = today.getDate() - birth.getDate();
  return dayDiff < 0 ? months - 1 : months;
}

/**
 * 妊娠週数に該当する節目を返す（週の初日のみマッチ）
 */
export function findPregnancyMilestone(week: number): PregnancyMilestone | null {
  return pregnancyMilestones.find((m) => m.weekStart === week) ?? null;
}

/**
 * 月齢に該当する節目を返す
 */
export function findPostnatalMilestone(month: number): PostnatalMilestone | null {
  return postnatalMilestones.find((m) => m.monthTarget === month) ?? null;
}
