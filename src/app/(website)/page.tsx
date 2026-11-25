import type { Metadata } from "next";
import { CtaSection } from "@/components/layout/cta-section";
import { Hero } from "@/components/home/hero";
import { IntroductionAndHighlights } from "@/components/home/introduction-and-highlights";
import { AcademicPreview, CampusPreview } from "@/components/home/academic-and-campus";
import {
  AchievementsPreview,
  BlogPreview,
  GalleryPreview,
} from "@/components/home/cms-previews";
import { getFeaturedAchievements, getFeaturedGallery, getRecentPosts } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, organizationJsonLd } from "@/lib/seo/structured-data";
import { homeCopy } from "@/content/pages";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description: homeCopy.heroDescription,
  path: "/",
});

export default async function HomePage() {
  const [achievements, gallery, posts] = await Promise.all([
    getFeaturedAchievements(),
    getFeaturedGallery(),
    getRecentPosts(),
  ]);

  return (
    <main id="main-content">
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <IntroductionAndHighlights />
      <AcademicPreview />
      <AchievementsPreview achievements={achievements} />
      <CampusPreview />
      <GalleryPreview images={gallery} />
      <BlogPreview posts={posts} />
      <CtaSection
        title={homeCopy.admissionTitle}
        description={homeCopy.admissionBody}
      />
    </main>
  );
}
