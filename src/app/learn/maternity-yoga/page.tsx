import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";

export const metadata = {
  title: "妊娠後期にできるマタニティヨガ｜安全なポーズと注意点 | こもれび",
  description:
    "妊娠後期（8〜10ヶ月）の妊婦さん向けに、自宅でできるマタニティヨガのポーズ・効果・注意点をわかりやすく解説。腰痛やむくみの緩和に。医師監修の安全ガイド付き。",
};

const benefits = [
  {
    title: "腰痛・肩こりの緩和",
    detail:
      "お腹が大きくなると重心が前に移り、腰や肩に負担がかかります。ヨガのゆるやかなストレッチで筋肉の緊張をほぐし、痛みを和らげます。",
  },
  {
    title: "むくみの改善",
    detail:
      "妊娠後期は血液量が増え、足のむくみが起こりやすくなります。ヨガで血行を促進し、リンパの流れを整えることでむくみを軽減できます。",
  },
  {
    title: "睡眠の質の向上",
    detail:
      "深い呼吸とゆったりした動きが副交感神経を優位にし、リラックス効果をもたらします。寝つきが良くなり、睡眠の質が改善されます。",
  },
  {
    title: "出産に向けた体力づくり",
    detail:
      "骨盤底筋や股関節周りの柔軟性を高めることで、出産時の体力と柔軟性を養います。呼吸法の練習は陣痛時のリラックスにも役立ちます。",
  },
  {
    title: "メンタルの安定",
    detail:
      "出産への不安やストレスを感じやすい時期です。ヨガの呼吸法と瞑想的な要素が心を穏やかにし、ポジティブな気持ちを保つ助けになります。",
  },
];

const safetyNotes = [
  {
    title: "必ず医師に相談してから始める",
    detail:
      "切迫早産、前置胎盤、妊娠高血圧症候群などの合併症がある場合、ヨガは控えるべきことがあります。かかりつけの産婦人科医に許可をもらってから始めましょう。",
  },
  {
    title: "お腹の張りを感じたらすぐ中止",
    detail:
      "ポーズの最中にお腹が張ったり、痛みを感じたら、無理せずすぐに中止してください。横になって休み、張りが治まらない場合は医療機関に連絡しましょう。",
  },
  {
    title: "仰向けのポーズは避ける",
    detail:
      "妊娠後期に仰向けになると、大きくなった子宮が下大静脈（体の右側を通る太い血管）を圧迫し、血圧低下やめまいを起こすことがあります（仰臥位低血圧症候群）。",
  },
  {
    title: "バランスを崩しやすいポーズに注意",
    detail:
      "お腹が大きくなると重心が変わり、転倒のリスクが高まります。壁やイスを支えにするなど、安全を確保しましょう。",
  },
  {
    title: "水分補給をこまめに",
    detail:
      "脱水は子宮収縮を引き起こすことがあります。ヨガの前後、途中でも意識的に水分を摂ってください。",
  },
  {
    title: "無理な深い前屈・ねじりは禁止",
    detail:
      "お腹を圧迫する深い前屈や、腹部を強くねじるポーズはNGです。お腹にゆとりを持たせた姿勢を心がけましょう。",
  },
];

const poses = [
  {
    name: "猫のポーズ（キャットカウ）",
    howTo: [
      "四つん這いになります。手は肩の真下、膝は腰の真下に置きます",
      "息を吐きながら、背中を丸めておへそを見るようにします（猫のポーズ）",
      "息を吸いながら、背中を軽く反らせて顔を上げます（牛のポーズ）",
      "この動きをゆっくり5〜8回繰り返します",
    ],
    effect: "腰痛の緩和、背骨の柔軟性向上、骨盤周りの血行促進",
    caution:
      "背中を反らせるときは、腰を反りすぎないように注意。お腹が苦しくなったら動きを小さくしましょう。",
    mistake:
      "手首の真上に肩がない状態で行うと、手首に負担がかかります。手の位置を確認してから始めてください。",
  },
  {
    name: "合蹠のポーズ（がっせき・バタフライ）",
    howTo: [
      "床に座り、足の裏同士をくっつけます",
      "両手で足先を持ち、背筋をまっすぐに伸ばします",
      "息を吐きながら、膝を床に向かってやさしく開きます（無理に押し下げないこと）",
      "この姿勢で深呼吸を5〜8回繰り返します",
    ],
    effect:
      "股関節の柔軟性向上、骨盤底筋のリラックス、内ももの血行促進",
    caution:
      "恥骨に痛みがある場合は控えてください。膝が床につかなくても問題ありません。クッションを膝の下に置くと楽になります。",
    mistake:
      "猫背のまま行うと効果が半減します。お尻の下にクッションを敷いて骨盤を立てると、自然と背筋が伸びます。",
  },
  {
    name: "壁を使ったスクワット（ウォールスクワット）",
    howTo: [
      "壁に背中をつけて立ち、足を肩幅より少し広めに開きます",
      "つま先はやや外側に向けます",
      "息を吐きながら、壁に沿ってゆっくり腰を落とします（膝が90度になる手前まで）",
      "息を吸いながら、ゆっくり元の位置に戻ります",
      "5〜8回繰り返します",
    ],
    effect:
      "脚力の強化、骨盤底筋のトレーニング、出産時に必要な下半身の筋力づくり",
    caution:
      "膝がつま先より前に出ないようにしましょう。腰を落としすぎず、自分が心地よいと感じる深さまでにしてください。",
    mistake:
      "足を閉じすぎるとお腹が苦しくなります。足幅を広めにとり、お腹のスペースを確保しましょう。",
  },
  {
    name: "横向きのリラックスポーズ（シャバーサナの代替）",
    howTo: [
      "体の左側を下にして横向きに寝ます",
      "下の腕を枕代わりにするか、クッションを頭の下に置きます",
      "上の足を前に出し、膝の下にクッションを挟みます",
      "目を閉じて、ゆっくり深い呼吸を10回以上繰り返します",
      "全身の力を抜いて、2〜5分間そのままリラックスします",
    ],
    effect:
      "全身のリラックス、血行の促進（左側を下にすることで心臓への血流が良くなります）、自律神経の調整",
    caution:
      "右側を下にしてもOKですが、左側のほうが血流の面で推奨されます。途中で苦しくなったら向きを変えて大丈夫です。",
    mistake:
      "クッションなしで横になると、腰や股関節に負担がかかります。膝の間と頭の下に必ずクッションを入れましょう。",
  },
  {
    name: "イスに座った前屈（チェアフォワードベンド）",
    howTo: [
      "安定したイスに浅く腰掛け、足を肩幅より広めに開きます",
      "両手を膝の上に置き、背筋を伸ばします",
      "息を吐きながら、お腹を太ももの間に通すようにして、ゆっくり上体を前に倒します",
      "手は床に向かって垂らすか、足首を軽く持ちます",
      "深呼吸を3〜5回してから、ゆっくり起き上がります",
    ],
    effect: "腰痛の緩和、背中の筋肉のストレッチ、リラックス効果",
    caution:
      "お腹を圧迫しないよう、足を十分に開いてスペースをつくることが大切です。頭がクラクラしたらすぐに起き上がりましょう。",
    mistake:
      "勢いよく前に倒れると立ちくらみの原因になります。ゆっくり、呼吸に合わせて動きましょう。",
  },
];

const ngPoses = [
  {
    name: "完全な仰向けのポーズ",
    reason:
      "仰臥位低血圧症候群のリスクがあります。大きな子宮が下大静脈を圧迫し、めまい・吐き気・血圧低下を引き起こす可能性があります。",
  },
  {
    name: "深いねじりのポーズ（ツイスト系）",
    reason:
      "腹部を強く圧迫・ねじることで、子宮への血流が減少する恐れがあります。ねじりは胸から上の軽いものに留めてください。",
  },
  {
    name: "うつ伏せのポーズ",
    reason:
      "お腹を直接圧迫するため、妊娠後期には絶対に避けてください。",
  },
  {
    name: "逆転のポーズ（頭立ち・肩立ち）",
    reason:
      "転倒のリスクが非常に高く、バランスを崩した際の衝撃が胎児に影響する可能性があります。",
  },
  {
    name: "深い後屈（バックベンド）",
    reason:
      "腹直筋離開（お腹の筋肉が左右に開く状態）を悪化させるリスクがあります。妊娠後期は腹筋が引き伸ばされているため、さらなる負荷は避けましょう。",
  },
];

const frequencyGuide = {
  frequency: "週2〜3回",
  duration: "1回15〜30分",
  bestTime: "体調が良い時間帯（午前中がおすすめ）",
  notes: [
    "毎日行う必要はありません。体調と相談しながら、無理のないペースで続けましょう",
    "食後すぐは避け、1〜2時間あけてから行いましょう",
    "体調が優れない日は休んでOK。「やらなければ」というプレッシャーは不要です",
    "ヨガの前後に水分をしっかり摂りましょう",
    "室温は暖かすぎず寒すぎない、快適な温度で行いましょう",
  ],
};

const faq = [
  {
    q: "妊娠何ヶ月からマタニティヨガを始められますか？",
    a: "一般的には安定期（妊娠16週〜）以降が推奨されています。ただし、必ず医師に相談してから始めてください。妊娠後期から始める場合でも、無理のない範囲であれば問題ありません。",
  },
  {
    q: "ヨガの経験がまったくないのですが大丈夫ですか？",
    a: "はい、大丈夫です。この記事で紹介しているポーズはすべて初心者向けです。ゆっくり深呼吸しながら、気持ちいいと感じる範囲で行ってください。",
  },
  {
    q: "お腹が張ったらどうすればいいですか？",
    a: "すぐにポーズを中止して、横向きに休んでください。30分以上張りが治まらない、定期的に張りが来る、出血があるなどの場合は、すぐに医療機関に連絡してください。",
  },
  {
    q: "毎日やったほうがいいですか？",
    a: "毎日やる必要はありません。週2〜3回、1回15〜30分程度が目安です。体調が悪い日は無理せず休みましょう。続けることより、安全に楽しむことが大切です。",
  },
  {
    q: "マタニティヨガで逆子は直りますか？",
    a: "医学的に「ヨガで逆子が直る」というエビデンスは確立されていません。逆子の対処については、かかりつけの産婦人科医に相談してください。",
  },
];

export default function MaternityYogaPage() {
  return (
    <>
      <ArticleJsonLd
        title="妊娠後期にできるマタニティヨガ｜安全なポーズと注意点"
        description="妊娠後期（8〜10ヶ月）の妊婦さん向けに、自宅でできるマタニティヨガのポーズ・効果・注意点をわかりやすく解説。"
        path="/learn/maternity-yoga"
        datePublished="2026-03-31"
        tags={["マタニティヨガ", "妊娠後期", "妊婦 運動", "安全", "腰痛", "むくみ"]}
        faq={faq.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">運動・ヨガ</Badge>
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge variant="secondary">5分で読める</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              妊娠後期にできるマタニティヨガ
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              「お腹が大きくなって、運動できない...」「腰痛やむくみがつらい...」
              そんな妊娠後期のお悩みに、自宅で安全にできるマタニティヨガをご紹介します。
              初心者でもすぐに始められるポーズばかりです。無理なく、ゆったりとした時間を過ごしましょう。
            </p>
          </div>

          {/* 大切なお知らせ */}
          <Card className="border-primary/30 bg-primary/5 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">
                始める前に必ずお読みください
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                マタニティヨガは多くの妊婦さんに安全な運動ですが、
                <strong className="text-foreground">必ずかかりつけの産婦人科医に相談してから</strong>
                始めてください。切迫早産・前置胎盤・妊娠高血圧症候群などの合併症がある場合は控えるべきことがあります。
                体調に少しでも不安を感じたら、無理をせず中止してください。
              </p>
            </CardContent>
          </Card>

          {/* メリット */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🌿</span>
              妊娠後期にヨガをするメリット
            </h2>
            <div className="space-y-3">
              {benefits.map((item) => (
                <Card key={item.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 安全に行うための注意点 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🩺</span>
              安全に行うための注意点
            </h2>
            <Card className="bg-red-50 border-red-200 shadow-none mb-4">
              <CardContent className="pt-5">
                <p className="text-sm text-red-800 leading-relaxed">
                  以下の場合は<strong>すぐに中止</strong>して、医療機関に連絡してください：
                  お腹の強い張り・出血・破水・激しい頭痛・視野の異常・息切れ・胎動の減少
                </p>
              </CardContent>
            </Card>
            <div className="space-y-3">
              {safetyNotes.map((note, i) => (
                <Card key={note.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {note.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {note.detail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ヨガポーズ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🧘</span>
              自宅でできるマタニティヨガ 5つのポーズ
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-4">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  すべてのポーズに共通する大切なこと：
                  <strong className="text-foreground">ゆっくり呼吸すること</strong>と
                  <strong className="text-foreground">痛みを感じたらすぐやめること</strong>です。
                  「気持ちいい」と感じる範囲で行ってください。
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {poses.map((pose, i) => (
                <Card key={pose.name} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
                        {i + 1}
                      </span>
                      <h3 className="font-bold text-foreground">
                        {pose.name}
                      </h3>
                    </div>

                    {/* やり方 */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-primary mb-2">
                        やり方
                      </p>
                      <ol className="space-y-1.5">
                        {pose.howTo.map((step, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-primary font-medium shrink-0">
                              {j + 1}.
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* 効果 */}
                    <div className="mb-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-xs font-semibold text-green-700 mb-1">
                        効果
                      </p>
                      <p className="text-sm text-green-800">{pose.effect}</p>
                    </div>

                    {/* 注意点 */}
                    <div className="mb-3 p-3 bg-amber-50 rounded-lg">
                      <p className="text-xs font-semibold text-amber-700 mb-1">
                        注意点
                      </p>
                      <p className="text-sm text-amber-800">{pose.caution}</p>
                    </div>

                    {/* よくある間違い */}
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-xs font-semibold text-red-700 mb-1">
                        よくある間違い
                      </p>
                      <p className="text-sm text-red-800">{pose.mistake}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* NGポーズ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#10060;</span>
              やってはいけないNGポーズ
            </h2>
            <div className="space-y-3">
              {ngPoses.map((pose) => (
                <Card
                  key={pose.name}
                  className="border-red-200 bg-red-50/50 shadow-none"
                >
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-red-800 text-sm mb-1">
                      {pose.name}
                    </h3>
                    <p className="text-sm text-red-700 leading-relaxed">
                      {pose.reason}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 頻度・時間の目安 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#128337;</span>
              頻度・時間の目安
            </h2>
            <Card className="border-border/50 shadow-none mb-4">
              <CardContent className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">頻度</p>
                    <p className="font-bold text-foreground">
                      {frequencyGuide.frequency}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      1回の時間
                    </p>
                    <p className="font-bold text-foreground">
                      {frequencyGuide.duration}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      おすすめの時間帯
                    </p>
                    <p className="font-bold text-foreground">
                      {frequencyGuide.bestTime}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {frequencyGuide.notes.map((note) => (
                    <li
                      key={note}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5 shrink-0">
                        &#9679;
                      </span>
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* よくある質問 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#10067;</span>
              よくある質問
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <Card key={item.q} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold text-foreground text-sm mb-2">
                      Q. {item.q}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* まとめ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>&#127807;</span>
              まとめ
            </h2>
            <Card className="border-primary/30 bg-primary/5 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  妊娠後期は体が重く、動くのがおっくうになりがちです。
                  でも、ゆったりとしたマタニティヨガなら、安全に体をほぐしながら心もリラックスできます。
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  大切なのは<strong className="text-foreground">「がんばりすぎないこと」</strong>。
                  1つのポーズだけでも、深い呼吸だけでもOKです。
                  自分の体と赤ちゃんの声に耳を傾けながら、心地よいペースで続けてみてください。
                </p>
                <p className="text-sm text-foreground font-medium">
                  あなたの体が「気持ちいい」と感じることが、いちばんの正解です。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 1分で読める要約 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              1分で読める要約
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    妊娠後期のヨガは、腰痛・むくみの緩和、睡眠改善、出産準備に効果的
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    始める前に必ず医師に相談。お腹の張りを感じたらすぐ中止
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    おすすめポーズ：猫のポーズ、合蹠のポーズ、壁スクワット、横向きリラックス、イス前屈
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    仰向け・うつ伏せ・深いねじり・逆転のポーズはNG
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">&#10003;</span>
                    週2〜3回、1回15〜30分が目安。無理せず自分のペースで
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考情報
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 日本マタニティフィットネス協会.
                    &quot;マタニティヨガガイドライン.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 日本産科婦人科学会.
                    &quot;妊婦の運動に関する推奨事項.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> ACOG (American College of
                    Obstetricians and Gynecologists). &quot;Physical Activity and Exercise During
                    Pregnancy and the Postpartum Period.&quot; Committee Opinion No. 804, 2020.
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> 厚生労働省.
                    &quot;妊産婦のための食生活指針（運動に関する項目）.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としており、医療アドバイスや診断に代わるものではありません。
              マタニティヨガを始める前に、必ずかかりつけの産婦人科医にご相談ください。
              体調に異変を感じた場合は、すぐに中止して医療機関を受診してください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/mental-care"
              className={buttonVariants({ variant: "outline" })}
            >
              産後のメンタルケアを読む
            </Link>
            <Link
              href="/learn"
              className={buttonVariants({ variant: "ghost" })}
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
