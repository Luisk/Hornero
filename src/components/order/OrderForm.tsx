"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { OrderSummary } from "@/components/order/OrderSummary";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import { ORDER_OCCASIONS } from "@/config/order-options";
import { openHorneroWhatsApp } from "@/lib/communications";
import { ChevronLeftIcon } from "@/components/ui/ChevronLeftIcon";
import type { OrderOccasionId } from "@/types/order";

const FIELD_CLASS =
  "min-h-12 w-full rounded-[8px] border bg-white px-3 text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

function localToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function StepDots({ step }: { step: 1 | 2 }) {
  return (
    <div
      className="mb-4 flex items-center justify-center gap-1.5"
      aria-label={`Paso ${step} de 2`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          step === 1 ? "bg-terracotta" : "bg-chocolate/20"
        }`}
      />
      <span className="h-px w-3 bg-chocolate/15" />
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          step === 2 ? "bg-terracotta" : "bg-chocolate/20"
        }`}
      />
    </div>
  );
}

export function OrderForm() {
  const { configuration, price, submitOrder } = useCakeBuilder();
  const formId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [occasion, setOccasion] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function goToDelivery() {
    const nextErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      nextErrors.name = "Escribe tu nombre.";
    }
    if (!phone.trim()) {
      nextErrors.phone = "Escribe tu teléfono.";
    }

    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }
    if (nextErrors.phone) {
      phoneRef.current?.focus();
      return;
    }

    setDirection("forward");
    setStep(2);
  }

  function goToCustomer() {
    setDirection("back");
    setStep(1);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 1) {
      goToDelivery();
      return;
    }

    if (!date || date < localToday() || !time || !occasion) {
      return;
    }

    const order = submitOrder({
      occasion: occasion as OrderOccasionId,
      delivery: { date, time },
      customer: { name: name.trim(), email: "", phone: phone.trim() },
    });

    if (order) {
      openHorneroWhatsApp(order);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-5">
      <StepDots step={step} />
      <div
        key={step}
        className={
          direction === "forward" ? "order-step-forward" : "order-step-back"
        }
      >
        {step === 1 ? (
          <div className="flex min-w-0 flex-col gap-5">
            <h2
              id="order-dialog-title"
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-center text-2xl text-chocolate outline-none"
            >
              Tu pedido
            </h2>

            <OrderSummary configuration={configuration} price={price} />

            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor={`${formId}-name`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  Nombre
                </label>
                <input
                  ref={nameRef}
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  autoCapitalize="words"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (errors.name) {
                      setErrors((current) => ({ ...current, name: undefined }));
                    }
                  }}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={
                    errors.name ? `${formId}-name-error` : undefined
                  }
                  className={`${FIELD_CLASS} ${
                    errors.name ? "border-terracotta" : "border-chocolate/15"
                  }`}
                />
                {errors.name ? (
                  <p
                    id={`${formId}-name-error`}
                    className="mt-1 text-sm text-terracotta"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={`${formId}-phone`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  Teléfono
                </label>
                <input
                  ref={phoneRef}
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    if (errors.phone) {
                      setErrors((current) => ({
                        ...current,
                        phone: undefined,
                      }));
                    }
                  }}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={
                    errors.phone ? `${formId}-phone-error` : undefined
                  }
                  className={`${FIELD_CLASS} ${
                    errors.phone ? "border-terracotta" : "border-chocolate/15"
                  }`}
                />
                {errors.phone ? (
                  <p
                    id={`${formId}-phone-error`}
                    className="mt-1 text-sm text-terracotta"
                  >
                    {errors.phone}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center rounded-[8px] bg-terracotta px-5 text-sm font-medium tracking-[0.16em] text-cream-light uppercase transition-colors duration-200 hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chocolate motion-reduce:transition-none"
            >
              Fecha de entrega →
            </button>
          </div>
        ) : (
          <div className="flex min-w-0 flex-col gap-5">
            <h2
              id="order-dialog-title"
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-center text-2xl text-chocolate outline-none"
            >
              ¿Cuándo quieres recibirla?
            </h2>

            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor={`${formId}-date`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  Fecha de entrega
                </label>
                <input
                  id={`${formId}-date`}
                  name="date"
                  type="date"
                  required
                  min={localToday()}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={`${FIELD_CLASS} border-chocolate/15`}
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-time`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  Hora de entrega
                </label>
                <input
                  id={`${formId}-time`}
                  name="time"
                  type="time"
                  required
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className={`${FIELD_CLASS} border-chocolate/15`}
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-occasion`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  Ocasión
                </label>
                <select
                  id={`${formId}-occasion`}
                  name="occasion"
                  required
                  value={occasion}
                  onChange={(event) => setOccasion(event.target.value)}
                  className={`${FIELD_CLASS} border-chocolate/15`}
                >
                  <option value="" disabled>
                    Selecciona una ocasión
                  </option>
                  {ORDER_OCCASIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center rounded-[8px] bg-terracotta px-5 text-sm font-medium tracking-[0.16em] text-cream-light uppercase transition-colors duration-200 hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chocolate motion-reduce:transition-none"
              >
                Enviar pedido
              </button>
              <button
                type="button"
                onClick={goToCustomer}
                className="inline-flex min-h-11 items-center justify-center gap-1 self-center text-sm text-chocolate/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
