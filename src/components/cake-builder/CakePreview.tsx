"use client";

import { CakeLayer } from "@/components/cake-builder/CakeLayer";
import { CakeTopping } from "@/components/cake-builder/CakeTopping";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import {
  getCoverageOption,
  getFillingOption,
  getSizeOption,
  getSpongeOption,
} from "@/config/cake-options";

export function CakePreview() {
  const { configuration } = useCakeBuilder();
  const size = configuration.size
    ? getSizeOption(configuration.size)
    : undefined;
  const sponge = configuration.sponge
    ? getSpongeOption(configuration.sponge)
    : undefined;
  const filling =
    configuration.filling === "none" || configuration.filling === "tres-leches"
      ? undefined
      : getFillingOption(configuration.filling);
  const coverage = configuration.coverage
    ? getCoverageOption(configuration.coverage)
    : undefined;

  const scale = size?.scale ?? 0.72;
  const description = [
    size?.label,
    sponge?.label,
    filling ? `relleno de ${filling.label}` : null,
    coverage ? `cobertura de ${coverage.label}` : null,
    configuration.toppings.length
      ? `${configuration.toppings.length} toppings`
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className="flex w-full min-w-0 items-center justify-center"
      role="img"
      aria-label={
        description
          ? `Vista de tu torta: ${description}`
          : "Vista inicial de tu torta"
      }
    >
      <div
        className="relative aspect-square w-[min(72vw,280px)] max-w-full md:w-[320px]"
        style={{ transform: `scale(${scale})` }}
      >
        <CakeLayer
          layer="base"
          color={sponge?.visual.placeholderColor ?? "#E8D5B5"}
        />
        <CakeLayer
          layer="filling"
          color={filling?.visual.placeholderColor ?? "#D7C4A8"}
          visible={Boolean(filling)}
        />
        <CakeLayer
          layer="coverage"
          color={coverage?.visual.placeholderColor ?? "#F7F1E8"}
          visible={Boolean(coverage)}
        />
        {configuration.toppings.map((toppingId, index) => (
          <CakeTopping
            key={toppingId}
            toppingId={toppingId}
            index={index}
            total={configuration.toppings.length}
          />
        ))}
      </div>
    </div>
  );
}
