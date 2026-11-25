import { isPlaceholderEnvValue } from "@/lib/env";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-11-01",
} as const;

export const isSanityConfigured =
  !isPlaceholderEnvValue(sanityConfig.projectId) &&
  /^[a-z0-9-]+$/.test(sanityConfig.projectId);
