"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  holdMs?: number;
};

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
  typingSpeedMs = 60,
  deletingSpeedMs = 38,
  holdMs = 950,
}: Props) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!safeWords.length) return;

    const full = safeWords[wordIdx % safeWords.length] ?? "";
    let timeout = 0;

    if (!isDeleting) {
      const next = full.slice(0, text.length + 1);
      timeout = window.setTimeout(() => {
        setText(next);
        if (next === full) {
          window.setTimeout(() => setIsDeleting(true), holdMs);
        }
      }, typingSpeedMs);
    } else {
      const next = full.slice(0, Math.max(0, text.length - 1));
      timeout = window.setTimeout(() => {
        setText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setWordIdx((i) => (i + 1) % safeWords.length);
        }
      }, deletingSpeedMs);
    }

    return () => window.clearTimeout(timeout);
  }, [
    deletingSpeedMs,
    holdMs,
    isDeleting,
    safeWords,
    text,
    typingSpeedMs,
    wordIdx,
  ]);

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span>{text}</span>
      <span
        aria-hidden
        className={cn(
          "inline-block h-[1em] w-[2px] bg-white/80 animate-pulse",
          cursorClassName,
        )}
      />
    </span>
  );
}

