"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { OptionButton } from "@/components/ui/OptionButton";
import {
  getToppingsByCategory,
  TOPPING_CATEGORIES,
} from "@/config/cake-options";

export function ToppingsStep() {
  const { configuration, toggleTopping } = useCakeBuilder();

  return (
    <div className="min-w-0">
      <h2 className="font-display mb-1 text-2xl text-chocolate">Toppings</h2>
      <p className="mb-4 text-sm text-chocolate/70">Puedes elegir varios.</p>
      <div className="flex flex-col gap-5">
        {TOPPING_CATEGORIES.map((category) => (
          <fieldset key={category.id} className="min-w-0">
            <legend className="mb-3 text-xs tracking-[0.16em] text-olive uppercase">
              {category.label}
            </legend>
            <div
              role="group"
              aria-label={category.label}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {getToppingsByCategory(category.id).map((option) => (
                <OptionButton
                  key={option.id}
                  label={option.label}
                  color={option.visual.placeholderColor}
                  selected={configuration.toppings.includes(option.id)}
                  onSelect={() => toggleTopping(option.id)}
                  selectionMode="multiple"
                />
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
