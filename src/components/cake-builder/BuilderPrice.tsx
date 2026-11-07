"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { ShoppingBagIcon } from "@/components/ui/ShoppingBagIcon";
import { formatCakePrice } from "@/lib/pricing";

export function BuilderPrice() {
  const { price } = useCakeBuilder();
  const formatted = formatCakePrice(price);

  return (
    <p
      key={price}
      className="animate-price inline-flex items-center gap-1.5 rounded-full border border-border bg-cream-light py-1 pr-2.5 pl-3 font-sans text-sm font-bold tabular-nums text-chocolate shadow-[0_1px_3px_rgba(62,36,26,0.05)]"
      aria-live="polite"
      aria-label={`Precio ${formatted}`}
    >
      {formatted}
      <ShoppingBagIcon className="h-3.5 w-3.5 shrink-0" />
    </p>
  );
}
