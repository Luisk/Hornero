import type {
  CakeCoverageId,
  CakeFillingId,
  CakeSizeId,
  CakeSpongeId,
  CakeToppingCategory,
  CakeToppingId,
} from "@/types/cake";

export type CakeOptionVisual = {
  imageSrc: string;
  placeholderColor: string;
};

export type CakeOption<Id extends string> = {
  id: Id;
  label: string;
  visual: CakeOptionVisual;
};

export type CakeSizeOption = CakeOption<CakeSizeId> & {
  scale: number;
  servings: string;
  description: string;
  image: string;
};

export type CakeToppingOption = CakeOption<CakeToppingId> & {
  category: CakeToppingCategory;
};

export const CAKE_SIZES: readonly CakeSizeOption[] = [
  {
    id: "half-pound",
    label: "½ LIBRA",
    servings: "4 – 6 personas",
    description: "Perfecta para compartir\ncon alguien especial.",
    image: "/images/crea-tu-torta/size/cake-half-pound.png",
    scale: 1,
    visual: {
      imageSrc: "/images/crea-tu-torta/size/cake-half-pound.png",
      placeholderColor: "#E8D5B5",
    },
  },
  {
    id: "one-pound",
    label: "1 LIBRA",
    servings: "8 – 12 personas",
    description: "Ideal para celebrar en\nfamilia o con amigos.",
    image: "/images/crea-tu-torta/size/cake-one-pound.png",
    scale: 1,
    visual: {
      imageSrc: "/images/crea-tu-torta/size/cake-one-pound.png",
      placeholderColor: "#D4B896",
    },
  },
] as const;

export const CAKE_SPONGES: readonly CakeOption<CakeSpongeId>[] = [
  {
    id: "cold",
    label: "Frío",
    visual: {
      imageSrc: "/images/crea-tu-torta/sponge/cake-cold.png",
      placeholderColor: "#EDE6D9",
    },
  },
  {
    id: "fluffy",
    label: "Esponjoso",
    visual: {
      imageSrc: "/images/crea-tu-torta/size/cake-one-pound.png",
      placeholderColor: "#E8C98A",
    },
  },
] as const;

export const CAKE_FILLINGS: readonly CakeOption<CakeFillingId>[] = [
  {
    id: "none",
    label: "Sin relleno",
    // No artwork: "Sin relleno" renders as a plain color chip.
    visual: {
      imageSrc: "",
      placeholderColor: "#F4EFE6",
    },
  },
  {
    id: "strawberry",
    label: "Fresa",
    visual: {
      imageSrc: "/images/crea-tu-torta/fillings/cake-strawberry.png",
      placeholderColor: "#C43B4B",
    },
  },
  {
    id: "blackberry",
    label: "Mora",
    visual: {
      imageSrc: "/images/crea-tu-torta/fillings/cake-blackberry.png",
      placeholderColor: "#4A1C3A",
    },
  },
  {
    id: "passion-fruit",
    label: "Maracuyá",
    visual: {
      imageSrc: "/images/crea-tu-torta/fillings/cake-passion-fruit.png",
      placeholderColor: "#E8A317",
    },
  },
  {
    id: "peach",
    label: "Durazno",
    visual: {
      imageSrc: "/images/crea-tu-torta/fillings/cake-peach.png",
      placeholderColor: "#E8896B",
    },
  },
  {
    id: "uchuva",
    label: "Uchuva",
    visual: {
      imageSrc: "/images/crea-tu-torta/fillings/cake-uchuva.png",
      placeholderColor: "#E8C44A",
    },
  },
  {
    id: "tres-leches",
    label: "Tres leches",
    // No dedicated artwork yet: renders as a milky color chip, and the
    // preview reuses the sponge photo with a soaked finish.
    visual: {
      imageSrc: "",
      placeholderColor: "#F1E4CC",
    },
  },
] as const;

export const CAKE_COVERAGES: readonly CakeOption<CakeCoverageId>[] = [
  {
    id: "chantilly",
    label: "Chantilly",
    visual: {
      imageSrc: "/images/crea-tu-torta/coverage/cake-chantilly.png",
      placeholderColor: "#F7F1E8",
    },
  },
  {
    id: "cheese",
    label: "Queso",
    visual: {
      imageSrc: "/images/crea-tu-torta/coverage/cake-cheese.png",
      placeholderColor: "#F3EDE0",
    },
  },
  {
    id: "butter",
    label: "Mantequilla",
    visual: {
      imageSrc: "/images/crea-tu-torta/coverage/cake-butter.png",
      placeholderColor: "#F0D9A0",
    },
  },
  {
    id: "chocolate",
    label: "Chocolate",
    visual: {
      imageSrc: "/images/crea-tu-torta/coverage/cake-chocolate.png",
      placeholderColor: "#4A2C1A",
    },
  },
] as const;

export const TOPPING_CATEGORIES: readonly {
  id: CakeToppingCategory;
  label: string;
}[] = [
  { id: "fruits", label: "Frutas" },
  { id: "nuts", label: "Frutos secos" },
  { id: "other", label: "Otros" },
] as const;

export const CAKE_TOPPINGS: readonly CakeToppingOption[] = [
  {
    id: "strawberry",
    label: "Fresa",
    category: "fruits",
    visual: {
      imageSrc: "/images/crea-tu-torta/toppings/topping-strawberry.png",
      placeholderColor: "#C43B4B",
    },
  },
  {
    id: "blackberry",
    label: "Mora",
    category: "fruits",
    visual: {
      imageSrc: "/images/toppings/mora.jpg",
      placeholderColor: "#4A1C3A",
    },
  },
  {
    id: "uchuva",
    label: "Uchuva",
    category: "fruits",
    visual: {
      imageSrc: "/images/toppings/uchuva.jpg",
      placeholderColor: "#E8C44A",
    },
  },
  {
    id: "peach",
    label: "Durazno",
    category: "fruits",
    visual: {
      imageSrc: "/images/toppings/durazno.jpg",
      placeholderColor: "#E8896B",
    },
  },
  {
    id: "peanut",
    label: "Maní",
    category: "nuts",
    visual: {
      imageSrc: "/images/toppings/mani.jpg",
      placeholderColor: "#C4A574",
    },
  },
  {
    id: "macadamia",
    label: "Macadamia",
    category: "nuts",
    visual: {
      imageSrc: "/images/toppings/macadamia.jpg",
      placeholderColor: "#E8DCC4",
    },
  },
  {
    id: "pistachio",
    label: "Pistacho",
    category: "nuts",
    visual: {
      imageSrc: "/images/toppings/pistacho.jpg",
      placeholderColor: "#7A9A4A",
    },
  },
  {
    id: "chocolate",
    label: "Chocolate",
    category: "other",
    visual: {
      imageSrc: "/images/toppings/chocolate.jpg",
      placeholderColor: "#4A2C1A",
    },
  },
  {
    id: "coconut",
    label: "Coco",
    category: "other",
    visual: {
      imageSrc: "/images/toppings/coco.jpg",
      placeholderColor: "#F4EFE6",
    },
  },
] as const;

export function getSizeOption(id: CakeSizeId) {
  return CAKE_SIZES.find((option) => option.id === id);
}

export function getSpongeOption(id: CakeSpongeId) {
  return CAKE_SPONGES.find((option) => option.id === id);
}

export function getFillingOption(id: CakeFillingId) {
  return CAKE_FILLINGS.find((option) => option.id === id);
}

export function getCoverageOption(id: CakeCoverageId) {
  return CAKE_COVERAGES.find((option) => option.id === id);
}

export function getToppingOption(id: CakeToppingId) {
  return CAKE_TOPPINGS.find((option) => option.id === id);
}

export function getToppingsByCategory(category: CakeToppingCategory) {
  return CAKE_TOPPINGS.filter((option) => option.category === category);
}
