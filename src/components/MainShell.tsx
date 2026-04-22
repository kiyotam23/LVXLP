"use client";

import { PropsWithChildren, useRef } from "react";
import { GreatTransition } from "@/components/GreatTransition";

export function MainShell({ children }: PropsWithChildren) {
  const mainRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  return (
    <main ref={mainRef} className="relative flex-1" suppressHydrationWarning>
      {/* Requirement: fixed background for the whole <main>. */}
      <div
        ref={bgRef}
        className="fixed inset-0 -z-10"
        style={{ opacity: 0 }}
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundColor: "#000",
          opacity: "calc(1 - var(--inv, 0))",
          backgroundImage:
            "radial-gradient(900px circle at 20% 15%, rgba(255,255,255, calc(0.00 + (var(--wash, 0) * 0.22))), transparent 55%), radial-gradient(900px circle at 75% 35%, rgba(255,255,255, calc(0.00 + (var(--wash2, 0) * 0.18))), transparent 60%), radial-gradient(1100px circle at 50% 75%, rgba(255,255,255, calc(0.00 + (var(--wash3, 0) * 0.26))), transparent 62%)",
          filter: "blur(10px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundColor: "#f7f8f8",
          opacity: "var(--inv, 0)",
          backgroundImage:
            "radial-gradient(900px circle at 20% 15%, rgba(0,0,0, calc(0.00 + (var(--washW, 0) * 0.12))), transparent 55%), radial-gradient(900px circle at 75% 35%, rgba(0,0,0, calc(0.00 + (var(--washW2, 0) * 0.10))), transparent 60%), radial-gradient(1100px circle at 50% 75%, rgba(0,0,0, calc(0.00 + (var(--washW3, 0) * 0.14))), transparent 62%)",
          /* blur は下の黒 body と境界でにじみ／ガクつきの原因になり得るため白相のみオフ */
          transform: "translateZ(0)",
        }}
      />

      <GreatTransition targetRef={mainRef} backgroundRef={bgRef} />

      <div className="relative">{children}</div>
    </main>
  );
}

