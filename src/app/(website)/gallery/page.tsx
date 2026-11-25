import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHeading } from "@/components/ui/page-heading";
import { PlaceholderNotice } from "@/components/ui/placeholder-notice";
import { EmptyState } from "@/components/ui/state-views";
import { getGallery } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Browse published school photography or fictional demo illustrations, with category filters and an accessible image lightbox.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd([{ label: "Gallery" }])} />
      <PageHeading
        eyebrow="Visual stories"
        title="Photo gallery"
        description="Browse published images or fictional demo illustrations by category. Use the lightbox to move between images with buttons or the keyboard."
        breadcrumbLabel="Gallery"
      />

      <section className="section-space">
        <div className="container-site">
          <PlaceholderNotice text="Fictional demo illustrations are shown when Sanity has no published images. Replace them with approved school photography, with consent where needed." />
          {items && items.length > 0 ? (
            <div className="mt-12">
              <GalleryGrid items={items} />
            </div>
          ) : (
            <EmptyState
              className="mt-12"
              title="No published gallery images yet"
              description="Once authorized editors publish images in Sanity Studio, category filters and the lightbox will become available here."
            />
          )}
        </div>
      </section>

      <CtaSection
        eyebrow="Campus life"
        title="Discover more about life at the school."
        description="Facilities, activities and events will be presented here once confirmed."
        primaryHref="/campus-life"
        primaryLabel="Explore campus life"
      />
    </main>
  );
}
