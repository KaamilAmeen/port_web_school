/**
 * Central placeholder configuration.
 *
 * EVERY value here is illustrative until the school supplies verified details.
 * Search for `PLACEHOLDER` in the codebase before launch and replace these values.
 */

export const siteConfig = {
  name: "Example Academy",
  shortName: "Example",
  tagline: "A place where curiosity becomes character.",
  identityStatus: "PLACEHOLDER SCHOOL IDENTITY" as const,
  notice:
    "Illustrative placeholder content. School name, history, imagery, contact details and achievements must be replaced with verified information before launch.",
  description:
    "An illustrative school website demonstrating an editorial academic experience, admissions information, campus life and published school stories.",
  email: "admissions@example.edu",
  phone: null as string | null,
  address: "Address to be supplied by the school",
  mapEmbedUrl: null as string | null,
  socialLinks: [] as ReadonlyArray<{ label: string; href: string }>,
  established: null as string | null,
  academicYear: "Academic year to be confirmed",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNavigation: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Achievements", href: "/achievements" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

export function getSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return "http://localhost:3000";
  return value.replace(/\/+$/, "");
}
