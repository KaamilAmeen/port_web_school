import Link from "next/link";
import { ArrowUpRight, GraduationCap, Mail, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { mainNavigation, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 text-white">
            <span className="grid size-11 place-items-center border border-white/25">
              <GraduationCap aria-hidden="true" className="size-6 text-gold" />
            </span>
            <span className="font-display text-xl">{siteConfig.name}</span>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/60">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-widest text-gold">
            {siteConfig.identityStatus}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Explore
          </h2>
          <ul className="mt-6 grid gap-3 text-sm">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Contact
          </h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{siteConfig.address}</span>
            </li>
            {siteConfig.phone ? (
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold">
                  {siteConfig.phone}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Admissions
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/60">
            Ask a question about enrolment, visits or next steps.
          </p>
          <Link
            href="/admissions#enquiry"
            className={cn(buttonVariants({ variant: "gold", size: "small" }), "mt-6")}
          >
            Make an enquiry
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          {siteConfig.socialLinks.length > 0 ? (
            <ul className="mt-8 flex gap-4 text-sm">
              {siteConfig.socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-gold" rel="noopener noreferrer" target="_blank">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-xs text-white/40">Demo social links shown.</p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Demonstration content.</p>
          <p>Fictional demo details — replace before publishing.</p>
        </div>
      </div>
    </footer>
  );
}
