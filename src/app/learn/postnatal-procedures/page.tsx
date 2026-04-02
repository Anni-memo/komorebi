"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { PdfDownloadSection } from "@/components/pdf-download-section";

const STORAGE_KEY = "komorebi_postnatal_checklist";

interface Procedure {
  title: string;
  deadline: string;
  where: string;
  documents: string[];
  notes: string;
  priority: string;
  priorityColor: string;
  amounts?: { category: string; amount: string }[];
}

const procedures: Procedure[] = [
  {
    title: "出生届",
    deadline: "出生日を含めて14日以内",
    where: "市区町村役場（届出地・本籍地・出生地のいずれか）",
    documents: [
      "出生届（病院でもらう出生証明書付き）",
      "母子健康手帳",
      "届出人の印鑑（任意だが持参推奨）",
      "届出人の本人確認書類",
    ],
    notes: "届出人は原則として父または母。14日を過ぎると届出義務違反になるため、入院中にパートナーや家族に依頼することも検討しましょう",
    priority: "最優先",
    priorityColor: "bg-red-100 text-red-700",
  },
  {
    title: "健康保険の加入",
    deadline: "出生後すみやかに（1ヶ月健診までに）",
    where: "勤務先（社会保険）または市区町村役場（国民健康保険）",
    documents: [
      "健康保険被扶養者届（社保の場合）",
      "出生届出済証明のある母子健康手帳",
      "届出人の保険証",
    ],
    notes: "1ヶ月健診で保険証が必要になります。社会保険の場合は勤務先の担当部署、国民健康保険の場合は市区町村役場で手続きします",
    priority: "最優先",
    priorityColor: "bg-red-100 text-red-700",
  },
  {
    title: "児童手当の申請",
    deadline: "出生日の翌日から15日以内",
    where: "住所地の市区町村役場",
    documents: [
      "児童手当認定請求書",
      "請求者の健康保険証の写し",
      "請求者名義の振込先口座情報",
      "請求者のマイナンバー確認書類",
    ],
    notes: "出生日の翌日から15日以内に申請すれば、出生月の翌月分から支給されます（15日特例）。月末出生の場合は特に注意が必要です。2024年10月の制度改正で、所得制限が撤廃され、第3子以降は月3万円に増額されました",
    priority: "重要",
    priorityColor: "bg-orange-100 text-orange-700",
    amounts: [
      { category: "3歳未満", amount: "月額15,000円" },
      { category: "3歳〜小学校修了前（第1子・第2子）", amount: "月額10,000円" },
      { category: "3歳〜小学校修了前（第3子以降）", amount: "月額30,000円" },
      { category: "中学生", amount: "月額10,000円" },
      { category: "高校生（2024年10月〜）", amount: "月額10,000円" },
    ],
  },
  {
    title: "出産育児一時金",
    deadline: "出産日の翌日から2年以内",
    where: "加入している健康保険組合・協会けんぽ・市区町村",
    documents: [
      "出産育児一時金支給申請書",
      "出生を証明する書類（母子健康手帳の写し等）",
      "医療機関との直接支払制度の合意文書",
    ],
    notes: "2023年4月から1児につき50万円に増額。多くの医療機関では「直接支払制度」が利用でき、窓口負担が軽減されます。差額がある場合は別途申請が必要です",
    priority: "重要",
    priorityColor: "bg-orange-100 text-orange-700",
  },
  {
    title: "乳幼児医療費助成（子ども医療費助成）",
    deadline: "出生後すみやかに（健康保険加入後）",
    where: "住所地の市区町村役場",
    documents: [
      "子ども医療費助成申請書",
      "子どもの健康保険証",
      "保護者の本人確認書類",
      "保護者のマイナンバー確認書類",
    ],
    notes: "自治体によって助成内容（対象年齢・自己負担の有無）が大きく異なります。お住まいの自治体のウェブサイトで確認しましょう。健康保険証ができてから申請します",
    priority: "重要",
    priorityColor: "bg-orange-100 text-orange-700",
  },
  {
    title: "マイナンバーの取得",
    deadline: "出生届提出後に通知カードが届く（申請は任意）",
    where: "市区町村役場",
    documents: [
      "個人番号カード交付申請書（通知カードに同封）",
      "顔写真（マイナンバーカード申請時）",
    ],
    notes: "出生届を提出すると自動的にマイナンバーが付番され、通知カードが届きます。マイナンバーカード自体の作成は任意ですが、各種手続きで番号が必要になる場面があります。マイナポータルからオンライン申請も可能です",
    priority: "確認",
    priorityColor: "bg-blue-100 text-blue-700",
  },
];

const timelineSteps = [
  { timing: "出産当日〜", tasks: "出生届の準備（病院で出生証明書を受け取る）" },
  { timing: "退院まで", tasks: "出産育児一時金の直接支払制度の確認・手続き" },
  { timing: "14日以内", tasks: "出生届の提出" },
  { timing: "15日以内", tasks: "児童手当の申請" },
  { timing: "1ヶ月健診まで", tasks: "健康保険の加入、乳幼児医療費助成の申請" },
  { timing: "届出後", tasks: "マイナンバー通知カードの受け取り" },
];

export default function PostnatalProceduresPage() {
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

  const saveToLocal = useCallback((data: Record<string, boolean>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* ignore */ }
  }, []);

  const saveToSupabase = useCallback(async (data: Record<string, boolean>) => {
    if (!userIdRef.current) return;
    try {
      const supabase = createClient();
      await supabase
        .from("profiles")
        .update({ postnatal_checklist: data })
        .eq("id", userIdRef.current);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    async function loadData() {
      let localData: Record<string, boolean> | null = null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) localData = JSON.parse(raw);
      } catch { /* ignore */ }

      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          userIdRef.current = user.id;
          const { data: profile } = await supabase
            .from("profiles")
            .select("postnatal_checklist")
            .eq("id", user.id)
            .single();

          if (profile?.postnatal_checklist && typeof profile.postnatal_checklist === "object") {
            const supabaseData = profile.postnatal_checklist as Record<string, boolean>;
            if (Object.keys(supabaseData).length > 0) {
              setChecked(supabaseData);
              saveToLocal(supabaseData);
              showToast("前回の記録を復元しました");
              return;
            }
          }
        }
      } catch { /* ignore */ }

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

  const totalItems = procedures.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">手続き</Badge>
              <Badge variant="secondary">出産直後の方向け</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">
                保存版
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              出産後に必要な手続き一覧
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              出産後は体の回復と赤ちゃんのお世話で大変な時期ですが、
              期限のある手続きがいくつかあります。完了したものにチェックを入れて進捗を管理できます。
            </p>
          </div>

          {/* 進捗バー */}
          <Card className="border-border/50 shadow-none mb-8">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">手続き進捗</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {checkedCount} / {totalItems} 件
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
                  style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }}
                />
              </div>
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
                    <Button variant="ghost" size="sm" onClick={() => setShowResetDialog(false)}>
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

          {/* タイムライン概要 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📅</span>
              手続きのタイムライン
            </h2>
            <Card className="bg-komorebi-light/30 border-primary/20 shadow-none">
              <CardContent className="pt-5">
                <div className="space-y-3">
                  {timelineSteps.map((step) => (
                    <div key={step.timing} className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 mt-0.5 min-w-[90px] justify-center">
                        {step.timing}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{step.tasks}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 各手続きの詳細（チェックリスト付き） */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>📝</span>
              各手続きの詳細
            </h2>
            <div className="space-y-4">
              {procedures.map((proc, i) => {
                const checkKey = proc.title;
                const isChecked = checked[checkKey] || false;

                return (
                  <Card
                    key={proc.title}
                    className={`border-border/50 shadow-none transition-all ${
                      isChecked ? "bg-primary/5 border-primary/20" : ""
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => toggleCheck(checkKey)}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
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
                        <CardTitle className={`text-base ${isChecked ? "text-muted-foreground line-through" : ""}`}>
                          {proc.title}
                        </CardTitle>
                        <Badge className={proc.priorityColor}>{proc.priority}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm ml-8">
                        <div>
                          <strong className="text-foreground">期限:</strong>{" "}
                          <span className="text-muted-foreground">{proc.deadline}</span>
                        </div>
                        <div>
                          <strong className="text-foreground">届出先:</strong>{" "}
                          <span className="text-muted-foreground">{proc.where}</span>
                        </div>
                        <div>
                          <strong className="text-foreground">必要書類:</strong>
                          <ul className="mt-1 space-y-1">
                            {proc.documents.map((doc) => (
                              <li key={doc} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {proc.amounts && (
                          <div>
                            <strong className="text-foreground">支給額:</strong>
                            <div className="mt-1 space-y-1">
                              {proc.amounts.map((a) => (
                                <div key={a.category} className="flex items-center gap-2 text-muted-foreground">
                                  <span className="text-xs">{a.category}:</span>
                                  <span className="font-semibold text-foreground text-xs">{a.amount}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="text-xs bg-muted/30 rounded p-2 text-muted-foreground leading-relaxed">
                          {proc.notes}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* パートナーや家族へ */}
          <Card className="border-primary/30 bg-primary/5 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>👥</span>
                パートナー・ご家族の方へ
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                出産直後のお母さんは体の回復中です。手続きの多くは代理で行うことができます。
                出生届の届出人は父または母ですが、届出自体は使者（代理人）でも可能です。
                事前に必要書類を確認し、入院中に進められる手続きはパートナーやご家族が担当すると、
                産後の負担を大きく減らすことができます。
              </p>
            </CardContent>
          </Card>

          {/* 出典 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">出典・参考情報</h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 厚生労働省. &quot;児童手当制度のご案内.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 厚生労働省. &quot;出産育児一時金の支給額・支払方法について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 法務省. &quot;出生届について.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[4]</strong> デジタル庁. &quot;マイナンバーカードの申請について.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 免責事項 */}
          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としています。
              制度の詳細や必要書類は自治体・加入保険によって異なる場合があります。
              最新の情報は、お住まいの市区町村窓口またはウェブサイトでご確認ください。
            </p>
          </div>

          <div className="mt-8">
            <PdfDownloadSection
              title="産後の手続きチェックリスト"
              catchcopy="出産後14日が勝負。漏れゼロへ"
              description="出生届・児童手当・保険加入など、期限付きの手続きをチェックリストにまとめました。"
              pdfPath="/pdf/postnatal-procedures.pdf"
              usageTips={[
                { icon: "print", text: "入院バッグに入れておく" },
                { icon: "share", text: "届出担当のパートナーに渡す" },
                { icon: "other", text: "役所の窓口に持参" },
              ]}
            />
          </div>

          <div className="mt-4">
            <PdfDownloadSection
              title="児童手当・子育て支援制度 比較表"
              catchcopy="もらえるお金、全部わかる"
              description="児童手当・出産一時金・育休給付金など、申請先・金額・期限を一覧にまとめました。"
              pdfPath="/pdf/childcare-benefits.pdf"
              usageTips={[
                { icon: "print", text: "役所の窓口に持参" },
                { icon: "share", text: "パートナーと制度確認" },
                { icon: "other", text: "自治体独自制度のメモ欄付き" },
              ]}
            />
          </div>

          {/* 導線 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/learn/mental-care"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors"
            >
              産後のメンタルケアを読む
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
