"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/lib/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="container-site section-space">
        <p className="eyebrow">CMS setup required</p>
        <h1 className="display-title mt-5">Sanity Studio is not configured</h1>
        <p className="lede mt-6 max-w-2xl">
          Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to
          <code className="mx-1 rounded bg-mist px-2 py-1 text-sm">.env.local</code>
          and restart the development server to open the editorial workspace.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
