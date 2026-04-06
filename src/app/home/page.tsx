"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { TodoCard, type TodoPriority } from "@/components/home/todo-card";
import { MobileTabBar } from "@/components/home/mobile-tab-bar";

// ─── Types ───────────────────────────────────────────────────

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

// ─── Helpers ─────────────────────────────────────────────────

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

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return "おはようございます";
  if (hour < 17) return "こんにちは";
  return "おつかれさまです";
}

function generateStaticCards(profile: Profile): NotificationItem[] {
  const cards: NotificationItem[] = [];

  if (profile.stage === "pregnant" && profile.expected_due_date) {
    const daysUntil = getDaysUntilDue(profile.expected_due_date);
    if (daysUntil <= 28) {
      cards.push({
        title: "出産前の準備を確認する",
        reason: "出産予定日まであと約" + daysUntil + "日です。入院準備や届出の全体像を先に見ておくと安心です。",
        action_url: "/prepare",
        category: "準備",
        priority: "high",
      });
    }
    cards.push({
      title: "出産後に必要な手続き一覧を確認する",
      reason: "出産後は忙しくなるため、先に全体像を確認しておくと安心です。",
      action_url: "/learn/postnatal-procedures",
      category: "手続き",
      priority: "medium",
    });
  }

  if (profile.stage === "0" || profile.stage === "newborn") {
    if (profile.child_birthdate) {
      const months = getChildMonths(profile.child_birthdate);
      if (months <= 0) {
        cards.push({
          title: "出生届・児童手当の申請を確認する",
          reason: "出生届は14日以内、児童手当は15日以内の手続きが必要です。",
          action_url: "/benefits",
          category: "手続き",
          priority: "high",
        });
      }
      if (months >= 1 && months <= 2) {
        cards.push({
          title: "予防接種の時期を確認する",
          reason: "生後2ヶ月から接種が始まります。スケジュールを先に確認しておくと安心です。",
          action_url: "/learn/vaccination-schedule",
          category: "予防接種",
          priority: "medium",
        });
      }
    }
    cards.push({
      title: "おしりふきの選びかたを見る",
      reason: "種類が多くて迷いやすいアイテムを、比較軸で整理しています。",
      action_url: "/prepare/wipes",
      category: "準備",
      priority: "low",
    });
  }

  if (profile.stage === "1") {
    cards.push({
      title: "保活の流れを確認する",
      reason: "申請時期は自治体によって異なります。早めに全体像を把握しておくと安心です。",
      action_url: "/learn/hokatsu",
      category: "保活",
      priority: "medium",
    });
  }

  // Default card for all stages
  if (cards.length === 0) {
    cards.push({
      title: "使える制度を確認する",
      reason: "あなたの地域と時期から、確認価値の高い制度をまとめています。",
      action_url: "/benefits",
      category: "制度",
      priority: "medium",
    });
  }

  return cards.slice(0, 5);
}

function getFamilyLabel(s: string): string {
  const labels: Record<string, string> = {
    first: "第一子", "second+": "第二子以降", "dual-income": "共働き",
    nursery: "保育園検討中", single: "ひとり親",
    "family-support": "実家サポートあり", "no-family-support": "実家サポートなし",
  };
  return labels[s] || s;
}

// ─── Static Data ─────────────────────────────────────────────

const staticArticles: Record<string, { label: string; tag: string; href: string; readTime: string }[]> = {
  pregnant: [
    { label: "出産後に必要な手続き一覧", tag: "手続き", href: "/learn/postnatal-procedures", readTime: "5分" },
    { label: "RSVワクチン判断ガイド", tag: "予防接種", href: "/learn/rsv-vaccine", readTime: "3分" },
    { label: "産後のメンタルケア", tag: "メンタル", href: "/learn/mental-care", readTime: "4分" },
  ],
  "0": [
    { label: "新生児の睡眠パターン", tag: "睡眠", href: "/learn/newborn-sleep", readTime: "3分" },
    { label: "予防接種スケジュール", tag: "予防接種", href: "/learn/vaccination-schedule", readTime: "5分" },
    { label: "離乳食のはじめかた", tag: "食事", href: "/learn/baby-food", readTime: "4分" },
  ],
  "1": [
    { label: "子どもの発熱対応ガイド", tag: "体調", href: "/learn/fever-guide", readTime: "3分" },
    { label: "保活ガイド", tag: "保活", href: "/learn/hokatsu", readTime: "5分" },
    { label: "離乳食のはじめかた", tag: "食事", href: "/learn/baby-food", readTime: "4分" },
  ],
  default: [
    { label: "出産後に必要な手続き一覧", tag: "手続き", href: "/learn/postnatal-procedures", readTime: "5分" },
    { label: "予防接種スケジュール", tag: "予防接種", href: "/learn/vaccination-schedule", readTime: "5分" },
    { label: "産後のメンタルケア", tag: "メンタル", href: "/learn/mental-care", readTime: "4分" },
  ],
};

const monthlyItems: Record<string, { label: string; tag: string; href: string }[]> = {
  pregnant: [
    { label: "出産入院バッグの準備", tag: "準備", href: "/learn/hospital-bag" },
    { label: "出産育児一時金の申請準備", tag: "制度", href: "/benefits" },
    { label: "赤ちゃんの寝る場所の確保", tag: "準備", href: "/prepare" },
  ],
  "0": [
    { label: "予防接種の予約確認", tag: "医療", href: "/learn/vaccination-schedule" },
    { label: "児童手当の現況届", tag: "制度", href: "/benefits" },
    { label: "保育園見学の検討", tag: "保活", href: "/learn/hokatsu" },
  ],
  "1": [
    { label: "保育園の申し込み時期確認", tag: "保活", href: "/learn/hokatsu" },
    { label: "1歳半健診の準備", tag: "医療", href: "/learn" },
    { label: "卒乳・断乳の検討", tag: "育児", href: "/learn" },
  ],
  default: [
    { label: "使える制度の確認", tag: "制度", href: "/benefits" },
    { label: "予防接種スケジュールの確認", tag: "医療", href: "/learn/vaccination-schedule" },
    { label: "準備物チェック", tag: "準備", href: "/prepare" },
  ],
};

const staticBenefits: Record<string, { label: string; tag: string; href: string; timingLabel?: string }[]> = {
  pregnant: [
    { label: "出産育児一時金", tag: "給付", href: "/benefits", timingLabel: "出産前後" },
    { label: "妊婦健診の助成", tag: "助成", href: "/benefits", timingLabel: "妊娠中" },
    { label: "産前産後の保険料免除", tag: "免除", href: "/benefits" },
  ],
  "0": [
    { label: "児童手当", tag: "手当", href: "/benefits", timingLabel: "出生後15日以内" },
    { label: "乳幼児医療費助成", tag: "助成", href: "/benefits" },
    { label: "出産育児一時金", tag: "給付", href: "/benefits" },
  ],
  default: [
    { label: "出産育児一時金", tag: "給付", href: "/benefits" },
    { label: "児童手当", tag: "手当", href: "/benefits" },
    { label: "乳幼児医療費助成", tag: "助成", href: "/benefits" },
  ],
};

const staticQA: Record<string, { label: string; tag: string; ageTag: string; href: string }[]> = {
  pregnant: [
    { label: "つわりがつらくて仕事が手につかない…", tag: "体調", ageTag: "妊娠中", href: "/qa" },
    { label: "出産費用ってどれくらいかかりましたか？", tag: "お金", ageTag: "妊娠後期", href: "/qa" },
  ],
  "0": [
    { label: "夜泣きがつらいです…", tag: "睡眠", ageTag: "0歳", href: "/qa" },
    { label: "完母と混合、どう決めましたか？", tag: "授乳", ageTag: "0〜3ヶ月", href: "/qa" },
  ],
  "1": [
    { label: "保活はいつから始めましたか？", tag: "保活", ageTag: "1歳前後", href: "/qa" },
    { label: "離乳食を全然食べてくれません…", tag: "食事", ageTag: "1歳前後", href: "/qa" },
  ],
  default: [
    { label: "夜泣きがつらいです…", tag: "睡眠", ageTag: "0歳", href: "/qa" },
    { label: "保活はいつから始めましたか？", tag: "保活", ageTag: "1歳前後", href: "/qa" },
  ],
};

const staticPrepare: Record<string, { label: string; tag: string; href: string; urgency?: string }[]> = {
  pregnant: [
    { label: "おしりふきの選びかた", tag: "比較", href: "/prepare/wipes" },
    { label: "ベビーベッド or 添い寝", tag: "比較", href: "/prepare" },
    { label: "必需品チェックリスト", tag: "まとめ", href: "/prepare", urgency: "出産前" },
  ],
  "0": [
    { label: "おしりふきの選びかた", tag: "比較", href: "/prepare/wipes" },
    { label: "抱っこひもの比較", tag: "比較", href: "/prepare" },
    { label: "チャイルドシートの選びかた", tag: "比較", href: "/prepare", urgency: "まだ急がない" },
  ],
  default: [
    { label: "おしりふきの選びかた", tag: "比較", href: "/prepare/wipes" },
    { label: "必需品チェックリスト", tag: "まとめ", href: "/prepare" },
  ],
};

// ─── Section Components ──────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-3">
      <h2 className="text-base font-bold text-foreground flex items-center gap-2">
        <span aria-hidden>{icon}</span>
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1 ml-7 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ListCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border/50 shadow-none">
      <CardContent className="py-2">
        <ul className="divide-y divide-border/30">
          {children}
        </ul>
      </CardContent>
    </Card>
  );
}

function ListItem({
  href,
  label,
  tags,
}: {
  href: string;
  label: string;
  tags: { text: string; variant?: "outline" | "secondary" }[];
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-muted/50 transition-colors group"
      >
        <span className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
          {label}
        </span>
        <span className="flex items-center gap-1.5 shrink-0 ml-2">
          {tags.map((tag) => (
            <Badge key={tag.text} variant={tag.variant ?? "outline"} className="text-xs">
              {tag.text}
            </Badge>
          ))}
        </span>
      </Link>
    </li>
  );
}

// ─── Main Component ──────────────────────────────────────────

export default function PersonalHomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check visit history
    const visited = localStorage.getItem("komorebi_home_visited");
    if (visited) setIsFirstVisit(false);
    localStorage.setItem("komorebi_home_visited", new Date().toISOString());

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

        const { data: rules, error: rulesError } = await supabase
          .from("notification_rules")
          .select("*")
          .eq("active", true);

        if (rules && !rulesError) {
          const matched = (rules as NotificationRule[])
            .filter((rule) => matchRule(rule, profileData as Profile))
            .map((rule) => ({
              title: rule.title_template,
              reason: rule.reason_template,
              action_url: rule.action_url || "/home",
              category: rule.category,
              priority: rule.priority,
            }));
          if (matched.length > 0) {
            setNotifications(matched);
          } else {
            setNotifications(generateStaticCards(profileData as Profile));
          }
        } else {
          // Supabase未接続 or テーブルなし → 静的フォールバック
          setNotifications(generateStaticCards(profileData as Profile));
        }
      }

      setLoading(false);
    }

    load();
  }, []);

  // ─── Derived state ──────────────────────────────────────────

  const stageLabel = getStageLabel(profile?.stage ?? null);
  const stage = profile?.stage ?? "default";
  const articles = staticArticles[stage] || staticArticles.default;
  const monthly = monthlyItems[stage] || monthlyItems.default;
  const benefits = staticBenefits[stage] || staticBenefits.default;
  const qaItems = staticQA[stage] || staticQA.default;
  const prepareItems = staticPrepare[stage] || staticPrepare.default;

  const familyTags = profile?.family_situation
    ?.filter((s) => s !== "skip")
    .map((s) => getFamilyLabel(s)) || [];

  const priorityMap: Record<string, TodoPriority> = {
    high: "today",
    medium: "this-week",
    low: "later",
  };

  const todayCards = notifications
    .filter((n) => priorityMap[n.priority] === "today")
    .slice(0, 3);

  const weekCards = notifications
    .filter((n) => priorityMap[n.priority] === "this-week" || priorityMap[n.priority] === "later")
    .concat(
      notifications
        .filter((n) => priorityMap[n.priority] === "today")
        .slice(3)
    );

  const hasTodayTasks = todayCards.length > 0;
  const isLightDay = todayCards.length === 0 && weekCards.length === 0;

  const removeNotification = (title: string) => {
    setNotifications((prev) => prev.filter((item) => item.title !== title));
  };

  // ─── Loading ────────────────────────────────────────────────

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

  // ─── Profile summary line ──────────────────────────────────

  const profileSummary = [stageLabel, familyTags[0], profile?.municipality]
    .filter(Boolean)
    .join(" / ");

  // ─── Greeting message ──────────────────────────────────────

  const greetingMessage = isFirstVisit
    ? "今の状況に合わせて、今日の確認ポイントを整理しました。"
    : "前回からの変化も含めて、今日の確認ポイントを整理しました。";

  // ─── Render ─────────────────────────────────────────────────

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/10 pb-20 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* ─── 1. ヘッダー：挨拶 + プロフィール要約 + 通知 ─── */}
          <section className="mb-8">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  {getGreeting()}
                </h1>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {greetingMessage}
                </p>
              </div>
              <Link
                href="/notifications"
                className="shrink-0 ml-3 mt-1 p-2 rounded-full hover:bg-muted/50 transition-colors"
                aria-label="通知"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                  <path d="M10 2a5 5 0 0 0-5 5v3l-1.5 2.5h13L15 10V7a5 5 0 0 0-5-5Z" />
                  <path d="M8 16a2 2 0 0 0 4 0" />
                </svg>
              </Link>
            </div>

            {profile ? (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {profileSummary && (
                  <Badge variant="secondary" className="text-xs">
                    {profileSummary}
                  </Badge>
                )}
                {familyTags.slice(1).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
                <Link
                  href="/mypage/edit"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors ml-1"
                >
                  プロフィールを見直す
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">
                <Link href={isLoggedIn ? "/onboarding" : "/auth/signup"} className="text-primary hover:underline">
                  {isLoggedIn ? "プロフィールを設定" : "アカウント登録"}
                </Link>
                すると、あなた向けの案内が表示されます。
              </p>
            )}
          </section>

          {/* ─── 胎動・陣痛カウンター（妊娠中ユーザー向け） ─── */}
          {(stage === "pregnant" || !profile) && (
            <section className="mb-8">
              <Link href="/learn/contraction-counter">
                <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 shadow-none hover:border-pink-300 transition-colors cursor-pointer dark:from-pink-950/30 dark:to-rose-950/30 dark:border-pink-800">
                  <CardContent className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden>👶</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">胎動・陣痛カウンター</p>
                        <p className="text-xs text-muted-foreground mt-0.5">胎動を数えたり、陣痛の間隔を記録できます</p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground shrink-0">
                        <path d="M6 4l4 4-4 4" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </section>
          )}

          <div className="space-y-8">
            {/* ─── 2. 今日やること ─── */}
            <section>
              {hasTodayTasks ? (
                <>
                  <SectionHeader
                    icon="📋"
                    title="今日やること"
                    subtitle="今日は、ここだけ見れば大丈夫です。"
                  />
                  <div className="space-y-3">
                    {todayCards.map((n) => (
                      <TodoCard
                        key={n.title}
                        title={n.title}
                        reason={n.reason}
                        category={n.category}
                        priority={priorityMap[n.priority] ?? "later"}
                        actionUrl={n.action_url}
                        onComplete={() => removeNotification(n.title)}
                        onDismiss={() => removeNotification(n.title)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                /* 空状態：安心を返す */
                <Card className="border-border/50 shadow-none bg-komorebi-light/30">
                  <CardContent className="py-5 px-5">
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5" aria-hidden>🌿</span>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          今日は急ぎの確認は少なめです
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {isLightDay
                            ? "今のうちに見ておくと安心なことを、下にまとめています。"
                            : "今週のうちに確認したいことを下にまとめています。"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* ─── 3. 今週中に確認したいこと ─── */}
            {weekCards.length > 0 && (
              <section>
                <SectionHeader
                  icon="📅"
                  title="今週中に確認したいこと"
                  subtitle="今週のうちに見ておくと、あとが楽になることです。"
                />
                <div className="space-y-3">
                  {weekCards.map((n) => (
                    <TodoCard
                      key={n.title}
                      title={n.title}
                      reason={n.reason}
                      category={n.category}
                      priority={priorityMap[n.priority] ?? "later"}
                      actionUrl={n.action_url}
                      onComplete={() => removeNotification(n.title)}
                      onDismiss={() => removeNotification(n.title)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ─── 4. 今月中に必要になること ─── */}
            <section>
              <SectionHeader
                icon="🗓️"
                title="今月中に必要になること"
                subtitle="今すぐでなくても大丈夫ですが、先に見ておくと気持ちが楽になります。"
              />
              <ListCard>
                {monthly.map((item) => (
                  <ListItem
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    tags={[{ text: item.tag }]}
                  />
                ))}
              </ListCard>
            </section>

            {/* ─── 5. 見ておきたい制度 ─── */}
            <section>
              <SectionHeader
                icon="🏛️"
                title="見ておきたい制度"
                subtitle={
                  profile?.municipality
                    ? `${profile.municipality}と今の時期から、確認価値が高そうな制度をまとめました。`
                    : "お住まいの地域と今の時期から、確認価値が高そうな制度をまとめました。"
                }
              />
              <ListCard>
                {benefits.map((item) => (
                  <ListItem
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    tags={[
                      { text: item.tag },
                      ...(item.timingLabel ? [{ text: item.timingLabel, variant: "secondary" as const }] : []),
                    ]}
                  />
                ))}
              </ListCard>
            </section>

            {/* ─── 6. 不安が減る記事 ─── */}
            <section>
              <SectionHeader
                icon="📖"
                title="不安が減る記事"
                subtitle="今の時期に多い悩みを、必要なところだけ短く整理しています。"
              />
              <ListCard>
                {articles.map((item) => (
                  <ListItem
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    tags={[
                      { text: item.tag },
                      { text: `${item.readTime}で読める`, variant: "secondary" },
                    ]}
                  />
                ))}
              </ListCard>
            </section>

            {/* ─── 7. 同じ悩みの相談 ─── */}
            <section>
              <SectionHeader
                icon="💬"
                title="同じ悩みの相談"
                subtitle="近い時期の親の相談をまとめています。読むだけでも少し楽になることがあります。"
              />
              <ListCard>
                {qaItems.map((item) => (
                  <ListItem
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    tags={[
                      { text: item.ageTag, variant: "secondary" },
                      { text: item.tag },
                    ]}
                  />
                ))}
              </ListCard>
            </section>

            {/* ─── 8. そろそろ見ておくとよい準備物 ─── */}
            <section>
              <SectionHeader
                icon="🛒"
                title="そろそろ見ておくとよい準備物"
                subtitle="探し回らなくていいように、今の時期に見ておくと役立つものを整理しました。"
              />
              <ListCard>
                {prepareItems.map((item) => (
                  <ListItem
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    tags={[
                      { text: item.tag },
                      ...(item.urgency ? [{ text: item.urgency, variant: "secondary" as const }] : []),
                    ]}
                  />
                ))}
              </ListCard>
            </section>

            {/* ─── 9. 前回の続き（再訪ユーザーのみ） ─── */}
            {!isFirstVisit && (
              <section>
                <SectionHeader
                  icon="🔖"
                  title="前回の続き"
                  subtitle="前回途中まで見た内容を、すぐ再開できます。"
                />
                <Card className="border-border/50 shadow-none">
                  <CardContent className="py-4 px-4">
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/mypage/bookmarks"
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group"
                      >
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          保存した記事・制度を見る
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground shrink-0">
                          <path d="M6 4l4 4-4 4" />
                        </svg>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* ─── AI相談導線 ─── */}
            <section>
              <Card className="border-primary/20 shadow-none bg-komorebi-light/20">
                <CardContent className="py-5 px-5">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5" aria-hidden>💡</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground mb-1">
                        うまく整理できないときは
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        今の気がかりをひとつ選ぶだけで、AIが一緒に整理します。
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = "/concierge/chat"}
                        >
                          AIに相談する
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.location.href = "/mypage/edit"}
                        >
                          プロフィールを更新する
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
