import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard, formatDate } from "@/components/blog/blog-card";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/state-views";
import { cn } from "@/lib/utils";
import type {
  SanityAchievement,
  SanityBlogCard,
  SanityGalleryItem,
} from "@/lib/types/sanity";

export function AchievementsPreview({
  achievements,
}: {
  achievements: SanityAchievement[] | null;
}) {
  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading
          eyebrow="Achievements"
          title="Milestones worth celebrating"
          description="Celebrating the milestones and projects that shape our school community."
        />
        {achievements && achievements.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {achievements.map((achievement) => (
              <FadeIn as="article" key={achievement._id} className="border border-navy/10 bg-white/60">
                <div className="image-frame aspect-[4/3]">
                  {achievement.coverImageUrl ? (
                    <Image
                      src={achievement.coverImageUrl}
                      alt={achievement.coverImageAlt ?? achievement.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-widest text-navy/55">
                    {achievement.category ?? "Achievement"}
                    {achievement.achievementDate
                      ? ` · ${formatDate(achievement.achievementDate)}`
                      : ""}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-navy">
                    {achievement.title}
                  </h3>
                  {achievement.description ? (
                    <p className="mt-3 line-clamp-3 text-sm text-charcoal/70">
                      {achievement.description}
                    </p>
                  ) : null}
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-12"
            title="No achievements to show yet"
            description="Check back soon for the latest highlights from our community."
          />
        )}
        <Link
          href="/achievements"
          className="mt-8 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-semibold text-navy"
        >
          View all achievements
          <ArrowRight aria-hidden="true" className="size-4 text-gold" />
        </Link>
      </div>
    </section>
  );
}

export function GalleryPreview({
  images,
}: {
  images: SanityGalleryItem[] | null;
}) {
  return (
    <section className="border-y border-navy/10 bg-white/50 section-space">
      <div className="container-site">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from school life"
          description="A selection of moments from learning, events and everyday school life."
        />
        {images && images.length > 0 ? (
          <div
            className={cn(
              "mt-12 grid gap-3",
              images.length >= 5
                ? "grid-cols-2 md:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {images.slice(0, 5).map((item, index) => (
              <Link
                key={item._id}
                href="/gallery"
                className={cn(
                  "image-frame aspect-square",
                  images.length >= 5 && index === 0 && "col-span-2 row-span-2",
                )}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.altText ?? item.title}
                    fill
                    loading={index === 0 ? "eager" : undefined}
                    fetchPriority={index === 0 ? "high" : undefined}
                    sizes={
                      images.length >= 5
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    className="object-cover"
                  />
                ) : null}
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-12"
            title="No gallery images to show yet"
            description="Check back soon for new photographs from school life."
          />
        )}
        <Link
          href="/gallery"
          className="mt-8 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-semibold text-navy"
        >
          View the complete gallery
          <ArrowRight aria-hidden="true" className="size-4 text-gold" />
        </Link>
      </div>
    </section>
  );
}

export function BlogPreview({ posts }: { posts: SanityBlogCard[] | null }) {
  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading
          eyebrow="From the blog"
          title="Latest stories and insights"
          description="The latest news, learning stories and updates from our school."
        />
        {posts && posts.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <FadeIn key={post._id}>
                <BlogCard post={post} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-12"
            title="No articles to show yet"
            description="Check back soon for new stories from the school."
          />
        )}
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-semibold text-navy"
        >
          Visit the blog
          <ArrowRight aria-hidden="true" className="size-4 text-gold" />
        </Link>
      </div>
    </section>
  );
}
