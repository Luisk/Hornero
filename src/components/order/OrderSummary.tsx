"use client";

import {
  getCoverageOption,
  getFillingOption,
  getSizeOption,
  getSpongeOption,
  getToppingOption,
} from "@/config/cake-options";
import { formatCakePrice } from "@/lib/pricing";
import type { CakeConfiguration } from "@/types/cake";

type OrderSummaryProps = {
  configuration: CakeConfiguration;
  price: number;
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-4 py-2">
      <dt className="shrink-0 text-sm text-chocolate/60">{label}</dt>
      <dd className="min-w-0 text-right text-sm text-chocolate">{value}</dd>
    </div>
  );
}

export function OrderSummary({ configuration, price }: OrderSummaryProps) {
  const toppingLabels = configuration.toppings
    .map((id) => getToppingOption(id)?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <dl className="divide-y divide-chocolate/10">
      <SummaryRow
        label="Tamaño"
        value={
          configuration.size
            ? (getSizeOption(configuration.size)?.label ?? "—")
            : "—"
        }
      />
      <SummaryRow
        label="Ponqué"
        value={
          configuration.sponge
            ? (getSpongeOption(configuration.sponge)?.label ?? "—")
            : "—"
        }
      />
      <SummaryRow
        label="Relleno"
        value={
          configuration.filling
            ? (getFillingOption(configuration.filling)?.label ?? "—")
            : "—"
        }
      />
      <SummaryRow
        label="Cobertura"
        value={
          configuration.coverage
            ? (getCoverageOption(configuration.coverage)?.label ?? "—")
            : "—"
        }
      />
      <SummaryRow label="Toppings" value={toppingLabels || "Sin toppings"} />
      <SummaryRow label="Precio" value={formatCakePrice(price)} />
    </dl>
  );
}
