"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "komorebi_vaccination_checklist";

interface Vaccine {
  name: string;
  type: "定期" | "任意";
  method: string;
  doses: number;
  schedule: { month: number; label: string }[];
  note?: string;
  articleLink?: string;
}

const vaccines: Vaccine[] = [
  {
    name: "B型肝炎（HBV）",
    type: "定期",
    method: "注射",
    doses: 3,
    schedule: [
      { month: 2, label: "1回目" },
      { month: 3, label: "2回目" },
      { month: 7, label: "3回目" },
    ],
  },
  {
    name: "ロタウイルス",
    type: "定期",
    method: "経口（飲む）",
    doses: 3,
    schedule: [
      { month: 2, label: "1回目" },
      { month: 3, label: "2回目" },
      { month: 4, label: "3回目" },
    ],
    note: "1回目は生後14週6日までに開始。腸重積症のリスクを避けるため早めに。",
  },
  {
    name: "五種混合（DPT-IPV-Hib）",
    type: "定期",
    method: "注射",
    doses: 4,
    schedule: [
      { month: 2, label: "1回目" },
      { month: 3, label: "2回目" },
      { month: 4, label: "3回目" },
      { month: 12, label: "追加" },
    ],
    note: "ジフテリア・百日咳・破傷風・ポリオ・ヒブの5種類を1本で接種。2024年4月から導入。",
  },
  {
    name: "小児用肺炎球菌（PCV20）",
    type: "定期",
    method: "注射",
    doses: 4,
    schedule: [
      { month: 2, label: "1回目" },
      { month: 3, label: "2回目" },
      { month: 4, label: "3回目" },
      { month: 12, label: "追加" },
    ],
    note: "2024年10月からプレベナー20（20価）が新たに使用可能に。",
  },
  {
    name: "BCG（結核）",
    type: "定期",
    method: "スタンプ式",
    doses: 1,
    schedule: [{ month: 5, label: "1回" }],
    note: "生後5〜8ヶ月未満が標準的な接種時期。12ヶ月未満まで接種可能。",
  },
  {
    name: "MR（麻しん・風しん）",
    type: "定期",
    method: "注射",
    doses: 2,
    schedule: [
      { month: 12, label: "1期" },
      { month: 60, label: "2期（就学前）" },
    ],
    note: "1歳になったらなるべく早く接種。",
  },
  {
    name: "水痘（みずぼうそう）",
    type: "定期",
    method: "注射",
    doses: 2,
    schedule: [
      { month: 12, label: "1回目" },
      { month: 18, label: "2回目" },
    ],
  },
  {
    name: "日本脳炎",
    type: "定期",
    method: "注射",
    doses: 3,
    schedule: [
      { month: 36, label: "1回目" },
      { month: 37, label: "2回目" },
      { month: 48, label: "追加" },
    ],
    note: "3歳から接種開始。地域の流行状況により早期接種の場合あり。",
  },
  {
    name: "おたふくかぜ",
    type: "任意",
    method: "注射",
    doses: 2,
    schedule: [
      { month: 12, label: "1回目" },
      { month: 60, label: "2回目" },
    ],
    note: "任意接種（自費）だが日本小児科学会は強く推奨。",
  },
  {
    name: "インフルエンザ",
    type: "任意",
    method: "注射",
    doses: 2,
    schedule: [{ month: 6, label: "毎年秋に2回" }],
    note: "生後6ヶ月から接種可能。流行シーズン前（10〜11月）に。",
  },
  {
    name: "RSVワクチン（アブリスボ）",
    type: "定期",
    method: "注射（妊婦に接種）",
    doses: 1,
    schedule: [{ month: -3, label: "妊娠28〜36週" }],
    note: "2026年4月から定期接種化。妊婦が接種し、胎盤経由で赤ちゃんに抗体を移行。",
    articleLink: "/learn/rsv-vaccine",
  },
];

const monthLabels = [
  { month: -3, label: "出産前" },
  { month: 0, label: "出生" },
  { month: 2, label: "2ヶ月" },
  { month: 3, label: "3ヶ月" },
  { month: 4, label: "4ヶ月" },
  { month: 5, label: "5ヶ月" },
  { month: 6, label: "6ヶ月" },
  { month: 7, label: "7〜8ヶ月" },
  { month: 12, label: "1歳" },
  { month: 18, label: "1歳半" },
  { month: 36, label: "3歳" },
];

export default function VaccinationSchedulePage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const userIdRef = useRef<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(null), 2000);
  }, []);

  // localStorage に保存
  const saveToLocal = useCallback((data: Record<string, boolean>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, []);

  // Supabase に非同期保存（エラー握りつぶし）
  const saveToSupabase = useCallback(async (data: Record<string, boolean>) => {
    if (!userIdRef.current) return;
    try {
      const supabase = createClient();
      await supabase
        .from("profiles")
        .update({ vaccination_checklist: data })
        .eq("id", userIdRef.current);
    } catch {
      // ignore
    }
  }, []);

  // 初期読み込み
  useEffect(() => {
    async function loadData() {
      // 1. localStorage から読み込み
      let localData: Record<string, boolean> | null = null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) localData = JSON.parse(raw);
      } catch {
        // ignore
      }

      // 2. Supabase から読み込み（ログインユーザーのみ）
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          userIdRef.current = user.id;
          const { data: profile } = await supabase
            .from("profiles")
            .select("vaccination_checklist")
            .eq("id", user.id)
            .single();

          if (profile?.vaccination_checklist && typeof profile.vaccination_checklist === "object") {
            const supabaseData = profile.vaccination_checklist as Record<string, boolean>;
            if (Object.keys(supabaseData).length > 0) {
              setChecked(supabaseData);
              saveToLocal(supabaseData);
              showToast("前回の記録を復元しました");
              return;
            }
          }
        }
      } catch {
        // テーブル/カラムがなくても動く
      }

      // 3. Supabaseデータがなければ localStorage フォールバック
      if (localData && Object.keys(localData).length > 0) {
        setChecked(localData);
      }
    }

    loadData();
  }, [saveToLocal, showToast]);

  function toggleCheck(key: string) {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveToLocal(next);
      saveToSupabase(next);
      showToast("保存しました");
      return next;
    });
  }

  function handleReset() {
    setChecked({});
    saveToLocal({});
    saveToSupabase({});
    setShowResetDialog(false);
    showToast("リセットしました");
  }

  const totalDoses = vaccines.reduce((sum, v) => sum + v.doses, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">予防接種</Badge>
              <Badge variant="secondary">チェックリスト</Badge>
              <Badge variant="secondary">2025-2026年版</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              予防接種スケジュール
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              お子さまの月齢に合わせた予防接種スケジュールです。
              接種済みのものにチェックを入れて、残りを確認できます。
            </p>
          </div>

          {/* 進捗バー */}
          <Card className="border-border/50 shadow-none mb-8">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">接種進捗</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {checkedCount} / {totalDoses} 回
                  </span>
                  {checkedCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => setShowResetDialog(true)}
                    >
                      リセット
                    </Button>
                  )}
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${totalDoses > 0 ? (checkedCount / totalDoses) * 100 : 0}%` }}
                />
              </div>

              {/* トースト */}
              {toast && (
                <div className="mt-3 text-xs text-primary bg-primary/10 rounded-md px-3 py-1.5 text-center transition-opacity">
                  {toast}
                </div>
              )}
            </CardContent>
          </Card>

          {/* リセット確認ダイアログ */}
          {showResetDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <Card className="w-80 shadow-lg">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground mb-4">
                    すべてのチェックをリセットしますか？この操作は元に戻せません。
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowResetDialog(false)}
                    >
                      キャンセル
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={handleReset}
                    >
                      リセット
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* タイムライン */}
          <div className="space-y-6">
            {monthLabels.map((period) => {
              const periodVaccines = vaccines.filter((v) =>
                v.schedule.some((s) => s.month === period.month)
              );
              if (periodVaccines.length === 0) return null;

              return (
                <section key={period.month}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{period.label}</span>
                    </div>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  <div className="space-y-3 ml-2">
                    {periodVaccines.map((vaccine) => {
                      const dose = vaccine.schedule.find((s) => s.month === period.month);
                      if (!dose) return null;
                      const checkKey = `${vaccine.name}-${dose.label}`;
                      const isChecked = checked[checkKey] || false;

                      return (
                        <Card
                          key={checkKey}
                          className={`border-border/50 shadow-none transition-all cursor-pointer ${
                            isChecked ? "bg-primary/5 border-primary/20" : ""
                          }`}
                          onClick={() => toggleCheck(checkKey)}
                        >
                          <CardContent className="pt-4 pb-4">
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isChecked
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "border-border"
                                }`}
                              >
                                {isChecked && (
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                    <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <h3 className={`font-semibold text-sm ${isChecked ? "text-muted-foreground line-through" : "text-foreground"}`}>
                                    {vaccine.name}
                                  </h3>
                                  <Badge variant={vaccine.type === "定期" ? "default" : "outline"} className="text-xs">
                                    {vaccine.type}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{dose.label}</span>
                                  <span className="text-xs text-muted-foreground">({vaccine.method})</span>
                                </div>
                                {vaccine.note && (
                                  <p className="text-xs text-muted-foreground leading-relaxed">{vaccine.note}</p>
                                )}
                                {vaccine.articleLink && (
                                  <Link
                                    href={vaccine.articleLink}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-xs text-primary hover:underline mt-1 inline-block"
                                  >
                                    詳しい情報を見る →
                                  </Link>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* 注意事項 */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">注意:</strong>{" "}
              このスケジュールは日本小児科学会の推奨スケジュール（2025年12月版）を参考に作成しています。
              実際の接種時期はお子さまの体調や医師の判断により変わることがあります。
              同時接種の組み合わせや具体的なスケジュールは、かかりつけの小児科にご相談ください。
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/rsv-vaccine"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              RSVワクチン判断ガイドを見る
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-lg px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
