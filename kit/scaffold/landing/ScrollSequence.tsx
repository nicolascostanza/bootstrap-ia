"use client";

import { useEffect, useRef } from "react";

type ScrollSequenceProps = {
  frameCount: number;
  frameSrc: (index: number) => string;
  travel?: number;
  hint?: string;
  alt?: string;
  className?: string;
};

export function ScrollSequence({ frameCount, frameSrc, travel = 3, hint = "scroll", alt = "", className }: ScrollSequenceProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;

    import("./scrub-image-sequence.js").then((mod) => {
      if (cancelled) return;
      dispose = mod.mountImageSequence(node, { frameCount, frameSrc, travel, hint, alt });
    });

    return () => {
      cancelled = true;
      if (dispose) dispose();
    };
  }, [frameCount, frameSrc, travel, hint, alt]);

  return <div ref={ref} className={className} />;
}
