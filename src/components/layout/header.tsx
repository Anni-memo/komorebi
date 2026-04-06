"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { PwaInstallGuide } from "@/components/pwa-install-guide";

const navItems = [
  { href: "/learn", label: "学ぶ" },
  { href: "/timeline", label: "月齢別" },
  { href: "/qa", label: "相談する" },
  { href: "/benefits", label: "制度を調べる" },
  { href: "/prepare", label: "準備する" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        checkOnboarding(user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkOnboarding(session.user.id);
      } else {
        setOnboardingCompleted(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkOnboarding = async (userId: string) => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", userId)
        .single();

      setOnboardingCompleted(data?.onboarding_completed ?? false);
    } catch {
      // テーブルが存在しない場合など
      setOnboardingCompleted(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setOnboardingCompleted(null);
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? "?";
  const { isInstalled, showGuide, install, closeGuide } = usePwaInstall();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={user && onboardingCompleted ? "/home" : "/"} className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>
            🌿
          </span>
          <span className="font-semibold text-lg tracking-tight text-foreground">
            こもれび
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {onboardingCompleted === false && (
                <Link
                  href="/onboarding"
                  className="text-xs text-primary hover:underline mr-2"
                >
                  プロフィールを設定する
                </Link>
              )}
              <Link
                href="/mypage"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Avatar size="sm">
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <span>マイページ</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                ログアウト
              </Button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              ログイン
            </Link>
          )}
          {!isInstalled && (
            <Button
              variant="outline"
              size="sm"
              onClick={install}
              className="gap-1.5 text-primary border-primary/30 hover:bg-primary/5"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
              </svg>
              アプリを追加
            </Button>
          )}
          <Link href="/concierge" className={buttonVariants({ size: "sm" })}>
            AIに相談する
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button variant="ghost" size="sm" aria-label="メニューを開く" />
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col h-full pt-8 pb-6">
              {/* ブランド */}
              <div className="flex items-center gap-2 px-4 mb-6">
                <span className="text-xl" aria-hidden>🌿</span>
                <span className="font-semibold text-lg text-foreground">こもれび</span>
              </div>

              {/* AI相談（最優先CTA） */}
              <div className="px-4 mb-4">
                <Link
                  href={user && onboardingCompleted ? "/concierge/chat" : "/concierge"}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium"
                >
                  AIに相談する
                </Link>
              </div>

              <hr className="mx-4 mb-2" />

              {/* メインナビ */}
              <nav className="flex flex-col px-4">
                {user && onboardingCompleted && (
                  <Link
                    href="/home"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-base text-foreground font-medium hover:text-primary transition-colors py-3"
                  >
                    <span className="text-lg" aria-hidden>🏠</span>
                    パーソナルホーム
                  </Link>
                )}
                {navItems.map((item) => {
                  const icons: Record<string, string> = {
                    "/learn": "📖", "/qa": "💬", "/benefits": "🏛️", "/prepare": "🛒",
                  };
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors py-3"
                    >
                      <span className="text-lg" aria-hidden>{icons[item.href] || "📄"}</span>
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/search"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors py-3"
                >
                  <span className="text-lg" aria-hidden>🔍</span>
                  検索
                </Link>
                <Link
                  href="/notifications"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors py-3"
                >
                  <span className="text-lg" aria-hidden>🔔</span>
                  通知
                </Link>
              </nav>

              <hr className="mx-4 my-2" />

              {/* アカウント */}
              <div className="flex flex-col px-4 mt-auto">
                {user ? (
                  <>
                    {onboardingCompleted === false && (
                      <Link
                        href="/onboarding"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-sm text-primary py-3"
                      >
                        <span className="text-lg" aria-hidden>✨</span>
                        プロフィールを設定する
                      </Link>
                    )}
                    <Link
                      href="/mypage"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors py-3"
                    >
                      <Avatar size="sm">
                        <AvatarFallback>{userInitial}</AvatarFallback>
                      </Avatar>
                      <span>マイページ</span>
                    </Link>
                    {!isInstalled && (
                      <button
                        onClick={() => { install(); setOpen(false); }}
                        className="flex items-center gap-3 text-base text-primary font-medium py-3"
                      >
                        <span className="text-lg" aria-hidden>📲</span>
                        アプリを追加
                      </button>
                    )}
                    <Link
                      href="/about"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors py-3"
                    >
                      <span className="text-lg" aria-hidden>ℹ️</span>
                      このサービスについて
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors py-3"
                    >
                      <span className="text-lg" aria-hidden>🚪</span>
                      ログアウト
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors py-3"
                    >
                      <span className="text-lg" aria-hidden>🔑</span>
                      ログイン
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-base text-primary font-medium py-3"
                    >
                      <span className="text-lg" aria-hidden>📝</span>
                      新規登録
                    </Link>
                    {!isInstalled && (
                      <button
                        onClick={() => { install(); setOpen(false); }}
                        className="flex items-center gap-3 text-base text-primary font-medium py-3"
                      >
                        <span className="text-lg" aria-hidden>📲</span>
                        アプリを追加
                      </button>
                    )}
                    <Link
                      href="/about"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors py-3"
                    >
                      <span className="text-lg" aria-hidden>ℹ️</span>
                      このサービスについて
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {showGuide && <PwaInstallGuide onClose={closeGuide} />}
    </header>
  );
}
