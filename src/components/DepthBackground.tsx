"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function DepthBackground() {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = document.documentElement;
    el.style.setProperty("--depth", "0");

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        el.style.setProperty("--depth", String(self.progress));
      },
    });

    cleanupRef.current = () => {
      st.kill();
    };

    return () => cleanupRef.current?.();
  }, []);

  return null;
}

