import { cache } from "react";
import {
  demoAchievements,
  demoBlogCards,
  demoBlogPosts,
  demoCategories,
  demoGalleryItems,
} from "@/content/demo";
import { fetchPublished } from "@/sanity/lib/client";
import {
  achievementListQuery,
  blogBySlugQuery,
  blogCategoriesQuery,
  blogListQuery,
  featuredAchievementsQuery,
  featuredBlogsQuery,
  featuredGalleryQuery,
  galleryListQuery,
  relatedBlogsQuery,
} from "@/sanity/lib/queries";
import type {
  SanityAchievement,
  SanityBlogCard,
  SanityBlogPost,
  SanityCategory,
  SanityGalleryItem,
} from "@/lib/types/sanity";

/**
 * Published Sanity content always wins. The fictional demo records appear only
 * when the CMS is unconfigured, unreachable or has no published content.
 */
function withDemo<T>(published: T[] | null, demo: readonly T[]): T[] {
  return published && published.length > 0 ? published : [...demo];
}

function featured<T extends { featured?: boolean }>(
  items: readonly T[],
  limit: number,
): T[] {
  return items.filter((item) => item.featured).slice(0, limit);
}

async function publishedArray<T>(
  query: string,
  tags: string[],
): Promise<T[] | null> {
  return fetchPublished<T[]>(query, {}, tags);
}

export async function getFeaturedAchievements(): Promise<SanityAchievement[]> {
  const items = await publishedArray<SanityAchievement>(
    featuredAchievementsQuery,
    ["achievement"],
  );
  return featured(withDemo(items, demoAchievements), 3);
}

export async function getAchievements(): Promise<SanityAchievement[]> {
  const items = await publishedArray<SanityAchievement>(achievementListQuery, [
    "achievement",
  ]);
  return withDemo(items, demoAchievements);
}

export async function getFeaturedGallery(): Promise<SanityGalleryItem[]> {
  const items = await publishedArray<SanityGalleryItem>(featuredGalleryQuery, [
    "gallery",
  ]);
  return featured(withDemo(items, demoGalleryItems), 6);
}

export async function getGallery(): Promise<SanityGalleryItem[]> {
  const items = await publishedArray<SanityGalleryItem>(galleryListQuery, [
    "gallery",
  ]);
  return withDemo(items, demoGalleryItems);
}

export async function getRecentPosts(): Promise<SanityBlogCard[]> {
  const items = await publishedArray<SanityBlogCard>(featuredBlogsQuery, [
    "blog",
  ]);
  return featured(withDemo(items, demoBlogCards), 3);
}

export async function getBlogPosts(): Promise<SanityBlogCard[]> {
  const items = await publishedArray<SanityBlogCard>(blogListQuery, ["blog"]);
  return withDemo(items, demoBlogCards);
}

export async function getBlogCategories(): Promise<SanityCategory[]> {
  const items = await publishedArray<SanityCategory>(blogCategoriesQuery, [
    "category",
  ]);
  return withDemo(items, demoCategories);
}

export const getPostBySlug = cache(
  async (slug: string): Promise<SanityBlogPost | null> => {
    const published = await fetchPublished<SanityBlogPost>(
      blogBySlugQuery,
      { slug },
      ["blog"],
    );
    if (published) return published;
    return demoBlogPosts.find((post) => post.slug === slug) ?? null;
  },
);

export async function getRelatedPosts(
  slug: string,
  categoryRef: string | null,
): Promise<SanityBlogCard[]> {
  const published = await fetchPublished<SanityBlogCard[]>(
    relatedBlogsQuery,
    { slug, categoryRef },
    ["blog"],
  );
  if (published && published.length > 0) return published;

  const sameCategory = demoBlogCards.filter(
    (post) => post.slug !== slug && post.categoryRef === categoryRef,
  );
  const others = demoBlogCards.filter(
    (post) => post.slug !== slug && post.categoryRef !== categoryRef,
  );
  return [...sameCategory, ...others].slice(0, 3);
}
