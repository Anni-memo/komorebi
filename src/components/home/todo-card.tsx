"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TodoPriority = "today" | "this-week" | "later";

interface TodoCardProps {
  title: string;
  reason: string;
  category: string;
  priority: TodoPriority;
  actionUrl: string;
  actionLabel?: string;
  onComplete?: () => void;
  onDismiss?: () => void;
}

const priorityConfig: Record<
  TodoPriority,
  { label: string; borderClass: string }
> = {
  today: {
    label: "今日",
    borderClass: "border-l-primary",
  },
  "this-week": {
    label: "今週中",
    borderClass: "border-l-amber-500",
  },
  later: {
    label: "余裕があれば",
    borderClass: "border-l-muted-foreground/40",
  },
};

export function TodoCard({
  title,
  reason,
  category,
  priority,
  actionUrl,
  actionLabel = "確認する",
  onComplete,
  onDismiss,
}: TodoCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const config = priorityConfig[priority];

  return (
    <Card
      className={cn(
        "border-border/50 border-l-4 shadow-none relative",
        config.borderClass
      )}
    >
      <CardContent className="py-4 px-4">
        {/* Top row: category + priority */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{config.label}</span>
        </div>

        {/* Title */}
        <p className="font-semibold text-sm text-foreground mb-1">{title}</p>

        {/* Reason */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          {reason}
        </p>

        {/* Bottom row: actions */}
        <div className="flex items-center justify-between">
          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
              aria-label="その他のアクション"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle cx="3" cy="8" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="13" cy="8" r="1.5" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute left-0 bottom-full mb-1 bg-background border border-border rounded-lg shadow-md py-1 z-10 min-w-[140px]">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onComplete?.();
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                >
                  確認した
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDismiss?.();
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                >
                  あとで見る
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDismiss?.();
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                >
                  不要
                </button>
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            href={actionUrl}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            {actionLabel}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
