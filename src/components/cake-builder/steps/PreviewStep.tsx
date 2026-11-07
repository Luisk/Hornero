"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

export function PreviewStep() {
  const { openOrderForm } = useCakeBuilder();

  return (
    <div className="preview-order-cta">
      <button
        type="button"
        onClick={openOrderForm}
        className="inline-flex min-h-[52px] min-w-44 items-center justify-center rounded-md bg-terracotta px-8 text-sm font-medium tracking-[0.2em] text-cream-light transition-colors duration-200 hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chocolate"
      >
        PÍDELA AHORA
      </button>
    </div>
  );
}
