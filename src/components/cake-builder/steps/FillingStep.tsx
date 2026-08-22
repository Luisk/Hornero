"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionButton } from "@/components/ui/OptionButton";
import { CAKE_FILLINGS } from "@/config/cake-options";

export function FillingStep() {
  const { configuration, setFilling } = useCakeBuilder();

  return (
    <fieldset className="min-w-0">
      <legend className="font-display mb-4 text-2xl text-chocolate">Relleno</legend>
      <div
        role="radiogroup"
        aria-label="Relleno"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {CAKE_FILLINGS.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            color={option.visual.placeholderColor}
            selected={configuration.filling === option.id}
            onSelect={() => setFilling(option.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}
