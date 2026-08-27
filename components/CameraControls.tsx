"use client";

import { captureCounts, timers } from "@/lib/options";
import type { CameraDevice, LayoutType } from "@/lib/types";
import { LayoutSelector } from "./LayoutSelector";

type CameraControlsProps = {
  captureCount: number;
  timer: number;
  layout: LayoutType;
  devices: CameraDevice[];
  selectedDeviceId: string;
  disabled?: boolean;
  onCaptureCountChange: (value: number) => void;
  onTimerChange: (value: number) => void;
  onLayoutChange: (value: LayoutType) => void;
  onCameraChange: (deviceId: string) => void;
};

export function CameraControls({
  captureCount,
  timer,
  layout,
  devices,
  selectedDeviceId,
  disabled,
  onCaptureCountChange,
  onTimerChange,
  onLayoutChange,
  onCameraChange,
}: CameraControlsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <label className="grid gap-1 text-xs lowercase text-[#706b61]">
        photos
        <select
          value={captureCount}
          disabled={disabled}
          onChange={(event) => onCaptureCountChange(Number(event.target.value))}
          className="border border-[#c9c2b4] bg-[#fdfcf7] px-3 py-2 text-sm text-[#171717]"
        >
          {captureCounts.map((count) => (
            <option key={count} value={count}>
              {count} photo{count > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-xs lowercase text-[#706b61]">
        timer
        <select
          value={timer}
          disabled={disabled}
          onChange={(event) => onTimerChange(Number(event.target.value))}
          className="border border-[#c9c2b4] bg-[#fdfcf7] px-3 py-2 text-sm text-[#171717]"
        >
          {timers.map((seconds) => (
            <option key={seconds} value={seconds}>
              {seconds} sec
            </option>
          ))}
        </select>
      </label>
      <LayoutSelector value={layout} onChange={onLayoutChange} disabled={disabled} />
      <label className="grid gap-1 text-xs lowercase text-[#706b61]">
        camera
        <select
          value={selectedDeviceId}
          disabled={disabled || devices.length < 2}
          onChange={(event) => onCameraChange(event.target.value)}
          className="border border-[#c9c2b4] bg-[#fdfcf7] px-3 py-2 text-sm text-[#171717]"
        >
          {devices.length ? (
            devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))
          ) : (
            <option value="">front camera</option>
          )}
        </select>
      </label>
    </div>
  );
}
