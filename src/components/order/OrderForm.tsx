"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import { OrderSummary } from "@/components/order/OrderSummary";
import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";
import {
  ORDER_OCCASIONS,
  REFERENCE_IMAGE_MAX_BYTES,
  REFERENCE_IMAGE_TYPES,
} from "@/config/order-options";
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

type ReferenceImage = { file: File; url: string };

const REFERENCE_IMAGE_MAX_MB = REFERENCE_IMAGE_MAX_BYTES / (1024 * 1024);

const SECONDARY_BUTTON_CLASS =
  "inline-flex min-h-11 items-center justify-center rounded-[8px] border border-chocolate/20 px-4 text-xs font-medium tracking-[0.12em] text-chocolate uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
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
  const [notes, setNotes] = useState("");
  const [reference, setReference] = useState<ReferenceImage | null>(null);
  const [referenceError, setReferenceError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Keeps the latest preview URL reachable from the unmount cleanup.
  const referenceUrlRef = useRef<string | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    return () => {
      if (referenceUrlRef.current) {
        URL.revokeObjectURL(referenceUrlRef.current);
      }
    };
  }, []);

  function replaceReference(next: ReferenceImage | null) {
    if (referenceUrlRef.current) {
      URL.revokeObjectURL(referenceUrlRef.current);
    }
    referenceUrlRef.current = next?.url ?? null;
    setReference(next);
  }

  function handleReferenceChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    // Allow picking the same file again after removing it.
    input.value = "";

    if (!file) {
      return;
    }

    if (!(REFERENCE_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      setReferenceError("Usa una imagen JPG, PNG o WebP.");
      return;
    }

    if (file.size > REFERENCE_IMAGE_MAX_BYTES) {
      setReferenceError(
        `La imagen supera los ${REFERENCE_IMAGE_MAX_MB} MB. Elige una más liviana.`,
      );
      return;
    }

    setReferenceError(null);
    replaceReference({ file, url: URL.createObjectURL(file) });
  }

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

    // Delivery fields are optional; a date is only checked when provided.
    if (date && date < localToday()) {
      setDateError("Elige una fecha desde hoy.");
      dateRef.current?.focus();
      return;
    }

    const delivered = submitOrder({
      occasion: occasion ? (occasion as OrderOccasionId) : null,
      delivery: { date: date || null, time: time || null },
      customer: { name: name.trim(), email: "", phone: phone.trim() },
      notes,
      referenceImage: reference?.file ?? null,
    });

    setSubmitError(
      delivered
        ? null
        : "No pudimos abrir WhatsApp para enviar tu pedido. Permite las ventanas emergentes e inténtalo de nuevo.",
    );
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

            <div className="flex flex-col gap-3">
              <div>
                <p
                  id={`${formId}-reference-label`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  Imagen de referencia{" "}
                  <span className="text-chocolate/50">(opcional)</span>
                </p>
                <input
                  ref={fileInputRef}
                  id={`${formId}-reference`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleReferenceChange}
                  className="sr-only"
                  tabIndex={-1}
                  aria-labelledby={`${formId}-reference-label`}
                />
                {reference ? (
                  <div className="flex items-center gap-3 rounded-[8px] border border-chocolate/15 bg-white p-2">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[6px] bg-chocolate/5">
                      <Image
                        src={reference.url}
                        alt="Vista previa de tu imagen de referencia"
                        fill
                        unoptimized
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-chocolate">
                      {reference.file.name}
                    </span>
                    <span className="flex shrink-0 flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={SECONDARY_BUTTON_CLASS}
                      >
                        Cambiar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          replaceReference(null);
                          setReferenceError(null);
                        }}
                        className={SECONDARY_BUTTON_CLASS}
                      >
                        Quitar
                      </button>
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex min-h-12 w-full items-center justify-center rounded-[8px] border border-dashed border-chocolate/30 bg-white/60 px-3 text-sm text-chocolate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                  >
                    Subir imagen de referencia
                  </button>
                )}
                <p
                  className={`mt-1 text-xs ${
                    referenceError ? "text-terracotta" : "text-chocolate/55"
                  }`}
                  role={referenceError ? "alert" : undefined}
                >
                  {referenceError ??
                    `JPG, PNG o WebP · máximo ${REFERENCE_IMAGE_MAX_MB} MB`}
                </p>
                {reference ? (
                  <p className="mt-1 text-xs text-chocolate/55">
                    Tu pedido quedará marcado para revisión del equipo Hornero.
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={`${formId}-notes`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  ¿Algún detalle que debamos tener en cuenta?{" "}
                  <span className="text-chocolate/50">(opcional)</span>
                </label>
                <textarea
                  id={`${formId}-notes`}
                  name="notes"
                  rows={3}
                  maxLength={500}
                  placeholder="Colores, decoración, mensaje en la torta…"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className={`${FIELD_CLASS} min-h-20 resize-none border-chocolate/15 py-2`}
                />
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

            <p className="text-sm text-chocolate/60">
              Estos datos son opcionales. Si no los tienes, los coordinamos
              contigo.
            </p>

            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor={`${formId}-date`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  Fecha de entrega{" "}
                  <span className="text-chocolate/50">(opcional)</span>
                </label>
                <input
                  ref={dateRef}
                  id={`${formId}-date`}
                  name="date"
                  type="date"
                  min={localToday()}
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setDateError(null);
                  }}
                  aria-invalid={dateError ? true : undefined}
                  aria-describedby={
                    dateError ? `${formId}-date-error` : undefined
                  }
                  className={`${FIELD_CLASS} ${
                    dateError ? "border-terracotta" : "border-chocolate/15"
                  }`}
                />
                {dateError ? (
                  <p
                    id={`${formId}-date-error`}
                    className="mt-1 text-sm text-terracotta"
                  >
                    {dateError}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={`${formId}-time`}
                  className="mb-1 block text-sm text-chocolate/70"
                >
                  Hora de entrega{" "}
                  <span className="text-chocolate/50">(opcional)</span>
                </label>
                <input
                  id={`${formId}-time`}
                  name="time"
                  type="time"
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
                  Ocasión <span className="text-chocolate/50">(opcional)</span>
                </label>
                <select
                  id={`${formId}-occasion`}
                  name="occasion"
                  value={occasion}
                  onChange={(event) => setOccasion(event.target.value)}
                  className={`${FIELD_CLASS} border-chocolate/15`}
                >
                  <option value="">Selecciona una ocasión</option>
                  {ORDER_OCCASIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {submitError ? (
              <p className="text-sm text-terracotta" role="alert">
                {submitError}
              </p>
            ) : null}

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
