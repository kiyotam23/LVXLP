"use client";

import { useEffect, useRef } from "react";
import { lpCopy, lpScreening } from "@/constants/lp-data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { revealOnScroll } from "@/lib/gsap";
import { QuantumPanel } from "@/components/ui/quantum-panel";

export function ScreeningCTA() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    revealOnScroll(root.querySelectorAll("[data-reveal]"));
  }, []);

  return (
    <section
      id="screening"
      ref={ref}
      className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32"
    >
      <QuantumPanel className="p-8 md:p-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 data-reveal className="text-balance text-2xl font-semibold md:text-4xl">
              {lpCopy.sections.screeningTitle}
            </h2>
            <p data-reveal className="max-w-2xl opacity-70">
              {lpCopy.sections.screeningDesc}
            </p>
            <p data-reveal className="text-xs opacity-55">
              {lpScreening.helper}
            </p>
          </div>

          <div data-reveal className="flex flex-col gap-3">
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "rounded-none border border-black/15 bg-black text-white hover:bg-black/90",
              )}
            >
              {lpScreening.buttonLabel}
            </a>
            <div className="text-xs opacity-55">
              適応性評価 → 医師確認 → 予約（将来実装）
            </div>
          </div>
        </div>
      </QuantumPanel>
    </section>
  );
}

