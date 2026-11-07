import {
  CAKE_TOPPING_IMAGES,
  CAKE_VISUAL_IMAGES,
  type CakeToppingVisualId,
  type CakeVisualId,
} from "@/config/cake-visuals";
import type { CakeConfiguration, CakeSpongeId } from "@/types/cake";

export type CakeVisual = {
  id: string;
  image: string | null;
  /** "soaked" tints the sponge photo to read as milk-soaked (Tres leches). */
  finish: "soaked" | null;
  toppingImages: string[];
};

function spongeAssetName(sponge: CakeSpongeId) {
  return sponge === "fluffy" ? "spongy" : "cold";
}

function sizeBasicImage(size: NonNullable<CakeConfiguration["size"]>) {
  return size === "one-pound"
    ? CAKE_VISUAL_IMAGES["one-pound-basic"]
    : CAKE_VISUAL_IMAGES["half-pound-basic"];
}

export function getCakeVisual(configuration: CakeConfiguration): CakeVisual {
  if (!configuration.size) {
    return {
      id: "empty",
      image: null,
      finish: null,
      toppingImages: [],
    };
  }

  const spongeName = configuration.sponge
    ? spongeAssetName(configuration.sponge)
    : null;

  const idParts: string[] = [configuration.size];
  if (spongeName) {
    idParts.push(spongeName);
  } else {
    idParts.push("basic");
  }
  if (configuration.filling) {
    idParts.push(configuration.filling);
  }
  if (configuration.coverage) {
    idParts.push(configuration.coverage);
  }
  if (configuration.toppings.length > 0) {
    idParts.push([...configuration.toppings].sort().join("+"));
  }

  const coverageImage =
    configuration.coverage && configuration.coverage in CAKE_VISUAL_IMAGES
      ? CAKE_VISUAL_IMAGES[configuration.coverage as CakeVisualId]
      : null;

  const fillingImage =
    configuration.filling && configuration.filling in CAKE_VISUAL_IMAGES
      ? CAKE_VISUAL_IMAGES[configuration.filling as CakeVisualId]
      : null;

  const spongeImage =
    spongeName === "spongy"
      ? CAKE_VISUAL_IMAGES.spongy
      : spongeName === "cold"
        ? CAKE_VISUAL_IMAGES.cold
        : null;

  const image =
    coverageImage ??
    fillingImage ??
    spongeImage ??
    sizeBasicImage(configuration.size);

  const toppingImages = configuration.toppings.flatMap((topping) =>
    topping in CAKE_TOPPING_IMAGES
      ? [CAKE_TOPPING_IMAGES[topping as CakeToppingVisualId]]
      : [],
  );

  // Tres leches soaks the sponge instead of adding a fruit layer, so it
  // reuses the sponge photo. A coverage photo hides the interior.
  const finish =
    configuration.filling === "tres-leches" && !coverageImage
      ? "soaked"
      : null;

  return {
    id: idParts.join("-"),
    image,
    finish,
    toppingImages,
  };
}
