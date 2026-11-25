import { LoadingIndicator } from "@/components/ui/state-views";

export default function Loading() {
  return (
    <main
      id="main-content"
      className="container-site flex min-h-[55vh] flex-col justify-center py-24"
    >
      <p className="eyebrow">School Website Port</p>
      <LoadingIndicator
        label="Loading page content"
        className="mt-6 font-display text-2xl text-navy"
      />
      <div
        aria-hidden="true"
        className="mt-10 h-px w-full max-w-md bg-gradient-to-r from-gold to-transparent"
      />
    </main>
  );
}
