import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { demoGalleryImages, demoImages } from "@/content/images";
import { siteLogo } from "@/content/site";

const expectedImages = {
  hero: "school-campus-students",
  introduction: "students-walking-campus",
  academics: "science-lab-experiment",
  library: "school-library-reading",
  classroom: "bright-classroom-lesson",
  collaboration: "students-computer-lab-collaboration",
  sports: "students-outdoor-sports",
  campus: "school-building-playground",
  arts: "students-art-class",
  community: "school-award-ceremony",
} as const;

describe("curated image configuration", () => {
  it("uses the local Pexels WebP pack for every named image", () => {
    for (const [name, fileName] of Object.entries(expectedImages)) {
      const image = demoImages[name as keyof typeof expectedImages];
      expect(image.src).toBe(`/images/curated/${fileName}.webp`);
      expect(image.alt.length).toBeGreaterThan(10);
      expect(image.credit).toMatch(/^Photograph by .+ via Pexels$/);
      expect(image.alt).not.toMatch(/AI-generated/i);
    }
  });

  it("ships every referenced WebP file", () => {
    for (const fileName of Object.values(expectedImages)) {
      expect(
        existsSync(
          resolve(process.cwd(), "public/images/curated", `${fileName}.webp`),
        ),
      ).toBe(true);
    }
  });

  it("shows all ten curated images in the gallery", () => {
    expect(demoGalleryImages).toHaveLength(
      Object.keys(expectedImages).length,
    );
    expect(new Set(demoGalleryImages.map((image) => image.src))).toEqual(
      new Set(Object.values(demoImages).map((image) => image.src)),
    );
  });

  it("points the site logo at the supplied emblem", () => {
    expect(siteLogo.src).toBe(
      "/images/generated/School%20Port%20Education%20Emblem.png",
    );
    expect(siteLogo.alt).toBe("School Port Education Emblem");
    expect(siteLogo.width).toBeGreaterThan(0);
    expect(siteLogo.height).toBeGreaterThan(0);
  });
});
