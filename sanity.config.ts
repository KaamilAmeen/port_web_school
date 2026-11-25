"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityConfig } from "@/sanity/lib/env";
import { schemaTypes } from "@/sanity/schemas";
import { structure } from "@/sanity/structure";

/**
 * The fallback ID keeps client bundles valid before a Sanity project is
 * configured. The /studio route displays setup guidance until the real
 * environment variables are present.
 */
export default defineConfig({
  name: "school-website-port",
  title: "School Website Port",
  projectId: sanityConfig.projectId || "placeholder-project",
  dataset: sanityConfig.dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
