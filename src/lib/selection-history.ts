import { PROGRESS_STEPS, type BuilderStepId } from "@/config/builder-steps";
import {
  getCoverageOption,
  getFillingOption,
  getSizeOption,
  getSpongeOption,
  getToppingOption,
} from "@/config/cake-options";
import type { CakeConfiguration } from "@/types/cake";

export type SelectionHistoryItem = {
  id: BuilderStepId;
  imageSrc: string | null;
  placeholderColor: string | null;
  tooltip: string | null;
  isCurrent: boolean;
};

const SIZE_TOOLTIPS = {
  "half-pound": "½ libra",
  "one-pound": "1 libra",
} as const;

export function getSelectionHistory(
  configuration: CakeConfiguration,
  currentStepId: BuilderStepId,
): SelectionHistoryItem[] {
  return PROGRESS_STEPS.filter((step) => step.id !== "preview").map((step) => {
    const isCurrent = step.id === currentStepId;

    if (step.id === "size" && configuration.size) {
      const option = getSizeOption(configuration.size);
      return {
        id: step.id,
        imageSrc: option?.image ?? option?.visual.imageSrc ?? null,
        placeholderColor: option?.visual.placeholderColor ?? null,
        tooltip: SIZE_TOOLTIPS[configuration.size],
        isCurrent,
      };
    }

    if (step.id === "sponge" && configuration.sponge) {
      const option = getSpongeOption(configuration.sponge);
      return {
        id: step.id,
        imageSrc: option?.visual.imageSrc ?? null,
        placeholderColor: option?.visual.placeholderColor ?? null,
        tooltip: option?.label ?? null,
        isCurrent,
      };
    }

    if (step.id === "filling" && configuration.filling) {
      const option = getFillingOption(configuration.filling);
      return {
        id: step.id,
        imageSrc: option?.visual.imageSrc ?? null,
        placeholderColor: option?.visual.placeholderColor ?? null,
        tooltip: option?.label ?? null,
        isCurrent,
      };
    }

    if (step.id === "coverage" && configuration.coverage) {
      const option = getCoverageOption(configuration.coverage);
      return {
        id: step.id,
        imageSrc: option?.visual.imageSrc ?? null,
        placeholderColor: option?.visual.placeholderColor ?? null,
        tooltip: option?.label ?? null,
        isCurrent,
      };
    }

    if (step.id === "toppings" && configuration.toppings.length > 0) {
      const toppings = configuration.toppings
        .map((id) => getToppingOption(id))
        .filter((option) => option != null);
      const first = toppings[0];

      return {
        id: step.id,
        imageSrc: first?.visual.imageSrc ?? null,
        placeholderColor: first?.visual.placeholderColor ?? null,
        tooltip: toppings.map((option) => option.label).join(", ") || null,
        isCurrent,
      };
    }

    return {
      id: step.id,
      imageSrc: null,
      placeholderColor: null,
      tooltip: null,
      isCurrent,
    };
  });
}
