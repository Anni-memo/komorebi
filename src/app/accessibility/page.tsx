import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "アクセシビリティ方針 | こもれび",
  description:
    "こもれびのアクセシビリティ方針。WCAG 2.1 AA準拠を目標に、すべての方が利用しやすいサービスを目指しています。",
};

const sections = [
  {
    id: "policy",
    title: "基本方針",
    content: `こもれびは、子育て中のすべての方が、障害の有無や利用環境にかかわらず、必要な情報にアクセスできるサービスを目指しています。

ウェブアクセシビリティの国際標準である WCAG（Web Content Accessibility Guidelines）2.1 の適合レベル AA を目標に、継続的な改善に取り組んでいます。`,
  },
  {
    id: "efforts",
    title: "主な取り組み",
    content: `こもれびでは、以下の取り組みを行っています。

・すべての画像に代替テキスト（alt属性）を設定しています
・キーボード操作のみでもサービスを利用できるようにしています
・十分なコントラスト比を確保し、文字の読みやすさに配慮しています
・見出し構造を適切に設定し、スクリーンリーダーでの読み上げに対応しています
・フォームには明確なラベルとエラーメッセージを表示しています
・レスポンシブデザインにより、さまざまな画面サイズに対応しています
・色だけに頼らない情報伝達を心がけています`,
  },
  {
    id: "scope",
    title: "対象範囲",
    content: `本方針は、こもれび（https://komorebi.constella-hd.co.jp/）で提供するすべてのウェブページを対象としています。

一部、外部サービスとの連携部分や、PDF等の添付ファイルについては、対応が十分でない場合があります。順次改善を進めてまいります。`,
  },
  {
    id: "environment",
    title: "動作確認環境",
    content: `以下の環境での動作を確認しています。

【ブラウザ】
・Google Chrome（最新版）
・Safari（最新版）
・Firefox（最新版）
・Microsoft Edge（最新版）

【スクリーンリーダー】
・VoiceOver（macOS / iOS）
・NVDA（Windows）`,
  },
  {
    id: "contact",
    title: "お問い合わせ",
    content: "",
    customContent: true,
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            アクセシビリティ方針
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            最終更新日：2026年4月4日
          </p>

          <div className="space-y-6">
            {sections.map((section) => (
              <Card
                key={section.id}
                id={section.id}
                className="border-border/50 shadow-none scroll-mt-20"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {section.customContent ? (
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                      <p>
                        アクセシビリティに関するご意見・ご要望・お困りのことがございましたら、以下までご連絡ください。
                      </p>
                      <p className="mt-3">
                        運営：
                        <a
                          href="https://constella-hd.co.jp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          コンステラHD株式会社
                        </a>
                      </p>
                      <p>
                        メール：
                        <a
                          href="mailto:contact@constella-hd.co.jp"
                          className="text-primary hover:underline"
                        >
                          contact@constella-hd.co.jp
                        </a>
                      </p>
                      <p className="mt-3">
                        いただいたご意見をもとに、サービスの改善に努めてまいります。
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      <p className="whitespace-pre-line">{section.content}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="text-sm text-primary hover:underline"
            >
              安心・運営情報に戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
