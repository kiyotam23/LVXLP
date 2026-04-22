"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap } from "@/lib/gsap";

type Props = {
  /** The element that receives `backgroundColor` + `color` tween. */
  targetRef: React.RefObject<HTMLElement | null>;
  /** Fixed background layer to animate (liquid light wash). */
  backgroundRef: React.RefObject<HTMLDivElement | null>;
  /** Trigger section id (midpoint trigger). */
  triggerId?: string;
  /** Plan 04 card selector for "pure white completion". */
  plan04Selector?: string;
};

export function GreatTransition({
  targetRef,
  backgroundRef,
  triggerId = "transition",
  plan04Selector = '[data-plan="plan-04"]',
}: Props) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    ensureGsap();
    gsap.registerPlugin(ScrollTrigger);

    const target = targetRef.current;
    const bg = backgroundRef.current;
    const trigger = document.getElementById(triggerId);
    const plan04 = document.querySelector(plan04Selector);
    const orb = document.querySelector("[data-transition-orb]");

    if (!target || !bg || !trigger) return;

    // Put CSS variables on the parent (<main>) so all background layers can read them.
    const varsHost = target;

    // Initial state.
    gsap.set(varsHost, { "--inv": 0 } as gsap.TweenVars);
    gsap.set(target, { color: "#ffffff" });

    // Liquid light wash layer is controlled via CSS vars on bg.
    // 白相の「ink」radial（--washW*）は常に 0 — セカンドヒーロー等の純白面と干渉しないようにする
    gsap.set(varsHost, {
      "--wash": 0,
      "--wash2": 0,
      "--wash3": 0,
      "--washW": 0,
      "--washW2": 0,
      "--washW3": 0,
    } as gsap.TweenVars);

    const endEl = (plan04 as Element | null) ?? trigger;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top top",
        end: "+=160%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Falling orb → bounce → expand to white (single-shape transition).
    if (orb) {
      gsap.set(orb, { y: -320, scale: 0, autoAlpha: 1, transformOrigin: "50% 50%" });

      // Grow in, then fall with acceleration.
      tl.to(orb, { scale: 1, duration: 0.16, ease: "power2.out" }, 0.02)
        .to(
          orb,
          { y: 0, duration: 0.55, ease: "power3.in" },
          0.12,
        )
        // Impact squash.
        .to(
          orb,
          { scaleY: 0.72, scaleX: 1.22, duration: 0.08, ease: "power2.out" },
          0.60,
        )
        // Bounce up a bit.
        .to(
          orb,
          { y: -58, scaleX: 1, scaleY: 1, duration: 0.14, ease: "power2.out" },
          0.68,
        )
        // Settle back.
        .to(
          orb,
          { y: 0, duration: 0.12, ease: "power2.inOut" },
          0.82,
        )
        // Expand to fill screen (this drives the transition to white).
        .to(
          orb,
          // Half speed + half size vs previous.
          { scale: 19, duration: 0.44, ease: "power4.in" },
          0.90,
        )
        // Finally disappear.
        .to(
          orb,
          { autoAlpha: 0, duration: 0.12, ease: "power2.out" },
          1.10,
        );
    }

    // Inversion ramps with expansion (no extra shapes).
    tl.to(
      varsHost,
      {
        keyframes: [
          { "--inv": 0, duration: 0.86, ease: "none" },
          { "--inv": 1, duration: 0.14, ease: "none" },
          { "--inv": 1, duration: 0.00, ease: "none" },
        ],
      } as gsap.TweenVars,
      0,
    ).to(
      target,
      {
        keyframes: [
          { color: "#ffffff", duration: 0.86, ease: "none" },
          { color: "#000000", duration: 0.14, ease: "none" },
          { color: "#000000", duration: 0.00, ease: "none" },
        ],
      },
      0,
    );

    // "Light beam that expands and consumes the screen" (liquid mix).
    // Using multiple radial gradients that intensify with scroll.
    tl.to(
      varsHost,
      {
        keyframes: [
          { "--wash": 0.02, "--wash2": 0.01, "--wash3": 0.02, duration: 0.86, ease: "none" },
          { "--wash": 1, "--wash2": 0.95, "--wash3": 1, duration: 0.14, ease: "none" },
          { "--wash": 1, "--wash2": 1, "--wash3": 1, duration: 0.00, ease: "none" },
        ],
      } as gsap.TweenVars,
      0,
    );

    // Make sure reversing scroll returns perfectly.
    cleanupRef.current = () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };

    return () => cleanupRef.current?.();
  }, [backgroundRef, plan04Selector, targetRef, triggerId]);

  return null;
}

