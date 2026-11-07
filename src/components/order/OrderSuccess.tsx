"use client";

import { useEffect, useRef } from "react";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import type { CakeOrder } from "@/types/order";

type OrderSuccessProps = {
  order: CakeOrder;
};

export function OrderSuccess({ order }: OrderSuccessProps) {
  const { resetBuilder } = useCakeBuilder();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex min-w-0 flex-col items-center gap-5 text-center">
      <h2
        id="order-dialog-title"
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-2xl text-chocolate outline-none"
      >
        ¡Tu pedido ha sido enviado!
      </h2>
      <p className="text-sm leading-relaxed text-chocolate/70">
        El equipo Hornero se pondrá en contacto contigo para confirmar los
        detalles y coordinar el pago.
      </p>
      {order.referenceImage ? (
        <p className="text-sm leading-relaxed text-chocolate/70">
          Recuerda enviar tu imagen de referencia por el chat de WhatsApp.
        </p>
      ) : null}
      <p className="text-xs tracking-[0.14em] text-olive uppercase">
        Pedido {order.id}
      </p>
      <button
        type="button"
        onClick={resetBuilder}
        className="flex min-h-12 w-full items-center justify-center rounded-[8px] border border-chocolate/20 px-5 text-sm font-medium tracking-[0.16em] text-chocolate uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
      >
        Crear otra torta
      </button>
    </div>
  );
}
