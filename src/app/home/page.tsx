import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    title: "あなたの今やること",
    icon: "📋",
    items: [
      { label: "児童手当の申請を確認する", tag: "手続き", href: "/benefits" },
      { label: "出生届の提出期限を確認する", tag: "手続き", href: "/benefits" },
      { label: "産後の体調管理について読む", tag: "学び", href: "/learn" },
    ],
  },
  {
    title: "近いうちに必要なこと",
    icon: "📅",
    items: [
      { label: "1ヶ月健診の準備", tag: "健診", href: "/learn" },
      { label: "保育園の情報収集を始める", tag: "保活", href: "/learn" },
    ],
  },
  {
    title: "使えるかもしれない制度",
    icon: "🏛️",
    items: [
      { label: "出産育児一時金", tag: "給付", href: "/benefits" },
      { label: "育児休業給付金", tag: "給付", href: "/benefits" },
      { label: "地域の子育て支援センター", tag: "支援", href: "/benefits" },
    ],
  },
  {
    title: "先に読んでおくと安心な記事",
    icon: "📖",
    items: [
      { label: "新生児の睡眠パターンを知る", tag: "睡眠", href: "/learn" },
      { label: "授乳の基本と困ったとき", tag: "食事", href: "/learn" },
    ],
  },
  {
    title: "同じ悩みの相談",
    icon: "💬",
    items: [
      { label: "夜泣きがつらいです...", tag: "睡眠", href: "/qa" },
      { label: "保活はいつから始めましたか？", tag: "保活", href: "/qa" },
    ],
  },
  {
    title: "用意しておくと楽になるもの",
    icon: "🛒",
    items: [
      { label: "必需品チェックリスト", tag: "準備", href: "/prepare" },
      { label: "あると助かるもの一覧", tag: "準備", href: "/prepare" },
    ],
  },
];

export default function PersonalHomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/10">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-foreground mb-1">
              おかえりなさい
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">0歳</Badge>
              <Badge variant="secondary" className="text-xs">第一子</Badge>
              <Badge variant="secondary" className="text-xs">共働き</Badge>
            </div>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <Card key={section.title} className="border-border/50 shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span aria-hidden>{section.icon}</span>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group"
                        >
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {item.label}
                          </span>
                          <Badge variant="outline" className="text-xs shrink-0 ml-2">
                            {item.tag}
                          </Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/concierge" className={buttonVariants({ variant: "outline", className: "flex-1" })}>
              AIに追加で相談する
            </Link>
            <Link href="/mypage" className={buttonVariants({ variant: "ghost", className: "flex-1" })}>
              プロフィールを更新する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
