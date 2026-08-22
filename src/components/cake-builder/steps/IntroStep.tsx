"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

export function IntroStep() {
  const { goNext } = useCakeBuilder();

  return (
    <section className="flex min-h-dvh min-w-0 flex-col justify-between px-6 py-10 md:px-10">
      <p className="font-display text-sm tracking-[0.28em] text-chocolate/70 uppercase">
        Hornero
      </p>
      <div className="max-w-sm">
        <h1 className="font-display text-4xl leading-tight text-balance text-chocolate md:text-5xl">
          Arma tu torta
        </h1>
        <p className="mt-5 max-w-xs text-base leading-relaxed text-chocolate/75">
          Elige cada capa. Mira cómo nace. Pídela cuando esté lista.
        </p>
      </div>
      <button
        type="button"
        onClick={goNext}
        className="flex min-h-12 w-full items-center justify-center rounded-sm bg-terracotta px-5 text-sm font-medium tracking-[0.18em] text-cream uppercase transition-colors duration-200 hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chocolate motion-reduce:transition-none"
      >
        Comenzar
      </button>
    </section>
  );
}
