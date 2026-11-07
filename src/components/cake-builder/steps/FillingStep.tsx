"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionsCarousel } from "@/components/cake-builder/OptionsCarousel";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { CAKE_FILLINGS } from "@/config/cake-options";

export function FillingStep() {
  const { configuration, setFilling } = useCakeBuilder();

  return (
    <OptionsCarousel label="Relleno">
      {CAKE_FILLINGS.map((option) => (
        <ChoiceCard
          key={option.id}
          label={option.label}
          color={option.visual.placeholderColor}
          imageSrc={
            option.visual.imageSrc.startsWith(
              "/images/crea-tu-torta/fillings/",
            )
              ? option.visual.imageSrc
              : undefined
          }
          selected={configuration.filling === option.id}
          onSelect={() => setFilling(option.id)}
        />
      ))}
    </OptionsCarousel>
  );
}
