import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Sanity helpers without project credentials", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
  });

  it("returns null from imageUrl when the CMS is not configured", async () => {
    const { imageUrl } = await import("@/sanity/lib/image");
    expect(imageUrl({ _type: "reference", _ref: "image-test" }, 800)).toBeNull();
    expect(imageUrl(null)).toBeNull();
  });

  it("returns null from fetchPublished instead of making an unconfigured request", async () => {
    const { fetchPublished } = await import("@/sanity/lib/client");
    await expect(
      fetchPublished('*[_type == "blog"]', {}, ["blog"]),
    ).resolves.toBeNull();
  });

  it("uses production as the default dataset when none is provided", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "");
    const { sanityConfig } = await import("@/sanity/lib/env");
    expect(sanityConfig.dataset).toBe("production");
  });

  it("falls back to labelled demo records when the CMS is unavailable", async () => {
    const {
      getAchievements,
      getBlogCategories,
      getBlogPosts,
      getGallery,
    } = await import("@/lib/content");

    const [posts, categories, achievements, gallery] = await Promise.all([
      getBlogPosts(),
      getBlogCategories(),
      getAchievements(),
      getGallery(),
    ]);

    expect(posts.length).toBeGreaterThan(6);
    expect(categories.length).toBeGreaterThan(0);
    expect(achievements.length).toBeGreaterThan(0);
    expect(gallery.length).toBeGreaterThan(0);
    expect(posts.every((post) => post._id.startsWith("demo-"))).toBe(true);
  });

  it("resolves demo article slugs and related demo posts", async () => {
    const { getPostBySlug, getRelatedPosts } = await import("@/lib/content");

    const post = await getPostBySlug("how-inquiry-shapes-a-monday-morning");
    expect(post?._id).toBe("demo-blog-inquiry");

    const related = await getRelatedPosts(post!.slug, post!.categoryRef ?? null);
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((item) => item._id !== post!._id)).toBe(true);
  });
});
