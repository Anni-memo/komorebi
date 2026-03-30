"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/learn", label: "学ぶ" },
  { href: "/qa", label: "相談する" },
  { href: "/benefits", label: "制度を調べる" },
  { href: "/prepare", label: "準備する" },
];

export function Header() {
  const [open, setOpen] = useState(false);

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
          <Link href="/mypage" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            ログイン
          </Link>
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
              <Link
                href="/mypage"
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground py-2"
              >
                ログイン
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
