import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

const tabs = ["必需品", "あれば助かる", "まだ急がない", "月齢別", "悩み別"];

const items = [
  {
    name: "ベビーベッド / ベビー布団",
    category: "必需品",
    scene: "睡眠環境の確保",
    audience: "すべての家庭",
    reviews: 128,
    href: undefined as string | undefined,
  },
  {
    name: "おむつ（新生児用）",
    category: "必需品",
    scene: "日常のお世話",
    audience: "すべての家庭",
    reviews: 256,
    href: undefined as string | undefined,
  },
  {
    name: "抱っこ紐",
    category: "必需品",
    scene: "外出・寝かしつけ",
    audience: "すべての家庭",
    reviews: 189,
    href: "/prepare/baby-carrier",
  },
  {
    name: "ベビーカー",
    category: "必需品",
    scene: "外出・散歩",
    audience: "すべての家庭",
    reviews: 172,
    href: "/prepare/stroller",
  },
  {
    name: "チャイルドシート",
    category: "必需品",
    scene: "車での移動",
    audience: "車を使う家庭",
    reviews: 156,
    href: "/prepare/childseat",
  },
  {
    name: "おしりふき",
    category: "必需品",
    scene: "日常のお世話",
    audience: "すべての家庭",
    reviews: 210,
    href: "/prepare/wipes",
  },
  {
    name: "授乳クッション",
    category: "あれば助かる",
    scene: "授乳・妊娠中の睡眠",
    audience: "母乳・混合育児の家庭",
    reviews: 134,
    href: "/prepare/nursing-pillow",
  },
  {
    name: "バウンサー",
    category: "あれば助かる",
    scene: "家事中の見守り",
    audience: "ワンオペになりやすい家庭",
    reviews: 95,
    href: undefined as string | undefined,
  },
  {
    name: "電動鼻吸い器",
    category: "あれば助かる",
    scene: "風邪・鼻詰まりのとき",
    audience: "すべての家庭",
    reviews: 143,
    href: undefined as string | undefined,
  },
  {
    name: "ベビーモニター",
    category: "あれば助かる",
    scene: "別室での見守り",
    audience: "部屋数が多い家庭",
    reviews: 67,
    href: undefined as string | undefined,
  },
];

export default function PreparePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">準備する</h1>
          <p className="text-muted-foreground mb-6">
            必要なものを、今の状況に合わせて整理しています。
            <br />
            量より「今の自分に必要かどうか」で考えると楽になります。
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <Badge
                key={tab}
                variant={tab === "必需品" ? "default" : "outline"}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/5 transition-colors"
              >
                {tab}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            {items.map((item) => {
              const cardContent = (
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <div className="flex gap-2 shrink-0">
                      {item.href && (
                        <Badge variant="outline" className="text-xs">
                          比較ガイドあり
                        </Badge>
                      )}
                      <Badge
                        variant={item.category === "必需品" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>使用シーン: {item.scene}</span>
                    <span>向いている家庭: {item.audience}</span>
                    <span>レビュー {item.reviews}件</span>
                  </div>
                </CardContent>
              );

              return item.href ? (
                <Link key={item.name} href={item.href} className="block">
                  <Card className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer">
                    {cardContent}
                  </Card>
                </Link>
              ) : (
                <Card
                  key={item.name}
                  className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer"
                >
                  {cardContent}
                </Card>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/concierge" className={buttonVariants({ variant: "outline" })}>
              AIに今必要なものだけ聞く
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
