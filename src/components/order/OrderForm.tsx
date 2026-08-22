"use client";

import { useId, type FormEvent } from "react";
import { OrderSummary } from "@/components/order/OrderSummary";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { ORDER_OCCASIONS } from "@/config/order-options";
import type { OrderOccasionId } from "@/types/order";

export function OrderForm() {
  const { configuration, price, submitOrder } = useCakeBuilder();
  const formId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const occasion = form.get("occasion");
    const date = form.get("date");
    const time = form.get("time");
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");

    if (
      typeof occasion !== "string" ||
      typeof date !== "string" ||
      typeof time !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string"
    ) {
      return;
    }

    submitOrder({
      occasion: occasion as OrderOccasionId,
      delivery: { date, time },
      customer: { name, email, phone },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-6">
      <OrderSummary configuration={configuration} price={price} />

      <fieldset className="min-w-0">
        <legend className="mb-3 text-xs tracking-[0.16em] text-olive uppercase">
          Ocasión
        </legend>
        <label className="sr-only" htmlFor={`${formId}-occasion`}>
          Ocasión
        </label>
        <select
          id={`${formId}-occasion`}
          name="occasion"
          required
          defaultValue=""
          className="min-h-12 w-full rounded-sm border border-chocolate/15 bg-white px-3 text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          <option value="" disabled>
            Selecciona una ocasión
          </option>
          {ORDER_OCCASIONS.map((occasion) => (
            <option key={occasion.id} value={occasion.id}>
              {occasion.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="mb-3 text-xs tracking-[0.16em] text-olive uppercase">
          Entrega
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${formId}-date`}
              className="mb-1 block text-sm text-chocolate/70"
            >
              Fecha
            </label>
            <input
              id={`${formId}-date`}
              name="date"
              type="date"
              required
              className="min-h-12 w-full rounded-sm border border-chocolate/15 bg-white px-3 text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            />
          </div>
          <div>
            <label
              htmlFor={`${formId}-time`}
              className="mb-1 block text-sm text-chocolate/70"
            >
              Hora
            </label>
            <input
              id={`${formId}-time`}
              name="time"
              type="time"
              required
              className="min-h-12 w-full rounded-sm border border-chocolate/15 bg-white px-3 text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="mb-3 text-xs tracking-[0.16em] text-olive uppercase">
          Tus datos
        </legend>
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor={`${formId}-name`}
              className="mb-1 block text-sm text-chocolate/70"
            >
              Nombre
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              className="min-h-12 w-full rounded-sm border border-chocolate/15 bg-white px-3 text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            />
          </div>
          <div>
            <label
              htmlFor={`${formId}-email`}
              className="mb-1 block text-sm text-chocolate/70"
            >
              Email
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-h-12 w-full rounded-sm border border-chocolate/15 bg-white px-3 text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            />
          </div>
          <div>
            <label
              htmlFor={`${formId}-phone`}
              className="mb-1 block text-sm text-chocolate/70"
            >
              Teléfono
            </label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="min-h-12 w-full rounded-sm border border-chocolate/15 bg-white px-3 text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            />
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="flex min-h-12 w-full items-center justify-center rounded-sm bg-terracotta px-5 text-sm font-medium tracking-[0.18em] text-cream uppercase transition-colors duration-200 hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chocolate motion-reduce:transition-none"
      >
        Enviar pedido
      </button>
    </form>
  );
}
