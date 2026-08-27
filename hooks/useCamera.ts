"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CameraDevice } from "@/lib/types";

const friendlyCameraError = (error: unknown) => {
  if (!(error instanceof DOMException)) return "camera could not start.";
  if (error.name === "NotAllowedError") {
    return "camera access is off. allow camera access in your browser to use the booth.";
  }
  if (error.name === "NotFoundError") return "no camera found on this device.";
  if (error.name === "NotReadableError") return "your camera is busy in another app.";
  return "camera could not start.";
};

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isReady, setIsReady] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsReady(false);
  }, []);

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = mediaDevices
      .filter((device) => device.kind === "videoinput")
      .map((device, index) => ({
        deviceId: device.deviceId,
        label: device.label || `camera ${index + 1}`,
      }));
    setDevices(videoDevices);
    setSelectedDeviceId((current) => current || videoDevices[0]?.deviceId || "");
  }, []);

  const start = useCallback(
    async (deviceId?: string) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setIsSupported(false);
        setError("this browser does not support camera access.");
        return;
      }

      stop();
      setError("");
      try {
        const constraints: MediaStreamConstraints = {
          video: deviceId
            ? { deviceId: { exact: deviceId } }
            : { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
          audio: false,
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setIsReady(true);
        await refreshDevices();
      } catch (captureError) {
        setError(friendlyCameraError(captureError));
        setIsReady(false);
      }
    },
    [refreshDevices, stop],
  );

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return "";
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.92);
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  useEffect(() => {
    const onDeviceChange = () => void refreshDevices();
    navigator.mediaDevices?.addEventListener?.("devicechange", onDeviceChange);
    return () => navigator.mediaDevices?.removeEventListener?.("devicechange", onDeviceChange);
  }, [refreshDevices]);

  return {
    videoRef,
    devices,
    selectedDeviceId,
    setSelectedDeviceId,
    error,
    isReady,
    isSupported,
    start,
    stop,
    capture,
  };
}
