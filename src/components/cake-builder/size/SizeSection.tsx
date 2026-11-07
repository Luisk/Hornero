"use client";

import { SizeCard } from "@/components/cake-builder/SizeCard";
import { OptionsCarousel } from "@/components/cake-builder/OptionsCarousel";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { CAKE_SIZES } from "@/config/cake-options";

export function SizeSection() {
  const { configuration, setSize } = useCakeBuilder();

  return (
    <OptionsCarousel label="Tamaño">
      {CAKE_SIZES.map((option) => (
        <SizeCard
          key={option.id}
          option={option}
          selected={configuration.size === option.id}
          onSelect={() => setSize(option.id)}
        />
      ))}
    </OptionsCarousel>
  );
}
