import { createClient } from "next-sanity";
import { isSanityConfigured, sanityConfig } from "./env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: true,
    })
  : null;

type QueryParams = Record<string, string | number | boolean | null>;

/**
 * Central content-fetching helper. Returns null for an unconfigured CMS or a
 * failed request, and logs failures so they are never silently ignored.
 */
export async function fetchPublished<T>(
  query: string,
  params: QueryParams = {},
  tags: readonly string[] = [],
): Promise<T | null> {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60, tags: [...tags] },
    });
  } catch (error) {
    console.error(
      "Sanity query failed:",
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}
