"use client";

import { BuilderPrice } from "@/components/cake-builder/BuilderPrice";
import { BuilderProgress } from "@/components/cake-builder/BuilderProgress";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

export function BuilderHeader() {
  const { goBack, currentStepId } = useCakeBuilder();

  return (
    <header className="sticky top-0 z-10 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 bg-cream/95 px-4 py-3 backdrop-blur-sm md:px-8">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex min-h-11 min-w-0 items-center gap-2 justify-self-start rounded-sm text-left text-sm font-medium tracking-[0.14em] text-chocolate uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
        aria-label="Volver"
      >
        <span aria-hidden="true">←</span>
        <span className="truncate">Arma tu torta</span>
      </button>
      <BuilderPrice />
      {currentStepId !== "intro" ? (
        <div className="col-span-2 flex justify-end">
          <BuilderProgress />
        </div>
      ) : null}
    </header>
  );
}
