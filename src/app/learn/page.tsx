"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";

/* ─── カテゴリ定義（こもれびの温かみ・安らぎカラー） ─── */
const categories = [
  { label: "すべて", value: "all", icon: "🍃", bg: "bg-primary/10", text: "text-primary", activeBg: "bg-primary", activeText: "text-primary-foreground", dot: "bg-primary" },
  { label: "健康・病気", value: "健康・病気", icon: "🩺", bg: "bg-rose-50", text: "text-rose-600/80", activeBg: "bg-rose-100", activeText: "text-rose-700", dot: "bg-rose-300" },
  { label: "予防接種", value: "予防接種", icon: "💉", bg: "bg-sky-50", text: "text-sky-600/80", activeBg: "bg-sky-100", activeText: "text-sky-700", dot: "bg-sky-300" },
  { label: "食事", value: "食事", icon: "🥄", bg: "bg-amber-50", text: "text-amber-600/80", activeBg: "bg-amber-100", activeText: "text-amber-700", dot: "bg-amber-300" },
  { label: "身体発達", value: "身体発達", icon: "🌱", bg: "bg-emerald-50", text: "text-emerald-600/80", activeBg: "bg-emerald-100", activeText: "text-emerald-700", dot: "bg-emerald-300" },
  { label: "発達・知育", value: "発達・知育", icon: "🧩", bg: "bg-violet-50", text: "text-violet-600/80", activeBg: "bg-violet-100", activeText: "text-violet-700", dot: "bg-violet-300" },
  { label: "睡眠", value: "睡眠", icon: "🌙", bg: "bg-indigo-50", text: "text-indigo-600/80", activeBg: "bg-indigo-100", activeText: "text-indigo-700", dot: "bg-indigo-300" },
  { label: "出産準備", value: "出産準備", icon: "🎒", bg: "bg-pink-50", text: "text-pink-600/80", activeBg: "bg-pink-100", activeText: "text-pink-700", dot: "bg-pink-300" },
  { label: "日常ケア", value: "日常ケア", icon: "🛁", bg: "bg-teal-50", text: "text-teal-600/80", activeBg: "bg-teal-100", activeText: "text-teal-700", dot: "bg-teal-300" },
  { label: "手続き・制度", value: "手続き・制度", icon: "📋", bg: "bg-stone-50", text: "text-stone-600/80", activeBg: "bg-stone-100", activeText: "text-stone-700", dot: "bg-stone-300" },
  { label: "メンタル", value: "メンタル", icon: "🫧", bg: "bg-purple-50", text: "text-purple-600/80", activeBg: "bg-purple-100", activeText: "text-purple-700", dot: "bg-purple-300" },
  { label: "運動・ヨガ", value: "運動・ヨガ", icon: "🧘", bg: "bg-lime-50", text: "text-lime-600/80", activeBg: "bg-lime-100", activeText: "text-lime-700", dot: "bg-lime-300" },
  { label: "行事", value: "行事・イベント", icon: "🎌", bg: "bg-orange-50", text: "text-orange-600/80", activeBg: "bg-orange-100", activeText: "text-orange-700", dot: "bg-orange-300" },
];

/* ─── タグ→カラーマッピング ─── */
function getTagStyle(tag: string) {
  const cat = categories.find((c) => c.value === tag);
  if (cat) return { bg: cat.activeBg, text: cat.activeText, dot: cat.dot };
  if (tag === "手続き" || tag === "保活" || tag === "制度")
    return { bg: "bg-stone-100", text: "text-stone-700", dot: "bg-stone-300" };
  return { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-300" };
}

/* ─── 記事→カテゴリマッチ判定 ─── */
function matchesCategory(articleTag: string, filterValue: string): boolean {
  if (filterValue === "all") return true;
  if (filterValue === articleTag) return true;
  // 手続き・制度グループ
  if (filterValue === "手続き・制度" && ["手続き", "保活", "制度"].includes(articleTag)) return true;
  return false;
}

const articles = [
  {
    title: "妊娠カレンダー｜週数別 赤ちゃんの成長とママの変化",
    tag: "出産準備",
    audience: "妊婦向け",
    readTime: "保存版",
    summary: "出産予定日を入力すると今の週数をハイライト。4〜42週の赤ちゃんの発達・ママの体の変化・やることを一覧で確認。",
    href: "/learn/pregnancy-calendar",
  },
  {
    title: "RSVワクチン（アブリスボ）判断ガイド",
    tag: "予防接種",
    audience: "妊婦向け",
    readTime: "5分で読める",
    summary: "2026年4月から定期接種化。リスク・リターン・最新のエビデンスを整理。",
    href: "/learn/rsv-vaccine",
  },
  {
    title: "妊活前に受けておきたい予防接種ガイド",
    tag: "予防接種",
    audience: "妊活・妊娠準備中の方向け",
    readTime: "保存版",
    summary: "風疹・麻疹・水痘・おたふくかぜ・B型肝炎。抗体検査から助成制度、スケジュールの組み方まで。",
    href: "/learn/preconception-vaccines",
  },
  {
    title: "予防接種スケジュール＆チェックリスト",
    tag: "予防接種",
    audience: "すべての親向け",
    readTime: "保存版",
    summary: "月齢別の定期・任意接種スケジュール。接種済みチェック機能付き。",
    href: "/learn/vaccination-schedule",
  },
  {
    title: "新生児の睡眠パターンを知ろう",
    tag: "睡眠",
    audience: "0歳の親向け",
    readTime: "3分で読める",
    summary: "夜泣きの原因と、親の負担を減らすための基本的な知識を整理。",
    href: "/learn/newborn-sleep",
  },
  {
    title: "ネントレ完全ガイド｜4つの方法比較と7日間実践プラン",
    tag: "睡眠",
    audience: "0歳の親向け",
    readTime: "保存版",
    summary: "ジーナ式・ファーバー・椅子法・CIOの4つを比較。月齢別の推奨睡眠時間、開始判断チェック、7日間プラン付き。",
    href: "/learn/sleep-training",
  },
  {
    title: "妊娠中・産後の食事ガイド",
    tag: "食事",
    audience: "妊婦・授乳中の方向け",
    readTime: "5分で読める",
    summary: "必要な栄養素・避けるべき食品・つわり中の食事のコツをエビデンスに基づいて整理。",
    href: "/learn/pregnancy-nutrition",
  },
  {
    title: "離乳食のはじめかた",
    tag: "食事",
    audience: "5〜6ヶ月の親向け",
    readTime: "5分で読める",
    summary: "いつから、何から始めるか。進め方の基本と困ったときの対処。",
    href: "/learn/baby-food",
  },
  {
    title: "赤ちゃんの食物アレルギーガイド｜早期導入と安全な進め方",
    tag: "食事",
    audience: "0歳の親向け",
    readTime: "保存版",
    summary: "LEAP・PETIT研究に基づく早期導入エビデンス、月齢別アレルゲン導入カレンダー、症状3段階フローチャート。",
    href: "/learn/food-allergy-guide",
  },
  {
    title: "出産後に必要な手続き一覧",
    tag: "手続き",
    audience: "出産直後の方向け",
    readTime: "保存版",
    summary: "出生届・健康保険・児童手当など、期限のある手続きをまとめて確認。",
    href: "/learn/postnatal-procedures",
  },
  {
    title: "保活の基本と始めるタイミング",
    tag: "保活",
    audience: "保育園を考えている方向け",
    readTime: "5分で読める",
    summary: "申請時期・見学のポイント・必要書類など、全体像を把握する。",
    href: "/learn/hokatsu",
  },
  {
    title: "妊娠中の体調トラブルと病気ガイド",
    tag: "健康・病気",
    audience: "妊婦向け",
    readTime: "5分で読める",
    summary: "つわり・妊娠高血圧・妊娠糖尿病など、妊娠中に気をつけたい症状と受診の目安を整理。",
    href: "/learn/pregnancy-health",
  },
  {
    title: "子どもの発熱対応ガイド",
    tag: "健康・病気",
    audience: "すべての親向け",
    readTime: "保存版",
    summary: "月齢別の対応・受診の目安・家でできるケア・救急に行くべきサイン。#8000の使い方も。",
    href: "/learn/fever-guide",
  },
  {
    title: "赤ちゃんの事故を防ぐ｜月齢別リスクと安全チェックリスト",
    tag: "健康・病気",
    audience: "0歳〜3歳の親向け",
    readTime: "保存版",
    summary: "誤飲・転落・SIDS・溺水。月齢別のリスクマップ、部屋別チェックリスト、緊急時の応急処置をまとめて確認。",
    href: "/learn/baby-safety-guide",
  },
  {
    title: "子どもがかかりやすい病気ガ���ド",
    tag: "健康・病気",
    audience: "すべての親向け",
    readTime: "保存版",
    summary: "突発性発疹・手足口病・RSウイルスなど、乳幼児の病気の症状・対応・受診の目安をまとめて確認。",
    href: "/learn/child-illness",
  },
  {
    title: "母乳バンクの基礎知識と利用ガイド",
    tag: "健康・病気",
    audience: "新生児の親・妊婦向け",
    readTime: "保存版",
    summary: "早産・低出生体重の赤ちゃんに届く「ドナーミルク」。安全性・費用・利用方法をわかりやすく整理。",
    href: "/learn/breast-milk-bank",
  },
  {
    title: "ベビー服・肌着の選びかた",
    tag: "出産準備",
    audience: "妊婦・すべての親向け",
    readTime: "5分で読める",
    summary: "短肌着、コンビ肌着、ツーウェイオール...種類・枚数・季節別の組み合わせを整理。",
    href: "/learn/baby-clothing",
  },
  {
    title: "沐浴・お風呂ガイド",
    tag: "日常ケア",
    audience: "新生児の親向け",
    readTime: "5分で読める",
    summary: "沐浴の手順・お湯の温度・よくある不安への対処法。1ヶ月健診後のお風呂移行も。",
    href: "/learn/bathing-guide",
  },
  {
    title: "赤ちゃんの行事カレンダー",
    tag: "行事・イベント",
    audience: "0歳〜1歳の親向け",
    readTime: "5分で読める",
    summary: "お七夜・お宮参り・お食い初めなど、1年間の行事を時系列で解説。費用目安付き。",
    href: "/learn/baby-events",
  },
  {
    title: "入院バッグ準備リスト",
    tag: "出産準備",
    audience: "妊婦向け",
    readTime: "保存版",
    summary: "陣痛バッグ・入院バッグ・赤ちゃん用を分けてリスト化。36週までに準備を。",
    href: "/learn/hospital-bag",
  },
  {
    title: "妊娠後期にできるマタニティヨガ",
    tag: "運動・ヨガ",
    audience: "妊婦向け",
    readTime: "5分で読める",
    summary: "腰痛・むくみに悩む妊娠後期のママへ。自宅で安全にできるポーズ5つと注意点を初心者向けに解説。",
    href: "/learn/maternity-yoga",
  },
  {
    title: "産後のメンタルケア",
    tag: "メンタル",
    audience: "すべての親向け",
    readTime: "3分で読める",
    summary: "つらいときは自然なこと。相談先と、自分を責めないための考え方。",
    href: "/learn/mental-care",
  },
  {
    title: "新生児のまくら｜必要性・窒息リスク・商品比較",
    tag: "睡眠",
    audience: "0歳の親向け",
    readTime: "5分で読める",
    summary: "まくらは必要？窒息リスクは？人気5商品の比較と、安全に使うためのルールを整理。",
    href: "/learn/baby-pillow",
  },
  {
    title: "身体調和ガイド｜赤ちゃんの発達を月齢で知る",
    tag: "身体発達",
    audience: "0〜3歳の親向け",
    readTime: "保存版",
    summary: "呼吸・摂食・運動・感覚統合の4領域から、月齢別の発達の連鎖を整理。「なぜ今これが大切か」がわかる。",
    href: "/learn/body-harmony",
  },
  {
    title: "知育の基本ガイド｜月齢別の発達と遊び",
    tag: "発達・知育",
    audience: "すべての親向け",
    readTime: "5分で読める",
    summary: "月齢別の発達の特徴と、家庭でできる知育遊びを整理。特別な教材は不要。",
    href: "/learn/early-education",
  },
  {
    title: "子育て世帯が使える給付金・制度まとめ【2026年最新】",
    tag: "制度",
    audience: "妊婦〜就学前の親向け",
    readTime: "保存版",
    summary: "児童手当拡充・こども誰でも通園制度・出生後休業支援給付金など、妊娠から就学前まで使える制度をライフステージ順に解説。",
    href: "/learn/childcare-benefits-guide",
  },
  {
    title: "地域の子育て支援制度の調べかた",
    tag: "制度",
    audience: "すべての親向け",
    readTime: "3分で読める",
    summary: "自治体ごとに異なる支援制度を効率よく調べる方法。",
    href: "/learn/local-support",
  },
  {
    title: "乳幼児健診ガイド｜月齢別にわかる健診の流れと準備",
    tag: "健康・病気",
    audience: "0〜3歳の親向け",
    readTime: "各5分で読める",
    summary: "3-4ヶ月・6-7ヶ月・1歳半・3歳の健診を月齢別に解説。当日の流れ、チェック項目、よくある質問。",
    href: "/learn/health-checkup",
  },
];

export default function LearnPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = articles.filter((a) => matchesCategory(a.tag, activeFilter));
  const count = filtered.length;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">学ぶ</h1>
          <p className="text-muted-foreground mb-6">
            必要な知識を、あなたの状況に合わせて整理しています。
          </p>

          {/* ── カテゴリフィルター（丸みのある温かいタグ） ── */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeFilter === cat.value;
                const articleCount =
                  cat.value === "all"
                    ? articles.length
                    : articles.filter((a) => matchesCategory(a.tag, cat.value)).length;

                if (cat.value !== "all" && articleCount === 0) return null;

                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveFilter(cat.value)}
                    className={`
                      inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium
                      transition-all duration-200 cursor-pointer
                      ${isActive
                        ? `${cat.activeBg} ${cat.activeText} shadow-sm ring-1 ring-inset ring-black/5`
                        : `${cat.bg} ${cat.text} hover:shadow-sm`
                      }
                    `}
                  >
                    <span className="text-sm leading-none" aria-hidden>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className={`
                      inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold
                      ${isActive ? "bg-white/30" : "bg-black/5"}
                    `}>
                      {articleCount}
                    </span>
                  </button>
                );
              })}
            </div>
            {activeFilter !== "all" && (
              <p className="text-xs text-muted-foreground mt-3">
                {categories.find((c) => c.value === activeFilter)?.label}の記事を表示中（{count}件）
              </p>
            )}
          </div>

          {/* ── 記事一覧 ── */}
          <div className="space-y-3">
            {filtered.map((article) => {
              const tagStyle = getTagStyle(article.tag);
              const card = (
                <Card
                  className="shadow-none hover:shadow-sm hover:border-primary/20 transition-all duration-200 cursor-pointer rounded-xl border-border/40"
                >
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-start gap-3">
                      {/* カラードット */}
                      <span className={`w-2 h-2 rounded-full ${tagStyle.dot} shrink-0 mt-2`} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2.5">
                          {article.summary}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`${tagStyle.bg} ${tagStyle.text} border-0 text-[10px] rounded-full px-2.5`}>
                            {article.tag}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground/70">{article.audience}</span>
                          <span className="text-[11px] text-muted-foreground/70">{article.readTime}</span>
                        </div>
                      </div>
                      {article.href && (
                        <span className="text-muted-foreground/40 text-sm shrink-0 mt-2">→</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
              return article.href ? (
                <Link key={article.title} href={article.href} className="block">{card}</Link>
              ) : (
                <div key={article.title} className="opacity-50">{card}</div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>該当する記事がありません。</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/concierge" className={buttonVariants({ variant: "outline" })}>
              AIに絞り込みを相談する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
