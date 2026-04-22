/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

type Options = ConstructorParameters<typeof Lenis>[0];

export function useSmoothScroll(options?: Options) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      ...options,
    });

    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis' virtual scroll.
    gsap.registerPlugin(ScrollTrigger);
    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    // Drive Lenis from GSAP ticker for perfect sync.
    const ticker = (time: number) => {
      // gsap ticker is in seconds; Lenis expects ms
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // In case something else changes layout.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return lenisRef;
}

