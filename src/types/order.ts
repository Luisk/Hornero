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
  | "celebration"
  | "other";

export type CakeOrderSnapshot = CompletedCakeConfiguration & {
  price: number;
  /** True when a selection has no configured price; Hornero confirms it. */
  pricePending: boolean;
};

export type CakeOrder = {
  id: string;
  cake: CakeOrderSnapshot;
  /** Optional: null when the customer did not pick an occasion. */
  occasion: OrderOccasionId | null;
  delivery: {
    /** Optional: null when the customer did not pick a date. */
    date: string | null;
    /** "Por coordinar" when the customer did not pick a time. */
    time: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  /** Free-text extras (colors, decorations, inscription). Null when empty. */
  notes: string | null;
  /** Optional reference photo shared by the customer. */
  referenceImage: File | null;
  /** True when Hornero must review the order (a reference image is attached). */
  requiresReview: boolean;
  status: OrderStatus;
  createdAt: string;
};

export type CreateCakeOrderInput = {
  cake: CompletedCakeConfiguration;
  occasion: OrderOccasionId | null;
  delivery: {
    date: string | null;
    time: string | null;
  };
  customer: CakeOrder["customer"];
  notes?: string;
  referenceImage?: File | null;
};

export type CommunicationChannel = "whatsapp" | "email";

export type CommunicationTouchpoint =
  | "order_received"
  | "order_confirmed"
  | "delivery_day";
