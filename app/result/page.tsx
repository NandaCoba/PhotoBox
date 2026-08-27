"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PhotoStrip } from "@/components/PhotoStrip";
import { PhotoThumbnail } from "@/components/PhotoThumbnail";
import { ResultEditor } from "@/components/ResultEditor";
import { renderPhotoStrip } from "@/components/PhotoStripCanvas";
import { sessionStorageKey } from "@/lib/options";
import type { BoothSession } from "@/lib/types";

const fallbackSession: BoothSession = {
  photos: [],
  filter: "original",
  layout: "classic",
  timer: 3,
  captureCount: 4,
  paper: "white",
  paperDecoration: "plain",
  caption: "",
  showDate: true,
};

export default function ResultPage() {
  const router = useRouter();
  const [session, setSession] = useState<BoothSession>(() => {
    if (typeof window === "undefined") return fallbackSession;
    const raw = window.sessionStorage.getItem(sessionStorageKey);
    if (!raw) return fallbackSession;
    try {
      return { ...fallbackSession, ...(JSON.parse(raw) as BoothSession) };
    } catch {
      return fallbackSession;
    }
  });
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState(() => {
    if (typeof window === "undefined") return "";
    const raw = window.sessionStorage.getItem(sessionStorageKey);
    if (!raw) return "";
    try {
      JSON.parse(raw);
      return "";
    } catch {
      return "photo session could not be opened.";
    }
  });
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(session));
  }, [session]);

  const dateName = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const update = <Key extends keyof BoothSession>(key: Key, value: BoothSession[Key]) => {
    setSession((current) => ({ ...current, [key]: value }));
  };

  const download = useCallback(async () => {
    if (!session.photos.length) {
      setError("take photos before downloading.");
      return;
    }
    setIsRendering(true);
    setError("");
    try {
      const dataUrl = await renderPhotoStrip(session);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `photobox-${dateName}.png`;
      link.click();
    } catch {
      setError("strip could not be rendered yet.");
    } finally {
      setIsRendering(false);
    }
  }, [dateName, session]);

  const print = useCallback(() => {
    if (!session.photos.length) {
      setError("take photos before printing.");
      return;
    }
    window.print();
  }, [session.photos.length]);

  const retakeSelected = () => {
    const next = { ...session, photos: session.photos.filter((_, index) => index !== selectedPhoto) };
    window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(next));
    router.push("/booth");
  };

  const retakeAll = () => {
    window.sessionStorage.removeItem(sessionStorageKey);
    router.push("/booth");
  };

  return (
    <main className="print-room booth-shell">
      <div className="mx-auto grid max-w-6xl gap-8">
        <header className="no-print flex items-center justify-between">
          <Link href="/" className="font-stamp text-sm font-bold">
            PHOTOBOX
          </Link>
          <span className="font-stamp text-xs text-[#706b61]">print room</span>
        </header>

        {!session.photos.length ? (
          <section className="mx-auto grid max-w-md gap-5 text-center">
            <h1 className="text-3xl font-semibold lowercase">no strip yet.</h1>
            <p className="text-[#706b61]">start a session first, then your photos will show up here.</p>
            <Link href="/booth" className="tactile mx-auto border border-[#171717] bg-[#171717] px-6 py-3 lowercase text-[#f4f1ea]">
              enter booth
            </Link>
          </section>
        ) : (
          <section className="grid items-start gap-10 lg:grid-cols-[minmax(280px,520px)_1fr]">
            <div className="grid justify-items-center gap-5">
              <PhotoStrip
                session={session}
                className={
                  session.layout === "grid"
                    ? "w-[min(86vw,420px)]"
                    : session.layout === "double"
                      ? "w-[min(90vw,460px)]"
                      : "w-[min(72vw,300px)]"
                }
              />
              <div className="no-print flex flex-wrap justify-center gap-2">
                {Array.from({ length: session.captureCount }).map((_, index) => (
                  <PhotoThumbnail
                    key={index}
                    src={session.photos[index]}
                    index={index}
                    selected={selectedPhoto === index}
                    onClick={() => setSelectedPhoto(index)}
                  />
                ))}
              </div>
            </div>

            <aside className="grid gap-7">
              <ResultEditor
                paper={session.paper}
                paperDecoration={session.paperDecoration}
                layout={session.layout}
                filter={session.filter}
                caption={session.caption ?? ""}
                showDate={session.showDate}
                onPaperChange={(value) => update("paper", value)}
                onPaperDecorationChange={(value) => update("paperDecoration", value)}
                onLayoutChange={(value) => update("layout", value)}
                onFilterChange={(value) => update("filter", value)}
                onCaptionChange={(value) => update("caption", value)}
                onShowDateChange={(value) => update("showDate", value)}
              />
              {error ? <p className="no-print text-sm lowercase text-[#823a2b]">{error}</p> : null}
              <div className="no-print flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={download}
                  disabled={isRendering}
                  className="tactile border border-[#171717] bg-[#171717] px-5 py-3 lowercase text-[#f4f1ea] disabled:opacity-50"
                >
                  {isRendering ? "rendering..." : "download"}
                </button>
                <button type="button" onClick={print} className="tactile border border-[#171717] bg-[#fdfcf7] px-5 py-3 lowercase">
                  print
                </button>
                <button type="button" onClick={retakeSelected} className="border border-[#c9c2b4] bg-[#f4f1ea] px-5 py-3 lowercase">
                  retake
                </button>
                <button type="button" onClick={retakeAll} className="border border-[#c9c2b4] bg-[#f4f1ea] px-5 py-3 lowercase">
                  retake all
                </button>
              </div>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
}
