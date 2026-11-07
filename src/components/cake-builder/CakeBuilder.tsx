"use client";

import { BuilderHeader } from "@/components/cake-builder/BuilderHeader";
import { CakeBuilderIntro } from "@/components/cake-builder/CakeBuilderIntro";
import { CakeStage } from "@/components/cake-builder/CakeStage";
import {
  CakeBuilderProvider,
  useCakeBuilder,
} from "@/components/cake-builder/CakeBuilderContext";
import { StepPanel } from "@/components/cake-builder/StepPanel";
import { OrderModal } from "@/components/order/OrderModal";

function CakeBuilderShell() {
  const { cakeVisual, currentStepId } = useCakeBuilder();

  if (currentStepId === "intro") {
    return <CakeBuilderIntro />;
  }

  return (
    <div className="cake-configurator">
      <div className="cake-configurator-chrome">
        <BuilderHeader />
      </div>
      <div className="cake-configurator-stage">
        <CakeStage
          image={cakeVisual.image}
          toppingImages={cakeVisual.toppingImages}
          compact={cakeVisual.id === "exploded"}
        >
          <StepPanel />
        </CakeStage>
      </div>
      <OrderModal />
    </div>
  );
}

export function CakeBuilder() {
  return (
    <CakeBuilderProvider>
      <CakeBuilderShell />
    </CakeBuilderProvider>
  );
}
