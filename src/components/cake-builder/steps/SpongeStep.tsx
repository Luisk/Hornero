"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionsCarousel } from "@/components/cake-builder/OptionsCarousel";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { CAKE_SPONGES } from "@/config/cake-options";

export function SpongeStep() {
  const { configuration, setSponge } = useCakeBuilder();

  return (
    <OptionsCarousel label="Ponqué">
      {CAKE_SPONGES.map((option) => (
        <ChoiceCard
          key={option.id}
          label={option.label}
          color={option.visual.placeholderColor}
          imageSrc={option.visual.imageSrc}
          selected={configuration.sponge === option.id}
          onSelect={() => setSponge(option.id)}
        />
      ))}
    </OptionsCarousel>
  );
}
