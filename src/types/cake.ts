export type CakeSizeId = "half-pound" | "one-pound";

export type CakeSpongeId = "cold" | "fluffy";

export type CakeFillingId =
  | "strawberry"
  | "blackberry"
  | "passion-fruit"
  | "peach"
  | "uchuva";

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
  filling: CakeFillingId | null;
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

export const EMPTY_CAKE_CONFIGURATION: CakeConfiguration = {
  size: null,
  sponge: null,
  filling: null,
  coverage: null,
  toppings: [],
};

export function isCompleteCakeConfiguration(
  configuration: CakeConfiguration,
): configuration is CompletedCakeConfiguration {
  return (
    configuration.size !== null &&
    configuration.sponge !== null &&
    configuration.filling !== null &&
    configuration.coverage !== null
  );
}
