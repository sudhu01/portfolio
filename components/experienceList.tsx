"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { BriefcaseBusiness, ChevronDown } from "lucide-react";
import { differenceInMonths, parse } from "date-fns";
import { cn } from "@/lib/utils";
import piramalLogo from "@/public/piramal_logo.svg";
import drTechnologiesLogo from "@/public/drtechnologies_logo.svg";

type ExperiencePosition = {
  id: string;
  title: string;
  employmentType?: string;
  /** MM.YYYY */
  startDate: string;
  /** MM.YYYY — omitted while the role is ongoing. */
  endDate?: string;
  description: string;
  bulletPoints: string[];
  skills?: string[];
};

type Experience = {
  id: string;
  companyName: string;
  companyWebsite: string;
  logo: StaticImageData;
  /** Monochrome white logo — flipped to black on light backgrounds. */
  invertLogoOnLight?: boolean;
  isCurrentEmployer?: boolean;
  positions: ExperiencePosition[];
};

// TODO(sudharsan): replace the placeholder role titles and copy below.
const EXPERIENCES: Experience[] = [
  {
    id: "piramal-finance",
    companyName: "Piramal Finance",
    companyWebsite: "https://www.piramalfinance.com/",
    logo: piramalLogo,
    invertLogoOnLight: true,
    positions: [
      {
        id: "piramal-finance-1",
        title: "Role title (placeholder)",
        startDate: "05.2026",
        endDate: "07.2026",
        description:
          "Placeholder — replace with a short summary of what you worked on at Piramal Finance.",
        bulletPoints: [
          "Placeholder bullet — the project or system you shipped.",
          "Placeholder bullet — the impact, scale or metric that mattered.",
          "Placeholder bullet — the stack and tooling you used day to day.",
        ],
      },
    ],
  },
  {
    id: "dheerajreddy-technologies",
    companyName: "DheerajReddy Technologies Pvt Ltd",
    companyWebsite: "https://www.dheerajreddytechnologies.com/",
    logo: drTechnologiesLogo,
    isCurrentEmployer: true,
    positions: [
      {
        id: "dheerajreddy-technologies-1",
        title: "Role title (placeholder)",
        startDate: "12.2025",
        description:
          "Placeholder — replace with a short summary of what you build at DheerajReddy Technologies.",
        bulletPoints: [
          "Placeholder bullet — the product or feature you own.",
          "Placeholder bullet — the impact, scale or metric that mattered.",
          "Placeholder bullet — the stack and tooling you used day to day.",
        ],
      },
    ],
  },
];

function InfinityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 translate-y-[0.5px]"
      aria-label="Present"
    >
      <path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8" />
    </svg>
  );
}

/** Vertical rule between the meta fields, matching the page's hairline weight. */
function MetaDivider() {
  return <span aria-hidden className="h-3.5 w-px shrink-0 bg-(--pattern)" />;
}

function formatDuration(startDate: string, endDate?: string) {
  const start = parse(startDate, "MM.yyyy", new Date());
  const end = endDate ? parse(endDate, "MM.yyyy", new Date()) : new Date();

  // +1 so both the first and last month are counted.
  const totalMonths = differenceInMonths(end, start) + 1;
  if (totalMonths <= 0) return "";
  if (totalMonths < 12) return `${totalMonths}m`;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return months === 0 ? `${years}y` : `${years}y ${months}m`;
}

function ExperiencePositionItem({
  position,
  defaultOpen = false,
}: {
  position: ExperiencePosition;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const duration = formatDuration(position.startDate, position.endDate);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          // `relative` also lifts the row above the dashed gutter, so the icon
          // chip below masks the rule instead of being drawn over by it
          "relative block w-full text-left",
          // Hover plate starts past the dashed gutter, so the rule stays visible
          "before:absolute before:-inset-y-1.5 before:right-0 before:left-7 before:-z-1 before:rounded-lg before:transition-colors",
          "hover:before:bg-zinc-200/40 dark:hover:before:bg-zinc-900/50",
        )}
      >
        <div className="mb-1 flex items-start gap-3">
          {/* Opaque chip — masks the dashed gutter running behind it */}
          <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <BriefcaseBusiness className="size-3.5" aria-hidden="true" />
          </div>

          <h4 className="flex-1 leading-6 font-medium text-balance">
            {position.title}
          </h4>

          <div className="shrink-0 text-muted-foreground">
            <ChevronDown
              className={cn(
                "size-4 translate-y-1 transition-transform duration-200",
                open && "rotate-180",
              )}
              aria-hidden="true"
            />
          </div>
        </div>

        <dl className="flex flex-wrap items-center gap-2 pl-9 text-sm text-muted-foreground">
          {position.employmentType && (
            <>
              <div>
                <dt className="sr-only">Employment type</dt>
                <dd>{position.employmentType}</dd>
              </div>
              <MetaDivider />
            </>
          )}

          <div>
            <dt className="sr-only">Employment period</dt>
            <dd className="flex items-center gap-0.5 tabular-nums">
              <span>{position.startDate}</span>
              <span className="font-mono">—</span>
              {position.endDate ? (
                <span>{position.endDate}</span>
              ) : (
                <InfinityIcon />
              )}
            </dd>
          </div>

          {duration && (
            <>
              <MetaDivider />
              <div>
                <dt className="sr-only">Duration</dt>
                <dd className="tabular-nums">{duration}</dd>
              </div>
            </>
          )}
        </dl>
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-4 pt-3 pl-9 text-sm leading-relaxed text-foreground/90">
          <p>{position.description}</p>

          <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
            {position.bulletPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          {position.skills && position.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {position.skills.map((skill) => (
                <li key={skill} className="flex">
                  <span className="inline-flex items-center rounded-md border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground dark:bg-zinc-900">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function ExperienceItem({
  experience,
  defaultOpen = false,
}: {
  experience: Experience;
  defaultOpen?: boolean;
}) {
  return (
    /* The closing band supplies the final rule, so the last item drops its own */
    <div className="border-b border-border px-4 py-5 last:border-b-0 md:px-6">
      {/* Company */}
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          <Image
            src={experience.logo}
            alt={`${experience.companyName} logo`}
            width={24}
            height={24}
            className={cn(
              "size-6 object-contain",
              experience.invertLogoOnLight && "invert dark:invert-0",
            )}
          />
        </div>

        <h3 className="text-lg/6 font-medium md:text-xl/6">
          <a
            href={experience.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {experience.companyName}
          </a>
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex size-2.5 shrink-0 items-center justify-center">
            <span className="sr-only">Current employer</span>
            <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-emerald-500 opacity-50" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
        )}
      </div>

      {/* Positions — the dashed gutter drops from the company logo's centre */}
      <div className="relative mt-4 space-y-5">
        <div
          className="pointer-events-none absolute inset-y-0 left-3 w-px bg-[linear-gradient(to_bottom,var(--pattern)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y"
          aria-hidden
        />

        {experience.positions.map((position, i) => (
          <ExperiencePositionItem
            key={position.id}
            position={position}
            defaultOpen={defaultOpen && i === 0}
          />
        ))}
      </div>
    </div>
  );
}

export default function ExperienceList() {
  return (
    <div className="w-full">
      {EXPERIENCES.map((experience, i) => (
        <ExperienceItem
          key={experience.id}
          experience={experience}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  );
}
