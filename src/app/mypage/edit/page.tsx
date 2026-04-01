"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

// --- Label ↔ Key mappings ---

const stageOptions = [
  { label: "妊娠中", key: "pregnant" },
  { label: "出産直後", key: "newborn" },
  { label: "0歳", key: "0" },
  { label: "1歳", key: "1" },
  { label: "2歳", key: "2" },
  { label: "3歳以上", key: "3+" },
];

const familyOptions = [
  { label: "第一子", key: "first" },
  { label: "第二子以降", key: "second+" },
  { label: "共働き", key: "dual-income" },
  { label: "保育園検討中", key: "nursery" },
  { label: "ひとり親", key: "single" },
  { label: "実家サポートあり", key: "family-support" },
  { label: "実家サポートなし", key: "no-family-support" },
];

const interestOptions = [
  { label: "手続き・制度", key: "procedures" },
  { label: "睡眠", key: "sleep" },
  { label: "食事", key: "food" },
  { label: "体調", key: "health" },
  { label: "発達", key: "development" },
  { label: "保活", key: "nursery-search" },
  { label: "買い物", key: "shopping" },
  { label: "メンタル", key: "mental" },
  { label: "相談", key: "consult" },
];

const notifCategoryOptions = [
  { label: "手続き期限のリマインド", key: "手続き期限のリマインド" },
  { label: "健診・予防接種の案内", key: "健診・予防接種の案内" },
  { label: "月齢に合った発達情報", key: "月齢に合った発達情報" },
  { label: "地域のイベント・支援", key: "地域のイベント・支援" },
  { label: "お金・制度の新着情報", key: "お金・制度の新着情報" },
  { label: "こもれびの新機能", key: "こもれびの新機能" },
];

const channelOptions = [
  { label: "サイト内", key: "site" },
  { label: "LINE", key: "line" },
  { label: "メール", key: "email" },
  { label: "LINEとメール", key: "line-email" },
  { label: "未設定", key: "later" },
];

const frequencyOptions = [
  { label: "重要なものだけ", key: "important-only" },
  { label: "週1回まとめ", key: "weekly" },
  { label: "必要なときに都度", key: "as-needed" },
  { label: "自分で調整", key: "custom" },
];

export default function ProfileEditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Form state (all stored as English keys)
  const [nickname, setNickname] = useState("");
  const [stage, setStage] = useState("");
  const [childBirthdate, setChildBirthdate] = useState("");
  const [expectedDueDate, setExpectedDueDate] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [familySituation, setFamilySituation] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [notifCategories, setNotifCategories] = useState<string[]>([]);
  const [notifChannel, setNotifChannel] = useState("");
  const [notifFrequency, setNotifFrequency] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setNickname(data.nickname || "");
        setStage(data.stage || "");
        setChildBirthdate(data.child_birthdate || "");
        setExpectedDueDate(data.expected_due_date || "");
        setMunicipality(data.municipality || "");
        setFamilySituation(
          (data.family_situation || []).filter((s: string) => s !== "skip")
        );
        setInterests(data.interests || []);
        setNotifCategories(data.notification_categories || []);
        setNotifChannel(
          Array.isArray(data.notification_channels)
            ? data.notification_channels[0] || ""
            : data.notification_channels || ""
        );
        setNotifFrequency(data.notification_frequency || "");
      }

      setLoading(false);
    }
    load();
  }, [router]);

  function toggleArray(
    arr: string[],
    value: string,
    setter: (v: string[]) => void
  ) {
    if (arr.includes(value)) {
      setter(arr.filter((v) => v !== value));
    } else {
      setter([...arr, value]);
    }
  }

  async function handleSave() {
    if (!userId) return;
    setSaving(true);
    setSuccessMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        nickname: nickname || null,
        stage: stage || null,
        child_birthdate: stage !== "pregnant" ? childBirthdate || null : null,
        expected_due_date: stage === "pregnant" ? expectedDueDate || null : null,
        municipality: municipality || null,
        is_first_child: familySituation.includes("first"),
        family_situation: familySituation,
        interests,
        notification_categories: notifCategories,
        notification_channels: notifChannel ? [notifChannel] : [],
        notification_frequency: notifFrequency || null,
        onboarding_completed: true,
      });
      if (error) {
        setSuccessMessage(`保存エラー: ${error.message} (code: ${error.code})`);
        return;
      }
      router.push("/mypage");
    } catch {
      setSuccessMessage("保存に失敗しました。もう一度お試しください。");
    } finally {
      setSaving(false);
    }
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

  const isPregnant = stage === "pregnant";

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            プロフィールを編集
          </h1>

          <div className="space-y-6">
            {/* ニックネーム */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">ニックネーム</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="例: さくらママ"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="max-w-xs"
                />
              </CardContent>
            </Card>

            {/* 段階 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">段階</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {stageOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setStage(opt.key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        stage === opt.key
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 日付 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {isPregnant ? "出産予定日" : "お子さまの生年月日"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="date"
                  value={isPregnant ? expectedDueDate : childBirthdate}
                  onChange={(e) =>
                    isPregnant
                      ? setExpectedDueDate(e.target.value)
                      : setChildBirthdate(e.target.value)
                  }
                  className="max-w-xs"
                />
              </CardContent>
            </Card>

            {/* 地域 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">地域</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="例: 中野区"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="max-w-xs"
                />
              </CardContent>
            </Card>

            {/* 家族の状況 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">家族の状況</CardTitle>
                <p className="text-xs text-muted-foreground">
                  複数選択できます
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {familyOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() =>
                        toggleArray(familySituation, opt.key, setFamilySituation)
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        familySituation.includes(opt.key)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 気になるテーマ */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">気になるテーマ</CardTitle>
                <p className="text-xs text-muted-foreground">
                  複数選択できます
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() =>
                        toggleArray(interests, opt.key, setInterests)
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        interests.includes(opt.key)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 通知カテゴリ */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">通知カテゴリ</CardTitle>
                <p className="text-xs text-muted-foreground">
                  複数選択できます
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {notifCategoryOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() =>
                        toggleArray(notifCategories, opt.key, setNotifCategories)
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        notifCategories.includes(opt.key)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 通知チャネル */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">通知チャネル</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {channelOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setNotifChannel(opt.key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        notifChannel === opt.key
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 通知頻度 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">通知頻度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {frequencyOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setNotifFrequency(opt.key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        notifFrequency === opt.key
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="mt-6 p-3 bg-primary/10 text-primary rounded-lg text-sm text-center">
              {successMessage}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/mypage")}
            >
              キャンセル
            </Button>
            <Button className="flex-1" onClick={handleSave} disabled={saving}>
              {saving ? "保存中..." : "保存する"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            情報が勝手に広がることはありません。いつでも変更・削除できます。
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
