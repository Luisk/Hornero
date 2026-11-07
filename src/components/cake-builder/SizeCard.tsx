"use client";

import { CheckIcon } from "@/components/ui/CheckIcon";
import { UserIcon } from "@/components/ui/UserIcon";
import { UsersIcon } from "@/components/ui/UsersIcon";
import type { CakeSizeOption } from "@/config/cake-options";

type SizeCardProps = {
  option: CakeSizeOption;
  selected: boolean;
  onSelect: () => void;
};

const SIZE_COPY = {
  "half-pound": { amount: "½", servings: "4-6" },
  "one-pound": { amount: "1", servings: "8-12" },
} as const;

export function SizeCard({ option, selected, onSelect }: SizeCardProps) {
  const copy = SIZE_COPY[option.id];

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${copy.amount} libra, ${copy.servings} personas`}
      onClick={onSelect}
      className={`relative flex w-[5.75rem] shrink-0 flex-col items-center rounded-lg border px-2 pt-2.5 pb-2 text-center transition-[border-color,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta ${
        selected
          ? "border-terracotta bg-white shadow-[0_1px_6px_rgb(214_90_58_/_0.16)]"
          : "border-border/80 bg-white/70"
      }`}
    >
      {selected ? (
        <span className="absolute top-1.5 right-1.5 text-terracotta">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
      ) : null}
      <span className="font-display text-[2rem] leading-none font-medium text-chocolate">
        {copy.amount}
      </span>
      <span className="mt-0.5 text-[0.68rem] tracking-[0.16em] text-chocolate/80">
        libra
      </span>
      <span className="mt-1.5 flex items-center justify-center gap-1 text-[0.7rem] font-bold text-chocolate">
        {option.id === "one-pound" ? (
          <UsersIcon className="h-3.5 w-3.5 shrink-0" />
        ) : (
          <UserIcon className="h-3.5 w-3.5 shrink-0" />
        )}
        {copy.servings}
      </span>
    </button>
  );
}
