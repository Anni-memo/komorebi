import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "入院バッグ準備リスト｜陣痛バッグ・入院バッグ・赤ちゃん用",
  description:
    "出産入院に必要な持ち物を陣痛バッグ・入院バッグ・赤ちゃん用に分けて一覧化。36週までに準備を。チェックリスト付き。",
};

const laborBagItems = [
  { item: "母子手帳", note: "これがないと受付できないことも" },
  { item: "健康保険証", note: "コピーも財布に入れておくと安心" },
  { item: "診察券", note: "産院のもの" },
  { item: "携帯電話＋充電器", note: "長い陣痛中の連絡・気分転換に必須" },
  { item: "ペットボトル用ストローキャップ", note: "横になったまま飲めるので重宝します" },
  { item: "軽食（ゼリー飲料・おにぎり等）", note: "陣痛中のエネルギー補給に。食べやすいものを" },
  { item: "リップクリーム", note: "呼吸法で唇が乾燥しやすい" },
  { item: "テニスボール", note: "腰やおしりを押してもらうときに。痛みの緩和に役立ちます" },
  { item: "ヘアゴム・ヘアクリップ", note: "髪が長い方は必須" },
  { item: "フェイスタオル", note: "汗拭き用に数枚" },
];

const hospitalBagItems = [
  { item: "前開きパジャマ 2〜3枚", note: "授乳・診察がしやすい前開きタイプ。丈が長めだと安心" },
  { item: "産褥ショーツ 3枚", note: "クロッチ部分が開くタイプ。診察時にそのまま対応できます" },
  { item: "授乳ブラ 2〜3枚", note: "ワイヤーなしのソフトタイプが楽" },
  { item: "産褥パッド（お産パッド）", note: "産院で支給されることも多い。念のため確認を" },
  { item: "洗面用具", note: "歯ブラシ・歯磨き粉・洗顔料・化粧水など" },
  { item: "シャンプー・ボディソープ", note: "産院に備え付けがある場合も" },
  { item: "タオル（バス・フェイス）", note: "3枚ずつ程度あると安心" },
  { item: "退院時の自分の服", note: "お腹がまだ戻らないので、マタニティ服かゆったりした服を" },
  { item: "母乳パッド", note: "入院中から母乳が出始めることも" },
  { item: "骨盤ベルト", note: "産後すぐから使用できるタイプを用意" },
];

const babyItems = [
  { item: "肌着 2〜3枚", note: "短肌着＋コンビ肌着のセットが便利" },
  { item: "ツーウェイオール 1〜2枚", note: "退院時に着せるもの" },
  { item: "おくるみ 1枚", note: "退院時に包んであげます。季節に合った素材を" },
  { item: "おむつ（新生児用）", note: "病院で支給される場合も。事前に確認を" },
  { item: "ガーゼハンカチ 2〜3枚", note: "授乳時の口拭き・吐き戻し対策に" },
  { item: "チャイルドシート", note: "車で退院する場合は必須。事前に取り付けを練習しておくと安心" },
];

const niceToHaveItems = [
  { item: "延長コード（電源タップ）", note: "ベッド周りにコンセントが遠いことが多い。2〜3mあると便利" },
  { item: "S字フック", note: "ベッド柵にバッグを掛けられて便利" },
  { item: "ビニール袋（数枚）", note: "洗濯物・ゴミ入れに。何かと使えます" },
  { item: "耳栓・アイマスク", note: "大部屋の場合、他の赤ちゃんの泣き声で眠れないことも" },
  { item: "お気に入りのお菓子", note: "頑張った自分へのご褒美。個包装タイプが衛生的" },
  { item: "着圧ソックス", note: "産後はむくみやすいので、あると楽になります" },
  { item: "ミニ鏡", note: "面会時にさっと身だしなみチェック" },
  { item: "筆記用具＋メモ帳", note: "授乳時間の記録や、助産師さんのアドバイスをメモ" },
];

const checklistAll = [
  { category: "陣痛バッグ", items: laborBagItems },
  { category: "入院バッグ", items: hospitalBagItems },
  { category: "赤ちゃん用", items: babyItems },
  { category: "あると便利なもの", items: niceToHaveItems },
];

const confirmWithHospital = [
  "産褥パッド・お産パッドの支給はあるか",
  "おむつ・おしりふきの支給はあるか",
  "パジャマのレンタルはあるか",
  "シャンプー・ボディソープの備え付けはあるか",
  "タオルのレンタルはあるか",
  "ミルク・哺乳瓶の貸し出しはあるか",
  "円座クッションの貸し出しはあるか",
  "入院時に持参が必要な書類（同意書など）",
];

export default function HospitalBagPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">出産準備</Badge>
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">
                保存版
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              入院バッグ準備リスト
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              出産はいつ始まるかわかりません。余裕を持って準備しておくと、
              そのときが来ても落ち着いて行動できます。
            </p>
          </div>

          {/* いつまでに */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>📅</span>
                いつまでに準備する？
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">妊娠36週（臨月に入る前）まで</strong>に準備しておきましょう。
                早産の可能性もあるため、34週頃から少しずつ揃え始めると安心です。
                「陣痛バッグ」と「入院バッグ」の2つに分けておくと、いざというときスムーズです。
              </p>
            </CardContent>
          </Card>

          {/* 陣痛バッグ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🏃‍♀️</span>
              陣痛バッグ（すぐ持っていくもの）
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              陣痛が来たらすぐに持ち出すバッグです。最低限の貴重品＋陣痛を乗り越えるグッズを入れます。
            </p>
            <div className="space-y-2">
              {laborBagItems.map((item) => (
                <Card key={item.item} className="border-border/50 shadow-none">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-border shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.item}</p>
                        <p className="text-xs text-muted-foreground">{item.note}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 入院バッグ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>👜</span>
              入院バッグ（入院中に使うもの）
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              入院中の生活に必要なものです。パートナーや家族に後から持ってきてもらってもOK。
            </p>
            <div className="space-y-2">
              {hospitalBagItems.map((item) => (
                <Card key={item.item} className="border-border/50 shadow-none">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-border shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.item}</p>
                        <p className="text-xs text-muted-foreground">{item.note}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 赤ちゃん用 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>👶</span>
              赤ちゃん用
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              退院時に必要なものが中心です。入院中は病院の備品を使えることが多いです。
            </p>
            <div className="space-y-2">
              {babyItems.map((item) => (
                <Card key={item.item} className="border-border/50 shadow-none">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-border shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.item}</p>
                        <p className="text-xs text-muted-foreground">{item.note}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* あると便利なもの */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>✨</span>
              あると便利なもの
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              なくても困りませんが、あると入院生活がぐっと快適になるアイテムです。
            </p>
            <div className="space-y-2">
              {niceToHaveItems.map((item) => (
                <Card key={item.item} className="border-border/50 shadow-none">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-border shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.item}</p>
                        <p className="text-xs text-muted-foreground">{item.note}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 病院に確認すること */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🏥</span>
              病院に確認すること
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  病院によって支給・レンタルできるものが異なります。
                  入院前の説明会や健診時に確認しておきましょう。
                </p>
                <ul className="space-y-2">
                  {confirmWithHospital.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">&#9679;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* チェックリストまとめ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📋</span>
              チェックリストまとめ
            </h2>
            {checklistAll.map((group) => (
              <div key={group.category} className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">{group.category}</h3>
                <Card className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <ul className="space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item.item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded border border-border shrink-0" />
                          {item.item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </section>

          {/* 安心メッセージ + 免責事項 */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-4">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">
                完璧に準備できなくても大丈夫
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                足りないものがあっても、病院の売店やコンビニで買えたり、
                家族に持ってきてもらうこともできます。
                一番大事なのは母子手帳・保険証・携帯電話の3点。
                あとはなんとかなります。リラックスして、赤ちゃんに会える日を楽しみにしていてください。
              </p>
            </CardContent>
          </Card>

          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としています。
              病院・産院によって必要な持ち物や支給品は異なります。
              必ず通院先の案内をご確認のうえ準備してください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/postnatal-procedures" className={buttonVariants({ variant: "outline" })}>
              出産後の手続き一覧を見る
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
