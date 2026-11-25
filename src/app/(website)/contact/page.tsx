import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeading } from "@/components/ui/page-heading";
import { contactCopy } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description: contactCopy.intro,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd([{ label: "Contact" }])} />
      <PageHeading
        eyebrow="Get in touch"
        title={contactCopy.title}
        description={contactCopy.intro}
        breadcrumbLabel="Contact"
      />

      <section className="section-space">
        <div className="container-site grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
          <div>
            <h2 className="section-title mt-10">Contact details</h2>
            <dl className="mt-8 divide-y divide-navy/15 border-y border-navy/15">
              <div className="py-5">
                <dt className="text-xs uppercase tracking-widest text-navy/55">Email</dt>
                <dd className="mt-2 font-display text-xl text-navy">
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-xs uppercase tracking-widest text-navy/55">Phone</dt>
                <dd className="mt-2 font-display text-xl text-navy">
                  {siteConfig.phone ?? "Available on request"}
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-xs uppercase tracking-widest text-navy/55">Address</dt>
                <dd className="mt-2 font-display text-xl text-navy">
                  {siteConfig.address}
                </dd>
              </div>
            </dl>

            <div className="mt-10 border border-dashed border-navy/25 bg-white/40 p-6">
              <p className="text-xs uppercase tracking-widest text-navy/55">Location</p>
              {siteConfig.mapEmbedUrl ? (
                <iframe
                  title="School location map"
                  src={siteConfig.mapEmbedUrl}
                  className="mt-4 aspect-[4/3] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <p className="mt-3 text-sm text-charcoal/70">
                  Find us at the address above. Directions are available on request.
                </p>
              )}
            </div>
          </div>

          <div id="contact-form" className="scroll-mt-28 border border-navy/10 bg-white/60 p-6 sm:p-9">
            <p className="eyebrow">Message form</p>
            <h2 className="mt-5 font-display text-3xl text-navy">Send an enquiry</h2>
            <p className="mt-3 text-sm text-charcoal/70">
              Fields marked with an asterisk are required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
