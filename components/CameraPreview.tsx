"use client";

import type { RefObject } from "react";
import type { FilterType } from "@/lib/types";
import { CountdownOverlay } from "./CountdownOverlay";

type CameraPreviewProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  filter: FilterType;
  isReady: boolean;
  error: string;
  countdown: number | null;
  flash: boolean;
  message: string;
  onStartCamera: () => void;
};

export function CameraPreview({
  videoRef,
  filter,
  isReady,
  error,
  countdown,
  flash,
  message,
  onStartCamera,
}: CameraPreviewProps) {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl overflow-hidden border border-[#171717] bg-[#201f1c] shadow-[0_22px_50px_rgba(23,23,23,.18)]">
      <video
        ref={videoRef}
        className={`h-full w-full scale-x-[-1] object-cover filter-${filter}`}
        playsInline
        muted
        aria-label="camera preview"
      />
      {!isReady ? (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-[#f4f1ea]">
          <div className="grid max-w-sm gap-4">
            <p className="text-xl lowercase">{error || "camera is waiting."}</p>
            <button
              type="button"
              onClick={onStartCamera}
              className="tactile mx-auto border border-[#171717] bg-[#fdfcf7] px-5 py-3 text-sm lowercase text-[#171717]"
            >
              open camera
            </button>
          </div>
        </div>
      ) : null}
      {isReady ? <CountdownOverlay countdown={countdown} flash={flash} message={message} /> : null}
    </div>
  );
}
