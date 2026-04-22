"use client";

import { useEffect, useRef } from "react";
import { lpKTP } from "@/constants/lp-data";
import { revealOnScroll } from "@/lib/gsap";
import { QuantumPanel } from "@/components/ui/quantum-panel";

function renderBold(text: string) {
  return text.split("**").map((part, idx) =>
    idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part,
  );
}

export function KTPSteps03Concept() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    revealOnScroll(root.querySelectorAll("[data-reveal]"));
  }, []);

  return (
    <section
      id="ktp-concept"
      ref={ref}
      className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24"
    >
      <div className="flex flex-col gap-4">
        <div
          data-reveal
          className="text-balance text-2xl font-semibold md:text-3xl"
        >
          コンセプト
        </div>
        <div data-reveal className="text-pretty text-base leading-8 opacity-90 md:text-lg">
          {lpKTP.conceptTitle}
        </div>
        <div data-reveal className="text-pretty text-base leading-8 opacity-80 md:text-lg">
          {lpKTP.conceptBody.map((p) => (
            <p key={p} className="mb-3 last:mb-0">
              {renderBold(p)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

