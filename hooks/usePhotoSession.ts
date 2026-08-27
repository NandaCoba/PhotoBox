"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BoothSession, FilterType, LayoutType, PaperType } from "@/lib/types";

type Phase = "idle" | "countdown" | "capturing" | "waiting" | "completed";

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export function usePhotoSession(initial?: Partial<BoothSession>) {
  const [photos, setPhotos] = useState<string[]>(initial?.photos ?? []);
  const [filter, setFilter] = useState<FilterType>(initial?.filter ?? "original");
  const [layout, setLayout] = useState<LayoutType>(initial?.layout ?? "classic");
  const [timer, setTimer] = useState(initial?.timer ?? 3);
  const [captureCount, setCaptureCount] = useState(initial?.captureCount ?? 4);
  const [paper, setPaper] = useState<PaperType>(initial?.paper ?? "white");
  const [paperDecoration, setPaperDecoration] = useState(initial?.paperDecoration ?? "plain");
  const [caption, setCaption] = useState(initial?.caption ?? "");
  const [showDate, setShowDate] = useState(initial?.showDate ?? true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [message, setMessage] = useState("ready?");
  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(false);

  const session: BoothSession = {
    photos,
    filter,
    layout,
    timer,
    captureCount,
    paper,
    paperDecoration,
    caption,
    showDate,
  };

  const pulseFlash = useCallback(async () => {
    setFlash(true);
    await wait(110);
    setFlash(false);
  }, []);

  const runCountdown = useCallback(async () => {
    setPhase("countdown");
    for (let value = timer; value > 0; value -= 1) {
      setCountdown(value);
      await wait(1000);
    }
    setCountdown(null);
  }, [timer]);

  const startSession = useCallback(
    async (capture: () => string, onComplete: (nextSession: BoothSession) => void) => {
      if (runningRef.current) return;
      runningRef.current = true;
      setIsRunning(true);
      setPhotos([]);
      let nextPhotos: string[] = [];
      setMessage("ready?");

      for (let index = 0; index < captureCount; index += 1) {
        await runCountdown();
        setPhase("capturing");
        await pulseFlash();
        const image = capture();
        if (image) {
          nextPhotos = [...nextPhotos, image];
          setPhotos(nextPhotos);
          setMessage(`photo ${index + 1} captured`);
        }
        if (index < captureCount - 1) {
          setPhase("waiting");
          await wait(1400);
        }
      }

      setPhase("completed");
      setMessage("that's a wrap.");
      await wait(900);
      runningRef.current = false;
      setIsRunning(false);
      onComplete({
        photos: nextPhotos,
        filter,
        layout,
        timer,
        captureCount,
        paper,
        paperDecoration,
        caption,
        showDate,
      });
    },
    [caption, captureCount, filter, layout, paper, paperDecoration, pulseFlash, runCountdown, showDate, timer],
  );

  const retakeAll = useCallback(() => {
    if (runningRef.current) return;
    setPhotos([]);
    setPhase("idle");
    setMessage("ready?");
  }, []);

  const changeCaptureCount = useCallback((nextCount: number) => {
    setCaptureCount(nextCount);
    setPhotos((current) => current.slice(0, nextCount));
  }, []);

  return {
    session,
    setters: {
      setPhotos,
      setFilter,
      setLayout,
      setTimer,
      setCaptureCount: changeCaptureCount,
      setPaper,
      setPaperDecoration,
      setCaption,
      setShowDate,
    },
    phase,
    countdown,
    flash,
    message,
    isRunning,
    startSession,
    retakeAll,
  };
}
