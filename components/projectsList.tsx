"use client";

import { useState } from "react";
import { Link, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import fashionLogo from "@/public/Fashion For Everyone Logo.png";
import streamlineLogo from "@/public/Streamline Logo.png";
import matchPredictorLogo from "@/public/match predictor logo.png";

type Project = {
  id: string;
  name: string;
  logo: StaticImageData;
  startDate: string;
  endDate?: string;
  link: string;
  description: string;
  bulletPoints: string[];
  tags: string[];
};

const projects: Project[] = [
  {
    id: "fashion-for-everyone",
    name: "Fashion For Everyone",
    logo: fashionLogo,
    startDate: "01.2026",
    endDate: "04.2026",
    link: "https://github.com/sudhu01/Fashion-For-Everyone-V2",
    description:
      "An AI-powered personal fashion stylist chatbot that provides high-quality personalized outfit recommendations based on user preferences and current fashion trends.",
    bulletPoints: [
      'Each chat (fitting) retains context, so follow-up prompts like "now in navy" inherit the prior garment/fit/fabric',
      "Every generation produces a front view (text-to-image) and a back view (chained image-to-image edit from the front), both sharing the same seed for visual consistency",
      "A sanitizer validates user input against the training vocabulary, rejects NSFW/out-of-distribution requests, extracts structured facets, and builds augmented prompts that the LoRA understands",
    ],
    tags: ["Python", "TypeScript", "Next.js", "PostgreSQL", "FastAPI", "Flux.2 - Klein 9B","YOLO", "PlayWright"],
  },
  {
    id: "streamline",
    name: "Streamline - A minimal workflow automation system",
    logo: streamlineLogo,
    startDate: "10.2025",
    endDate: "11.2025",
    link: "https://github.com/sudhu01/streamline-aws-project",
    description:
      "A minimal workflow automation system similar to n8n or Zapier, built with a focus on simplicity, developer experience, currently supporting integration with 8 popular services (looking to expand to 50+ soon)",
    bulletPoints: [
      "Simple UI/UX focused on ease of use and quick setup of automations",
      "Express middleware for auth, CORS and rate-limiting",
      "Real-time logs streaming the entire workflow with all its processes during its execution",
    ],
    tags: ["TypeScript","React","Node.js", "Express.js", "Tailwind CSS", "PostgreSQL", "Clerk"],
  },
  {
    id: "match-predictor",
    name: "Premier League Match Predictor",
    logo: matchPredictorLogo,
    startDate: "02.2025",
    endDate: "02.2025",
    link: "https://github.com/sudhu01/premier-league-match-predictor",
    description:
      "A random forest classifier that predicts the outcome of Premier League football matches with 60% accuracy, using historical match data and team statistics.",
    bulletPoints: [
      "Trained on a dataset of from Premier League matches of the past 5 seasons",
      "Includes custom features like team form, head-to-head records, and player injuries",
      "Automated data scraping that updates the dataset weekly with the latest matches and stats",
    ],
    tags: ["Python", "scikit-learn", "bs4"],
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

function ProjectItem({ project, defaultOpen = false }: { project: Project; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    /* The closing band supplies the final rule, so the last item drops its own */
    <div className="border-b border-border last:border-b-0">
      <div className="flex items-center hover:bg-zinc-200/40 dark:hover:bg-zinc-900/50 transition-colors">
        {/* Logo */}
        <div className="mx-4 flex size-6 shrink-0 select-none items-center justify-center">
          <Image
            src={project.logo}
            alt={project.name}
            width={24}
            height={24}
            className="size-6 rounded object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex-1 border-l border-dashed border-border">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center gap-2 p-4 pr-2 text-left"
          >
            {/* Title + period */}
            <div className="flex-1">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {project.name}
              </h3>
              <dl className="text-sm text-muted-foreground">
                <dt className="sr-only">Period</dt>
                <dd className="flex items-center gap-0.5">
                  <span>{project.startDate}</span>
                  <span className="font-mono">—</span>
                  {project.endDate ? (
                    <span>{project.endDate}</span>
                  ) : (
                    <InfinityIcon />
                  )}
                </dd>
              </dl>
            </div>

            {/* Link icon */}
            <a
              className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
              href={project.link}
              target="_blank"
              rel="noopener"
              aria-label="Open Project Link"
              onClick={(e) => e.stopPropagation()}
            >
              <Link className="pointer-events-none size-4" aria-hidden="true" />
            </a>

            {/* Expand chevron */}
            <div className="shrink-0 text-muted-foreground">
              <ChevronDown
                className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Expanded content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {/* The rule spans the full width; the inner offset carries the dashed
            gutter rule down from the header row (mx-4 + size-6 + mx-4 = 3.5rem). */}
        <div className="border-t border-border">
          <div className="ml-14 space-y-4 border-l border-dashed border-border p-4">
            {/* Description */}
            <div className="text-sm text-foreground/90 leading-relaxed">
              <p className="mb-3">{project.description}</p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                {project.bulletPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="flex">
                  <span className="inline-flex items-center rounded-md border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground dark:bg-zinc-900">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsList() {
  return (
    <div className="w-full">
      {projects.map((project, i) => (
        <ProjectItem key={project.id} project={project} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
