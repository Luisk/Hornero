"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimationEvent } from "react";
import { cakeImageSrc } from "@/components/cake-builder/CakeImage";
import { CakeShadow } from "@/components/cake-builder/CakeShadow";
import { IntroCakePieces } from "@/components/cake-builder/IntroCakePieces";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import {
  INTRO_CAKE_LAYERS,
  INTRO_LEAVE_DURATION_MS,
  INTRO_TIMELINE_MS,
} from "@/config/cake-visuals";
import { getSelectionHistory } from "@/lib/selection-history";

/**
 * Safety net in case the browser never fires `animationend` (for example,
 * when the page was hidden). Normally the real animation events win.
 */
const FALLBACK_BUFFER_MS = 1500;

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
      <CakeShadow compact />
      <IntroCakePieces />
    </div>
  );
}

type CakeBuilderIntroProps = {
  /** Called once the intro has faded out over the configurator. */
  onExited: () => void;
};

export function CakeBuilderIntro({ onExited }: CakeBuilderIntroProps) {
  const { completeIntro, cakeVisual, configuration } = useCakeBuilder();
  // Intro-only state; the configurator only learns when the intro is done.
  const [isLeaving, setIsLeaving] = useState(false);
  const finishedLayers = useRef(new Set<string>());
  const hasCompleted = useRef(false);
  const hasExited = useRef(false);

  // Fetch and decode Step 1's first frame while the intro plays, using the
  // exact URLs the configurator will request.
  useEffect(() => {
    const urls = [
      cakeVisual.image ? cakeImageSrc(cakeVisual.image) : null,
      ...getSelectionHistory(configuration, "size").map(
        (item) => item.imageSrc,
      ),
    ].filter((url): url is string => Boolean(url));

    for (const url of new Set(urls)) {
      const image = new window.Image();
      image.src = url;
      image.decode().catch(() => {
        // Decoding is an optimization; the configurator still loads it.
      });
    }
  }, [cakeVisual.image, configuration]);

  // Timeline done: mount the configurator underneath, then fade the intro
  // out on top of it. The shared background never changes.
  const startLeaving = useCallback(() => {
    if (hasCompleted.current) {
      return;
    }
    hasCompleted.current = true;
    completeIntro();
    setIsLeaving(true);
  }, [completeIntro]);

  const exit = useCallback(() => {
    if (hasExited.current) {
      return;
    }
    hasExited.current = true;
    onExited();
  }, [onExited]);

  // Fallbacks only; the animation events below normally drive both phases.
  useEffect(() => {
    const timeout = window.setTimeout(
      startLeaving,
      INTRO_TIMELINE_MS + FALLBACK_BUFFER_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [startLeaving]);

  useEffect(() => {
    if (!isLeaving) {
      return;
    }
    const timeout = window.setTimeout(
      exit,
      INTRO_LEAVE_DURATION_MS + FALLBACK_BUFFER_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [exit, isLeaving]);

  function handleAnimationEnd(event: AnimationEvent<HTMLElement>) {
    if (event.animationName === "intro-leave") {
      exit();
      return;
    }

    const layerId = (event.target as HTMLElement).dataset.introLayer;
    if (event.animationName !== "intro-layer-in" || !layerId) {
      return;
    }

    // Leave only once every layer has finished, regardless of order.
    finishedLayers.current.add(layerId);
    if (finishedLayers.current.size === INTRO_CAKE_LAYERS.length) {
      startLeaving();
    }
  }

  return (
    <section
      className={`cake-intro${isLeaving ? " is-leaving" : ""}`}
      aria-label="Crea tu torta"
      aria-busy={!isLeaving}
      aria-hidden={isLeaving ? true : undefined}
      onAnimationEnd={handleAnimationEnd}
      style={
        isLeaving
          ? { animationDuration: `${INTRO_LEAVE_DURATION_MS}ms` }
          : undefined
      }
    >
      <IntroCakeStage />
      <div className="cake-intro-copy">
        <IntroTitle />
        <IntroSubtitle />
      </div>
    </section>
  );
}
