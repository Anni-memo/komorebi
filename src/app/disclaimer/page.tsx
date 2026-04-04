import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "免責事項 | こもれび",
  description:
    "こもれびの免責事項。医療情報・制度情報の利用に関する注意事項をご確認ください。",
};

const sections = [
  {
    id: "medical",
    title: "医療・健康情報について",
    content: `本サービスで提供する医療・健康に関する情報は、一般的な参考情報として作成されています。

・医師やその他医療従事者による診断・治療の代替を目的としたものではありません
・個々の症状や状況に対する医学的助言を提供するものではありません
・お子さまの健康について気になることがある場合は、必ず医師にご相談ください
・緊急時は迷わず医療機関を受診してください`,
  },
  {
    id: "accuracy",
    title: "情報の正確性について",
    content: `本サービスの情報は、公的機関・医学文献・専門家の見解をもとに作成してい���す。

・情報の正確性・完全性・最新性を保証するものではありません
・医学知見や制度は変更される場合があります
・参考文献がある記事では出典を明記していますが、最新の正確な情報は公式窓口でご確認ください`,
  },
  {
    id: "benefits",
    title: "制度・給付金情報について",
    content: `本サービスで紹介する制度や給付金に関する情報は、一般的な制度概要を整理したものです。

・自治体によって制度の内容・対象・申請方法が異なる場合があります
・申請の可否や給付額を保証するものではありません
・最新の情報は、お住まいの自治体窓口でご確認ください`,
  },
  {
    id: "ai",
    title: "AIによる案内について",
    content: `本サービスのAIコンシェルジュは、ユーザーの状況に合った情報を整理・案内する補助ツールです。

・AIの回答は参考情報であり、専門家の助言に代わるものではありません
・AIの回答内容の正確性を保証するものではありません
・重要な判断は、必ず専門家（医師・自治体窓口等）にご相談ください`,
  },
  {
    id: "products",
    title: "商品情報・アフィリエイトについて",
    content: `本サービスでは、育児用品の比較・紹介記事にアフィリエイトリンクを掲載する場合があります。

・商品の価格・仕様・在庫状況は変更される場合があります
・商品の購入・使用に関する責任は購入者に帰属します
・リンク先のサービスの利用規約・プライバシーポリシーは各サービスに準じます`,
  },
  {
    id: "liability",
    title: "責任の制限",
    content: `本サービスの情報の利用により生じたいかなる損害についても、運営者は責任を負いかねます。

・情報の利用は、利用者ご自身の判断と責任で行ってください
・本サービスの利用に起因する直接的・間接的な損害について、運営者は一切の責任を負いません`,
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">免責事項</h1>
          <p className="text-sm text-muted-foreground mb-6">
            最終更新日：2026年4月5日
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
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="whitespace-pre-line">{section.content}</p>
                  </div>
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
