"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。もう一度ご確認ください。");
      return;
    }

    if (password.length < 6) {
      setError("パスワードは6文字以上で設定してください。");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        switch (authError.message) {
          case "User already registered":
            setError(
              "このメールアドレスはすでに登録されています。ログインをお試しください。"
            );
            break;
          default:
            setError(
              "登録に失敗しました。しばらくしてからもう一度お試しください。"
            );
        }
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
              確認メールを送信しました
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong className="text-foreground">{email}</strong>{" "}
              に確認メールをお送りしました。
              <br />
              メール内のリンクをクリックして、登録を完了してください。
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
                ログインページへ
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
              新規登録
            </h1>
            <p className="text-sm text-muted-foreground">
              こもれびのアカウントを作成して、子育てをもっと楽にしましょう。
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

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    パスワード
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="6文字以上"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium text-foreground"
                  >
                    パスワード（確認）
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="もう一度入力"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
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
                  {loading ? "登録中..." : "アカウントを作成"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            すでにアカウントをお持ちの方{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              ログイン
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
