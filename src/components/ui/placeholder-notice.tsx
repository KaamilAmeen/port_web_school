import { Info } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function PlaceholderNotice({
  text = siteConfig.notice,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p
      role="note"
      className={cn(
        "placeholder-note flex items-start gap-3 rounded-sm px-4 py-3 text-xs leading-relaxed text-navy/80",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-navy" />
      <span>{text}</span>
    </p>
  );
}
