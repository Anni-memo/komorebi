"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * IME（日本語入力）対応のInput。
 * 変換中はstateを更新せず、確定時にのみonChangeを発火する。
 */
function ImeInput({
  className,
  value,
  onChange,
  ...props
}: React.ComponentProps<"input"> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const composingRef = React.useRef(false);
  const [internalValue, setInternalValue] = React.useState(value);

  // 外部のvalueが変わったら同期
  React.useEffect(() => {
    if (!composingRef.current) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <input
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm",
        className
      )}
      value={internalValue}
      onChange={(e) => {
        setInternalValue(e.target.value);
        if (!composingRef.current) {
          onChange(e);
        }
      }}
      onCompositionStart={() => {
        composingRef.current = true;
      }}
      onCompositionEnd={(e) => {
        composingRef.current = false;
        // 確定時にonChangeを発火
        const nativeEvent = e.nativeEvent as CompositionEvent;
        const inputEl = e.target as HTMLInputElement;
        const syntheticEvent = {
          target: inputEl,
          currentTarget: inputEl,
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }}
      {...props}
    />
  );
}

export { ImeInput };
