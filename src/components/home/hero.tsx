import Image from "next/image";
import Link from "next/link";
import { AnimatedText } from "@/components/animations/animated-text";
import { buttonVariants } from "@/components/ui/button";
import { homeCopy } from "@/content/pages";
import { demoImages } from "@/content/images";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate min-h-[min(90svh,52rem)] overflow-hidden bg-navy-deep text-white">
      <Image
        src={demoImages.hero.src}
        alt={demoImages.hero.alt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[50%_45%] opacity-70 md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/25" />
      <div className="container-site relative flex min-h-[min(90svh,52rem)] flex-col justify-center py-24">
        <p className="eyebrow text-gold">{homeCopy.heroEyebrow}</p>
        <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,7vw,6.6rem)] leading-[0.97] tracking-tight text-white">
          <AnimatedText text={homeCopy.heroTitle} />
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          {homeCopy.heroDescription}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/admissions" className={cn(buttonVariants({ variant: "gold", size: "large" }))}>
            Explore Admissions
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-13 items-center border border-white/40 px-8 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
          >
            Discover Our School
          </Link>
        </div>
      </div>
    </section>
  );
}
