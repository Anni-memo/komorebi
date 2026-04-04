import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ArticleMeta } from "@/components/article-meta";

export const metadata = {
  title: "赤ちゃんの行事カレンダー｜お七夜・お宮参り・お食い初めなど",
  description:
    "お七夜、お宮参り、お食い初め、ハーフバースデー、初誕生日など、赤ちゃんの1年間の行事を時系列で解説。費用目安・準備物・やらなくてもOKな旨も。",
};

const timeline = [
  {
    timing: "生後7日",
    name: "お七夜・命名式",
    emoji: "🖊️",
    what: "赤ちゃんの名前をお披露目する行事です。命名書に名前を書き、家族でお祝いします。",
    cost: "0〜5,000円（命名書・お祝い膳）",
    prepare: ["命名書（テンプレートを印刷でもOK）", "お祝い膳（出前やテイクアウトで十分）"],
    note: "産後7日目はママの体がまだ回復途中。無理せず簡単に行うか、日をずらしても大丈夫です。",
  },
  {
    timing: "生後1ヶ月",
    name: "お宮参り",
    emoji: "⛩️",
    what: "赤ちゃんの健やかな成長を願い、地域の神社に参拝する行事です。",
    cost: "5,000〜10,000円（初穂料）＋衣装代・写真代",
    prepare: [
      "祝い着（レンタルもあり）",
      "初穂料（のし袋に入れて持参）",
      "授乳・おむつ替えセット",
    ],
    note: "生後1ヶ月ぴったりでなくても構いません。天候や体調に合わせて、生後2〜3ヶ月でも大丈夫です。",
  },
  {
    timing: "生後100日",
    name: "お食い初め（百日祝い）",
    emoji: "🍽️",
    what: "「一生食べ物に困りませんように」と願い、お祝い膳を用意して食べさせる真似をする行事です。実際には食べさせません。",
    cost: "3,000〜15,000円（お祝い膳）",
    prepare: [
      "祝い膳（尾頭付きの鯛、赤飯、煮物、吸い物、香の物）",
      "歯固め石（神社で拾うか、お食い初めセットに付属）",
      "食器（漆器が正式だが、離乳食用食器でもOK）",
    ],
    note: "宅配のお食い初めセットを利用すれば手軽に準備できます。レストランのプランもあります。",
  },
  {
    timing: "生後6ヶ月",
    name: "ハーフバースデー",
    emoji: "🎂",
    what: "生後半年をお祝いする、比較的新しいイベントです。正式な伝統行事ではありません。",
    cost: "0〜5,000円（飾り付け・ケーキ風離乳食）",
    prepare: [
      "飾り付け（100均のガーランドなどでOK）",
      "記念写真用の小物",
      "離乳食ケーキ（おかゆ＋野菜ペーストで手作り）",
    ],
    note: "SNSで見かけると「やらなきゃ」と思うかもしれませんが、やらなくても全然大丈夫。写真を1枚撮るだけでも十分な記念になります。",
  },
  {
    timing: "1歳",
    name: "初誕生日・一升餅・選び取り",
    emoji: "🎉",
    what: "1歳のお祝いです。一升餅を背負わせて歩かせる「餅踏み」や、将来を占う「選び取り」が人気です。",
    cost: "3,000〜10,000円（一升餅・選び取りカード・ケーキ）",
    prepare: [
      "一升餅（小分けタイプが後で分けやすい）",
      "選び取りカード（そろばん・筆・鏡などのカード）",
      "リュック（一升餅を入れて背負わせる用）",
      "バースデーケーキ（ヨーグルト＋フルーツで手作りも◎）",
    ],
    note: "一升餅は重い（約1.8kg）ので、泣いたり転んだりするのも微笑ましい恒例です。無理に立たせなくてOK。",
  },
  {
    timing: "3月3日 or 5月5日",
    name: "初節句",
    emoji: "🎏",
    what: "女の子は3月3日（桃の節句）にひな人形、男の子は5月5日（端午の節句）にかぶと・こいのぼりを飾ってお祝いします。",
    cost: "10,000〜100,000円以上（人形・飾り）",
    prepare: [
      "ひな人形 or かぶと飾り（コンパクトタイプも人気）",
      "ちらし寿司 or ちまき（大人用のお祝い膳）",
    ],
    note: "人形は祖父母が贈る慣習がありますが、家庭ごとに自由です。コンパクトサイズも増えています。生まれて間もない場合は翌年に回すこともあります。",
  },
  {
    timing: "12月〜1月",
    name: "初正月",
    emoji: "🎍",
    what: "赤ちゃんが初めて迎えるお正月です。女の子には羽子板、男の子には破魔弓を飾る風習があります。",
    cost: "5,000〜30,000円（羽子板 or 破魔弓）",
    prepare: ["羽子板 or 破魔弓（コンパクトケース入りが主流）"],
    note: "地域によって風習が異なります。必ずしも飾り物を用意しなくても、家族で健やかな新年をお祝いするだけで十分です。",
  },
];

export default function BabyEventsPage() {
  return (
    <>
      <ArticleJsonLd
        title="赤ちゃんの行事カレンダー｜お七夜・お宮参り・お食い初めなど"
        description="お七夜、お宮参り、お食い初め、ハーフバースデー、初誕生日など、赤ちゃんの1年間の行事を時系列で解説。費用目安・準備物・やらなくてもOKな旨も。"
        path="/learn/baby-events"
        datePublished="2026-03-30"
        dateModified="2026-04-05"
        tags={["赤ちゃん 行事", "お宮参り", "お食い初め"]}
      />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">行事・イベント</Badge>
              <Badge variant="secondary">0歳〜1歳</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              赤ちゃんの行事カレンダー
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              生まれてからの1年間には、さまざまなお祝い行事があります。
              全部やらなくても大丈夫。家族のペースで、できる範囲で楽しみましょう。
            </p>
          </div>

          {/* なぜ知っておくと安心か */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">
                なぜ知っておくと安心か
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                行事の全体像を把握しておくと、「いつ何を準備すればいいか」の見通しが立ちます。
                直前に慌てることなく、気持ちに余裕を持って準備できます。
                また、「知らなかった…」という後悔を減らすこともできます。
              </p>
            </CardContent>
          </Card>

          {/* 行事タイムライン */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📅</span>
              行事タイムライン
            </h2>
            <div className="space-y-4">
              {timeline.map((event) => (
                <Card key={event.name} className="border-border/50 shadow-none">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">{event.timing}</Badge>
                    </div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <span aria-hidden>{event.emoji}</span>
                      {event.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {event.what}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs font-medium text-foreground mb-1">費用目安</p>
                        <p className="text-xs text-muted-foreground">{event.cost}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs font-medium text-foreground mb-1">準備するもの</p>
                        <ul className="space-y-1">
                          {event.prepare.map((p) => (
                            <li key={p} className="text-xs text-muted-foreground flex items-start gap-1">
                              <span className="text-primary shrink-0">&#8226;</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">やらなくてもOK:</span>{" "}
                        {event.note}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 写真撮影のタイミング */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📸</span>
              写真撮影のタイミング
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    <div>
                      <strong className="text-foreground">ニューボーンフォト（生後2〜3週間）</strong>
                      — プロに頼む場合は産前に予約を。セルフ撮影でも素敵な記念になります。
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    <div>
                      <strong className="text-foreground">お宮参り（生後1ヶ月前後）</strong>
                      — スタジオ撮影と出張撮影があります。衣装レンタル付きプランも。
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    <div>
                      <strong className="text-foreground">100日祝い・ハーフバースデー</strong>
                      — スマホ撮影＋自宅飾り付けでも十分。月齢カードを添えると振り返りやすい。
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                    <div>
                      <strong className="text-foreground">初誕生日</strong>
                      — 一升餅や選び取りの瞬間は動画がおすすめ。ケーキスマッシュも人気です。
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">
                全部やらなくて大丈夫です
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                SNSを見ると、立派なお祝いをしている家庭が目に入るかもしれません。
                でも、行事はあくまでお祝いの「きっかけ」。形式にこだわる必要はありません。
                家族が笑顔でいられることが一番のお祝いです。
                できる範囲で、自分たちらしくお祝いしてあげてください。
              </p>
            </CardContent>
          </Card>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としています。
              行事の内容・費用・風習は地域や家庭によって異なります。
              ご家族の状況に合わせて、無理のない範囲でお祝いください。
            </p>
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn" className={buttonVariants({ variant: "outline" })}>
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
