"use client";

import { useEffect, useRef } from "react";
import { lpKTP } from "@/constants/lp-data";
import { revealOnScroll } from "@/lib/gsap";
import { QuantumPanel } from "@/components/ui/quantum-panel";

export function KTPSteps01_02() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    revealOnScroll(root.querySelectorAll("[data-reveal]"));
  }, []);

  return (
    <section
      id="ktp-steps"
      ref={ref}
      className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24"
    >
      <div className="mb-10 flex flex-col gap-4">
        <h2 data-reveal className="text-balance text-2xl font-semibold md:text-4xl">
          プログラムの3ステップ
        </h2>
        <p data-reveal className="max-w-3xl opacity-70">
          KTPは、体験を「終わらせない」ために、段階的に意識のOSを書き換えます。
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <QuantumPanel variant="dark" data-reveal>
          <div className="text-xs font-medium tracking-[0.28em] opacity-60">
            {lpKTP.steps.step1Title}
          </div>
          <div className="mt-4 text-pretty text-base leading-8 opacity-85 md:text-lg">
            {lpKTP.steps.step1Body.map((p) => (
              <p key={p} className="mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </QuantumPanel>

        <QuantumPanel variant="dark" data-reveal>
          <div className="text-xs font-medium tracking-[0.28em] opacity-60">
            {lpKTP.steps.step2Title}
          </div>
          <div className="mt-4 text-pretty text-base leading-8 opacity-85 md:text-lg">
            {lpKTP.steps.step2Body.map((p) => (
              <p key={p} className="mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </QuantumPanel>

        <QuantumPanel variant="dark" data-reveal>
          <div className="text-xs font-medium tracking-[0.28em] opacity-60">
            {lpKTP.steps.step3Title}
          </div>
          <div className="mt-4 text-pretty text-base leading-8 opacity-85 md:text-lg">
            {lpKTP.steps.step3Body.map((p) => (
              <p key={p} className="mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </QuantumPanel>
      </div>
    </section>
  );
}

