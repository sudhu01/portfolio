"use client";

import { useState } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

type Education = {
  id: string;
  school: string;
  /** e.g. Bachelor's degree — omitted for schooling that doesn't award one. */
  degree?: string;
  fieldOfStudy?: string;
  /** MM.YYYY */
  startDate: string;
  /** MM.YYYY */
  endDate: string;
  description: string;
  bulletPoints: string[];
  skills?: string[];
};

// TODO(sudharsan): replace the placeholder copy below.
const EDUCATION: Education[] = [
  {
    id: "vit-chennai",
    school: "Vellore Institute of Technology, Chennai",
    degree: "Bachelor’s degree",
    fieldOfStudy: "CSE (with AI & ML)",
    startDate: "08.2023",
    endDate: "05.2027",
    description: "Currently in my final year of undergraduate studies in Computer Science.",
    bulletPoints: [
      "Maintaining a CGPA of 8.35/10 upto the 6th semester.",
      "Former web development member at CYSCOM VITC and member of Toastmasters (Oratio) VITC.",
      "Placeholder — awards, hackathons or papers go here",
    ],
    skills: [
      "Python",
      "C++",
      "Java",
      "DSA",
      "Systems Design",
      "DBMS",
      "AI",
      "Software Engineering",
    ],
  },
  {
    id: "psbb-nungambakkam",
    school: "Padma Seshadri Bala Bhavan, Nungambakkam",
    fieldOfStudy: "Computer Science",
    startDate: "07.2008",
    endDate: "05.2023",
    description: "Did my entire schooling at PSBB Nungambakkam, Chennai.",
    bulletPoints: [
      "Achieved 94% aggregate in my 12th CBSE board exams, with a 96% in mathematics.",
      "Achieved 90% aggregate in my 10th CBSE board exams.",
    ],
    skills: ["Python", "MySQL", "Information Technology"],
  },
];

/** Vertical rule between the meta fields, matching the page's hairline weight. */
function MetaDivider() {
  return <span aria-hidden className="h-3.5 w-px shrink-0 bg-(--pattern)" />;
}

function EducationItem({
  item,
  defaultOpen = false,
}: {
  item: Education;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    /* The closing band supplies the final rule, so the last item drops its own */
    <div className="border-b border-border px-4 py-5 last:border-b-0 md:px-6">
      {/* `overflow-hidden` crops the rail (see below) at this box's top edge,
          which is the school icon — so the rail only ever shows below the icon,
          never poking out above it. */}
      <div className="overflow-hidden">
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
              <GraduationCap className="size-3.5" aria-hidden="true" />
            </div>

            <h3 className="flex-1 text-base/6 font-medium text-balance md:text-lg/6">
              {item.school}
            </h3>

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
            <div>
              <dt className="sr-only">Study period</dt>
              <dd className="flex items-center gap-0.5 tabular-nums">
                <span>{item.startDate}</span>
                <span className="font-mono">—</span>
                <span>{item.endDate}</span>
              </dd>
            </div>

            {item.degree && (
              <>
                <MetaDivider />
                <div>
                  <dt className="sr-only">Degree</dt>
                  <dd>{item.degree}</dd>
                </div>
              </>
            )}

            {item.fieldOfStudy && (
              <>
                <MetaDivider />
                <div>
                  <dt className="sr-only">Field of study</dt>
                  <dd>{item.fieldOfStudy}</dd>
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
            <p>{item.description}</p>

            <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
              {item.bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills stay visible whether or not the entry is expanded. The rail
            that drops from the school icon lives here too, so its elbow is
            pinned to the tag row by layout rather than by a guessed offset. */}
        {item.skills && item.skills.length > 0 && (
          <div className="flex items-start gap-2 pt-3">
            {/* Rail + elbow. It is stretched far past the top of the entry and
                clipped by the container above, which is how it reaches up
                behind the icon chip. The 11px is half a tag chip, so the elbow
                lands on the first row's centre line. */}
            <span
              className="pointer-events-none -mt-[9999px] ml-3 h-[calc(9999px+11px)] w-4 shrink-0 rounded-bl-sm border-b border-l border-(--pattern)"
              aria-hidden
            />

            <ul className="flex flex-wrap gap-1.5">
              {item.skills.map((skill) => (
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
    </div>
  );
}

export default function EducationList() {
  return (
    <div className="w-full">
      {EDUCATION.map((item, i) => (
        <EducationItem key={item.id} item={item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
