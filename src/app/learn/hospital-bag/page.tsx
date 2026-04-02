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
import { ArticleMeta } from "@/components/article-meta";

const STORAGE_KEY = "komorebi_hospital_bag_checklist";

interface BagItem {
  item: string;
  note: string;
}

const laborBagItems: BagItem[] = [
  { item: "母子手帳", note: "これがないと受付できないことも" },
  { item: "健康保険証", note: "コピーも財布に入れておくと安心" },
  { item: "診察券", note: "産院のもの" },
  { item: "携帯電話＋充電器", note: "長い陣痛中の連絡・気分転換に必須" },
  { item: "ペットボトル用ストローキャップ", note: "横になったまま飲めるので重宝します" },
  { item: "軽食（ゼリー飲料・おにぎり等）", note: "陣痛中のエネルギー補給に。食べやすいものを" },
  { item: "リップクリーム", note: "呼吸法で唇が乾燥しやすい" },
  { item: "テニスボール", note: "腰やおしりを押してもらうときに。痛みの緩和に役立ちます" },
  { item: "ヘアゴム・ヘアクリップ", note: "髪が長い方は必須" },
  { item: "フェイスタオル", note: "汗拭き用に数枚" },
];

const hospitalBagItems: BagItem[] = [
  { item: "前開きパジャマ 2〜3枚", note: "授乳・診察がしやすい前開きタイプ。丈が長めだと安心" },
  { item: "産褥ショーツ 3枚", note: "クロッチ部分が開くタイプ。診察時にそのまま対応できます" },
  { item: "授乳ブラ 2〜3枚", note: "ワイヤーなしのソフトタイプが楽" },
  { item: "産褥パッド（お産パッド）", note: "産院で支給されることも多い。念のため確認を" },
  { item: "洗面用具", note: "歯ブラシ・歯磨き粉・洗顔料・化粧水など" },
  { item: "シャンプー・ボディソープ", note: "産院に備え付けがある場合も" },
  { item: "タオル（バス・フェイス）", note: "3枚ずつ程度あると安心" },
  { item: "退院時の自分の服", note: "お腹がまだ戻らないので、マタニティ服かゆったりした服を" },
  { item: "母乳パッド", note: "入院中から母乳が出始めることも" },
  { item: "骨盤ベルト", note: "産後すぐから使用できるタイプを用意" },
];

const babyItems: BagItem[] = [
  { item: "肌着 2〜3枚", note: "短肌着＋コンビ肌着のセットが便利" },
  { item: "ツーウェイオール 1〜2枚", note: "退院時に着せるもの" },
  { item: "おくるみ 1枚", note: "退院時に包んであげます。季節に合った素材を" },
  { item: "おむつ（新生児用）", note: "病院で支給される場合も。事前に確認を" },
  { item: "ガーゼハンカチ 2〜3枚", note: "授乳時の口拭き・吐き戻し対策に" },
  { item: "チャイルドシート", note: "車で退院する場合は必須。事前に取り付けを練習しておくと安心" },
];

const niceToHaveItems: BagItem[] = [
  { item: "延長コード（電源タップ）", note: "ベッド周りにコンセントが遠いことが多い。2〜3mあると便利" },
  { item: "S字フック", note: "ベッド柵にバッグを掛けられて便利" },
  { item: "ビニール袋（数枚）", note: "洗濯物・ゴミ入れに。何かと使えます" },
  { item: "耳栓・アイマスク", note: "大部屋の場合、他の赤ちゃんの泣き声で眠れないことも" },
  { item: "お気に入りのお菓子", note: "頑張った自分へのご褒美。個包装タイプが衛生的" },
  { item: "着圧ソックス", note: "産後はむくみやすいので、あると楽になります" },
  { item: "ミニ鏡", note: "面会時にさっと身だしなみチェック" },
  { item: "筆記用具＋メモ帳", note: "授乳時間の記録や、助産師さんのアドバイスをメモ" },
];

const allCategories = [
  { key: "labor", label: "陣痛バッグ", icon: "🏃‍♀️", items: laborBagItems },
  { key: "hospital", label: "入院バッグ", icon: "👜", items: hospitalBagItems },
  { key: "baby", label: "赤ちゃん用", icon: "👶", items: babyItems },
  { key: "nice", label: "あると便利", icon: "✨", items: niceToHaveItems },
];

const confirmWithHospital = [
  "産褥パッド・お産パッドの支給はあるか",
  "おむつ・おしりふきの支給はあるか",
  "パジャマのレンタルはあるか",
  "シャンプー・ボディソープの備え付けはあるか",
  "タオルのレンタルはあるか",
  "ミルク・哺乳瓶の貸し出しはあるか",
  "円座クッションの貸し出しはあるか",
  "入院時に持参が必要な書類（同意書など）",
];

const laborStages = [
  {
    stage: "前駆陣痛",
    timing: "出産数日〜数時間前",
    interval: "不規則（バラバラ）",
    action: "まだ慌てなくて大丈夫。普段通り過ごしましょう。痛みが規則的になるか観察します。",
    tip: "前駆陣痛は痛みの間隔がバラバラで、しばらくすると消えます。本陣痛との見分けポイントです。",
  },
  {
    stage: "陣痛開始",
    timing: "初産: 間隔10分 / 経産: 間隔15分",
    interval: "10〜15分おき",
    action: "産院に電話で連絡。指示に従って入院準備。シャワーを浴びておくと良いです。",
    tip: "陣痛アプリで間隔を計測すると便利。パートナーに連絡し、陣痛バッグを持って出発。",
  },
  {
    stage: "陣痛中（活動期）",
    timing: "子宮口4〜7cm",
    interval: "3〜5分おき",
    action: "呼吸法に集中。痛みが来たら「ふーーっ」と長く吐く。力を抜くことが大切。",
    tip: "テニスボールで腰・おしりを押してもらう。ストローキャップで水分補給。リップクリームも活躍。",
  },
  {
    stage: "移行期〜分娩",
    timing: "子宮口8〜10cm",
    interval: "1〜2分おき",
    action: "助産師の指示に従います。いきむタイミングは助産師が教えてくれるので、呼吸に集中。",
    tip: "一番つらい時間ですが、赤ちゃんに会えるまであと少し。パートナーは手を握り、声をかけて。",
  },
];

const partnerTips = [
  { role: "腰をさする・押す", detail: "テニスボールやこぶしで腰・おしりを圧迫。「ここ？」と聞きながら" },
  { role: "水分補給の声かけ", detail: "陣痛の合間にストローキャップ付きペットボトルを差し出す" },
  { role: "陣痛の間隔を記録", detail: "スマホの陣痛アプリで計測。産院への電話時に伝える" },
  { role: "リラックスを促す", detail: "「大丈夫」「上手だよ」と穏やかな声で。冷静な態度が一番の支え" },
  { role: "汗を拭く", detail: "フェイスタオルで額や首の汗を拭いてあげる" },
];

export default function HospitalBagPage() {
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
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
  }, []);

  const saveToSupabase = useCallback(async (data: Record<string, boolean>) => {
    if (!userIdRef.current) return;
    try {
      const supabase = createClient();
      await supabase.from("profiles").update({ hospital_bag_checklist: data }).eq("id", userIdRef.current);
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
            .from("profiles").select("hospital_bag_checklist").eq("id", user.id).single();
          if (profile?.hospital_bag_checklist && typeof profile.hospital_bag_checklist === "object") {
            const d = profile.hospital_bag_checklist as Record<string, boolean>;
            if (Object.keys(d).length > 0) {
              setChecked(d);
              saveToLocal(d);
              showToast("前回の記録を復元しました");
              return;
            }
          }
        }
      } catch { /* ignore */ }

      if (localData && Object.keys(localData).length > 0) setChecked(localData);
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

  const totalItems = allCategories.reduce((sum, c) => sum + c.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">出産準備</Badge>
              <Badge variant="secondary">妊婦向け</Badge>
              <Badge className="bg-komorebi-warm/20 text-foreground border-komorebi-warm/40">保存版</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              入院バッグ準備リスト
            </h1>
            <ArticleMeta updatedAt="2026-04-03" />
            <p className="text-muted-foreground leading-relaxed">
              出産はいつ始まるかわかりません。チェックを入れながら準備を進めましょう。
            </p>
          </div>

          {/* 進捗バー */}
          <Card className="border-border/50 shadow-none mb-8">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">準備の進捗</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{checkedCount} / {totalItems} 点</span>
                  {checkedCount > 0 && (
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => setShowResetDialog(true)}>リセット</Button>
                  )}
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }} />
              </div>
              {toast && (
                <div className="mt-3 text-xs text-primary bg-primary/10 rounded-md px-3 py-1.5 text-center">{toast}</div>
              )}
            </CardContent>
          </Card>

          {/* リセット確認 */}
          {showResetDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <Card className="w-80 shadow-lg">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground mb-4">すべてのチェックをリセットしますか？</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowResetDialog(false)}>キャンセル</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={handleReset}>リセット</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* いつまでに */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden>📅</span>いつまでに準備する？
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">妊娠36週（臨月に入る前）まで</strong>に準備しておきましょう。
                早産の可能性もあるため、34週頃から少しずつ揃え始めると安心です。
                「陣痛バッグ」と「入院バッグ」の2つに分けておくと、いざというときスムーズです。
              </p>
            </CardContent>
          </Card>

          {/* チェックリスト（4カテゴリ） */}
          {allCategories.map((cat) => (
            <section key={cat.key} className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span aria-hidden>{cat.icon}</span>
                {cat.label}
              </h2>
              <div className="space-y-2">
                {cat.items.map((item) => {
                  const checkKey = `${cat.key}-${item.item}`;
                  const isChecked = checked[checkKey] || false;
                  return (
                    <Card key={checkKey}
                      className={`border-border/50 shadow-none transition-all cursor-pointer ${isChecked ? "bg-primary/5 border-primary/20" : ""}`}
                      onClick={() => toggleCheck(checkKey)}>
                      <CardContent className="pt-3 pb-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
                            {isChecked && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isChecked ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.item}</p>
                            <p className="text-xs text-muted-foreground">{item.note}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}

          {/* 陣痛時の対応ガイド */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🫁</span>
              陣痛が来たら — 段階別ガイド
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              陣痛は段階を追って進みます。それぞれの段階で何をすればよいか、事前に知っておくだけで気持ちが楽になります。
            </p>
            <div className="space-y-4">
              {laborStages.map((s, i) => (
                <Card key={s.stage} className="border-border/50 shadow-none">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-foreground text-sm">{s.stage}</h3>
                          <Badge variant="outline" className="text-xs">{s.interval}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{s.timing}</p>
                        <p className="text-sm text-foreground leading-relaxed mb-2">{s.action}</p>
                        <div className="text-xs bg-muted/30 rounded p-2 text-muted-foreground leading-relaxed">
                          {s.tip}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 呼吸法 */}
          <Card className="border-primary/30 bg-primary/5 shadow-none mb-8">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span aria-hidden>💨</span>
                陣痛中の呼吸法
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  痛みが来たら<strong className="text-foreground">「ふーーーっ」と長く息を吐く</strong>ことに集中します。
                  吐ききったら自然に吸い込みます。息を止めないことがポイントです。
                </p>
                <div className="bg-background rounded-lg p-3">
                  <p className="font-medium text-foreground mb-1">ソフロロジー呼吸法（おすすめ）</p>
                  <ol className="space-y-1 text-xs">
                    <li>1. 痛みが来たら鼻からゆっくり吸う（4秒）</li>
                    <li>2. 口から「ふーーーっ」と長く吐く（8秒）</li>
                    <li>3. 吐ききったら自然に吸い込む</li>
                    <li>4. 痛みの波が去るまで繰り返す</li>
                  </ol>
                </div>
                <p>
                  事前に練習しておくと本番で落ち着いて実践できます。
                  パートナーが一緒に「ふーっ」とリードしてくれると効果的です。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* パートナーにできること */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>👥</span>
              パートナーにできること
            </h2>
            <div className="space-y-2">
              {partnerTips.map((t) => (
                <Card key={t.role} className="border-border/50 shadow-none">
                  <CardContent className="pt-3 pb-3">
                    <p className="text-sm font-medium text-foreground mb-0.5">{t.role}</p>
                    <p className="text-xs text-muted-foreground">{t.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 病院に確認すること */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden>🏥</span>
              病院に確認すること
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  病院によって支給・レンタルできるものが異なります。入院前の説明会や健診時に確認しておきましょう。
                </p>
                <ul className="space-y-2">
                  {confirmWithHospital.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">&#9679;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 安心メッセージ */}
          <Card className="bg-komorebi-light/30 border-primary/20 shadow-none mb-4">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-2">完璧に準備できなくても大丈夫</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                足りないものがあっても、病院の売店やコンビニで買えたり、家族に持ってきてもらうこともできます。
                一番大事なのは母子手帳・保険証・携帯電話の3点。あとはなんとかなります。
                リラックスして、赤ちゃんに会える日を楽しみにしていてください。
              </p>
            </CardContent>
          </Card>

          {/* 出典・参考文献 */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              出典・参考文献
            </h2>
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-5">
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">[1]</strong> 日本助産師会.
                    &quot;お産の準備と入院の持ち物.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[2]</strong> 日本産科婦人科学会.
                    &quot;分娩の経過と呼吸法.&quot;
                  </li>
                  <li>
                    <strong className="text-foreground">[3]</strong> 厚生労働省.
                    &quot;出産に関する情報提供.&quot;
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <div className="p-4 bg-muted/30 rounded-lg mb-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">免責事項:</strong>{" "}
              本ページは一般的な情報提供を目的としています。
              病院・産院によって必要な持ち物や支給品は異なります。
              必ず通院先の案内をご確認のうえ準備してください。
            </p>
          </div>

          <div className="mt-8">
            <PdfDownloadSection
              title="陣痛・出産 対応ガイド"
              catchcopy="そのとき何をする？夫婦で読む1枚"
              description="陣痛の4段階、呼吸法、パートナーの役割、陣痛バッグチェックリストを1枚にまとめました。"
              pdfPath="/pdf/labor-guide.pdf"
              usageTips={[
                { icon: "print", text: "入院バッグに入れておく" },
                { icon: "share", text: "パートナー必読" },
                { icon: "other", text: "陣痛バッグチェック付き" },
              ]}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn/postnatal-procedures"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-8 text-sm font-medium hover:bg-muted transition-colors">
              出産後の手続き一覧を見る
            </Link>
            <Link href="/learn"
              className="inline-flex items-center justify-center rounded-lg px-4 h-8 text-sm font-medium hover:bg-muted transition-colors">
              学ぶトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
