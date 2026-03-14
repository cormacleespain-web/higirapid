"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col items-center justify-center px-4 bg-[#F8FAFC] text-[#0F172A]">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-[#64748B] text-center max-w-md mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 bg-[#0A5EBF] text-white font-medium rounded-md hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5EBF] focus-visible:ring-offset-2"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
