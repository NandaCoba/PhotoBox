"use client";

type PhotoThumbnailProps = {
  src?: string;
  index: number;
  selected?: boolean;
  onClick?: () => void;
};

export function PhotoThumbnail({ src, index, selected, onClick }: PhotoThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid aspect-square w-16 place-items-center overflow-hidden border text-xs font-bold ${
        selected ? "border-[#b45b42] bg-[#f7dbe2]" : "border-[#c9c2b4] bg-[#fdfcf7]"
      }`}
      aria-label={`photo ${index + 1}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`photo ${index + 1}`} className="h-full w-full object-cover" />
      ) : (
        <span>{String(index + 1).padStart(2, "0")}</span>
      )}
    </button>
  );
}
