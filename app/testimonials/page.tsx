import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import SiteHeader from "@/components/siteHeader";
import Testimonials from "@/components/testimonials";
import FullBleed from "@/components/fullBleed";

export const metadata: Metadata = {
  title: "Testimonials - Sudharsan Balajee",
  description:
    "What teammates, collaborators and clients say about working with Sudharsan Balajee.",
};

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative w-full overflow-x-hidden bg-gray-100 dark:bg-neutral-950">
          {/* Centered frame container — natural height drives the side rails */}
          <div className="relative mx-auto w-full max-w-7xl">

            {/* Left & right vertical side rails (decorative diagonal pattern) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-6 border-x border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:w-10 md:bg-size-[10px_10px]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-6 border-x border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:w-10 md:bg-size-[10px_10px]" />

            {/* Content column — padding clears the side rails */}
            <div className="relative z-10 flex min-h-[calc(100vh-var(--header-height))] flex-col px-10 md:px-16">

              {/* Top diagonal stripe band */}
              <FullBleed className="h-6 border-b border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:h-10 md:bg-size-[10px_10px]" />

              <div className="py-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-zinc-500 transition-colors hover:text-black dark:hover:text-white"
                >
                  <ArrowLeft className="size-3.5" aria-hidden />
                  Back
                </Link>
              </div>

              <FullBleed className="border-b border-(--pattern)">
                <div className="mx-auto max-w-7xl px-10 py-2 md:px-16">
                  <h1
                    id="testimonials"
                    data-section
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    Testimonials
                  </h1>
                </div>
              </FullBleed>

              <p className="max-w-5xl py-6 text-sm text-zinc-700 dark:text-zinc-300">
              Kind words from people I&apos;ve built things with.
              </p>

              <div className="flex-1 pb-6">
                <Testimonials />
              </div>

              {/* Closing diagonal band */}
              <FullBleed className="mb-6 h-6 border-y border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:h-10 md:bg-size-[10px_10px]" />

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
