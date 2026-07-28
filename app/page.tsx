
import ProfileFrame from "@/components/profileFrame";
import ProfileOverview from "@/components/profileOverview";
import StackTags from "@/components/stackTags";
import EducationList from "@/components/educationList";
import ExperienceList from "@/components/experienceList";
import ProjectsList from "@/components/projectsList";
import GithubContributions from "@/components/githubContributions";
import SiteHeader from "@/components/siteHeader";
import SocialLinks from "@/components/socialLinks";
import FullBleed from "@/components/fullBleed";

export default function Page() {

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
            <div className="relative z-10 px-10 md:px-16">

              {/* Top diagonal stripe band */}
              <FullBleed className="h-6 border-b border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:h-10 md:bg-size-[10px_10px]" />

              {/* Profile */}
              <div id="hello" data-section className="relative pt-6 md:pt-8">
                {/* Faint hairline texture fading down behind the profile */}
                <div className="pointer-events-none absolute -inset-x-4 top-2 h-10 bg-[repeating-linear-gradient(to_bottom,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_0.5rem)] mask-[linear-gradient(to_bottom,black_10%,transparent)] md:-inset-x-6 md:h-14" />
                <ProfileFrame />
              </div>

              {/* Divider */}
              <FullBleed className="mt-6 border-t border-(--pattern)" />

              {/* Contact overview */}
              <div className="py-6">
                <ProfileOverview />
              </div>

              {/* Faint hairline texture fading up */}
              <div className="pointer-events-none -mx-4 h-10 bg-[repeating-linear-gradient(to_bottom,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_0.5rem)] mask-[linear-gradient(to_top,black_10%,transparent)] md:-mx-6 md:h-14" />

              {/* About */}
              <FullBleed className="border-b border-(--pattern)">
                <div className="mx-auto max-w-7xl px-10 py-2 md:px-16">
                  <h2
                    id="about"
                    data-section
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    About
                  </h2>
                </div>
              </FullBleed>

              <div className="space-y-4 py-6 text-sm text-zinc-700 dark:text-zinc-300">
                <p className="max-w-5xl text-left">
                  <span className="text-black dark:text-white">&bull;</span> Pre-final year student at{" "}
                  <span className="font-bold">VIT Chennai</span> studying CSE with a specialization in AI and ML.
                </p>

                <p className="max-w-5xl text-left">
                  <span className="text-black dark:text-white">&bull;</span> Currently building{" "}
                  <a href="https://www.aspirenet.app/" target="_blank" rel="noopener noreferrer">
                    <span className="font-bold text-black hover:underline dark:text-white">Aspirenet</span>
                  </a>{" "}
                  - out on Google Play Store and App Store now!
                </p>

                <p className="max-w-5xl text-left">
                  <span className="text-black dark:text-white">&bull;</span> Love turning ideas into reality through thoughtfully crafted personal projects.
                </p>

                {/* Social links — sit directly under the about copy */}
                <FullBleed className="border-t border-(--pattern)" />
                <div className="pt-2">
                  <SocialLinks />
                </div>
              </div>

              {/* GitHub contributions */}
              <FullBleed className="border-t border-(--pattern)" />
              <div id="contributions" data-section className="py-2">
                <GithubContributions username="sudhu01" />
              </div>

              {/* Tech stack */}
              <FullBleed className="mt-6 h-6 border-y border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:h-10 md:bg-size-[10px_10px]" />
              <FullBleed className="border-b border-(--pattern)">
                <div className="mx-auto max-w-7xl px-10 py-2 md:px-16">
                  <h2
                    id="stack"
                    data-section
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    Stack
                  </h2>
                </div>
              </FullBleed>

              {/* Flush against the heading rule above and the band below, so the
                  table's own rules meet the section borders */}
              <StackTags />

              {/* Experience */}
              <FullBleed className="h-6 border-y border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:h-10 md:bg-size-[10px_10px]" />
              <FullBleed className="border-b border-(--pattern)">
                <div className="mx-auto max-w-7xl px-10 py-2 md:px-16">
                  <h2
                    id="experience"
                    data-section
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    Experience
                  </h2>
                </div>
              </FullBleed>

              {/* Flush against the heading rule above and the band below, so the
                  list's own rules meet the section borders */}
              <div className="-mx-4 md:-mx-6">
                <ExperienceList />
              </div>

              {/* Projects */}
              <FullBleed className="h-6 border-y border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:h-10 md:bg-size-[10px_10px]" />
              <FullBleed className="border-b border-(--pattern)">
                <div className="mx-auto max-w-7xl px-10 py-2 md:px-16">
                  <h2
                    id="projects"
                    data-section
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    Projects
                  </h2>
                </div>
              </FullBleed>

              {/* Flush against the heading rule above and the band below, so the
                  list's own rules meet the section borders */}
              <div className="-mx-4 md:-mx-6">
                <ProjectsList />
              </div>

              {/* Education */}
              <FullBleed className="h-6 border-y border-(--pattern) bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] md:h-10 md:bg-size-[10px_10px]" />
              <FullBleed className="border-b border-(--pattern)">
                <div className="mx-auto max-w-7xl px-10 py-2 md:px-16">
                  <h2
                    id="education"
                    data-section
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    Education
                  </h2>
                </div>
              </FullBleed>

              {/* Flush against the heading rule above and the band below, so the
                  list's own rules meet the section borders */}
              <div className="-mx-4 md:-mx-6">
                <EducationList />
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
