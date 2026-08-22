"use client";

import { OrderSummary } from "@/components/order/OrderSummary";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import type { CakeOrder } from "@/types/order";

type OrderSuccessProps = {
  order: CakeOrder;
};

export function OrderSuccess({ order }: OrderSuccessProps) {
  const { resetBuilder } = useCakeBuilder();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div>
        <p className="text-xs tracking-[0.16em] text-olive uppercase">
          Pedido recibido
        </p>
        <h2 className="font-display mt-2 text-3xl text-chocolate">
          Pedido #{order.id}
        </h2>
        <p className="mt-2 text-sm text-chocolate/65">
          Este pedido aún no está confirmado. Hornero te contactará para
          confirmarlo.
        </p>
      </div>
      <p className="text-base leading-relaxed text-chocolate/80">
        Gracias por elegir Hornero. Recibimos los detalles de tu torta. Nuestro
        equipo se pondrá en contacto contigo para confirmar tu pedido y coordinar
        el pago.
      </p>
      <OrderSummary configuration={order.cake} price={order.cake.price} />
      <button
        type="button"
        onClick={resetBuilder}
        className="flex min-h-12 w-full items-center justify-center rounded-sm border border-chocolate/20 px-5 text-sm font-medium tracking-[0.18em] text-chocolate uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
      >
        Crear otra torta
      </button>
    </div>
  );
}
