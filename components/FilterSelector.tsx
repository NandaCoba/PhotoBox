"use client";

import { filters } from "@/lib/options";
import type { FilterType } from "@/lib/types";

type FilterSelectorProps = {
  value: FilterType;
  onChange: (value: FilterType) => void;
  disabled?: boolean;
};

export function FilterSelector({ value, onChange, disabled }: FilterSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" aria-label="filter">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(filter.id)}
          className={`shrink-0 border px-3 py-2 text-sm lowercase transition ${
            value === filter.id
              ? "border-[#171717] bg-[#171717] text-[#f4f1ea]"
              : "border-[#c9c2b4] bg-[#f4f1ea] text-[#171717] hover:border-[#171717]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
