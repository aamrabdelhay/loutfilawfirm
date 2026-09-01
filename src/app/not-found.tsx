import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--navy)] text-white px-6">
      <div className="text-center">
        <p className="text-kicker">404</p>
        <h1 className="font-serif text-3xl md:text-4xl mt-4">Page not found</h1>
        <p className="mt-3 text-white/60">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-8 inline-flex btn-glass">
          Return home
        </Link>
      </div>
    </div>
  );
}
