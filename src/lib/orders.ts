import { calculateCakePrice } from "@/lib/pricing";
import type { CakeOrder, CreateCakeOrderInput } from "@/types/order";

export function generateOrderId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `HO - ${n}`;
}

export function createCakeOrder(input: CreateCakeOrderInput): CakeOrder {
  return {
    id: generateOrderId(),
    cake: {
      ...input.cake,
      price: calculateCakePrice(input.cake),
    },
    occasion: input.occasion,
    delivery: input.delivery,
    customer: input.customer,
    status: "RECEIVED",
    createdAt: new Date().toISOString(),
  };
}
