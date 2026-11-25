import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaSection({
  eyebrow = "Admissions",
  title,
  description,
  primaryHref = "/admissions#enquiry",
  primaryLabel = "Make an enquiry",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="absolute -left-20 top-1/2 size-80 -translate-y-1/2 rounded-full border border-gold/20" />
      <div className="container-site relative grid gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-20">
        <div>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-white md:text-5xl">
            {title}
          </h2>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-white/70">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={primaryHref} className={cn(buttonVariants({ variant: "gold" }))}>
              {primaryLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="inline-flex min-h-11 items-center border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
