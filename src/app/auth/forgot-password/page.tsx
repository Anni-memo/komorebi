"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      );

      if (resetError) {
        setError(`メールの送信に失敗しました: ${resetError.message}`);
        return;
      }

      setSuccess(true);
    } catch {
      setError("予期しないエラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="max-w-md mx-auto px-4 py-16 text-center">
            <span className="text-4xl mb-4 block" aria-hidden>
              &#9993;
            </span>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              パスワード再設定のメールを送信しました
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong className="text-foreground">{email}</strong>{" "}
              にパスワード再設定用のメールをお送りしました。
              <br />
              メール内のリンクをクリックして、新しいパスワードを設定してください。
            </p>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  メールが届かない場合は、迷惑メールフォルダもご確認ください。
                  それでも届かない場合は、少し時間をおいてから再度お試しください。
                </p>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground mt-6">
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                ログインページへ戻る
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <span className="text-3xl mb-3 block" aria-hidden>
              🌿
            </span>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              パスワードの再設定
            </h1>
            <p className="text-sm text-muted-foreground">
              ご登録のメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。
            </p>
          </div>

          <Card className="border-border/50 shadow-none">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    メールアドレス
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "送信中..." : "再設定メールを送信"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              ログインページへ戻る
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
