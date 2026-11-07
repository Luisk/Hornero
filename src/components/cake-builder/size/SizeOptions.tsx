"use client";

import { SizeCard } from "@/components/cake-builder/SizeCard";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { CAKE_SIZES } from "@/config/cake-options";

export function SizeOptions() {
  const { configuration, setSize } = useCakeBuilder();

  return (
    <div
      role="radiogroup"
      aria-label="Tamaño"
      className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 md:mt-10 md:gap-6"
    >
      {CAKE_SIZES.map((option) => (
        <SizeCard
          key={option.id}
          option={option}
          selected={configuration.size === option.id}
          onSelect={() => setSize(option.id)}
        />
      ))}
    </div>
  );
}
