import { Hero } from "@/components/Hero";
import { MainShell } from "@/components/MainShell";
import { TransitionGate } from "@/components/sections/TransitionGate";
import { Programs } from "@/components/sections/Programs";
import { Founders } from "@/components/sections/Founders";
import { ScreeningCTA } from "@/components/sections/ScreeningCTA";
import { KTPIntro } from "@/components/sections/KTPIntro";
import { KTPSteps01_02 } from "@/components/sections/KTPSteps01_02";
import { KTPSteps03Concept } from "@/components/sections/KTPSteps03Concept";
import { PostTransitionHero } from "@/components/sections/PostTransitionHero";

export default function Home() {
  return (
    <div className="flex min-h-[100svh] flex-col font-sans">
      <Hero />
      <MainShell>
        <KTPIntro />
        <KTPSteps01_02 />
        {/* STEP 3（再構成〜コンセプト）から白相へ */}
        <TransitionGate />
        <PostTransitionHero />
        <KTPSteps03Concept />
        <Programs />
        <Founders />
        <ScreeningCTA />
      </MainShell>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Modern Temple</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#programs">
              Programs
            </a>
            <a className="hover:text-white" href="#screening">
              Screening
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
