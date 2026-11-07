"use client";

import { BackPill, NextPill } from "@/components/cake-builder/BuilderAction";
import { BuilderProgress } from "@/components/cake-builder/BuilderProgress";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { SizeSection } from "@/components/cake-builder/size/SizeSection";
import { CoverageStep } from "@/components/cake-builder/steps/CoverageStep";
import { FillingStep } from "@/components/cake-builder/steps/FillingStep";
import { PreviewStep } from "@/components/cake-builder/steps/PreviewStep";
import { SpongeStep } from "@/components/cake-builder/steps/SpongeStep";
import { ToppingsStep } from "@/components/cake-builder/steps/ToppingsStep";

export function StepPanel() {
  const { currentStep, currentStepId } = useCakeBuilder();

  return (
    <section className="cake-configurator-options">
      <div className="cake-configurator-copy">
        <h2 className="font-display text-[2.625rem] leading-none font-medium text-chocolate max-[740px]:text-[2.25rem] md:text-5xl">
          {currentStep.question}
        </h2>
        {currentStep.support ? (
          <p className="font-script mx-auto mt-2 max-w-[16rem] text-[1.5rem] leading-tight text-chocolate/80 max-[740px]:text-[1.25rem] md:max-w-none md:text-3xl">
            {currentStep.support}
          </p>
        ) : null}
        <BuilderProgress />
      </div>
      <nav className="cake-configurator-side-nav" aria-label="Navegación del configurador">
        <BackPill />
        <NextPill />
      </nav>
      <div className="cake-configurator-choices">
        {currentStepId === "size" ? <SizeSection /> : null}
        {currentStepId === "sponge" ? <SpongeStep /> : null}
        {currentStepId === "filling" ? <FillingStep /> : null}
        {currentStepId === "coverage" ? <CoverageStep /> : null}
        {currentStepId === "toppings" ? <ToppingsStep /> : null}
        {currentStepId === "preview" ? <PreviewStep /> : null}
      </div>
    </section>
  );
}
