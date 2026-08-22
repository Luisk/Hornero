"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionButton } from "@/components/ui/OptionButton";
import { CAKE_SIZES } from "@/config/cake-options";

export function SizeStep() {
  const { configuration, setSize } = useCakeBuilder();

  return (
    <fieldset className="min-w-0">
      <legend className="font-display mb-4 text-2xl text-chocolate">Tamaño</legend>
      <div role="radiogroup" aria-label="Tamaño" className="grid grid-cols-1 gap-3">
        {CAKE_SIZES.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            color={option.visual.placeholderColor}
            selected={configuration.size === option.id}
            onSelect={() => setSize(option.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}
