import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHeading } from "@/components/ui/page-heading";
import { PlaceholderNotice } from "@/components/ui/placeholder-notice";
import { EmptyState } from "@/components/ui/state-views";
import { getBlogCategories, getBlogPosts } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description: "News, stories and insights published by the school.",
  path: "/blog",
});

type Props = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
    page?: string | string[];
  }>;
};

const PAGE_SIZE = 6;

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function BlogPage({ searchParams }: Props) {
  const [queryParams, posts, categories] = await Promise.all([
    searchParams,
    getBlogPosts(),
    getBlogCategories(),
  ]);

  const search = first(queryParams.q).trim().toLowerCase();
  const category = first(queryParams.category);
  const requestedPage = Number.parseInt(first(queryParams.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  let visible = posts ?? [];
  if (category) {
    visible = visible.filter((post) => post.categorySlug === category);
  }
  if (search) {
    visible = visible.filter((post) =>
      `${post.title} ${post.excerpt ?? ""} ${post.categoryTitle ?? ""}`
        .toLowerCase()
        .includes(search),
    );
  }

  const featured = !search && !category && page === 1 ? visible.filter((post) => post.featured) : [];
  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = visible.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const hrefForPage = (nextPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category) params.set("category", category);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd([{ label: "Blog" }])} />
      <PageHeading
        eyebrow="School stories"
        title="Blog"
        description="News, learning stories and community updates. Fictional demo posts appear until Sanity is connected."
        breadcrumbLabel="Blog"
      />

      <section className="section-space">
        <div className="container-site">
          <PlaceholderNotice />

          {featured.length > 0 ? (
            <div className="mt-12">
              <p className="eyebrow">Featured</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {featured.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-12 flex flex-col gap-6 border-y border-navy/15 py-6 md:flex-row md:items-end md:justify-between">
            <form action="/blog" method="get" role="search" className="flex w-full max-w-md items-center border border-navy/20 bg-white px-4">
              <Search aria-hidden="true" className="size-4 text-navy/50" />
              <label htmlFor="blog-search" className="sr-only">
                Search blog articles
              </label>
              <input
                id="blog-search"
                name="q"
                type="search"
                defaultValue={search}
                placeholder="Search articles"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
              {category ? <input type="hidden" name="category" value={category} /> : null}
            </form>
            <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
              <Link
                href={search ? `/blog?q=${encodeURIComponent(search)}` : "/blog"}
                aria-current={!category ? "true" : undefined}
                className={cn(
                  "rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-wider",
                  !category ? "border-navy bg-navy text-white" : "border-navy/20 text-navy",
                )}
              >
                All
              </Link>
              {(categories ?? []).map((item) => (
                <Link
                  key={item._id}
                  href={`/blog?category=${encodeURIComponent(item.slug)}${search ? `&q=${encodeURIComponent(search)}` : ""}`}
                  aria-current={category === item.slug ? "true" : undefined}
                  className={cn(
                    "rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-wider",
                    category === item.slug
                      ? "border-navy bg-navy text-white"
                      : "border-navy/20 text-navy",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {paginated.length > 0 ? (
            <>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginated.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
              {pageCount > 1 ? (
                <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-3">
                  {currentPage > 1 ? (
                    <Link href={hrefForPage(currentPage - 1)} className="border border-navy/20 px-4 py-2 text-sm text-navy">
                      Previous
                    </Link>
                  ) : null}
                  <span aria-live="polite" className="text-sm text-charcoal/70">
                    Page {currentPage} of {pageCount}
                  </span>
                  {currentPage < pageCount ? (
                    <Link href={hrefForPage(currentPage + 1)} className="border border-navy/20 px-4 py-2 text-sm text-navy">
                      Next
                    </Link>
                  ) : null}
                </nav>
              ) : null}
            </>
          ) : (
            <EmptyState
              className="mt-10"
              title="No articles found"
              description="There are no published articles matching these filters yet. Try another search or category."
            />
          )}
        </div>
      </section>

      <CtaSection
        eyebrow="Admissions"
        title="Looking for enrolment information?"
        description="Find the enquiry form, process information and frequently asked questions."
        primaryHref="/admissions"
        primaryLabel="Visit admissions"
      />
    </main>
  );
}
