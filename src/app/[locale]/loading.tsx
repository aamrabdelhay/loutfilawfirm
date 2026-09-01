export default function LocaleLoading() {
  return (
    <div className="bg-[var(--warm-white)]">
      <div className="bg-[var(--navy)] px-5 md:px-10 lg:px-16 pt-36 pb-20">
        <div className="h-3 w-28 rounded-full bg-white/15 animate-pulse" />
        <div className="mt-6 h-12 md:h-16 w-64 rounded-xl bg-white/10 animate-pulse" />
        <div className="mt-6 h-4 w-96 max-w-full rounded bg-white/10 animate-pulse" />
      </div>
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 py-16 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-[var(--radius-medium)] border border-[rgba(22,26,32,0.08)] bg-white p-7">
            <div className="h-10 w-10 rounded-full bg-[var(--gold)]/30" />
            <div className="mt-5 h-6 w-3/4 rounded bg-[rgba(22,26,32,0.1)]" />
            <div className="mt-3 h-4 w-full rounded bg-[rgba(22,26,32,0.08)]" />
            <div className="mt-2 h-4 w-2/3 rounded bg-[rgba(22,26,32,0.08)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
