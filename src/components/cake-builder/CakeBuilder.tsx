"use client";

import { useState } from "react";
import { BackgroundStage } from "@/components/cake-builder/BackgroundStage";
import { BuilderHeader } from "@/components/cake-builder/BuilderHeader";
import { CakeBuilderIntro } from "@/components/cake-builder/CakeBuilderIntro";
import { CakeStage } from "@/components/cake-builder/CakeStage";
import {
  CakeBuilderProvider,
  useCakeBuilder,
} from "@/components/cake-builder/CakeBuilderContext";
import { StepPanel } from "@/components/cake-builder/StepPanel";
import { OrderModal } from "@/components/order/OrderModal";

function CakeConfigurator() {
  const { cakeVisual } = useCakeBuilder();

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
          soaked={cakeVisual.finish === "soaked"}
        >
          <StepPanel />
        </CakeStage>
      </div>
      <OrderModal />
    </div>
  );
}

/**
 * One persistent scene: the stage background is mounted once and never
 * unmounted. Only the foregrounds (intro / configurator) change, and they
 * overlap while the intro fades out so there is never an empty frame.
 */
function CakeBuilderShell() {
  const { currentStepId } = useCakeBuilder();
  const isIntroStep = currentStepId === "intro";
  // The intro stays mounted after its step ends, until its fade-out finishes.
  const [isIntroMounted, setIsIntroMounted] = useState(isIntroStep);

  if (isIntroStep && !isIntroMounted) {
    // "Crear otra torta" returns to the intro.
    setIsIntroMounted(true);
  }

  return (
    <div className="cake-scene">
      <div className="cake-scene-bg" aria-hidden="true">
        <BackgroundStage />
      </div>
      {isIntroStep ? null : <CakeConfigurator key="configurator" />}
      {isIntroMounted ? (
        <CakeBuilderIntro
          key="intro"
          onExited={() => setIsIntroMounted(false)}
        />
      ) : null}
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
