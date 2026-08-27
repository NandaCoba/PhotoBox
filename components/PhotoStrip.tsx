"use client";

import { papers } from "@/lib/options";
import type { BoothSession, PaperDecorationType } from "@/lib/types";

type PhotoStripProps = {
  session: BoothSession;
  className?: string;
};

function PaperDecoration({ type, ink }: { type: PaperDecorationType; ink: string }) {
  if (type === "plain") return null;

  if (type === "stamp") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="font-stamp absolute right-3 top-4 rotate-6 border px-2 py-1 text-[9px] uppercase opacity-35"
          style={{ borderColor: ink, color: ink }}
        >
          PHOTOBOX
        </div>
        <div
          className="font-stamp absolute bottom-24 left-3 -rotate-6 border px-2 py-1 text-[8px] uppercase opacity-25"
          style={{ borderColor: ink, color: ink }}
        >
          keep
        </div>
      </div>
    );
  }

  if (type === "hearts") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 opacity-35" aria-hidden="true">
        {[12, 34, 58, 82].map((top, index) => (
          <span
            key={top}
            className="absolute h-2.5 w-2.5 rotate-45 rounded-[2px]"
            style={{
              top: `${top}%`,
              left: index % 2 ? "84%" : "9%",
              backgroundColor: ink,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "tape") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <span className="absolute -left-3 top-8 h-6 w-16 -rotate-12 bg-[#e2ded3]/75" />
        <span className="absolute -right-3 bottom-28 h-6 w-16 -rotate-12 bg-[#e2ded3]/75" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 font-stamp text-[8px] opacity-30" style={{ color: ink }} aria-hidden="true">
      <span className="absolute left-2 top-4 [writing-mode:vertical-rl]">PHOTOBOX 27</span>
      <span className="absolute bottom-24 right-2 [writing-mode:vertical-rl]">400TX / 04</span>
    </div>
  );
}

export function PhotoStrip({ session, className = "" }: PhotoStripProps) {
  const paper = papers.find((item) => item.id === session.paper) ?? papers[0];
  const photos = session.layout === "double" ? session.photos.slice(0, 4) : session.photos;
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
    .format(new Date())
    .replaceAll("/", " · ");

  const photoNode = (src: string, index: number, extra = "") => (
    <div key={`${src}-${index}`} className={`overflow-hidden bg-white ${extra}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`captured photo ${index + 1}`} className={`h-full w-full object-cover filter-${session.filter}`} />
    </div>
  );

  return (
    <figure
      className={`paper-texture print-only-strip relative mx-auto grid overflow-hidden shadow-[0_24px_45px_rgba(23,23,23,.2)] ${className}`}
      style={{ backgroundColor: paper.color, color: paper.ink }}
      aria-label="photo strip preview"
    >
      <PaperDecoration type={session.paperDecoration ?? "plain"} ink={paper.ink} />
      {session.layout === "grid" ? (
        <div className="relative z-20 grid grid-cols-2 gap-3 p-5 pb-3">
          {photos.slice(0, 4).map((src, index) => photoNode(src, index, "aspect-[4/5]"))}
        </div>
      ) : session.layout === "double" ? (
        <div className="relative z-20 grid grid-cols-2 gap-3 p-4 pb-3">
          {[0, 1].map((column) => (
            <div key={column} className="grid gap-2">
              {photos.slice(0, 4).map((src, index) => photoNode(src, index + column * 4, "aspect-[4/5]"))}
            </div>
          ))}
        </div>
      ) : session.layout === "polaroid" ? (
        <div className="relative z-20 grid gap-3 p-5 pb-3">
          {photos[0] ? photoNode(photos[0], 0, "aspect-[4/5]") : null}
          <div className="grid grid-cols-3 gap-2">
            {photos.slice(1, 4).map((src, index) => photoNode(src, index + 1, "aspect-square"))}
          </div>
        </div>
      ) : (
        <div className="relative z-20 grid gap-3 p-5 pb-3">
          {photos.slice(0, 4).map((src, index) => photoNode(src, index, "aspect-[4/5]"))}
        </div>
      )}
      <figcaption className="relative z-20 grid gap-1 px-5 pb-6 pt-2 text-center">
        <strong className="text-lg uppercase">{session.caption?.trim() || "PHOTOBOX"}</strong>
        {session.showDate ? <span className="font-stamp text-xs">{date}</span> : null}
        <span className="font-stamp text-[10px] lowercase opacity-75">little moments, kept.</span>
      </figcaption>
    </figure>
  );
}
