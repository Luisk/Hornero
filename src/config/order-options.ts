import type { OrderOccasionId } from "@/types/order";

export const ORDER_OCCASIONS: readonly {
  id: OrderOccasionId;
  label: string;
}[] = [
  { id: "birthday", label: "Cumpleaños" },
  { id: "baptism", label: "Bautizo" },
  { id: "first-communion", label: "Primera comunión" },
  { id: "anniversary", label: "Aniversario" },
  { id: "wedding", label: "Matrimonio" },
  { id: "baby-shower", label: "Baby shower" },
  { id: "graduation", label: "Graduación" },
  { id: "other", label: "Otro" },
] as const;

export function getOccasionLabel(id: OrderOccasionId) {
  return ORDER_OCCASIONS.find((occasion) => occasion.id === id)?.label ?? id;
}
