"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  stage: string | null;
  child_birthdate: string | null;
  expected_due_date: string | null;
  municipality: string | null;
  is_first_child: boolean | null;
  family_situation: string[] | null;
  interests: string[] | null;
  onboarding_completed: boolean;
}

interface NotificationRule {
  title_template: string;
  body_template: string;
  reason_template: string;
  action_url: string | null;
  category: string;
  priority: string;
  trigger_type: string;
  trigger_value: number | null;
  trigger_unit: string | null;
  target_stage: string[] | null;
}

interface NotificationItem {
  title: string;
  reason: string;
  action_url: string;
  category: string;
  priority: string;
}

function getChildMonths(birthdate: string): number {
  const birth = new Date(birthdate);
  const now = new Date();
  return (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
}

function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function matchRule(rule: NotificationRule, profile: Profile): boolean {
  if (rule.target_stage && rule.target_stage.length > 0) {
    if (!profile.stage || !rule.target_stage.includes(profile.stage)) {
      return false;
    }
  }

  if (rule.trigger_type === "months_after_birth" && profile.child_birthdate) {
    const months = getChildMonths(profile.child_birthdate);
    const target = rule.trigger_value ?? 0;
    return months >= target && months <= target + 1;
  }

  if (rule.trigger_type === "days_after_birth" && profile.child_birthdate) {
    const birth = new Date(profile.child_birthdate);
    const now = new Date();
    const daysSinceBirth = Math.ceil((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const target = rule.trigger_value ?? 0;
    return daysSinceBirth >= target && daysSinceBirth <= target + 14;
  }

  if (rule.trigger_type === "days_before_due" && profile.expected_due_date) {
    const daysUntil = getDaysUntilDue(profile.expected_due_date);
    const target = rule.trigger_value ?? 0;
    return daysUntil <= target && daysUntil >= 0;
  }

  return false;
}

function getStageLabel(stage: string | null): string {
  const labels: Record<string, string> = {
    pregnant: "妊娠中",
    newborn: "出産直後",
    "0": "0歳",
    "1": "1歳",
    "2": "2歳",
    "3+": "3歳以上",
  };
  return stage ? labels[stage] || stage : "";
}

const staticArticles: Record<string, { label: string; tag: string; href: string }[]> = {
  pregnant: [
    { label: "出産後に必要な手続き一覧", tag: "手続き", href: "/learn/postnatal-procedures" },
    { label: "RSVワクチン判断ガイド", tag: "予防接種", href: "/learn/rsv-vaccine" },
    { label: "産後のメンタルケア", tag: "メンタル", href: "/learn/mental-care" },
  ],
  "0": [
    { label: "新生児の睡眠パターン", tag: "睡眠", href: "/learn/newborn-sleep" },
    { label: "予防接種スケジュール", tag: "予防接種", href: "/learn/vaccination-schedule" },
    { label: "離乳食のはじめかた", tag: "食事", href: "/learn/baby-food" },
  ],
  "1": [
    { label: "子どもの発熱対応ガイド", tag: "体調", href: "/learn/fever-guide" },
    { label: "保活ガイド", tag: "保活", href: "/learn/hokatsu" },
    { label: "離乳食のはじめかた", tag: "食事", href: "/learn/baby-food" },
  ],
  default: [
    { label: "出産後に必要な手続き一覧", tag: "手続き", href: "/learn/postnatal-procedures" },
    { label: "予防接種スケジュール", tag: "予防接種", href: "/learn/vaccination-schedule" },
    { label: "産後のメンタルケア", tag: "メンタル", href: "/learn/mental-care" },
  ],
};

export default function PersonalHomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData as Profile);

        const { data: rules } = await supabase
          .from("notification_rules")
          .select("*")
          .eq("active", true);

        if (rules) {
          const matched = (rules as NotificationRule[])
            .filter((rule) => matchRule(rule, profileData as Profile))
            .map((rule) => ({
              title: rule.title_template,
              reason: rule.reason_template,
              action_url: rule.action_url || "/home",
              category: rule.category,
              priority: rule.priority,
            }));
          setNotifications(matched);
        }
      }

      setLoading(false);
    }

    load();
  }, []);

  const stageLabel = getStageLabel(profile?.stage ?? null);
  const articles = staticArticles[profile?.stage ?? "default"] || staticArticles.default;
  const familyTags = profile?.family_situation
    ?.filter((s) => s !== "skip")
    .map((s) => {
      const labels: Record<string, string> = {
        first: "第一子", "second+": "第二子以降", "dual-income": "共働き",
        nursery: "保育園検討中", single: "ひとり親",
        "family-support": "実家サポートあり", "no-family-support": "実家サポートなし",
      };
      return labels[s] || s;
    }) || [];

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-muted/10">
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/10">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-foreground mb-1">
              {isLoggedIn ? "おかえりなさい" : "パーソナルホーム"}
            </h1>
            {profile ? (
              <div className="flex flex-wrap gap-2">
                {stageLabel && <Badge variant="secondary" className="text-xs">{stageLabel}</Badge>}
                {familyTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
                {profile.municipality && (
                  <Badge variant="outline" className="text-xs">{profile.municipality}</Badge>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                <Link href={isLoggedIn ? "/onboarding" : "/auth/signup"} className="text-primary hover:underline">
                  {isLoggedIn ? "プロフィールを設定" : "アカウント登録"}
                </Link>
                すると、あなた向けの案内が表示されます。
              </p>
            )}
          </div>

          <div className="space-y-6">
            {/* 通知ルールに基づく「今やること」 */}
            {notifications.length > 0 && (
              <Card className="border-primary/20 shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span aria-hidden>📋</span>
                    あなたの今やること
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {notifications.map((n) => (
                      <li key={n.title}>
                        <Link
                          href={n.action_url}
                          className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group"
                        >
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {n.title}
                          </span>
                          <span className="text-xs text-muted-foreground mt-0.5">
                            {n.reason}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* 制度 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span aria-hidden>🏛️</span>
                  使えるかもしれない制度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { label: "出産育児一時金", tag: "給付", href: "/benefits" },
                    { label: "児童手当", tag: "手当", href: "/benefits" },
                    { label: "乳幼児医療費助成", tag: "助成", href: "/benefits" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group">
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                        <Badge variant="outline" className="text-xs shrink-0 ml-2">{item.tag}</Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 記事 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span aria-hidden>📖</span>
                  先に読んでおくと安心な記事
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {articles.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group">
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                        <Badge variant="outline" className="text-xs shrink-0 ml-2">{item.tag}</Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Q&A */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span aria-hidden>💬</span>
                  同じ悩みの相談
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { label: "夜泣きがつらいです...", tag: "睡眠", href: "/qa" },
                    { label: "保活はいつから始めましたか？", tag: "保活", href: "/qa" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group">
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                        <Badge variant="outline" className="text-xs shrink-0 ml-2">{item.tag}</Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 準備物 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span aria-hidden>🛒</span>
                  用意しておくと楽になるもの
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { label: "おしりふきの選びかた", tag: "比較", href: "/prepare/wipes" },
                    { label: "必需品チェックリスト", tag: "準備", href: "/prepare" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group">
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                        <Badge variant="outline" className="text-xs shrink-0 ml-2">{item.tag}</Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1" onClick={() => window.location.href = "/concierge/chat"}>
              AIに追加で相談する
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => window.location.href = "/mypage"}>
              プロフィールを更新する
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
