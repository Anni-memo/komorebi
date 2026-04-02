import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const sections = [
  {
    title: "はじめに",
    content: `コンステラHD株式会社（以下「当社」）は、子育て支援プラットフォーム「こもれび」（以下「本サービス」）におけるユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。`,
  },
  {
    title: "収集する情報",
    content: `本サービスでは、以下の情報を収集することがあります。

・メールアドレス（アカウント登録・ログイン時）
・お子さまの月齢（パーソナライズされた情報提供のため）
・地域情報（お住まいの自治体に応じた制度案内のため）
・利用履歴（閲覧した記事、AIコンシェルジュとのやり取り等）`,
  },
  {
    title: "情報の利用目的",
    content: `収集した情報は、以下の目的で利用します。

・本サービスの提供および運営
・ユーザーの状況に応じた情報のパーソナライズ
・通知の配信（制度の申請期限、お子さまの月齢に応じた案内等）
・サービスの改善および新機能の開発
・お問い合わせへの対応`,
  },
  {
    title: "情報の第三者提供",
    content: `当社は、ユーザーの個人情報を原則として第三者に提供しません。

ただし、以下の場合を除きます。
・法令に基づく場合
・人の生命、身体または財産の保護のために必要な場合
・ユーザーの同意がある場合`,
  },
  {
    title: "情報の管理",
    content: `当社は、ユーザーの個人情報を適切に管理するため、以下の措置を講じています。

・SSL/TLS暗号化通信によるデータの保護
・Supabase（クラウドデータベースサービス）による安全なデータ保管
・アクセス権限の適切な管理
・不正アクセス防止のためのセキュリティ対策`,
  },
  {
    title: "Cookie・アクセス解析",
    content: `本サービスでは、サービスの利用状況を把握し改善するため、Vercel Analyticsを使用しています。

Vercel Analyticsはプライバシーに配慮した解析ツールであり、Cookieを使用せず、個人を特定する情報は収集しません。

なお、本サービスではGoogle Analyticsは使用していません。`,
  },
  {
    title: "ユーザーの権利",
    content: `ユーザーは、ご自身の個人情報について以下の権利を有します。

・開示の請求：当社が保有する個人情報の内容を確認できます
・訂正の請求：個人情報の内容に誤りがある場合、訂正を求めることができます
・削除の請求：個人情報の削除を求めることができます

上記の請求は、本ページ下部のお問い合わせ先までご連絡ください。ご本人確認のうえ、合理的な期間内に対応いたします。`,
  },
  {
    title: "お子さまの情報",
    content: `本サービスでは、お子さまの月齢等の情報を保護者の同意のもとでのみ収集します。

お子さまの情報は、適切な子育て情報の提供のみに使用し、それ以外の目的では利用しません。保護者はいつでもお子さまの情報の削除を請求できます。`,
  },
  {
    title: "ポリシーの変更",
    content: `当社は、必要に応じて本プライバシーポリシーを変更することがあります。

重要な変更がある場合は、本サービスのサイト上で通知いたします。変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じます。`,
  },
  {
    title: "お問い合わせ",
    content: "",
    isContact: true,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            プライバシーポリシー
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            施行日：2026年4月3日
          </p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  {index + 1}. {section.title}
                </h2>
                {section.isContact ? (
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。
                    </p>
                    <p className="mt-3">
                      運営者：
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
                    <p>
                      ウェブサイト：
                      <a
                        href="https://constella-hd.co.jp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        https://constella-hd.co.jp
                      </a>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
