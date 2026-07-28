"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV } from "@/lib/siteConfig";
import CommandMenu from "@/components/commandMenu";
import ThemeToggle from "@/components/themeToggle";
import { cn } from "@/lib/utils";

// Hoisted so the effect below keeps a stable dependency across renders.
// Only in-page anchors can be observed; route and external links are skipped.
const NAV_HREFS = MAIN_NAV.filter((item) => item.href.startsWith("#")).map(
  (item) => item.href
);

const navLinkClass = cn(
  "font-mono text-xs tracking-wide text-zinc-500 transition-colors hover:text-black",
  "aria-[current=page]:text-black dark:hover:text-white dark:aria-[current=page]:text-white"
);

/** Highlights the nav item whose section is currently in view. */
function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = hrefs
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) setActive(`#${visible.target.id}`);
      },
      // Only the band just below the header counts as "in view"
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hrefs]);

  return active;
}

export default function SiteHeader() {
  const active = useActiveSection(NAV_HREFS);
  const pathname = usePathname();

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-(--pattern) bg-gray-100/85 backdrop-blur-md dark:bg-neutral-950/85">
      <div className="mx-auto flex h-(--header-height) max-w-7xl items-center gap-3 px-10 sm:gap-4 md:px-16">
        <div className="flex-1" />

        {/* Section nav */}
        <nav className="flex items-center gap-3 sm:gap-5">
          {MAIN_NAV.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkClass}
                >
                  {item.title}
                </a>
              );
            }

            if (item.href.startsWith("#")) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={active === item.href ? "page" : undefined}
                  className={navLinkClass}
                >
                  {item.title}
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={navLinkClass}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <span
          className="h-5 w-px shrink-0 bg-(--pattern) max-sm:hidden"
          aria-hidden
        />

        <div className="flex shrink-0 items-center gap-2">
          <CommandMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
