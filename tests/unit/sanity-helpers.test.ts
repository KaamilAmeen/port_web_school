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
});
