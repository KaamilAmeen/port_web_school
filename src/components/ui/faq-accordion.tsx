import { Plus } from "lucide-react";

export function FaqAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-navy/15 border-y border-navy/15">
      {items.map((item, index) => (
        <details key={item.question} className="group py-5" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-medium text-navy marker:hidden">
            <span className="font-display text-lg">{item.question}</span>
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-gold transition-transform group-open:rotate-45"
            />
          </summary>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/75">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
