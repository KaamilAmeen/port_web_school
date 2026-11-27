"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { SanityGalleryItem } from "@/lib/types/sanity";
import { cn } from "@/lib/utils";

type Tile = { item: SanityGalleryItem; index: number };
type TileRole = "feature" | "stack" | "strip" | "side-single";

/** A lookbook set is one landscape feature, two stacked squares and four squares. */
const LOOKBOOK_SET_SIZE = 7;

function groupIntoSets(tiles: readonly Tile[]): Tile[][] {
  const sets: Tile[][] = [];
  for (let index = 0; index < tiles.length; index += LOOKBOOK_SET_SIZE) {
    sets.push(tiles.slice(index, index + LOOKBOOK_SET_SIZE));
  }
  return sets;
}

function LookbookTile({
  tile,
  role,
  onOpen,
}: {
  tile: Tile;
  role: TileRole;
  onOpen: (index: number) => void;
}) {
  const { item, index } = tile;
  const fillsSide = role === "stack" || role === "side-single";

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open image: ${item.title}`}
      className={cn("group block w-full text-left", fillsSide && "h-full")}
    >
      <span
        className={cn(
          "image-frame relative block w-full",
          role === "feature" ? "aspect-[3/2]" : "aspect-square",
          fillsSide && "lg:aspect-auto lg:h-full",
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
              role === "feature"
                ? "(max-width: 1024px) 100vw, 58vw"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            }
            className="object-cover"
          />
        ) : (
          <span className="grid h-full place-items-center bg-mist text-xs uppercase tracking-widest text-navy/50">
            Image unavailable
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/35 to-transparent px-4 pb-3 pt-10">
          <span className="block truncate font-display text-base text-white sm:text-lg">
            {item.title}
          </span>
          {item.category ? (
            <span className="block truncate text-[10px] uppercase tracking-widest text-white/70">
              {item.category}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}

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

  const sets = useMemo(
    () =>
      groupIntoSets(filtered.map((item, index) => ({ item, index }))),
    [filtered],
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

      <div className="space-y-3">
        {sets.map((set, setIndex) => {
          const [feature, ...remaining] = set;
          if (!feature) return null;
          const side = remaining.slice(0, 2);
          const strip = remaining.slice(2);

          return (
            <div key={setIndex} className="space-y-3">
              <div className="grid gap-3 lg:grid-cols-[3fr_1fr]">
                <LookbookTile tile={feature} role="feature" onOpen={open} />
                {side.length > 0 ? (
                  <div
                    className={cn(
                      "grid gap-3",
                      side.length === 2 ? "grid-cols-2 lg:grid-cols-1 lg:grid-rows-2" : "grid-cols-1",
                    )}
                  >
                    {side.map((tile) => (
                      <LookbookTile
                        key={tile.item._id}
                        tile={tile}
                        role={side.length === 1 ? "side-single" : "stack"}
                        onOpen={open}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              {strip.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {strip.map((tile) => (
                    <LookbookTile
                      key={tile.item._id}
                      tile={tile}
                      role="strip"
                      onOpen={open}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

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
                    current === null ? null : (current + 1 + filtered.length) % filtered.length,
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
