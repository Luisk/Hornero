import type { OrderOccasionId } from "@/types/order";

export const ORDER_OCCASIONS: readonly {
  id: OrderOccasionId;
  label: string;
}[] = [
  { id: "birthday", label: "Cumpleaños" },
  { id: "baptism", label: "Bautizo" },
  { id: "first-communion", label: "Primera comunión" },
  { id: "anniversary", label: "Aniversario" },
  { id: "celebration", label: "Celebración" },
  { id: "other", label: "Otro" },
] as const;

export const UNSPECIFIED_LABEL = "Sin especificar";

/** Delivery time stored on the order when the customer leaves it empty. */
export const DELIVERY_TIME_TO_COORDINATE = "Por coordinar";

export const PRICE_PENDING_LABEL = "Precio del relleno por confirmar";

export const REVIEW_REQUIRED_LABEL = "Requiere revisión de Hornero";

export const REFERENCE_IMAGE_MAX_BYTES = 10 * 1024 * 1024;

export const REFERENCE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function getOccasionLabel(id: OrderOccasionId | null) {
  if (!id) {
    return UNSPECIFIED_LABEL;
  }
  return ORDER_OCCASIONS.find((occasion) => occasion.id === id)?.label ?? id;
}
