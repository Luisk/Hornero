import { DELIVERY_TIME_TO_COORDINATE } from "@/config/order-options";
import { calculateCakePrice, hasUnconfiguredPrice } from "@/lib/pricing";
import type { CakeOrder, CreateCakeOrderInput } from "@/types/order";

export function generateOrderId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `HO - ${n}`;
}

export function createCakeOrder(input: CreateCakeOrderInput): CakeOrder {
  const referenceImage = input.referenceImage ?? null;

  return {
    id: generateOrderId(),
    cake: {
      ...input.cake,
      price: calculateCakePrice(input.cake),
      pricePending: hasUnconfiguredPrice(input.cake),
    },
    occasion: input.occasion,
    delivery: {
      date: input.delivery.date || null,
      time: input.delivery.time || DELIVERY_TIME_TO_COORDINATE,
    },
    customer: input.customer,
    notes: input.notes?.trim() || null,
    referenceImage,
    requiresReview: referenceImage !== null,
    status: "RECEIVED",
    createdAt: new Date().toISOString(),
  };
}
