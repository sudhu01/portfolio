"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { format } from "date-fns";

type Day = { date: string; count: number };

type Props = {
  weeks: Day[][];
  months: string[];
  total: number;
  username: string;
};

// Viewport coordinates of the hovered cell — the tooltip is positioned fixed so
// neither the horizontal scroller nor the section's overflow clip can crop it.
type Tooltip = {
  date: string;
  count: number;
  cx: number;
  top: number;
  bottom: number;
} | null;

// Resolved position, measured once the bubble has rendered.
type Placement = { left: number; top: number; arrow: number; below: boolean };

const EDGE = 8; // keep-away margin from the viewport edges
const GAP = 8; // space between the cell and the bubble

// useLayoutEffect warns when a client component is server-rendered; positioning
// only ever happens in the browser, after a hover.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// The ramp inverts in dark mode: empty days sink into the background and
// busy days brighten, mirroring the light-mode contrast direction.
const LEVELS = [
  "bg-zinc-200 dark:bg-neutral-900",
  "bg-zinc-300 dark:bg-neutral-700",
  "bg-zinc-400 dark:bg-neutral-600",
  "bg-zinc-500 dark:bg-neutral-400",
  "bg-zinc-600 dark:bg-neutral-200",
];

function level(count: number) {
  if (count === 0) return LEVELS[0];
  if (count <= 2) return LEVELS[1];
  if (count <= 5) return LEVELS[2];
  if (count <= 10) return LEVELS[3];
  return LEVELS[4];
}

export default function GithubContributionsGrid({ weeks, months, total, username }: Props) {
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const [placement, setPlacement] = useState<Placement | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  // Measure the rendered bubble, then clamp it inside the viewport and slide
  // the arrow back over the cell it points at. Runs before paint, so the
  // pre-measurement (hidden) frame is never visible.
  useIsomorphicLayoutEffect(() => {
    const el = tipRef.current;
    if (!tooltip || !el) {
      setPlacement(null);
      return;
    }

    const { width, height } = el.getBoundingClientRect();
    const half = width / 2;
    const min = EDGE + half;
    const max = window.innerWidth - EDGE - half;
    // A bubble wider than the viewport can't satisfy both edges — centre it.
    const left = min > max ? window.innerWidth / 2 : Math.min(Math.max(tooltip.cx, min), max);
    const below = tooltip.top - GAP - height < EDGE;
    const arrowLimit = Math.max(0, half - 10);

    setPlacement({
      left,
      top: below ? tooltip.bottom + GAP : tooltip.top - GAP - height,
      arrow: Math.min(Math.max(tooltip.cx - left, -arrowLimit), arrowLimit),
      below,
    });
  }, [tooltip]);

  // Fixed positioning goes stale the moment anything scrolls or resizes.
  useEffect(() => {
    if (!tooltip) return;
    const dismiss = () => setTooltip(null);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => {
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, [tooltip]);

  return (
    <div className="relative z-10 w-full py-4">
      {tooltip && (
        <div
          ref={tipRef}
          className="pointer-events-none fixed z-50 -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-xs whitespace-nowrap text-white dark:bg-zinc-100 dark:text-black"
          style={{
            left: placement ? placement.left : tooltip.cx,
            top: placement ? placement.top : tooltip.top,
            visibility: placement ? "visible" : "hidden",
          }}
        >
          {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""} on{" "}
          {format(new Date(tooltip.date + "T12:00:00"), "dd.MM.yyyy")}
          <span
            className={`absolute border-4 border-transparent ${
              placement?.below
                ? "bottom-full border-b-zinc-900 dark:border-b-zinc-100"
                : "top-full border-t-zinc-900 dark:border-t-zinc-100"
            }`}
            style={{ left: `calc(50% + ${placement?.arrow ?? 0}px)`, transform: "translateX(-50%)" }}
          />
        </div>
      )}

      {/* Scrollable area: months + grid scroll together */}
      <div className="overflow-x-auto">
        {/* Month labels — each sits above one week column, text overflows right into empty neighbours */}
        <div className="mb-2 flex gap-0.75">
          {weeks.map((_, i) => (
            <div key={i} className="relative h-4 w-4 shrink-0">
              {months[i] && (
                <span className="absolute left-0 top-0 whitespace-nowrap text-xs text-zinc-500">
                  {months[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="relative flex gap-0.75" onMouseLeave={() => setTooltip(null)}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`h-4 w-4 shrink-0 cursor-default ${level(day.count)}`}
                  onMouseEnter={(e) => {
                    const cell = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      date: day.date,
                      count: day.count,
                      cx: cell.left + cell.width / 2,
                      top: cell.top,
                      bottom: cell.bottom,
                    });
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer — outside scroll area so it always spans the full padded width */}
      <div className="mt-2 flex flex-col gap-2 text-sm text-zinc-600 sm:flex-row sm:items-center sm:gap-4 dark:text-zinc-400">
        <p className="flex-1">
          {total.toLocaleString()} contributions in the last year on{" "}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            GitHub
          </a>
          .
        </p>

        <div className="flex items-center gap-2 text-xs">
          <span>Less</span>
          <div className="flex gap-0.75">
            {LEVELS.map((swatch) => (
              <div key={swatch} className={`h-3 w-3 ${swatch}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
