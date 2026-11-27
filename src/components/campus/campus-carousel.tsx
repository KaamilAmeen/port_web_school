"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { DemoImage } from "@/content/images";
import { cn } from "@/lib/utils";

/** A centred, sliding carousel: one active photograph with its neighbours peeking in. */
export function CampusCarousel({ images }: { images: readonly DemoImage[] }) {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      const next = (index + images.length) % images.length;
      const scroller = scrollerRef.current;
      const slide = slideRefs.current[next];

      setActive(next);
      if (!scroller || !slide) return;

      scroller.scrollTo({
        left: slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [images.length, reduceMotion],
  );

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearest = 0;
    let shortest = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const distance = Math.abs(
        slide.offsetLeft + slide.clientWidth / 2 - viewportCenter,
      );
      if (distance < shortest) {
        shortest = distance;
        nearest = index;
      }
    });

    setActive(nearest);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Campus photographs"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(active + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(active - 1);
        }
      }}
    >
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        tabIndex={0}
        role="group"
        aria-label="Use the left and right arrow keys to browse photographs"
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto py-1 [--slide-width:80%] sm:[--slide-width:62%] lg:[--slide-width:56%]"
      >
        <div aria-hidden="true" className="w-[calc((100%-var(--slide-width))/2)] shrink-0" />
        {images.map((image, index) => (
          <div
            key={image.src}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            className={cn(
              "image-frame relative aspect-[16/10] w-[var(--slide-width)] shrink-0 snap-center transition-[opacity,transform] duration-500",
              index === active ? "opacity-100" : "scale-[0.97] opacity-35",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 62vw, 56vw"
              className="object-cover"
              loading={index === 0 ? "eager" : undefined}
              fetchPriority={index === 0 ? "high" : undefined}
            />
          </div>
        ))}
        <div aria-hidden="true" className="w-[calc((100%-var(--slide-width))/2)] shrink-0" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous photograph"
          className="grid size-11 place-items-center rounded-full border border-navy/25 bg-white/70 text-navy transition-colors hover:border-navy"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <div className="flex items-center gap-2" role="group" aria-label="Choose photograph">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show photograph ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={cn(
                "size-2.5 rounded-full border transition-colors",
                index === active
                  ? "border-navy bg-navy"
                  : "border-navy/35 bg-transparent hover:border-navy",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next photograph"
          className="grid size-11 place-items-center rounded-full border border-navy/25 bg-white/70 text-navy transition-colors hover:border-navy"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      <p aria-live="polite" className="mt-4 text-center text-sm text-charcoal/65">
        {images[active]?.alt}
      </p>
    </div>
  );
}
