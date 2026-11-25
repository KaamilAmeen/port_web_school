import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-ivory px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="display-title mt-6">We could not find that page.</h1>
        <p className="lede mt-6">
          The address may be incorrect, or the page may have moved. Start again
          from the homepage or browse our latest stories.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className={cn(buttonVariants())}>
            Return home
          </Link>
          <Link href="/blog" className={cn(buttonVariants({ variant: "secondary" }))}>
            Visit blog
          </Link>
        </div>
      </div>
    </main>
  );
}
