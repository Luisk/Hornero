"use client";

import { BuilderAction } from "@/components/cake-builder/BuilderAction";
import { BuilderHeader } from "@/components/cake-builder/BuilderHeader";
import {
  CakeBuilderProvider,
  useCakeBuilder,
} from "@/components/cake-builder/CakeBuilderContext";
import { CakePreview } from "@/components/cake-builder/CakePreview";
import { CoverageStep } from "@/components/cake-builder/steps/CoverageStep";
import { FillingStep } from "@/components/cake-builder/steps/FillingStep";
import { IntroStep } from "@/components/cake-builder/steps/IntroStep";
import { PreviewStep } from "@/components/cake-builder/steps/PreviewStep";
import { SizeStep } from "@/components/cake-builder/steps/SizeStep";
import { SpongeStep } from "@/components/cake-builder/steps/SpongeStep";
import { ToppingsStep } from "@/components/cake-builder/steps/ToppingsStep";
import { OrderModal } from "@/components/order/OrderModal";

function CakeBuilderShell() {
  const { currentStepId } = useCakeBuilder();
  const isIntro = currentStepId === "intro";

  return (
    <div className="min-h-dvh bg-cream text-chocolate">
      <div className="mx-auto flex min-h-dvh w-full min-w-0 max-w-[430px] flex-col md:max-w-[720px]">
        {!isIntro ? <BuilderHeader /> : null}

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          {isIntro ? (
            <IntroStep />
          ) : (
            <>
              <section
                className="flex min-h-[38vh] min-w-0 items-center justify-center px-4 py-4 md:min-h-[42vh] md:px-8"
                aria-label="Vista de tu torta"
              >
                <CakePreview />
              </section>
              <section className="min-w-0 flex-1 px-4 pb-4 md:px-8">
                {currentStepId === "size" ? <SizeStep /> : null}
                {currentStepId === "sponge" ? <SpongeStep /> : null}
                {currentStepId === "filling" ? <FillingStep /> : null}
                {currentStepId === "coverage" ? <CoverageStep /> : null}
                {currentStepId === "toppings" ? <ToppingsStep /> : null}
                {currentStepId === "preview" ? <PreviewStep /> : null}
              </section>
              <BuilderAction />
            </>
          )}
        </main>
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
