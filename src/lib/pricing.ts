import { pricingConfig } from "@/config/pricing";
import type { CakeConfiguration } from "@/types/cake";

export function calculateCakePrice(configuration: CakeConfiguration): number {
  let total = 0;

  if (configuration.size) {
    total += pricingConfig.baseBySize[configuration.size];
  }

  if (configuration.sponge) {
    total += pricingConfig.spongeSurcharge[configuration.sponge];
  }

  if (configuration.filling) {
    total += pricingConfig.fillingSurcharge[configuration.filling];
  }

  if (configuration.coverage) {
    total += pricingConfig.coverageSurcharge[configuration.coverage];
  }

  for (const topping of configuration.toppings) {
    total += pricingConfig.toppingSurcharge[topping];
  }

  return total;
}

export function formatCakePrice(amount: number): string {
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$${formatted}`;
}
