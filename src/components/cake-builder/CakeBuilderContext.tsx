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
import { createCakeOrder } from "@/lib/orders";
import { calculateCakePrice } from "@/lib/pricing";
import {
  EMPTY_CAKE_CONFIGURATION,
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
  price: number;
  currentStep: BuilderStep;
  currentStepId: BuilderStepId;
  builderStepNumber: number | null;
  builderStepCount: number;
  canContinue: boolean;
  isOrderFormOpen: boolean;
  submittedOrder: CakeOrder | null;
  setSize: (size: CakeSizeId) => void;
  setSponge: (sponge: CakeSpongeId) => void;
  setFilling: (filling: CakeFillingId) => void;
  setCoverage: (coverage: CakeCoverageId) => void;
  toggleTopping: (topping: CakeToppingId) => void;
  goNext: () => void;
  goBack: () => void;
  openOrderForm: () => void;
  closeOrderForm: () => void;
  submitOrder: (
    input: Omit<CreateCakeOrderInput, "cake">,
  ) => CakeOrder | null;
  resetBuilder: () => void;
};

const CakeBuilderContext = createContext<CakeBuilderContextValue | null>(null);

function canContinueFromStep(
  stepId: BuilderStepId,
  configuration: CakeConfiguration,
) {
  switch (stepId) {
    case "intro":
    case "toppings":
    case "preview":
      return true;
    case "size":
      return configuration.size !== null;
    case "sponge":
      return configuration.sponge !== null;
    case "filling":
      return configuration.filling !== null;
    case "coverage":
      return configuration.coverage !== null;
  }
}

export function CakeBuilderProvider({ children }: { children: ReactNode }) {
  const [configuration, setConfiguration] = useState<CakeConfiguration>(
    EMPTY_CAKE_CONFIGURATION,
  );
  const [currentStepId, setCurrentStepId] = useState<BuilderStepId>("intro");
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CakeOrder | null>(null);

  const price = useMemo(
    () => calculateCakePrice(configuration),
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
      const alreadySelected = current.toppings.includes(topping);
      return {
        ...current,
        toppings: alreadySelected
          ? current.toppings.filter((item) => item !== topping)
          : [...current.toppings, topping],
      };
    });
  }, []);

  const goNext = useCallback(() => {
    const index = BUILDER_STEPS.findIndex((step) => step.id === currentStepId);
    const next = BUILDER_STEPS[index + 1];
    if (!next || !canContinueFromStep(currentStepId, configuration)) {
      return;
    }
    setCurrentStepId(next.id);
  }, [configuration, currentStepId]);

  const goBack = useCallback(() => {
    if (isOrderFormOpen && !submittedOrder) {
      setIsOrderFormOpen(false);
      return;
    }

    const index = BUILDER_STEPS.findIndex((step) => step.id === currentStepId);
    const previous = BUILDER_STEPS[index - 1];
    if (previous) {
      setCurrentStepId(previous.id);
    }
  }, [currentStepId, isOrderFormOpen, submittedOrder]);

  const openOrderForm = useCallback(() => {
    if (!isCompleteCakeConfiguration(configuration)) {
      return;
    }
    setIsOrderFormOpen(true);
  }, [configuration]);

  const closeOrderForm = useCallback(() => {
    if (submittedOrder) {
      return;
    }
    setIsOrderFormOpen(false);
  }, [submittedOrder]);

  const submitOrder = useCallback(
    (input: Omit<CreateCakeOrderInput, "cake">) => {
      if (!isCompleteCakeConfiguration(configuration)) {
        return null;
      }

      const order = createCakeOrder({
        cake: configuration,
        ...input,
      });
      setSubmittedOrder(order);
      return order;
    },
    [configuration],
  );

  const resetBuilder = useCallback(() => {
    setConfiguration(EMPTY_CAKE_CONFIGURATION);
    setCurrentStepId("intro");
    setIsOrderFormOpen(false);
    setSubmittedOrder(null);
  }, []);

  const value = useMemo<CakeBuilderContextValue>(
    () => ({
      configuration,
      price,
      currentStep,
      currentStepId,
      builderStepNumber,
      builderStepCount: PROGRESS_STEP_COUNT,
      canContinue: canContinueFromStep(currentStepId, configuration),
      isOrderFormOpen,
      submittedOrder,
      setSize,
      setSponge,
      setFilling,
      setCoverage,
      toggleTopping,
      goNext,
      goBack,
      openOrderForm,
      closeOrderForm,
      submitOrder,
      resetBuilder,
    }),
    [
      builderStepNumber,
      closeOrderForm,
      configuration,
      currentStep,
      currentStepId,
      goBack,
      goNext,
      isOrderFormOpen,
      openOrderForm,
      price,
      resetBuilder,
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
