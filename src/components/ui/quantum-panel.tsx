"use client";

import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
  className?: string;
  contentClassName?: string;
  variant?: "light" | "dark";
}
>;

export function QuantumPanel({
  children,
  className,
  contentClassName,
  variant = "light",
  ...rest
}: Props) {
  const isDark = variant === "dark";

  return (
    <div
      {...rest}
      className={cn(
        "relative overflow-hidden rounded-none p-8 md:p-10",
        isDark
          ? "border border-white/10 bg-black/40 text-white"
          : "border border-black/10 bg-[#FBFBFB] text-black",
        className,
      )}
    >
      {/* Bloom mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(900px circle at 15% 10%, rgba(255,194,226,${isDark ? "0.14" : "0.10"}), transparent 60%),
            radial-gradient(700px circle at 90% 30%, rgba(218,191,255,${isDark ? "0.13" : "0.10"}), transparent 58%),
            radial-gradient(650px circle at 20% 92%, rgba(185,215,255,${isDark ? "0.13" : "0.10"}), transparent 60%),
            radial-gradient(520px circle at 85% 85%, rgba(191,255,231,${isDark ? "0.12" : "0.09"}), transparent 58%),
            radial-gradient(520px circle at 55% 75%, rgba(255,245,181,${isDark ? "0.12" : "0.09"}), transparent 55%)
          `,
        }}
      />

      {/* Neural/prism wireframe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(${isDark ? "255,255,255,0.18" : "0,0,0,0.22"}) 0 1px, transparent 1px 16px),
            repeating-linear-gradient(90deg, rgba(${isDark ? "255,255,255,0.14" : "0,0,0,0.18"}) 0 1px, transparent 1px 18px),
            repeating-linear-gradient(45deg, rgba(${isDark ? "255,255,255,0.12" : "0,0,0,0.16"}) 0 1px, transparent 1px 22px),
            repeating-linear-gradient(-45deg, rgba(${isDark ? "255,255,255,0.10" : "0,0,0,0.14"}) 0 1px, transparent 1px 22px),
            radial-gradient(circle at 50% 40%, rgba(${isDark ? "255,255,255,0.14" : "0,0,0,0.22"}), transparent 55%)
          `,
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 45%, black 60%, transparent 100%)",
          maskImage:
            "radial-gradient(closest-side at 50% 45%, black 60%, transparent 100%)",
        }}
      />

      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}

