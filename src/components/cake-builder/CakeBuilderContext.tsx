"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BUILDER_STEPS,
  PROGRESS_STEP_COUNT,
  getBuilderStep,
  getProgressNumber,
  type BuilderStep,
  type BuilderStepId,
} from "@/config/builder-steps";
import { getCakeVisual, type CakeVisual } from "@/lib/cake-visuals";
import { openHorneroWhatsApp } from "@/lib/communications";
import { createCakeOrder } from "@/lib/orders";
import { calculateCakePrice } from "@/lib/pricing";
import {
  DEFAULT_CAKE_FILLING,
  EMPTY_CAKE_CONFIGURATION,
  MAX_CAKE_TOPPINGS,
  isCompleteCakeConfiguration,
  type CakeConfiguration,
  type CakeCoverageId,
  type CakeFillingId,
  type CakeSizeId,
  type CakeSpongeId,
  type CakeToppingId,
} from "@/types/cake";
import type { CakeOrder, CreateCakeOrderInput } from "@/types/order";

type CakeBuilderContextValue = {
  configuration: CakeConfiguration;
  cakeVisual: CakeVisual;
  price: number;
  currentStep: BuilderStep;
  currentStepId: BuilderStepId;
  builderStepNumber: number | null;
  builderStepCount: number;
  canContinue: boolean;
  /** True after a blocked "Continuar" on the current step, until it's valid. */
  showSelectionHint: boolean;
  /** Increments on every blocked attempt (replays the hint animation). */
  selectionHintAttempt: number;
  isOrderFormOpen: boolean;
  submittedOrder: CakeOrder | null;
  setSize: (size: CakeSizeId) => void;
  setSponge: (sponge: CakeSpongeId) => void;
  setFilling: (filling: CakeFillingId) => void;
  setCoverage: (coverage: CakeCoverageId) => void;
  toggleTopping: (topping: CakeToppingId) => void;
  goNext: () => void;
  goBack: () => void;
  /** Leaves the intro for Step 1. Safe to call more than once. */
  completeIntro: () => void;
  closeOrderForm: () => void;
  /** Creates the order and hands it to WhatsApp. True only once delivered. */
  submitOrder: (input: Omit<CreateCakeOrderInput, "cake">) => boolean;
  resetBuilder: () => void;
};

const CakeBuilderContext = createContext<CakeBuilderContextValue | null>(null);

function canContinueFromStep(
  stepId: BuilderStepId,
  configuration: CakeConfiguration,
) {
  switch (stepId) {
    // Filling defaults to "Sin relleno" and toppings are optional.
    case "intro":
    case "filling":
    case "toppings":
      return true;
    case "size":
      return configuration.size !== null;
    case "sponge":
      return configuration.sponge !== null;
    case "coverage":
      return configuration.coverage !== null;
  }
}

export function CakeBuilderProvider({ children }: { children: ReactNode }) {
  const [configuration, setConfiguration] = useState<CakeConfiguration>(
    EMPTY_CAKE_CONFIGURATION,
  );
  const [currentStepId, setCurrentStepId] = useState<BuilderStepId>("intro");
  // Step where the customer tried to continue without a required choice.
  const [hintStepId, setHintStepId] = useState<BuilderStepId | null>(null);
  const [selectionHintAttempt, setSelectionHintAttempt] = useState(0);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CakeOrder | null>(null);

  const price = useMemo(
    () => calculateCakePrice(configuration),
    [configuration],
  );
  const cakeVisual = useMemo(
    () => getCakeVisual(configuration),
    [configuration],
  );

  const currentStep = getBuilderStep(currentStepId);
  const builderStepNumber = getProgressNumber(currentStepId);

  const setSize = useCallback((size: CakeSizeId) => {
    setConfiguration((current) => ({ ...current, size }));
  }, []);

  const setSponge = useCallback((sponge: CakeSpongeId) => {
    setConfiguration((current) => ({ ...current, sponge }));
  }, []);

  const setFilling = useCallback((filling: CakeFillingId) => {
    setConfiguration((current) => ({ ...current, filling }));
  }, []);

  const setCoverage = useCallback((coverage: CakeCoverageId) => {
    setConfiguration((current) => ({ ...current, coverage }));
  }, []);

  const toggleTopping = useCallback((topping: CakeToppingId) => {
    setConfiguration((current) => {
      if (current.toppings.includes(topping)) {
        return {
          ...current,
          toppings: current.toppings.filter((item) => item !== topping),
        };
      }

      if (current.toppings.length >= MAX_CAKE_TOPPINGS) {
        return current;
      }

      return {
        ...current,
        toppings: [...current.toppings, topping],
      };
    });
  }, []);

  const goNext = useCallback(() => {
    if (isOrderFormOpen) {
      return;
    }

    if (!canContinueFromStep(currentStepId, configuration)) {
      setHintStepId(currentStepId);
      setSelectionHintAttempt((count) => count + 1);
      return;
    }

    const index = BUILDER_STEPS.findIndex((step) => step.id === currentStepId);
    const next = BUILDER_STEPS[index + 1];

    if (!next) {
      // Continuing from the last step opens checkout. This runs only from the
      // click handler (never from an effect), and setting the flag is
      // idempotent, so re-renders cannot open the modal twice.
      if (isCompleteCakeConfiguration(configuration)) {
        setIsOrderFormOpen(true);
      }
      return;
    }

    setHintStepId(null);
    setCurrentStepId(next.id);
  }, [configuration, currentStepId, isOrderFormOpen]);

  const completeIntro = useCallback(() => {
    setCurrentStepId((current) => (current === "intro" ? "size" : current));
  }, []);

  const goBack = useCallback(() => {
    if (isOrderFormOpen && !submittedOrder) {
      setIsOrderFormOpen(false);
      return;
    }

    const index = BUILDER_STEPS.findIndex((step) => step.id === currentStepId);
    const previous = BUILDER_STEPS[index - 1];
    if (!previous || previous.id === "intro") {
      return;
    }

    setConfiguration((current) => {
      switch (currentStepId) {
        case "sponge":
          return {
            ...current,
            sponge: null,
            filling: DEFAULT_CAKE_FILLING,
            coverage: null,
            toppings: [],
          };
        case "filling":
          return {
            ...current,
            filling: DEFAULT_CAKE_FILLING,
            coverage: null,
            toppings: [],
          };
        case "coverage":
          return { ...current, coverage: null, toppings: [] };
        case "toppings":
          return { ...current, toppings: [] };
        default:
          return current;
      }
    });
    setHintStepId(null);
    setCurrentStepId(previous.id);
  }, [currentStepId, isOrderFormOpen, submittedOrder]);

  const closeOrderForm = useCallback(() => {
    if (submittedOrder) {
      return;
    }
    setIsOrderFormOpen(false);
  }, [submittedOrder]);

  const submitOrder = useCallback(
    (input: Omit<CreateCakeOrderInput, "cake">) => {
      if (submittedOrder || !isCompleteCakeConfiguration(configuration)) {
        return false;
      }

      const order = createCakeOrder({
        cake: configuration,
        ...input,
      });

      // Only report success once the order reached Hornero's WhatsApp.
      if (!openHorneroWhatsApp(order)) {
        return false;
      }

      setSubmittedOrder(order);
      return true;
    },
    [configuration, submittedOrder],
  );

  const resetBuilder = useCallback(() => {
    setConfiguration(EMPTY_CAKE_CONFIGURATION);
    setCurrentStepId("intro");
    setHintStepId(null);
    setIsOrderFormOpen(false);
    setSubmittedOrder(null);
  }, []);

  const canContinue = canContinueFromStep(currentStepId, configuration);

  const value = useMemo<CakeBuilderContextValue>(
    () => ({
      configuration,
      cakeVisual,
      price,
      currentStep,
      currentStepId,
      builderStepNumber,
      builderStepCount: PROGRESS_STEP_COUNT,
      canContinue,
      // Derived from existing validation: hides as soon as a choice is made.
      showSelectionHint: hintStepId === currentStepId && !canContinue,
      selectionHintAttempt,
      isOrderFormOpen,
      submittedOrder,
      setSize,
      setSponge,
      setFilling,
      setCoverage,
      toggleTopping,
      goNext,
      goBack,
      completeIntro,
      closeOrderForm,
      submitOrder,
      resetBuilder,
    }),
    [
      builderStepNumber,
      cakeVisual,
      canContinue,
      closeOrderForm,
      completeIntro,
      configuration,
      currentStep,
      currentStepId,
      goBack,
      goNext,
      hintStepId,
      isOrderFormOpen,
      price,
      resetBuilder,
      selectionHintAttempt,
      setCoverage,
      setFilling,
      setSize,
      setSponge,
      submitOrder,
      submittedOrder,
      toggleTopping,
    ],
  );

  return (
    <CakeBuilderContext.Provider value={value}>
      {children}
    </CakeBuilderContext.Provider>
  );
}

export function useCakeBuilder() {
  const context = use(CakeBuilderContext);
  if (!context) {
    throw new Error("useCakeBuilder must be used within CakeBuilderProvider");
  }
  return context;
}
