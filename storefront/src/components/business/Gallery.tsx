"use client";

import { useEffect, useState } from "react";
import {
  Cancel01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  PlayIcon,
} from "hugeicons-react";
import type { GalleryItem } from "@/data/dummy";

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
          <button
            key={item.thumb + i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative h-24 w-24 overflow-hidden rounded-lg bg-violet-50"
          >
            <img
              src={item.thumb}
              alt={item.caption}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {item.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-violet-600">
                  <PlayIcon size={16} />
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <Cancel01Icon size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-8"
          >
            <ArrowLeft01Icon size={22} />
          </button>

          <div
            className="max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {active.type === "image" ? (
              <img
                src={active.src}
                alt={active.caption}
                className="max-h-[80vh] w-auto rounded-lg object-contain"
              />
            ) : (
              <video
                src={active.src}
                controls
                autoPlay
                className="max-h-[80vh] w-auto rounded-lg bg-black"
              />
            )}
            <p className="mt-3 text-center text-sm text-white/80">{active.caption}</p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-8"
          >
            <ArrowRight01Icon size={22} />
          </button>
        </div>
      )}
    </>
  );
}
