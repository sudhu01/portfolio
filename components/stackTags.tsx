import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Typescript } from "./ui/svgs/typescript";
import {Javascript} from "./ui/svgs/javascript";
import {Python} from "./ui/svgs/python";
import {Fastapi} from "./ui/svgs/fastapi";
import {ReactLight} from "./ui/svgs/reactLight";
import {ReactDark} from "./ui/svgs/reactDark";
import {NextjsLogoLight} from "./ui/svgs/nextjsLogoLight";
import {NextjsLogoDark} from "./ui/svgs/nextjsLogoDark";
import {Tailwindcss} from "./ui/svgs/tailwindcss";
import {Nodejs} from "./ui/svgs/nodejs";
import { Expressjs } from "./ui/svgs/expressjs";
import { ExpressjsDark } from "./ui/svgs/expressjsDark";
import {Postgresql} from "./ui/svgs/postgresql";
import { Prisma } from "./ui/svgs/prisma";
import { PrismaDark } from "./ui/svgs/prismaDark";
import {MongodbIconLight} from "./ui/svgs/mongodbIconLight";
import {MongodbIconDark} from "./ui/svgs/mongodbIconDark";
import {Docker} from "./ui/svgs/docker";
import {Git} from "./ui/svgs/git";
import {AwsLight} from "./ui/svgs/awsLight";
import {AwsDark} from "./ui/svgs/awsDark";
import { ClaudeAiIcon } from "./ui/svgs/claudeAiIcon";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type StackItem = {
  name: string;
  href: string;
  icon: IconComponent;
  /** Used instead of `icon` in dark mode, for logos with hard-coded dark fills. */
  iconDark?: IconComponent;
};

type StackCategory = {
  title: string;
  items: StackItem[];
};

const STACK: StackCategory[] = [
  {
    title: "Language",
    items: [
      { name: "TypeScript", href: "https://www.typescriptlang.org/", icon: Typescript },
      { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: Javascript },
      { name: "Python", href: "https://www.python.org/", icon: Python },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", href: "https://react.dev/", icon: ReactLight, iconDark: ReactDark },
      { name: "Next.js", href: "https://nextjs.org/", icon: NextjsLogoLight, iconDark: NextjsLogoDark },
      { name: "Tailwind CSS", href: "https://tailwindcss.com/", icon: Tailwindcss },
    ],
  },
  {
    title: "Backend & Database",
    items: [
      { name: "Node.js", href: "https://nodejs.org/", icon: Nodejs },
      { name: "Express.js", href: "https://expressjs.com/", icon: Expressjs, iconDark: ExpressjsDark },
      { name: "FastAPI", href: "https://fastapi.tiangolo.com/", icon: Fastapi },
      { name: "PostgreSQL", href: "https://www.postgresql.org/", icon: Postgresql },
      { name: "MongoDB", href: "https://www.mongodb.com/", icon: MongodbIconLight, iconDark: MongodbIconDark },
      { name: "Prisma", href: "https://www.prisma.io/", icon: Prisma, iconDark: PrismaDark },
    ],
  },
  {
    title: "Workflow & AI",
    items: [
      { name: "Docker", href: "https://www.docker.com/", icon: Docker },
      { name: "Git", href: "https://git-scm.com/", icon: Git },
      { name: "AWS", href: "https://aws.amazon.com/", icon: AwsLight, iconDark: AwsDark },
      { name: "Claude", href: "https://www.claude.com/", icon: ClaudeAiIcon },
    ],
  },
];

function StackIcon({ item }: { item: StackItem }) {
  const { icon: Icon, iconDark: IconDark } = item;
  const size = "size-3.5 shrink-0";

  if (!IconDark) return <Icon className={size} aria-hidden="true" />;

  return (
    <>
      <Icon className={cn(size, "dark:hidden")} aria-hidden="true" />
      <IconDark className={cn(size, "hidden dark:block")} aria-hidden="true" />
    </>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function StackTags() {
  return (
    <div className="relative [--col-left-width:12rem]">
      {/* Dashed rule down the column boundary, echoing the page's hairline motif */}
      <div
        className="pointer-events-none absolute inset-y-0 left-(--col-left-width) w-px bg-[linear-gradient(to_bottom,var(--pattern)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden"
        aria-hidden
      />

      {STACK.map((category, index) => {
        const labelId = `stack-${slugify(category.title)}`;

        return (
          <div
            key={category.title}
            /* Negative margins push the row rule out to the side rails; the
               matching padding pulls the grid back into the content column. */
            className="-mx-4 grid items-start gap-y-2 border-b border-(--pattern) px-4 py-4 last:border-b-0 sm:grid-cols-[var(--col-left-width)_1fr] md:-mx-6 md:px-6"
          >
            <div
              id={labelId}
              className="pr-4 text-sm/6 text-zinc-600 dark:text-zinc-400"
            >
              <span
                className="mr-1.5 font-mono text-zinc-400 select-none dark:text-zinc-600"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {category.title}
            </div>

            <ul
              aria-labelledby={labelId}
              className="flex flex-wrap gap-1.5 sm:pl-4"
            >
              {category.items.map((item) => (
                <li key={item.name} className="flex">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-6 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2 font-mono text-xs text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <StackIcon item={item} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
