"use client";

import { layouts } from "@/lib/options";
import type { LayoutType } from "@/lib/types";

type LayoutSelectorProps = {
  value: LayoutType;
  onChange: (value: LayoutType) => void;
  disabled?: boolean;
};

export function LayoutSelector({ value, onChange, disabled }: LayoutSelectorProps) {
  return (
    <label className="grid gap-1 text-xs lowercase text-[#706b61]">
      layout
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as LayoutType)}
        className="border border-[#c9c2b4] bg-[#fdfcf7] px-3 py-2 text-sm text-[#171717]"
      >
        {layouts.map((layout) => (
          <option key={layout.id} value={layout.id}>
            {layout.label}
          </option>
        ))}
      </select>
    </label>
  );
}
