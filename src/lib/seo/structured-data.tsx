import { getSiteUrl, siteConfig } from "@/content/site";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  const { addressParts } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: getSiteUrl(),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: siteConfig.established,
    address: {
      "@type": "PostalAddress",
      ...addressParts,
    },
    sameAs: siteConfig.socialLinks.map((link) => link.href),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admissions",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      availableLanguage: ["English"],
    },
  };
}

export function breadcrumbJsonLd(
  items: readonly { label: string; href?: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getSiteUrl() },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `${getSiteUrl()}${item.href}` } : {}),
      })),
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  image,
  publishedAt,
  authorName,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedAt?: string;
  authorName?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: `${getSiteUrl()}${path}`,
    ...(image ? { image } : {}),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
  };
}

export function JsonLd({ data }: { data: JsonLd }) {
  // Structured data is generated from controlled content, never user input.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
