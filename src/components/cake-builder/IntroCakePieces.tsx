import Image from "next/image";
import { INTRO_CAKE_LAYERS } from "@/config/cake-visuals";

export function IntroCakePieces() {
  return (
    <div className="intro-cake-stack" aria-hidden="true">
      {INTRO_CAKE_LAYERS.map((layer) => (
        <div
          key={layer.id}
          className="intro-cake-layer"
          style={{
            bottom: layer.bottom,
            height: layer.height,
            animationDelay: `${layer.delayMs}ms`,
          }}
        >
          <Image
            src={`${layer.image}?v=1`}
            alt=""
            fill
            priority
            unoptimized
            sizes="(max-width: 639px) 70vw, 420px"
            className="object-contain object-bottom"
          />
        </div>
      ))}
    </div>
  );
}
