"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

export function BuilderAction() {
  const { canContinue, currentStepId, goNext, openOrderForm } = useCakeBuilder();
  const isFinalStep = currentStepId === "preview";

  return (
    <div className="sticky bottom-0 bg-cream/95 px-4 py-4 backdrop-blur-sm md:px-8">
      <button
        type="button"
        onClick={isFinalStep ? openOrderForm : goNext}
        disabled={!canContinue}
        className="flex min-h-12 w-full items-center justify-center rounded-sm bg-terracotta px-5 text-sm font-medium tracking-[0.18em] text-cream uppercase transition-colors duration-200 enabled:hover:bg-terracotta/90 disabled:cursor-not-allowed disabled:bg-chocolate/20 disabled:text-cream/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chocolate motion-reduce:transition-none"
      >
        {isFinalStep ? "Pedir mi torta" : "Continuar →"}
      </button>
    </div>
  );
}
