"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { SanityGalleryItem } from "@/lib/types/sanity";
import { cn } from "@/lib/utils";

export function GalleryGrid({ items }: { items: readonly SanityGalleryItem[] }) {
  const [category, setCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category ?? "Other")))],
    [items],
  );

  const filtered = useMemo(
    () =>
      category === "All"
        ? items
        : items.filter((item) => (item.category ?? "Other") === category),
    [category, items],
  );

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) {
      lastFocusedRef.current?.focus();
      return;
    }
    closeButtonRef.current?.focus();
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null || filtered.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % filtered.length,
        );
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + filtered.length) % filtered.length,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, close, filtered.length]);

  const open = (index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
  };

  const active = activeIndex === null ? null : filtered[activeIndex];

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
        {categories.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={category === option}
            onClick={() => {
              setCategory(option);
              setActiveIndex(null);
            }}
            className={cn(
              "rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
              category === option
                ? "border-navy bg-navy text-white"
                : "border-navy/20 text-navy hover:border-navy",
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
        {filtered.map((item, index) => (
          <li key={item._id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => open(index)}
              className="group block w-full text-left"
              aria-label={`Open image: ${item.title}`}
            >
              <span className="image-frame block aspect-[4/5]">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.altText ?? item.title}
                    fill
                    loading={index === 0 ? "eager" : undefined}
                    fetchPriority={index === 0 ? "high" : undefined}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-full place-items-center bg-mist text-xs uppercase tracking-widest text-navy/50">
                    Image unavailable
                  </span>
                )}
              </span>
              <span className="mt-3 block font-display text-lg text-navy">
                {item.title}
              </span>
              {item.category ? (
                <span className="mt-1 block text-xs uppercase tracking-widest text-charcoal/55">
                  {item.category}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image: ${active.title}`}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/95 p-4 sm:p-8"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-4 top-4 grid size-11 place-items-center border border-white/30 text-white hover:border-gold"
            >
              <X aria-hidden="true" className="size-5" />
            </button>

            <div className="relative flex h-full w-full max-w-5xl items-center justify-center">
              {active.imageUrl ? (
                <Image
                  src={active.imageUrl}
                  alt={active.altText ?? active.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              ) : null}
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === null ? null : (current - 1 + filtered.length) % filtered.length,
                  )
                }
                aria-label="Previous image"
                className="absolute left-0 grid size-11 place-items-center border border-white/30 bg-navy-deep/70 text-white hover:border-gold sm:left-4"
              >
                <ChevronLeft aria-hidden="true" className="size-6" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === null ? null : (current + 1) % filtered.length,
                  )
                }
                aria-label="Next image"
                className="absolute right-0 grid size-11 place-items-center border border-white/30 bg-navy-deep/70 text-white hover:border-gold sm:right-4"
              >
                <ChevronRight aria-hidden="true" className="size-6" />
              </button>
            </div>

            <p aria-live="polite" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-sm text-white/80">
              {active.title}
              {activeIndex !== null ? ` · ${activeIndex + 1} of ${filtered.length}` : ""}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
