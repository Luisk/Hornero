"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

export function BuilderProgress() {
  const { builderStepNumber, builderStepCount } = useCakeBuilder();

  if (builderStepNumber === null) {
    return null;
  }

  return (
    <p
      className="text-xs tracking-[0.16em] text-chocolate/55"
      aria-label={`Paso ${builderStepNumber} de ${builderStepCount}`}
    >
      {builderStepNumber} / {builderStepCount}
    </p>
  );
}
