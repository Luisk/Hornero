import {
  getCoverageOption,
  getFillingOption,
  getSizeOption,
  getSpongeOption,
  getToppingOption,
} from "@/config/cake-options";
import { getOccasionLabel } from "@/config/order-options";
import { formatCakePrice } from "@/lib/pricing";
import type {
  CakeOrder,
  CommunicationChannel,
  CommunicationTouchpoint,
} from "@/types/order";

/**
 * Customer communication after an order exists.
 * WhatsApp is opened with the existing Hornero order payload.
 * Email is only sent when a customer address already exists.
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

function toppingLabels(order: CakeOrder) {
  const labels = order.cake.toppings
    .map((id) => getToppingOption(id)?.label)
    .filter(Boolean);

  return labels.length > 0 ? labels.join(", ") : "Sin toppings";
}

export function formatWhatsAppOrderMessage(order: CakeOrder) {
  return [
    "Nuevo pedido — Crea tu torta",
    "",
    `Nombre:`,
    order.customer.name,
    "",
    `Teléfono:`,
    order.customer.phone,
    "",
    `Tamaño:`,
    getSizeOption(order.cake.size)?.label ?? order.cake.size,
    "",
    `Ponqué:`,
    getSpongeOption(order.cake.sponge)?.label ?? order.cake.sponge,
    "",
    `Relleno:`,
    getFillingOption(order.cake.filling)?.label ?? order.cake.filling,
    "",
    `Cobertura:`,
    getCoverageOption(order.cake.coverage)?.label ?? order.cake.coverage,
    "",
    `Toppings:`,
    toppingLabels(order),
    "",
    `Fecha de entrega:`,
    order.delivery.date,
    "",
    `Hora:`,
    order.delivery.time,
    "",
    `Ocasión:`,
    getOccasionLabel(order.occasion),
    "",
    `Total:`,
    formatCakePrice(order.cake.price),
  ].join("\n");
}

export function openHorneroWhatsApp(order: CakeOrder) {
  if (typeof window === "undefined") {
    return;
  }

  const text = encodeURIComponent(formatWhatsAppOrderMessage(order));
  const number = process.env.NEXT_PUBLIC_HORNERO_WHATSAPP?.replace(/\D/g, "");
  const url = number
    ? `https://wa.me/${number}?text=${text}`
    : `https://wa.me/?text=${text}`;

  window.open(url, "_blank", "noopener,noreferrer");
}
