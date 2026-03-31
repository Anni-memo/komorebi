"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const stageLabels: Record<string, string> = {
  pregnant: "妊娠中",
  newborn: "出産直後",
  "0": "0歳",
  "1": "1歳",
  "2": "2歳",
  "3+": "3歳以上",
};

const familyLabels: Record<string, string> = {
  first: "第一子",
  "second+": "第二子以降",
  "dual-income": "共働き",
  nursery: "保育園検討中",
  single: "ひとり親",
  "family-support": "実家サポートあり",
  "no-family-support": "実家サポートなし",
};

const interestLabels: Record<string, string> = {
  procedures: "手続き・制度",
  sleep: "睡眠",
  food: "食事",
  health: "体調",
  development: "発達",
  "nursery-search": "保活",
  shopping: "買い物",
  mental: "メンタル",
  consult: "相談",
};

const channelLabels: Record<string, string> = {
  site: "サイト内",
  line: "LINE",
  email: "メール",
  "line-email": "LINEとメール",
  later: "未設定",
};

const frequencyLabels: Record<string, string> = {
  "important-only": "重要なものだけ",
  weekly: "週1回まとめ",
  "as-needed": "必要なときに都度",
  custom: "自分で調整",
};

interface Profile {
  nickname: string | null;
  stage: string | null;
  child_birthdate: string | null;
  expected_due_date: string | null;
  municipality: string | null;
  is_first_child: boolean | null;
  family_situation: string[] | null;
  interests: string[] | null;
  notification_categories: string[] | null;
  notification_channels: string[] | null;
  notification_frequency: string | null;
  onboarding_completed: boolean;
}

// 妊娠週数計算
function calcPregnancyWeeks(dueDate: string): string {
  const due = new Date(dueDate);
  const lmp = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  if (weeks < 0 || weeks > 42) return "";
  return `${weeks}週${days}日`;
}

// 生後月齢計算
function calcMonthsOld(birthdate: string): string {
  const birth = new Date(birthdate);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  const dayDiff = now.getDate() - birth.getDate();
  const adjustedMonths = dayDiff < 0 ? months - 1 : months;
  if (adjustedMonths < 0) return "";
  if (adjustedMonths === 0) {
    const days = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    return `生後${days}日`;
  }
  return `生後${adjustedMonths}ヶ月`;
}

export default function MyPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setEmail(user.email ?? null);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data as Profile);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!email) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <p className="text-muted-foreground mb-4">ログインが必要です。</p>
            <Link href="/auth/login">
              <Button>ログイン</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const stage = profile?.stage ? stageLabels[profile.stage] || profile.stage : "未設定";
  const familyTags = (profile?.family_situation || [])
    .filter((s) => s !== "skip")
    .map((s) => familyLabels[s] || s);
  const interestTags = (profile?.interests || [])
    .map((s) => interestLabels[s] || s);
  const notifCategories = (profile?.notification_categories || []);
  const notifChannel = profile?.notification_channels?.[0]
    ? channelLabels[profile.notification_channels[0]] || profile.notification_channels[0]
    : "未設定";
  const notifFreq = profile?.notification_frequency
    ? frequencyLabels[profile.notification_frequency] || profile.notification_frequency
    : "未設定";

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
            <Link href="/mypage/edit">
              <Button variant="outline" size="sm">プロフィールを編集</Button>
            </Link>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">基本情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ニックネーム</span>
                    <span className="text-foreground">{profile?.nickname || "未設定"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">メールアドレス</span>
                    <span className="text-foreground">{email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">お子さまの情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">段階</span>
                    <Badge variant="secondary">{stage}</Badge>
                  </div>
                  {profile?.stage === "pregnant" && profile?.expected_due_date && calcPregnancyWeeks(profile.expected_due_date) && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">現在の週数</span>
                      <span className="text-foreground">{calcPregnancyWeeks(profile.expected_due_date)}</span>
                    </div>
                  )}
                  {profile?.stage !== "pregnant" && profile?.child_birthdate && calcMonthsOld(profile.child_birthdate) && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">月齢</span>
                      <span className="text-foreground">{calcMonthsOld(profile.child_birthdate)}</span>
                    </div>
                  )}
                  {profile?.child_birthdate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">生年月日</span>
                      <span className="text-foreground">{profile.child_birthdate}</span>
                    </div>
                  )}
                  {profile?.expected_due_date && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">出産予定日</span>
                      <span className="text-foreground">{profile.expected_due_date}</span>
                    </div>
                  )}
                  {familyTags.length > 0 && (
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">家族の状況</span>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {familyTags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">地域情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">お住まいの地域</span>
                    <span className="text-foreground">{profile?.municipality || "未設定"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">気になるテーマ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interestTags.length > 0 ? (
                    interestTags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">未設定</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">通知設定</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">受け取り方法</span>
                    <span className="text-foreground">{notifChannel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">頻度</span>
                    <span className="text-foreground">{notifFreq}</span>
                  </div>
                  {notifCategories.length > 0 && (
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">カテゴリ</span>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {notifCategories.map((cat) => (
                          <Badge key={cat} variant="outline" className="text-xs">{cat}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <Link
                  href="/mypage/bookmarks"
                  className="flex items-center justify-between text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span>保存した記事</span>
                  <span className="text-muted-foreground">&rarr;</span>
                </Link>
              </CardContent>
            </Card>

            <div className="pt-4 flex flex-col gap-3">
              <p className="text-xs text-muted-foreground text-center">
                情報が勝手に広がることはありません。いつでも変更・削除できます。
              </p>
              <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={handleLogout}>
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
