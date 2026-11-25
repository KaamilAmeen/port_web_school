import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/layout/cta-section";
import { FadeIn } from "@/components/animations/fade-in";
import { PageHeading } from "@/components/ui/page-heading";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutCopy } from "@/content/pages";
import { demoImages } from "@/content/images";
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
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <SectionHeading eyebrow="Introduction" title="A story built around relationships" />
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
                  src={demoImages.community.src}
                  alt={demoImages.community.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-charcoal/55">
                Moments from our school community.
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
            description="Our leadership team works together to shape learning, wellbeing and community life."
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
        description="We welcome visitors and would be glad to help you plan a time to see the school."
        secondaryHref="/contact"
        secondaryLabel="Contact the school"
      />
    </main>
  );
}
