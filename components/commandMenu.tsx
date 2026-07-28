"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Command } from "cmdk";
import { Dialog, VisuallyHidden } from "radix-ui";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Box,
  BriefcaseBusiness,
  Copy,
  CornerDownLeft,
  GraduationCap,
  Layers,
  Mail,
  Monitor,
  Moon,
  Phone,
  Search,
  Sparkles,
  Sun,
  TextCursorInput,
  User,
} from "lucide-react";

import {
  CONTACT,
  EXTERNAL_LINKS,
  SECTION_NAV,
  SOCIAL_LINKS,
} from "@/lib/siteConfig";
import { SocialIcon } from "@/components/socialLinks";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/lib/useIsClient";

const SECTION_ICONS: Record<string, React.ReactNode> = {
  "#hello": <TextCursorInput />,
  "#about": <User />,
  "#stack": <Layers />,
  "#contributions": <Sparkles />,
  "#education": <GraduationCap />,
  "#experience": <BriefcaseBusiness />,
  "#projects": <Box />,
};

const itemClass = cn(
  "flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-700 outline-none",
  "data-[selected=true]:bg-zinc-200/70 data-[selected=true]:text-black",
  "dark:text-zinc-300 dark:data-[selected=true]:bg-neutral-800 dark:data-[selected=true]:text-white",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-zinc-500 dark:[&_svg]:text-zinc-400"
);

const groupClass = cn(
  "overflow-hidden p-1.5",
  "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-1 [&_[cmdk-group-heading]]:pb-2",
  "[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:uppercase",
  "[&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-zinc-500",
  "dark:[&_[cmdk-group-heading]]:text-zinc-500"
);

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { setTheme } = useTheme();

  const isClient = useIsClient();
  const isMac = isClient && /Mac|iPhone|iPad/.test(navigator.userAgent);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isTypingTarget =
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName));

      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !isTypingTarget) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const goToSection = useCallback((href: string) => {
    setOpen(false);
    const el = document.getElementById(href.slice(1));
    // Sections only exist on the home page — from anywhere else, navigate there
    if (!el) {
      window.location.href = `/${href}`;
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  }, []);

  const openExternal = useCallback((href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => {
        setCopied(null);
        setOpen(false);
      }, 900);
    } catch {
      setOpen(false);
    }
  }, []);

  const applyTheme = useCallback(
    (next: string) => {
      setTheme(next);
      setOpen(false);
    },
    [setTheme]
  );

  return (
    <>
      {/* Desktop: inline chip in the header */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex h-7 shrink-0 items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-200 px-2 text-zinc-700 ring-1 ring-zinc-300 transition-colors hover:bg-zinc-300 max-sm:hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-zinc-300 dark:ring-neutral-700 dark:hover:bg-neutral-800"
      >
        <Search className="size-4" aria-hidden />
        <span className="font-mono text-xs">Search</span>
        <kbd className="inline-flex items-center gap-0.5 rounded border border-zinc-300 bg-white px-1 font-mono text-[0.65rem] text-zinc-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-zinc-400">
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
      </button>

      {/* Mobile: floating pill docked above the safe area.
          Portalled to <body> because the header's backdrop-blur would otherwise
          become the containing block for this fixed element. */}
      {isClient &&
        createPortal(
          <div className="fixed bottom-[calc(0.5rem+env(safe-area-inset-bottom,0px))] left-1/2 z-50 w-fit -translate-x-1/2 rounded-xl border border-zinc-200 bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:hidden dark:border-neutral-800 dark:bg-neutral-900/90 dark:ring-white/10">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex min-w-28 items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              <Search className="size-4 shrink-0" aria-hidden />
              Search…
            </button>
          </div>,
          document.body
        )}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-100 bg-black/40 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />

          <Dialog.Content
            className={cn(
              "fixed top-1/2 left-1/2 z-100 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
              // On mobile, dock near the top so the on-screen keyboard doesn't cover it
              "max-sm:top-16 max-sm:translate-y-0",
              "overflow-hidden rounded-xl border border-(--pattern) bg-gray-100 shadow-2xl dark:bg-neutral-950",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95",
              "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95"
            )}
          >
            <VisuallyHidden.Root>
              <Dialog.Title>Search</Dialog.Title>
              <Dialog.Description>
                Search sections, links and settings on this site.
              </Dialog.Description>
            </VisuallyHidden.Root>

            <Command
              loop
              className="text-black dark:text-white"
              filter={(value, search, keywords) => {
                const haystack = `${value} ${keywords?.join(" ") ?? ""}`.toLowerCase();
                return haystack.includes(search.toLowerCase()) ? 1 : 0;
              }}
            >
              <div className="flex items-center gap-2.5 border-b border-(--pattern) px-4">
                <Search
                  className="size-4 shrink-0 text-zinc-500"
                  aria-hidden
                />
                <Command.Input
                  autoFocus
                  placeholder="Search sections, links, theme…"
                  // text-base on mobile stops iOS from zooming in on focus
                  className="h-12 w-full bg-transparent text-base outline-none placeholder:text-zinc-500 md:text-sm"
                />
              </div>

              <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain">
                <Command.Empty className="px-4 py-10 text-center font-mono text-xs text-zinc-500">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Sections" className={groupClass}>
                  {SECTION_NAV.map((item) => (
                    <Command.Item
                      key={item.href}
                      value={`section ${item.title}`}
                      keywords={["section", "go to", item.href]}
                      onSelect={() => goToSection(item.href)}
                      className={itemClass}
                    >
                      {SECTION_ICONS[item.href]}
                      <span className="line-clamp-1">{item.title}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Separator />

                <Command.Group heading="Links" className={groupClass}>
                  {EXTERNAL_LINKS.map((item) => (
                    <Command.Item
                      key={item.href}
                      value={`link ${item.title}`}
                      keywords={["open", "website", "external"]}
                      onSelect={() => openExternal(item.href)}
                      className={itemClass}
                    >
                      <ArrowUpRight />
                      <span className="line-clamp-1">{item.title}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Separator />

                <Command.Group heading="Social" className={groupClass}>
                  {SOCIAL_LINKS.map((link) => (
                    <Command.Item
                      key={link.name}
                      value={`social ${link.title}`}
                      keywords={["social", "profile", link.name]}
                      onSelect={() => openExternal(link.href)}
                      className={itemClass}
                    >
                      <SocialIcon name={link.name} />
                      <span className="line-clamp-1">{link.title}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Separator />

                <Command.Group heading="Contact" className={groupClass}>
                  <Command.Item
                    value="copy email address"
                    keywords={["mail", CONTACT.email]}
                    onSelect={() => copy(CONTACT.email, "email")}
                    className={itemClass}
                  >
                    <Mail />
                    <span className="line-clamp-1">
                      {copied === "email" ? "Copied!" : "Copy email address"}
                    </span>
                    <Copy className="ml-auto opacity-60" />
                  </Command.Item>
                  <Command.Item
                    value="copy phone number"
                    keywords={["mobile", CONTACT.phone]}
                    onSelect={() => copy(CONTACT.phone, "phone")}
                    className={itemClass}
                  >
                    <Phone />
                    <span className="line-clamp-1">
                      {copied === "phone" ? "Copied!" : "Copy phone number"}
                    </span>
                    <Copy className="ml-auto opacity-60" />
                  </Command.Item>
                </Command.Group>

                <Separator />

                <Command.Group heading="Theme" className={groupClass}>
                  <Command.Item
                    value="theme light"
                    keywords={["theme", "appearance", "mode"]}
                    onSelect={() => applyTheme("light")}
                    className={itemClass}
                  >
                    <Sun />
                    Light
                  </Command.Item>
                  <Command.Item
                    value="theme dark"
                    keywords={["theme", "appearance", "mode"]}
                    onSelect={() => applyTheme("dark")}
                    className={itemClass}
                  >
                    <Moon />
                    Dark
                  </Command.Item>
                  <Command.Item
                    value="theme system"
                    keywords={["theme", "appearance", "mode", "auto"]}
                    onSelect={() => applyTheme("system")}
                    className={itemClass}
                  >
                    <Monitor />
                    System
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between border-t border-(--pattern) px-4 py-2 font-mono text-[0.65rem] text-zinc-500">
                <span className="tracking-widest uppercase">Sudharsan</span>
                <span className="flex items-center gap-1.5">
                  Select
                  <kbd className="inline-flex items-center rounded border border-zinc-300 bg-white px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-900">
                    <CornerDownLeft className="size-3" aria-hidden />
                  </kbd>
                </span>
              </div>
            </Command>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

/** cmdk hides separators automatically while a search is active. */
function Separator() {
  return (
    <Command.Separator className="mx-1.5 border-t border-(--pattern)" />
  );
}
