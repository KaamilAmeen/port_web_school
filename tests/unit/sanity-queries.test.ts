import { describe, expect, it } from "vitest";
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

const publishedQueries = {
  blogListQuery,
  featuredBlogsQuery,
  blogBySlugQuery,
  relatedBlogsQuery,
  blogCategoriesQuery,
  achievementListQuery,
  featuredAchievementsQuery,
  galleryListQuery,
  featuredGalleryQuery,
};

describe("Sanity GROQ queries", () => {
  it("excludes drafts from every public query", () => {
    for (const [name, query] of Object.entries(publishedQueries)) {
      expect(query, `${name} must exclude drafts`).toContain(
        '!(_id in path("drafts.**"))',
      );
    }
  });

  it("limits featured content to a small editorial selection", () => {
    expect(featuredBlogsQuery).toContain("[0...3]");
    expect(featuredAchievementsQuery).toContain("[0...3]");
    expect(featuredGalleryQuery).toContain("[0...6]");
  });

  it("uses a slug parameter for the dynamic blog route", () => {
    expect(blogBySlugQuery).toContain("slug.current == $slug");
    expect(blogBySlugQuery).toContain("body");
    expect(blogBySlugQuery).toContain("seoTitle");
    expect(blogBySlugQuery).toContain("seoDescription");
  });

  it("filters related posts by slug and optional category reference", () => {
    expect(relatedBlogsQuery).toContain("slug.current != $slug");
    expect(relatedBlogsQuery).toContain("category._ref == $categoryRef");
  });

  it("orders lists by publication or event date", () => {
    expect(blogListQuery).toContain("order(publishedAt desc)");
    expect(achievementListQuery).toContain("order(achievementDate desc)");
    expect(galleryListQuery).toContain("order(eventDate desc)");
    expect(blogCategoriesQuery).toContain("order(title asc)");
  });
});
