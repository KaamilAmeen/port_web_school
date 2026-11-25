import type { Metadata } from "next";
import { AdmissionForm } from "@/components/forms/admission-form";
import { CtaSection } from "@/components/layout/cta-section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { PageHeading } from "@/components/ui/page-heading";
import { PlaceholderNotice } from "@/components/ui/placeholder-notice";
import { SectionHeading } from "@/components/ui/section-heading";
import { admissionsCopy } from "@/content/pages";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Admissions",
  description: admissionsCopy.intro,
  path: "/admissions",
});

export default function AdmissionsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd([{ label: "Admissions" }])} />
      <PageHeading
        eyebrow="Join us"
        title={admissionsCopy.title}
        description={admissionsCopy.intro}
        breadcrumbLabel="Admissions"
      />

      <section className="section-space">
        <div className="container-site">
          <PlaceholderNotice />
          <SectionHeading
            className="mt-12"
            eyebrow="Process"
            title="How an enquiry becomes a conversation"
            description="This framework is illustrative. Dates, entry criteria and fees must be supplied by the school."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {admissionsCopy.steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-gold pt-5">
                <p className="font-display text-4xl text-navy/20">0{index + 1}</p>
                <h3 className="mt-4 font-display text-xl text-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-28 border-y border-navy/10 bg-white/55 section-space">
        <div className="container-site grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Enquiry form</p>
            <h2 className="section-title mt-5">Tell us what you would like to know</h2>
            <p className="lede mt-6">
              Fields marked with an asterisk are required. Submissions are delivered
              through the configured Formspree endpoint; no message is reported as
              sent until Formspree confirms it.
            </p>
            <p className="mt-6 text-xs text-charcoal/60">
              Please avoid sending sensitive documents through this form.
            </p>
          </div>
          <div className="border border-navy/10 bg-ivory p-6 sm:p-9">
            <AdmissionForm />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-site grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Answers will be replaced with school-approved information."
          />
          <FaqAccordion items={admissionsCopy.faqs} />
        </div>
      </section>

      <CtaSection
        title="Have a different question?"
        description="Use the general contact form and the school will respond using the details you provide."
        primaryHref="/contact#contact-form"
        primaryLabel="Contact the school"
      />
    </main>
  );
}
