"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/learn", label: "学ぶ" },
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

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
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
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-2" />
              <Link
                href="/concierge"
                onClick={() => setOpen(false)}
                className="text-base font-medium text-primary py-2"
              >
                AIに相談する
              </Link>
              {user ? (
                <>
                  {onboardingCompleted === false && (
                    <Link
                      href="/onboarding"
                      onClick={() => setOpen(false)}
                      className="text-sm text-primary py-2"
                    >
                      プロフィールを設定する
                    </Link>
                  )}
                  <Link
                    href="/mypage"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-base text-muted-foreground py-2"
                  >
                    <Avatar size="sm">
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <span>マイページ</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="text-base text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground py-2"
                >
                  ログイン
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
