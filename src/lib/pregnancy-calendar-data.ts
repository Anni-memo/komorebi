// 妊娠カレンダー 週別データ
// 出典: 厚生労働省「妊産婦のための食生活指針」、日本産科婦人科学会ガイドライン、
//       母子健康手帳、日本産婦人科医会「妊娠中の注意点」

export interface PregnancyWeekData {
  week: number;
  trimester: 1 | 2 | 3;
  babySize: { lengthCm: string; weightG: string };
  babySizeComparison: string;
  babyDevelopment: string;
  momChanges: string;
  todoAndTips: string;
  checkup?: string;
}

export const pregnancyWeeks: PregnancyWeekData[] = [
  {
    week: 4,
    trimester: 1,
    babySize: { lengthCm: "約0.1", weightG: "1g未満" },
    babySizeComparison: "けしの実",
    babyDevelopment:
      "受精卵が子宮内膜に着床し、胎芽と呼ばれる段階。細胞分裂が活発に進み、胎盤の元となる組織が形成され始めます。",
    momChanges:
      "生理の遅れに気づく頃。まだ自覚症状はほとんどありませんが、基礎体温の高温期が続きます。",
    todoAndTips:
      "妊娠検査薬で確認し、陽性なら早めに産婦人科を受診しましょう。葉酸サプリの摂取を開始（1日400μg推奨）。",
    checkup: "初回受診の目安（4〜6週）",
  },
  {
    week: 5,
    trimester: 1,
    babySize: { lengthCm: "約0.2", weightG: "1g未満" },
    babySizeComparison: "ごまの粒",
    babyDevelopment:
      "心臓の原型が形成され始め、神経管（脳と脊髄の元）が発達を開始します。胎嚢がエコーで確認できるようになります。",
    momChanges:
      "つわりの兆候が出始める人も。体のだるさや眠気、胸の張りを感じることがあります。",
    todoAndTips:
      "産婦人科で胎嚢確認を。飲酒・喫煙は完全にやめましょう。",
  },
  {
    week: 6,
    trimester: 1,
    babySize: { lengthCm: "約0.5", weightG: "1g未満" },
    babySizeComparison: "レンズ豆",
    babyDevelopment:
      "心拍が確認できるようになります。頭部と体の区別がつき始め、手足の芽が出現。顔の原型も形成され始めます。",
    momChanges:
      "つわりが本格化し始める人が多い時期。吐き気、食欲の変化、匂いに敏感になることがあります。",
    todoAndTips:
      "心拍確認ができれば母子健康手帳の交付を受けられます（自治体により異なる）。つわり対策として少量頻回の食事を心がけましょう。",
  },
  {
    week: 7,
    trimester: 1,
    babySize: { lengthCm: "約1.0", weightG: "1g未満" },
    babySizeComparison: "ブルーベリー",
    babyDevelopment:
      "脳が急速に発達し、手足が伸び始めます。肝臓や腎臓などの臓器の原型が形成されています。",
    momChanges:
      "つわりがピークに向かう時期。頻尿、便秘、情緒不安定を感じる人も増えます。",
    todoAndTips:
      "水分補給をこまめに。つわりがひどい場合は無理せず医師に相談を。",
  },
  {
    week: 8,
    trimester: 1,
    babySize: { lengthCm: "約1.5", weightG: "約1" },
    babySizeComparison: "ラズベリー",
    babyDevelopment:
      "胎芽から胎児と呼ばれるようになります。指の原型が見え始め、まぶたが形成中。すべての主要臓器の原型が揃います。",
    momChanges:
      "つわりが続く時期。子宮がこぶし大程度に大きくなり、下腹部の張りを感じることがあります。",
    todoAndTips:
      "母子健康手帳を受け取りましょう（まだの方）。妊婦健診の補助券を活用してください。",
    checkup: "妊婦健診（2〜4週間隔）",
  },
  {
    week: 9,
    trimester: 1,
    babySize: { lengthCm: "約2.5", weightG: "約2〜3" },
    babySizeComparison: "さくらんぼ",
    babyDevelopment:
      "胎児の体が急速に成長。手足の指が分かれ始め、耳の外側が形成されます。動き始めますがまだ感じられません。",
    momChanges:
      "つわりが最もつらい時期のひとつ。体重が減る人もいます。肌荒れやニキビが出る人も。",
    todoAndTips:
      "無理な食事制限は不要。食べられるものを食べられるときに摂りましょう。",
  },
  {
    week: 10,
    trimester: 1,
    babySize: { lengthCm: "約3.0", weightG: "約5" },
    babySizeComparison: "いちご",
    babyDevelopment:
      "器官形成期がほぼ完了し、これ以降は成長と成熟の段階に。爪が形成され始め、骨格が軟骨から骨に変わり始めます。",
    momChanges:
      "子宮がグレープフルーツ大に。ホルモンの影響で血液量が増加し始め、動悸を感じる人もいます。",
    todoAndTips:
      "出生前診断（NIPT等）を検討する場合は、この時期から医師に相談を。",
  },
  {
    week: 11,
    trimester: 1,
    babySize: { lengthCm: "約4.5", weightG: "約8" },
    babySizeComparison: "ライム",
    babyDevelopment:
      "頭部が体全体の約半分を占めます。歯の芽が歯茎の中に形成され、外性器の分化が始まります。",
    momChanges:
      "つわりが少しずつ和らぐ人も出てきます。お腹のふくらみはまだ目立ちませんが、ウエスト周りがきつく感じることも。",
    todoAndTips:
      "妊娠初期の血液検査を受けましょう（血液型、感染症、貧血など）。",
  },
  {
    week: 12,
    trimester: 1,
    babySize: { lengthCm: "約6.0", weightG: "約15〜20" },
    babySizeComparison: "梅の実",
    babyDevelopment:
      "内臓がほぼ完成し、肝臓が血液を作り始めます。エコーで動く様子が見え、あくびや指しゃぶりのような動きも。性別が分かり始める場合も。",
    momChanges:
      "つわりが軽減し始める人が多い時期。流産のリスクが大きく下がります。お腹が少し出てくる人も。",
    todoAndTips:
      "職場への報告を検討する時期。妊娠届を出していない場合は早めに提出を。出生前診断（NT検査）はこの頃まで。",
    checkup: "妊婦健診（初期スクリーニング）",
  },
  {
    week: 13,
    trimester: 2,
    babySize: { lengthCm: "約7.5", weightG: "約25" },
    babySizeComparison: "キウイ",
    babyDevelopment:
      "声帯が形成されます。腸が腹腔内に収まり、膵臓がインスリンを作り始めます。指紋の形成も始まります。",
    momChanges:
      "安定期に入り始め、つわりが治まる人が多くなります。食欲が戻り、体調が改善することが多い時期です。",
    todoAndTips:
      "安定期に入りましたが無理は禁物。マタニティウェアの準備を始めましょう。",
  },
  {
    week: 14,
    trimester: 2,
    babySize: { lengthCm: "約9.0", weightG: "約40〜45" },
    babySizeComparison: "レモン",
    babyDevelopment:
      "産毛（胎毛）が全身に生え始めます。表情筋が発達し、しかめっ面のような表情も。甲状腺ホルモンの分泌が始まります。",
    momChanges:
      "胎盤が完成に近づき、ホルモンが安定。肌の調子が良くなる人が多い時期。お腹のふくらみが分かるようになってきます。",
    todoAndTips:
      "歯科健診を受けましょう（妊娠中は歯周病リスクが上昇）。",
  },
  {
    week: 15,
    trimester: 2,
    babySize: { lengthCm: "約10", weightG: "約70" },
    babySizeComparison: "りんご",
    babyDevelopment:
      "骨格の骨化が進みエコーで骨が確認できるように。光に反応し始め、味覚も発達し始めます。羊水を飲み込む練習をしています。",
    momChanges:
      "お腹が目立ち始める人も。妊娠線予防のケアを始める時期。鼻血・鼻づまりが起きやすくなります。",
    todoAndTips:
      "保湿クリームでお腹のケアを。体重管理を意識し始めましょう。",
  },
  {
    week: 16,
    trimester: 2,
    babySize: { lengthCm: "約12", weightG: "約100" },
    babySizeComparison: "アボカド",
    babyDevelopment:
      "胎盤が完成し、臍帯を通じて栄養・酸素の供給が安定します。性別がエコーで判別しやすくなります。筋肉が発達し、活発に動きます。",
    momChanges:
      "安定期の中間で体調が最も良い時期。お腹が明確にふくらみ、胎動を感じ始める人（経産婦）もいます。",
    todoAndTips:
      "戌の日の安産祈願（5ヶ月）の計画を。両親学級・母親学級の申し込みを確認。",
    checkup: "妊婦健診（中期血液検査・子宮頸管長測定）",
  },
  {
    week: 17,
    trimester: 2,
    babySize: { lengthCm: "約13", weightG: "約140" },
    babySizeComparison: "大きな玉ねぎ",
    babyDevelopment:
      "脂肪が蓄積し始め、体温調節の準備が進みます。聴覚が発達し始め、外部の音に反応するようになります。",
    momChanges:
      "子宮がメロン大に。腰痛を感じ始める人が増えます。お腹の張りを時々感じることも。",
    todoAndTips:
      "適度な運動（ウォーキング、マタニティヨガ等）を取り入れましょう。",
  },
  {
    week: 18,
    trimester: 2,
    babySize: { lengthCm: "約14", weightG: "約190" },
    babySizeComparison: "パプリカ",
    babyDevelopment:
      "耳の構造がほぼ完成し、外部の音がよく聞こえるように。ミエリン（神経の絶縁体）の形成が始まります。あくびをしたり回転したりします。",
    momChanges:
      "初産婦でも胎動を感じ始める人が出てきます。心拍数が増加し、めまいを感じることがあります。",
    todoAndTips:
      "話しかけや音楽など、胎教を意識し始めてもよい時期です。",
  },
  {
    week: 19,
    trimester: 2,
    babySize: { lengthCm: "約15", weightG: "約240" },
    babySizeComparison: "マンゴー",
    babyDevelopment:
      "胎脂（バーニックス）が皮膚を覆い始め、肌を保護します。感覚器官が急速に発達し、脳が各感覚の専門領域を形成中。",
    momChanges:
      "お腹の膨らみがはっきりし、周囲からも妊娠が分かるように。足がつりやすくなることがあります。",
    todoAndTips:
      "カルシウムと鉄分を意識した食事を。こむら返り対策にストレッチを。",
  },
  {
    week: 20,
    trimester: 2,
    babySize: { lengthCm: "約25", weightG: "約300" },
    babySizeComparison: "バナナ",
    babyDevelopment:
      "妊娠の折り返し地点。全身の器官が機能し始め、味蕾が発達して味を感じられるように。睡眠と覚醒のリズムが出てきます。",
    momChanges:
      "子宮底がおへその高さに達します。胎動がはっきり感じられるように。息切れを感じやすくなります。",
    todoAndTips:
      "妊娠中期のエコー（胎児スクリーニング）で詳しい形態確認。出産場所・バースプランの検討を始めましょう。",
    checkup: "妊婦健診（中期スクリーニングエコー）",
  },
  {
    week: 21,
    trimester: 2,
    babySize: { lengthCm: "約26", weightG: "約360" },
    babySizeComparison: "にんじん",
    babyDevelopment:
      "骨髄が血液を作り始めます。消化器系が羊水の処理を練習中。動きがさらに活発になり、回転やキックが増えます。",
    momChanges:
      "お腹の皮膚が伸び、かゆみを感じる人も。静脈瘤ができやすくなります。",
    todoAndTips:
      "妊娠線予防の保湿を継続。弾性ストッキングの使用も検討を。",
  },
  {
    week: 22,
    trimester: 2,
    babySize: { lengthCm: "約28", weightG: "約430" },
    babySizeComparison: "パパイヤ",
    babyDevelopment:
      "まぶたと眉毛がはっきりし、顔立ちが整ってきます。肺でサーファクタント（肺胞を開く物質）の産生が始まります。",
    momChanges:
      "お腹が大きくなり、寝る姿勢が気になり始めます。腰痛が強くなる人も。むくみが出始めることがあります。",
    todoAndTips:
      "左側を下にして寝る（シムスの姿勢）のが推奨。抱き枕の活用も。",
  },
  {
    week: 23,
    trimester: 2,
    babySize: { lengthCm: "約29", weightG: "約500" },
    babySizeComparison: "大きなグレープフルーツ",
    babyDevelopment:
      "聴覚がさらに発達し、ママの声や心臓の音に反応します。急速眼球運動（REM）が始まり、夢を見ている可能性も。",
    momChanges:
      "胎動が力強くなり、外から触っても分かるように。食後の胸焼けが増えることがあります。",
    todoAndTips:
      "産後の生活について夫婦で話し合いを。ベビー用品のリサーチを始めましょう。",
  },
  {
    week: 24,
    trimester: 2,
    babySize: { lengthCm: "約30", weightG: "約600" },
    babySizeComparison: "とうもろこし",
    babyDevelopment:
      "肺の構造が複雑化し、呼吸の練習運動が活発に。内耳が完成し、平衡感覚が発達。皮下脂肪が増え始めます。",
    momChanges:
      "おりものが増えることがあります。手のしびれ（手根管症候群）が出る人も。",
    todoAndTips: "妊娠糖尿病検査（糖負荷試験）を受けましょう。",
    checkup: "妊婦健診（妊娠糖尿病スクリーニング）",
  },
  {
    week: 25,
    trimester: 2,
    babySize: { lengthCm: "約32", weightG: "約700" },
    babySizeComparison: "カリフラワー",
    babyDevelopment:
      "鼻孔が開き始め、呼吸様運動が増加。皮膚にシワが多いですが、脂肪の蓄積で徐々にふっくらしてきます。",
    momChanges:
      "子宮がサッカーボール大に。お腹の張り（前駆陣痛的なもの）を感じることがあります。",
    todoAndTips:
      "出産準備品リストを作成し始めましょう。入院バッグの準備を意識して。",
  },
  {
    week: 26,
    trimester: 2,
    babySize: { lengthCm: "約34", weightG: "約800" },
    babySizeComparison: "ネギ（長さ）",
    babyDevelopment:
      "目が開き始め、光を感知できるように。肺がサーファクタントを本格的に産生。脳波に覚醒と睡眠のパターンが明確に。",
    momChanges:
      "足のむくみが顕著になることがあります。ブラクストン・ヒックス収縮（前駆陣痛）を感じる人も。",
    todoAndTips:
      "むくみ対策（着圧ソックス、足を高くする等）を取り入れましょう。",
  },
  {
    week: 27,
    trimester: 2,
    babySize: { lengthCm: "約36", weightG: "約900〜1000" },
    babySizeComparison: "カリフラワー（大）",
    babyDevelopment:
      "脳が非常に活発に発達。網膜の層が形成され、光と影を区別できるように。しゃっくりをすることが増えます。",
    momChanges:
      "お腹がさらに大きくなり、重心が変化して転びやすくなります。夜間の頻尿が増えます。",
    todoAndTips:
      "第2トリメスター最後の週。産休の計画や職場との調整を進めましょう。",
  },
  {
    week: 28,
    trimester: 3,
    babySize: { lengthCm: "約38", weightG: "約1100" },
    babySizeComparison: "なす（大）",
    babyDevelopment:
      "脳の溝（脳回）が増え、表面積が拡大。まばたきができるようになり、夢を見ています。この時期から万が一の早産でも生存率が大幅に上がります。",
    momChanges:
      "お腹の張りが頻繁に。息苦しさや胸焼けが増します。妊娠後期に入り、疲れやすくなります。",
    todoAndTips:
      "妊婦健診が2週間に1回に。胎動カウント（10回胎動法）を始めましょう。出産準備クラスへの参加も。",
    checkup: "妊婦健診（後期血液検査・2週間隔に変更）",
  },
  {
    week: 29,
    trimester: 3,
    babySize: { lengthCm: "約39", weightG: "約1250" },
    babySizeComparison: "バターナッツかぼちゃ",
    babyDevelopment:
      "筋肉と肺が成熟を続けています。骨にカルシウムが蓄積中。頭が体に対して比例的になってきます。",
    momChanges:
      "頻尿がさらに増加。夜眠りにくくなる人が増えます。貧血になりやすい時期です。",
    todoAndTips:
      "鉄分の多い食品を積極的に。出産入院の準備を具体的に進めましょう。",
  },
  {
    week: 30,
    trimester: 3,
    babySize: { lengthCm: "約40", weightG: "約1400" },
    babySizeComparison: "キャベツ",
    babyDevelopment:
      "赤血球を骨髄で作るようになります。胎毛が減り始め、髪の毛が生えてきます。羊水量がピークに達します。",
    momChanges:
      "子宮底がみぞおち近くまで上がり、胃の圧迫感が強くなります。背中の痛みや骨盤の違和感も。",
    todoAndTips:
      "入院バッグの準備を完了させましょう。赤ちゃんの部屋や寝具の準備も。",
  },
  {
    week: 31,
    trimester: 3,
    babySize: { lengthCm: "約41", weightG: "約1600" },
    babySizeComparison: "ココナッツ",
    babyDevelopment:
      "脳の神経接続が急速に増加中。5つの感覚がすべて機能しています。体が丸みを帯びてきます。",
    momChanges:
      "息切れが強くなります。夜の睡眠が断続的になりがち。前駆陣痛がより頻繁に。",
    todoAndTips:
      "陣痛時の連絡先・移動手段を確認しておきましょう。",
  },
  {
    week: 32,
    trimester: 3,
    babySize: { lengthCm: "約42", weightG: "約1800" },
    babySizeComparison: "大根",
    babyDevelopment:
      "肺以外の臓器がほぼ成熟。爪が指先まで伸びてきます。頭を下にする頭位になる赤ちゃんが増えます。",
    momChanges:
      "お腹が大きくなり日常動作がつらくなります。こむら返りが夜間に起きやすいです。",
    todoAndTips:
      "逆子の場合は逆子体操について医師と相談を。産休の手続きを完了させましょう。",
    checkup: "妊婦健診（NST開始の場合あり）",
  },
  {
    week: 33,
    trimester: 3,
    babySize: { lengthCm: "約43", weightG: "約2000" },
    babySizeComparison: "パイナップル",
    babyDevelopment:
      "免疫システムが発達中。骨格が硬くなりますが、頭蓋骨はまだ柔らかく産道を通れるようになっています。",
    momChanges:
      "恥骨や股関節に痛みを感じる人が増えます。お腹の皮膚が引っ張られ、かゆみが強くなることも。",
    todoAndTips:
      "ベビーカーやチャイルドシートの準備・設置を。",
  },
  {
    week: 34,
    trimester: 3,
    babySize: { lengthCm: "約45", weightG: "約2200" },
    babySizeComparison: "メロン",
    babyDevelopment:
      "肺の成熟がかなり進みます。中枢神経系と肺が最終的な発達段階に。この時期の出産でもNICU管理で予後良好なことが多いです。",
    momChanges:
      "お腹の圧迫で食事が少量ずつしか食べられないことも。骨盤周りが緩み、歩行がつらくなります。",
    todoAndTips:
      "産後の届出（出生届14日以内等）や必要書類を確認しておきましょう。",
  },
  {
    week: 35,
    trimester: 3,
    babySize: { lengthCm: "約46", weightG: "約2400" },
    babySizeComparison: "ハニーデューメロン",
    babyDevelopment:
      "皮下脂肪がたっぷりつき、ふっくらした体型に。腎臓が完全に機能。肝臓も老廃物の処理ができるようになっています。",
    momChanges:
      "頻尿がさらに増し、尿漏れも起きやすくなります。前駆陣痛と本陣痛の区別を意識する時期。",
    todoAndTips:
      "GBS（B群溶血性連鎖球菌）検査をこの頃に受けます。",
    checkup: "妊婦健診（GBS検査）",
  },
  {
    week: 36,
    trimester: 3,
    babySize: { lengthCm: "約47", weightG: "約2600" },
    babySizeComparison: "ロメインレタス",
    babyDevelopment:
      "胎毛や胎脂がほぼなくなり、皮膚が滑らかに。頭が骨盤に下りてくることがあります。肺のサーファクタント産生が十分なレベルに。",
    momChanges:
      "赤ちゃんが下がり、胃の圧迫が軽くなる一方で膀胱の圧迫が強まります。おしるし（少量の出血）がある人も。",
    todoAndTips:
      "妊婦健診が週1回に。入院準備の最終確認。バースプランを医師と共有しましょう。陣痛タクシーの登録も。",
    checkup: "妊婦健診（週1回に変更・NST・内診）",
  },
  {
    week: 37,
    trimester: 3,
    babySize: { lengthCm: "約48", weightG: "約2800" },
    babySizeComparison: "冬瓜",
    babyDevelopment:
      "正期産に入りました。肺が十分に成熟し、出産後すぐに呼吸できます。脂肪の蓄積が続き、1日約14gずつ体重が増加。",
    momChanges:
      "「おしるし」（粘液栓の排出）がある人も。前駆陣痛が増えます。骨盤の圧迫感が強くなります。",
    todoAndTips:
      "いつ陣痛が来てもよいように準備を。破水した場合の対処法を確認。",
    checkup: "妊婦健診（毎週・NST・内診）",
  },
  {
    week: 38,
    trimester: 3,
    babySize: { lengthCm: "約49", weightG: "約3000" },
    babySizeComparison: "かぼちゃ",
    babyDevelopment:
      "臓器がすべて成熟し、いつ生まれても問題ありません。胎便（最初の便）が腸に蓄積。握力が強くなっています。",
    momChanges:
      "子宮口が柔らかくなり始めます。むくみが最も強くなる時期。不規則な陣痛が増えることがあります。",
    todoAndTips:
      "リラックスして過ごしましょう。陣痛の間隔を計る練習を。",
    checkup: "妊婦健診（毎週）",
  },
  {
    week: 39,
    trimester: 3,
    babySize: { lengthCm: "約50", weightG: "約3100" },
    babySizeComparison: "小玉すいか",
    babyDevelopment:
      "脳と肺の最終成熟が進行中。免疫抗体を胎盤から受け取り、出生後の感染防御に備えます。",
    momChanges:
      "子宮口が少しずつ開き始める人も。眠れない夜が続くことがあります。体が出産に向けて準備モードに。",
    todoAndTips:
      "入院のタイミング（陣痛間隔10分・破水・出血等）を再確認。",
    checkup: "妊婦健診（毎週）",
  },
  {
    week: 40,
    trimester: 3,
    babySize: { lengthCm: "約50", weightG: "約3200" },
    babySizeComparison: "すいか",
    babyDevelopment:
      "出産予定日。すべての器官が完全に成熟。頭蓋骨の骨は重なり合えるようになっており、産道通過に適応しています。",
    momChanges:
      "子宮口の開大が進む人も。破水や規則的な陣痛がいつ起きてもおかしくない状態。おなかが下がった感じがはっきりします。",
    todoAndTips:
      "予定日を過ぎても焦らないで。初産の約半数は予定日を超えます。医師と経過観察の計画を確認しましょう。",
    checkup: "妊婦健診（毎週・NST・子宮口確認）",
  },
  {
    week: 41,
    trimester: 3,
    babySize: { lengthCm: "約51", weightG: "約3300〜3500" },
    babySizeComparison: "すいか（大）",
    babyDevelopment:
      "成長は緩やかになりますが、脳の発達は継続。爪が長く伸び、皮膚のシワが減ってふっくらしています。",
    momChanges:
      "予定日超過の不安を感じる時期。医師の管理のもと、NSTやエコーでの監視が続きます。",
    todoAndTips:
      "医師と誘発分娩（陣痛促進）のタイミングについて相談しましょう。リラックスして過ごすことが大切です。",
    checkup: "妊婦健診（週2回になることも・NST強化）",
  },
  {
    week: 42,
    trimester: 3,
    babySize: { lengthCm: "約51〜52", weightG: "約3400〜3600" },
    babySizeComparison: "すいか（特大）",
    babyDevelopment:
      "過期産の領域です。胎盤の機能が低下し始める可能性があるため、慎重な管理が必要。赤ちゃん自体の発達は十分に完了しています。",
    momChanges:
      "過期産のストレスや不安が増す時期。胎動の変化に注意を払いましょう。",
    todoAndTips:
      "42週までに多くの病院で誘発分娩を行います。胎動が減ったと感じたらすぐに受診してください。",
    checkup: "妊婦健診（連日管理・誘発分娩の検討）",
  },
];

// トリメスター情報
export const trimesterInfo = [
  {
    trimester: 1 as const,
    label: "第1期（初期）",
    weeks: "4〜13週",
    color: "rose",
    description:
      "赤ちゃんの主要な器官が形成される大切な時期。つわりが始まりますが、多くの方は12〜16週頃に楽になります。",
  },
  {
    trimester: 2 as const,
    label: "第2期（中期）",
    weeks: "14〜27週",
    color: "amber",
    description:
      "安定期に入り、体調が最も良い時期。胎動を感じ始め、赤ちゃんとの絆が深まります。",
  },
  {
    trimester: 3 as const,
    label: "第3期（後期）",
    weeks: "28〜42週",
    color: "emerald",
    description:
      "赤ちゃんが急速に成長し、出産に向けた準備が進みます。体への負担が増えますが、もうすぐ赤ちゃんに会えます。",
  },
];
