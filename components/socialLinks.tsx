import type { SocialName } from "@/lib/siteConfig";
import { SOCIAL_LINKS } from "@/lib/siteConfig";
import { GithubLight } from "@/components/ui/svgs/githubLight";
import { GithubDark } from "@/components/ui/svgs/githubDark";
import { X } from "@/components/ui/svgs/x";
import { XDark } from "@/components/ui/svgs/xDark";
import { HuggingFace } from "@/components/ui/svgs/huggingFace";
import { Linkedin } from "@/components/ui/svgs/linkedin";
import { cn } from "@/lib/utils";

/**
 * GitHub and X ship hard-coded fills, so each renders a light/dark pair and
 * lets the theme class pick one. LinkedIn and Hugging Face are brand-coloured
 * and read correctly on both backgrounds.
 */
export function SocialIcon({
  name,
  className,
}: {
  name: SocialName;
  className?: string;
}) {
  const size = cn("h-4 w-4", className);

  switch (name) {
    case "github":
      return (
        <>
          <GithubLight className={cn(size, "dark:hidden")} aria-hidden />
          <GithubDark className={cn(size, "hidden dark:block")} aria-hidden />
        </>
      );
    case "x":
      return (
        <>
          <X className={cn(size, "dark:hidden")} aria-hidden />
          <XDark className={cn(size, "hidden dark:block")} aria-hidden />
        </>
      );
    case "linkedin":
      return <Linkedin className={size} aria-hidden />;
    case "huggingface":
      return <HuggingFace className={size} aria-hidden />;
  }
}

export default function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-2">
      {SOCIAL_LINKS.map((link) => (
        <li key={link.name} className="flex">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.title}
            title={link.title}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 bg-white transition-colors hover:bg-zinc-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <SocialIcon name={link.name} className="h-4.5 w-4.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
