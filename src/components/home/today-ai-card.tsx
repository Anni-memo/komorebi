"use client";

import Link from "next/link";
import type { TodayGuidance, StatusLevel } from "@/lib/today-guidance";

const statusStyles: Record<
  StatusLevel,
  { bg: string; border: string; text: string; dot: string; label: string }
> = {
  green: {
    bg: "bg-[#E6F4EA]",
    border: "border-emerald-200",
    text: "text-emerald-900",
    dot: "bg-emerald-500",
    label: "今日の状態",
  },
  yellow: {
    bg: "bg-[#FFF8E1]",
    border: "border-amber-200",
    text: "text-amber-900",
    dot: "bg-amber-500",
    label: "今日の状態",
  },
  red: {
    bg: "bg-[#FDECEA]",
    border: "border-rose-200",
    text: "text-rose-900",
    dot: "bg-rose-500",
    label: "今日の状態",
  },
};

export function TodayAiCard({
  guidance,
  headerLabel,
}: {
  guidance: TodayGuidance;
  headerLabel?: string;
}) {
  const style = statusStyles[guidance.statusLevel];

  return (
    <div className={`rounded-2xl border ${style.border} ${style.bg} p-4 shadow-sm`}>
      {headerLabel && (
        <p className={`text-xs font-medium ${style.text} opacity-70 mb-1`}>{headerLabel}</p>
      )}

      <div className="flex items-start gap-2 mb-3">
        <span className={`inline-block w-2.5 h-2.5 rounded-full ${style.dot} mt-1.5 shrink-0`} />
        <div>
          <p className={`text-xs font-medium ${style.text} opacity-80`}>{style.label}</p>
          <p className={`text-sm font-semibold ${style.text} leading-snug`}>{guidance.statusText}</p>
        </div>
      </div>

      <div className={`text-xs ${style.text} bg-white/60 rounded-lg px-3 py-2 mb-3 flex items-start gap-1.5`}>
        <span aria-hidden>⚠️</span>
        <span className="leading-relaxed">{guidance.caution}</span>
      </div>

      <div>
        <p className={`text-xs font-medium ${style.text} opacity-80 mb-1.5`}>今日やること</p>
        <ul className="space-y-1.5">
          {guidance.todos.map((todo, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`${style.text} opacity-60 text-xs mt-0.5`}>✓</span>
              {todo.href ? (
                <Link
                  href={todo.href}
                  className={`text-sm ${style.text} underline decoration-dotted underline-offset-2 hover:opacity-80 leading-snug`}
                >
                  {todo.label}
                </Link>
              ) : (
                <span className={`text-sm ${style.text} leading-snug`}>{todo.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
