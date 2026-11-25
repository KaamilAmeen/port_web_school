import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SanityBlogCard } from "@/lib/types/sanity";

export function BlogCard({ post }: { post: SanityBlogCard }) {
  return (
    <article className="group border border-navy/10 bg-white/60 transition-colors hover:border-gold/60">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="image-frame aspect-[16/10]">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center bg-mist text-xs uppercase tracking-widest text-navy/50">
              Image unavailable
            </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/55">
            {post.categoryTitle ?? "School news"}
            {post.publishedAt ? ` · ${formatDate(post.publishedAt)}` : ""}
          </p>
          <h3 className="mt-3 font-display text-2xl leading-snug text-navy">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-charcoal/70">
              {post.excerpt}
            </p>
          ) : null}
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
            Read article
            <ArrowUpRight aria-hidden="true" className="size-4 text-gold transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
