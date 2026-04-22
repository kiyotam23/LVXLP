"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function revealOnScroll(elements: Element[] | NodeListOf<Element>) {
  ensureGsap();

  const els = Array.from(elements);
  if (!els.length) return;

  gsap.set(els, { autoAlpha: 0, y: 24, filter: "blur(6px)" });

  // Batch triggers to avoid creating one ScrollTrigger per element.
  ScrollTrigger.batch(els, {
    start: "top 85%",
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.06, from: "start" },
        overwrite: true,
      });
    },
    onLeaveBack: (batch) => {
      gsap.to(batch, {
        autoAlpha: 0,
        y: 24,
        filter: "blur(6px)",
        duration: 0.5,
        ease: "power2.out",
        stagger: { each: 0.03, from: "end" },
        overwrite: true,
      });
    },
    interval: 0.1,
    batchMax: 12,
  });
}

