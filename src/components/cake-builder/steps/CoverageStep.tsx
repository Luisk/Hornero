"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionButton } from "@/components/ui/OptionButton";
import { CAKE_COVERAGES } from "@/config/cake-options";

export function CoverageStep() {
  const { configuration, setCoverage } = useCakeBuilder();

  return (
    <fieldset className="min-w-0">
      <legend className="font-display mb-4 text-2xl text-chocolate">
        Cobertura
      </legend>
      <div
        role="radiogroup"
        aria-label="Cobertura"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {CAKE_COVERAGES.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            color={option.visual.placeholderColor}
            selected={configuration.coverage === option.id}
            onSelect={() => setCoverage(option.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}
