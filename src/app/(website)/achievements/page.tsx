import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/layout/cta-section";
import { EmptyState } from "@/components/ui/state-views";
import { PageHeading } from "@/components/ui/page-heading";
import { PlaceholderNotice } from "@/components/ui/placeholder-notice";
import { formatDate } from "@/components/blog/blog-card";
import { achievementsCopy } from "@/content/pages";
import { getAchievements } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Achievements",
  description: achievementsCopy.intro,
  path: "/achievements",
});

type Props = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function AchievementsPage({ searchParams }: Props) {
  const [{ category: rawCategory }, achievements] = await Promise.all([
    searchParams,
    getAchievements(),
  ]);
  const category = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;
  const activeCategory = category ?? "All";
  const visible =
    activeCategory === "All" || !achievements
      ? achievements
      : achievements.filter((item) => item.category === activeCategory);

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd([{ label: "Achievements" }])} />
      <PageHeading
        eyebrow="Recognition"
        title={achievementsCopy.title}
        description={achievementsCopy.intro}
        breadcrumbLabel="Achievements"
      />

      <section className="section-space">
        <div className="container-site">
          <PlaceholderNotice text="Only school-verified achievements should be published. This page displays published Sanity content and invents no awards." />
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter achievements by category">
            {["All", ...achievementsCopy.categories].map((option) => (
              <Link
                key={option}
                href={option === "All" ? "/achievements" : `/achievements?category=${encodeURIComponent(option)}`}
                aria-current={activeCategory === option ? "true" : undefined}
                className={cn(
                  "rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  activeCategory === option
                    ? "border-navy bg-navy text-white"
                    : "border-navy/20 text-navy hover:border-navy",
                )}
              >
                {option}
              </Link>
            ))}
          </div>

          {visible && visible.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <article key={item._id} className="border border-navy/10 bg-white/60">
                  <div className="image-frame aspect-[4/3]">
                    {item.coverImageUrl ? (
                      <Image
                        src={item.coverImageUrl}
                        alt={item.coverImageAlt ?? item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-widest text-navy/55">
                      {item.category ?? "Achievement"}
                      {item.achievementDate
                        ? ` · ${formatDate(item.achievementDate)}`
                        : ""}
                    </p>
                    <h2 className="mt-3 font-display text-2xl text-navy">{item.title}</h2>
                    {item.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-12"
              title="No published achievements in this category"
              description="Publish verified achievements in Sanity Studio to display them here."
            />
          )}
        </div>
      </section>

      <CtaSection
        title="Be part of the next chapter."
        description="Ask about joining the school community once admissions information has been confirmed."
      />
    </main>
  );
}
