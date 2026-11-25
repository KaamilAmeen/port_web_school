import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title = "Nothing to show yet",
  description = "Please check back soon for updates.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 border border-dashed border-navy/25 bg-white/45 p-8",
        className,
      )}
    >
      <Inbox aria-hidden="true" className="size-7 text-gold" />
      <h3 className="font-display text-xl text-navy">{title}</h3>
      <p className="max-w-xl text-sm leading-relaxed text-charcoal/75">{description}</p>
    </div>
  );
}

export function ErrorMessage({
  message = "Something went wrong while loading content. Please try again shortly.",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 border border-red-700/25 bg-red-50 p-5 text-sm text-red-900",
        className,
      )}
    >
      <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

export function LoadingIndicator({
  label = "Loading content",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <p
      role="status"
      className={cn("flex items-center gap-3 text-sm text-navy/70", className)}
    >
      <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      {label}
    </p>
  );
}
