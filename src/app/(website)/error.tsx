"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ErrorMessage } from "@/components/ui/state-views";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Website route error:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="container-site flex min-h-[55vh] flex-col justify-center py-24"
    >
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display-title mt-6 max-w-3xl">
        This page could not be displayed right now.
      </h1>
      <ErrorMessage
        className="mt-8 max-w-xl"
        message="The page encountered an unexpected error. You can try again or return to the homepage."
      />
      <div className="mt-8 flex flex-wrap gap-4">
        <button type="button" onClick={retry} className={cn(buttonVariants())}>
          Try again
        </button>
        <Link href="/" className={cn(buttonVariants({ variant: "secondary" }))}>
          Return home
        </Link>
      </div>
    </main>
  );
}
