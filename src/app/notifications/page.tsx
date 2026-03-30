import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    title: "児童手当の申請期限が近づいています",
    category: "手続き",
    time: "今日",
    description: "出生日から15日以内に申請が必要です。お住まいの自治体窓口で確認してください。",
    urgent: true,
  },
  {
    title: "1ヶ月健診の時期です",
    category: "健診",
    time: "今週",
    description: "産院または小児科で1ヶ月健診を受けましょう。",
    urgent: false,
  },
  {
    title: "新生児の睡眠についての記事が追加されました",
    category: "学び",
    time: "3日前",
    description: "あなたの時期に多い悩みをまとめた記事があります。",
    urgent: false,
  },
  {
    title: "保育園の申請時期が近づいています",
    category: "保活",
    time: "1週間前",
    description: "来年度の申請スケジュールを確認しておくと安心です。",
    urgent: false,
  },
];

export default function NotificationsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">通知</h1>
          <p className="text-muted-foreground mb-6">
            忘れやすいことを、やさしくお知らせします。
          </p>

          <div className="space-y-4">
            {notifications.map((n) => (
              <Card
                key={n.title}
                className={`border-border/50 shadow-none ${
                  n.urgent ? "border-l-4 border-l-komorebi-warm" : ""
                }`}
              >
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">
                      {n.title}
                    </h3>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {n.description}
                  </p>
                  <Badge variant="outline" className="text-xs">{n.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
