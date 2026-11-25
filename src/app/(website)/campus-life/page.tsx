import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/layout/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHeading } from "@/components/ui/page-heading";
import { StaggerReveal } from "@/components/animations/stagger-reveal";
import { campusCopy } from "@/content/pages";
import { demoImages } from "@/content/images";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Campus Life",
  description: campusCopy.intro,
  path: "/campus-life",
});

export default function CampusLifePage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd([{ label: "Campus Life" }])} />
      <PageHeading
        eyebrow="Beyond the classroom"
        title={campusCopy.title}
        description={campusCopy.intro}
        breadcrumbLabel="Campus Life"
      />

      <section className="section-space">
        <div className="container-site">
          <SectionHeading
            className="mt-12"
            eyebrow="Facilities"
            title="Spaces for learning and belonging"
            description="Spaces that support independent study, collaboration and hands-on learning."
          />
          <StaggerReveal className="mt-12 grid gap-px border border-navy/10 bg-navy/10 sm:grid-cols-2">
            {campusCopy.facilities.map((facility) => (
              <article key={facility.title} className="bg-ivory p-8">
                <h3 className="font-display text-2xl">{facility.title}</h3>
                <p className="mt-3 text-sm text-charcoal/70">{facility.description}</p>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-mist/40 section-space">
        <div className="container-site grid gap-8 lg:grid-cols-12">
          <div className="image-frame aspect-[4/3] lg:col-span-7 lg:aspect-[16/10]">
            <Image
              src={demoImages.arts.src}
              alt={demoImages.arts.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">Student activities</p>
            <h2 className="section-title mt-5">A wide horizon of interests</h2>
            <ul className="mt-8 divide-y divide-navy/15 border-y border-navy/15">
              {campusCopy.activities.map((activity) => (
                <li key={activity} className="py-4 text-sm text-charcoal/75">
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-site grid gap-8 md:grid-cols-2">
          <div className="image-frame aspect-[4/3]">
            <Image
              src={demoImages.sports.src}
              alt={demoImages.sports.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="image-frame aspect-[4/3]">
            <Image
              src={demoImages.library.src}
              alt={demoImages.library.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <p className="text-xs text-charcoal/55 md:col-span-2">
            A glimpse of the spaces where students learn, create and spend time together.
          </p>
        </div>
      </section>

      <CtaSection
        eyebrow="Events"
        title="See the full gallery."
        description="Explore photographs from across our school community."
        primaryHref="/gallery"
        primaryLabel="View gallery"
      />
    </main>
  );
}
