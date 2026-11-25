import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogCard, formatDate } from "@/components/blog/blog-card";
import { PortableText } from "@/components/blog/portable-text";
import { CtaSection } from "@/components/layout/cta-section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/state-views";
import { getBlogPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import {
  articleJsonLd,
  JsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getBlogPosts();
  return (posts ?? []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return createPageMetadata({
      title: "Article not found",
      description: "This article is not available.",
      path: `/blog/${slug}`,
    });
  }

  return createPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? post.title,
    path: `/blog/${post.slug}`,
    image: post.coverImageUrl ?? undefined,
    type: "article",
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, post.categoryRef ?? null);

  return (
    <main id="main-content">
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.seoDescription ?? post.excerpt ?? post.title,
          path: `/blog/${post.slug}`,
          image: post.coverImageUrl,
          publishedAt: post.publishedAt,
          authorName: post.authorName,
        })}
      />

      <article>
        <header className="border-b border-navy/10 bg-mist/40">
          <div className="container-site py-12 md:py-16">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
            <p className="eyebrow mt-10">
              {post.categoryTitle ?? "School news"}
              {post.publishedAt ? ` · ${formatDate(post.publishedAt)}` : ""}
            </p>
            <h1 className="display-title mt-6 max-w-4xl text-balance">{post.title}</h1>
            {post.excerpt ? <p className="lede mt-6 max-w-2xl">{post.excerpt}</p> : null}
          </div>
        </header>

        <div className="container-site py-12 md:py-16">
          {post.coverImageUrl ? (
            <div className="image-frame mb-12 aspect-[16/9]">
              <Image
                src={post.coverImageUrl}
                alt={post.coverImageAlt ?? post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 80rem"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="mx-auto max-w-3xl">
            <PortableText value={post.body} />

            {post.authorName ? (
              <div className="mt-14 flex gap-5 border-t border-navy/15 pt-8">
                <div className="size-14 shrink-0 overflow-hidden bg-mist">
                  {post.authorProfileImageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element -- author avatar comes from Sanity */
                    <img
                      src={post.authorProfileImageUrl}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="font-display text-xl text-navy">{post.authorName}</p>
                  {post.authorDesignation ? (
                    <p className="mt-1 text-xs uppercase tracking-widest text-navy/55">
                      {post.authorDesignation}
                    </p>
                  ) : null}
                  {post.authorBiography ? (
                    <p className="mt-3 text-sm text-charcoal/70">
                      {post.authorBiography}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-navy"
            >
              <ArrowLeft aria-hidden="true" className="size-4 text-gold" />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <section className="border-t border-navy/10 bg-white/50 section-space">
        <div className="container-site">
          <p className="eyebrow">Keep reading</p>
          <h2 className="section-title mt-5">Related articles</h2>
          {related && related.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item._id} post={item} />
              ))}
            </div>
          ) : (
            <EmptyState className="mt-10" description="No related articles have been published yet." />
          )}
        </div>
      </section>

      <CtaSection
        title="Stay connected with the school."
        description="Visit the blog for more published stories and updates."
        primaryHref="/blog"
        primaryLabel="All articles"
      />
    </main>
  );
}
