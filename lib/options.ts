import type { FilterType, LayoutType, PaperDecorationType, PaperType } from "./types";

export const filters: { id: FilterType; label: string; canvas: string }[] = [
  { id: "original", label: "original", canvas: "none" },
  { id: "bw", label: "b&w", canvas: "grayscale(1)" },
  { id: "mono", label: "mono", canvas: "grayscale(1) contrast(1.25)" },
  { id: "warm", label: "warm", canvas: "sepia(.2) saturate(1.18) hue-rotate(-8deg) contrast(1.04)" },
  { id: "cool", label: "cool", canvas: "saturate(1.05) hue-rotate(9deg) contrast(1.03)" },
  { id: "vintage", label: "vintage", canvas: "sepia(.34) saturate(.76) contrast(1.04)" },
  { id: "film", label: "film", canvas: "sepia(.14) saturate(1.08) contrast(.95) brightness(1.02)" },
  { id: "fade", label: "fade", canvas: "saturate(.72) contrast(.82) brightness(1.08)" },
];

export const layouts: { id: LayoutType; label: string }[] = [
  { id: "classic", label: "classic strip" },
  { id: "double", label: "double strip" },
  { id: "grid", label: "grid" },
  { id: "polaroid", label: "polaroid" },
];

export const papers: { id: PaperType; label: string; color: string; ink: string }[] = [
  { id: "white", label: "white", color: "#fdfcf7", ink: "#171717" },
  { id: "cream", label: "cream", color: "#fbf4df", ink: "#171717" },
  { id: "black", label: "black", color: "#151515", ink: "#f4f1ea" },
  { id: "soft-pink", label: "soft pink", color: "#f7dbe2", ink: "#171717" },
  { id: "soft-blue", label: "soft blue", color: "#dceaf1", ink: "#171717" },
];

export const paperDecorations: { id: PaperDecorationType; label: string }[] = [
  { id: "plain", label: "plain" },
  { id: "stamp", label: "date stamp" },
  { id: "hearts", label: "tiny hearts" },
  { id: "tape", label: "corner tape" },
  { id: "film", label: "film marks" },
];

export const captureCounts = [1, 2, 3, 4, 6] as const;
export const timers = [3, 5, 10] as const;

export const sessionStorageKey = "photobox-session";
