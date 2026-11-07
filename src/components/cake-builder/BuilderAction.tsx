"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { ChevronLeftIcon } from "@/components/ui/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/ui/ChevronRightIcon";

export function BackPill() {
  const { currentStepId, goBack } = useCakeBuilder();
  const canGoBack = currentStepId !== "size" && currentStepId !== "intro";

  return (
    <button
      type="button"
      onClick={goBack}
      disabled={!canGoBack}
      className="builder-pill builder-pill-back"
      aria-label="Atrás"
    >
      <ChevronLeftIcon className="h-6 w-6" />
    </button>
  );
}

export function NextPill() {
  const { canContinue, goNext } = useCakeBuilder();

  return (
    <button
      type="button"
      onClick={goNext}
      // aria-disabled (not disabled) so a blocked tap can show guidance.
      aria-disabled={!canContinue}
      className="builder-pill builder-pill-next"
      aria-label="Continuar"
    >
      <ChevronRightIcon className="h-6 w-6" />
    </button>
  );
}

export function BuilderAction() {
  return (
    <>
      <BackPill />
      <NextPill />
    </>
  );
}
