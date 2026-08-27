"use client";

import { filters, layouts, paperDecorations, papers } from "@/lib/options";
import type { FilterType, LayoutType, PaperDecorationType, PaperType } from "@/lib/types";

type ResultEditorProps = {
  paper: PaperType;
  paperDecoration: PaperDecorationType;
  layout: LayoutType;
  filter: FilterType;
  caption: string;
  showDate: boolean;
  onPaperChange: (paper: PaperType) => void;
  onPaperDecorationChange: (decoration: PaperDecorationType) => void;
  onLayoutChange: (layout: LayoutType) => void;
  onFilterChange: (filter: FilterType) => void;
  onCaptionChange: (caption: string) => void;
  onShowDateChange: (show: boolean) => void;
};

export function ResultEditor({
  paper,
  paperDecoration,
  layout,
  filter,
  caption,
  showDate,
  onPaperChange,
  onPaperDecorationChange,
  onLayoutChange,
  onFilterChange,
  onCaptionChange,
  onShowDateChange,
}: ResultEditorProps) {
  return (
    <div className="no-print grid gap-6">
      <div className="grid gap-2">
        <p className="text-sm lowercase text-[#706b61]">paper</p>
        <div className="flex flex-wrap gap-2">
          {papers.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onPaperChange(item.id)}
              className={`flex items-center gap-2 border px-3 py-2 text-sm lowercase ${
                paper === item.id ? "border-[#171717] bg-[#171717] text-[#f4f1ea]" : "border-[#c9c2b4] bg-[#f4f1ea]"
              }`}
            >
              <span className="h-4 w-4 border border-[#171717]/40" style={{ backgroundColor: item.color }} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <p className="text-sm lowercase text-[#706b61]">paper detail</p>
        <div className="flex flex-wrap gap-2">
          {paperDecorations.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onPaperDecorationChange(item.id)}
              className={`border px-3 py-2 text-sm lowercase ${
                paperDecoration === item.id ? "border-[#171717] bg-[#171717] text-[#f4f1ea]" : "border-[#c9c2b4] bg-[#f4f1ea]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <label className="grid gap-2 text-sm lowercase text-[#706b61]">
        layout
        <select
          value={layout}
          onChange={(event) => onLayoutChange(event.target.value as LayoutType)}
          className="border border-[#c9c2b4] bg-[#fdfcf7] px-3 py-3 text-[#171717]"
        >
          {layouts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm lowercase text-[#706b61]">
        filter
        <select
          value={filter}
          onChange={(event) => onFilterChange(event.target.value as FilterType)}
          className="border border-[#c9c2b4] bg-[#fdfcf7] px-3 py-3 text-[#171717]"
        >
          {filters.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm lowercase text-[#706b61]">
        caption
        <input
          value={caption}
          maxLength={30}
          onChange={(event) => onCaptionChange(event.target.value)}
          placeholder="summer '26"
          className="border border-[#c9c2b4] bg-[#fdfcf7] px-3 py-3 text-[#171717] placeholder:text-[#8b8579]"
        />
      </label>
      <label className="flex items-center gap-3 text-sm lowercase text-[#171717]">
        <input type="checkbox" checked={showDate} onChange={(event) => onShowDateChange(event.target.checked)} />
        show date
      </label>
    </div>
  );
}
