"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { lpCopy } from "@/constants/lp-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PostTransitionHero() {
  const { postTransitionHero } = lpCopy;
  const useVideo = Boolean(postTransitionHero.videoSrc?.length);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const [canPlay, setCanPlay] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!useVideo) return;
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        setCanPlay(entries.some((e) => e.isIntersecting));
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [useVideo]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !useVideo) return;
    if (!canPlay) {
      v.pause();
      return;
    }
    const p = v.play();
    if (p) p.catch(() => {});
  }, [canPlay, useVideo]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      ref={rootRef}
      id="post-transition-hero"
      className="relative z-[1] isolate h-[100svh] w-full overflow-hidden bg-[#f7f8f8]"
      aria-label="白相のビジュアル"
    >
      <div className="absolute inset-0">
        {useVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={postTransitionHero.videoSrc}
            muted
            playsInline
            loop
            preload="metadata"
          />
        ) : (
          <Image
            src={postTransitionHero.imageSrc}
            alt={postTransitionHero.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f7f8f8] via-[#f7f8f8]/90 to-[#f7f8f8]/20"
        aria-hidden
      />

      <div className="relative z-[2] flex h-full flex-col justify-end px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="pointer-events-auto mx-auto w-full max-w-2xl text-black">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-black/50">
            {postTransitionHero.eyebrow}
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-4xl">
            {postTransitionHero.headline}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-black/65 md:text-base">
            {postTransitionHero.lead}
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {submitted ? (
              <p className="text-sm text-black/70 md:text-base">
                {postTransitionHero.thanksMessage}
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
              >
                <label className="sr-only" htmlFor="post-hero-email">
                  メールアドレス
                </label>
                <input
                  id="post-hero-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={postTransitionHero.emailPlaceholder}
                  className="min-h-11 flex-1 border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none transition-colors focus-visible:border-black/40 focus-visible:ring-1 focus-visible:ring-black/20"
                />
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="h-11 min-w-[9rem] rounded-none bg-black text-white hover:bg-black/85"
                >
                  {postTransitionHero.submitLabel}
                </Button>
              </form>
            )}

            <p className="text-xs text-black/45">{postTransitionHero.privacyNote}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 pt-6">
              <span className="text-xs text-black/45">または</span>
              <a
                href={postTransitionHero.screeningCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-none border-black/20 bg-transparent text-black hover:bg-black/5",
                )}
              >
                {postTransitionHero.screeningCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
