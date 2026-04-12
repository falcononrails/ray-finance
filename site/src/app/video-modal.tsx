"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

export function VideoModal({
  youtubeId,
  children,
}: {
  youtubeId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </button>
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={close}
          >
            <div
              className="relative w-full max-w-4xl mx-4 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-medium cursor-pointer"
              >
                Close
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title="Demo video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full rounded-xl"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
