import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerReveal } from "@/components/animations/stagger-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeCopy } from "@/content/pages";
import { placeholderImages } from "@/content/images";

export function IntroductionAndHighlights() {
  return (
    <>
      <section className="section-space">
        <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-20">
          <FadeIn className="relative">
            <div className="image-frame aspect-[4/5] lg:aspect-[4/4.6]">
              <Image
                src={placeholderImages.introduction.src}
                alt={placeholderImages.introduction.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden h-40 w-40 border border-gold/60 md:block" aria-hidden="true" />
          </FadeIn>
          <div>
            <p className="eyebrow">{homeCopy.introEyebrow}</p>
            <h2 className="section-title mt-5 text-balance">{homeCopy.introTitle}</h2>
            <div className="mt-7 space-y-5">
              {homeCopy.introBody.map((paragraph) => (
                <p key={paragraph} className="lede">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-6 border-t border-navy/15 pt-7 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl">Vision</h3>
                <p className="mt-2 text-sm text-charcoal/70">
                  Approved statement to be supplied by the school.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl">Mission</h3>
                <p className="mt-2 text-sm text-charcoal/70">
                  Approved statement to be supplied by the school.
                </p>
              </div>
            </div>
            <Link
              href="/about"
              className="mt-9 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-semibold text-navy"
            >
              Learn more about us
              <ArrowRight aria-hidden="true" className="size-4 text-gold" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-navy/10 bg-white/50">
        <div className="container-site section-space">
          <SectionHeading
            eyebrow="At a glance"
            title={homeCopy.highlightsTitle}
            description={homeCopy.highlightsIntro}
          />
          <StaggerReveal className="mt-12 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {homeCopy.highlights.map((highlight) => (
              <div key={highlight.title} className="bg-ivory p-7">
                <span aria-hidden="true" className="block h-px w-10 bg-gold" />
                <h3 className="mt-6 font-display text-xl">{highlight.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  {highlight.description}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
