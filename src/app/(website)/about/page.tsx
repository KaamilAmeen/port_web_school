import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/layout/cta-section";
import { FadeIn } from "@/components/animations/fade-in";
import { PageHeading } from "@/components/ui/page-heading";
import { PlaceholderNotice } from "@/components/ui/placeholder-notice";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutCopy } from "@/content/pages";
import { placeholderImages } from "@/content/images";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description: aboutCopy.intro,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd([{ label: "About" }])} />
      <PageHeading
        eyebrow="Our identity"
        title={aboutCopy.title}
        description={aboutCopy.intro}
        breadcrumbLabel="About"
      />

      <section className="section-space">
        <div className="container-site">
          <PlaceholderNotice />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <SectionHeading eyebrow="Introduction" title="A story waiting to be told accurately" />
              <div className="mt-8 space-y-6">
                {aboutCopy.sections.map((section) => (
                  <FadeIn key={section.title} className="border-t border-navy/15 pt-6">
                    <h3 className="font-display text-2xl">{section.title}</h3>
                    <p className="lede mt-3">{section.body}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="image-frame aspect-[4/5]">
                <Image
                  src={placeholderImages.community.src}
                  alt={placeholderImages.community.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-charcoal/55">
                Local placeholder graphic — replace with an approved school image.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-white/50 section-space">
        <div className="container-site">
          <SectionHeading
            eyebrow="Leadership and faculty"
            title="The people who will lead the story"
            description="Names, portraits and biographies will be added once the school confirms who may be presented publicly."
          />
          <div className="mt-12 grid gap-px border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {aboutCopy.leadership.map((person) => (
              <div key={person.role} className="bg-ivory p-7">
                <div className="aspect-square bg-mist" aria-hidden="true" />
                <p className="mt-5 text-xs uppercase tracking-widest text-gold">
                  {person.role}
                </p>
                <p className="mt-2 font-display text-xl text-navy">{person.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Visit us"
        title="Get to know the school community."
        description="Arrange a conversation once the school confirms its visit process and contact details."
        secondaryHref="/contact"
        secondaryLabel="Contact the school"
      />
    </main>
  );
}
