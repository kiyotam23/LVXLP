"use client";

import { PropsWithChildren, useMemo } from "react";
import { cn } from "@/lib/utils";

export function HeroHighlight({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const bg = useMemo(
    () => ({
      backgroundImage:
        "radial-gradient(800px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.22), transparent 45%), radial-gradient(600px circle at calc(var(--x,50%) + 12%) calc(var(--y,50%) - 10%), rgba(236,72,153,0.18), transparent 50%)",
    }),
    [],
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none border border-white/10 bg-black/35",
        className,
      )}
      style={bg}
      onPointerMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        (e.currentTarget as HTMLDivElement).style.setProperty("--x", `${x}%`);
        (e.currentTarget as HTMLDivElement).style.setProperty("--y", `${y}%`);
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />
      <div className="relative">{children}</div>
    </div>
  );
}

