"use client";

type ChoiceCardProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  color: string;
  imageSrc?: string;
  selectionMode?: "single" | "multiple";
  dense?: boolean;
  disabled?: boolean;
};

export function ChoiceCard({
  label,
  selected,
  onSelect,
  color,
  imageSrc,
  selectionMode = "single",
  dense = false,
  disabled = false,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selectionMode === "multiple" ? selected : undefined}
      aria-checked={selectionMode === "single" ? selected : undefined}
      role={selectionMode === "single" ? "radio" : undefined}
      className={`choice-chip flex shrink-0 flex-col items-center rounded-lg border text-center transition-[border-color,background-color,transform] duration-200 motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta ${
        dense ? "gap-1 px-1 py-1" : "gap-1 px-1.5 py-1.5"
      } ${
        selected
          ? "scale-100 border-terracotta bg-white shadow-[0_1px_6px_rgb(214_90_58_/_0.16)]"
          : "border-border/80 bg-white/70"
      } ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
    >
      <span
        className={`overflow-hidden rounded-full border border-chocolate/10 bg-cover bg-center ${
          dense ? "h-7 w-7" : "h-8 w-8"
        }`}
        style={{
          backgroundColor: color,
          backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
        }}
        aria-hidden="true"
      />
      <span
        className={`font-semibold tracking-[0.08em] text-chocolate uppercase ${
          dense ? "text-[0.55rem]" : "text-[0.6rem]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
