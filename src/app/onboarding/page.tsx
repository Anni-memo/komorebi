"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// --- Question definitions ---

type QuestionType = "single" | "multiple" | "date" | "text";

interface QuestionDef {
  id: string;
  title: string;
  reason: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  conditional?: (answers: Record<string, unknown>) => { label: string };
}

const questions: QuestionDef[] = [
  {
    id: "stage",
    title: "今どの段階ですか？",
    reason: "お子さまの月齢に合わせた情報をお届けするために伺っています。",
    type: "single",
    options: ["妊娠中", "出産直後", "0歳", "1歳", "2歳", "3歳以上"],
  },
  {
    id: "date",
    title: "",
    reason: "時期に合わせた手続きや届出のリマインドに使います。",
    type: "date",
    conditional: (answers) => {
      if (answers.stage === "妊娠中") {
        return { label: "出産予定日を教えてください" };
      }
      return { label: "お子さまの生年月日を教えてください" };
    },
  },
  {
    id: "municipality",
    title: "お住まいの地域を教えてください",
    reason: "お住まいの自治体の制度や支援情報をお届けするために伺っています。",
    type: "text",
    placeholder: "例: 164-0001 または 中野区",
  },
  {
    id: "family_situation",
    title: "今の家族の状況を教えてください",
    reason: "状況に合ったサポート情報を優先的にお届けします。複数選択できます。",
    type: "multiple",
    options: [
      "第一子",
      "第二子以降",
      "共働き",
      "保育園を考えている",
      "ひとり親",
      "実家サポートあり",
      "実家サポートなし",
      "今は答えない",
    ],
  },
  {
    id: "interests",
    title: "今いちばん気になることは？",
    reason: "最初に表示するコンテンツの優先順位を決めるために伺っています。",
    type: "single",
    options: [
      "手続き・制度",
      "睡眠",
      "食事",
      "体調",
      "発達",
      "保活",
      "買い物",
      "メンタル",
      "誰かに相談したい",
    ],
  },
  {
    id: "notification_categories",
    title: "どんな案内を受け取りたいですか？",
    reason: "必要な情報だけをお届けするために伺っています。複数選択できます。",
    type: "multiple",
    options: [
      "今日やること",
      "今週中に確認したいこと",
      "手続き・制度",
      "健診や予防接種の目安",
      "保活",
      "準備物",
      "おすすめ記事",
      "同じ悩みの相談",
      "通知は最小限にしたい",
    ],
  },
  {
    id: "notification_channels",
    title: "どこで受け取りたいですか？",
    reason: "ご希望のチャネルでお届けします。あとから変更もできます。",
    type: "single",
    options: [
      "サイト内だけ",
      "LINE",
      "メール",
      "LINEとメール",
      "あとで決める",
    ],
  },
  {
    id: "notification_frequency",
    title: "通知の頻度はどれくらいがいいですか？",
    reason: "多すぎず少なすぎない、ちょうどいい頻度でお届けします。",
    type: "single",
    options: [
      "重要なものだけ",
      "週1回まとめ",
      "必要なときに都度",
      "自分で調整したい",
    ],
  },
];

const TOTAL_QUESTIONS = questions.length;

// --- Helper: generate action items based on answers ---

function getActionItems(answers: Record<string, unknown>): { label: string; description: string }[] {
  const items: { label: string; description: string }[] = [];

  if (answers.stage === "妊娠中") {
    items.push({
      label: "出産準備リストを確認",
      description: "必要な届出や買い物リストをチェックしましょう。",
    });
  } else {
    items.push({
      label: "月齢に合った情報を確認",
      description: "お子さまの成長に合わせた情報をまとめています。",
    });
  }

  if (answers.interests === "手続き・制度") {
    items.push({
      label: "利用できる制度を確認",
      description: "あなたの地域で使える支援制度を調べましょう。",
    });
  } else if (answers.interests === "睡眠") {
    items.push({
      label: "睡眠のヒントを見る",
      description: "月齢に合った睡眠のアドバイスをまとめています。",
    });
  } else {
    items.push({
      label: "気になるトピックを読む",
      description: "あなたの関心に合ったコンテンツを用意しています。",
    });
  }

  items.push({
    label: "AIコンシェルジュに相談",
    description: "わからないことがあれば、いつでも相談できます。",
  });

  return items.slice(0, 3);
}

// --- Main component ---

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentStep];
  const isLastQuestion = currentStep === TOTAL_QUESTIONS - 1;

  const getTitle = useCallback(() => {
    if (question.conditional) {
      return question.conditional(answers).label;
    }
    return question.title;
  }, [question, answers]);

  const handleSingleSelect = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      handleComplete(newAnswers);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleMultipleToggle = (value: string) => {
    const current = (answers[question.id] as string[]) || [];
    // 排他選択肢: 選んだら他をクリア、逆も同様
    const exclusiveOptions = ["今は答えない", "通知は最小限にしたい"];
    if (exclusiveOptions.includes(value)) {
      setAnswers({ ...answers, [question.id]: [value] });
      return;
    }
    const filtered = current.filter((v) => !exclusiveOptions.includes(v));
    if (filtered.includes(value)) {
      setAnswers({
        ...answers,
        [question.id]: filtered.filter((v) => v !== value),
      });
    } else {
      setAnswers({ ...answers, [question.id]: [...filtered, value] });
    }
  };

  const handleMultipleNext = () => {
    if (isLastQuestion) {
      handleComplete(answers);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleTextOrDateNext = () => {
    if (isLastQuestion) {
      handleComplete(answers);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleSkip = () => {
    if (isLastQuestion) {
      handleComplete(answers);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleComplete = async (finalAnswers: Record<string, unknown>) => {
    setSaving(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const stageRaw = finalAnswers.stage as string | undefined;
        const stageMap: Record<string, string> = {
          "妊娠中": "pregnant", "出産直後": "newborn", "0歳": "0",
          "1歳": "1", "2歳": "2", "3歳以上": "3+",
        };
        const stage = stageRaw ? stageMap[stageRaw] || stageRaw : undefined;
        const dateVal = finalAnswers.date as string | undefined;
        const familySituationRaw = (finalAnswers.family_situation as string[]) || [];
        const familyMap: Record<string, string> = {
          "第一子": "first", "第二子以降": "second+", "共働き": "dual-income",
          "保育園を考えている": "nursery", "ひとり親": "single",
          "実家サポートあり": "family-support", "実家サポートなし": "no-family-support",
          "今は答えない": "skip",
        };
        const familySituation = familySituationRaw.map((s) => familyMap[s] || s);
        const interestRaw = finalAnswers.interests as string | undefined;
        const interestMap: Record<string, string> = {
          "手続き・制度": "procedures", "睡眠": "sleep", "食事": "food",
          "体調": "health", "発達": "development", "保活": "nursery-search",
          "買い物": "shopping", "メンタル": "mental", "誰かに相談したい": "consult",
        };
        const interests = interestRaw ? [interestMap[interestRaw] || interestRaw] : [];

        await supabase.from("profiles").upsert({
          id: user.id,
          stage,
          child_birthdate: stageRaw !== "妊娠中" ? dateVal : null,
          expected_due_date: stageRaw === "妊娠中" ? dateVal : null,
          municipality: finalAnswers.municipality as string | undefined,
          is_first_child: familySituation.includes("first"),
          family_situation: familySituation,
          interests,
          notification_categories:
            (finalAnswers.notification_categories as string[]) || [],
          notification_channels:
            (finalAnswers.notification_channels as string) || null,
          notification_frequency:
            (finalAnswers.notification_frequency as string) || null,
          onboarding_completed: true,
        });
      }
    } catch {
      // テーブルが存在しない場合でもエラーを握りつぶす
    } finally {
      setSaving(false);
      setCompleted(true);
    }
  };

  // --- Completion screen ---
  if (completed) {
    const actionItems = getActionItems(answers);
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="max-w-md mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block" aria-hidden>
                🌿
              </span>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                準備ができました
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                ありがとうございます。登録内容をもとに、今の状況に合わせたホームを準備しました。最初に見ておくと安心なことを、3つだけ整理しています。
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {actionItems.map((item, i) => (
                <Card key={i} className="border-border/50 shadow-none">
                  <CardContent className="py-4">
                    <p className="font-medium text-foreground text-sm mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => router.push("/home")}
              >
                今やることを見る
              </Button>
              <Link
                href="/mypage"
                className="block text-center text-sm text-primary hover:underline"
              >
                通知設定を確認する
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // --- Progress bar ---
  const remaining = TOTAL_QUESTIONS - currentStep - 1;
  const progressPercent = ((currentStep + 1) / TOTAL_QUESTIONS) * 100;

  // --- Determine section label ---
  const sectionLabel = currentStep < 5 ? "プロフィール" : "通知設定";

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-md mx-auto px-4 py-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{sectionLabel}</span>
              <span>
                質問 {currentStep + 1} / {TOTAL_QUESTIONS}
                <span className="ml-2">あと {remaining} 問</span>
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Chat bubble question */}
          <div className="mb-6">
            <div className="inline-block bg-muted/60 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%]">
              <p className="text-base font-medium text-foreground leading-relaxed">
                {getTitle()}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2 ml-1">
              {question.reason}
            </p>
          </div>

          {/* Answer area */}
          <div className="mb-8">
            {question.type === "single" && question.options && (
              <div className="flex flex-wrap gap-2">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleSingleSelect(option)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {question.type === "multiple" && question.options && (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.options.map((option) => {
                    const currentArr =
                      (answers[question.id] as string[]) || [];
                    const isSelected = currentArr.includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => handleMultipleToggle(option)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <Button
                  onClick={handleMultipleNext}
                  className="w-full"
                  disabled={
                    !answers[question.id] ||
                    (answers[question.id] as string[]).length === 0
                  }
                >
                  次へ
                </Button>
              </>
            )}

            {question.type === "date" && (
              <div className="space-y-4">
                <Input
                  type="date"
                  value={(answers[question.id] as string) || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [question.id]: e.target.value })
                  }
                  className="w-full"
                />
                <Button
                  onClick={handleTextOrDateNext}
                  className="w-full"
                  disabled={!answers[question.id]}
                >
                  次へ
                </Button>
              </div>
            )}

            {question.type === "text" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder={question.placeholder}
                  value={(answers[question.id] as string) || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [question.id]: e.target.value })
                  }
                  className="w-full"
                />
                <Button
                  onClick={handleTextOrDateNext}
                  className="w-full"
                  disabled={!answers[question.id]}
                >
                  次へ
                </Button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                戻る
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleSkip}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              スキップ
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Saving overlay */}
      {saving && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <p className="text-muted-foreground">保存中...</p>
        </div>
      )}
    </>
  );
}
