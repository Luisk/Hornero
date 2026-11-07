export const CAKE_STAGE_IMAGE = "/images/crea-tu-torta/stage/cake-stage.png";

export const INTRO_CAKE_ASSET = "/images/crea-tu-torta/stage/cake-exploded.png";

export const INTRO_CAKE_LAYERS = [
  {
    id: "base",
    image: "/images/crea-tu-torta/intro/layer-sponge-base.png",
    bottom: "0%",
    height: "28%",
    delayMs: 80,
  },
  {
    id: "cream",
    image: "/images/crea-tu-torta/intro/layer-cream.png",
    bottom: "16%",
    height: "26%",
    delayMs: 320,
  },
  {
    id: "middle",
    image: "/images/crea-tu-torta/intro/layer-sponge-middle.png",
    bottom: "30%",
    height: "28%",
    delayMs: 560,
  },
  {
    id: "jam",
    image: "/images/crea-tu-torta/intro/layer-jam.png",
    bottom: "46%",
    height: "26%",
    delayMs: 800,
  },
  {
    id: "top",
    image: "/images/crea-tu-torta/intro/layer-top.png",
    bottom: "56%",
    height: "42%",
    delayMs: 1040,
  },
] as const;

export const CAKE_VISUAL_IMAGES = {
  exploded: "/images/crea-tu-torta/stage/cake-exploded.png",
  "half-pound-basic": "/images/crea-tu-torta/size/cake-half-pound.png",
  "one-pound-basic": "/images/crea-tu-torta/size/cake-one-pound.png",
  spongy: "/images/crea-tu-torta/size/cake-one-pound.png",
  cold: "/images/crea-tu-torta/sponge/cake-cold.png",
  strawberry: "/images/crea-tu-torta/fillings/cake-strawberry.png",
  blackberry: "/images/crea-tu-torta/fillings/cake-blackberry.png",
  "passion-fruit": "/images/crea-tu-torta/fillings/cake-passion-fruit.png",
  peach: "/images/crea-tu-torta/fillings/cake-peach.png",
  uchuva: "/images/crea-tu-torta/fillings/cake-uchuva.png",
  chantilly: "/images/crea-tu-torta/coverage/cake-chantilly.png",
  cheese: "/images/crea-tu-torta/coverage/cake-cheese.png",
  butter: "/images/crea-tu-torta/coverage/cake-butter.png",
  chocolate: "/images/crea-tu-torta/coverage/cake-chocolate.png",
} as const;

export const CAKE_TOPPING_IMAGES = {
  strawberry: "/images/crea-tu-torta/toppings/topping-strawberry.png",
} as const;

export type CakeVisualId = keyof typeof CAKE_VISUAL_IMAGES;
export type CakeToppingVisualId = keyof typeof CAKE_TOPPING_IMAGES;
