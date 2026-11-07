"use client";

import { useEffect } from "react";
import { OrderForm } from "@/components/order/OrderForm";
import { OrderSuccess } from "@/components/order/OrderSuccess";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { CloseIcon } from "@/components/ui/CloseIcon";

export function OrderModal() {
  const { isOrderFormOpen, submittedOrder, closeOrderForm } = useCakeBuilder();

  useEffect(() => {
    if (!isOrderFormOpen) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtml = html.style.overflow;
    const previousBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !submittedOrder) {
        closeOrderForm();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      html.style.overflow = previousHtml;
      body.style.overflow = previousBody;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeOrderForm, isOrderFormOpen, submittedOrder]);

  if (!isOrderFormOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden overscroll-none bg-chocolate/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-dialog-title"
        className="relative max-h-[92dvh] w-full min-w-0 max-w-[430px] overflow-y-auto overscroll-contain rounded-[8px] bg-cream px-5 py-6 text-center md:max-w-[480px] md:px-8"
      >
        {submittedOrder ? null : (
          <button
            type="button"
            onClick={closeOrderForm}
            className="group absolute top-1 right-1 z-10 inline-flex h-8 w-8 items-center justify-center text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            aria-label="Cerrar"
          >
            <span className="absolute inset-0 rounded-full bg-chocolate/10 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <CloseIcon className="relative h-4 w-4" />
          </button>
        )}
        {submittedOrder ? (
          <OrderSuccess order={submittedOrder} />
        ) : (
          <OrderForm />
        )}
      </div>
    </div>
  );
}
