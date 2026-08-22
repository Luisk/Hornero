"use client";

import { OrderSummary } from "@/components/order/OrderSummary";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

export function PreviewStep() {
  const { configuration, price } = useCakeBuilder();

  return (
    <div className="min-w-0">
      <h2 className="font-display mb-4 text-2xl text-chocolate">Tu torta</h2>
      <OrderSummary configuration={configuration} price={price} />
    </div>
  );
}
