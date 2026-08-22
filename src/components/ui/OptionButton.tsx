"use client";

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  color: string;
  selectionMode?: "single" | "multiple";
};

export function OptionButton({
  label,
  selected,
  onSelect,
  color,
  selectionMode = "single",
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selectionMode === "multiple" ? selected : undefined}
      aria-checked={selectionMode === "single" ? selected : undefined}
      role={selectionMode === "single" ? "radio" : undefined}
      className={`flex min-h-11 min-w-0 items-center gap-3 rounded-sm border px-3 py-2 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta motion-reduce:transition-none ${
        selected
          ? "border-terracotta bg-white text-chocolate"
          : "border-chocolate/15 bg-cream-soft text-chocolate/80"
      }`}
    >
      <span
        className="h-8 w-8 shrink-0 rounded-full border border-chocolate/10"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="truncate text-sm font-medium tracking-wide">{label}</span>
    </button>
  );
}
