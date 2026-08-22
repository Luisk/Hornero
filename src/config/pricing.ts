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
    strawberry: 0,
    blackberry: 0,
    "passion-fruit": 3_000,
    peach: 3_000,
    uchuva: 4_000,
  } satisfies Record<CakeFillingId, number>,
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
