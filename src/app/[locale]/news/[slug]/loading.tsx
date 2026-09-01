export default function NewsDetailLoading() {
  return (
    <div className="bg-[var(--warm-white)] animate-pulse">
      <div className="bg-[var(--navy)] px-5 md:px-10 lg:px-16 pt-36 pb-20">
        <div className="h-3 w-40 rounded bg-white/15" />
        <div className="mt-8 h-12 md:h-20 w-3/4 rounded bg-white/10" />
        <div className="mt-6 h-4 w-full max-w-2xl rounded bg-white/10" />
      </div>
      <div className="max-w-[820px] mx-auto px-5 py-16">
        <div className="h-48 rounded-[var(--radius-large)] bg-[rgba(22,26,32,0.08)]" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded bg-[rgba(22,26,32,0.08)]" />
          <div className="h-4 w-full rounded bg-[rgba(22,26,32,0.08)]" />
          <div className="h-4 w-2/3 rounded bg-[rgba(22,26,32,0.08)]" />
        </div>
      </div>
    </div>
  );
}
