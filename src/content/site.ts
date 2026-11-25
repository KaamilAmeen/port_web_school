/**
 * School identity and shared contact details.
 */

export const siteConfig = {
  name: "Aurelia Academy",
  shortName: "Aurelia",
  tagline: "Where curiosity becomes character.",
  identityStatus: "INDEPENDENT SCHOOL · EST. 2008",
  description:
    "Aurelia Academy is an independent learning community offering a thoughtful academic programme, rich campus life and a warm, close-knit school experience.",
  email: "admissions@aureliaacademy.org",
  phone: "+1 (415) 204-0180",
  address: "12 Meridian Lane, Riverton, CA 94025",
  addressParts: {
    streetAddress: "12 Meridian Lane",
    addressLocality: "Riverton",
    addressRegion: "CA",
    postalCode: "94025",
    addressCountry: "US",
  },
  mapEmbedUrl: null as string | null,
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/aureliaacademy/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/school/aurelia-academy/" },
  ] as ReadonlyArray<{ label: string; href: string }>,
  established: "2008",
  academicYear: "2026–2027",
} as const;

export const siteLogo = {
  src: "/images/generated/School%20Port%20Education%20Emblem.png",
  alt: "School Port Education Emblem",
  width: 1536,
  height: 1024,
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
