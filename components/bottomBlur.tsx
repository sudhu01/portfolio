"use client";

import { useEffect, useRef } from "react";

/**
 * Progressive blur pinned to the bottom edge of the viewport.
 *
 * A single `backdrop-blur` would produce a hard seam where the filter starts,
 * so the effect is built from stacked layers: each one blurs a little harder
 * than the last and is masked to its own band, which reads as a smooth ramp
 * from crisp content into a soft, tinted edge.
 *
 * The whole thing fades out as the page bottoms out — there is nothing left to
 * scroll into, so softening the final band would just obscure it.
 */

// [blur radius, mask stops] — bands overlap so no seam is visible between them.
//
// Stops are read against `to top`, so 0% is the screen edge and 100% is the
// boundary with crisp content. The ramp therefore runs strongest-first: the
// heaviest blur hugs the screen edge and the lightest feathers out at the top,
// where an abrupt jump would read as a hard line.
const LAYERS = [
  ["2px", "black 0%, black 22%, transparent 50%"],
  ["1.1px", "transparent 12%, black 36%, black 55%, transparent 76%"],
  ["0.55px", "transparent 34%, black 58%, black 74%, transparent 92%"],
  ["0.25px", "transparent 55%, black 80%, black 100%"],
] as const;

// Scroll distance from the page bottom over which the effect fades away
const FADE_DISTANCE = 120;

export default function BottomBlur() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;

      const remaining =
        document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY;

      el.style.opacity = String(
        Math.min(Math.max(remaining / FADE_DISTANCE, 0), 1)
      );
    };

    // Scroll-linked, so coalesce bursts of events into one paint
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-8 md:h-10"
    >
      {LAYERS.map(([radius, stops]) => (
        <div
          key={radius}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${radius})`,
            WebkitBackdropFilter: `blur(${radius})`,
            maskImage: `linear-gradient(to top, ${stops})`,
            WebkitMaskImage: `linear-gradient(to top, ${stops})`,
          }}
        />
      ))}

      {/* Tint that settles the very bottom into the page background */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-100/80 to-transparent to-75% dark:from-neutral-950/80" />
    </div>
  );
}
