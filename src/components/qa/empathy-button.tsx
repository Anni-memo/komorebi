"use client";

import { useState } from "react";

type EmpathyButtonProps = {
  initialCount: number;
};

export function EmpathyButton({ initialCount }: EmpathyButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [clicked, setClicked] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (clicked) {
      setCount((c) => c - 1);
      setClicked(false);
    } else {
      setCount((c) => c + 1);
      setClicked(true);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 text-xs transition-colors ${
        clicked
          ? "text-rose-500"
          : "text-muted-foreground hover:text-rose-400"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={clicked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      共感 {count}
    </button>
  );
}
