import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GsapReveal } from "@/components/animations/gsap-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeCopy } from "@/content/pages";
import { demoImages, type DemoImage } from "@/content/images";
import { cn } from "@/lib/utils";

/** CSS gallery: wide images flank two tall images in three equal columns. */
const campusGalleryColumns: { images: readonly DemoImage[]; frameAspect: string }[] = [
  {
    images: [demoImages.library, demoImages.arts, demoImages.classroom],
    frameAspect: "aspect-[311/264]",
  },
  {
    images: [demoImages.collaboration, demoImages.campus],
    frameAspect: "aspect-[311/396]",
  },
  {
    images: [demoImages.sports, demoImages.academics, demoImages.community],
    frameAspect: "aspect-[311/264]",
  },
];

export function AcademicPreview() {
  return (
    <section className="section-space">
      <div className="container-site">
        <GsapReveal className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
          <div data-gsap-reveal>
            <p className="eyebrow">Academics</p>
            <h2 className="section-title mt-5 text-balance">
              {homeCopy.academicsTitle}
            </h2>
            <p className="lede mt-6">{homeCopy.academicsBody}</p>
            <ul className="mt-9 divide-y divide-navy/15 border-t border-navy/15">
              {homeCopy.academicPillars.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-4 py-4">
                  <span className="font-display text-lg text-navy">{item.label}</span>
                  <span className="text-right text-xs uppercase tracking-widest text-charcoal/60">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/academics"
              className="mt-8 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-semibold text-navy"
            >
              Explore academics
              <ArrowRight aria-hidden="true" className="size-4 text-gold" />
            </Link>
          </div>
          <div data-gsap-reveal className="relative">
            <div className="image-frame aspect-[5/6]">
              <Image
                src={demoImages.academics.src}
                alt={demoImages.academics.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden bg-navy px-8 py-7 text-white md:block" aria-hidden="true">
              <p className="font-display text-3xl">Learn</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-gold">
                {homeCopy.academicMotif}
              </p>
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}

export function CampusPreview() {
  return (
    <section className="bg-mist/40 section-space">
      <div className="container-site">
        <SectionHeading
          eyebrow="Campus life"
          title={homeCopy.campusTitle}
          description={homeCopy.campusBody}
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-3">
          {campusGalleryColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col gap-3 md:aspect-[311/792]"
            >
              {column.images.map((image) => (
                <div
                  key={image.src}
                  className={cn(
                    "image-frame relative shrink-0",
                    column.frameAspect,
                    "md:min-h-0 md:flex-1 md:shrink md:aspect-auto",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-charcoal/55">
          {homeCopy.campusCaption}
        </p>
        <Link
          href="/campus-life"
          className="mt-8 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-semibold text-navy"
        >
          Discover campus life
          <ArrowRight aria-hidden="true" className="size-4 text-gold" />
        </Link>
      </div>
    </section>
  );
}
