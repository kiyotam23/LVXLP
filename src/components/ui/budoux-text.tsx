import * as React from "react";
import { loadDefaultJapaneseParser } from "budoux";
import { cn } from "@/lib/utils";

const jaParser = loadDefaultJapaneseParser();

type Props<T extends keyof React.JSX.IntrinsicElements> = {
  as?: T;
  text: string;
  className?: string;
  /**
   * If true, each chunk is wrapped with `whitespace-nowrap` to prevent breaking inside chunks.
   * Breaks are allowed between chunks.
   */
  noWrapChunks?: boolean;
} & Omit<React.JSX.IntrinsicElements[T], "children">;

export function BudouxText<T extends keyof React.JSX.IntrinsicElements = "span">({
  as,
  text,
  className,
  noWrapChunks = true,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "span") as any;
  const chunks = React.useMemo(() => jaParser.parse(text), [text]);

  return (
    <Tag className={className} {...rest}>
      {chunks.map((chunk, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={cn(noWrapChunks && "whitespace-nowrap")}
        >
          {chunk}
        </span>
      ))}
    </Tag>
  );
}

