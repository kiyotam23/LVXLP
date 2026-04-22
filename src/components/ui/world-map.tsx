"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Point = {
  id: string;
  label: string;
  lat: number;
  lon: number;
};

type Props = {
  points: Point[];
  className?: string;
  heightClassName?: string;
};

function project(lat: number, lon: number, w: number, h: number) {
  // Equirectangular projection (good enough for a UI demo).
  const x = ((lon + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return { x, y };
}

export function WorldMap({
  points,
  className,
  heightClassName = "h-[360px] md:h-[440px]",
}: Props) {
  const w = 1000;
  const h = 520;
  const coords = points.map((p) => ({ ...p, ...project(p.lat, p.lon, w, h) }));

  const routes = coords.length >= 2 ? coords.slice(0, -1).map((p, i) => {
    const n = coords[i + 1]!;
    return { from: p, to: n, id: `${p.id}-${n.id}` };
  }) : [];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none border border-white/10 bg-black/30 backdrop-blur",
        heightClassName,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(99,102,241,0.22),transparent_40%),radial-gradient(700px_circle_at_70%_60%,rgba(236,72,153,0.14),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.20] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Minimal "map-like" silhouette (decorative) */}
        <path
          d="M82 214c74-52 142-72 210-68 68 4 126 24 184 44 56 20 114 36 188 24 74-12 132-44 190-72l10 48c-62 28-124 60-206 74-82 14-150-6-214-28-62-22-118-40-180-44-62-4-126 10-196 56z"
          fill="rgba(255,255,255,0.10)"
        />
        <path
          d="M120 360c58-28 120-42 190-40 70 2 130 18 188 32 56 14 110 22 172 10 62-12 116-38 160-58l8 44c-48 22-104 48-170 62-66 14-128 4-186-10-60-14-116-30-176-32-60-2-118 10-176 36z"
          fill="rgba(255,255,255,0.08)"
        />

        {routes.map((r, idx) => {
          const d = `M ${r.from.x} ${r.from.y} C ${(r.from.x + r.to.x) / 2} ${
            Math.min(r.from.y, r.to.y) - 80
          }, ${(r.from.x + r.to.x) / 2} ${
            Math.min(r.from.y, r.to.y) - 80
          }, ${r.to.x} ${r.to.y}`;
          return (
            <motion.path
              key={r.id}
              d={d}
              fill="none"
              stroke="rgba(99,102,241,0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                delay: 0.25 + idx * 0.15,
                duration: 1.35,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {coords.map((p, idx) => (
          <g key={p.id}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="6"
              fill="rgba(236,72,153,0.9)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 + idx * 0.05, duration: 0.35 }}
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="14"
              fill="rgba(236,72,153,0.12)"
            />
          </g>
        ))}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        {coords.map((p) => (
          <div
            key={p.id}
            className="rounded-none border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80"
          >
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
}

