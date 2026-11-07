"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionsCarousel } from "@/components/cake-builder/OptionsCarousel";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import {
  getToppingsByCategory,
  TOPPING_CATEGORIES,
} from "@/config/cake-options";
import { MAX_CAKE_TOPPINGS } from "@/types/cake";

export function ToppingsStep() {
  const { configuration, toggleTopping } = useCakeBuilder();
  const atMax = configuration.toppings.length >= MAX_CAKE_TOPPINGS;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-script px-4 text-center text-[1.25rem] leading-tight text-chocolate/75">
        Selecciona hasta dos opciones
      </p>
      <OptionsCarousel label="Toppings" align="start" selectionMode="multiple">
        {TOPPING_CATEGORIES.flatMap((category) =>
          getToppingsByCategory(category.id).map((option) => {
            const selected = configuration.toppings.includes(option.id);

            return (
              <ChoiceCard
                key={option.id}
                label={option.label}
                color={option.visual.placeholderColor}
                imageSrc={
                  option.visual.imageSrc.startsWith(
                    "/images/crea-tu-torta/toppings/",
                  )
                    ? option.visual.imageSrc
                    : undefined
                }
                selected={selected}
                onSelect={() => toggleTopping(option.id)}
                selectionMode="multiple"
                dense
                disabled={atMax && !selected}
              />
            );
          }),
        )}
      </OptionsCarousel>
    </div>
  );
}
