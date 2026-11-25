import { getSiteUrl, siteConfig } from "@/content/site";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: getSiteUrl(),
    description:
      "Illustrative placeholder school website demonstration. Verified school details must be supplied before launch.",
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
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function JsonLd({ data }: { data: JsonLd }) {
  // Structured data is generated from controlled content, never user input.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
