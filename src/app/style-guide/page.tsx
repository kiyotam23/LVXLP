import { StyleGuideClient } from "@/app/style-guide/style-guide-client";
import { StyleGuideShell } from "@/app/style-guide/style-guide-shell";
import { BudouxText } from "@/components/ui/budoux-text";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { lpMotionText } from "@/constants/lp-data";

export const metadata = {
  title: "Style Guide (Internal)",
  robots: { index: false, follow: false },
};

export default function StyleGuidePage() {
  return (
    <StyleGuideShell>
      <main className="py-10">
        {/* Typography */}
        <section className="scroll-mt-24" id="typography">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-xl font-semibold tracking-tight">Typography</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 opacity-75">
              日本語の改行・字間・行間の癖を見るためのサンプル。短文/長文を混在させています。
            </p>

            <div className="mt-8 grid gap-6 border border-current/15 p-6">
              <div className="space-y-3">
                <div className="text-xs font-medium tracking-widest opacity-60">HEADINGS</div>
                <h1 className="text-balance text-4xl font-semibold leading-[2.3] tracking-tight md:text-6xl">
                  <TypewriterEffect
                    words={lpMotionText.styleGuideH1 as unknown as string[]}
                    className="text-inherit"
                    cursorClassName="bg-current/70"
                    typingSpeedMs={70}
                    deletingSpeedMs={45}
                    holdMs={1100}
                  />
                </h1>
                <h1 className="text-balance text-4xl font-semibold leading-[2.3] tracking-tight md:text-6xl">
                  <BudouxText as="span" text="H1 静寂の中で、脳を再起動する。" />
                </h1>
                <h2 className="text-balance text-3xl font-semibold leading-[2.3] tracking-tight md:text-5xl">
                  意識の再編成：
                  <TypewriterEffect
                    words={lpMotionText.styleGuideH2 as unknown as string[]}
                    className="ml-2 text-inherit"
                    cursorClassName="bg-current/70"
                    typingSpeedMs={80}
                    deletingSpeedMs={50}
                    holdMs={1000}
                  />
                </h2>
                <h2 className="text-balance text-3xl font-semibold leading-[2.3] tracking-tight md:text-5xl">
                  <BudouxText as="span" text="H2 意識の潜行を、医療プロトコルで支える。" />
                </h2>
                <h3 className="text-balance text-2xl font-semibold leading-[2.3] tracking-tight md:text-4xl">
                  <BudouxText as="span" text="H3 深淵の設計：準備・体験・統合" />
                </h3>
                <h4 className="text-balance text-xl font-semibold leading-[2.3] tracking-tight md:text-2xl">
                  <BudouxText as="span" text="H4 変容の階梯" />
                </h4>
                <h5 className="text-lg font-semibold leading-[2.3] tracking-tight">
                  <BudouxText as="span" text="H5 安全性の担保" />
                </h5>
                <h6 className="text-base font-semibold leading-[2.3] tracking-wide">
                  <BudouxText as="span" text="H6 注意事項" />
                </h6>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-medium tracking-widest opacity-60">BODY</div>
                <p className="max-w-3xl text-pretty text-base font-medium leading-[2.3] tracking-[0.03em] opacity-85 md:text-lg">
                  <BudouxText
                    as="span"
                    text="長文サンプル：ここに文章が入ります。日本語は改行位置で印象が崩れやすいので、あえて句読点や括弧を混ぜます。「医療」「安全」「統合」など、硬い語彙と柔らかい語彙が混在したときのリズムも確認します。"
                  />
                </p>
                <p className="max-w-3xl text-pretty text-sm font-light leading-[2.3] tracking-[0.03em] opacity-70">
                  <BudouxText
                    as="span"
                    text="注釈サンプル：このページは内部用で、外部公開は想定しません。色や字間が薄い/詰まりすぎるなどの違和感を1ページで検出するための作業台です。"
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12">
          <StyleGuideClient />
        </div>
      </main>
    </StyleGuideShell>
  );
}

