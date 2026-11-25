import { describe, expect, it, vi } from "vitest";
import { createPageMetadata } from "@/lib/seo";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/lib/seo/structured-data";

describe("SEO helpers", () => {
  it("creates canonical, Open Graph and Twitter metadata for a route", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://school.example");
    const metadata = createPageMetadata({
      title: "Admissions",
      description: "Admission information.",
      path: "/admissions",
      image: "https://school.example/cover.jpg",
    });

    expect(metadata.alternates?.canonical).toBe("/admissions");
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      title: "Admissions",
      description: "Admission information.",
      url: "/admissions",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Admissions",
    });
  });

  it("builds breadcrumb structured data without inventing contact details", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://school.example");
    const data = breadcrumbJsonLd([
      { label: "Blog", href: "/blog" },
      { label: "Example article" },
    ]);
    const items = data.itemListElement as Array<Record<string, unknown>>;

    expect(data["@type"]).toBe("BreadcrumbList");
    expect(items[0]).toMatchObject({
      position: 1,
      name: "Home",
      item: "https://school.example",
    });
    expect(items[1]).toMatchObject({
      position: 2,
      name: "Blog",
      item: "https://school.example/blog",
    });
    expect(items[2]).toMatchObject({ position: 3, name: "Example article" });
    expect(items[2]).not.toHaveProperty("item");
    expect(JSON.stringify(data)).not.toContain("address");
  });

  it("creates Article structured data only from available fields", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://school.example");
    const data = articleJsonLd({
      title: "School news",
      description: "A published story.",
      path: "/blog/school-news",
      publishedAt: "2026-01-15",
    });

    expect(data).toMatchObject({
      "@type": "Article",
      headline: "School news",
      mainEntityOfPage: "https://school.example/blog/school-news",
      datePublished: "2026-01-15",
    });
    expect(data).not.toHaveProperty("image");
    expect(data).not.toHaveProperty("author");
  });

  it("uses clearly labelled fictional details in School data", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://school.example");
    const data = organizationJsonLd();

    expect(data).toMatchObject({
      "@type": "School",
      name: "Aurelia Academy",
      url: "https://school.example",
      email: "admissions@aureliaacademy.example",
      telephone: "+1 (555) 014-2180",
      foundingDate: "2008",
    });
    expect(String(data.description)).toContain("fictional demonstration");
    expect(data.address).toMatchObject({
      "@type": "PostalAddress",
      streetAddress: "12 Meridian Lane",
      addressLocality: "Riverton",
    });
    expect(data.sameAs).toEqual([
      "https://example.com/aurelia-academy/instagram",
      "https://example.com/aurelia-academy/linkedin",
    ]);
  });
});
