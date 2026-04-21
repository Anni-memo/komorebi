import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "編集方針・監修体制 | こもれび",
  description:
    "こもれびの記事は、厚生労働省・学会ガイドライン等の一次情報に基づいて作成しています。情報源・編集プロセス・AI活用の範囲・医療監修体制を公開しています。",
};

const sections = [
  {
    id: "principle",
    title: "編集の理念",
    content: `こもれびは、「子育ての負担と不安を減らし、子に向ける時間を増やす」ことを目的に情報を発信しています。

記事の執筆にあたっては、以下の3つを大切にしています。

・正確であること：公的機関・学会ガイドライン・査読付き研究など、検証可能な一次情報をもとに書きます
・中立であること：商品・サービスに偏らず、選択肢とリスク・リターンを整理して伝えます
・寄り添うこと：情報量の多さより、今の一歩を照らす「整理感」を優先します`,
  },
  {
    id: "sources",
    title: "情報源のヒエラルキー",
    content: `記事の内容は、以下の優先順位で情報源を選んでいます。

1. 公的機関の公式情報
   厚生労働省、こども家庭庁、国立成育医療研究センター、自治体の公式資料等

2. 学会ガイドライン・公式見解
   日本小児科学会、日本産科婦人科学会、日本小児アレルギー学会、日本眼科医会、日本小児歯科学会等

3. 査読付き医学文献
   NEJM、Lancet、JAMA、Pediatrics、医学中央雑誌の収載誌等

4. 国際機関の資料
   WHO、CDC、NICE（英国）、AAP（米国小児科学会）等

5. 公的統計・調査
   乳幼児身体発育調査、国民健康・栄養調査等

二次情報（まとめサイト・個人ブログ等）は、一次情報への導線としてのみ参照し、記事本文の根拠には用いません。`,
  },
  {
    id: "process",
    title: "編集プロセス",
    content: `記事は以下のプロセスで制作・公開しています。

1. 企画：保護者が直面する課題・疑問から、取り上げるテーマを選定
2. リサーチ：上記ヒエラルキーに沿って一次情報を収集・整理
3. 執筆：AI支援と人間編集者の協働により、読みやすく正確な文章を作成
4. 検証：すべての数値・主張について情報源と照合
5. 公開：記事本文末尾に「出典・参考文献」を明記
6. 更新：ガイドライン改定や制度変更を確認し、定期的に最終更新日を更新

公開後も、読者からのご指摘・新しい知見・制度変更があれば、速やかに修正・更新を行います。`,
  },
  {
    id: "ai",
    title: "AI活用の範囲と人間チェック",
    content: `こもれびでは、記事制作の効率化・品質向上のために生成AI（Claude等）を活用しています。AIが担当するのは、主に以下の作業です。

・下書きの作成・構成案の提示
・情報源からの要約・整理
・読みやすさの向上（文章の調整）
・関連情報の抽出

AIが生成した内容は、公開前に必ず人間の編集者が以下の観点でチェックします。

・情報源との整合性（事実の誤り・数値の誤りがないか）
・最新性（古いガイドラインを引用していないか）
・中立性（特定の商品・サービスに誘導していないか）
・読者への配慮（不安を煽る表現・断定的な表現がないか）

AIコンシェルジュ機能（ユーザーとの対話）で提供される情報も同様に、一次情報に基づく監修済みコンテンツを起点として応答しています。`,
  },
  {
    id: "medical",
    title: "医療監修体制",
    content: `医療に関する記事は、公的機関の最新ガイドラインおよび学会公式見解に準拠して作成しています。

現時点では、個別記事ごとの医師による事前監修体制は準備中です。このため、記事ページには以下の対応を行っています。

・準拠したガイドライン・参考文献を記事末尾に明示
・最終更新日を記事冒頭に表示
・医療的な最終判断は必ず医師に相談する旨の注意事項を掲載
・読者・医療関係者からのご指摘窓口を設置

今後、協力医師のアドバイザリーボード体制を整備し、医療カテゴリの記事については段階的に監修医の明記を進めていきます。監修をご希望・ご協力いただける医師の方は、末尾のお問い合わせ窓口までご連絡ください。`,
  },
  {
    id: "commercial",
    title: "商業的関係・利益相反の開示",
    content: `こもれびは、サービス運営費を賄うため、以下の収益源を利用する場合があります。

・アフィリエイト（Amazonアソシエイト等）：商品比較記事で紹介する商品にアフィリエイトリンクを含む場合があります
・広告表示：記事の内容に影響しない範囲で将来的に検討する可能性があります

いずれの場合も、以下を遵守します。

・記事の内容・推奨は、商業的利益ではなく情報の有用性で決定します
・アフィリエイトリンクを含むページでは、その旨を明記します
・広告主が記事の編集内容に介入することはありません

現時点では、特定の医療機関・製薬会社・製品企業からの後援・依頼は受けていません。将来このような関係が生じた場合、該当記事に明示します。`,
  },
  {
    id: "correction",
    title: "訂正・更新の仕組み",
    content: `記事に事実の誤り・ガイドラインとの不整合・古い情報等を発見された場合、以下の方法でご連絡ください。

・お問い合わせフォーム：末尾のメールアドレス
・ご指摘いただいた内容は、運営チームで一次情報と照合のうえ、必要があれば速やかに修正します
・重要な修正を行った場合、該当記事の最終更新日を更新します
・継続的な改善のため、読者からのフィードバックを歓迎しています`,
  },
  {
    id: "contact",
    title: "お問い合わせ",
    content: "",
    isContact: true,
  },
];

export default function EditorialPolicyPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            編集方針・監修体制
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            最終更新日：2026年4月21日
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            こもれびの記事がどんな基準・情報源・プロセスで作られているかを公開しています。
            医療・制度に関する情報は、公的機関および学会ガイドラインに準拠し、定期的に更新しています。
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
                  {section.isContact ? (
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                      <p>
                        編集方針・記事内容のご指摘・監修ご協力のご相談は、以下までご連絡ください。
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

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/about"
              className="text-sm text-primary hover:underline"
            >
              ← 安心・運営情報に戻る
            </Link>
            <Link
              href="/disclaimer"
              className="text-sm text-primary hover:underline"
            >
              免責事項
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-primary hover:underline"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
