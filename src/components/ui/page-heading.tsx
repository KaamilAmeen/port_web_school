import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

type PageHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  breadcrumbs?: readonly BreadcrumbItem[];
};

export function PageHeading({
  eyebrow,
  title,
  description,
  breadcrumbLabel,
  breadcrumbs,
}: PageHeadingProps) {
  return (
    <section className="relative overflow-hidden border-b border-navy/10 bg-mist/45">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 size-96 rounded-full border border-gold/25"
      />
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-16 size-64 rounded-full border border-gold/20"
      />
      <div className="container-site relative py-14 md:py-20">
        <Breadcrumbs items={breadcrumbs ?? [{ label: breadcrumbLabel }]} />
        <p className="eyebrow mt-10">{eyebrow}</p>
        <h1 className="display-title mt-5 max-w-4xl text-balance">{title}</h1>
        <p className="lede mt-6 max-w-2xl">{description}</p>
      </div>
    </section>
  );
}
