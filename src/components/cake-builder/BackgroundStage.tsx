import Image from "next/image";
import { CAKE_STAGE_IMAGE } from "@/config/cake-visuals";

export function BackgroundStage() {
  return (
    <Image
      src={`${CAKE_STAGE_IMAGE}?v=4`}
      alt=""
      fill
      priority
      unoptimized
      sizes="100vw"
      className="cake-stage-bg"
    />
  );
}
