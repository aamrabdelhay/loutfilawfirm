"use client";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--navy)] text-white px-6">
      <div className="text-center max-w-md">
        <p className="text-kicker text-[var(--gold-soft)]">Error</p>
        <h1 className="font-serif text-3xl md:text-4xl mt-4">Something went wrong</h1>
        <p className="mt-4 text-white/65">
          The page could not be shown. Please try again or contact the firm.
        </p>
        <button onClick={reset} className="btn-glass mt-8">
          Try again
        </button>
      </div>
    </div>
  );
}
