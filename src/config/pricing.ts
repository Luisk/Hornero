import type {
  CakeCoverageId,
  CakeFillingId,
  CakeSizeId,
  CakeSpongeId,
  CakeToppingId,
} from "@/types/cake";

/**
 * Temporary development prices in COP.
 * Replace these values when production pricing is confirmed.
 * UI components must read prices only through `calculateCakePrice`.
 * A `null` surcharge means the price is not configured yet: it is counted
 * as 0 and the order is flagged as "precio por confirmar".
 */
export const pricingConfig = {
  currency: "COP",
  locale: "es-CO",
  baseBySize: {
    "half-pound": 45_000,
    "one-pound": 78_000,
  } satisfies Record<CakeSizeId, number>,
  spongeSurcharge: {
    cold: 0,
    fluffy: 0,
  } satisfies Record<CakeSpongeId, number>,
  fillingSurcharge: {
    none: 0,
    strawberry: 0,
    blackberry: 0,
    "passion-fruit": 3_000,
    peach: 3_000,
    uchuva: 4_000,
    // TODO: set the confirmed Tres leches price.
    "tres-leches": null,
  } satisfies Record<CakeFillingId, number | null>,
  coverageSurcharge: {
    chantilly: 0,
    cheese: 5_000,
    butter: 3_000,
    chocolate: 4_000,
  } satisfies Record<CakeCoverageId, number>,
  toppingSurcharge: {
    strawberry: 3_000,
    blackberry: 3_000,
    uchuva: 3_500,
    peach: 3_000,
    peanut: 2_500,
    macadamia: 4_500,
    pistachio: 4_500,
    chocolate: 2_500,
    coconut: 2_000,
  } satisfies Record<CakeToppingId, number>,
} as const;

export type PricingConfig = typeof pricingConfig;
