"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { formatCakePrice } from "@/lib/pricing";

export function BuilderPrice() {
  const { price } = useCakeBuilder();

  return (
    <p
      className="font-display text-lg font-medium tabular-nums text-chocolate md:text-xl"
      aria-live="polite"
      aria-label={`Precio ${formatCakePrice(price)}`}
    >
      {formatCakePrice(price)}
    </p>
  );
}
