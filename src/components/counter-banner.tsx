"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

function getPregnancyWeeks(dueDateStr: string): number {
  const due = new Date(dueDateStr);
  const now = new Date();
  const daysUntil = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  // 出産予定日 = 40週0日。残り日数から現在の週数を逆算
  return Math.floor((280 - daysUntil) / 7);
}

export function CounterBanner() {
  const [show, setShow] = useState(false);
  const [weeks, setWeeks] = useState(0);

  useEffect(() => {
    async function check() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("stage, expected_due_date")
          .eq("id", user.id)
          .single();

        if (profile?.stage === "pregnant" && profile?.expected_due_date) {
          const w = getPregnancyWeeks(profile.expected_due_date);
          if (w >= 34) {
            setWeeks(w);
            setShow(true);
          }
        }
      } catch { /* ignore */ }
    }
    check();
  }, []);

  if (!show) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 -mb-8 mt-4">
      <Link href="/learn/contraction-counter">
        <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 shadow-sm hover:shadow-md hover:border-pink-300 transition-all cursor-pointer dark:from-pink-950/30 dark:to-rose-950/30 dark:border-pink-800">
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden>👶</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">胎動・陣痛カウンター</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {weeks}週目 — 胎動を数えたり、陣痛の間隔を記録できます
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground shrink-0">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
