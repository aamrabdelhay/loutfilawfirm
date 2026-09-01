import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  intro,
  children
}: {
  kicker: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-[var(--navy)] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,137,82,0.35),transparent_55%)]" />
      </div>
      <div className="relative max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 pt-36 pb-20">
        <span className="inline-flex items-center gap-3 text-kicker text-[var(--gold-soft)]">
          <span className="eyebrow-line" />
          {kicker}
        </span>
        <h1 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.02] max-w-3xl">{title}</h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed">{intro}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
