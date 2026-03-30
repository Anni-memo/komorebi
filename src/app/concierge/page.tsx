"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type StepId = "stage" | "region" | "family" | "concern" | "notification" | "result";

interface Step {
  id: StepId;
  question: string;
  reason: string;
  options: { label: string; value: string }[];
  multiple?: boolean;
}

const steps: Step[] = [
  {
    id: "stage",
    question: "今どの段階ですか？",
    reason: "今の時期に合う情報を優先してご案内するためです。",
    options: [
      { label: "🤰 妊娠中", value: "pregnant" },
      { label: "👶 出産直後", value: "newborn" },
      { label: "👶 0歳", value: "0" },
      { label: "🧒 1歳", value: "1" },
      { label: "🧒 2歳", value: "2" },
      { label: "👦 3歳以上", value: "3+" },
    ],
  },
  {
    id: "region",
    question: "お住まいの地域を教えてください。",
    reason: "支援制度や申請の流れは地域によって違うことがあります。",
    options: [
      { label: "あとで入力する", value: "later" },
    ],
  },
  {
    id: "family",
    question: "今の家族の状況に近いものを教えてください。",
    reason: "必要な案内をできるだけ絞ってお届けするためです。",
    options: [
      { label: "第一子", value: "first" },
      { label: "第二子以降", value: "second+" },
      { label: "共働き", value: "dual-income" },
      { label: "保育園を考えている", value: "nursery" },
      { label: "ひとり親", value: "single" },
      { label: "実家のサポートあり", value: "family-support" },
      { label: "実家のサポートなし", value: "no-family-support" },
      { label: "今は答えない", value: "skip" },
    ],
    multiple: true,
  },
  {
    id: "concern",
    question: "今いちばん困っていることは何ですか？",
    reason: "最初に、必要性の高いものからご案内します。",
    options: [
      { label: "📋 手続き・制度", value: "procedures" },
      { label: "😴 睡眠", value: "sleep" },
      { label: "🍼 食事", value: "food" },
      { label: "🤒 体調", value: "health" },
      { label: "📈 発達", value: "development" },
      { label: "🏫 保活", value: "nursery-search" },
      { label: "🛒 買い物", value: "shopping" },
      { label: "💭 メンタル", value: "mental" },
      { label: "💬 誰かに相談したい", value: "consult" },
    ],
  },
  {
    id: "notification",
    question: "必要なことを忘れにくくするための通知について教えてください。",
    reason: "受け取りたいものだけ選べます。",
    options: [
      { label: "期限が近い手続き", value: "deadlines" },
      { label: "健診や受診の目安", value: "checkups" },
      { label: "保活の準備", value: "nursery-prep" },
      { label: "用意しておくとよいもの", value: "items" },
      { label: "おすすめ記事", value: "articles" },
      { label: "通知はいらない", value: "none" },
    ],
    multiple: true,
  },
];

const resultSections = [
  {
    title: "あなたの今やること",
    items: [
      "地域で使える子育て支援制度を確認する",
      "今の時期に必要な準備をチェックする",
      "気になっている悩みについて基本情報を見る",
    ],
  },
  {
    title: "近いうちに確認したいこと",
    items: [
      "期限がある手続き",
      "今後必要になりやすい準備",
      "早めに知っておくと安心な制度",
    ],
  },
  {
    title: "先に読んでおくと安心な内容",
    items: [
      "あなたの時期に多い悩みのまとめ",
      "同じ境遇の親のQ&A",
      "保存版チェックリスト",
    ],
  },
];

export default function ConciergePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [regionInput, setRegionInput] = useState("");

  const step = steps[currentStep];
  const totalSteps = steps.length;
  const progress = showResult ? 100 : ((currentStep + 1) / totalSteps) * 100;

  function selectOption(value: string) {
    const stepId = step.id;

    if (step.multiple) {
      setAnswers((prev) => {
        const current = prev[stepId] || [];
        if (value === "skip" || value === "none") {
          return { ...prev, [stepId]: [value] };
        }
        const filtered = current.filter((v) => v !== "skip" && v !== "none");
        if (filtered.includes(value)) {
          return { ...prev, [stepId]: filtered.filter((v) => v !== value) };
        }
        return { ...prev, [stepId]: [...filtered, value] };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [stepId]: [value] }));
      goNext();
    }
  }

  function goNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function isSelected(value: string) {
    return (answers[step?.id] || []).includes(value);
  }

  if (showResult) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="mb-8">
              <div className="h-1 bg-muted rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl px-5 py-4 mb-8 max-w-[85%]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm" aria-hidden>🌿</span>
                <span className="text-xs font-medium text-muted-foreground">こもれび AI</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                ありがとうございます。
                <br />
                いまの状況をもとに、まず確認しておきたいことを整理しました。
              </p>
            </div>

            <div className="space-y-6">
              {resultSections.map((section) => (
                <Card key={section.title} className="border-border/50 shadow-none">
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-foreground mb-3 text-sm">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted/50 rounded-xl px-5 py-4 mt-8 max-w-[85%]">
              <p className="text-sm text-foreground leading-relaxed">
                必要であれば、このまま「今やること」を一緒に1つずつ整理できます。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <Link href="/home" className={buttonVariants()}>
                今やることを見る
              </Link>
              <Link href="/benefits" className={buttonVariants({ variant: "outline" })}>
                制度を確認する
              </Link>
              <Link href="/qa" className={buttonVariants({ variant: "outline" })}>
                同じ悩みの相談を見る
              </Link>
              <Link href="/" className={buttonVariants({ variant: "ghost" })}>
                あとで見る
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* 進捗バー */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">
                質問 {currentStep + 1} / {totalSteps}
              </span>
              <span className="text-xs text-muted-foreground">
                あと{totalSteps - currentStep - 1}問
              </span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 開始メッセージ（最初のステップのみ） */}
          {currentStep === 0 && (
            <div className="bg-muted/50 rounded-xl px-5 py-4 mb-6 max-w-[85%]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm" aria-hidden>🌿</span>
                <span className="text-xs font-medium text-muted-foreground">こもれび AI</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                こんにちは。
                <br />
                短い質問に答えていただければ、あなたの状況に合わせて、今必要な情報や準備を整理してご案内します。
              </p>
            </div>
          )}

          {/* 質問 */}
          <div className="bg-muted/50 rounded-xl px-5 py-4 mb-4 max-w-[85%]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm" aria-hidden>🌿</span>
              <span className="text-xs font-medium text-muted-foreground">こもれび AI</span>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              {step.question}
            </p>
            <p className="text-xs text-muted-foreground">{step.reason}</p>
          </div>

          {/* 地域入力（regionステップ） */}
          {step.id === "region" ? (
            <div className="space-y-3 mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="市区町村名を入力（例：世田谷区）"
                  value={regionInput}
                  onChange={(e) => setRegionInput(e.target.value)}
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (regionInput.trim()) {
                      setAnswers((prev) => ({ ...prev, region: [regionInput.trim()] }));
                      goNext();
                    }
                  }}
                  disabled={!regionInput.trim()}
                >
                  次へ
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => {
                  setAnswers((prev) => ({ ...prev, region: ["later"] }));
                  goNext();
                }}
              >
                あとで入力する
              </Button>
            </div>
          ) : (
            /* 選択肢 */
            <div className="flex flex-wrap gap-2 mb-6">
              {step.options.map((option) => (
                <Badge
                  key={option.value}
                  variant={isSelected(option.value) ? "default" : "outline"}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-all ${
                    isSelected(option.value)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/5"
                  }`}
                  onClick={() => selectOption(option.value)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          )}

          {/* 複数選択時の「次へ」ボタン */}
          {step.multiple && step.id !== "region" && (
            <Button
              onClick={goNext}
              disabled={!(answers[step.id]?.length > 0)}
              className="w-full mb-4"
            >
              次へ
            </Button>
          )}

          {/* ナビゲーション */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              disabled={currentStep === 0}
              className="text-muted-foreground"
            >
              戻る
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goNext}
              className="text-muted-foreground"
            >
              スキップ
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
