import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/layout/cta-section";
import { StaggerReveal } from "@/components/animations/stagger-reveal";
import { PageHeading } from "@/components/ui/page-heading";
import { PlaceholderNotice } from "@/components/ui/placeholder-notice";
import { SectionHeading } from "@/components/ui/section-heading";
import { academicsCopy } from "@/content/pages";
import { demoImages } from "@/content/images";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Academics",
  description: academicsCopy.intro,
  path: "/academics",
});

export default function AcademicsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd([{ label: "Academics" }])} />
      <PageHeading
        eyebrow="Learning"
        title={academicsCopy.title}
        description={academicsCopy.intro}
        breadcrumbLabel="Academics"
      />

      <section className="section-space">
        <div className="container-site">
          <PlaceholderNotice />
          <SectionHeading
            className="mt-12"
            eyebrow="Programmes"
            title="Programme structure"
            description="Illustrative programme headings only. Confirm age ranges, subjects and qualifications with the school."
          />
          <StaggerReveal className="mt-12 grid gap-6 lg:grid-cols-3">
            {academicsCopy.programmes.map((programme, index) => (
              <article key={programme.name} className="flex flex-col border border-navy/12 bg-white/55 p-8">
                <p className="font-display text-5xl text-gold/60">0{index + 1}</p>
                <h3 className="mt-6 font-display text-2xl">{programme.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
                  {programme.description}
                </p>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-navy section-space text-white">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-20">
          <div className="image-frame aspect-[4/5]">
            <Image
              src={demoImages.classroom.src}
              alt={demoImages.classroom.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-gold">Teaching approach</p>
            <h2 className="mt-5 font-display text-3xl text-white md:text-5xl">
              A considered approach to learning
            </h2>
            <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {academicsCopy.approach.map((item) => (
                <div key={item.title} className="py-5">
                  <h3 className="font-display text-xl text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/65">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Admissions"
        title="Ask about the right programme for your child."
        description="Our admissions form collects an initial enquiry. Programme details will be added when approved by the school."
      />
    </main>
  );
}
