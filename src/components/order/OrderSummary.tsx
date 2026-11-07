"use client";

import {
  getCoverageOption,
  getFillingOption,
  getSizeOption,
  getSpongeOption,
  getToppingOption,
} from "@/config/cake-options";
import { PRICE_PENDING_LABEL } from "@/config/order-options";
import { formatCakePrice, hasUnconfiguredPrice } from "@/lib/pricing";
import { getSelectionHistory } from "@/lib/selection-history";
import type { CakeConfiguration } from "@/types/cake";

type OrderSummaryProps = {
  configuration: CakeConfiguration;
  price: number;
};

function SummaryThumb({
  imageSrc,
  color,
}: {
  imageSrc: string | null;
  color: string | null;
}) {
  return (
    <span
      className="h-5 w-5 shrink-0 rounded-full border border-chocolate/10 bg-cover bg-center"
      style={{
        backgroundColor: color ?? "rgb(62 36 26 / 0.08)",
        backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function SummaryRow({
  label,
  value,
  imageSrc,
  color,
}: {
  label: string;
  value: string;
  imageSrc?: string | null;
  color?: string | null;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 py-1">
      <dt className="flex min-w-0 items-center gap-2 text-sm text-chocolate/60">
        {imageSrc || color ? (
          <SummaryThumb imageSrc={imageSrc ?? null} color={color ?? null} />
        ) : null}
        {label}
      </dt>
      <dd className="min-w-0 text-right text-sm text-chocolate">{value}</dd>
    </div>
  );
}

export function OrderSummary({ configuration, price }: OrderSummaryProps) {
  const history = getSelectionHistory(configuration, "toppings");
  const byId = Object.fromEntries(history.map((item) => [item.id, item]));
  const toppingLabels = configuration.toppings
    .map((id) => getToppingOption(id)?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <dl className="divide-y divide-chocolate/10">
        <SummaryRow
          label="Tamaño"
          value={
            configuration.size
              ? (getSizeOption(configuration.size)?.label ?? "—")
              : "—"
          }
          imageSrc={byId.size?.imageSrc}
          color={byId.size?.placeholderColor}
        />
        <SummaryRow
          label="Ponqué"
          value={
            configuration.sponge
              ? (getSpongeOption(configuration.sponge)?.label ?? "—")
              : "—"
          }
          imageSrc={byId.sponge?.imageSrc}
          color={byId.sponge?.placeholderColor}
        />
        <SummaryRow
          label="Relleno"
          value={getFillingOption(configuration.filling)?.label ?? "—"}
          imageSrc={byId.filling?.imageSrc}
          color={byId.filling?.placeholderColor}
        />
        <SummaryRow
          label="Cobertura"
          value={
            configuration.coverage
              ? (getCoverageOption(configuration.coverage)?.label ?? "—")
              : "—"
          }
          imageSrc={byId.coverage?.imageSrc}
          color={byId.coverage?.placeholderColor}
        />
        <SummaryRow
          label="Toppings"
          value={toppingLabels || "Sin toppings"}
          imageSrc={byId.toppings?.imageSrc}
          color={byId.toppings?.placeholderColor}
        />
        <SummaryRow label="Precio total" value={formatCakePrice(price)} />
      </dl>
      {hasUnconfiguredPrice(configuration) ? (
        <p className="py-1 text-right text-xs text-chocolate/60">
          {PRICE_PENDING_LABEL}
        </p>
      ) : null}
    </div>
  );
}
