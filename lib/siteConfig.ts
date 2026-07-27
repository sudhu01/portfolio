export type NavItem = {
  title: string;
  href: string;
};

/** Items rendered in the sticky site header. */
export const MAIN_NAV: NavItem[] = [
  { title: "Projects", href: "#projects" },
];

/** Every in-page section, used to populate the command menu. */
export const SECTION_NAV: NavItem[] = [
  { title: "Hello", href: "#hello" },
  { title: "About", href: "#about" },
  { title: "Contributions", href: "#contributions" },
  { title: "Projects", href: "#projects" },
  { title: "Stack", href: "#stack" },
  { title: "Experience", href: "#experience" },
];

export type SocialName = "github" | "x" | "linkedin" | "huggingface";

export type SocialLink = {
  name: SocialName;
  title: string;
  href: string;
};

// TODO(sudharsan): confirm the X / LinkedIn / Hugging Face handles below —
// only the GitHub one is taken from existing code (githubContributions username).
export const SOCIAL_LINKS: SocialLink[] = [
  { name: "github", title: "GitHub", href: "https://github.com/sudhu01" },
  { name: "x", title: "X", href: "https://x.com/sudhu01" },
  {
    name: "linkedin",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/sudharsan-balajee",
  },
  {
    name: "huggingface",
    title: "Hugging Face",
    href: "https://huggingface.co/sudhu01",
  },
];

export const CONTACT = {
  email: "sudharsanbalajee01@gmail.com",
  phone: "+91 7358217800",
};

/** External links surfaced in the command menu. */
export const EXTERNAL_LINKS: NavItem[] = [
  { title: "Aspirenet", href: "https://www.aspirenet.app/" },
  {
    title: "DheerajReddy Technologies",
    href: "https://www.dheerajreddytechnologies.com/",
  },
  { title: "Piramal Finance", href: "https://www.piramalfinance.com/" },
];
