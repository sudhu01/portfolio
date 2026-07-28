"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { BriefcaseBusiness, ChevronDown, Rocket, Sparkles } from "lucide-react";
import { differenceInMonths, parse } from "date-fns";
import { cn } from "@/lib/utils";
import piramalLogo from "@/public/piramal_logo.svg";
import drTechnologiesLogo from "@/public/drtechnologies_logo.svg";

type ExperiencePosition = {
  id: string;
  title: string;
  /** Defaults to a briefcase when the role has nothing more specific. */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
  location: string;
  /** e.g. On-site / Hybrid / Remote — rendered in brackets after the location. */
  locationType?: string;
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
    location: "Bangalore, India",
    logo: piramalLogo,
    invertLogoOnLight: true,
    positions: [
      {
        id: "piramal-finance-1",
        title: "AI Intern",
        icon: Sparkles,
        startDate: "05.2026",
        endDate: "07.2026",
        description:
          "Helped develop and scale an internal JS-based MS Excel replacement tool with a built-in AI assistant.",
        bulletPoints: [
          "Built a Node/TypeScript workbook-ingestion service for Akriti that streamed and parsed Excel files > 500 MB with a WASM parser",
          "Implemented the query layer for Akriti's Gemini-based spreadsheet agent by translating validated user requests into Mongo aggregation pipelines",
        ],
        skills: [
          "TypeScript",
          "JavaScript",
          "React",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Gemini",
        ],
      },
    ],
  },
  {
    id: "dheerajreddy-technologies",
    companyName: "DheerajReddy Technologies Pvt Ltd",
    companyWebsite: "https://www.dheerajreddytechnologies.com/",
    location: "Chennai, India",
    logo: drTechnologiesLogo,
    isCurrentEmployer: true,
    positions: [
      {
        id: "dheerajreddy-technologies-1",
        title: "Co-Founder & Lead Engineer",
        icon: Rocket,
        startDate: "12.2025",
        description:
          "Pretty much built the company's flagship product, Aspirenet all by myself.",
        bulletPoints: [
          "Developed Aspirenet's frontend, backend and database architecture from scratch (with Claude's help of course).",
          "Scaled Aspirenet to serve the 5k+ users it currently has, with a 99.9% uptime",
          "Built all of the AI features in Aspirenet, including the matchmaking system, AI strategy assistant and automated profile building.",
        ],
        skills: [
          "TypeScript",
          "Python",
          "Node.js",
          "Express.js",
          "FastAPI",
          "PostgreSQL",
          "Prisma",
          "Docker",
          "AWS",
          "Claude",
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
  const PositionIcon = position.icon ?? BriefcaseBusiness;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          // `relative` also lifts the row above the rail, so the icon chip
          // below masks the rule instead of being drawn over by it
          "relative block w-full text-left",
          // Hover plate starts past the rail, so the rule stays visible. It is
          // flush with the row's top so the rail's crop can't clip it.
          "before:absolute before:top-0 before:-bottom-1.5 before:right-0 before:left-7 before:-z-1 before:rounded-lg before:transition-colors",
          "hover:before:bg-zinc-200/40 dark:hover:before:bg-zinc-900/50",
        )}
      >
        <div className="mb-1 flex items-start gap-3">
          {/* Opaque chip — masks the rail running behind it */}
          <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <PositionIcon className="size-3.5" aria-hidden="true" />
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
        </div>
      </div>

      {/* Skills stay visible whether or not the role is expanded. The rail that
          drops from the company logo lives here too, so its elbow is pinned to
          the tag row by layout rather than by a guessed offset. */}
      {position.skills && position.skills.length > 0 && (
        <div className="flex items-start gap-2 pt-3">
          {/* Rail + elbow. It is stretched far past the top of the list and
              clipped by the positions container, which is how it reaches up
              behind the role icon to the company logo. The 11px is half a tag
              chip, so the elbow lands on the first row's centre line. */}
          <span
            className="pointer-events-none -mt-[9999px] ml-3 h-[calc(9999px+11px)] w-4 shrink-0 rounded-bl-sm border-b border-l border-(--pattern)"
            aria-hidden
          />

          <ul className="flex flex-wrap gap-1.5">
            {position.skills.map((skill) => (
              <li key={skill} className="flex">
                <span className="inline-flex items-center rounded-md border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground dark:bg-zinc-900">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
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
      <div className="flex items-start gap-3 sm:items-center">
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

        {/* Name left, location right — they stack on narrow screens */}
        <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pr-1 sm:flex-row sm:items-baseline sm:justify-between">
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

          <dl className="flex min-w-0 items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
            <dt className="sr-only">Location</dt>
            <dd className="truncate">{experience.location}</dd>

            {experience.locationType && (
              <>
                <dt className="sr-only">Location type</dt>
                <dd>({experience.locationType})</dd>
              </>
            )}

            {experience.isCurrentEmployer && (
              <>
                <dt className="sr-only">Employment status</dt>
                <dd>
                  <span className="sr-only">Current</span>
                  <span className="relative flex size-2.5 translate-y-px items-center justify-center">
                    <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-emerald-500 opacity-50" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                </dd>
              </>
            )}
          </dl>
        </div>
      </div>

      {/* Positions. `overflow-hidden` crops each role's rail (see below) at this
          box's top edge, which is the first role's icon — so the rail only ever
          shows below an icon, never poking out above one. */}
      <div className="mt-4 space-y-5 overflow-hidden">
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
