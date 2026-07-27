"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/lib/useIsClient";

const ORDER = ["system", "light", "dark"] as const;

const LABELS: Record<string, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

/**
 * Cycles system → light → dark. The icon always reflects the *stored*
 * preference (not the resolved one) so "system" stays visible as a state.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();

  const current = mounted && theme ? theme : "system";

  const cycle = () => {
    const i = ORDER.indexOf(current as (typeof ORDER)[number]);
    setTheme(ORDER[(i + 1) % ORDER.length]);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABELS[current]}. Click to switch.`}
      title={`Theme: ${LABELS[current]}`}
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-200 text-zinc-700 ring-1 ring-zinc-300 transition-colors hover:bg-zinc-300",
        "dark:border-neutral-800 dark:bg-neutral-900 dark:text-zinc-300 dark:ring-neutral-700 dark:hover:bg-neutral-800",
        className
      )}
    >
      {/* Render a stable placeholder until mounted to avoid a hydration mismatch */}
      {!mounted ? (
        <Monitor className="size-4 opacity-0" aria-hidden />
      ) : current === "light" ? (
        <Sun className="size-4" aria-hidden />
      ) : current === "dark" ? (
        <Moon className="size-4" aria-hidden />
      ) : (
        <Monitor className="size-4" aria-hidden />
      )}
    </button>
  );
}
