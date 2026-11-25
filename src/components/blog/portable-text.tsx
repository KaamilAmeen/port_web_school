import type { ReactNode } from "react";
import Link from "next/link";
import { imageUrl } from "@/sanity/lib/image";

type PortableSpan = {
  _key?: string;
  text?: string;
  marks?: string[];
};

type PortableMarkDef = {
  _key?: string;
  _type?: string;
  href?: string;
};

type PortableBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: string;
  children?: PortableSpan[];
  markDefs?: PortableMarkDef[];
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
};

function renderSpans(
  spans: readonly PortableSpan[],
  markDefs: readonly PortableMarkDef[],
): ReactNode[] {
  return spans.map((span, index) => {
    let content: ReactNode = span.text ?? "";
    const marks = span.marks ?? [];

    if (marks.includes("strong")) content = <strong>{content}</strong>;
    if (marks.includes("em")) content = <em>{content}</em>;

    const linkMark = marks
      .map((mark) => markDefs.find((def) => def._key === mark))
      .find((def) => def?._type === "link" && def.href);

    if (linkMark?.href) {
      const isExternal = /^https?:\/\//i.test(linkMark.href);
      content = isExternal ? (
        <a href={linkMark.href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={linkMark.href}>{content}</Link>
      );
    }

    return <span key={span._key ?? index}>{content}</span>;
  });
}

export function PortableText({ value }: { value?: unknown[] }) {
  if (!value || value.length === 0) {
    return <p className="lede">Article content will be added by the school editors.</p>;
  }

  const blocks = value.filter(
    (block): block is PortableBlock =>
      block !== null && typeof block === "object" && "_type" in block,
  );

  const elements: ReactNode[] = [];
  let listType: "bullet" | "number" | null = null;
  let pendingItems: ReactNode[] = [];

  const flushList = () => {
    if (!listType || pendingItems.length === 0) return;
    const List = listType === "bullet" ? "ul" : "ol";
    elements.push(
      <List key={`list-${elements.length}`}>{pendingItems}</List>,
    );
    pendingItems = [];
    listType = null;
  };

  for (const [index, block] of blocks.entries()) {
    const key = block._key ?? `block-${index}`;

    if (block._type === "image") {
      flushList();
      const ref = block.asset?._ref;
      const src = ref
        ? imageUrl({ _type: "reference", _ref: ref }, 1200)
        : null;
      if (src) {
        elements.push(
          <figure key={key} className="my-9">
            {/* Sanity image URLs are already optimised and sized by the CMS. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={block.alt ?? ""}
              loading="lazy"
              className="h-auto w-full rounded-sm"
            />
            {block.caption ? (
              <figcaption className="mt-2 text-xs text-charcoal/60">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>,
        );
      }
      continue;
    }

    if (block._type !== "block") continue;

    const children = renderSpans(block.children ?? [], block.markDefs ?? []);

    if (block.listItem === "bullet" || block.listItem === "number") {
      const nextList = block.listItem === "bullet" ? "bullet" : "number";
      if (listType && listType !== nextList) flushList();
      listType = nextList;
      pendingItems.push(<li key={key}>{children}</li>);
      continue;
    }

    flushList();

    if (block.style === "h2") {
      elements.push(<h2 key={key}>{children}</h2>);
    } else if (block.style === "h3") {
      elements.push(<h3 key={key}>{children}</h3>);
    } else if (block.style === "blockquote") {
      elements.push(<blockquote key={key}>{children}</blockquote>);
    } else {
      elements.push(<p key={key}>{children}</p>);
    }
  }

  flushList();

  return <div className="prose-editorial">{elements}</div>;
}
