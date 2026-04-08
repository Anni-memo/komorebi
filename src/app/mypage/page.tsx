"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImeInput } from "@/components/ui/ime-input";
import { createClient } from "@/lib/supabase/client";
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { PwaInstallGuide } from "@/components/pwa-install-guide";

// --- Constants ---

const PROFILE_STORAGE_KEY = "komorebi_profile";

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
  { label: "今日やること", key: "today-tasks" },
  { label: "今週中に確認したいこと", key: "weekly-tasks" },
  { label: "手続き・制度", key: "procedures" },
  { label: "健診や予防接種の目安", key: "checkup-vaccination" },
  { label: "保活", key: "hokatsu" },
  { label: "準備物", key: "preparation" },
  { label: "おすすめ記事", key: "articles" },
  { label: "同じ悩みの相談", key: "qa" },
  { label: "通知は最小限にしたい", key: "minimal" },
];

const channelOptions = [
  { label: "サイト内だけ", key: "site" },
  { label: "LINE", key: "line" },
  { label: "メール", key: "email" },
  { label: "LINEとメール", key: "line-email" },
  { label: "あとで決める", key: "later" },
];

const frequencyOptions = [
  { label: "重要なものだけ", key: "important-only" },
  { label: "週1回まとめ", key: "weekly" },
  { label: "必要なときに都度", key: "as-needed" },
  { label: "自分で調整したい", key: "custom" },
];

// --- Label maps ---

const stageLabels: Record<string, string> = Object.fromEntries(
  stageOptions.map((o) => [o.key, o.label])
);
const familyLabels: Record<string, string> = Object.fromEntries(
  familyOptions.map((o) => [o.key, o.label])
);
const interestLabels: Record<string, string> = Object.fromEntries(
  interestOptions.map((o) => [o.key, o.label])
);
const channelLabels: Record<string, string> = Object.fromEntries(
  channelOptions.map((o) => [o.key, o.label])
);
const frequencyLabels: Record<string, string> = Object.fromEntries(
  frequencyOptions.map((o) => [o.key, o.label])
);
const notifCategoryLabels: Record<string, string> = Object.fromEntries(
  notifCategoryOptions.map((o) => [o.key, o.label])
);

// --- Types ---

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

type EditableField =
  | "nickname"
  | "stage"
  | "date"
  | "municipality"
  | "family_situation"
  | "interests"
  | "notification_categories"
  | "notification_channels"
  | "notification_frequency"
  | null;

// --- Helpers ---

function calcPregnancyWeeks(dueDate: string): string {
  const due = new Date(dueDate);
  const lmp = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  if (weeks < 0 || weeks > 42) return "";
  return `${weeks}週${days}日`;
}

function calcMonthsOld(birthdate: string): string {
  const birth = new Date(birthdate);
  const now = new Date();
  const months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  const dayDiff = now.getDate() - birth.getDate();
  const adjustedMonths = dayDiff < 0 ? months - 1 : months;
  if (adjustedMonths < 0) return "";
  if (adjustedMonths === 0) {
    const days = Math.floor(
      (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `生後${days}日`;
  }
  return `生後${adjustedMonths}ヶ月`;
}

function loadLocalProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLocalProfile(profile: Profile) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

// --- Inline editable field components ---

function PillSelector({
  options,
  selected,
  onSelect,
  multiple = false,
}: {
  options: { label: string; key: string }[];
  selected: string | string[];
  onSelect: (key: string) => void;
  multiple?: boolean;
}) {
  const isSelected = (key: string) =>
    multiple
      ? Array.isArray(selected) && selected.includes(key)
      : selected === key;

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onSelect(opt.key)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            isSelected(opt.key)
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// --- Main component ---

export default function MyPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<EditableField>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [lineLinked, setLineLinked] = useState(false);
  const [lineDisplayName, setLineDisplayName] = useState<string | null>(null);
  const { isInstalled, showGuide, install, closeGuide } = usePwaInstall();

  // Draft values for editing
  const [draftNickname, setDraftNickname] = useState("");
  const [draftStage, setDraftStage] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [draftMunicipality, setDraftMunicipality] = useState("");
  const [draftFamily, setDraftFamily] = useState<string[]>([]);
  const [draftInterests, setDraftInterests] = useState<string[]>([]);
  const [draftNotifCats, setDraftNotifCats] = useState<string[]>([]);
  const [draftChannel, setDraftChannel] = useState("");
  const [draftFrequency, setDraftFrequency] = useState("");

  const searchParams = useSearchParams();

  // LINE連携完了の通知
  useEffect(() => {
    if (searchParams.get("line_linked") === "true") {
      setSaveMessage("LINEと連携しました");
      setLineLinked(true);
      setTimeout(() => setSaveMessage(""), 3000);
      window.history.replaceState({}, "", "/mypage");
    }
    if (searchParams.get("error") === "line_already_linked") {
      setSaveMessage("このLINEアカウントは既に別のユーザーと連携されています");
      setTimeout(() => setSaveMessage(""), 5000);
      window.history.replaceState({}, "", "/mypage");
    }
  }, [searchParams]);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setEmail(user.email ?? null);
          setUserId(user.id);

          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (data) {
            const p = data as Profile;
            setProfile(p);
            saveLocalProfile(p);
            if (data.line_user_id) {
              setLineLinked(true);
              setLineDisplayName(data.line_display_name || null);
            }
            setLoading(false);
            return;
          }
        }
      } catch {
        // Supabase unavailable
      }

      // Fallback: localStorage
      const local = loadLocalProfile();
      if (local) {
        setProfile(local);
      }
      setLoading(false);
    }
    load();
  }, []);

  const startEditing = useCallback(
    (field: EditableField) => {
      if (!profile) return;
      // Populate draft values from current profile
      setDraftNickname(profile.nickname || "");
      setDraftStage(profile.stage || "");
      setDraftDate(
        profile.stage === "pregnant"
          ? profile.expected_due_date || ""
          : profile.child_birthdate || ""
      );
      setDraftMunicipality(profile.municipality || "");
      setDraftFamily(
        (profile.family_situation || []).filter((s) => s !== "skip")
      );
      setDraftInterests(profile.interests || []);
      setDraftNotifCats(profile.notification_categories || []);
      setDraftChannel(
        Array.isArray(profile.notification_channels)
          ? profile.notification_channels[0] || ""
          : ""
      );
      setDraftFrequency(profile.notification_frequency || "");
      setEditingField(field);
    },
    [profile]
  );

  const cancelEditing = () => {
    setEditingField(null);
  };

  const saveField = async () => {
    if (!profile) return;
    setSaving(true);
    setSaveMessage("");

    const stageForSave = editingField === "stage" ? draftStage : profile.stage;
    const isPregnant = stageForSave === "pregnant";

    const updated: Profile = {
      ...profile,
      nickname: editingField === "nickname" ? draftNickname || null : profile.nickname,
      stage: editingField === "stage" ? draftStage || null : profile.stage,
      child_birthdate:
        editingField === "date" && !isPregnant
          ? draftDate || null
          : editingField === "stage" && isPregnant
          ? null
          : profile.child_birthdate,
      expected_due_date:
        editingField === "date" && isPregnant
          ? draftDate || null
          : editingField === "stage" && !isPregnant
          ? null
          : profile.expected_due_date,
      municipality:
        editingField === "municipality"
          ? draftMunicipality || null
          : profile.municipality,
      family_situation:
        editingField === "family_situation" ? draftFamily : profile.family_situation,
      is_first_child:
        editingField === "family_situation"
          ? draftFamily.includes("first")
          : profile.is_first_child,
      interests:
        editingField === "interests" ? draftInterests : profile.interests,
      notification_categories:
        editingField === "notification_categories"
          ? draftNotifCats
          : profile.notification_categories,
      notification_channels:
        editingField === "notification_channels"
          ? draftChannel
            ? [draftChannel]
            : []
          : profile.notification_channels,
      notification_frequency:
        editingField === "notification_frequency"
          ? draftFrequency || null
          : profile.notification_frequency,
      onboarding_completed: true,
    };

    // Always save to localStorage
    saveLocalProfile(updated);

    // Try Supabase
    if (userId) {
      try {
        const supabase = createClient();
        const { error } = await supabase.from("profiles").upsert({
          id: userId,
          ...updated,
        });
        if (error) {
          setSaveMessage("ローカルに保存しました（サーバー同期は次回ログイン時）");
        }
      } catch {
        setSaveMessage("ローカルに保存しました");
      }
    }

    setProfile(updated);
    setEditingField(null);
    setSaving(false);

    if (!saveMessage) {
      setSaveMessage("保存しました");
      setTimeout(() => setSaveMessage(""), 2000);
    }
  };

  async function handleLogout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    window.location.href = "/";
  }

  // --- Loading ---
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

  // --- No profile at all ---
  if (!profile && !email) {
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

  // Initialize empty profile for new users
  const p: Profile = profile || {
    nickname: null,
    stage: null,
    child_birthdate: null,
    expected_due_date: null,
    municipality: null,
    is_first_child: null,
    family_situation: [],
    interests: [],
    notification_categories: [],
    notification_channels: [],
    notification_frequency: null,
    onboarding_completed: false,
  };

  const isPregnant = p.stage === "pregnant";

  // --- Display helpers ---
  function displayValue(val: string | null | undefined, fallback = "未設定") {
    return val || fallback;
  }

  function displayTags(
    keys: string[] | null,
    labelMap: Record<string, string>
  ) {
    const filtered = (keys || []).filter((s) => s !== "skip");
    if (filtered.length === 0) return <span className="text-sm text-muted-foreground">未設定</span>;
    return (
      <div className="flex flex-wrap gap-1">
        {filtered.map((k) => (
          <Badge key={k} variant="outline" className="text-xs">
            {labelMap[k] || k}
          </Badge>
        ))}
      </div>
    );
  }

  // --- Editable row component ---
  function EditableRow({
    label,
    field,
    children,
    editContent,
  }: {
    label: string;
    field: EditableField;
    children: React.ReactNode;
    editContent: React.ReactNode;
  }) {
    const isEditing = editingField === field;
    return (
      <div className="py-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-sm text-muted-foreground shrink-0">{label}</span>
          {!isEditing && (
            <button
              onClick={() => startEditing(field)}
              className="text-xs text-primary hover:text-primary/80 transition-colors shrink-0"
            >
              変更
            </button>
          )}
        </div>
        {isEditing ? (
          <div className="mt-2 space-y-3">
            {editContent}
            <div className="flex gap-2">
              <Button size="sm" onClick={saveField} disabled={saving}>
                {saving ? "保存中..." : "保存"}
              </Button>
              <Button size="sm" variant="ghost" onClick={cancelEditing}>
                キャンセル
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer rounded-md px-1 -mx-1 hover:bg-muted/40 transition-colors"
            onClick={() => startEditing(field)}
          >
            {children}
          </div>
        )}
      </div>
    );
  }

  function toggleDraftArray(
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

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ウェルカムバナー */}
        <section className="relative h-44 sm:h-52 overflow-hidden">
          <Image
            src="/images/mypage-banner.jpg"
            alt="木漏れ日の森"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-5">
            <h1 className="text-xl font-bold text-white drop-shadow-lg mb-1">
              {p.nickname ? `${p.nickname}さん、こんにちは` : "マイページ"}
            </h1>
            <p className="text-sm text-white/85 drop-shadow">
              {isPregnant && p.expected_due_date && calcPregnancyWeeks(p.expected_due_date)
                ? `妊娠${calcPregnancyWeeks(p.expected_due_date)}`
                : !isPregnant && p.child_birthdate && calcMonthsOld(p.child_birthdate)
                ? calcMonthsOld(p.child_birthdate)
                : "あなたに合った情報をお届けします"}
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* アプリを追加 */}
          {!isInstalled && (
            <button
              onClick={install}
              className="w-full mb-4 flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M8 1v9M5 7l3 3 3-3M2 13h12" />
              </svg>
              こもれびをホーム画面に追加
            </button>
          )}

          {/* Save message toast */}
          {saveMessage && (
            <div className="mb-4 p-3 bg-primary/10 text-primary rounded-lg text-sm text-center">
              {saveMessage}
            </div>
          )}

          <div className="space-y-4">
            {/* 基本情報 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">基本情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/30">
                  <EditableRow
                    label="ニックネーム"
                    field="nickname"
                    editContent={
                      <ImeInput
                        type="text"
                        placeholder="例: さくらママ"
                        value={draftNickname}
                        onChange={(e) => setDraftNickname(e.target.value)}
                        className="max-w-xs"
                        autoFocus
                      />
                    }
                  >
                    <span className="text-sm text-foreground">
                      {displayValue(p.nickname)}
                    </span>
                  </EditableRow>

                  {email && (
                    <div className="py-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm text-muted-foreground">メールアドレス</span>
                      </div>
                      <span className="text-sm text-foreground">{email}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* お子さまの情報 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">お子さまの情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/30">
                  <EditableRow
                    label="段階"
                    field="stage"
                    editContent={
                      <PillSelector
                        options={stageOptions}
                        selected={draftStage}
                        onSelect={setDraftStage}
                      />
                    }
                  >
                    <Badge variant="secondary">
                      {stageLabels[p.stage || ""] || "未設定"}
                    </Badge>
                  </EditableRow>

                  {p.stage && (
                    <>
                      {isPregnant &&
                        p.expected_due_date &&
                        calcPregnancyWeeks(p.expected_due_date) && (
                          <div className="py-3">
                            <span className="text-sm text-muted-foreground block mb-1">
                              現在の週数
                            </span>
                            <span className="text-sm text-foreground">
                              {calcPregnancyWeeks(p.expected_due_date)}
                            </span>
                          </div>
                        )}
                      {!isPregnant &&
                        p.child_birthdate &&
                        calcMonthsOld(p.child_birthdate) && (
                          <div className="py-3">
                            <span className="text-sm text-muted-foreground block mb-1">
                              月齢
                            </span>
                            <span className="text-sm text-foreground">
                              {calcMonthsOld(p.child_birthdate)}
                            </span>
                          </div>
                        )}

                      <EditableRow
                        label={isPregnant ? "出産予定日" : "生年月日"}
                        field="date"
                        editContent={
                          <Input
                            type="date"
                            value={draftDate}
                            onChange={(e) => setDraftDate(e.target.value)}
                            className="max-w-xs"
                          />
                        }
                      >
                        <span className="text-sm text-foreground">
                          {displayValue(
                            isPregnant
                              ? p.expected_due_date
                              : p.child_birthdate
                          )}
                        </span>
                      </EditableRow>
                    </>
                  )}

                  <EditableRow
                    label="家族の状況"
                    field="family_situation"
                    editContent={
                      <PillSelector
                        options={familyOptions}
                        selected={draftFamily}
                        onSelect={(key) =>
                          toggleDraftArray(draftFamily, key, setDraftFamily)
                        }
                        multiple
                      />
                    }
                  >
                    {displayTags(p.family_situation, familyLabels)}
                  </EditableRow>
                </div>
              </CardContent>
            </Card>

            {/* 地域情報 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">地域情報</CardTitle>
              </CardHeader>
              <CardContent>
                <EditableRow
                  label="お住まいの地域"
                  field="municipality"
                  editContent={
                    <ImeInput
                      type="text"
                      placeholder="例: 164-0001 または 中野区"
                      value={draftMunicipality}
                      onChange={(e) => setDraftMunicipality(e.target.value)}
                      className="max-w-xs"
                      autoFocus
                    />
                  }
                >
                  <span className="text-sm text-foreground">
                    {displayValue(p.municipality)}
                  </span>
                </EditableRow>
              </CardContent>
            </Card>

            {/* 気になるテーマ */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">気になるテーマ</CardTitle>
              </CardHeader>
              <CardContent>
                <EditableRow
                  label=""
                  field="interests"
                  editContent={
                    <PillSelector
                      options={interestOptions}
                      selected={draftInterests}
                      onSelect={(key) =>
                        toggleDraftArray(draftInterests, key, setDraftInterests)
                      }
                      multiple
                    />
                  }
                >
                  {displayTags(p.interests, interestLabels)}
                </EditableRow>
              </CardContent>
            </Card>

            {/* 通知設定 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">通知設定</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/30">
                  <EditableRow
                    label="受け取りたい案内"
                    field="notification_categories"
                    editContent={
                      <PillSelector
                        options={notifCategoryOptions}
                        selected={draftNotifCats}
                        onSelect={(key) =>
                          toggleDraftArray(
                            draftNotifCats,
                            key,
                            setDraftNotifCats
                          )
                        }
                        multiple
                      />
                    }
                  >
                    {displayTags(
                      p.notification_categories,
                      notifCategoryLabels
                    )}
                  </EditableRow>

                  <EditableRow
                    label="受け取り方法"
                    field="notification_channels"
                    editContent={
                      <PillSelector
                        options={channelOptions}
                        selected={draftChannel}
                        onSelect={setDraftChannel}
                      />
                    }
                  >
                    <span className="text-sm text-foreground">
                      {channelLabels[
                        Array.isArray(p.notification_channels)
                          ? p.notification_channels[0] || ""
                          : ""
                      ] || "未設定"}
                    </span>
                  </EditableRow>

                  <EditableRow
                    label="頻度"
                    field="notification_frequency"
                    editContent={
                      <PillSelector
                        options={frequencyOptions}
                        selected={draftFrequency}
                        onSelect={setDraftFrequency}
                      />
                    }
                  >
                    <span className="text-sm text-foreground">
                      {frequencyLabels[p.notification_frequency || ""] ||
                        "未設定"}
                    </span>
                  </EditableRow>
                </div>
              </CardContent>
            </Card>

            {/* LINE連携 */}
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">LINE連携</CardTitle>
              </CardHeader>
              <CardContent>
                {lineLinked ? (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#06C755" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">連携済み</p>
                      {lineDisplayName && (
                        <p className="text-xs text-muted-foreground">{lineDisplayName}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      LINEと連携すると、健診リマインドや大切なお知らせをLINEで受け取れます。
                    </p>
                    <a
                      href={userId ? "/api/auth/line/link" : "/api/auth/line"}
                      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#06C755" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                      </svg>
                      LINEと連携する
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 保存した記事 */}
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
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {showGuide && <PwaInstallGuide onClose={closeGuide} />}
    </>
  );
}
