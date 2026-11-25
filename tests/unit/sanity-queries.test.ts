import { describe, expect, it } from "vitest";
import {
  achievementListQuery,
  announcementListQuery,
  blogBySlugQuery,
  blogCategoriesQuery,
  blogListQuery,
  featuredAchievementsQuery,
  featuredAnnouncementsQuery,
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
  announcementListQuery,
  featuredAnnouncementsQuery,
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
    expect(featuredAnnouncementsQuery).toContain("[0...3]");
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
    expect(announcementListQuery).toContain(
      "order(pinned desc, publishedAt desc)",
    );
  });

  it("excludes expired announcements and exposes portable text", () => {
    for (const query of [announcementListQuery, featuredAnnouncementsQuery]) {
      expect(query).toContain("expiresAt >= $now");
      expect(query).toContain("body");
      expect(query).toContain("image.asset->url");
    }
  });
});
