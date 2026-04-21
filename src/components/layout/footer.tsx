import Link from "next/link";

const footerLinks = [
  {
    title: "サービス",
    links: [
      { href: "/concierge", label: "AIコンシェルジュ" },
      { href: "/learn", label: "学ぶ" },
      { href: "/qa", label: "相談する" },
      { href: "/benefits", label: "制度を調べる" },
      { href: "/prepare", label: "準備する" },
    ],
  },
  {
    title: "サポート",
    links: [
      { href: "/about", label: "このサービスについて" },
      { href: "/about/editorial-policy", label: "編集方針・監修体制" },
      { href: "/about#ai", label: "AI利用について" },
      { href: "/about#privacy", label: "個人情報の扱い" },
      { href: "/privacy", label: "プライバシーポリシー" },
      { href: "/about#terms", label: "利用規約" },
      { href: "/disclaimer", label: "免責事項" },
      { href: "/accessibility", label: "アクセシビリティ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg" aria-hidden>
                🌿
              </span>
              <span className="font-semibold text-foreground">こもれび</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              子育ての負担と不安を減らし、
              <br />
              子に向ける時間を増やす。
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-foreground mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} こもれび. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
