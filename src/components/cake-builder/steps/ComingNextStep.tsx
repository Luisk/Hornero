"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

export function ComingNextStep() {
  const { currentStep, builderStepNumber } = useCakeBuilder();

  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-5xl flex-col justify-center px-6 py-16">
      <p className="font-display text-2xl text-chocolate md:text-3xl">
        Step {builderStepNumber} — {currentStep.title}
      </p>
      <p className="mt-3 text-base text-chocolate/65">Coming next...</p>
    </section>
  );
}
