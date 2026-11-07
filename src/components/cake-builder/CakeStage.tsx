import type { ReactNode } from "react";
import { BackgroundStage } from "@/components/cake-builder/BackgroundStage";
import { CakeImage } from "@/components/cake-builder/CakeImage";
import { CakeShadow } from "@/components/cake-builder/CakeShadow";
import { CakeToppings } from "@/components/cake-builder/CakeToppings";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";

type CakeStageProps = {
  image: string | null;
  toppingImages?: string[];
  compact?: boolean;
  children?: ReactNode;
};

export function CakeStage({
  image,
  toppingImages = [],
  compact = false,
  children,
}: CakeStageProps) {
  return (
    <section className="cake-stage" aria-label="Tu torta">
      <BackgroundStage />
      {image ? (
        <>
          <CakeShadow compact={compact} />
          <CakeImage image={image} compact={compact}>
            <CakeToppings images={toppingImages} />
          </CakeImage>
        </>
      ) : (
        <div className="cake-empty-prompt">
          <p>Selecciona una opción</p>
          <ChevronDownIcon className="cake-empty-prompt-arrow" />
        </div>
      )}
      {children}
    </section>
  );
}
