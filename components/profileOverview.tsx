import {
  CodeBracketIcon,
  LightBulbIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import type {
  ComponentType,
  ReactNode,
  SVGProps,
} from "react";

type ItemProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
};

const Item = ({ icon: Icon, children }: ItemProps) => (
  <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm">
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-200 ring-1 ring-zinc-300 dark:border-neutral-800 dark:bg-neutral-900 dark:ring-neutral-700">
      <Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
    </div>

    <p className="min-w-0 wrap-break-word text-zinc-700 dark:text-zinc-300">{children}</p>
  </div>
);

export default function ProfileOverview() {
  return (
    <section className="w-full space-y-3 text-black dark:text-white">
      {/* Top Rows */}
      
      <Item icon={LightBulbIcon}>
        Founder <span className="font-semibold text-black dark:text-white">
            <a href="https://www.dheerajreddytechnologies.com/" target="_blank" rel="noopener noreferrer">
              @ <span className="hover:underline">DheerajReddy Technologies</span>
            </a>
        </span>
      </Item>

      <Item icon={CodeBracketIcon}>
        Ex-AI Intern{" "}
        <span className="font-semibold text-black dark:text-white">
            <a href="https://www.piramalfinance.com/" target="_blank" rel="noopener noreferrer">
              @ <span className="hover:underline">Piramal Finance</span>
            </a>
        </span>
      </Item>

    
        <Item icon={MapPinIcon}>Chennai, India</Item>
        <Item icon={PhoneIcon}>+91 7358217800</Item>
    
      <Item icon={EnvelopeIcon}>sudharsanbalajee01@gmail.com</Item>
    </section>
  );
}