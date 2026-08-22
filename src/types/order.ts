import type { CompletedCakeConfiguration } from "@/types/cake";

export const ORDER_STATUSES = [
  "RECEIVED",
  "CONFIRMING",
  "CONFIRMED",
  "PAYMENT_COORDINATED",
  "IN_PREPARATION",
  "READY",
  "DELIVERED",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type OrderOccasionId =
  | "birthday"
  | "baptism"
  | "first-communion"
  | "anniversary"
  | "wedding"
  | "baby-shower"
  | "graduation"
  | "other";

export type CakeOrderSnapshot = CompletedCakeConfiguration & {
  price: number;
};

export type CakeOrder = {
  id: string;
  cake: CakeOrderSnapshot;
  occasion: OrderOccasionId;
  delivery: {
    date: string;
    time: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  status: OrderStatus;
  createdAt: string;
};

export type CreateCakeOrderInput = {
  cake: CompletedCakeConfiguration;
  occasion: OrderOccasionId;
  delivery: CakeOrder["delivery"];
  customer: CakeOrder["customer"];
};

export type CommunicationChannel = "whatsapp" | "email";

export type CommunicationTouchpoint =
  | "order_received"
  | "order_confirmed"
  | "delivery_day";
