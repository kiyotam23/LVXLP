"use client";

export function TransitionGate() {
  return (
    <section
      id="transition"
      aria-label="Transition"
      className="relative w-full py-24 md:py-32"
    >
      <div className="relative h-[520px] overflow-hidden">
          {/* abyss haze */}
          <div
            className="pointer-events-none absolute -inset-24 opacity-70"
            style={{
              background:
                "radial-gradient(520px circle at 50% 45%, rgba(255,255,255,0.08), transparent 62%), radial-gradient(700px circle at 40% 60%, rgba(255,255,255,0.04), transparent 65%)",
              filter: "blur(10px)",
            }}
          />

          {/* falling orb (the only shape) */}
          <div
            data-transition-orb
            className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "rgb(247 248 248 / 0.98)",
              borderRadius: "999px",
              filter: "blur(0px)",
              boxShadow: "0 0 36px rgba(247,248,248,0.35)",
            }}
          />
      </div>
    </section>
  );
}

