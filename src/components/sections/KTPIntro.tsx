"use client";

import { useEffect, useRef } from "react";
import { lpKTP } from "@/constants/lp-data";
import { revealOnScroll } from "@/lib/gsap";
import { QuantumPanel } from "@/components/ui/quantum-panel";

export function KTPIntro() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    revealOnScroll(root.querySelectorAll("[data-reveal]"));
  }, []);

  return (
    <section
      id="ktp-intro"
      ref={ref}
      className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28"
    >
      <div className="mb-10 flex flex-col gap-3">
        <h2 data-reveal className="text-balance text-2xl font-semibold md:text-4xl">
          {lpKTP.mainCatch}
        </h2>
      </div>

      <QuantumPanel variant="dark">
        <div
          data-reveal
          className="text-xs tracking-[0.28em] opacity-55"
        >
          {lpKTP.leadTitle}
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {lpKTP.leadParagraphs.map((p) => (
            <p key={p} data-reveal className="text-pretty text-base leading-8 opacity-80 md:text-lg">
              {p}
            </p>
          ))}
        </div>
      </QuantumPanel>
    </section>
  );
}

