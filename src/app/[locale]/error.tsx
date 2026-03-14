"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { defaultLocale } from "@/i18n/config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center px-4 py-16">
      <h2 className="text-xl font-bold text-content-primary mb-2">
        Something went wrong
      </h2>
      <p className="text-content-secondary text-center max-w-md mb-6">
        We couldn’t load this page. Please try again.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 bg-primary text-content-inverse font-medium rounded-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Try again
        </button>
        <Link
          href="/"
          locale={defaultLocale}
          className="px-6 py-3 border border-border text-content-primary font-medium rounded-md hover:bg-surface-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}
