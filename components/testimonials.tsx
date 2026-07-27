import { Quote } from "lucide-react";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  href?: string;
};

// TODO(sudharsan): replace these placeholders with real quotes.
// Keep the shape identical — the section renders whatever is in this array,
// and hides itself entirely if the array is empty.
const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "Placeholder testimonial — swap this for a real quote about working together.",
    name: "Full Name",
    role: "Role @ Company",
  },
  {
    id: "placeholder-2",
    quote:
      "Placeholder testimonial — swap this for a real quote about working together.",
    name: "Full Name",
    role: "Role @ Company",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {testimonials.map((testimonial) => (
        <li
          key={testimonial.id}
          className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <Quote
            className="size-4 shrink-0 text-zinc-400 dark:text-zinc-600"
            aria-hidden
          />

          <blockquote className="flex-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {testimonial.quote}
          </blockquote>

          <figcaption className="flex items-center gap-3 border-t border-zinc-200 pt-3 dark:border-neutral-800">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-100 bg-zinc-200 font-mono text-[0.65rem] font-semibold text-zinc-700 ring-1 ring-zinc-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-zinc-300 dark:ring-neutral-700">
              {initials(testimonial.name)}
            </span>

            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-black dark:text-white">
                {testimonial.href ? (
                  <a
                    href={testimonial.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {testimonial.name}
                  </a>
                ) : (
                  testimonial.name
                )}
              </span>
              <span className="block truncate font-mono text-xs text-zinc-500">
                {testimonial.role}
              </span>
            </span>
          </figcaption>
        </li>
      ))}
    </ul>
  );
}
