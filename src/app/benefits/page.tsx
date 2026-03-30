import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const benefits = [
  {
    title: "出産育児一時金",
    category: "給付",
    timing: "出産時",
    summary: "出産にかかる費用の負担を軽減するため、一定額が支給される制度。",
    audience: "出産を控えている方",
  },
  {
    title: "児童手当",
    category: "手当",
    timing: "出生後15日以内に申請",
    summary: "中学校卒業までの児童を養育している方に支給される手当。",
    audience: "すべての親",
  },
  {
    title: "育児休業給付金",
    category: "給付",
    timing: "育休開始後",
    summary: "育児休業中の所得を補填するための給付金。",
    audience: "会社員の方",
  },
  {
    title: "乳幼児医療費助成",
    category: "助成",
    timing: "出生後",
    summary: "乳幼児の医療費の自己負担分を助成する制度。地域により内容が異なる。",
    audience: "すべての親",
  },
  {
    title: "産前産後期間の保険料免除",
    category: "免除",
    timing: "出産予定日の前後",
    summary: "国民年金保険料が一定期間免除される制度。",
    audience: "自営業・フリーランスの方",
  },
];

export default function BenefitsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">制度を調べる</h1>
          <p className="text-muted-foreground mb-6">
            地域と状況に応じて、確認しておきたい制度を案内します。
          </p>

          <Card className="border-border/50 shadow-none mb-8">
            <CardContent className="pt-5">
              <p className="text-sm text-muted-foreground mb-3">
                お住まいの地域を設定すると、より正確な情報をお届けできます。
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="市区町村名を入力"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer"
              >
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {benefit.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {benefit.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>対象: {benefit.audience}</span>
                    <span>時期: {benefit.timing}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground leading-relaxed">
              制度の正式な要件や申請先は自治体で異なる場合があります。最終確認は、自治体窓口や公式案内とあわせて行うと安心です。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
