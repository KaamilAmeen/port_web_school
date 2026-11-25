/**
 * Fictional demonstration identity for the school website template.
 *
 * Every value below is invented for preview purposes. It is deliberately
 * labelled as demo content in the UI and must be replaced with verified
 * school information before the site is published as a real school website.
 */

export const siteConfig = {
  name: "Aurelia Academy",
  shortName: "Aurelia",
  tagline: "Where curiosity becomes character.",
  identityStatus: "FICTIONAL DEMO SCHOOL",
  notice:
    "Demonstration content: the school name, people, images, stories and contact details on this site are fictional and are shown for preview only.",
  description:
    "Aurelia Academy is a fictional demonstration school website showcasing an editorial academic experience, admissions information, campus life and published school stories.",
  email: "admissions@aureliaacademy.example",
  phone: "+1 (555) 014-2180",
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
    { label: "Instagram", href: "https://example.com/aurelia-academy/instagram" },
    { label: "LinkedIn", href: "https://example.com/aurelia-academy/linkedin" },
  ] as ReadonlyArray<{ label: string; href: string }>,
  established: "2008",
  academicYear: "2026–2027",
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
