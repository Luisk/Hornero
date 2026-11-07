export type CakeSizeId = "half-pound" | "one-pound";

export type CakeSpongeId = "cold" | "fluffy";

export type CakeFillingId =
  | "none"
  | "strawberry"
  | "blackberry"
  | "passion-fruit"
  | "peach"
  | "uchuva"
  | "tres-leches";

export type CakeCoverageId = "chantilly" | "cheese" | "butter" | "chocolate";

export type CakeToppingCategory = "fruits" | "nuts" | "other";

export type CakeToppingId =
  | "strawberry"
  | "blackberry"
  | "uchuva"
  | "peach"
  | "peanut"
  | "macadamia"
  | "pistachio"
  | "chocolate"
  | "coconut";

export type CakeConfiguration = {
  size: CakeSizeId | null;
  sponge: CakeSpongeId | null;
  filling: CakeFillingId;
  coverage: CakeCoverageId | null;
  toppings: CakeToppingId[];
};

export type CompletedCakeConfiguration = {
  size: CakeSizeId;
  sponge: CakeSpongeId;
  filling: CakeFillingId;
  coverage: CakeCoverageId;
  toppings: CakeToppingId[];
};

/** 1 libra is preselected so the builder opens with a cake and a price. */
export const DEFAULT_CAKE_SIZE: CakeSizeId = "one-pound";

/** "Sin relleno" is the default so the filling step is never blocking. */
export const DEFAULT_CAKE_FILLING: CakeFillingId = "none";

/** Starting configuration (also used by "Crear otra torta"). */
export const EMPTY_CAKE_CONFIGURATION: CakeConfiguration = {
  size: DEFAULT_CAKE_SIZE,
  sponge: null,
  filling: DEFAULT_CAKE_FILLING,
  coverage: null,
  toppings: [],
};

export const MAX_CAKE_TOPPINGS = 2;

export function isCompleteCakeConfiguration(
  configuration: CakeConfiguration,
): configuration is CompletedCakeConfiguration {
  return (
    configuration.size !== null &&
    configuration.sponge !== null &&
    configuration.coverage !== null
  );
}
