"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const FALLBACK_GALLERY: ReadonlyArray<{ src: string; alt: string; placeholder: boolean }> = [
  { src: "/images/gallery-1.jpg", alt: "Visual placeholder", placeholder: true },
  { src: "/images/gallery-2.jpg", alt: "Visual placeholder", placeholder: true },
  { src: "/images/gallery-3.jpg", alt: "Visual placeholder", placeholder: true },
  { src: "/images/gallery-4.jpg", alt: "Visual placeholder", placeholder: true },
  { src: "/images/architecture-2.jpg", alt: "Editorial visual placeholder", placeholder: true },
  { src: "/images/architecture.jpg", alt: "Editorial visual placeholder", placeholder: true }
];

export function OfficeGallery({
  items = FALLBACK_GALLERY
}: {
  items?: ReadonlyArray<{ src: string; alt: string; placeholder?: boolean }>;
}) {
  const IMAGES = items.length ? items : FALLBACK_GALLERY;
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((v) => (v === null ? null : (v + 1) % IMAGES.length));
      if (e.key === "ArrowLeft") setActive((v) => (v === null ? null : (v - 1 + IMAGES.length) % IMAGES.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-medium)] border border-[rgba(255,255,255,0.12)]"
            aria-label={`${img.alt} — ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-[rgba(11,18,32,0.05)] group-hover:bg-[rgba(11,18,32,0.12)] transition-colors" />
            {img.placeholder ? (
              <span className="absolute bottom-3 start-3 rounded-full border border-white/25 bg-[rgba(11,18,32,0.55)] backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wider text-white/85">
                Visual placeholder
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[80] bg-[rgba(11,18,32,0.92)] backdrop-blur flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={IMAGES[active].alt}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-5 end-5 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X size={18} className="mx-auto" />
          </button>
          <button
            type="button"
            className="absolute start-4 md:start-8 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setActive((v) => (v === null ? null : (v - 1 + IMAGES.length) % IMAGES.length));
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="mx-auto rtl:rotate-180" />
          </button>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] xl:aspect-[3/2] overflow-hidden rounded-[var(--radius-large)]">
              <Image src={IMAGES[active].src} alt={IMAGES[active].alt} fill sizes="90vw" className="object-contain" />
            </div>
            <p className="mt-4 text-center text-white/60 text-sm">{IMAGES[active].alt}</p>
          </div>
          <button
            type="button"
            className="absolute end-4 md:end-8 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setActive((v) => (v === null ? null : (v + 1) % IMAGES.length));
            }}
            aria-label="Next"
          >
            <ChevronRight size={20} className="mx-auto rtl:rotate-180" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
