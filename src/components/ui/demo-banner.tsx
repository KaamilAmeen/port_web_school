import { siteConfig } from "@/content/site";

/**
 * Visible on every public route so fictional demo content is never mistaken
 * for verified school information, including on small screens.
 */
export function DemoBanner() {
  return (
    <div className="bg-navy-deep text-white">
      <p
        role="note"
        className="container-site py-2 text-center text-[11px] leading-relaxed tracking-wide text-white/75"
      >
        {siteConfig.identityStatus} — names, images, stories and contact details are illustrative only.
      </p>
    </div>
  );
}
