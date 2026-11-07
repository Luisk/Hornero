"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionsCarousel } from "@/components/cake-builder/OptionsCarousel";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { CAKE_COVERAGES } from "@/config/cake-options";

export function CoverageStep() {
  const { configuration, setCoverage } = useCakeBuilder();

  return (
    <OptionsCarousel label="Cobertura">
      {CAKE_COVERAGES.map((option) => (
        <ChoiceCard
          key={option.id}
          label={option.label}
          color={option.visual.placeholderColor}
          imageSrc={
            option.visual.imageSrc.startsWith(
              "/images/crea-tu-torta/coverage/",
            )
              ? option.visual.imageSrc
              : undefined
          }
          selected={configuration.coverage === option.id}
          onSelect={() => setCoverage(option.id)}
        />
      ))}
    </OptionsCarousel>
  );
}
