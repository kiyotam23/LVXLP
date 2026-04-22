"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

export function GradualSpacing({
  as = "div",
  text = "Gradual Spacing",
  className,
  charClassName,
  delayStep = 0.1,
  duration = 0.5,
}: {
  as?: "div" | "span";
  text?: string;
  className?: string;
  /**
   * Character wrapper class. Put typography classes here.
   * The component always uses `inline-block` per character for correct per-char transforms.
   */
  charClassName?: string;
  delayStep?: number;
  duration?: number;
}) {
  const Tag = as;
  const containerRef = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { once: true });

  const base =
    Tag === "span"
      ? "inline-flex flex-wrap justify-center gap-x-1"
      : "flex flex-wrap justify-center gap-x-1";

  return (
    <Tag ref={containerRef as any} className={cn(base, className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -18 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
          transition={{ duration, delay: i * delayStep }}
          className={cn("inline-block", charClassName)}
        >
          {char === " " ? <span aria-hidden>&nbsp;</span> : char}
        </motion.span>
      ))}
    </Tag>
  );
}

