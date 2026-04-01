import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    id: "about",
    title: "このサービスについて",
    content: `こもれびは、子育ての負担と不安を減らし、子に向ける時間を増やすための案内所です。

AIコンシェルジュがあなたの状況を整理し、今必要な情報・手続き・準備・相談先を案内します。

投稿中心のSNSではなく、「今やるべきことが見える」ことを中心に設計しています。`,
  },
  {
    id: "name",
    title: "『こもれび』の由来",
    content: `「こもれび」は、木々の葉の間からやわらかく差し込む光——木漏れ日に由来しています。

子育ては、先の見えない森の中を歩いているような気持ちになることがあります。
でも、ふと見上げると、葉の隙間から静かに光が差し込んでいる。

このサービスが、そんな一筋の光のような存在でありたい。
すべてを照らすのではなく、今の一歩を照らす。
不安のなかにいても、「大丈夫、次はこれをすればいい」と思えるような。

こもれびは、完璧な答えではなく、あなたのそばにある静かな案内所を目指しています。`,
  },
  {
    id: "ai",
    title: "AI利用について",
    content: `このサービスでは、AIを使ってユーザーの状況に合った情報を整理・案内しています。

AIは以下のことを行います：
・質問への回答をもとに、優先度の高い情報を整理する
・状況に合った制度や記事を提案する
・相談内容を読みやすく整える補助をする

AIは以下のことを行いません：
・医療的な診断や判断
・制度の申請可否の断定
・個人を特定する分析`,
  },
  {
    id: "privacy",
    title: "個人情報の扱い",
    content: `ユーザーの情報は、サービスの案内精度を高めるためにのみ使用します。

・入力された情報は暗号化して保存します
・第三者への提供は行いません
・いつでも情報の削除を請求できます
・匿名での利用も可能です`,
  },
  {
    id: "medical",
    title: "医療・制度に関する注意事項",
    content: `このサービスで提供する情報は、一般的な参考情報です。

・医療に関する最終判断は、必ず医師にご相談ください
・制度の申請条件や手続きは自治体によって異なります
・最新の正確な情報は、公式窓口で確認してください

このサービスは、必要な窓口や情報にたどり着くための案内を目的としています。`,
  },
  {
    id: "operator",
    title: "運営者情報",
    content: `運営：コンステラHD株式会社
ウェブサイト：https://constella-hd.co.jp
お問い合わせ：contact@constella-hd.co.jp

ご質問・ご要望・コンテンツの監修に関するご連絡は、上記メールアドレスまでお気軽にお問い合わせください。`,
  },
  {
    id: "terms",
    title: "利用規約",
    content: `本サービスの利用にあたっては、以下の事項にご同意ください。

・提供される情報は参考情報であり、正確性を保証するものではありません
・AI による案内は補助的なものであり、最終判断はご自身で行ってください
・他のユーザーへの誹謗中傷や不適切な投稿はお控えください
・サービスの改善のため、匿名化されたデータを分析に使用する場合があります`,
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            安心・運営情報
          </h1>

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
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
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
