"use client";

import { useEffect, useRef, useState } from "react";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { getSelectionHistory } from "@/lib/selection-history";

export function BuilderProgress() {
  const { configuration, currentStepId, builderStepNumber } = useCakeBuilder();
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const items = getSelectionHistory(configuration, currentStepId);

  useEffect(() => {
    if (!openTooltip) {
      return;
    }

    const dismiss = (event: PointerEvent) => {
      if (!rowRef.current?.contains(event.target as Node)) {
        setOpenTooltip(null);
      }
    };

    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [openTooltip]);

  if (builderStepNumber === null) {
    return null;
  }

  return (
    <div className="selection-history-row">
      <div
        ref={rowRef}
        className="selection-history"
        aria-label="Selección de tu torta"
      >
        {items.map((item) => {
          const filled = Boolean(item.imageSrc || item.placeholderColor);
          const isOpen = openTooltip === item.id;
          const circleClass = `selection-history-circle${
            item.isCurrent ? " is-current" : ""
          }${filled ? " is-filled" : ""}`;

          return (
            <div
              key={item.id}
              className={`selection-history-item${isOpen ? " is-open" : ""}`}
            >
              {filled ? (
                <button
                  type="button"
                  className={circleClass}
                  aria-label={item.tooltip ?? undefined}
                  aria-current={item.isCurrent ? "step" : undefined}
                  aria-expanded={isOpen}
                  onClick={() => {
                    if (window.matchMedia("(hover: hover)").matches) {
                      return;
                    }
                    setOpenTooltip((current) =>
                      current === item.id ? null : item.id,
                    );
                  }}
                >
                  <span
                    key={`${item.id}-${item.imageSrc ?? "color"}`}
                    className="selection-history-thumb"
                    style={{
                      backgroundColor: item.placeholderColor ?? undefined,
                      backgroundImage: item.imageSrc
                        ? `url(${item.imageSrc})`
                        : undefined,
                    }}
                  />
                </button>
              ) : (
                <span
                  className={circleClass}
                  aria-current={item.isCurrent ? "step" : undefined}
                />
              )}
              {filled && item.tooltip ? (
                <span className="selection-history-tooltip" role="tooltip">
                  {item.tooltip}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
