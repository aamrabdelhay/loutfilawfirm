export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-48 rounded bg-[rgba(22,26,32,0.1)]" />
      <div className="mt-2 h-4 w-64 rounded bg-[rgba(22,26,32,0.08)]" />
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="admin-surface p-5">
            <div className="h-9 w-9 rounded-full bg-[rgba(168,137,82,0.2)]" />
            <div className="mt-4 h-8 w-16 rounded bg-[rgba(22,26,32,0.1)]" />
            <div className="mt-2 h-3 w-24 rounded bg-[rgba(22,26,32,0.08)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
