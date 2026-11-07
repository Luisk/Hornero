"use client";

import { BackgroundStage } from "@/components/cake-builder/BackgroundStage";
import { CakeShadow } from "@/components/cake-builder/CakeShadow";
import { IntroCakePieces } from "@/components/cake-builder/IntroCakePieces";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

function IntroTitle() {
  return (
    <h1 className="font-display text-[2.625rem] leading-none font-medium text-chocolate max-[740px]:text-[2.25rem] md:text-5xl">
      Crea tu torta
    </h1>
  );
}

function IntroSubtitle() {
  return (
    <p className="font-script mx-auto mt-2 max-w-[14rem] text-[1.5rem] leading-tight text-chocolate/80 max-[740px]:text-[1.25rem] md:max-w-none md:text-3xl">
      Tus ingredientes a tu manera
    </p>
  );
}

function IntroCakeStage() {
  return (
    <div className="cake-intro-stage">
      <BackgroundStage />
      <CakeShadow compact />
      <IntroCakePieces />
    </div>
  );
}

function StartButton() {
  const { goNext } = useCakeBuilder();

  return (
    <button
      type="button"
      onClick={goNext}
      className="cake-intro-cta inline-flex min-h-[52px] min-w-44 items-center justify-center rounded-md bg-terracotta px-8 text-sm font-medium tracking-[0.2em] text-cream-light transition-colors duration-200 hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chocolate"
    >
      COMENZAR
    </button>
  );
}

export function CakeBuilderIntro() {
  return (
    <section className="cake-intro" aria-label="Crea tu torta">
      <IntroCakeStage />
      <div className="cake-intro-copy">
        <IntroTitle />
        <IntroSubtitle />
      </div>
      <div className="cake-intro-action">
        <StartButton />
      </div>
    </section>
  );
}
