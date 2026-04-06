// ステージ別メッセージデータ
// 出典: 厚生労働省「妊産婦のための食生活指針」「授乳・離乳の支援ガイド」、
//       母子健康手帳、日本産科婦人科学会ガイドライン、日本小児科学会提言

export interface StageMessage {
  babyStatus: string;
  momAdvice: string;
  encouragement: string;
}

// ─── 妊娠期（週数の範囲でマッチ） ───

export interface PregnancyStageEntry {
  weekMin: number;
  weekMax: number;
  label: string;
  message: StageMessage;
}

export const pregnancyMessages: PregnancyStageEntry[] = [
  {
    weekMin: 4,
    weekMax: 7,
    label: "妊娠2ヶ月",
    message: {
      babyStatus:
        "心臓が拍動を開始し、脳・脊髄の原型が形成される時期です。",
      momAdvice:
        "葉酸を1日400μg以上摂取しましょう。飲酒・喫煙は中止を。",
      encouragement:
        "つわりで食べられなくても、赤ちゃんは卵黄嚢から栄養をもらっているので大丈夫。食べられるものを食べられるときに。",
    },
  },
  {
    weekMin: 8,
    weekMax: 11,
    label: "妊娠3ヶ月",
    message: {
      babyStatus:
        "手足の指が分かれ、顔の輪郭が形成されています。超音波で心拍がはっきり確認できます。",
      momAdvice:
        "つわりのピーク期。脱水に注意し水分をこまめに。水分も摂れない場合は受診を。母子手帳の交付手続きも忘れずに。",
      encouragement:
        "一番つらい時期ですが、多くの方は12〜16週頃に楽になります。今は無理をしないことが一番大切です。",
    },
  },
  {
    weekMin: 12,
    weekMax: 15,
    label: "妊娠4ヶ月",
    message: {
      babyStatus:
        "胎盤が完成に近づき、臍帯を通じた栄養供給が本格化しています。",
      momAdvice:
        "つわりが軽減し始める人が多い時期。安定期に向かいますが、無理は禁物です。妊婦健診は4週に1回。",
      encouragement:
        "少しずつ体が楽になってくる時期。食欲が戻ったらバランスの良い食事を意識しましょう。",
    },
  },
  {
    weekMin: 16,
    weekMax: 19,
    label: "妊娠5ヶ月",
    message: {
      babyStatus:
        "全身に産毛が生え、骨格が発達中。早い人は胎動を感じ始めます。",
      momAdvice:
        "安定期に入りました。鉄分の需要が急増するため、レバー・小松菜・赤身肉を意識的に。体重管理も開始しましょう。",
      encouragement:
        "初めての胎動は「泡がはじけるような」感覚。まだ感じなくても、赤ちゃんは確実に大きくなっています。",
    },
  },
  {
    weekMin: 20,
    weekMax: 23,
    label: "妊娠6ヶ月",
    message: {
      babyStatus:
        "聴覚が発達し始め、外の音に反応します。まぶたが開閉できるようになっています。",
      momAdvice:
        "お腹が目立ち始め、腰痛や便秘が出やすい時期。妊娠線予防の保湿ケアを始めましょう。むくみ・頭痛・急激な体重増加に注意。",
      encouragement:
        "赤ちゃんはママの声を聞いています。話しかけたり音楽を聴かせたり、親子のコミュニケーションを楽しんで。",
    },
  },
  {
    weekMin: 24,
    weekMax: 27,
    label: "妊娠7ヶ月",
    message: {
      babyStatus:
        "目を開けて光を感じ、味覚も発達。脳の溝が形成され始めています。",
      momAdvice:
        "妊婦健診が2週に1回に。妊娠糖尿病のスクリーニングの時期。足のむくみ・こむら返りにはカルシウムとマグネシウムを。",
      encouragement:
        "胎動がはっきりわかるようになり、パパも外から感じられます。家族で赤ちゃんの存在を実感できる幸せな時期。",
    },
  },
  {
    weekMin: 28,
    weekMax: 31,
    label: "妊娠8ヶ月",
    message: {
      babyStatus:
        "皮下脂肪が増え、体温調節機能が発達し始めています。脳が急速に発達し、睡眠サイクルも出現。",
      momAdvice:
        "子宮の圧迫で一度に多く食べられなくなります。分割食を心がけて。規則的なお腹の張りや出血があれば即受診を。産休・入院準備を始めましょう。",
      encouragement:
        "息苦しさや胃もたれがつらい時期ですが、赤ちゃんが順調に大きくなっている証拠。出産準備を少しずつ進めると心の準備にもなります。",
    },
  },
  {
    weekMin: 32,
    weekMax: 35,
    label: "妊娠9ヶ月",
    message: {
      babyStatus:
        "肺の成熟が進み、頭位（頭が下）に落ち着く赤ちゃんが多い時期。爪が指先まで伸びています。",
      momAdvice:
        "36週以降は健診が週1回に。バースプランを医療者と相談しましょう。里帰り出産の方は34週頃までに移動を。",
      encouragement:
        "いよいよゴールが見えてきました。不安なことは遠慮なく医師や助産師に相談を。あなたの体は出産の準備を着々と進めています。",
    },
  },
  {
    weekMin: 36,
    weekMax: 39,
    label: "妊娠10ヶ月（正期産）",
    message: {
      babyStatus:
        "肺が完全に成熟し、いつ生まれても大丈夫。皮下脂肪が十分つき、ふっくらした体型になっています。",
      momAdvice:
        "前駆陣痛やおしるしは出産が近いサイン。破水したらすぐ病院へ。陣痛の間隔（初産10分、経産15分）で連絡タイミングを確認しておきましょう。",
      encouragement:
        "ここまで本当によく頑張りました。赤ちゃんに会える日はもうすぐ。リラックスして体力を温存しておきましょう。",
    },
  },
  {
    weekMin: 40,
    weekMax: 42,
    label: "予定日前後",
    message: {
      babyStatus:
        "十分に成熟しています。42週を超えると胎盤機能が低下するため、医師がしっかりモニタリングします。",
      momAdvice:
        "予定日超過は珍しくなく、初産の約半数は予定日を過ぎて出産します。41週以降はNSTや超音波で頻回にチェックを。",
      encouragement:
        "「まだ？」のプレッシャーがつらい時期。赤ちゃんには赤ちゃんのタイミングがあります。医療チームが見守っているので安心して。",
    },
  },
];

// ─── 産後（月齢でマッチ） ───

export interface PostnatalStageEntry {
  monthMin: number;
  monthMax: number;
  label: string;
  message: StageMessage;
}

export const postnatalMessages: PostnatalStageEntry[] = [
  {
    monthMin: 0,
    monthMax: 0,
    label: "新生児",
    message: {
      babyStatus:
        "1日15〜20時間眠り、2〜3時間おきに授乳。生理的体重減少や黄疸は正常な反応です。",
      momAdvice:
        "産後の体の回復を最優先に。悪露は4〜6週間続きます。授乳の姿勢を助産師に確認し、乳腺炎を予防しましょう。",
      encouragement:
        "初めてだらけで不安な毎日ですが、赤ちゃんもママも一緒に成長しています。完璧を目指さなくて大丈夫。",
    },
  },
  {
    monthMin: 1,
    monthMax: 1,
    label: "生後1ヶ月",
    message: {
      babyStatus:
        "追視が始まり、近距離でじっと顔を見つめます。起きている時間が少しずつ増えてきました。",
      momAdvice:
        "1ヶ月健診で子宮の回復と赤ちゃんの発育を確認。産後うつのスクリーニング(EPDS)も受けましょう。外気浴を短時間から。",
      encouragement:
        "1ヶ月乗り越えた自分を褒めてあげて。睡眠不足で気分が落ち込むのは自然なこと。つらいときは専門家に相談を。",
    },
  },
  {
    monthMin: 2,
    monthMax: 2,
    label: "生後2ヶ月",
    message: {
      babyStatus:
        "あやすと笑う社会的微笑が見られます。うつぶせで少し頭を持ち上げ、手を口に持っていく動きも増えます。",
      momAdvice:
        "予防接種が開始（ヒブ・肺炎球菌・B型肝炎・ロタ）。同時接種のスケジュールをかかりつけ医と相談しましょう。",
      encouragement:
        "赤ちゃんの笑顔が見られるようになり、育児の喜びを実感できる頃。あなたの頑張りに赤ちゃんが笑顔で応えています。",
    },
  },
  {
    monthMin: 3,
    monthMax: 3,
    label: "生後3ヶ月",
    message: {
      babyStatus:
        "首がしっかりしてきて縦抱きが安定。ガラガラなど音のする方を向き、喃語が活発になります。",
      momAdvice:
        "3〜4ヶ月健診を受けましょう（首すわり・股関節脱臼の確認）。ママの抜け毛はホルモン変化によるもので一時的です。",
      encouragement:
        "少しずつ生活リズムが整い始めます。「この子なりのペース」があると気づく頃。育児書通りでなくても大丈夫。",
    },
  },
  {
    monthMin: 4,
    monthMax: 4,
    label: "生後4ヶ月",
    message: {
      babyStatus:
        "首がすわり、うつぶせで頭と胸をしっかり持ち上げます。両手を合わせて遊び、声を出して笑います。",
      momAdvice:
        "昼夜の区別をつける環境づくりを。BCG接種を。赤ちゃんの手の届く範囲に小さなものを置かない誤飲予防も開始。",
      encouragement:
        "首がすわると抱っこもお出かけもグッと楽に。赤ちゃんの「できた！」が増える楽しい時期です。",
    },
  },
  {
    monthMin: 5,
    monthMax: 5,
    label: "生後5ヶ月",
    message: {
      babyStatus:
        "寝返りを始める子が多い時期。おもちゃに手を伸ばしてつかみ、よだれが増えます。",
      momAdvice:
        "離乳食の開始準備。舌で押し出さなくなったら準備OK。寝返りによる窒息予防のため柔らかい寝具を除去しましょう。",
      encouragement:
        "寝返りのタイミングは個人差が大きいもの。周りと比べず、赤ちゃんの成長を信じて。",
    },
  },
  {
    monthMin: 6,
    monthMax: 6,
    label: "生後6ヶ月",
    message: {
      babyStatus:
        "支えありでおすわりが可能に。下の前歯が生え始める子も。母体由来の免疫が低下し始めます。",
      momAdvice:
        "離乳食を1日1回、10倍がゆ1さじから。新しい食材は1日1種類、平日午前中に（アレルギー対応のため）。鉄欠乏に注意。",
      encouragement:
        "離乳食は「食べる練習」。量を食べなくても口に入れる経験が大切。食の冒険を楽しんで。",
    },
  },
  {
    monthMin: 7,
    monthMax: 7,
    label: "生後7ヶ月",
    message: {
      babyStatus:
        "一人すわりが安定し、ずりばいを始める子も。物を持ち替えたり打ち合わせたりします。人見知りが本格化。",
      momAdvice:
        "離乳食を1日2回に（モグモグ期）。豆腐くらいの固さに。行動範囲が広がるため家の安全対策（ゲート・角ガード）を。",
      encouragement:
        "人見知りは「ママがわかっている」という発達の証。泣かれて困りますが、順調に成長しています。",
    },
  },
  {
    monthMin: 8,
    monthMax: 8,
    label: "生後8ヶ月",
    message: {
      babyStatus:
        "はいはいが本格化し、つかまり立ちを始める子も。小さなものをつまむ動作が出始めます。",
      momAdvice:
        "転倒・落下事故の最多期。階段・浴室へのゲート必須。歯みがきの習慣を開始しましょう（最初はガーゼで拭く）。",
      encouragement:
        "動き回る赤ちゃんを追いかけて大変ですが、この好奇心が知性の土台。安全な環境で自由に探索させてあげて。",
    },
  },
  {
    monthMin: 9,
    monthMax: 9,
    label: "生後9ヶ月",
    message: {
      babyStatus:
        "つかまり立ち・伝い歩きが活発に。バイバイやパチパチなど模倣が始まります。後追いが激しい時期。",
      momAdvice:
        "離乳食を1日3回に（カミカミ期）。バナナくらいの固さで手づかみ食べを積極的に。鉄分・タンパク質をしっかり確保。",
      encouragement:
        "後追いでトイレにも行けない...は多くのママの共通体験。一時的なもので、愛着形成が順調な証拠です。",
    },
  },
  {
    monthMin: 10,
    monthMax: 10,
    label: "生後10ヶ月",
    message: {
      babyStatus:
        "つたい歩きが上達し、数秒間一人で立てる子も。簡単な言葉の理解が始まります。",
      momAdvice:
        "手づかみ食べで自分で食べる意欲を育てましょう。コップ飲みの練習開始。卒乳は焦らなくて大丈夫。",
      encouragement:
        "散らかし放題の食事も自分で食べたい意欲の表れ。「汚してOK」のスペースを作るとお互いストレスが減ります。",
    },
  },
  {
    monthMin: 11,
    monthMax: 11,
    label: "生後11ヶ月",
    message: {
      babyStatus:
        "一人歩きを始める子も（歩行開始は9〜18ヶ月と個人差大）。意味のある最初の言葉が出始める子もいます。",
      momAdvice:
        "離乳食完了期への移行。歯茎で噛める固さに。1歳の誕生日にMR・水痘ワクチンの予約準備を。",
      encouragement:
        "「まだ歩かない」「まだ話さない」と焦らないで。1歳半までに歩けば正常範囲。赤ちゃんのペースを信じて。",
    },
  },
  {
    monthMin: 12,
    monthMax: 14,
    label: "1歳",
    message: {
      babyStatus:
        "体重は出生時の約3倍。多くの子が一人歩きを開始し、意味のある言葉が1〜3語出始めます。",
      momAdvice:
        "MRワクチン第1期・水痘ワクチンを接種。はちみつ解禁。大人の食事の取り分けを薄味で始められます。",
      encouragement:
        "1歳おめでとうございます。この1年、本当に頑張りました。これからは「見守る育児」の始まり。失敗も大切な学びです。",
    },
  },
  {
    monthMin: 15,
    monthMax: 20,
    label: "1歳半",
    message: {
      babyStatus:
        "小走りができ、階段を手をついて登ります。意味のある言葉が10語前後。スプーンを使い始めます。",
      momAdvice:
        "1歳6ヶ月健診（歩行・有意語・指差しの確認）を受けましょう。仕上げ磨きを毎日。イヤイヤ期の入口です。",
      encouragement:
        "「イヤ！」は自我の芽生え。自分の意思を持てるようになった成長の証です。怒りたくなったら6秒深呼吸を。",
    },
  },
  {
    monthMin: 21,
    monthMax: 29,
    label: "2歳",
    message: {
      babyStatus:
        "走る・ジャンプ・ボールを蹴る。二語文（「ワンワン いた」）が出て、ごっこ遊びが始まります。",
      momAdvice:
        "イヤイヤ期の本格化。感情コントロールは脳の前頭前野が未熟なため難しいのが正常。「気持ちを言葉にしてあげる」声かけを。",
      encouragement:
        "「魔の2歳児」は世界共通。あなたの育て方のせいではなく脳の発達段階によるもの。嵐は必ず過ぎます。",
    },
  },
  {
    monthMin: 30,
    monthMax: 42,
    label: "3歳",
    message: {
      babyStatus:
        "三語文以上で会話ができ、ハサミを使ったり丸を描いたりします。「なぜ？」の質問期に入ります。",
      momAdvice:
        "3歳児健診（視力・聴力検査）を受けましょう。生活習慣の自立を促す時期。スクリーン時間は1日1時間以内が目安。",
      encouragement:
        "「なんで？」攻撃は知的好奇心の爆発。丁寧に答えてあげると考える力が育ちます。完璧な親はいません。一緒に成長しましょう。",
    },
  },
];

// ─── ヘルパー関数 ───

/**
 * 妊娠週数からメッセージを取得
 */
export function getPregnancyMessage(weeks: number): StageMessage | null {
  const entry = pregnancyMessages.find(
    (e) => weeks >= e.weekMin && weeks <= e.weekMax
  );
  return entry?.message ?? null;
}

/**
 * 月齢からメッセージを取得
 */
export function getPostnatalMessage(months: number): StageMessage | null {
  const entry = postnatalMessages.find(
    (e) => months >= e.monthMin && months <= e.monthMax
  );
  return entry?.message ?? null;
}

/**
 * 出産予定日から妊娠週数を計算
 */
export function calcWeeksFromDueDate(dueDate: string): number {
  const due = new Date(dueDate);
  const lmp = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.floor(diffDays / 7);
}

/**
 * 生年月日から月齢を計算
 */
export function calcMonthsFromBirthdate(birthdate: string): number {
  const birth = new Date(birthdate);
  const now = new Date();
  const months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  const dayDiff = now.getDate() - birth.getDate();
  return dayDiff < 0 ? months - 1 : months;
}
