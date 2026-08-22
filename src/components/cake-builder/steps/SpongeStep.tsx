"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionButton } from "@/components/ui/OptionButton";
import { CAKE_SPONGES } from "@/config/cake-options";

export function SpongeStep() {
  const { configuration, setSponge } = useCakeBuilder();

  return (
    <fieldset className="min-w-0">
      <legend className="font-display mb-4 text-2xl text-chocolate">Ponqué</legend>
      <div role="radiogroup" aria-label="Ponqué" className="grid grid-cols-1 gap-3">
        {CAKE_SPONGES.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            color={option.visual.placeholderColor}
            selected={configuration.sponge === option.id}
            onSelect={() => setSponge(option.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}
