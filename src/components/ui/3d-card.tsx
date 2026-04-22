"use client";

import { PropsWithChildren, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
  glow?: boolean;
}>;

export function ThreeDCard({ className, glow = true, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 18;
    const rotX = -(py - 0.5) * 14;
    el.style.setProperty("--rx", `${rotX}deg`);
    el.style.setProperty("--ry", `${rotY}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-none border border-white/10 bg-white/5 p-0 [transform-style:preserve-3d] transition-transform duration-200",
        className,
      )}
      style={{
        transform: "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {glow ? (
        <div
          className="pointer-events-none absolute -inset-px rounded-none opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--gx,50%) var(--gy,50%), rgba(99,102,241,0.30), transparent 40%), radial-gradient(500px circle at calc(var(--gx,50%) + 10%) calc(var(--gy,50%) - 10%), rgba(236,72,153,0.24), transparent 45%)",
          }}
        />
      ) : null}
      <div className="relative rounded-none [transform:translateZ(0px)]">
        {children}
      </div>
    </div>
  );
}

