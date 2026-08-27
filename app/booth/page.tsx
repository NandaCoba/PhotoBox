"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CameraControls } from "@/components/CameraControls";
import { CameraPreview } from "@/components/CameraPreview";
import { FilterSelector } from "@/components/FilterSelector";
import { PhotoThumbnail } from "@/components/PhotoThumbnail";
import { ShutterButton } from "@/components/ShutterButton";
import { filters, sessionStorageKey } from "@/lib/options";
import { useCamera } from "@/hooks/useCamera";
import { usePhotoSession } from "@/hooks/usePhotoSession";
import type { BoothSession } from "@/lib/types";

export default function BoothPage() {
  const router = useRouter();
  const camera = useCamera();
  const photoSession = usePhotoSession();
  const {
    capture,
    devices,
    error,
    isReady,
    isSupported,
    selectedDeviceId,
    setSelectedDeviceId,
    start,
    videoRef,
  } = camera;
  const { session, setters } = photoSession;

  const finishSession = useCallback(
    (nextSession: BoothSession) => {
      window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(nextSession));
      router.push("/result");
    },
    [router],
  );

  const begin = useCallback(() => {
    if (!isReady) {
      void start(selectedDeviceId || undefined);
      return;
    }
    void photoSession.startSession(capture, finishSession);
  }, [capture, finishSession, isReady, photoSession, selectedDeviceId, start]);

  const cycleFilter = useCallback(() => {
    const index = filters.findIndex((filter) => filter.id === session.filter);
    const next = filters[(index + 1) % filters.length];
    setters.setFilter(next.id);
  }, [session.filter, setters]);

  useEffect(() => {
    void start();
  }, [start]);

  useEffect(() => {
    if (!selectedDeviceId) return;
    void start(selectedDeviceId);
  }, [selectedDeviceId, start]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT") return;
      if (event.code === "Space") {
        event.preventDefault();
        begin();
      }
      if (event.key.toLowerCase() === "r") photoSession.retakeAll();
      if (event.key.toLowerCase() === "f") cycleFilter();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [begin, cycleFilter, photoSession]);

  return (
    <main className="booth-shell">
      <div className="mx-auto grid max-w-6xl gap-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="font-stamp text-sm font-bold">
            PHOTOBOX
          </Link>
          <span className="font-stamp text-xs text-[#706b61]">session 01</span>
        </header>

        <CameraPreview
          videoRef={videoRef}
          filter={session.filter}
          isReady={isReady}
          error={error}
          countdown={photoSession.countdown}
          flash={photoSession.flash}
          message={photoSession.message}
          onStartCamera={() => void start(selectedDeviceId || undefined)}
        />

        <section className="grid gap-5">
          <FilterSelector value={session.filter} onChange={setters.setFilter} disabled={photoSession.isRunning} />
          <CameraControls
            captureCount={session.captureCount}
            timer={session.timer}
            layout={session.layout}
            devices={devices}
            selectedDeviceId={selectedDeviceId}
            disabled={photoSession.isRunning}
            onCaptureCountChange={setters.setCaptureCount}
            onTimerChange={setters.setTimer}
            onLayoutChange={setters.setLayout}
            onCameraChange={setSelectedDeviceId}
          />
          <div className="grid justify-items-center gap-4">
            <ShutterButton
              onClick={begin}
              disabled={!isSupported || photoSession.isRunning}
              label={isReady ? "start session" : "open camera"}
            />
            <div className="flex gap-2">
              {Array.from({ length: session.captureCount }).map((_, index) => (
                <PhotoThumbnail key={index} src={session.photos[index]} index={index} />
              ))}
            </div>
          </div>
        </section>

        <p className="font-stamp text-center text-xs text-[#706b61]">space starts. f changes filter. your photos stay here.</p>
      </div>
    </main>
  );
}
