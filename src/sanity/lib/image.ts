import createImageUrlBuilder from "@sanity/image-url";
import { isSanityConfigured, sanityConfig } from "./env";

type ImageSourceParameter = Parameters<
  ReturnType<typeof createImageUrlBuilder>["image"]
>[0];

/** Returns an optimised Sanity image URL, or null when unavailable. */
export function imageUrl(source: unknown, width?: number): string | null {
  if (!isSanityConfigured || !source || typeof source !== "object") return null;

  try {
    const builder = createImageUrlBuilder({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
    });
    const image = builder.image(source as ImageSourceParameter).auto("format");
    return width ? image.width(width).url() : image.url();
  } catch (error) {
    console.error(
      "Sanity image URL generation failed:",
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}
