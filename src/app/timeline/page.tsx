"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const phases = [
  {
    id: "pregnancy",
    label: "妊娠中",
    icon: "🤰",
    color: "bg-pink-100 text-pink-700",
    borderColor: "border-l-pink-400",
    periods: [
      {
        period: "妊娠初期〜中期",
        items: [
          { title: "妊活前に受けておきたい予防接種", href: "/learn/preconception-vaccines", tag: "予防接種" },
          { title: "妊娠中の体調トラブルと病気ガイド", href: "/learn/pregnancy-health", tag: "健康" },
          { title: "妊娠中・産後の食事ガイド", href: "/learn/pregnancy-nutrition", tag: "食事" },
        ],
      },
      {
        period: "妊娠後期",
        items: [
          { title: "マタニティヨガ", href: "/learn/maternity-yoga", tag: "運動" },
          { title: "入院バッグ準備リスト", href: "/learn/hospital-bag", tag: "準備" },
          { title: "RSVワクチン判断ガイド", href: "/learn/rsv-vaccine", tag: "予防接種" },
          { title: "ベビー用品を準備する", href: "/prepare", tag: "準備" },
        ],
      },
    ],
  },
  {
    id: "0-3m",
    label: "0〜3ヶ月",
    icon: "👶",
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
    periods: [
      {
        period: "出産直後〜1ヶ月",
        items: [
          { title: "出産後に必要な手続き一覧", href: "/learn/postnatal-procedures", tag: "手続き" },
          { title: "新生児の睡眠パターン", href: "/learn/newborn-sleep", tag: "睡眠" },
          { title: "沐浴・お風呂ガイド", href: "/learn/bathing-guide", tag: "ケア" },
          { title: "新生児のまくら", href: "/learn/baby-pillow", tag: "ケア" },
          { title: "産後のメンタルケア", href: "/learn/mental-care", tag: "メンタル" },
          { title: "母乳バンクの基礎知識", href: "/learn/breast-milk-bank", tag: "健康" },
        ],
      },
      {
        period: "2〜3ヶ月",
        items: [
          { title: "予防接種スケジュール", href: "/learn/vaccination-schedule", tag: "予防接種" },
          { title: "ベビー服・肌着の選びかた", href: "/learn/baby-clothing", tag: "ケア" },
          { title: "身体調和ガイド STAGE 01", href: "/learn/body-harmony/stage-1", tag: "発達" },
        ],
      },
    ],
  },
  {
    id: "3-6m",
    label: "3〜6ヶ月",
    icon: "🍼",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-l-emerald-400",
    periods: [
      {
        period: "3〜4ヶ月",
        items: [
          { title: "3〜4ヶ月健診ガイド", href: "/learn/health-checkup/3-4months", tag: "健診" },
          { title: "身体調和ガイド STAGE 02", href: "/learn/body-harmony/stage-2", tag: "発達" },
        ],
      },
      {
        period: "5〜6ヶ月",
        items: [
          { title: "離乳食のはじめかた", href: "/learn/baby-food", tag: "食事" },
          { title: "6〜7ヶ月健診ガイド", href: "/learn/health-checkup/6-7months", tag: "健診" },
          { title: "身体調和ガイド STAGE 03", href: "/learn/body-harmony/stage-3", tag: "発達" },
        ],
      },
    ],
  },
  {
    id: "6-12m",
    label: "6〜12ヶ月",
    icon: "🧸",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
    periods: [
      {
        period: "7〜9ヶ月",
        items: [
          { title: "身体調和ガイド STAGE 04", href: "/learn/body-harmony/stage-4", tag: "発達" },
          { title: "知育の基本ガイド", href: "/learn/early-education", tag: "知育" },
        ],
      },
      {
        period: "10〜12ヶ月",
        items: [
          { title: "身体調和ガイド STAGE 05", href: "/learn/body-harmony/stage-5", tag: "発達" },
          { title: "赤ちゃんの行事カレンダー", href: "/learn/baby-events", tag: "行事" },
        ],
      },
    ],
  },
  {
    id: "1-2y",
    label: "1〜2歳",
    icon: "🚶",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-l-violet-400",
    periods: [
      {
        period: "1歳〜1歳半",
        items: [
          { title: "1歳6ヶ月健診ガイド", href: "/learn/health-checkup/18months", tag: "健診" },
          { title: "身体調和ガイド STAGE 06", href: "/learn/body-harmony/stage-6", tag: "発達" },
          { title: "保活の基本と始めるタイミング", href: "/learn/hokatsu", tag: "保活" },
        ],
      },
      {
        period: "1歳半〜2歳",
        items: [
          { title: "子どもの発熱対応ガイド", href: "/learn/fever-guide", tag: "健康" },
          { title: "子どもがかかりやすい病気ガイド", href: "/learn/child-illness", tag: "健康" },
        ],
      },
    ],
  },
  {
    id: "2-3y",
    label: "2〜3歳",
    icon: "🎨",
    color: "bg-rose-100 text-rose-700",
    borderColor: "border-l-rose-400",
    periods: [
      {
        period: "3歳頃",
        items: [
          { title: "3歳児健診ガイド", href: "/learn/health-checkup/3years", tag: "健診" },
          { title: "地域の子育て支援制度の調べかた", href: "/learn", tag: "制度" },
        ],
      },
    ],
  },
];

function getTagColor(tag: string) {
  const map: Record<string, string> = {
    予防接種: "bg-sky-100 text-sky-700",
    健康: "bg-rose-100 text-rose-700",
    食事: "bg-amber-100 text-amber-700",
    睡眠: "bg-indigo-100 text-indigo-700",
    準備: "bg-pink-100 text-pink-700",
    手続き: "bg-stone-100 text-stone-700",
    ケア: "bg-teal-100 text-teal-700",
    メンタル: "bg-purple-100 text-purple-700",
    運動: "bg-lime-100 text-lime-700",
    発達: "bg-emerald-100 text-emerald-700",
    知育: "bg-violet-100 text-violet-700",
    行事: "bg-orange-100 text-orange-700",
    健診: "bg-rose-100 text-rose-700",
    保活: "bg-stone-100 text-stone-700",
    制度: "bg-stone-100 text-stone-700",
  };
  return map[tag] ?? "bg-gray-100 text-gray-700";
}

export default function TimelinePage() {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const displayed = activePhase
    ? phases.filter((p) => p.id === activePhase)
    : phases;

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            月齢タイムライン
          </h1>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            妊娠中から3歳まで、時期ごとに必要な情報をまとめました。
            お子さまの月齢に合わせてご覧ください。
          </p>

          {/* フェーズフィルター */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActivePhase(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activePhase === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              すべて
            </button>
            {phases.map((p) => (
              <button
                key={p.id}
                onClick={() =>
                  setActivePhase(activePhase === p.id ? null : p.id)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activePhase === p.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>

          {/* タイムライン */}
          <div className="space-y-8">
            {displayed.map((phase) => (
              <section key={phase.id}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl" aria-hidden>
                    {phase.icon}
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    {phase.label}
                  </h2>
                </div>

                <div className="space-y-4 ml-3 border-l-2 border-border/50 pl-5">
                  {phase.periods.map((period) => (
                    <div key={period.period}>
                      <div className="flex items-center gap-2 mb-2 -ml-[25px]">
                        <span className="w-3 h-3 rounded-full bg-primary shrink-0" />
                        <span className="text-sm font-medium text-foreground">
                          {period.period}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {period.items.map((item) => (
                          <Link
                            key={item.href + item.title}
                            href={item.href}
                            className="block group"
                          >
                            <Card className="border-border/50 shadow-none hover:bg-muted/30 transition-colors">
                              <CardContent className="pt-3 pb-3 flex items-center gap-3">
                                <Badge
                                  className={`${getTagColor(item.tag)} border-0 text-[10px] shrink-0`}
                                >
                                  {item.tag}
                                </Badge>
                                <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1 min-w-0 truncate">
                                  {item.title}
                                </span>
                                <span
                                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 text-xs"
                                  aria-hidden
                                >
                                  →
                                </span>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 導線 */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              お子さまに合った情報を探すなら
            </p>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              AIコンシェルジュに相談する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
