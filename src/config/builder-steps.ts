export const BUILDER_STEP_IDS = [
  "intro",
  "size",
  "sponge",
  "filling",
  "coverage",
  "toppings",
  "preview",
] as const;

export type BuilderStepId = (typeof BUILDER_STEP_IDS)[number];

export type BuilderStep = {
  id: BuilderStepId;
  title: string;
  heading: string;
  question: string;
  support?: string;
  countsTowardProgress: boolean;
};

export const BUILDER_STEPS: readonly BuilderStep[] = [
  {
    id: "intro",
    title: "Arma tu torta",
    heading: "Arma tu torta",
    question: "Arma tu torta",
    countsTowardProgress: false,
  },
  {
    id: "size",
    title: "Tamaño",
    heading: "Tamaño",
    question: "¿Qué tamaño quieres?",
    support: "Elige el tamaño perfecto para compartir.",
    countsTowardProgress: true,
  },
  {
    id: "sponge",
    title: "Ponqué",
    heading: "Ponqué",
    question: "¿Cómo quieres tu ponqué?",
    support: "Elige la textura que más te gusta.",
    countsTowardProgress: true,
  },
  {
    id: "filling",
    title: "Relleno",
    heading: "Relleno",
    question: "¿Qué relleno quieres?",
    support: "Elige el sabor que irá en cada bocado.",
    countsTowardProgress: true,
  },
  {
    id: "coverage",
    title: "Cobertura",
    heading: "Cobertura",
    question: "¿Cómo quieres cubrirla?",
    support: "Dale el toque cremoso que más te gusta.",
    countsTowardProgress: true,
  },
  {
    id: "toppings",
    title: "Toppings",
    heading: "Toppings",
    question: "¿Qué le ponemos encima?",
    support: "Termínala con tus favoritos.",
    countsTowardProgress: true,
  },
  {
    id: "preview",
    title: "Tu torta",
    heading: "Tu torta",
    question: "Tu torta está lista",
    support: "Ahora solo falta elegir cuándo disfrutarla.",
    countsTowardProgress: true,
  },
] as const;

export const PROGRESS_STEPS = BUILDER_STEPS.filter(
  (step) => step.countsTowardProgress,
);

export const PROGRESS_STEP_COUNT = PROGRESS_STEPS.length;

export function getBuilderStep(id: BuilderStepId) {
  const step = BUILDER_STEPS.find((item) => item.id === id);
  if (!step) {
    throw new Error(`Unknown builder step: ${id}`);
  }
  return step;
}

export function getProgressNumber(stepId: BuilderStepId) {
  const index = PROGRESS_STEPS.findIndex((step) => step.id === stepId);
  return index === -1 ? null : index + 1;
}
