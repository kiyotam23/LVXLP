"use client";

import { useEffect, useRef } from "react";
import { lpCopy, lpFounders } from "@/constants/lp-data";
import { revealOnScroll } from "@/lib/gsap";
import { QuantumPanel } from "@/components/ui/quantum-panel";

export function Founders() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    revealOnScroll(root.querySelectorAll("[data-reveal]"));
  }, []);

  return (
    <section
      id="founders"
      ref={ref}
      className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32"
    >
      <div className="mb-12 flex flex-col gap-3">
        <h2 data-reveal className="text-balance text-2xl font-semibold md:text-4xl">
          {lpCopy.sections.foundersTitle}
        </h2>
        <p data-reveal className="max-w-2xl opacity-70">
          {lpCopy.sections.foundersDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {lpFounders.map((f) => (
          <QuantumPanel
            key={f.id}
            data-reveal
            className="p-7 md:p-9"
          >
            <div className="text-xs tracking-[0.25em] opacity-55">{f.role}</div>
            <div className="mt-2 text-lg font-light tracking-[0.04em] md:text-xl">
              {f.name}
            </div>
            <div className="mt-4 text-sm leading-7 opacity-75">{f.bio}</div>
            <div className="mt-8 h-px w-full bg-black/10" />
            <div className="mt-4 text-xs opacity-55">
              “現代の寺院”は、科学と安全を土台に成り立つ。
            </div>
          </QuantumPanel>
        ))}
      </div>
    </section>
  );
}

