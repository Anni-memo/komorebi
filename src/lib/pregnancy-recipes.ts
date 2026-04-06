/**
 * 妊娠月別おすすめ料理データ
 * learn/pregnancy-recipes と home/page.tsx で共有
 */

export interface Recipe {
  name: string;
  nutrients: string;
  point: string;
  time: string;
}

export interface MonthData {
  month: number;
  weeks: string;
  trimester: "初期" | "中期" | "後期";
  bodyChange: string;
  keyNutrients: string;
  mealTip: string;
  recipes: Recipe[];
}

export const pregnancyRecipes: MonthData[] = [
  {
    month: 2,
    weeks: "4〜7週",
    trimester: "初期",
    bodyChange: "つわりが始まる時期。吐き気・匂いへの敏感さ・眠気が出やすい",
    keyNutrients: "葉酸、ビタミンB6",
    mealTip: "食べられるものを少量ずつ。冷たいもの・酸味が食べやすい",
    recipes: [
      { name: "冷やしそうめん（梅肉・大葉のせ）", nutrients: "炭水化物・ビタミンB6", point: "冷たく酸味があり、つわり中でも食べやすい", time: "15分" },
      { name: "豆腐と卵のしょうがあんかけスープ", nutrients: "たんぱく質・ビタミンB6・鉄", point: "生姜が吐き気を抑える。とろみで喉ごし良好", time: "15分" },
      { name: "バナナヨーグルトスムージー", nutrients: "葉酸・ビタミンB6・カルシウム", point: "バナナはビタミンB6が豊富。冷たくて飲みやすい", time: "5分" },
      { name: "ほうれん草とチーズのスペインオムレツ", nutrients: "葉酸・カルシウム・たんぱく質", point: "冷めても美味しく、少量ずつ食べられる", time: "20分" },
      { name: "枝豆と納豆の冷ややっこ", nutrients: "葉酸・鉄・たんぱく質", point: "火を使わず簡単。大豆食品で葉酸たっぷり", time: "5分" },
      { name: "煮りんご", nutrients: "食物繊維・ビタミンC", point: "食欲がないときのデザート。温冷どちらもOK", time: "15分" },
      { name: "鮭と大根の和風スープ", nutrients: "ビタミンD・ビタミンB6・たんぱく質", point: "あっさり味で胃に優しい", time: "20分" },
    ],
  },
  {
    month: 3,
    weeks: "8〜11週",
    trimester: "初期",
    bodyChange: "つわりのピーク。匂いに敏感になり、食べられるものが限られる",
    keyNutrients: "葉酸、ビタミンB6、水分",
    mealTip: "冷たいもの・酸味中心。水分補給を最優先に",
    recipes: [
      { name: "冷やしトマトうどん", nutrients: "炭水化物・リコピン・ビタミンC", point: "冷たく酸味があり、つわりピーク時に最適", time: "15分" },
      { name: "梅ぽん豚もやし", nutrients: "ビタミンB6・ビタミンC・たんぱく質", point: "さっぱり梅ポン酢味。電子レンジで簡単", time: "10分" },
      { name: "フルーツゼリー（グレープフルーツ）", nutrients: "ビタミンC・葉酸・水分", point: "冷たく喉ごし良好。水分補給にも", time: "15分+冷蔵" },
      { name: "ふわふわ納豆ごはん（卵・海苔）", nutrients: "葉酸・たんぱく質・鉄・B12", point: "火を使わず3分。納豆は葉酸の優秀食材", time: "3分" },
      { name: "ブロッコリーのポタージュ", nutrients: "葉酸・ビタミンC・食物繊維", point: "冷製でも温かくてもOK。葉酸の宝庫", time: "20分" },
      { name: "しらすとわかめの酢の物", nutrients: "カルシウム・ビタミンD", point: "さっぱり酢の物はつわり中でも食べやすい", time: "10分" },
      { name: "鶏ささみの梅しそ蒸し", nutrients: "たんぱく質・ビタミンB6・葉酸", point: "電子レンジで簡単。脂が少なく胃に優しい", time: "15分" },
    ],
  },
  {
    month: 4,
    weeks: "12〜15週",
    trimester: "初期",
    bodyChange: "つわりがおさまり食欲回復。胎盤完成。便秘が始まりやすい",
    keyNutrients: "葉酸、鉄、食物繊維",
    mealTip: "栄養バランスを回復。便秘対策に食物繊維を意識",
    recipes: [
      { name: "ひじきと大豆の炊き込みごはん", nutrients: "鉄・食物繊維・葉酸・カルシウム", point: "炊飯器にお任せ。ひじきは鉄分豊富", time: "20分+炊飯" },
      { name: "小松菜と厚揚げの味噌炒め", nutrients: "鉄・カルシウム・葉酸", point: "小松菜の鉄分は吸収しやすい", time: "15分" },
      { name: "切り干し大根のサラダ", nutrients: "鉄・カルシウム・食物繊維", point: "食物繊維たっぷりで便秘対策", time: "15分" },
      { name: "サバ缶のトマトパスタ", nutrients: "DHA・EPA・鉄・たんぱく質", point: "サバ缶で手軽にDHA摂取", time: "20分" },
      { name: "けんちん汁", nutrients: "食物繊維・ビタミンA・鉄", point: "根菜たっぷりで食物繊維を効率摂取", time: "25分" },
      { name: "ほうれん草と卵のソテー", nutrients: "葉酸・鉄・たんぱく質", point: "ほうれん草の葉酸+卵のたんぱく質", time: "10分" },
      { name: "きのこの炊き込みおかゆ", nutrients: "食物繊維・ビタミンD・ビタミンB群", point: "つわり明けの胃に優しい", time: "20分" },
    ],
  },
  {
    month: 5,
    weeks: "16〜19週",
    trimester: "中期",
    bodyChange: "安定期。胎動を感じ始める。体重管理と便秘対策が重要",
    keyNutrients: "鉄（16mg/日）、カルシウム、たんぱく質（55g/日）",
    mealTip: "鉄+カルシウム強化を開始。ビタミンCと一緒に鉄を摂る",
    recipes: [
      { name: "あさりの味噌汁", nutrients: "鉄・ビタミンB12・亜鉛", point: "あさりは鉄とB12の優秀食材", time: "15分" },
      { name: "鶏むね肉とブロッコリーの中華炒め", nutrients: "たんぱく質・葉酸・ビタミンC・鉄", point: "高たんぱく低脂質。ビタミンCが鉄吸収を促進", time: "20分" },
      { name: "じゃこトースト（チーズ・海苔のせ）", nutrients: "カルシウム・ビタミンD・たんぱく質", point: "じゃこ+チーズでカルシウム強化。朝食に最適", time: "10分" },
      { name: "ひよこ豆のクラムチャウダー", nutrients: "鉄・カルシウム・たんぱく質・食物繊維", point: "あさり+豆+牛乳でミネラル満点", time: "25分" },
      { name: "高野豆腐の卵とじ", nutrients: "鉄・カルシウム・たんぱく質・食物繊維", point: "高野豆腐は鉄・カルシウムの宝庫", time: "15分" },
      { name: "小松菜のじゃこおかか和え", nutrients: "鉄・カルシウム・ビタミンK", point: "副菜として毎日でも。茹でて和えるだけ", time: "10分" },
      { name: "ごぼうとこんにゃくのきんぴら", nutrients: "食物繊維・鉄・マグネシウム", point: "便秘対策の定番。作り置き可", time: "20分" },
    ],
  },
  {
    month: 6,
    weeks: "20〜23週",
    trimester: "中期",
    bodyChange: "お腹が大きくなる。むくみが始まり、貧血検査で引っかかる人も",
    keyNutrients: "鉄（ヘム鉄重視）、カリウム、減塩",
    mealTip: "減塩+ヘム鉄+むくみ対策。カリウム豊富な食材を活用",
    recipes: [
      { name: "鮭のちゃんちゃん焼き", nutrients: "たんぱく質・ビタミンD・DHA・鉄", point: "ホイルで包んで焼くだけ。野菜も一緒に摂れる", time: "20分" },
      { name: "牛肉と小松菜のオイスター炒め", nutrients: "ヘム鉄・カルシウム・たんぱく質・亜鉛", point: "牛赤身のヘム鉄は吸収率が非ヘム鉄の5〜6倍", time: "15分" },
      { name: "豆腐ハンバーグ（きのこあんかけ）", nutrients: "たんぱく質・カルシウム・ビタミンD・食物繊維", point: "低塩分で高たんぱく。むくみ対策にも", time: "25分" },
      { name: "ほうれん草とトマトのチーズ焼き", nutrients: "葉酸・鉄・カルシウム・リコピン", point: "トースターで簡単。ビタミンCが鉄吸収を促進", time: "15分" },
      { name: "かぼちゃの豆乳ポタージュ", nutrients: "カリウム・ビタミンA・カルシウム・食物繊維", point: "かぼちゃのカリウムがむくみ対策に", time: "20分" },
      { name: "いわしの梅煮", nutrients: "DHA・EPA・鉄・カルシウム", point: "梅干しで臭み消し＆さっぱり。骨ごと食べてCaも", time: "25分" },
      { name: "アボカドとエビのサラダ", nutrients: "カリウム・ビタミンE・たんぱく質・葉酸", point: "アボカドはカリウム豊富。むくみ軽減", time: "10分" },
    ],
  },
  {
    month: 7,
    weeks: "24〜27週",
    trimester: "中期",
    bodyChange: "お腹が急成長。お腹の張り・こむら返りが起きやすい",
    keyNutrients: "DHA、鉄、マグネシウム、たんぱく質",
    mealTip: "DHA強化（魚料理増）。マグネシウムでこむら返り予防",
    recipes: [
      { name: "サバ缶の和風チヂミ", nutrients: "DHA・EPA・カルシウム・たんぱく質", point: "サバ缶で手軽にDHA。骨ごと食べてカルシウムも", time: "20分" },
      { name: "鶏肉と根菜のミルフィーユ鍋", nutrients: "たんぱく質・食物繊維・ビタミンA", point: "白菜と鶏肉を重ねるだけ。体も温まる", time: "20分" },
      { name: "あさりと青梗菜の酒蒸し", nutrients: "鉄・ビタミンB12・カルシウム", point: "あさりの鉄分+青梗菜のカルシウム", time: "15分" },
      { name: "豆腐グラタン（ブロッコリー入り）", nutrients: "カルシウム・たんぱく質・葉酸・ビタミンC", point: "ホワイトソースの代わりに豆腐でヘルシー", time: "25分" },
      { name: "ブリの照り焼き", nutrients: "DHA・EPA・鉄・たんぱく質・ビタミンD", point: "ブリはDHAが非常に豊富。フライパンで簡単", time: "15分" },
      { name: "ゴーヤチャンプルー", nutrients: "ビタミンC・鉄・たんぱく質・カルシウム", point: "豆腐+卵+豚肉で栄養満点。ビタミンC豊富", time: "20分" },
      { name: "バナナとくるみのオートミール", nutrients: "マグネシウム・鉄・食物繊維・ビタミンB6", point: "くるみのマグネシウムでこむら返り予防", time: "10分" },
    ],
  },
  {
    month: 8,
    weeks: "28〜31週",
    trimester: "後期",
    bodyChange: "胎児は約1,500gに。お腹の張りが強くなり腰痛も増加",
    keyNutrients: "たんぱく質（75g/日）、DHA、鉄、ビタミンD",
    mealTip: "高たんぱく+DHA。魚料理を週3回以上が理想",
    recipes: [
      { name: "鮭ときのこのホイル焼き", nutrients: "たんぱく質・DHA・ビタミンD・食物繊維", point: "ホイルで包んで焼くだけ。きのこのビタミンDがCa吸収促進", time: "20分" },
      { name: "さばの豆腐ハンバーグ", nutrients: "DHA・EPA・たんぱく質・カルシウム", point: "さば缶+豆腐で高たんぱく・高DHA", time: "25分" },
      { name: "鶏肉の参鶏湯風おかゆ", nutrients: "たんぱく質・コラーゲン・ビタミンB6", point: "胃に優しく高たんぱく。生姜で体を温める", time: "25分" },
      { name: "いわしのつみれ汁", nutrients: "DHA・EPA・鉄・カルシウム・たんぱく質", point: "いわしは骨ごとすり身にしてカルシウムも", time: "25分" },
      { name: "納豆とろろそば", nutrients: "葉酸・たんぱく質・食物繊維・鉄", point: "消化に良く、少量でも栄養価が高い", time: "15分" },
      { name: "枝豆入りひじきの白和え", nutrients: "鉄・カルシウム・たんぱく質・葉酸", point: "豆腐+ひじき+枝豆で栄養の組み合わせが最強", time: "15分" },
      { name: "野菜たっぷりビビンバ", nutrients: "鉄・ビタミンA・たんぱく質・食物繊維", point: "ほうれん草・にんじん・牛肉で鉄分強化", time: "25分" },
    ],
  },
  {
    month: 9,
    weeks: "32〜35週",
    trimester: "後期",
    bodyChange: "胃の圧迫で胃もたれ・胸やけ。「後期つわり」と感じる人も",
    keyNutrients: "たんぱく質（75g/日）、DHA、鉄、ビタミンK",
    mealTip: "少量頻回が基本。消化が良く栄養価の高いものを",
    recipes: [
      { name: "豆乳クラムチャウダー", nutrients: "鉄・カルシウム・たんぱく質・B12", point: "あさり+豆乳で胃に優しくミネラル豊富", time: "20分" },
      { name: "サバ缶の冷や汁", nutrients: "DHA・EPA・たんぱく質・カルシウム", point: "味噌+サバ缶+きゅうり+豆腐。胃もたれ時にさっぱり", time: "15分" },
      { name: "茶碗蒸し", nutrients: "たんぱく質・ビタミンD・ビタミンA", point: "つるりと食べやすく消化も良い", time: "25分" },
      { name: "鮭のおにぎり（小さめ2個）", nutrients: "たんぱく質・DHA・炭水化物", point: "少量頻回に最適。鮭でDHAも摂取", time: "10分" },
      { name: "ほうれん草のかき玉スープ", nutrients: "葉酸・鉄・たんぱく質・ビタミンK", point: "ビタミンKが出産準備に。胃に優しい", time: "15分" },
      { name: "蒸し鶏の梅しそ和え", nutrients: "たんぱく質・ビタミンB6・クエン酸", point: "さっぱり味で胸やけ時にも食べやすい", time: "15分" },
      { name: "オーバーナイトオーツ（ヨーグルト・ベリー）", nutrients: "カルシウム・鉄・食物繊維・ビタミンC", point: "前夜に仕込むだけ。朝食や間食に少量ずつ", time: "5分+冷蔵" },
    ],
  },
  {
    month: 10,
    weeks: "36〜40週",
    trimester: "後期",
    bodyChange: "胃の圧迫が軽減し食欲回復。出産に備えて体力を蓄える時期",
    keyNutrients: "鉄（貯蓄鉄確保）、DHA、ビタミンK、エネルギー",
    mealTip: "体力蓄積と貯蓄鉄確保。しっかり食べてOK（+450kcal/日）",
    recipes: [
      { name: "ブリ大根", nutrients: "DHA・EPA・たんぱく質・ビタミンD", point: "ブリはDHAトップクラス。大根で消化も助ける", time: "25分" },
      { name: "レバニラ炒め", nutrients: "ヘム鉄・ビタミンA・葉酸・たんぱく質", point: "出産前の貯蓄鉄確保に（週1回まで）", time: "15分" },
      { name: "鶏肉の春雨スープ", nutrients: "たんぱく質・ビタミンB6・炭水化物", point: "消化が良く、エネルギー補給に最適", time: "20分" },
      { name: "いり豆腐", nutrients: "たんぱく質・カルシウム・鉄・食物繊維", point: "豆腐+にんじん+しいたけ+ひじきで栄養凝縮", time: "20分" },
      { name: "小松菜としらすのパスタ", nutrients: "カルシウム・鉄・ビタミンD・葉酸", point: "エネルギー+ミネラルを効率よく摂取", time: "20分" },
      { name: "キムチ納豆の冷ややっこ", nutrients: "ビタミンK・葉酸・たんぱく質・鉄", point: "納豆のビタミンKが出産準備に。火を使わず簡単", time: "5分" },
      { name: "さんまの塩焼き（大根おろし添え）", nutrients: "DHA・EPA・たんぱく質・鉄・ビタミンD", point: "さんま1尾でDHA1日推奨量をほぼカバー", time: "15分" },
    ],
  },
];

/** 妊娠月を計算する（出産予定日から） */
export function calcPregnancyMonth(expectedDueDate: string): number {
  const due = new Date(expectedDueDate);
  const lmp = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weeks = Math.floor(diffDays / 7);
  // 妊娠月の計算: 4週 = 1ヶ月
  const month = Math.floor(weeks / 4) + 1;
  return Math.max(1, Math.min(10, month));
}

/** 妊娠週数と日数を計算する（出産予定日から） */
export function calcPregnancyWeeksAndDays(expectedDueDate: string): { weeks: number; days: number } {
  const due = new Date(expectedDueDate);
  const lmp = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  return { weeks: Math.max(0, weeks), days: Math.max(0, days) };
}

/** 指定月のレシピデータを取得 */
export function getRecipesForMonth(month: number): MonthData | undefined {
  return pregnancyRecipes.find((m) => m.month === month);
}
