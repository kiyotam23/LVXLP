"use client";

import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

type Mode = "dark" | "light";

function toInv(mode: Mode) {
  return mode === "light" ? 1 : 0;
}

export function StyleGuideShell({ children }: PropsWithChildren) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>("dark");

  const headerBg = useMemo(() => {
    // Slight translucency; computed against fixed bg layers.
    return mode === "dark" ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.72)";
  }, [mode]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // Use a global CSS var so fixed layers always resolve it reliably.
    gsap.set(document.documentElement, { "--sg-inv": 0 } as gsap.TweenVars);
    gsap.set(el, { color: "#ffffff" });
  }, []);

  function apply(next: Mode) {
    const el = rootRef.current;
    if (!el) return;

    setMode(next);
    gsap.to(document.documentElement, {
      "--sg-inv": toInv(next),
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
    } as gsap.TweenVars);
    gsap.to(el, {
      color: next === "light" ? "#000000" : "#ffffff",
      duration: 0.45,
      ease: "power2.out",
      overwrite: true,
    });
  }

  function toggleClass(active: boolean) {
    // Ensure legible contrast against translucent header in both modes.
    if (active) {
      return mode === "dark"
        ? "bg-white text-black hover:bg-white/90 border-white"
        : "bg-black text-white hover:bg-black/90 border-black";
    }
    return mode === "dark"
      ? "bg-transparent text-white border-white/40 hover:border-white/70 hover:bg-white/10"
      : "bg-transparent text-black border-black/35 hover:border-black/70 hover:bg-black/5";
  }

  return (
    <div ref={rootRef} className="relative isolate min-h-[100svh]">
      {/* Same concept as the LP: two fixed layers blended by --inv */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundColor: "#000",
          opacity: "calc(1 - var(--sg-inv, 0))",
          backgroundImage:
            "radial-gradient(900px circle at 20% 15%, rgba(255,255,255, 0.06), transparent 55%), radial-gradient(900px circle at 75% 35%, rgba(255,255,255, 0.05), transparent 60%), radial-gradient(1100px circle at 50% 75%, rgba(255,255,255, 0.07), transparent 62%)",
          filter: "blur(10px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundColor: "#f7f8f8",
          opacity: "var(--sg-inv, 0)",
          backgroundImage:
            "radial-gradient(900px circle at 20% 15%, rgba(0,0,0, 0.08), transparent 55%), radial-gradient(900px circle at 75% 35%, rgba(0,0,0, 0.06), transparent 60%), radial-gradient(1100px circle at 50% 75%, rgba(0,0,0, 0.09), transparent 62%)",
          filter: "blur(10px)",
          transform: "translateZ(0)",
        }}
      />

      <header
        className="sticky top-0 z-20 border-b border-current/15 backdrop-blur-sm"
        style={{ backgroundColor: headerBg }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xs font-medium tracking-widest opacity-60">INTERNAL</div>
            <div className="text-base font-semibold tracking-tight">Style Guide</div>
          </div>

          <div className="flex items-center gap-5">
            <nav className="hidden gap-4 text-sm opacity-75 md:flex">
              <a className="hover:opacity-100" href="#typography">
                Typography
              </a>
              <a className="hover:opacity-100" href="#colors">
                Colors
              </a>
              <a className="hover:opacity-100" href="#buttons">
                Buttons
              </a>
              <a className="hover:opacity-100" href="#forms">
                Forms
              </a>
              <a className="hover:opacity-100" href="#spacing">
                Spacing
              </a>
              <a className="hover:opacity-100" href="#animations">
                Animations
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className={toggleClass(mode === "dark")}
                onClick={() => apply("dark")}
              >
                Dark
              </Button>
              <Button
                size="sm"
                className={toggleClass(mode === "light")}
                onClick={() => apply("light")}
              >
                Light
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10">{children}</div>

      <footer className="relative z-10 border-t border-current/15 py-10">
        <div className="mx-auto w-full max-w-6xl px-6 text-sm opacity-60">
          このページはテーマ調整専用。外部導線は置かない想定です（URL直打ちでのみアクセス）。
        </div>
      </footer>
    </div>
  );
}

