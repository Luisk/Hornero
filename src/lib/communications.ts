import type {
  CakeOrder,
  CommunicationChannel,
  CommunicationTouchpoint,
} from "@/types/order";

/**
 * Intended customer communication after an order exists.
 * Providers (WhatsApp, email) will be wired here later.
 * Do not call external APIs from this module yet.
 */
export const COMMUNICATION_PLAN: Record<
  CommunicationTouchpoint,
  readonly CommunicationChannel[]
> = {
  order_received: ["whatsapp", "email"],
  order_confirmed: ["whatsapp", "email"],
  delivery_day: ["whatsapp", "email"],
};

export type NotificationProvider = {
  send(input: {
    order: CakeOrder;
    touchpoint: CommunicationTouchpoint;
    channel: CommunicationChannel;
  }): Promise<void>;
};
