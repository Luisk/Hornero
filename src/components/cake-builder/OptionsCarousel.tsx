import type { ReactNode } from "react";

type OptionsCarouselProps = {
  label: string;
  children: ReactNode;
  align?: "center" | "start";
  selectionMode?: "single" | "multiple";
};

export function OptionsCarousel({
  label,
  children,
  align = "center",
  selectionMode = "single",
}: OptionsCarouselProps) {
  return (
    <div
      role={selectionMode === "multiple" ? "group" : "radiogroup"}
      aria-label={label}
      className={`options-carousel${align === "start" ? " is-start" : ""}`}
    >
      {children}
    </div>
  );
}
