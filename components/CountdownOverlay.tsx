type CountdownOverlayProps = {
  countdown: number | null;
  flash: boolean;
  message: string;
};

export function CountdownOverlay({ countdown, flash, message }: CountdownOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      {flash ? <div className="absolute inset-0 bg-white opacity-90" /> : null}
      {countdown ? (
        <div className="grid h-32 w-32 place-items-center rounded-full border border-white/70 bg-black/40 text-7xl font-bold text-white shadow-2xl backdrop-blur-sm">
          {countdown}
        </div>
      ) : (
        <div className="absolute bottom-5 rounded-full bg-black/55 px-4 py-2 text-sm lowercase text-white backdrop-blur-sm">
          {message}
        </div>
      )}
    </div>
  );
}
