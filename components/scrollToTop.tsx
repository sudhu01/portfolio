"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Appears once the Projects section scrolls up into view and stays visible
 * for everything below it.
 *
 * The trigger is measured against the viewport, not the document: Projects
 * sits near the end of the page, so a document-offset threshold would sit
 * below the maximum scroll position and could never be reached.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const projects = document.getElementById("projects");

      if (!projects) {
        // Fall back to a viewport's worth of scroll if the section is missing
        setVisible(window.scrollY >= window.innerHeight);
        return;
      }

      // Fires once the heading has risen past 60% of the viewport height
      setVisible(
        projects.getBoundingClientRect().top <= window.innerHeight * 0.6
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      title="Scroll to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-6 bottom-6 z-50 flex size-10 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-200/85 text-zinc-700 ring-1 ring-zinc-300 backdrop-blur-md transition-all duration-200 hover:bg-zinc-300 dark:border-neutral-800 dark:bg-neutral-900/85 dark:text-zinc-300 dark:ring-neutral-700 dark:hover:bg-neutral-800 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}
