import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHeading } from "@/components/ui/page-heading";
import { EmptyState } from "@/components/ui/state-views";
import { getGallery } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Explore school life through category filters and an accessible image lightbox.",
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
        description="Browse school life by category. Use the lightbox to move between images with buttons or the keyboard."
        breadcrumbLabel="Gallery"
      />

      <section className="section-space">
        <div className="container-site">
          {items && items.length > 0 ? (
            <div className="mt-12">
              <GalleryGrid items={items} />
            </div>
          ) : (
            <EmptyState
              className="mt-12"
              title="No images in this category"
              description="Try another category to explore more of school life."
            />
          )}
        </div>
      </section>

      <CtaSection
        eyebrow="Campus life"
        title="Discover more about life at the school."
        description="Explore our facilities, activities and events."
        primaryHref="/campus-life"
        primaryLabel="Explore campus life"
      />
    </main>
  );
}
