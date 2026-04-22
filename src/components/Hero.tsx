"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { lpCopy, lpMotionText } from "@/constants/lp-data";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const [canPlay, setCanPlay] = useState(true);

  const poster = useMemo(
    () =>
      // lightweight placeholder (prevents blank before first frame)
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'%3E%3Crect width='100%25' height='100%25' fill='%2309090b'/%3E%3C/svg%3E",
    [],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((e) => e.isIntersecting);
        setCanPlay(isVisible);
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!canPlay) {
      v.pause();
      return;
    }
    const p = v.play();
    if (p) p.catch(() => {});
  }, [canPlay]);

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
      aria-label="Hero"
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--hx", `${x}%`);
        el.style.setProperty("--hy", `${y}%`);
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        src={lpCopy.hero.videoSrc}
        muted
        playsInline
        loop
        preload="metadata"
        poster={poster}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      {/* Fullscreen interactive color FX (follows pointer) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage:
            "radial-gradient(900px circle at var(--hx,50%) var(--hy,50%), rgba(99,102,241,0.28), transparent 48%), radial-gradient(700px circle at calc(var(--hx,50%) + 12%) calc(var(--hy,50%) - 10%), rgba(236,72,153,0.22), transparent 55%), radial-gradient(650px circle at calc(var(--hx,50%) - 18%) calc(var(--hy,50%) + 16%), rgba(34,211,238,0.14), transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-6xl items-end px-6 pb-16 md:items-center md:pb-0">
        {/* Text container (kept for layout), fully transparent / no border */}
        <div className="w-full p-8 md:p-12">
          <div className="flex flex-col gap-6">
            <div className="text-xs font-medium tracking-widest text-white/70">
              {lpCopy.brand}
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
              {lpCopy.hero.headline}
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-7 text-white/75 md:text-lg">
              {lpCopy.hero.subhead}
            </p>

            <div className="text-sm text-white/80 md:text-base">
              <span className="text-white/60">テーマ:</span>{" "}
              <TypewriterEffect
                words={lpMotionText.heroTheme as unknown as string[]}
                className="font-medium text-white"
                cursorClassName="bg-white/70"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={lpCopy.hero.ctas[0].href}
                className={cn(buttonVariants({ variant: "default" }), "rounded-none")}
              >
                {lpCopy.hero.ctas[0].label}
              </a>
              <a
                href={lpCopy.hero.ctas[1].href}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "rounded-none",
                )}
              >
                {lpCopy.hero.ctas[1].label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

