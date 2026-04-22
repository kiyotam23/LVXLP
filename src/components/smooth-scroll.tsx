"use client";

import { PropsWithChildren } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export function SmoothScroll({ children }: PropsWithChildren) {
  useSmoothScroll();
  return <>{children}</>;
}

