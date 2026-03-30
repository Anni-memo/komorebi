"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        switch (authError.message) {
          case "Invalid login credentials":
            setError("メールアドレスまたはパスワードが正しくありません。");
            break;
          case "Email not confirmed":
            setError(
              "メールアドレスの確認が完了していません。確認メールをご確認ください。"
            );
            break;
          default:
            setError(
              "ログインに失敗しました。しばらくしてからもう一度お試しください。"
            );
        }
        return;
      }

      router.push("/home");
    } catch {
      setError("予期しないエラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

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
              おかえりなさい
            </h1>
            <p className="text-sm text-muted-foreground">
              こもれびにログインして、あなたの子育てをサポートします。
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
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      パスワード
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      パスワードを忘れた方
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
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
                  {loading ? "ログイン中..." : "ログイン"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            アカウントをお持ちでない方{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:underline font-medium"
            >
              新規登録
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
