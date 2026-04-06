"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleMeta } from "@/components/article-meta";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ShareButtons } from "@/components/share-buttons";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

// ── ストレージキー ──
const STORAGE_KEY_FETAL = "komorebi_fetal_movement_counter";
const STORAGE_KEY_CONTRACTION = "komorebi_contraction_counter";

// ── 型定義 ──
interface FetalSession {
  id: string;
  startedAt: number;
  counts: number[];       // タイムスタンプ配列（将来グラフ用）
  completedAt?: number;
  elapsedMs?: number;
}

interface ContractionRecord {
  id: string;
  startedAt: number;
  endedAt?: number;
  durationMs?: number;
  intervalMs?: number;    // 前回開始からの間隔
}

interface ContractionSession {
  records: ContractionRecord[];
}

// ── ヘルパー ──
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  if (totalSec < 60) return `${totalSec}秒`;
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return sec > 0 ? `${min}分${sec}秒` : `${min}分`;
}

function formatTimeOfDay(ts: number): string {
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

// ══════════════════════════════════════════
// 胎動カウンター コンポーネント
// ══════════════════════════════════════════
function FetalMovementTab() {
  const [session, setSession] = useState<FetalSession | null>(null);
  const [history, setHistory] = useState<FetalSession[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [showReset, setShowReset] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ローカルストレージ読み込み
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_FETAL);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.history) setHistory(data.history);
        if (data.session && !data.session.completedAt) {
          setSession(data.session);
        }
      }
    } catch { /* ignore */ }
  }, []);

  // 保存
  const save = useCallback((s: FetalSession | null, h: FetalSession[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_FETAL, JSON.stringify({ session: s, history: h }));
    } catch { /* ignore */ }
  }, []);

  // タイマー
  useEffect(() => {
    if (session && !session.completedAt) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - session.startedAt);
      }, 200);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    if (timerRef.current) clearInterval(timerRef.current);
  }, [session]);

  function handleStart() {
    const s: FetalSession = { id: genId(), startedAt: Date.now(), counts: [] };
    setSession(s);
    setElapsed(0);
    save(s, history);
  }

  function handleCount() {
    if (!session || session.completedAt) return;
    const now = Date.now();
    const newCounts = [...session.counts, now];

    if (newCounts.length >= 10) {
      const completed: FetalSession = {
        ...session,
        counts: newCounts,
        completedAt: now,
        elapsedMs: now - session.startedAt,
      };
      const newHistory = [completed, ...history].slice(0, 10);
      setSession(completed);
      setHistory(newHistory);
      save(null, newHistory);
    } else {
      const updated = { ...session, counts: newCounts };
      setSession(updated);
      save(updated, history);
    }
  }

  function handleReset() {
    if (timerRef.current) clearInterval(timerRef.current);
    setSession(null);
    setElapsed(0);
    save(null, history);
  }

  function handleClearHistory() {
    setHistory([]);
    save(session, []);
    setShowReset(false);
  }

  const count = session?.counts.length ?? 0;
  const isComplete = session?.completedAt != null;

  return (
    <div className="space-y-6">
      {/* メイン操作エリア */}
      <Card className="border-border/50 shadow-none">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-4">
            {/* カウント表示 */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">胎動カウント</p>
              <p className="text-5xl font-bold text-foreground">
                {count}<span className="text-xl text-muted-foreground ml-1">/ 10</span>
              </p>
            </div>

            {/* 経過時間 */}
            {session && (
              <div>
                <p className="text-sm text-muted-foreground mb-0.5">経過時間</p>
                <p className="text-2xl font-mono text-foreground">
                  {isComplete ? formatTime(session.elapsedMs!) : formatTime(elapsed)}
                </p>
              </div>
            )}

            {/* プログレスバー */}
            <div className="h-2 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(count / 10) * 100}%`,
                  backgroundColor: isComplete ? "#22c55e" : "#f472b6",
                }}
              />
            </div>

            {/* 10回完了メッセージ */}
            {isComplete && (
              <Card className="bg-green-50 border-green-200 shadow-none dark:bg-green-950/30 dark:border-green-800">
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    10回の胎動を{formatDuration(session!.elapsedMs!)}で記録しました
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    一般的に2時間以内に10回感じられれば正常な目安です
                  </p>
                </CardContent>
              </Card>
            )}

            {/* ボタン */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              {!session ? (
                <Button
                  onClick={handleStart}
                  className="h-20 text-xl rounded-2xl bg-pink-400 hover:bg-pink-500 text-white shadow-md"
                >
                  計測スタート
                </Button>
              ) : !isComplete ? (
                <>
                  <Button
                    onClick={handleCount}
                    className="h-24 text-2xl rounded-2xl bg-pink-400 hover:bg-pink-500 active:scale-95 text-white shadow-md transition-transform"
                  >
                    <span className="flex flex-col items-center">
                      <span>ポンっ</span>
                      <span className="text-sm opacity-80">タップで胎動を記録</span>
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleReset}
                    className="text-muted-foreground"
                  >
                    やり直す
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleStart}
                  className="h-16 text-lg rounded-2xl bg-pink-400 hover:bg-pink-500 text-white shadow-md"
                >
                  もう一度計測
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使い方 */}
      <Card className="bg-pink-50/50 border-pink-200/50 shadow-none dark:bg-pink-950/20 dark:border-pink-800/30">
        <CardContent className="pt-4 pb-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">使い方</h3>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>リラックスした姿勢で横になります</li>
            <li>「計測スタート」を押して計測を開始</li>
            <li>胎動を感じるたびに「ポンっ」ボタンをタップ</li>
            <li>10回到達までの時間が記録されます</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-2">
            <strong className="text-foreground">目安:</strong> 2時間以内に10回感じられれば正常とされています。
            毎日同じ時間帯に計測するのがおすすめです。
          </p>
        </CardContent>
      </Card>

      {/* 履歴 */}
      {history.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">記録の履歴</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground"
              onClick={() => setShowReset(true)}
            >
              履歴をクリア
            </Button>
          </div>
          <div className="space-y-2">
            {history.map((h) => (
              <Card key={h.id} className="border-border/50 shadow-none">
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">
                        {new Date(h.startedAt).toLocaleDateString("ja-JP")} {formatTimeOfDay(h.startedAt)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        10回カウント
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDuration(h.elapsedMs!)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {showReset && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <Card className="w-80 shadow-lg">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground mb-4">履歴をすべて削除しますか？</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowReset(false)}>キャンセル</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={handleClearHistory}>削除</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// 陣痛カウンター コンポーネント
// ══════════════════════════════════════════
function ContractionTab() {
  const [records, setRecords] = useState<ContractionRecord[]>([]);
  const [activeRecord, setActiveRecord] = useState<ContractionRecord | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [showReset, setShowReset] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ローカルストレージ読み込み
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONTRACTION);
      if (raw) {
        const data: ContractionSession = JSON.parse(raw);
        if (data.records) {
          setRecords(data.records);
          const last = data.records[0];
          if (last && !last.endedAt) {
            setActiveRecord(last);
          }
        }
      }
    } catch { /* ignore */ }
  }, []);

  // 保存
  const save = useCallback((recs: ContractionRecord[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTRACTION, JSON.stringify({ records: recs }));
    } catch { /* ignore */ }
  }, []);

  // タイマー
  useEffect(() => {
    if (activeRecord && !activeRecord.endedAt) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - activeRecord.startedAt);
      }, 200);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setElapsed(0);
  }, [activeRecord]);

  function handleStart() {
    const now = Date.now();
    const prevStart = records.length > 0 ? records[0].startedAt : undefined;
    const rec: ContractionRecord = {
      id: genId(),
      startedAt: now,
      intervalMs: prevStart ? now - prevStart : undefined,
    };
    setActiveRecord(rec);
    const newRecords = [rec, ...records].slice(0, 20);
    setRecords(newRecords);
    save(newRecords);
  }

  function handleEnd() {
    if (!activeRecord) return;
    const now = Date.now();
    const completed: ContractionRecord = {
      ...activeRecord,
      endedAt: now,
      durationMs: now - activeRecord.startedAt,
    };
    const newRecords = records.map((r) => (r.id === completed.id ? completed : r));
    setRecords(newRecords);
    setActiveRecord(null);
    save(newRecords);
  }

  function handleClear() {
    setRecords([]);
    setActiveRecord(null);
    setElapsed(0);
    save([]);
    setShowReset(false);
  }

  // 完了済みレコードのみ表示用（直近10件）
  const completedRecords = records.filter((r) => r.endedAt).slice(0, 10);

  // 平均間隔計算
  const intervalsWithValues = records.filter((r) => r.intervalMs != null);
  const avgInterval = intervalsWithValues.length > 0
    ? intervalsWithValues.reduce((sum, r) => sum + r.intervalMs!, 0) / intervalsWithValues.length
    : null;

  // 5分以内アラート
  const latestInterval = records.length > 0 ? records[0].intervalMs : null;
  const showHospitalAlert = latestInterval != null && latestInterval <= 5 * 60 * 1000;

  const isActive = activeRecord != null && !activeRecord.endedAt;

  return (
    <div className="space-y-6">
      {/* メイン操作エリア */}
      <Card className="border-border/50 shadow-none">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-4">
            {/* ステータス */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {isActive ? "陣痛中..." : "待機中"}
              </p>
              {isActive && (
                <p className="text-4xl font-mono text-foreground">
                  {formatTime(elapsed)}
                </p>
              )}
            </div>

            {/* 統計 */}
            {(avgInterval != null || completedRecords.length > 0) && (
              <div className="flex justify-center gap-6">
                {avgInterval != null && (
                  <div>
                    <p className="text-xs text-muted-foreground">平均間隔</p>
                    <p className="text-lg font-semibold text-foreground">{formatDuration(avgInterval)}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground">記録回数</p>
                  <p className="text-lg font-semibold text-foreground">{records.length}回</p>
                </div>
              </div>
            )}

            {/* 病院連絡アラート */}
            {showHospitalAlert && (
              <Card className="bg-red-50 border-red-300 shadow-none dark:bg-red-950/30 dark:border-red-800">
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm font-bold text-red-700 dark:text-red-300">
                    間隔が5分以内です
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    病院・産院に連絡する目安です。落ち着いて電話しましょう。
                  </p>
                </CardContent>
              </Card>
            )}

            {/* ボタン */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              {!isActive ? (
                <Button
                  onClick={handleStart}
                  className="h-24 text-2xl rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-md transition-transform"
                >
                  <span className="flex flex-col items-center">
                    <span>陣痛開始</span>
                    <span className="text-sm opacity-80">痛みが始まったらタップ</span>
                  </span>
                </Button>
              ) : (
                <Button
                  onClick={handleEnd}
                  className="h-24 text-2xl rounded-2xl bg-slate-500 hover:bg-slate-600 active:scale-95 text-white shadow-md transition-transform"
                >
                  <span className="flex flex-col items-center">
                    <span>陣痛おさまった</span>
                    <span className="text-sm opacity-80">痛みが引いたらタップ</span>
                  </span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使い方 */}
      <Card className="bg-rose-50/50 border-rose-200/50 shadow-none dark:bg-rose-950/20 dark:border-rose-800/30">
        <CardContent className="pt-4 pb-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">使い方</h3>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>痛みが来たら「陣痛開始」ボタンをタップ</li>
            <li>痛みが引いたら「陣痛おさまった」をタップ</li>
            <li>継続時間と間隔が自動で記録されます</li>
            <li>間隔が短くなってきたら病院へ連絡しましょう</li>
          </ol>
          <div className="mt-2 p-2 bg-background rounded text-xs text-muted-foreground">
            <strong className="text-foreground">入院の目安:</strong>
            初産婦さんは間隔<strong className="text-foreground">10分</strong>、
            経産婦さんは<strong className="text-foreground">15分</strong>で産院に連絡。
            間隔が<strong className="text-foreground">5分以内</strong>になったらすぐに向かいましょう。
          </div>
        </CardContent>
      </Card>

      {/* 履歴 */}
      {completedRecords.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">陣痛の記録</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground"
              onClick={() => setShowReset(true)}
            >
              記録をクリア
            </Button>
          </div>
          <div className="space-y-2">
            {completedRecords.map((r) => (
              <Card key={r.id} className="border-border/50 shadow-none">
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">
                        {formatTimeOfDay(r.startedAt)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        継続: {formatDuration(r.durationMs!)}
                        {r.intervalMs && ` / 間隔: ${formatDuration(r.intervalMs)}`}
                      </p>
                    </div>
                    {r.intervalMs && r.intervalMs <= 5 * 60 * 1000 && (
                      <Badge className="bg-red-100 text-red-700 border-red-200 text-xs dark:bg-red-950 dark:text-red-300 dark:border-red-800">
                        5分以内
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {showReset && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <Card className="w-80 shadow-lg">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground mb-4">記録をすべて削除しますか？</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowReset(false)}>キャンセル</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={handleClear}>削除</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// メインページ
// ══════════════════════════════════════════
export default function ContractionCounterPage() {
  const [tab, setTab] = useState<"fetal" | "contraction">("fetal");

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <BreadcrumbNav items={[
              { label: "トップ", href: "/" },
              { label: "学ぶ", href: "/learn" },
              { label: "胎動・陣痛カウンター" },
            ]} />
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">出産準備</Badge>
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge className="bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800">ツール</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              胎動・陣痛カウンター
            </h1>
            <ArticleMeta updatedAt="2026-04-06" />
            <p className="text-muted-foreground leading-relaxed">
              赤ちゃんの胎動を数えたり、陣痛の間隔を記録できるツールです。
              スマホで片手操作しやすい設計になっています。
            </p>
          </div>

          {/* タブ切り替え */}
          <div className="flex rounded-xl bg-muted p-1 mb-6">
            <button
              onClick={() => setTab("fetal")}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                tab === "fetal"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1.5">👶</span>胎動カウンター
            </button>
            <button
              onClick={() => setTab("contraction")}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                tab === "contraction"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1.5">🫁</span>陣痛カウンター
            </button>
          </div>

          {/* タブコンテンツ */}
          {tab === "fetal" ? <FetalMovementTab /> : <ContractionTab />}

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mt-8 mb-4">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">不安なときは、いつでも病院に相談を</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                胎動が少ないと感じたり、陣痛の進みが心配なときは、遠慮なく産院に電話してください。
                「こんなことで電話していいのかな」と思う必要はありません。
                確認してもらうだけで安心できます。
              </p>
            </CardContent>
          </Card>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的とした計測ツールです。
              医学的な診断・助言を行うものではありません。
              体調に異変を感じた場合は速やかにかかりつけ医にご相談ください。
            </p>
          </div>

          <ShareButtons title="胎動・陣痛カウンター" path="/learn/contraction-counter" />
        </div>
      </main>
      <Footer />
    </>
  );
}
