import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/site";
import { fetchPublished } from "@/sanity/lib/client";
import { blogListQuery } from "@/sanity/lib/queries";
import type { SanityBlogCard } from "@/lib/types/sanity";

const staticRoutes = [
  "",
  "/about",
  "/academics",
  "/achievements",
  "/campus-life",
  "/gallery",
  "/admissions",
  "/contact",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl();
  const base = staticRoutes.map((route) => ({
    url: `${origin}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const posts = await fetchPublished<SanityBlogCard[]>(blogListQuery);
  if (!posts) return base;

  return [
    ...base,
    ...posts.map((post) => ({
      url: `${origin}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
