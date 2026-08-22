"use client";

import { useEffect } from "react";
import { OrderForm } from "@/components/order/OrderForm";
import { OrderSuccess } from "@/components/order/OrderSuccess";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

export function OrderModal() {
  const { isOrderFormOpen, submittedOrder, closeOrderForm } = useCakeBuilder();

  useEffect(() => {
    if (!isOrderFormOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !submittedOrder) {
        closeOrderForm();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOrderForm, isOrderFormOpen, submittedOrder]);

  if (!isOrderFormOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-chocolate/40 md:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-dialog-title"
        className="max-h-[92dvh] w-full min-w-0 max-w-[430px] overflow-y-auto bg-cream px-4 py-5 md:max-w-[520px] md:rounded-sm md:px-6"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <h2 id="order-dialog-title" className="font-display text-2xl text-chocolate">
            {submittedOrder ? "Pedido recibido" : "Pedir mi torta"}
          </h2>
          {submittedOrder ? null : (
            <button
              type="button"
              onClick={closeOrderForm}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
              aria-label="Cerrar"
            >
              Cerrar
            </button>
          )}
        </div>
        {submittedOrder ? (
          <OrderSuccess order={submittedOrder} />
        ) : (
          <OrderForm />
        )}
      </div>
    </div>
  );
}
