import {
  BUILDER_STEP_IDS,
  PROGRESS_STEPS,
  type BuilderStepId,
} from "@/config/builder-steps";
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
  const stepIndex = (id: BuilderStepId) => BUILDER_STEP_IDS.indexOf(id);

  return PROGRESS_STEPS.map((step) => {
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

    // "Sin relleno" is preselected, so it only counts as a choice once the
    // customer has moved past the filling step.
    const fillingChosen =
      configuration.filling !== "none" ||
      stepIndex(currentStepId) > stepIndex("filling");

    if (step.id === "filling" && fillingChosen) {
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
