"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import {
  pregnancyWeeks,
  trimesterInfo,
  type PregnancyWeekData,
} from "@/lib/pregnancy-calendar-data";
import { calcWeeksFromDueDate } from "@/lib/stage-messages";
import { createClient } from "@/lib/supabase/client";

type ViewMode = "calendar" | "timeline";

const trimesterColors = {
  1: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    card: "border-l-rose-400",
    bg: "bg-rose-50/50",
    progress: "bg-rose-400",
    dot: "bg-rose-400",
    ring: "ring-rose-400",
  },
  2: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    card: "border-l-amber-400",
    bg: "bg-amber-50/50",
    progress: "bg-amber-400",
    dot: "bg-amber-400",
    ring: "ring-amber-400",
  },
  3: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    card: "border-l-emerald-400",
    bg: "bg-emerald-50/50",
    progress: "bg-emerald-400",
    dot: "bg-emerald-400",
    ring: "ring-emerald-400",
  },
} as const;

function WeekCard({
  data,
  isCurrentWeek,
  isExpanded,
  onToggle,
}: {
  data: PregnancyWeekData;
  isCurrentWeek: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const colors = trimesterColors[data.trimester];
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={cardRef} id={`week-${data.week}`} className="relative">
      {/* タイムラインドット */}
      <div
        className={`absolute left-0 top-5 w-3 h-3 rounded-full border-2 border-background z-10 ${
          isCurrentWeek ? `${colors.dot} ring-2 ${colors.ring} ring-offset-2` : "bg-muted-foreground/30"
        }`}
      />

      <Card
        className={`ml-6 border-l-4 ${colors.card} ${
          isCurrentWeek ? `${colors.bg} ring-2 ${colors.ring}` : ""
        } shadow-none cursor-pointer transition-colors hover:bg-muted/20`}
        onClick={onToggle}
      >
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`${colors.badge} text-xs border`}>
                {data.week}週
              </Badge>
              {isCurrentWeek && (
                <Badge className="bg-primary text-primary-foreground text-xs">
                  今ここ
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">
                {data.babySizeComparison}
              </span>
              <span
                className={`text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}
                aria-hidden
              >
                &#9660;
              </span>
            </div>
          </div>
          <CardTitle className="text-sm font-medium mt-1">
            {data.babySize.lengthCm}cm / {data.babySize.weightG}g
          </CardTitle>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 px-4 pb-4">
            <div className="space-y-3 mt-2">
              {/* 赤ちゃんの発達 */}
              <div className="bg-pink-50/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-pink-700 mb-1 flex items-center gap-1">
                  <span aria-hidden>&#x1F476;</span> 赤ちゃんの発達
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {data.babyDevelopment}
                </p>
              </div>

              {/* ママの体の変化 */}
              <div className="bg-purple-50/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-purple-700 mb-1 flex items-center gap-1">
                  <span aria-hidden>&#x1F469;</span> ママの体の変化
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {data.momChanges}
                </p>
              </div>

              {/* やること・注意 */}
              <div className="bg-sky-50/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-sky-700 mb-1 flex items-center gap-1">
                  <span aria-hidden>&#x2705;</span> やること・注意
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {data.todoAndTips}
                </p>
              </div>

            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

/* ─── カレンダービュー ─── */

function getTrimesterForDate(date: Date, lmpDate: Date): 1 | 2 | 3 | null {
  const diffDays = Math.floor(
    (date.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const week = Math.floor(diffDays / 7);
  if (week < 4 || week > 42) return null;
  if (week <= 13) return 1;
  if (week <= 27) return 2;
  return 3;
}

function getWeekForDate(date: Date, lmpDate: Date): number | null {
  const diffDays = Math.floor(
    (date.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const week = Math.floor(diffDays / 7);
  if (week < 4 || week > 42) return null;
  return week;
}

function getDayOfWeekForDate(date: Date, lmpDate: Date): number {
  const diffDays = Math.floor(
    (date.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays % 7;
}

const trimesterBgColors = {
  1: "bg-rose-100/60",
  2: "bg-amber-100/60",
  3: "bg-emerald-100/60",
} as const;

const trimesterBorderColors = {
  1: "border-rose-300",
  2: "border-amber-300",
  3: "border-emerald-300",
} as const;

const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

function CalendarView({
  dueDate,
  currentWeek,
  onSelectWeek,
}: {
  dueDate: string;
  currentWeek: number | null;
  onSelectWeek: (week: number) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // LMP（最終月経日）= 出産予定日 - 280日
  const [dy, dm, dd] = dueDate.split("-").map(Number);
  const due = new Date(dy, dm - 1, dd);
  due.setHours(0, 0, 0, 0);
  const lmpDate = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);

  // 妊娠4週の開始日（LMP + 28日）
  const week4Start = new Date(lmpDate.getTime() + 28 * 24 * 60 * 60 * 1000);
  // 42週の終了日（LMP + 42*7日）
  const week42End = new Date(lmpDate.getTime() + 42 * 7 * 24 * 60 * 60 * 1000);

  // 表示開始月と終了月
  const startMonth = new Date(week4Start.getFullYear(), week4Start.getMonth(), 1);
  const endMonth = new Date(week42End.getFullYear(), week42End.getMonth(), 1);

  // 全月のリスト
  const months: Date[] = [];
  const m = new Date(startMonth);
  while (m <= endMonth) {
    months.push(new Date(m));
    m.setMonth(m.getMonth() + 1);
  }

  // 表示中の月インデックス
  const [monthIndex, setMonthIndex] = useState(() => {
    // 今日が含まれる月を初期表示
    const todayMonth = months.findIndex(
      (month) =>
        month.getFullYear() === today.getFullYear() &&
        month.getMonth() === today.getMonth()
    );
    return todayMonth >= 0 ? todayMonth : 0;
  });

  const [selectedWeekData, setSelectedWeekData] =
    useState<PregnancyWeekData | null>(null);

  const goToToday = useCallback(() => {
    const idx = months.findIndex(
      (month) =>
        month.getFullYear() === today.getFullYear() &&
        month.getMonth() === today.getMonth()
    );
    if (idx >= 0) setMonthIndex(idx);
  }, [months, today]);

  const currentMonth = months[monthIndex];
  if (!currentMonth) return null;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // 月の日数
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // 月初の曜日（0=日曜）
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // カレンダーセルを生成
  const cells: (null | {
    day: number;
    date: Date;
    isToday: boolean;
    trimester: 1 | 2 | 3 | null;
    week: number | null;
    dayOfPregnancy: number;
  })[] = [];

  // 月初の空セル
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const trimester = getTrimesterForDate(date, lmpDate);
    const week = getWeekForDate(date, lmpDate);
    const dayOfPregnancy = getDayOfWeekForDate(date, lmpDate);
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    cells.push({
      day,
      date,
      isToday,
      trimester,
      week,
      dayOfPregnancy,
    });
  }

  const handleCellClick = (week: number | null) => {
    if (week === null) return;
    const data = pregnancyWeeks.find((w) => w.week === week);
    if (data) {
      setSelectedWeekData(selectedWeekData?.week === data.week ? null : data);
    }
  };

  return (
    <div className="space-y-4">
      {/* 月ナビゲーション */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMonthIndex(Math.max(0, monthIndex - 1))}
          disabled={monthIndex === 0}
          className="h-8 px-3 text-xs"
        >
          &#9664; 前月
        </Button>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {year}年{month + 1}月
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToToday}
            className="h-7 px-2 text-xs text-primary"
          >
            今日
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setMonthIndex(Math.min(months.length - 1, monthIndex + 1))
          }
          disabled={monthIndex === months.length - 1}
          className="h-8 px-3 text-xs"
        >
          次月 &#9654;
        </Button>
      </div>

      {/* 凡例 */}
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-rose-100/80 border border-rose-200" />
          初期
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-amber-100/80 border border-amber-200" />
          中期
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-emerald-100/80 border border-emerald-200" />
          後期
        </span>
      </div>

      {/* カレンダーグリッド */}
      <div className="border border-border rounded-lg overflow-hidden">
        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 bg-muted/50">
          {WEEKDAY_LABELS.map((label, i) => (
            <div
              key={label}
              className={`text-center text-xs font-medium py-2 ${
                i === 0 ? "text-rose-500" : i === 6 ? "text-sky-500" : "text-muted-foreground"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* 日付セル */}
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            if (!cell) {
              return <div key={`empty-${i}`} className="h-14 border-t border-border/30" />;
            }

            const bgColor = cell.trimester
              ? trimesterBgColors[cell.trimester]
              : "";
            const isCurrentWeekCell = cell.week === currentWeek;
            const isSelected = selectedWeekData?.week === cell.week;

            return (
              <button
                key={cell.day}
                onClick={() => handleCellClick(cell.week)}
                disabled={cell.trimester === null}
                className={`
                  h-14 sm:h-16 border-t border-border/30 relative flex flex-col items-center justify-center
                  transition-all text-xs
                  ${bgColor}
                  ${cell.isToday ? "ring-2 ring-primary ring-inset font-bold" : ""}
                  ${isCurrentWeekCell && !cell.isToday ? "ring-1 ring-primary/40 ring-inset" : ""}
                  ${isSelected ? "ring-2 ring-foreground/50 ring-inset" : ""}
                  ${cell.trimester ? "cursor-pointer hover:brightness-95" : "cursor-default text-muted-foreground/40"}
                `}
              >
                <span
                  className={`${
                    cell.isToday
                      ? "bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                      : ""
                  }`}
                >
                  {cell.day}
                </span>
                {cell.week !== null && (
                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    {cell.week}w{cell.dayOfPregnancy}d
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 選択した週の詳細 */}
      {selectedWeekData && (
        <Card className="border-l-4 shadow-none animate-in fade-in slide-in-from-top-2 duration-200"
          style={{
            borderLeftColor:
              selectedWeekData.trimester === 1
                ? "#fb7185"
                : selectedWeekData.trimester === 2
                  ? "#fbbf24"
                  : "#34d399",
          }}
        >
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                className={`${trimesterColors[selectedWeekData.trimester].badge} text-xs border`}
              >
                {selectedWeekData.week}週
              </Badge>
              <span className="text-xs text-muted-foreground">
                {selectedWeekData.babySizeComparison}
              </span>
              <span className="text-xs text-muted-foreground">
                {selectedWeekData.babySize.lengthCm}cm /{" "}
                {selectedWeekData.babySize.weightG}g
              </span>
              {currentWeek === selectedWeekData.week && (
                <Badge className="bg-primary text-primary-foreground text-xs">
                  今ここ
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              <div className="bg-pink-50/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-pink-700 mb-1">
                  &#x1F476; 赤ちゃんの発達
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedWeekData.babyDevelopment}
                </p>
              </div>
              <div className="bg-purple-50/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-purple-700 mb-1">
                  &#x1F469; ママの体の変化
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedWeekData.momChanges}
                </p>
              </div>
              <div className="bg-sky-50/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-sky-700 mb-1">
                  &#x2705; やること・注意
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedWeekData.todoAndTips}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ─── メインページ ─── */

export default function PregnancyCalendarPage() {
  const [dueDate, setDueDate] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());
  const [filterTrimester, setFilterTrimester] = useState<1 | 2 | 3 | null>(
    null
  );
  const currentWeekRef = useRef<HTMLDivElement>(null);

  // ログイン中のユーザーの出産予定日を自動取得
  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from("profiles")
          .select("expected_due_date")
          .eq("id", user.id)
          .single();
        if (data?.expected_due_date && !dueDate) {
          setDueDate(data.expected_due_date);
        }
      } catch {
        // 未ログインや取得失敗時は手入力に任せる
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentWeek = useMemo(() => {
    if (!dueDate) return null;
    const weeks = calcWeeksFromDueDate(dueDate);
    if (weeks < 4 || weeks > 42) return null;
    return weeks;
  }, [dueDate]);

  // 出産予定日入力後、現在の週にスクロール
  useEffect(() => {
    if (currentWeek) {
      setExpandedWeeks(new Set([currentWeek]));
      // 少し遅延してスクロール
      const timer = setTimeout(() => {
        const el = document.getElementById(`week-${currentWeek}`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentWeek]);

  const filteredWeeks = useMemo(() => {
    if (!filterTrimester) return pregnancyWeeks;
    return pregnancyWeeks.filter((w) => w.trimester === filterTrimester);
  }, [filterTrimester]);

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) {
        next.delete(week);
      } else {
        next.add(week);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedWeeks(new Set(filteredWeeks.map((w) => w.week)));
  };

  const collapseAll = () => {
    setExpandedWeeks(new Set());
  };

  // 進捗バー
  const progressPercent = currentWeek
    ? Math.min(100, Math.max(0, ((currentWeek - 4) / (40 - 4)) * 100))
    : 0;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav
              items={[
                { label: "トップ", href: "/" },
                { label: "学ぶ", href: "/learn" },
                { label: "妊娠カレンダー" },
              ]}
            />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">妊娠・出産</Badge>
              <Badge variant="secondary">4〜42週</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              妊娠カレンダー
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              出産予定日を入力すると、今の週数がハイライトされます。
              赤ちゃんの成長とママの体の変化を週ごとに確認できます。
            </p>
          </div>

          {/* 出産予定日入力 */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-6">
            <CardContent className="pt-5">
              <label className="block text-sm font-semibold text-foreground mb-2">
                出産予定日を入力
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {currentWeek && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      現在 {currentWeek}週
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      （出産予定日まであと{" "}
                      {Math.max(
                        0,
                        Math.ceil(
                          (new Date(dueDate).getTime() - Date.now()) /
                            (1000 * 60 * 60 * 24)
                        )
                      )}
                      日）
                    </span>
                  </div>
                )}
              </div>

              {/* 進捗バー */}
              {currentWeek && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>4週</span>
                    <span>40週</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${progressPercent}%`,
                        background:
                          "linear-gradient(90deg, #f472b6, #fbbf24, #34d399)",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>初期</span>
                    <span>中期</span>
                    <span>後期</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ビュー切替タブ */}
          <div className="flex gap-1 p-1 bg-muted/50 rounded-lg mb-6">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                viewMode === "calendar"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              &#x1F4C5; カレンダー
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                viewMode === "timeline"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              &#x1F4CB; タイムライン
            </button>
          </div>

          {/* カレンダービュー */}
          {viewMode === "calendar" && (
            dueDate ? (
              <CalendarView
                dueDate={dueDate}
                currentWeek={currentWeek}
                onSelectWeek={(week) => {
                  setExpandedWeeks(new Set([week]));
                  setViewMode("timeline");
                  setTimeout(() => {
                    const el = document.getElementById(`week-${week}`);
                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 200);
                }}
              />
            ) : (
              <Card className="shadow-none border-dashed mb-6">
                <CardContent className="pt-6 pb-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    出産予定日を入力すると、カレンダーが表示されます
                  </p>
                </CardContent>
              </Card>
            )
          )}

          {/* タイムラインビュー */}
          {viewMode === "timeline" && (
            <>
              {/* トリメスター概要 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {trimesterInfo.map((t) => {
                  const colors = trimesterColors[t.trimester];
                  const isActive = filterTrimester === t.trimester;
                  return (
                    <button
                      key={t.trimester}
                      onClick={() =>
                        setFilterTrimester(isActive ? null : t.trimester)
                      }
                      className={`text-left p-3 rounded-lg border transition-all ${
                        isActive
                          ? `${colors.bg} border-current ring-1 ${colors.ring}`
                          : "border-border/50 hover:bg-muted/30"
                      }`}
                    >
                      <Badge className={`${colors.badge} text-xs border mb-2`}>
                        {t.label}
                      </Badge>
                      <p className="text-xs text-muted-foreground font-medium">
                        {t.weeks}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {t.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* 展開/折りたたみ */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {filterTrimester
                    ? `${trimesterInfo[filterTrimester - 1].label}（${filteredWeeks.length}週分）`
                    : `全${filteredWeeks.length}週`}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={expandAll}
                    className="text-xs h-7"
                  >
                    すべて開く
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={collapseAll}
                    className="text-xs h-7"
                  >
                    すべて閉じる
                  </Button>
                </div>
              </div>

              {/* タイムライン */}
              <div className="relative">
                {/* タイムラインの縦線 */}
                <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-3">
                  {filteredWeeks.map((weekData) => (
                    <WeekCard
                      key={weekData.week}
                      data={weekData}
                      isCurrentWeek={currentWeek === weekData.week}
                      isExpanded={expandedWeeks.has(weekData.week)}
                      onToggle={() => toggleWeek(weekData.week)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 注意事項 */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mt-8 mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">
                赤ちゃんの成長には個人差があります
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                このカレンダーに掲載されているサイズや体重は平均的な目安です。
                赤ちゃんの成長スピードは一人ひとり異なります。
                健診で医師から問題ないと言われていれば、数値が平均と異なっていても心配する必要はありません。
                気になることがあれば、かかりつけの産婦人科に相談しましょう。
              </p>
            </CardContent>
          </Card>

          {/* 出典 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs font-semibold text-foreground mb-2">
              参考文献・出典
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                厚生労働省「妊産婦のための食生活指針」
              </li>
              <li>
                日本産科婦人科学会「産婦人科診療ガイドライン」
              </li>
              <li>
                母子健康手帳
              </li>
              <li>
                日本産婦人科医会「妊娠中の注意点」
              </li>
            </ul>
          </div>

          <ShareButtons
            title="妊娠カレンダー"
            path="/learn/pregnancy-calendar"
          />
          <MedicalDisclaimer />

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link
              href="/learn/hospital-bag"
              className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              入院バッグ準備リスト
            </Link>
            <Link
              href="/learn/pregnancy-nutrition"
              className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              妊娠中の栄養ガイド
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50 transition-colors"
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
