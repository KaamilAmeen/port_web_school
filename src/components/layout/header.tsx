"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GraduationCap, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { mainNavigation, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-shadow duration-300",
        isScrolled
          ? "border-navy/15 bg-ivory/98 shadow-[0_10px_30px_-24px_rgba(20,45,78,0.7)]"
          : "border-transparent bg-ivory",
      )}
    >
      <div className="container-site flex h-[4.75rem] items-center justify-between gap-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${siteConfig.name} home`}>
          <span className="grid size-11 place-items-center border border-navy/25 bg-white text-navy transition-colors group-hover:border-gold">
            <GraduationCap aria-hidden="true" className="size-6" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-navy">{siteConfig.name}</span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-gold">
              Fictional demo school
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-2 text-[13px] font-medium text-charcoal/80 transition-colors hover:text-navy",
                  isActive && "text-navy",
                )}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gold" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/admissions#enquiry"
            className={cn(buttonVariants({ variant: "primary", size: "small" }), "hidden sm:inline-flex")}
          >
            Admissions Enquiry
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid size-11 place-items-center border border-navy/25 text-navy xl:hidden"
          >
            {isMenuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-navy/10 bg-ivory xl:hidden"
          >
            <nav aria-label="Mobile" className="container-site grid gap-1 py-6">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "border-b border-navy/10 py-3 font-display text-xl text-navy",
                    pathname === item.href && "text-gold",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admissions#enquiry"
                onClick={() => setIsMenuOpen(false)}
                className={cn(buttonVariants({ variant: "primary" }), "mt-5 w-full")}
              >
                Admissions Enquiry
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
