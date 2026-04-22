"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { BudouxText } from "@/components/ui/budoux-text";

type ColorToken = { label: string; cssVar: string };

const TOKENS: ColorToken[] = [
  { label: "background", cssVar: "--background" },
  { label: "foreground", cssVar: "--foreground" },
  { label: "card", cssVar: "--card" },
  { label: "card-foreground", cssVar: "--card-foreground" },
  { label: "popover", cssVar: "--popover" },
  { label: "popover-foreground", cssVar: "--popover-foreground" },
  { label: "primary", cssVar: "--primary" },
  { label: "primary-foreground", cssVar: "--primary-foreground" },
  { label: "secondary", cssVar: "--secondary" },
  { label: "secondary-foreground", cssVar: "--secondary-foreground" },
  { label: "muted", cssVar: "--muted" },
  { label: "muted-foreground", cssVar: "--muted-foreground" },
  { label: "accent", cssVar: "--accent" },
  { label: "accent-foreground", cssVar: "--accent-foreground" },
  { label: "destructive", cssVar: "--destructive" },
  { label: "border", cssVar: "--border" },
  { label: "input", cssVar: "--input" },
  { label: "ring", cssVar: "--ring" },
  { label: "Aurora Pink", cssVar: "--aurora-pink" },
  { label: "Ethereal Violet", cssVar: "--ethereal-violet" },
  { label: "Cosmic Blue", cssVar: "--cosmic-blue" },
  { label: "Neo Mint", cssVar: "--neo-mint" },
  { label: "Solar Yellow", cssVar: "--solar-yellow" },
  { label: "chart-1", cssVar: "--chart-1" },
  { label: "chart-2", cssVar: "--chart-2" },
  { label: "chart-3", cssVar: "--chart-3" },
  { label: "chart-4", cssVar: "--chart-4" },
  { label: "chart-5", cssVar: "--chart-5" },
];

function TokenGrid({ className }: { className?: string }) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const root = document.documentElement;
    const next: Record<string, string> = {};
    for (const t of TOKENS) {
      next[t.cssVar] = getComputedStyle(root).getPropertyValue(t.cssVar).trim();
    }
    setValues(next);
  }, []);

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {TOKENS.map((t) => (
          <div key={t.cssVar} className="border border-current/15 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-medium tracking-wide opacity-80">{t.label}</div>
              <div className="text-[10px] opacity-60">{values[t.cssVar] ?? ""}</div>
            </div>
            <div className="mt-2 h-10 w-full border border-current/20 bg-[color:var(--_sg)]" style={{ ["--_sg" as any]: `var(${t.cssVar})` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StyleGuideClient() {
  const cleanupRef = useRef<(() => void) | null>(null);
  const spacing = useMemo(
    () => [
      "p-1",
      "p-2",
      "p-3",
      "p-4",
      "p-6",
      "p-8",
      "p-10",
      "p-12",
      "p-16",
      "p-20",
      "p-24",
    ],
    [],
  );

  useEffect(() => {
    ensureGsap();
    gsap.registerPlugin(ScrollTrigger);

    const kills: Array<() => void> = [];

    const byVariant = new Map<string, Element[]>();
    document.querySelectorAll<HTMLElement>("[data-sg-variant]").forEach((el) => {
      const v = el.dataset.sgVariant ?? "fadeUp";
      const arr = byVariant.get(v) ?? [];
      arr.push(el);
      byVariant.set(v, arr);
    });

    const setup = (variant: string, elements: Element[]) => {
      const els = Array.from(elements);
      if (!els.length) return;

      // Defaults
      let fromVars: gsap.TweenVars = { autoAlpha: 0 };
      let toVars: gsap.TweenVars = { autoAlpha: 1 };
      let duration = 0.9;
      let ease = "power3.out";
      let staggerEach = 0.06;

      if (variant === "fadeUp") {
        fromVars = { autoAlpha: 0, y: 24, filter: "blur(6px)" };
        toVars = { autoAlpha: 1, y: 0, filter: "blur(0px)" };
      } else if (variant === "fadeDown") {
        fromVars = { autoAlpha: 0, y: -20, filter: "blur(4px)" };
        toVars = { autoAlpha: 1, y: 0, filter: "blur(0px)" };
      } else if (variant === "slideLeft") {
        fromVars = { autoAlpha: 0, x: 26 };
        toVars = { autoAlpha: 1, x: 0 };
        duration = 0.7;
        ease = "power2.out";
      } else if (variant === "scaleIn") {
        fromVars = { autoAlpha: 0, scale: 0.96, y: 10, filter: "blur(4px)" };
        toVars = { autoAlpha: 1, scale: 1, y: 0, filter: "blur(0px)" };
        duration = 0.8;
        ease = "power3.out";
      } else if (variant === "easeExpo") {
        fromVars = { autoAlpha: 0, y: 22, filter: "blur(6px)" };
        toVars = { autoAlpha: 1, y: 0, filter: "blur(0px)" };
        duration = 0.9;
        ease = "expo.out";
      } else if (variant === "flip") {
        fromVars = {
          autoAlpha: 0,
          rotateX: -68,
          transformPerspective: 800,
          transformOrigin: "50% 50%",
          y: 10,
        };
        toVars = {
          autoAlpha: 1,
          rotateX: 0,
          transformPerspective: 800,
          transformOrigin: "50% 50%",
          y: 0,
        };
        duration = 0.85;
        ease = "power3.out";
        staggerEach = 0.05;
      }

      gsap.set(els, fromVars);

      ScrollTrigger.batch(els, {
        start: "top 85%",
        onEnter: (batchEls) => {
          gsap.to(batchEls, {
            ...toVars,
            duration,
            ease,
            stagger: { each: staggerEach, from: "start" },
            overwrite: true,
          });
        },
        onLeaveBack: (batchEls) => {
          gsap.to(batchEls, {
            ...fromVars,
            duration: 0.55,
            ease: "power2.out",
            stagger: { each: 0.03, from: "end" },
            overwrite: true,
          });
        },
        interval: 0.1,
        batchMax: 12,
      });
    };

    for (const [variant, elements] of byVariant.entries()) {
      setup(variant, elements);
    }

    cleanupRef.current = () => {
      // Kill only triggers created for this page.
      ScrollTrigger.getAll()
        .filter((t) => (t.vars?.trigger as any)?.dataset?.sgVariant != null)
        .forEach((t) => t.kill(true));
    };

    return () => cleanupRef.current?.();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {/* Colors */}
      <section className="scroll-mt-24" id="colors">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-xl font-semibold tracking-tight">Colors</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 opacity-75">
            <BudouxText
              as="span"
              text="`globals.css` の CSS Variables（shadcn/tailwind.css連携）をそのままチップ化。Light/Dark の両方を並べて確認します。"
            />
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-3 text-xs font-medium tracking-widest opacity-70">LIGHT</div>
              <div className="bg-white text-black">
                <div className="p-4">
                  <TokenGrid />
                </div>
              </div>
            </div>
            <div>
              <div className="mb-3 text-xs font-medium tracking-widest opacity-70">DARK</div>
              <div className="dark bg-black text-white">
                <div className="p-4">
                  <TokenGrid className="dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="scroll-mt-24" id="buttons">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-xl font-semibold tracking-tight">Buttons</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 opacity-75">
            <BudouxText
              as="span"
              text="`components/ui/button.tsx` の variants をそのまま並べます。Hover/Active は実際に触って確認できます。"
            />
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="border border-white/10 p-6">
              <div className="text-xs font-medium tracking-widest opacity-70">VARIANTS</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div className="border border-white/10 p-6">
              <div className="text-xs font-medium tracking-widest opacity-70">STATES</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button disabled>Disabled</Button>
                <Button aria-invalid>Aria Invalid</Button>
                <Button aria-expanded>Aria Expanded</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="scroll-mt-24" id="forms">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-xl font-semibold tracking-tight">Forms</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 opacity-75">
            <BudouxText
              as="span"
              text="いまはshadcnのInput等が未導入なので、CSS variables（border/input/ring）に合わせたベーススタイルで素のHTMLを置いています。"
            />
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="border border-white/10 p-6">
              <div className="text-xs font-medium tracking-widest opacity-70">INPUTS</div>
              <div className="mt-4 flex flex-col gap-3">
                <label className="text-xs opacity-70">Text</label>
                <input
                  className="h-10 w-full border border-input bg-background px-3 text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                  placeholder="テキスト…"
                />
                <label className="text-xs opacity-70">Disabled</label>
                <input
                  disabled
                  className="h-10 w-full border border-input bg-background px-3 text-foreground opacity-60 outline-none"
                  placeholder="無効"
                />
              </div>
            </div>

            <div className="border border-white/10 p-6">
              <div className="text-xs font-medium tracking-widest opacity-70">CHOICES</div>
              <div className="mt-4 flex flex-col gap-4 text-sm">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="size-4 border border-input bg-background accent-[color:var(--primary)]"
                    defaultChecked
                  />
                  Checkbox
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sg-radio"
                    className="size-4 border border-input bg-background accent-[color:var(--primary)]"
                    defaultChecked
                  />
                  Radio A
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sg-radio"
                    className="size-4 border border-input bg-background accent-[color:var(--primary)]"
                  />
                  Radio B
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="scroll-mt-24" id="spacing">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-xl font-semibold tracking-tight">Spacing</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 opacity-75">
            <BudouxText
              as="span"
              text="Tailwindの代表的なpaddingスケールを、実寸で見比べるための箱です（LPでよく使うサイズ中心）。"
            />
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {spacing.map((c) => (
              <div key={c} className="border border-white/10 p-4">
                <div className="text-xs font-medium tracking-widest opacity-70">{c}</div>
                <div className="mt-3 border border-white/10 bg-white/5">
                  <div className={`${c} bg-white/10`}>
                    <div className="border border-white/10 bg-white/10 px-2 py-1 text-xs opacity-80">
                      content
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="scroll-mt-24" id="animations">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-xl font-semibold tracking-tight">Animations</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 opacity-75">
            <BudouxText
              as="span"
              text="実装済みの `revealOnScroll`（GSAP/ScrollTrigger batch）をここで確認できます。下にスクロールして発火を見てください。"
            />
          </p>

          <div className="mt-10 grid gap-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium tracking-widest opacity-70">fadeUp (baseline)</div>
                <div className="mt-3 grid gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`fadeUp-${i}`}
                      data-sg-variant="fadeUp"
                      className="border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="text-sm font-medium tracking-tight">Sample {i + 1}</div>
                      <div className="mt-2 text-sm leading-6 opacity-75">
                        blur + fade + up（現状の雰囲気）。
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium tracking-widest opacity-70">fadeDown</div>
                <div className="mt-3 grid gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`fadeDown-${i}`}
                      data-sg-variant="fadeDown"
                      className="border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="text-sm font-medium tracking-tight">Sample {i + 1}</div>
                      <div className="mt-2 text-sm leading-6 opacity-75">fade + down。</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium tracking-widest opacity-70">slideLeft</div>
                <div className="mt-3 grid gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`slideLeft-${i}`}
                      data-sg-variant="slideLeft"
                      className="border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="text-sm font-medium tracking-tight">Sample {i + 1}</div>
                      <div className="mt-2 text-sm leading-6 opacity-75">x方向のスライド。</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium tracking-widest opacity-70">scaleIn</div>
                <div className="mt-3 grid gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`scaleIn-${i}`}
                      data-sg-variant="scaleIn"
                      className="border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="text-sm font-medium tracking-tight">Sample {i + 1}</div>
                      <div className="mt-2 text-sm leading-6 opacity-75">scale + blur。</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium tracking-widest opacity-70">easeExpo</div>
                <div className="mt-3 grid gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`easeExpo-${i}`}
                      data-sg-variant="easeExpo"
                      className="border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="text-sm font-medium tracking-tight">Sample {i + 1}</div>
                      <div className="mt-2 text-sm leading-6 opacity-75">expo.out の抜け感。</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium tracking-widest opacity-70">flip (subtle)</div>
                <div className="mt-3 grid gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`flip-${i}`}
                      data-sg-variant="flip"
                      className="border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="text-sm font-medium tracking-tight">Sample {i + 1}</div>
                      <div className="mt-2 text-sm leading-6 opacity-75">軽い3Dフリップ。</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

